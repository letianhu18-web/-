const field = document.querySelector("#flowerField");
const template = document.querySelector("#flowerTemplate");
const bloomButton = document.querySelector("#bloomButton");
const bouquetButton = document.querySelector("#bouquetButton");
const bouquet = document.querySelector("#bouquet");
const windButton = document.querySelector("#windButton");
const canvas = document.querySelector("#petal-canvas");
const ctx = canvas.getContext("2d");

const colors = ["#ff745f", "#e84f86", "#ff9dc7", "#f6bd4f", "#63a8ff", "#ad7cf0", "#ffffff"];
const notes = [
  "\u5988\u5988\u8f9b\u82e6\u5566",
  "\u6bcd\u4eb2\u8282\u5feb\u4e50",
  "\u6c38\u8fdc\u7231\u4f60",
  "\u4eca\u5929\u5f00\u6ee1\u82b1",
  "\u628a\u6e29\u67d4\u9001\u7ed9\u5988\u5988",
];
const petals = [];
let lastPointerBloom = 0;
let isPointerDrawing = false;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function createFlower(x, y, options = {}) {
  const flower = template.content.firstElementChild.cloneNode(true);
  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  const size = options.size ?? random(isMobile ? 48 : 58, isMobile ? 102 : 136);
  const color = options.color ?? colors[Math.floor(random(0, colors.length - 0.01))];
  const left = Math.max(8, Math.min(window.innerWidth - size - 8, x - size / 2));
  const top = Math.max(70, Math.min(window.innerHeight - size * 1.55, y - size * 1.2));

  flower.style.left = `${left}px`;
  flower.style.top = `${top}px`;
  flower.style.setProperty("--size", `${size}px`);
  flower.style.setProperty("--flower-color", color);
  flower.style.setProperty("--tilt", `${random(-10, 10)}deg`);
  flower.style.setProperty("--delay", `${random(0, 420)}ms`);
  flower.style.setProperty("--sway", `${random(4.2, 7.2)}s`);

  flower.addEventListener("click", (event) => {
    event.stopPropagation();
    danceFlower(flower);
    burstPetals(left + size / 2, top + size * 0.38, 18);
    showNote(left + size / 2, top + size * 0.25);
  });

  field.appendChild(flower);
  trimFlowers();
}

function trimFlowers() {
  const maxFlowers = window.matchMedia("(max-width: 760px)").matches ? 82 : 130;
  const flowers = field.querySelectorAll(".flower");
  if (flowers.length <= maxFlowers) return;
  flowers[0].remove();
}

function danceFlower(flower) {
  flower.classList.remove("dance");
  window.requestAnimationFrame(() => {
    flower.classList.add("dance");
  });
}

function showNote(x, y, text = notes[Math.floor(random(0, notes.length - 0.01))]) {
  const note = document.createElement("div");
  note.className = "heart-note";
  note.textContent = text;
  note.style.left = `${x}px`;
  note.style.top = `${y}px`;
  document.body.appendChild(note);
  note.addEventListener("animationend", () => note.remove());
}

function addPetal(x, y, intensity = 1) {
  petals.push({
    x,
    y,
    vx: random(-2.6, 2.6) * intensity,
    vy: random(-4.8, -1.1) * intensity,
    drift: random(-0.03, 0.03),
    spin: random(-0.16, 0.16),
    angle: random(0, Math.PI * 2),
    size: random(7, 16),
    color: colors[Math.floor(random(0, colors.length - 0.01))],
    life: random(130, 230),
  });
}

function burstPetals(x, y, count = 24, intensity = 1) {
  for (let i = 0; i < count; i += 1) {
    addPetal(x + random(-24, 24), y + random(-20, 20), intensity);
  }
}

function drawPetal(petal) {
  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.rotate(petal.angle);
  ctx.fillStyle = petal.color;
  ctx.globalAlpha = Math.max(0, Math.min(1, petal.life / 90));
  ctx.beginPath();
  ctx.ellipse(0, 0, petal.size * 0.48, petal.size, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function animatePetals() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = petals.length - 1; i >= 0; i -= 1) {
    const petal = petals[i];
    petal.x += petal.vx;
    petal.y += petal.vy;
    petal.vy += 0.045;
    petal.vx += petal.drift;
    petal.angle += petal.spin;
    petal.life -= 1;
    drawPetal(petal);

    if (petal.life <= 0 || petal.y > window.innerHeight + 40) {
      petals.splice(i, 1);
    }
  }
  window.requestAnimationFrame(animatePetals);
}

function plantInitialGarden() {
  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  const rows = isMobile
    ? [
        { y: 0.68, count: 14, min: 48, max: 92 },
        { y: 0.8, count: 18, min: 56, max: 108 },
        { y: 0.92, count: 20, min: 60, max: 120 },
      ]
    : [
        { y: 0.72, count: 28, min: 58, max: 118 },
        { y: 0.82, count: 34, min: 66, max: 140 },
        { y: 0.92, count: 38, min: 72, max: 158 },
      ];

  rows.forEach((row) => {
    for (let i = 0; i < row.count; i += 1) {
      createFlower(
        random(0, window.innerWidth),
        window.innerHeight * row.y + random(-22, 28),
        { size: random(row.min, row.max) },
      );
    }
  });

  for (let i = 0; i < (isMobile ? 16 : 30); i += 1) {
    setTimeout(() => addPetal(random(0, window.innerWidth), random(-20, window.innerHeight * 0.35), 0.65), i * 80);
  }
}

function bloomCluster() {
  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  const centerX = random(window.innerWidth * 0.32, window.innerWidth * 0.78);
  const centerY = random(window.innerHeight * 0.48, window.innerHeight * 0.9);
  const count = isMobile ? 10 : 18;
  for (let i = 0; i < count; i += 1) {
    setTimeout(() => {
      createFlower(centerX + random(isMobile ? -130 : -220, isMobile ? 130 : 220), centerY + random(-80, 120), {
        size: random(isMobile ? 46 : 58, isMobile ? 96 : 132),
      });
    }, i * 55);
  }
  burstPetals(centerX, centerY - 80, isMobile ? 30 : 46, 1.2);
  showNote(centerX, centerY - 170, "\u82b1\u90fd\u5f00\u597d\u5566");
}

function sendBouquet() {
  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  const baseTransform = isMobile ? "translateX(-50%)" : "translateY(0)";
  bouquet.animate(
    [
      { transform: baseTransform, offset: 0 },
      { transform: `${baseTransform} translateY(-14px) scale(1.04)`, offset: 0.46 },
      { transform: baseTransform, offset: 1 },
    ],
    { duration: 700, easing: "ease-out" },
  );
  burstPetals(window.innerWidth * (isMobile ? 0.5 : 0.78), window.innerHeight * 0.72, isMobile ? 42 : 60, 1.35);
  showNote(window.innerWidth * 0.5, window.innerHeight * 0.38, "\u9001\u7ed9\u5988\u5988\uff1a\u6bcd\u4eb2\u8282\u5feb\u4e50");
}

window.addEventListener("resize", () => {
  resizeCanvas();
});

document.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button") || event.target.closest(".message-panel") || event.target.closest(".bouquet")) {
    return;
  }
  isPointerDrawing = true;
  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  createFlower(event.clientX, event.clientY, { size: random(isMobile ? 52 : 70, isMobile ? 104 : 132) });
  burstPetals(event.clientX, event.clientY, 16, 0.85);
});

document.addEventListener("pointermove", (event) => {
  if (!isPointerDrawing && !event.buttons) return;
  const now = Date.now();
  if (now - lastPointerBloom < 90) return;
  lastPointerBloom = now;
  addPetal(event.clientX, event.clientY, 0.7);
  if (Math.random() > 0.72) {
    createFlower(event.clientX + random(-26, 26), event.clientY + random(-10, 40), {
      size: random(42, 84),
    });
  }
});

document.addEventListener("pointerup", () => {
  isPointerDrawing = false;
});

document.addEventListener("pointercancel", () => {
  isPointerDrawing = false;
});

bloomButton.addEventListener("click", bloomCluster);
bouquetButton.addEventListener("click", sendBouquet);
bouquet.addEventListener("click", sendBouquet);
windButton.addEventListener("click", () => {
  for (let i = 0; i < 90; i += 1) {
    setTimeout(() => addPetal(random(0, window.innerWidth), random(0, window.innerHeight * 0.7), 1.1), i * 12);
  }
});

resizeCanvas();
plantInitialGarden();
animatePetals();
