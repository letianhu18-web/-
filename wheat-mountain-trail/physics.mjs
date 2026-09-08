import { makeCourse, touchesObstacle, touchesBun, TOTAL_DISTANCE, LATERAL_LIMIT, BOOST_DURATION, MAX_BOOST_LEVEL, BUN_PICKUP_RADIUS } from './course.mjs';
import { newAchievementState, recordBunPickup, trackAchievements } from './achievements.mjs';
export { TOTAL_DISTANCE, ROAD_HALF_WIDTH, LATERAL_LIMIT, BOOST_DURATION } from './course.mjs';
export const LIMIT = 0.94;
export const FIXED_STEP = 1 / 120;
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const roadX = z => 1.8 * Math.sin(z * .029) + .72 * Math.sin(z * .081);
export const roadY = z => z * .016 + .25 * Math.sin(z * .048) + .065 * Math.sin(z * .24);
export const roadHeading = z => Math.atan((roadX(z + .1) - roadX(z - .1)) / .2);
export function newRun() {
  return { time: 0, distance: 0, score: 0, angle: .045, velocity: 0, offset: 0, wind: 0, sway: 0, swayVelocity: 0, dangerTime: 0, fallen: false, fallDirection: 1, fallCause: '', lateral: 0, moveVelocity: 0, jumpY: 0, jumpVelocity: 0, jumpBuffer: 0, speed: 5, boostLevel: 0, boostRemaining: 0, buns: 0, won: false, events: [], course: makeCourse(), courseCursor: 0, achievements: newAchievementState(.045) };
}
export function stepRun(s, control = 0, dt = FIXED_STEP) {
  if (s.fallen || s.won) return s;
  const input = typeof control === 'number' ? { balance: control, move: 0, jump: false } : control;
  s.events = [];
  const previous = { distance: s.distance, x: s.lateral + s.offset, jumpY: s.jumpY };
  s.time += dt;
  if (input.jump) s.jumpBuffer = .12;
  else s.jumpBuffer = Math.max(0, s.jumpBuffer - dt);
  if (s.jumpBuffer > 0 && s.jumpY <= 0 && s.jumpVelocity <= 0) {
    s.jumpVelocity = 6.8; s.jumpBuffer = 0; s.events.push({ type: 'jump' });
  }
  if (s.jumpY > 0 || s.jumpVelocity > 0) {
    s.jumpVelocity -= 15 * dt; s.jumpY += s.jumpVelocity * dt;
    if (s.jumpY <= 0) { s.jumpY = 0; s.jumpVelocity = 0; s.events.push({ type: 'land' }); }
  }
  const targetMovement = clamp(input.move || 0, -1, 1) * 2.5;
  s.moveVelocity += (targetMovement - s.moveVelocity) * Math.min(1, dt * 12);
  s.lateral = clamp(s.lateral + s.moveVelocity * dt, -LATERAL_LIMIT, LATERAL_LIMIT);
  if (Math.abs(s.lateral) >= LATERAL_LIMIT) s.moveVelocity = 0;
  const difficulty = 1 + Math.min(s.distance / 1800, .9);
  const warmup = Math.min(s.time / 7, 1);
  s.wind = warmup * (Math.sin(s.time * .63 + .3) * .33 + Math.sin(s.time * 1.41) * .2 + Math.sin(s.time * .17 + 1.5) * .15) * difficulty;
  const footstep = Math.sin(s.time * 5.3) * .19 * difficulty;
  const settling = .45 + .55 * warmup;
  const instability = 1.35 + .85 * Math.min(s.distance / 80, 1);
  const airborne = s.jumpY > .05;
  const acceleration = (instability * Math.sin(s.angle) + s.wind * .8 + footstep * .65) * settling * (airborne ? .45 : 1) + clamp(input.balance || 0, -1, 1) * 2.85 - s.velocity * 1.9;
  s.velocity += acceleration * dt;
  s.angle += s.velocity * dt;
  s.offset += (s.angle * .78 - s.offset) * dt * 3;
  s.swayVelocity += (-8.8 * s.sway - 1.8 * s.swayVelocity - s.velocity * 1.5 + footstep * .4) * dt;
  s.sway += s.swayVelocity * dt;
  s.boostRemaining = Math.max(0, s.boostRemaining - dt);
  if (s.boostRemaining === 0) s.boostLevel = 0;
  s.speed = (5 + Math.min(s.distance / 1400, 1.6)) * (1 + s.boostLevel * .2);
  s.distance = Math.min(TOTAL_DISTANCE, s.distance + s.speed * dt);
  const boostedDistance = s.boostLevel > 0 ? s.distance - previous.distance : 0;
  s.score = Math.floor(s.distance * 10);
  s.dangerTime = Math.abs(s.angle) > LIMIT ? s.dangerTime + dt : Math.max(0, s.dangerTime - dt * 2);
  if (s.dangerTime > .2 || Math.abs(s.angle) > 1.2) { s.fallen = true; s.fallCause = 'balance'; s.fallDirection = Math.sign(s.angle) || 1; trackAchievements(s, boostedDistance); return s; }
  const current = { distance: s.distance, x: s.lateral + s.offset, jumpY: s.jumpY };
  while (s.courseCursor < s.course.length && s.course[s.courseCursor].z < previous.distance - 2) s.courseCursor++;
  for (let i = s.courseCursor; i < s.course.length && s.course[i].z < s.distance + 2; i++) {
    const item = s.course[i];
    if (item.type === 'bun') {
      if (!item.encountered && s.distance >= item.z - BUN_PICKUP_RADIUS) { item.encountered = true; s.achievements.bunsEncountered++; }
      if (!item.collected && touchesBun(previous, current, item)) {
        item.collected = true; s.buns++; s.boostLevel = Math.min(MAX_BOOST_LEVEL, s.boostLevel + 1); s.boostRemaining = BOOST_DURATION;
        s.speed = (5 + Math.min(s.distance / 1400, 1.6)) * (1 + s.boostLevel * .2);
        s.events.push({ type: 'bun', id: item.id, x: item.x, z: item.z, level: s.boostLevel });
        recordBunPickup(s);
      }
      if (!item.collected && !item.missed && s.distance > item.z + BUN_PICKUP_RADIUS) { item.missed = true; s.achievements.bunStreak = 0; }
    } else if (touchesObstacle(previous, current, item)) {
      s.fallen = true; s.fallCause = 'obstacle'; s.fallDirection = Math.sign(s.angle) || 1;
      s.events.push({ type: 'trip', obstacle: item.type }); trackAchievements(s, boostedDistance); return s;
    }
  }
  if (s.distance >= TOTAL_DISTANCE) { s.won = true; s.events.push({ type: 'win' }); }
  trackAchievements(s, boostedDistance);
  return s;
}
