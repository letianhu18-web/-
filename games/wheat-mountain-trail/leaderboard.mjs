import { inputMask, SCORE_VERSION, MAX_COMMANDS, MAX_REPLAY_STEPS } from './replay.mjs';
import { nicknameError } from './nickname.mjs';
import { requestJSON } from './api.mjs';

const $ = id => document.getElementById(id);
let activeSession = null,loading = false;
const validScore = entry => entry && typeof entry.name==='string' && Number.isInteger(entry.score) && entry.score>=0 && Number.isFinite(entry.seconds) && entry.seconds>=0;
const api = (path,options={},validate=()=>true) => requestJSON(path,options,{validate});
export function newRankingRun() {
  const session = {steps:0,commands:[],finished:false,submitted:false,submitting:false,tooLong:false};
  session.ticket = api('/api/runs',{method:'POST'},data=>typeof data.id==='string'&&/^[a-f0-9-]{36}$/.test(data.id)&&typeof data.version==='string').catch(error=>({error:error.message}));
  activeSession = session;
  return session;
}
export function recordRankingInput(session,input) {
  const mask = inputMask(input);
  if (!session.commands.length || session.commands.at(-1)[1] !== mask) {
    if (session.commands.length < MAX_COMMANDS) session.commands.push([session.steps,mask]);else session.tooLong = true;
  }
  session.steps++;
  if (session.steps > MAX_REPLAY_STEPS) session.tooLong = true;
}
export function showRankingResult(session) {
  session.finished = true;activeSession = session;
  $('submit-score').disabled = false;$('submit-score').textContent = '提交成绩';
  $('submission-status').textContent = '';
  if ($('leaderboard-panel').open) loadLeaderboard();
}
export async function loadLeaderboard() {
  if (loading) return;loading = true;$('refresh-ranking').disabled = true;
  $('ranking-status').textContent = '正在加载排行榜…';
  try {
    const {entries} = await api('/api/leaderboard',{},data=>Array.isArray(data.entries)&&data.entries.length<=50&&data.entries.every(entry=>validScore(entry)&&Number.isInteger(entry.rank)&&entry.rank>0&&Number.isInteger(entry.distance)&&entry.distance>=0));
    $('ranking-rows').replaceChildren(...entries.map(entry=>{
      const row = document.createElement('tr');
      const values = [entry.rank,entry.name,entry.score.toLocaleString('zh-CN'),`${entry.distance.toLocaleString('zh-CN')} 米`,`${Math.floor(entry.seconds/60)}:${Math.floor(entry.seconds%60).toString().padStart(2,'0')}`];
      values.forEach((value,index)=>{const cell = document.createElement('td');if (index === 1) {const name = document.createElement('bdi');name.textContent = value;cell.append(name);}else cell.textContent = value;row.append(cell);});
      return row;
    }));
    $('ranking-status').textContent = entries.length ? '同名仅显示最高分 · 同分用时短者优先 · 前 50 名' : '还没有成绩，来拿下第一个名次。';
  } catch(error) { $('ranking-status').textContent = error.message; }
  finally { loading = false;$('refresh-ranking').disabled = false; }
}
export function initLeaderboard() {
  $('leaderboard-panel').addEventListener('toggle',()=>{if ($('leaderboard-panel').open) loadLeaderboard();});
  $('refresh-ranking').addEventListener('click',loadLeaderboard);
  $('score-submission').addEventListener('submit',async event=>{
    event.preventDefault();const session = activeSession,name = $('player-name').value.trim();
    if (!session?.finished || session.submitting || session.submitted) return;
    const nameError=nicknameError(name);
    if (nameError) { $('submission-status').textContent = nameError;return; }
    if (session.tooLong) { $('submission-status').textContent = '本局操作记录过长，无法提交排行榜；可以继续游玩。';return; }
    session.submitting = true;$('submit-score').disabled = true;$('submission-status').textContent = '正在记录本局成绩…';
    try {
      const ticket = await session.ticket;
      if (ticket.error) throw new Error('本局开始时未能连接排行榜，无法提交本局成绩。请在网络恢复后重新挑战；若持续失败，请在系统浏览器打开游戏。');
      const data = await api('/api/leaderboard',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({runId:ticket.id,version:SCORE_VERSION,name,steps:session.steps,commands:session.commands})},data=>validScore(data.entry)&&validScore(data.best)&&Number.isInteger(data.rank)&&data.rank>0);
      session.submitted = true;
      if (session === activeSession) {
        $('submission-status').textContent = `本局 ${data.entry.score.toLocaleString('zh-CN')} 分已记录 · 同名最高 ${data.best.score.toLocaleString('zh-CN')} 分 · 当前第 ${data.rank} 名`;
        $('submit-score').textContent = '本局已提交';
        if ($('leaderboard-panel').open) loadLeaderboard();else $('leaderboard-panel').open = true;
      }
    } catch(error) { if (session === activeSession) $('submission-status').textContent = error.message || '提交失败，请稍后再试。'; }
    finally {session.submitting = false;if (session === activeSession) $('submit-score').disabled = session.submitted;}
  });
}
