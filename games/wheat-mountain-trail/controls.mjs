export function readControls(keys, touchActions = []) {
  const left = keys.has('ArrowLeft') || keys.has('KeyA');
  const right = keys.has('ArrowRight') || keys.has('KeyD');
  const moveMode = keys.has('ArrowUp') || keys.has('KeyW');
  const actions = new Set(touchActions);
  const keyDirection = Number(right) - Number(left);
  const balance = Math.max(-1, Math.min(1, (moveMode ? 0 : keyDirection) + Number(actions.has('balance-right')) - Number(actions.has('balance-left'))));
  const move = Math.max(-1, Math.min(1, (moveMode ? keyDirection : 0) + Number(actions.has('move-right')) - Number(actions.has('move-left'))));
  return { balance, move };
}
