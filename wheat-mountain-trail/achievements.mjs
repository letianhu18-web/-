const radians = degrees => degrees * Math.PI / 180;
export const RECOVERY_ANGLE = radians(45);
export const UPRIGHT_ANGLE = radians(10);
export const STEADY_ANGLE = radians(25);

export const ACHIEVEMENTS = Object.freeze([
  { id: 'comeback', points: 1000, name: '力挽狂澜', kind: '技巧成就', rule: '倾斜超过 45°，再回到 ±10°以内。' },
  { id: 'bun-fan', points: 1000, name: '包蜜', kind: '称号', rule: '本局拾取至少 15 个庆丰包子，且拾取率超过 80%。' },
  { id: 'accelerator', points: 1000, name: '总加速师', kind: '称号', rule: '本局加速路程占已走路程的比例超过 90%。' },
  { id: 'supreme', name: '定于一尊', kind: '通关成就', rule: '走完 5,000 米，完成十里山路挑战。' },
  { id: 'helmsman', points: 1000, name: '领航掌舵，指明方向', kind: '通关成就', rule: '走完 5,000 米，全程倾斜未超过 ±25°。' },
  { id: 'meticulous', points: 1000, name: '精甚细腻', kind: '技巧成就', rule: '连续拾取 10 个庆丰包子，中间没有漏掉。' },
  { id: 'under-200', name: '呵，小学博士', kind: '本局评价', rule: '不足 200 米时挑战失败。' },
  { id: 'under-500', name: '大蝈撅起', kind: '本局评价', rule: '达到 200 米，但不足 500 米时失败。' },
  { id: 'under-1000', name: '不强自自', kind: '本局评价', rule: '达到 500 米，但不足 1,000 米时失败。' },
  { id: 'under-2000', name: '我年轻时走过', kind: '本局评价', rule: '达到 1,000 米，但不足 2,000 米时失败。' },
  { id: 'under-3000', name: '香蕉皮大巴', kind: '本局评价', rule: '达到 2,000 米，但不足 3,000 米时失败。' },
  { id: 'under-4500', name: '萨格尔王', kind: '本局评价', rule: '达到 3,000 米，但不足 4,500 米时失败。' },
  { id: 'unfinished', name: '烂尾帝', kind: '本局评价', rule: '达到 4,500 米，但还没走完 5,000 米就失败。' },
]);

export const BUN_POINTS = 100;
export function scoreBreakdown(run) {
  const distance = Math.floor(run.distance * 10);
  const buns = run.buns * BUN_POINTS;
  const achievements = earnedAchievements(run).reduce((sum, item) => sum + (item.points || 0), 0);
  return { distance, buns, achievements, total: distance + buns + achievements };
}

export function newAchievementState(angle = 0) {
  return { unlocked: [], maxAbsAngle: Math.abs(angle), recoveryArmed: false, bunsEncountered: 0, bunStreak: 0, bestBunStreak: 0, boostedDistance: 0 };
}

function unlock(run, id) {
  if (run.achievements.unlocked.includes(id)) return;
  run.achievements.unlocked.push(id);
  run.events.push({ type: 'achievement', id });
}

export function recordBunPickup(run) {
  const stats = run.achievements;
  stats.bunStreak++;
  stats.bestBunStreak = Math.max(stats.bestBunStreak, stats.bunStreak);
  if (stats.bunStreak >= 10) unlock(run, 'meticulous');
}

export function achievementMetrics(run) {
  const stats = run.achievements;
  return {
    pickupRate: stats.bunsEncountered > 0 ? run.buns / stats.bunsEncountered : 0,
    boostRatio: run.distance > 0 ? stats.boostedDistance / run.distance : 0,
    maxDegrees: stats.maxAbsAngle * 180 / Math.PI,
    bestBunStreak: stats.bestBunStreak,
  };
}

// Called for every completed physics step, including the final step of a run.
// Ratios are awarded only at settlement; a good early ratio can still decrease.
export function trackAchievements(run, boostedDistance = 0) {
  const stats = run.achievements;
  const angle = Math.abs(run.angle);
  stats.maxAbsAngle = Math.max(stats.maxAbsAngle, angle);
  stats.boostedDistance += boostedDistance;
  if (!run.fallen) {
    if (angle > RECOVERY_ANGLE) stats.recoveryArmed = true;
    if (stats.recoveryArmed && angle <= UPRIGHT_ANGLE) {
      unlock(run, 'comeback');
      stats.recoveryArmed = false;
    }
  }
  if (!run.fallen && !run.won) { run.score = scoreBreakdown(run).total; return; }
  if (run.buns >= 15 && stats.bunsEncountered > 0 && run.buns * 5 > stats.bunsEncountered * 4) unlock(run, 'bun-fan');
  if (run.distance > 0 && stats.boostedDistance > run.distance * .9) unlock(run, 'accelerator');
  if (run.won) {
    unlock(run, 'supreme');
    if (stats.maxAbsAngle <= STEADY_ANGLE) unlock(run, 'helmsman');
  } else {
    const tiers = [[200, 'under-200'], [500, 'under-500'], [1000, 'under-1000'], [2000, 'under-2000'], [3000, 'under-3000'], [4500, 'under-4500'], [5000, 'unfinished']];
    const tier = tiers.find(([upper]) => run.distance < upper);
    if (tier) unlock(run, tier[1]);
  }
  run.score = scoreBreakdown(run).total;
}

export function earnedAchievements(run) {
  return ACHIEVEMENTS.filter(achievement => run.achievements.unlocked.includes(achievement.id));
}
