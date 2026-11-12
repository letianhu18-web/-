// Keep simulation on the browser clock; only throttle the expensive 3D render.
export const QUALITY_MODES = ['auto', 'sharp', 'saver'];
export function renderPolicy(mode = 'auto', {mobile = false, lowEffects = false, business = false, pixelRatio = 1} = {}) {
  const quality = QUALITY_MODES.includes(mode) ? mode : 'auto';
  const cap = quality === 'saver' ? 1 : quality === 'sharp' ? 2 : mobile ? 1.25 : 1.5;
  const fps = quality === 'saver' || lowEffects || !business || (mobile && quality === 'auto') ? 30 : 60;
  return {pixelRatio: Math.max(0.5, Math.min(pixelRatio || 1, cap)), fps};
}
export class RenderClock {
  constructor() { this.reset(); }
  reset() { this.last = -Infinity; this.elapsed = 0; }
  advance(now, dt, {fps = 30, paused = false, force = false} = {}) {
    if (!paused) this.elapsed += Math.max(0, dt);
    if ((paused && !force) || (!force && now - this.last < 1000 / fps - 0.5)) return null;
    const elapsed = paused ? 0 : Math.min(0.1, this.elapsed);
    this.elapsed = 0; this.last = now;
    return elapsed;
  }
}
