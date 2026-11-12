import { newRun, stepRun, FIXED_STEP } from './physics.mjs';
export const SCORE_VERSION = 'score-v1';
export const MAX_REPLAY_STEPS = 150000;
export const MAX_COMMANDS = 24000;
export function inputMask(input) {
  return (input.balance === -1 ? 1 : input.balance === 1 ? 2 : 0) |
    (input.move === -1 ? 4 : input.move === 1 ? 8 : 0) | (input.jump ? 16 : 0);
}
export function verifyReplay(payload) {
  if (payload.version !== SCORE_VERSION) throw new Error('游戏已更新，请刷新后开始新的一局。');
  const { steps, commands } = payload;
  if (!Number.isInteger(steps) || steps < 1 || steps > MAX_REPLAY_STEPS || !Array.isArray(commands) || !commands.length || commands.length > MAX_COMMANDS) throw new Error('本局记录不完整，请重新挑战。');
  let last = -1;
  for (const row of commands) {
    if (!Array.isArray(row) || row.length !== 2) throw new Error('操作记录格式错误。');
    const [tick,mask] = row;
    if (!Number.isInteger(tick) || tick <= last || tick >= steps || !Number.isInteger(mask) || mask < 0 || mask > 31 || (mask & 3) === 3 || (mask & 12) === 12) throw new Error('操作记录格式错误。');
    last = tick;
  }
  if (commands[0][0] !== 0) throw new Error('本局缺少开始记录。');
  const run = newRun();let cursor = 0,mask = 0;
  for (let tick = 0; tick < steps; tick++) {
    if (run.fallen || run.won) throw new Error('成绩与本局结束时间不一致。');
    if (cursor < commands.length && commands[cursor][0] === tick) mask = commands[cursor++][1];
    stepRun(run,{balance:mask & 1 ? -1 : mask & 2 ? 1 : 0,move:mask & 4 ? -1 : mask & 8 ? 1 : 0,jump:!!(mask & 16)},FIXED_STEP);
  }
  if (!run.fallen && !run.won) throw new Error('请在本局结束后提交成绩。');
  return run;
}
