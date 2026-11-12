export const TOTAL_DISTANCE = 5000;
export const ROAD_HALF_WIDTH = 4.1;
export const LATERAL_LIMIT = 2;
export const BOOST_DURATION = 9;
export const MAX_BOOST_LEVEL = 3;
export const BUN_PICKUP_RADIUS = .7;

export function makeCourse() {
  const items = [];
  const lanes = [-1.85, 0, 1.85];
  let bunIndex = 0;

  const randomLane = () => lanes[Math.floor(Math.random() * lanes.length)];
  const addBun = (z, x = randomLane()) => {
    items.push({
      id: `bun-${bunIndex++}`,
      type: 'bun',
      z,
      x,
      collected: false,
    });
  };

  // A fresh run gets fresh bun positions and a varied number of rewards.
  addBun(10 + Math.random() * 10);

  let z = 38, i = 0;
  while (z < TOTAL_DISTANCE - 65) {
    const fullWidth = i % 3 === 0;
    const obstacleZ = fullWidth ? z : z + (Math.random() * 6 - 3);
    const obstacleX = fullWidth ? 0 : (Math.random() * 3.8 - 1.9);
    items.push({ id: `obstacle-${i}`, type: fullWidth ? 'log' : 'rock', z: obstacleZ, x: obstacleX, width: fullWidth ? 7.6 : 1.15, depth: fullWidth ? .5 : .85, height: fullWidth ? .5 : .62 });

    // Keep pickups clear of both this obstacle and the next one.
    addBun(obstacleZ + 8 + Math.random() * 7);
    if (Math.random() < .5) addBun(obstacleZ + 17 + Math.random() * 5);

    z += 31 + (i * 7 % 14);
    i++;
  }
  return items.sort((a, b) => a.z - b.z);
}

// Return the portion of a fixed step that overlaps an interval. This catches
// fast crossings as well as landing on an obstacle already under the feet.
export function overlapInterval(a, b, min, max) {
  if (Math.abs(b - a) < 1e-10) return a >= min && a <= max ? [0, 1] : null;
  const t0 = (min - a) / (b - a), t1 = (max - a) / (b - a);
  const enter = Math.max(0, Math.min(t0, t1)), leave = Math.min(1, Math.max(t0, t1));
  return enter <= leave ? [enter, leave] : null;
}

export function touchesObstacle(previous, current, item) {
  const along = overlapInterval(previous.distance, current.distance, item.z - item.depth / 2 - .23, item.z + item.depth / 2 + .23);
  if (!along) return false;
  const across = overlapInterval(previous.x, current.x, item.x - item.width / 2 - .24, item.x + item.width / 2 + .24);
  if (!across) return false;
  const enter = Math.max(along[0], across[0]), leave = Math.min(along[1], across[1]);
  if (enter > leave) return false;
  const y0 = previous.jumpY + (current.jumpY - previous.jumpY) * enter;
  const y1 = previous.jumpY + (current.jumpY - previous.jumpY) * leave;
  return Math.min(y0, y1) < item.height + .06;
}

export function touchesBun(previous, current, item) {
  const along = overlapInterval(previous.distance, current.distance, item.z - BUN_PICKUP_RADIUS, item.z + BUN_PICKUP_RADIUS);
  const across = overlapInterval(previous.x, current.x, item.x - .72, item.x + .72);
  if (!along || !across) return false;
  const enter = Math.max(along[0], across[0]), leave = Math.min(along[1], across[1]);
  if (enter > leave) return false;
  const y = previous.jumpY + (current.jumpY - previous.jumpY) * enter;
  return y < 1.15;
}
