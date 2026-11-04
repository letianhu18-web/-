(function () {
  "use strict";
  const W = 420,
    H = 700,
    LINE = 150,
    DROP_Y = 72;
  let R = [],
    N = 0,
    imgs = [];
  const G = 1500,
    E = 0.5,
    MU = 0.4,
    MUW = 0.5,
    EW = 0.45;
  const SUB = 4,
    ITER = 2,
    SPIN = 0.08;

  const canvas = document.getElementById("c");
  const ctx = canvas.getContext("2d");
  const elSc = document.getElementById("sc"),
    elBest = document.getElementById("best");
  const elOver = document.getElementById("over"),
    elFs = document.getElementById("fs");

  // Start downloading before the first gesture; decode when audio is unlocked.
  const collisionData = fetch("assets/audio/collision.wav")
    .then((response) => {
      if (!response.ok) throw new Error("Collision audio unavailable");
      return response.arrayBuffer();
    })
    .catch(() => null);
  let collisionBuffer = null;

  let AC = null,
    muted = false,
    lastHit = 0;
  try { muted = localStorage.getItem("merz_muted") === "1"; } catch (_) {}
  function ac() {
    if (!AC) {
      try {
        AC = new (window.AudioContext || window.webkitAudioContext)();
        collisionData
          .then(async (data) => {
            if (data) collisionBuffer = await AC.decodeAudioData(data);
          })
          .catch(() => {});
      } catch (e) {}
    }
    if (AC && AC.state === "suspended") AC.resume();
    return AC;
  }
  function tone(f, d, type, vol, to, delay) {
    if (muted) return;
    const c = ac();
    if (!c) return;
    const t = c.currentTime + (delay || 0),
      o = c.createOscillator(),
      g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + d);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g);
    g.connect(c.destination);
    o.start(t);
    o.stop(t + d + 0.02);
  }
  const sfxDrop = () => tone(520, 0.1, "sine", 0.22, 820);
  const sfxHit = (v) => {
    if (muted) return;
    const c = ac();
    if (!c) return;
    const n = performance.now();
    if (n - lastHit < 80) return;
    lastHit = n;
    if (!collisionBuffer) {
      // Preserve feedback if the sample has not loaded or cannot be decoded.
      const f = 620 + Math.random() * 320;
      tone(f, 0.09, "sine", Math.min(0.16, v / 3000), f * 1.5);
      return;
    }
    const source = c.createBufferSource();
    const gain = c.createGain();
    source.buffer = collisionBuffer;
    gain.gain.value = Math.min(0.65, v / 1200);
    source.connect(gain);
    gain.connect(c.destination);
    source.onended = () => {
      source.disconnect();
      gain.disconnect();
    };
    source.start();
  };
  function sfxMerge(lv) {
    const f = 523 * Math.pow(2, lv / 8);
    tone(f, 0.14, "sine", 0.26, f * 1.25);
    tone(f * 1.5, 0.18, "sine", 0.2, f * 1.9, 0.07);
    tone(f * 2, 0.2, "triangle", 0.1, null, 0.14);
  }
  const sfxOver = () => {
    tone(520, 0.25, "sine", 0.22, 330);
    tone(392, 0.25, "sine", 0.2, 247, 0.2);
    tone(294, 0.5, "sine", 0.2, 175, 0.4);
  };

  let balls,
    effects,
    popups,
    score,
    best = 0,
    heldLv,
    nextLv,
    cool,
    over,
    aimX,
    acc = 0,
    last = 0;
  let undoState = null;
  let pointerId = null;
  const t = (key) => window.i18n.t(key);
  const pauseButton = document.getElementById("pause-game");
  const undoButton = document.getElementById("undo-drop");
  const nextCanvas = document.getElementById("next-face");
  const nextContext = nextCanvas.getContext("2d");
  const pauseOverlay = document.getElementById("pause-overlay");
  function updateNext() {
    nextContext.clearRect(0, 0, 64, 64);
    if (imgs[nextLv]) nextContext.drawImage(imgs[nextLv], 0, 0, 64, 64);
    notifyMerz();
  }
  function notifyMerz() {
    window.onMerzState?.({held: heldLv, next: nextLv,
      highest: Math.max(0, ...(balls || []).map(ball => ball.lv)), score});
  }
  function recordBest() {
    if (score <= best) return;
    best = score;
    elBest.textContent = best;
    try { localStorage.setItem("merz_heinz_best", String(best)); } catch (_) {}
  }
  try {
    best = +localStorage.getItem("merz_heinz_best") || 0;
  } catch (e) {}
  elBest.textContent = best;

  // Spawn from roughly the lower half of the levels (8 levels -> 1-4, 11 -> 1-5);
  // spawning up to level 5 of 8 filled the board in ~40 drops.
  let spawnLevels = 1;
  const rnd = () => Math.floor(Math.random() * spawnLevels);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function mk(lv, x, y) {
    const r = R[lv];
    return {
      lv,
      r,
      m: r * r,
      x,
      y,
      vx: 0,
      vy: 0,
      a: Math.random() * 6.283,
      w: 0,
      age: 0,
      over: 0,
      dead: false,
      pop: 1,
    };
  }

  function reset() {
    merges = [];
    undoState = null;
    undoButton.disabled = true;
    pointerId = null;
    acc = 0;
    update.danger = false;
    balls = [];
    effects = [];
    popups = [];
    score = 0;
    over = false;
    cool = 0;
    heldLv = rnd();
    nextLv = rnd();
    aimX = W / 2;
    elSc.textContent = 0;
    elOver.classList.remove("show");
    updateNext();
  }

  let merges = [];
  function pair(a, b) {
    const dx = b.x - a.x,
      dy = b.y - a.y,
      rr = a.r + b.r,
      d2 = dx * dx + dy * dy;
    if (d2 >= rr * rr) return;
    if (a.lv === b.lv) {
      a.dead = b.dead = true;
      merges.push([a, b]);
      return;
    }
    const d = Math.sqrt(d2) || 0.0001,
      nx = dx / d,
      ny = dy / d,
      ov = rr - d;
    const ia = 1 / a.m,
      ib = 1 / b.m,
      s = (ov * 0.85) / (ia + ib);
    a.x -= nx * s * ia;
    a.y -= ny * s * ia;
    b.x += nx * s * ib;
    b.y += ny * s * ib;
    const rax = nx * a.r,
      ray = ny * a.r,
      rbx = -nx * b.r,
      rby = -ny * b.r;
    let rvx = b.vx - b.w * rby - (a.vx - a.w * ray),
      rvy = b.vy + b.w * rbx - (a.vy + a.w * rax);
    const vn = rvx * nx + rvy * ny;
    if (vn >= 0) return;
    if (-vn > 200) sfxHit(-vn);
    const e = -vn > 25 ? E : 0;
    const j = (-(1 + e) * vn) / (ia + ib);
    a.vx -= j * nx * ia;
    a.vy -= j * ny * ia;
    b.vx += j * nx * ib;
    b.vy += j * ny * ib;
    rvx = b.vx - b.w * rby - (a.vx - a.w * ray);
    rvy = b.vy + b.w * rbx - (a.vy + a.w * rax);
    const tx = -ny,
      ty = nx,
      vt = rvx * tx + rvy * ty;
    let jt = -vt / (3 * (ia + ib));
    const mx = MU * j;
    jt = clamp(jt, -mx, mx);
    a.vx -= jt * tx * ia;
    a.vy -= jt * ty * ia;
    b.vx += jt * tx * ib;
    b.vy += jt * ty * ib;
    a.w += (SPIN * -jt * a.r) / (0.5 * a.m * a.r * a.r);
    b.w += (SPIN * -jt * b.r) / (0.5 * b.m * b.r * b.r);
  }

  function wall(b, nx, ny, pen) {
    b.x -= nx * pen;
    b.y -= ny * pen;
    const rx = nx * b.r,
      ry = ny * b.r;
    const vcx = b.vx - b.w * ry,
      vcy = b.vy + b.w * rx;
    const vn = vcx * nx + vcy * ny;
    if (vn <= 0) return;
    if (vn > 200) sfxHit(vn);
    const e = vn > 25 ? EW : 0;
    const J = (1 + e) * vn * b.m;
    b.vx -= (J * nx) / b.m;
    b.vy -= (J * ny) / b.m;
    const tx = -ny,
      ty = nx,
      vt = vcx * tx + vcy * ty;
    let jt = (-vt * b.m) / 3;
    const mx = MUW * J;
    jt = clamp(jt, -mx, mx);
    b.vx += (jt * tx) / b.m;
    b.vy += (jt * ty) / b.m;
    b.w += (SPIN * -jt * b.r) / (0.5 * b.m * b.r * b.r);
  }

  function substep(dt) {
    for (const b of balls) {
      b.vy += G * dt;
      const k = 1 - 0.5 * dt;
      b.vx *= k;
      b.vy *= k;
      b.w *= Math.max(0, 1 - 16 * dt);
      const sp = Math.hypot(b.vx, b.vy);
      if (sp > 1100) {
        b.vx *= 1100 / sp;
        b.vy *= 1100 / sp;
      }
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.a += b.w * dt;
    }
    for (let it = 0; it < ITER; it++) {
      for (const b of balls) {
        if (b.dead) continue;
        let p;
        if ((p = b.r - b.x) > 0) wall(b, -1, 0, p);
        if ((p = b.x + b.r - W) > 0) wall(b, 1, 0, p);
        if ((p = b.y + b.r - H) > 0) wall(b, 0, 1, p);
      }
      for (let i = 0; i < balls.length; i++) {
        const a = balls[i];
        if (a.dead) continue;
        for (let j = i + 1; j < balls.length; j++) {
          if (a.dead) break; // A ball can participate in only one merge per substep.
          const b = balls[j];
          if (b.dead) continue;
          pair(a, b);
        }
      }
    }
    if (merges.length) doMerges();
  }

  function doMerges() {
    const add = [];
    for (const [a, b] of merges) {
      const x = (a.x + b.x) / 2,
        y = (a.y + b.y) / 2;
      effects.push({ x, y, r: a.r, t: 0 });
      sfxMerge(a.lv);
      if (a.lv === N - 1) {
        score += 200;
        popups.push({ x, y, text: "+200", t: 0 });
        continue;
      }
      const nb = mk(a.lv + 1, x, y);
      nb.vx = (a.vx + b.vx) / 2;
      nb.vy = (a.vy + b.vy) / 2;
      nb.w = (a.w + b.w) / 2;
      nb.a = a.a;
      nb.age = Math.max(a.age, b.age);
      nb.pop = 0.55;
      add.push(nb);
      const gain = ((nb.lv + 1) * (nb.lv + 2)) / 2;
      score += gain;
      popups.push({ x, y: y - nb.r * 0.4, text: "+" + gain, t: 0 });
    }
    merges = [];
    balls = balls.filter((b) => !b.dead).concat(add);
    elSc.textContent = score;
    recordBest();
    notifyMerz();
  }

  function drop() {
    if (paused || over || cool > 0 || heldLv < 0) return;
    undoState = {
      balls: balls.map((ball) => ({ ...ball })),
      score, heldLv, nextLv, aimX, cool,
    };
    undoButton.disabled = false;
    const r = R[heldLv];
    const b = mk(heldLv, clamp(aimX, r + 2, W - r - 2), DROP_Y);
    b.vy = 60;
    balls.push(b);
    heldLv = -1;
    cool = 0.55;
    sfxDrop();
  }

  function endGame() {
    over = true;
    sfxOver();
    recordBest();
    elFs.textContent = score;
    elOver.classList.add("show");
  }

  function update(dt) {
    if (over) return;
    if (cool > 0) {
      cool -= dt;
      if (cool <= 0) {
        heldLv = nextLv;
        nextLv = rnd();
        updateNext();
      }
    }
    for (let i = 0; i < SUB; i++) substep(dt / SUB);
    let danger = false;
    for (const b of balls) {
      b.age += dt;
      b.pop += (1 - b.pop) * Math.min(1, dt * 14);
      if (b.age > 0.9 && b.y - b.r < LINE) {
        b.over += dt;
        danger = true;
      } else b.over = 0;
      if (b.over > 2) {
        endGame();
        break;
      }
    }
    update.danger = danger;
    for (const f of effects) f.t += dt;
    effects = effects.filter((f) => f.t < 0.35);
    for (const p of popups) p.t += dt;
    popups = popups.filter((p) => p.t < 0.8);
  }

  let palette = window.gamePalette.get();
  document.addEventListener("palettechange", () => {
    palette = window.gamePalette.get();
    draw.bg = null;
    sprites = [];
  });

  // Per-level sprites rendered once at device resolution. Downscaling the 320px
  // photos with high-quality smoothing on every frame was the main draw cost on phones.
  let sprites = [];
  const badgeColors = ["#a8d5ff", "#e5bd51", "#72d2c2", "#b899ee", "#f58d73", "#70b5f3", "#f08fc0", "#ffe8a0"];
  function sprite(lv) {
    if (sprites[lv]) return sprites[lv];
    const k = canvas.width / W,
      r = R[lv],
      badge = Math.max(7, Math.min(14, r * 0.29));
    const body = document.createElement("canvas");
    body.width = body.height = Math.max(1, Math.ceil(2 * r * k));
    const b = body.getContext("2d");
    b.imageSmoothingEnabled = true;
    b.imageSmoothingQuality = "high";
    b.scale(k, k);
    b.drawImage(imgs[lv], 0, 0, 2 * r, 2 * r);
    b.beginPath();
    b.arc(r, r, r - 1, 0, 6.2832);
    b.strokeStyle = palette.ballBorder + "d9";
    b.lineWidth = 2;
    b.stroke();
    // Level badges keep similar Merz expressions easy to distinguish.
    const tag = document.createElement("canvas");
    tag.width = tag.height = Math.max(1, Math.ceil(2 * badge * k));
    const c = tag.getContext("2d");
    c.scale(k, k);
    c.beginPath();
    c.arc(badge, badge, badge, 0, 6.2832);
    c.fillStyle = badgeColors[lv % badgeColors.length];
    c.fill();
    c.fillStyle = "#101824";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = "bold " + Math.round(badge * 1.3) + "px system-ui";
    c.fillText(lv + 1, badge, badge + 0.5);
    return (sprites[lv] = { body, tag, badge });
  }

  function drawBall(lv, x, y, a, scale) {
    const r = R[lv] * scale,
      s = sprite(lv);
    if (a) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(a);
      ctx.drawImage(s.body, -r, -r, 2 * r, 2 * r);
      ctx.restore();
    } else ctx.drawImage(s.body, x - r, y - r, 2 * r, 2 * r);
    const bx = x + r * 0.64,
      by = y + r * 0.64,
      br = s.badge * scale;
    ctx.drawImage(s.tag, bx - br, by - br, 2 * br, 2 * br);
  }

  // Where the held ball would come to rest if dropped straight down.
  function landingY(x, r) {
    let y = H - r;
    for (const b of balls) {
      const dx = b.x - x,
        rr = b.r + r;
      if (Math.abs(dx) < rr) y = Math.min(y, b.y - Math.sqrt(rr * rr - dx * dx));
    }
    return Math.max(DROP_Y, y);
  }

  function draw(now) {
    const sx = canvas.width / W,
      sy = canvas.height / H;
    ctx.setTransform(sx, 0, 0, sy, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    if (!draw.bg) {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, palette.boardTop);
      g.addColorStop(1, palette.boardBottom);
      draw.bg = g;
    }
    ctx.fillStyle = draw.bg;
    ctx.fillRect(0, 0, W, H);

    const blink = update.danger && Math.floor(now / 180) % 2 === 0;
    ctx.setLineDash([10, 8]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = blink ? palette.guide : palette.guide + "99";
    ctx.beginPath();
    ctx.moveTo(0, LINE);
    ctx.lineTo(W, LINE);
    ctx.stroke();
    ctx.setLineDash([]);

    if (!over && heldLv >= 0) {
      const r = R[heldLv],
        x = clamp(aimX, r + 2, W - r - 2),
        ly = landingY(x, r);
      ctx.setLineDash([4, 8]);
      ctx.strokeStyle = palette.guide + "66";
      ctx.lineWidth = 2;
      if (ly - r > DROP_Y + r) {
        ctx.beginPath();
        ctx.moveTo(x, DROP_Y + r);
        ctx.lineTo(x, ly - r);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(x, ly, r - 1, 0, 6.2832);
      ctx.stroke();
      ctx.setLineDash([]);
      drawBall(heldLv, x, DROP_Y, 0, 1);
    }

    for (const b of balls) drawBall(b.lv, b.x, b.y, b.a, b.pop);

    // Countdown ring on balls stuck above the line (game over after 2 s).
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ff5a5a";
    for (const b of balls) {
      if (b.over <= 0) continue;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r + 3, -Math.PI / 2, -Math.PI / 2 + 6.2832 * Math.min(1, b.over / 2));
      ctx.stroke();
    }

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "800 22px system-ui";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#101824";
    ctx.fillStyle = palette.effect;
    for (const p of popups) {
      const y = p.y - 36 * p.t;
      ctx.globalAlpha = Math.min(1, 2.5 * (1 - p.t / 0.8));
      ctx.strokeText(p.text, p.x, y);
      ctx.fillText(p.text, p.x, y);
    }
    ctx.globalAlpha = 1;

    for (const f of effects) {
      const p = f.t / 0.35;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r * (1 + p * 0.7), 0, 6.2832);
      ctx.strokeStyle =
        palette.effect +
        Math.round(255 * 0.7 * (1 - p))
          .toString(16)
          .padStart(2, "0");
      ctx.lineWidth = 4 * (1 - p) + 1;
      ctx.stroke();
    }
  }

  function fit() {
    const app = document.getElementById("app");
    const style = getComputedStyle(app);
    const viewportHeight = window.visualViewport?.height || innerHeight;
    const viewportWidth = window.visualViewport?.width || innerWidth;
    const used = document.getElementById("top").offsetHeight +
      document.getElementById("game-info").offsetHeight +
      (document.getElementById("merz-progress")?.offsetHeight || 0) + 24 +
      parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const scale = Math.max(0.05, Math.min((viewportWidth - 24) / W,
      (viewportHeight - used) / H, 1));
    const cw = W * scale, ch = H * scale;
    canvas.style.width = cw + "px";
    canvas.style.height = ch + "px";
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cw * dpr);
    canvas.height = Math.round(ch * dpr);
    draw.bg = null;
    sprites = [];
    if (imgs.length) draw(performance.now());
  }

  let paused = true;
  let frameId = 0;
  const STEP = 1 / 60;
  function requestFrame() {
    if (!frameId && !paused && !document.hidden) frameId = requestAnimationFrame(loop);
  }
  function setPaused(value, showOverlay = true) {
    paused = value;
    pointerId = null;
    acc = 0;
    last = performance.now();
    pauseOverlay.hidden = !(value && showOverlay);
    pauseButton.textContent = t(value ? "继续" : "暂停");
    pauseButton.setAttribute("aria-pressed", String(value));
    if (value) {
      cancelAnimationFrame(frameId);
      frameId = 0;
      if (AC?.state === "running") AC.suspend().catch(() => {});
    } else {
      if (AC?.state === "suspended") AC.resume().catch(() => {});
      requestFrame();
      canvas.focus({ preventScroll: true });
    }
  }
  function loop(now) {
    frameId = 0;
    if (paused || document.hidden) return;
    acc += Math.max(0, Math.min(0.1, (now - last) / 1000));
    last = now;
    while (acc + 1e-10 >= STEP) {
      update(STEP);
      acc -= STEP;
    }
    draw(now);
    requestFrame();
  }

  const px = (e) => {
    const r = canvas.getBoundingClientRect();
    return ((e.clientX - r.left) / r.width) * W;
  };
  canvas.addEventListener("pointerdown", (e) => {
    if (paused || over || pointerId !== null || e.isPrimary === false || e.button !== 0) return;
    e.preventDefault();
    ac();
    pointerId = e.pointerId;
    aimX = clamp(px(e), 0, W);
    try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
  });
  canvas.addEventListener("pointermove", (e) => {
    if (paused || (pointerId !== null && pointerId !== e.pointerId)) return;
    if (e.pointerType === "mouse" || pointerId === e.pointerId) aimX = clamp(px(e), 0, W);
  });
  canvas.addEventListener("pointerup", (e) => {
    if (pointerId !== e.pointerId) return;
    pointerId = null;
    aimX = clamp(px(e), 0, W);
    drop();
  });
  const cancelPointer = () => { pointerId = null; };
  canvas.addEventListener("pointercancel", cancelPointer);
  canvas.addEventListener("lostpointercapture", cancelPointer);
  window.addEventListener("keydown", (e) => {
    if (document.getElementById("app").hidden || e.target.closest("button, input, select, textarea, dialog")) return;
    if (e.key === "p" || e.key === "P" || e.key === "Escape") {
      e.preventDefault();
      if (!over) setPaused(!paused);
      return;
    }
    if (paused || over) return;
    if (["ArrowLeft", "ArrowRight", " ", "ArrowDown"].includes(e.key)) e.preventDefault();
    if (e.key === "ArrowLeft") aimX = clamp(aimX - 14, 0, W);
    else if (e.key === "ArrowRight") aimX = clamp(aimX + 14, 0, W);
    else if ((e.key === " " || e.key === "ArrowDown") && !e.repeat) { ac(); drop(); }
  });
  pauseButton.addEventListener("click", () => { if (!over) setPaused(!paused); });
  document.getElementById("resume-game").addEventListener("click", () => setPaused(false));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !paused && !over) setPaused(true);
  });
  window.addEventListener("blur", () => {
    if (!paused && !over) setPaused(true);
  });
  undoButton.addEventListener("click", () => {
    if (!undoState) return;
    ({ balls, score, heldLv, nextLv, aimX, cool } = undoState);
    undoState = null;
    undoButton.disabled = true;
    merges = [];
    effects = [];
    popups = [];
    over = false;
    update.danger = false;
    elSc.textContent = score;
    elOver.classList.remove("show");
    updateNext();
    setPaused(false);
  });
  const restartDialog = document.getElementById("restart-dialog");
  document.getElementById("re").addEventListener("click", () => {
    if (!balls.length) { reset(); setPaused(false); return; }
    setPaused(true);
    restartDialog.returnValue = "cancel";
    restartDialog.showModal();
  });
  restartDialog.addEventListener("close", () => {
    if (restartDialog.returnValue === "restart") reset();
    setPaused(false);
  });
  const snd = document.getElementById("snd");
  snd.textContent = muted ? "🔇" : "🔊";
  snd.setAttribute("aria-pressed", String(muted));
  snd.addEventListener("click", () => {
    muted = !muted;
    snd.textContent = muted ? "🔇" : "🔊";
    snd.setAttribute("aria-pressed", String(muted));
    try { localStorage.setItem("merz_muted", muted ? "1" : "0"); } catch (_) {}
    if (!muted) {
      ac();
      sfxDrop();
    }
  });
  document.getElementById("again").addEventListener("click", () => { reset(); setPaused(false); });
  window.addEventListener("resize", fit);
  window.visualViewport?.addEventListener("resize", fit);
  document.addEventListener("languagechange", () => {
    pauseButton.textContent = t(paused ? "继续" : "暂停");
    if (imgs.length) fit();
  });

  window.mergeGame = {
    pause() {
      setPaused(true, false);
    },
    start(images) {
      if (!Array.isArray(images) || images.length < 2 || images.length > 15) {
        throw new Error("A theme must contain 2–15 images");
      }
      imgs = images;
      N = imgs.length;
      R =
        N === 11
          ? [17, 24, 32, 40, 50, 60, 72, 85, 99, 114, 130]
          : Array.from(
              { length: N },
              (_, i) => 17 + 113 * Math.pow(i / (N - 1), 1.3),
            );
      spawnLevels = Math.max(1, Math.min(5, Math.round(N / 2)));
      sprites = [];
      reset();
      fit();
      setPaused(false);
      canvas.focus({ preventScroll: true });
    },
  };
})();
