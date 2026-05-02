import * as THREE from "three";

// ---------- DOM ----------
const canvas = document.getElementById("game");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const lengthEl = document.getElementById("length");
const speedEl = document.getElementById("speed");
const avatarImg = document.getElementById("avatar-img");
const avatarInput = document.getElementById("avatar-input");
const avatarReset = document.getElementById("avatar-reset");
const speedRange = document.getElementById("speed-range");
const gridSizeSel = document.getElementById("grid-size");
const wrapChk = document.getElementById("wrap");
const restartBtn = document.getElementById("restart");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayText = document.getElementById("overlay-text");
const overlayBtn = document.getElementById("overlay-btn");

// ---------- Game config ----------
const CONFIG = {
  gridSize: 20,
  cellSize: 1,
  baseTicksPerSecond: 6,
  wrap: false,
};

// ---------- Three.js ----------
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color("#0a0d1c");
scene.fog = new THREE.Fog("#0a0d1c", 25, 70);

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);

// ---------- Lighting ----------
const ambient = new THREE.AmbientLight(0x9aa6ff, 0.55);
scene.add(ambient);

const hemi = new THREE.HemisphereLight(0x88a4ff, 0x1a1530, 0.5);
scene.add(hemi);

const sun = new THREE.DirectionalLight(0xffffff, 1.1);
sun.position.set(12, 22, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -20;
sun.shadow.camera.right = 20;
sun.shadow.camera.top = 20;
sun.shadow.camera.bottom = -20;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 80;
sun.shadow.bias = -0.0005;
scene.add(sun);

const rim = new THREE.PointLight(0x7c8cff, 1.2, 40);
rim.position.set(-10, 6, -8);
scene.add(rim);

const accent = new THREE.PointLight(0x41e0c2, 1.0, 40);
accent.position.set(10, 6, 8);
scene.add(accent);

// ---------- Board ----------
const boardGroup = new THREE.Group();
scene.add(boardGroup);

let groundMesh = null;
let gridHelper = null;
let wallsGroup = null;

function buildBoard(N) {
  while (boardGroup.children.length) {
    const c = boardGroup.children.pop();
    c.geometry?.dispose?.();
    c.material?.dispose?.();
  }

  const size = N * CONFIG.cellSize;

  const groundGeo = new THREE.BoxGeometry(size + 1.2, 0.4, size + 1.2);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x12152a,
    roughness: 0.85,
    metalness: 0.15,
  });
  groundMesh = new THREE.Mesh(groundGeo, groundMat);
  groundMesh.position.y = -0.2;
  groundMesh.receiveShadow = true;
  boardGroup.add(groundMesh);

  const tileGeo = new THREE.PlaneGeometry(CONFIG.cellSize * 0.96, CONFIG.cellSize * 0.96);
  const tileMatA = new THREE.MeshStandardMaterial({
    color: 0x1a2040,
    roughness: 0.7,
    metalness: 0.1,
  });
  const tileMatB = new THREE.MeshStandardMaterial({
    color: 0x141831,
    roughness: 0.7,
    metalness: 0.1,
  });

  const tilesA = new THREE.InstancedMesh(tileGeo, tileMatA, Math.ceil((N * N) / 2) + 2);
  const tilesB = new THREE.InstancedMesh(tileGeo, tileMatB, Math.ceil((N * N) / 2) + 2);
  tilesA.receiveShadow = true;
  tilesB.receiveShadow = true;

  const dummy = new THREE.Object3D();
  let aIndex = 0;
  let bIndex = 0;
  for (let x = 0; x < N; x++) {
    for (let z = 0; z < N; z++) {
      dummy.position.set(cellToWorld(x, N), 0.01, cellToWorld(z, N));
      dummy.rotation.x = -Math.PI / 2;
      dummy.updateMatrix();
      if ((x + z) % 2 === 0) {
        tilesA.setMatrixAt(aIndex++, dummy.matrix);
      } else {
        tilesB.setMatrixAt(bIndex++, dummy.matrix);
      }
    }
  }
  tilesA.count = aIndex;
  tilesB.count = bIndex;
  tilesA.instanceMatrix.needsUpdate = true;
  tilesB.instanceMatrix.needsUpdate = true;
  boardGroup.add(tilesA, tilesB);

  // Glowing walls around the perimeter
  wallsGroup = new THREE.Group();
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x1c2350,
    emissive: 0x4a5cff,
    emissiveIntensity: 0.35,
    roughness: 0.4,
    metalness: 0.6,
  });
  const wallH = 0.45;
  const halfSize = size / 2;
  const wallThickness = 0.2;
  const long = size + wallThickness * 2;

  const makeWall = (w, h, d, x, y, z) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  };
  wallsGroup.add(makeWall(long, wallH, wallThickness, 0, wallH / 2, -halfSize - wallThickness / 2));
  wallsGroup.add(makeWall(long, wallH, wallThickness, 0, wallH / 2, halfSize + wallThickness / 2));
  wallsGroup.add(makeWall(wallThickness, wallH, long, -halfSize - wallThickness / 2, wallH / 2, 0));
  wallsGroup.add(makeWall(wallThickness, wallH, long, halfSize + wallThickness / 2, wallH / 2, 0));
  boardGroup.add(wallsGroup);

  if (CONFIG.wrap) {
    wallsGroup.visible = false;
  }
}

function cellToWorld(c, N = CONFIG.gridSize) {
  return (c - (N - 1) / 2) * CONFIG.cellSize;
}

// ---------- Avatar texture ----------
const textureLoader = new THREE.TextureLoader();
let headAvatarTexture = null;

function makeDefaultAvatarCanvas() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  const grd = ctx.createLinearGradient(0, 0, 256, 256);
  grd.addColorStop(0, "#6a78ff");
  grd.addColorStop(0.5, "#9d6cff");
  grd.addColorStop(1, "#41e0c2");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = "rgba(255,255,255,0.16)";
  for (let i = 0; i < 60; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * 256, Math.random() * 256, Math.random() * 2 + 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.arc(128, 150, 92, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "700 76px 'PingFang SC','Microsoft YaHei',sans-serif";
  ctx.fillText("王一博", 128, 140);

  ctx.font = "600 22px -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText("WYB", 128, 200);

  return c;
}

const DEFAULT_AVATAR_CANVAS = makeDefaultAvatarCanvas();
const DEFAULT_AVATAR_URL = DEFAULT_AVATAR_CANVAS.toDataURL("image/png");

function makeTextureFromImage(img) {
  const tex = new THREE.Texture(img);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy?.() ?? 4;
  tex.needsUpdate = true;
  return tex;
}

headAvatarTexture = makeTextureFromImage(DEFAULT_AVATAR_CANVAS);
avatarImg.src = DEFAULT_AVATAR_URL;

function setHeadAvatarFromURL(url) {
  textureLoader.load(url, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy?.() ?? 4;
    tex.needsUpdate = true;
    headAvatarTexture = tex;
    if (snake?.headFaceMat) {
      snake.headFaceMat.map = tex;
      snake.headFaceMat.needsUpdate = true;
    }
    avatarImg.src = url;
  });
}

function resetHeadAvatar() {
  headAvatarTexture = makeTextureFromImage(DEFAULT_AVATAR_CANVAS);
  if (snake?.headFaceMat) {
    snake.headFaceMat.map = headAvatarTexture;
    snake.headFaceMat.needsUpdate = true;
  }
  avatarImg.src = DEFAULT_AVATAR_URL;
}

// ---------- Snake ----------
const snakeGroup = new THREE.Group();
scene.add(snakeGroup);

let snake = null;

function createSnakeMeshes() {
  // Head: a rounded sphere body with a flat avatar disc on the front
  const headGroup = new THREE.Group();

  const headBodyGeo = new THREE.SphereGeometry(0.52, 32, 24);
  const headBodyMat = new THREE.MeshStandardMaterial({
    color: 0x222b55,
    emissive: 0x4357ff,
    emissiveIntensity: 0.25,
    roughness: 0.3,
    metalness: 0.6,
  });
  const headBody = new THREE.Mesh(headBodyGeo, headBodyMat);
  headBody.castShadow = true;
  headGroup.add(headBody);

  const faceGeo = new THREE.CircleGeometry(0.48, 48);
  const faceMat = new THREE.MeshBasicMaterial({
    map: headAvatarTexture,
    transparent: true,
  });
  const headFace = new THREE.Mesh(faceGeo, faceMat);
  headFace.position.set(0, 0, 0.52);
  headGroup.add(headFace);

  const ringGeo = new THREE.TorusGeometry(0.5, 0.045, 16, 64);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x41e0c2,
    emissive: 0x41e0c2,
    emissiveIntensity: 0.85,
    roughness: 0.3,
    metalness: 0.7,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.set(0, 0, 0.52);
  headGroup.add(ring);

  // Eyes (shown when avatar texture missing — small but cute)
  // Skipped: avatar covers the front.

  return { headGroup, headFaceMat: faceMat, headBody, ring };
}

function buildSnake() {
  // Clear existing
  while (snakeGroup.children.length) {
    const c = snakeGroup.children.pop();
    c.traverse?.((o) => {
      o.geometry?.dispose?.();
      if (o.material) {
        if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
        else o.material.dispose();
      }
    });
  }

  const N = CONFIG.gridSize;
  const start = Math.floor(N / 2);
  const cells = [
    { x: start, z: start },
    { x: start - 1, z: start },
    { x: start - 2, z: start },
  ];

  const { headGroup, headFaceMat } = createSnakeMeshes();
  snakeGroup.add(headGroup);

  const segments = [];
  for (let i = 1; i < cells.length; i++) {
    segments.push(makeBodySegment(i, cells.length));
  }
  segments.forEach((s) => snakeGroup.add(s.mesh));

  snake = {
    cells,
    prevCells: cells.map((c) => ({ ...c })),
    direction: { dx: 1, dz: 0 },
    queuedDirection: { dx: 1, dz: 0 },
    headGroup,
    headFaceMat,
    segments,
    growPending: 0,
    alive: true,
    score: 0,
    headYaw: 0,
    targetHeadYaw: 0,
  };

  if (headAvatarTexture) {
    headFaceMat.map = headAvatarTexture;
    headFaceMat.needsUpdate = true;
  }

  positionSnakeInstant();
  updateHud();
}

function makeBodySegment(index, total) {
  const t = total > 1 ? index / (total - 1) : 0;
  const color = new THREE.Color().lerpColors(
    new THREE.Color(0x6878ff),
    new THREE.Color(0x41e0c2),
    t,
  );
  const emissive = new THREE.Color().lerpColors(
    new THREE.Color(0x2a3aff),
    new THREE.Color(0x14a08a),
    t,
  );
  const geo = new THREE.SphereGeometry(0.42, 24, 18);
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: 0.35,
    roughness: 0.35,
    metalness: 0.55,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  return { mesh, mat };
}

function recolorBody() {
  const total = snake.segments.length + 1;
  snake.segments.forEach((s, i) => {
    const t = (i + 1) / total;
    const color = new THREE.Color().lerpColors(
      new THREE.Color(0x6878ff),
      new THREE.Color(0x41e0c2),
      t,
    );
    const emissive = new THREE.Color().lerpColors(
      new THREE.Color(0x2a3aff),
      new THREE.Color(0x14a08a),
      t,
    );
    s.mat.color.copy(color);
    s.mat.emissive.copy(emissive);
  });
}

function positionSnakeInstant() {
  for (let i = 0; i < snake.cells.length; i++) {
    const c = snake.cells[i];
    const wx = cellToWorld(c.x);
    const wz = cellToWorld(c.z);
    const obj = i === 0 ? snake.headGroup : snake.segments[i - 1].mesh;
    obj.position.set(wx, 0.45, wz);
  }
  const yaw = directionToYaw(snake.direction);
  snake.headYaw = yaw;
  snake.targetHeadYaw = yaw;
  snake.headGroup.rotation.y = yaw;
}

function directionToYaw({ dx, dz }) {
  // Avatar disc faces +Z by default; we rotate around Y so that disc faces direction.
  return Math.atan2(dx, dz);
}

// ---------- Food ----------
let food = null;

function spawnFood() {
  if (food) {
    scene.remove(food.group);
    food.group.traverse((o) => {
      o.geometry?.dispose?.();
      o.material?.dispose?.();
    });
  }
  const occupied = new Set(snake.cells.map((c) => `${c.x},${c.z}`));
  const N = CONFIG.gridSize;
  const free = [];
  for (let x = 0; x < N; x++) {
    for (let z = 0; z < N; z++) {
      if (!occupied.has(`${x},${z}`)) free.push({ x, z });
    }
  }
  if (free.length === 0) {
    triggerWin();
    return;
  }
  const cell = free[Math.floor(Math.random() * free.length)];

  const group = new THREE.Group();
  const geo = new THREE.IcosahedronGeometry(0.36, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xff5d8f,
    emissive: 0xff2e6b,
    emissiveIntensity: 0.9,
    roughness: 0.25,
    metalness: 0.4,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  group.add(mesh);

  const haloGeo = new THREE.RingGeometry(0.42, 0.6, 48);
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0xff8fc0,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
  });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  halo.rotation.x = -Math.PI / 2;
  halo.position.y = -0.42;
  group.add(halo);

  const light = new THREE.PointLight(0xff5d8f, 1.2, 6);
  light.position.set(0, 0.6, 0);
  group.add(light);

  group.position.set(cellToWorld(cell.x), 0.5, cellToWorld(cell.z));
  scene.add(group);

  food = { group, mesh, cell, halo, light };
}

// ---------- Game loop ----------
let lastTime = performance.now();
let tickAccumulator = 0;
let tickInterval = 1000 / CONFIG.baseTicksPerSecond;
let lastTickTime = 0;
let paused = false;
let gameOver = false;

function tick() {
  if (!snake.alive) return;

  // Apply queued direction (no 180° turn)
  const q = snake.queuedDirection;
  if (!(q.dx === -snake.direction.dx && q.dz === -snake.direction.dz)) {
    snake.direction = q;
  }

  // Save previous positions for interpolation
  snake.prevCells = snake.cells.map((c) => ({ ...c }));

  const head = snake.cells[0];
  let nx = head.x + snake.direction.dx;
  let nz = head.z + snake.direction.dz;
  const N = CONFIG.gridSize;

  if (CONFIG.wrap) {
    nx = (nx + N) % N;
    nz = (nz + N) % N;
  } else if (nx < 0 || nx >= N || nz < 0 || nz >= N) {
    return die();
  }

  // Self-collision: ignore the tail if not growing (since tail will move)
  const willGrow = snake.growPending > 0;
  const checkCells = willGrow ? snake.cells : snake.cells.slice(0, -1);
  if (checkCells.some((c) => c.x === nx && c.z === nz)) {
    return die();
  }

  // Move
  snake.cells.unshift({ x: nx, z: nz });
  if (willGrow) {
    snake.growPending--;
    const newSeg = makeBodySegment(snake.segments.length + 1, snake.cells.length);
    const tail = snake.cells[snake.cells.length - 1];
    newSeg.mesh.position.set(cellToWorld(tail.x), 0.45, cellToWorld(tail.z));
    snake.segments.push(newSeg);
    snakeGroup.add(newSeg.mesh);
    recolorBody();
  } else {
    snake.cells.pop();
  }

  // Eat food
  if (food && nx === food.cell.x && nz === food.cell.z) {
    snake.score += 10;
    snake.growPending += 1;
    increaseSpeedSlightly();
    spawnFood();
    pulseHeadRing();
    updateHud();
  }

  snake.targetHeadYaw = directionToYaw(snake.direction);
  // Smooth shortest-path yaw
  let delta = snake.targetHeadYaw - snake.headYaw;
  while (delta > Math.PI) delta -= Math.PI * 2;
  while (delta < -Math.PI) delta += Math.PI * 2;
  snake.targetHeadYaw = snake.headYaw + delta;

  lastTickTime = performance.now();
}

let ringPulseEnd = 0;
function pulseHeadRing() {
  ringPulseEnd = performance.now() + 320;
}

function increaseSpeedSlightly() {
  const cur = parseFloat(speedRange.value);
  const next = Math.min(14, cur + 0.15);
  speedRange.value = String(next);
  applySpeed();
}

function applySpeed() {
  CONFIG.baseTicksPerSecond = parseFloat(speedRange.value);
  tickInterval = 1000 / CONFIG.baseTicksPerSecond;
  speedEl.textContent = (CONFIG.baseTicksPerSecond / 6).toFixed(1) + "x";
}

function die() {
  snake.alive = false;
  gameOver = true;

  const best = Math.max(snake.score, Number(localStorage.getItem("snake3d-best") || 0));
  localStorage.setItem("snake3d-best", String(best));
  bestEl.textContent = best;

  overlayTitle.textContent = "游戏结束";
  overlayText.textContent = `本局得分 ${snake.score}　·　最高分 ${best}`;
  overlay.classList.remove("hidden");
}

function triggerWin() {
  snake.alive = false;
  gameOver = true;
  overlayTitle.textContent = "通关啦！";
  overlayText.textContent = `蛇已铺满整个棋盘，得分 ${snake.score}`;
  overlay.classList.remove("hidden");
}

function updateHud() {
  scoreEl.textContent = snake.score;
  lengthEl.textContent = snake.cells.length;
  bestEl.textContent = localStorage.getItem("snake3d-best") || 0;
}

// ---------- Animation ----------
function animate(now) {
  requestAnimationFrame(animate);
  const dt = now - lastTime;
  lastTime = now;

  if (!paused && !gameOver && snake?.alive) {
    tickAccumulator += dt;
    while (tickAccumulator >= tickInterval) {
      tickAccumulator -= tickInterval;
      tick();
    }
  }

  // Interpolate snake positions
  if (snake) {
    const t = paused || gameOver ? 1 : Math.min(1, (now - lastTickTime) / tickInterval);
    for (let i = 0; i < snake.cells.length; i++) {
      const cur = snake.cells[i];
      const prev = snake.prevCells[i] ?? cur;
      let px = cellToWorld(prev.x);
      let pz = cellToWorld(prev.z);
      let cx = cellToWorld(cur.x);
      let cz = cellToWorld(cur.z);

      // Avoid teleport when wrapping
      if (CONFIG.wrap) {
        const sizeW = CONFIG.gridSize * CONFIG.cellSize;
        if (Math.abs(cx - px) > sizeW / 2) px = cx;
        if (Math.abs(cz - pz) > sizeW / 2) pz = cz;
      }

      const ix = px + (cx - px) * t;
      const iz = pz + (cz - pz) * t;

      const obj = i === 0 ? snake.headGroup : snake.segments[i - 1]?.mesh;
      if (obj) obj.position.set(ix, 0.45, iz);
    }

    // Smooth head yaw
    snake.headYaw += (snake.targetHeadYaw - snake.headYaw) * Math.min(1, dt / 80);
    snake.headGroup.rotation.y = snake.headYaw;

    // Bob head a bit
    snake.headGroup.position.y = 0.5 + Math.sin(now * 0.005) * 0.04;

    // Ring pulse
    if (snake.headGroup.children[2]) {
      const ring = snake.headGroup.children[2];
      const remain = ringPulseEnd - now;
      const pulse = remain > 0 ? 1 + Math.sin((1 - remain / 320) * Math.PI) * 0.4 : 1;
      ring.scale.setScalar(pulse);
    }
  }

  // Animate food
  if (food) {
    food.mesh.rotation.y += dt * 0.002;
    food.mesh.rotation.x += dt * 0.001;
    food.mesh.position.y = 0.6 + Math.sin(now * 0.004) * 0.12;
    food.halo.rotation.z += dt * 0.001;
    food.halo.material.opacity = 0.35 + Math.sin(now * 0.005) * 0.15;
  }

  // Slight camera orbit
  const camAngle = now * 0.00005;
  const distance = Math.max(18, CONFIG.gridSize * 1.05);
  camera.position.x = Math.sin(camAngle) * distance * 0.25;
  camera.position.z = distance;
  camera.position.y = distance * 0.85;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

// ---------- Resize ----------
function resize() {
  const rect = canvas.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);

// ---------- Input ----------
const KEY_DIR = {
  ArrowUp: { dx: 0, dz: -1 },
  ArrowDown: { dx: 0, dz: 1 },
  ArrowLeft: { dx: -1, dz: 0 },
  ArrowRight: { dx: 1, dz: 0 },
  w: { dx: 0, dz: -1 },
  s: { dx: 0, dz: 1 },
  a: { dx: -1, dz: 0 },
  d: { dx: 1, dz: 0 },
  W: { dx: 0, dz: -1 },
  S: { dx: 0, dz: 1 },
  A: { dx: -1, dz: 0 },
  D: { dx: 1, dz: 0 },
};

window.addEventListener("keydown", (e) => {
  if (KEY_DIR[e.key]) {
    e.preventDefault();
    if (!snake) return;
    const d = KEY_DIR[e.key];
    if (d.dx === -snake.direction.dx && d.dz === -snake.direction.dz) return;
    snake.queuedDirection = d;
  } else if (e.key === " ") {
    e.preventDefault();
    if (!gameOver) togglePause();
  } else if (e.key === "r" || e.key === "R") {
    restart();
  }
});

// Touch / swipe
let touchStart = null;
canvas.addEventListener("touchstart", (e) => {
  const t = e.touches[0];
  touchStart = { x: t.clientX, y: t.clientY };
});
canvas.addEventListener("touchend", (e) => {
  if (!touchStart) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStart.x;
  const dy = t.clientY - touchStart.y;
  if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
  let d;
  if (Math.abs(dx) > Math.abs(dy)) {
    d = dx > 0 ? { dx: 1, dz: 0 } : { dx: -1, dz: 0 };
  } else {
    d = dy > 0 ? { dx: 0, dz: 1 } : { dx: 0, dz: -1 };
  }
  if (snake && !(d.dx === -snake.direction.dx && d.dz === -snake.direction.dz)) {
    snake.queuedDirection = d;
  }
  touchStart = null;
});

function togglePause() {
  paused = !paused;
  if (paused) {
    overlayTitle.textContent = "已暂停";
    overlayText.textContent = "按空格键继续游戏";
    overlay.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
  }
}

// ---------- UI bindings ----------
avatarInput.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => setHeadAvatarFromURL(reader.result);
  reader.readAsDataURL(file);
});

avatarReset.addEventListener("click", () => {
  resetHeadAvatar();
  avatarInput.value = "";
});

speedRange.addEventListener("input", applySpeed);

gridSizeSel.addEventListener("change", () => {
  CONFIG.gridSize = parseInt(gridSizeSel.value, 10);
  restart();
});

wrapChk.addEventListener("change", () => {
  CONFIG.wrap = wrapChk.checked;
  if (wallsGroup) wallsGroup.visible = !CONFIG.wrap;
});

restartBtn.addEventListener("click", restart);
overlayBtn.addEventListener("click", restart);

function restart() {
  CONFIG.gridSize = parseInt(gridSizeSel.value, 10);
  CONFIG.wrap = wrapChk.checked;
  buildBoard(CONFIG.gridSize);
  buildSnake();
  spawnFood();
  applySpeed();
  paused = false;
  gameOver = false;
  tickAccumulator = 0;
  lastTickTime = performance.now();
  overlay.classList.add("hidden");
}

// ---------- Init ----------
function init() {
  buildBoard(CONFIG.gridSize);
  buildSnake();
  spawnFood();
  applySpeed();
  resize();
  bestEl.textContent = localStorage.getItem("snake3d-best") || 0;
  lastTickTime = performance.now();
  requestAnimationFrame(animate);
}

init();
