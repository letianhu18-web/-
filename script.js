const canvas = document.getElementById('treeCanvas');
const videoElement = document.getElementById('inputVideo');
const statusText = document.getElementById('statusText');
const scaleText = document.getElementById('scaleText');

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x081018, 12, 34);

const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
camera.position.set(0, 3.3, 11.5);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

scene.add(new THREE.AmbientLight(0x99bbff, 0.9));
const topLight = new THREE.PointLight(0xffffff, 1.4, 60);
topLight.position.set(0, 12, 8);
scene.add(topLight);

const treeGroup = new THREE.Group();
scene.add(treeGroup);

function createTreePoints() {
  const points = [];
  const layers = 56;

  for (let y = 0; y < layers; y += 1) {
    const yNorm = y / (layers - 1);
    const radius = (1 - yNorm) * 3.3 + 0.3;
    const count = Math.floor(16 + radius * 24);

    for (let i = 0; i < count; i += 1) {
      const theta = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radius;
      const px = Math.cos(theta) * r;
      const pz = Math.sin(theta) * r;
      const py = yNorm * 7;
      points.push(px, py, pz);
    }
  }

  const trunkCount = 180;
  for (let i = 0; i < trunkCount; i += 1) {
    const theta = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * 0.45;
    const px = Math.cos(theta) * r;
    const pz = Math.sin(theta) * r;
    const py = Math.random() * 1.3 - 0.2;
    points.push(px, py, pz);
  }

  return new Float32Array(points);
}

const treeGeometry = new THREE.BufferGeometry();
treeGeometry.setAttribute('position', new THREE.BufferAttribute(createTreePoints(), 3));

const treeMaterial = new THREE.PointsMaterial({
  size: 0.09,
  color: 0x5cf3a9,
  transparent: true,
  opacity: 0.95,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

const treePoints = new THREE.Points(treeGeometry, treeMaterial);
treeGroup.add(treePoints);

const starGeometry = new THREE.SphereGeometry(0.15, 12, 12);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffd16b });
const star = new THREE.Mesh(starGeometry, starMaterial);
star.position.y = 7.3;
treeGroup.add(star);

treeGroup.position.y = -3.3;
let targetScale = 1;
let currentScale = 1;

function resize() {
  const { clientWidth, clientHeight } = canvas.parentElement;
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight, false);
}
window.addEventListener('resize', resize);
resize();

let lastTime = 0;
let shownScale = '';

function animate(time) {
  requestAnimationFrame(animate);

  // Same easing speed on 60 Hz and 120 Hz screens.
  const frames = lastTime ? Math.min(3, (time - lastTime) / (1000 / 60)) : 1;
  lastTime = time;
  currentScale += (targetScale - currentScale) * (1 - Math.pow(0.88, frames));
  treeGroup.scale.setScalar(currentScale);

  treeGroup.rotation.y = Math.sin(time * 0.00025) * 0.2;
  star.rotation.y += 0.02 * frames;

  const label = `${currentScale.toFixed(2)}x`;
  if (label !== shownScale) {
    shownScale = label;
    scaleText.textContent = label;
  }
  renderer.render(scene, camera);
}
requestAnimationFrame(animate);

// Without a camera the tree can still be scaled: mouse wheel, or drag / swipe up and down.
const MIN_SCALE = 0.6;
const MAX_SCALE = 2.7;
function nudgeScale(amount) {
  targetScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, targetScale + amount));
}
canvas.addEventListener('wheel', (event) => {
  event.preventDefault();
  nudgeScale(-event.deltaY * 0.0015);
}, { passive: false });
let dragY = null;
canvas.style.touchAction = 'none';
canvas.addEventListener('pointerdown', (event) => {
  dragY = event.clientY;
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener('pointermove', (event) => {
  if (dragY === null) return;
  nudgeScale((dragY - event.clientY) * 0.006);
  dragY = event.clientY;
});
for (const type of ['pointerup', 'pointercancel']) {
  canvas.addEventListener(type, () => { dragY = null; });
}

function updateScaleFromHand(landmarks) {
  const thumb = landmarks[4];
  const index = landmarks[8];

  const dx = thumb.x - index.x;
  const dy = thumb.y - index.y;
  const dz = (thumb.z || 0) - (index.z || 0);
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

  const minDistance = 0.03;
  const maxDistance = 0.35;
  const normalized = (distance - minDistance) / (maxDistance - minDistance);
  const clamped = Math.min(1, Math.max(0, normalized));

  targetScale = 0.6 + clamped * 2.1;
}

async function initHands() {
  if (!window.Hands || !window.Camera) {
    statusText.textContent = 'MediaPipe 加载失败，可用滚轮或上下拖动缩放';
    return;
  }

  const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.6,
    minTrackingConfidence: 0.55,
  });

  hands.onResults((results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      statusText.textContent = '检测到手势';
      updateScaleFromHand(results.multiHandLandmarks[0]);
    } else {
      statusText.textContent = '未检测到手，请把手移入画面';
    }
  });

  const cameraFeed = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480,
  });

  try {
    await cameraFeed.start();
    statusText.textContent = '摄像头已开启，开始手势识别';
  } catch (error) {
    console.error(error);
    statusText.textContent = '摄像头不可用，可用滚轮或上下拖动缩放';
  }
}

initHands();
