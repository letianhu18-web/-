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

function animate(time) {
  requestAnimationFrame(animate);

  currentScale += (targetScale - currentScale) * 0.12;
  treeGroup.scale.setScalar(currentScale);

  treeGroup.rotation.y = Math.sin(time * 0.00025) * 0.2;
  star.rotation.y += 0.02;

  scaleText.textContent = `${currentScale.toFixed(2)}x`;
  renderer.render(scene, camera);
}
requestAnimationFrame(animate);

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
    statusText.textContent = 'MediaPipe 加载失败';
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
    statusText.textContent = '摄像头权限被拒绝或不可用';
  }
}

initHands();
