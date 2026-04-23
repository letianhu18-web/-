const videoEl = document.getElementById("video");
const handCanvas = document.getElementById("hand-canvas");
const treeCanvas = document.getElementById("tree-canvas");
const statusEl = document.getElementById("status");
const scaleEl = document.getElementById("scale");

// ---------------- Three.js: 颗粒圣诞树 ----------------
const renderer = new THREE.WebGLRenderer({ canvas: treeCanvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0.3, 6.2);

const treeGroup = new THREE.Group();
scene.add(treeGroup);

function createParticleTree() {
  const points = [];
  const colors = [];
  const top = 2.4;
  const bottom = -2.2;
  const levels = 95;

  for (let i = 0; i < levels; i++) {
    const t = i / (levels - 1);
    const y = top + (bottom - top) * t;
    const radius = (1 - t) * 1.85 + 0.08;
    const count = Math.floor(50 + (1 - t) * 110);

    for (let j = 0; j < count; j++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius * Math.sqrt(Math.random());
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      points.push(x, y + (Math.random() - 0.5) * 0.05, z);

      // 自上而下轻微渐变
      const green = 0.6 + (1 - t) * 0.35;
      colors.push(0.15, green, 0.28);
    }
  }

  // 树干
  for (let i = 0; i < 700; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 0.23 * Math.sqrt(Math.random());
    const y = -2.25 + Math.random() * 1.2;
    points.push(Math.cos(angle) * r, y, Math.sin(angle) * r);
    colors.push(0.42, 0.26, 0.15);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    sizeAttenuation: true,
  });

  return new THREE.Points(geometry, material);
}

function createTopStar() {
  const star = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.11, 0),
    new THREE.MeshBasicMaterial({ color: 0xffe98d })
  );
  star.position.set(0, 2.55, 0);
  return star;
}

treeGroup.add(createParticleTree());
const star = createTopStar();
treeGroup.add(star);

// 漂浮粒子氛围
const snowGeo = new THREE.BufferGeometry();
const snowCount = 800;
const snow = [];
for (let i = 0; i < snowCount; i++) {
  snow.push((Math.random() - 0.5) * 12, Math.random() * 8 - 2, (Math.random() - 0.5) * 12);
}
snowGeo.setAttribute("position", new THREE.Float32BufferAttribute(snow, 3));
const snowMat = new THREE.PointsMaterial({ color: 0xdff4ff, size: 0.02, transparent: true, opacity: 0.7 });
const snowPoints = new THREE.Points(snowGeo, snowMat);
scene.add(snowPoints);

let targetScale = 1;
let currentScale = 1;

function animate() {
  requestAnimationFrame(animate);

  treeGroup.rotation.y += 0.004;
  star.rotation.y += 0.02;

  currentScale += (targetScale - currentScale) * 0.16;
  treeGroup.scale.setScalar(currentScale);

  const pos = snowGeo.attributes.position.array;
  for (let i = 1; i < pos.length; i += 3) {
    pos[i] -= 0.01;
    if (pos[i] < -2.2) pos[i] = 6;
  }
  snowGeo.attributes.position.needsUpdate = true;

  renderer.render(scene, camera);
}
animate();

// ---------------- 手势检测 ----------------
const handCtx = handCanvas.getContext("2d");
const hands = new Hands({ locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}` });
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.65,
  minTrackingConfidence: 0.6,
});

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

// “张开程度”：五指尖平均距掌心距离（比单一捏合更符合“张开”）
function fingerSpreadRatio(lm) {
  const palm = lm[0]; // wrist
  const tips = [lm[4], lm[8], lm[12], lm[16], lm[20]];
  const mcp = [lm[5], lm[9], lm[13], lm[17]];

  const tipDist = tips.reduce((sum, p) => sum + Math.hypot(p.x - palm.x, p.y - palm.y, p.z - palm.z), 0) / tips.length;
  const handBase = mcp.reduce((sum, p) => sum + Math.hypot(p.x - palm.x, p.y - palm.y, p.z - palm.z), 0) / mcp.length;

  return tipDist / Math.max(handBase, 1e-4);
}

hands.onResults((results) => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  handCanvas.width = w;
  handCanvas.height = h;
  handCtx.clearRect(0, 0, w, h);

  if (!results.multiHandLandmarks?.length) {
    statusEl.textContent = "状态：未检测到手，请将整只手放入画面";
    return;
  }

  const lm = results.multiHandLandmarks[0];
  drawConnectors(handCtx, lm, HAND_CONNECTIONS, { color: "#84c8ff", lineWidth: 3 });
  drawLandmarks(handCtx, lm, { color: "#fff7b0", lineWidth: 1, radius: 3 });

  const spread = fingerSpreadRatio(lm);
  targetScale = clamp(0.65 + (spread - 1) * 1.1, 0.6, 2.6);

  statusEl.textContent = "状态：检测到手势，按手指张开程度缩放中";
  scaleEl.textContent = `当前缩放：${targetScale.toFixed(2)}x`;
});

async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 960, height: 720, facingMode: "user" },
      audio: false,
    });

    videoEl.srcObject = stream;
    const cameraFeed = new Camera(videoEl, {
      width: 960,
      height: 720,
      onFrame: async () => {
        await hands.send({ image: videoEl });
      },
    });

    await cameraFeed.start();
    statusEl.textContent = "状态：摄像头已启动，请张开/收拢手掌控制圣诞树大小";
  } catch (error) {
    console.error(error);
    statusEl.textContent = "状态：摄像头启动失败，请检查权限并使用 HTTPS/localhost";
  }
}

initCamera();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
