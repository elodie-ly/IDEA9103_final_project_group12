let scene;
let grainLayer;

function preload() {
  preloadAudioMechanic();
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);

  const artworkContainer = select("#artwork");
  if (artworkContainer) {
    canvas.parent("artwork");
  }

  pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  noStroke();

  angleMode(RADIANS);
  buildScene();
  buildGrain();

  angleMode(DEGREES);
  initAudioMechanic();
  initPerlinMechanic();

  const loading = select("#loading");
  if (loading) {
    loading.addClass("hidden");
  }
}

function draw() {
  const phase = getPhase();
  const seconds = millis() / 1000;
  const dt = Math.min(deltaTime || 16.67, 40) / 1000;

  updateEnergyDecay();
  runTimedEvents(phase);

  // =========================
  // 1. Time-based background and base CUDA layer
  // These functions use radians.
  // =========================
  angleMode(RADIANS);

  drawGradientBackground(phase);
  drawBaseWashes(phase, seconds);

  drawCircles(phase, seconds);
  drawShards(phase, seconds);
  drawBars(phase, seconds);
  drawRays(phase, seconds);
  drawNodes(phase, seconds);

  drawPulses(dt);
  drawParticles(dt, phase);
  drawFlashes(dt);
  drawGrain(phase);

  // =========================
  // 2. Perlin + Audio + Input layers
  // These are easier to control in degrees.
  // =========================
  angleMode(DEGREES);

  updatePerlinMechanic();
  drawPerlinMechanic();

  updateAudioMechanic();
  drawAudioMechanic();

  drawInputMechanic();

  // =========================
  // 3. UI feedback layer
  // =========================
  drawPhaseMeter(phase);
  drawInstructionText();
}

function mousePressed() {
 
  handleInputMechanic();
}


function keyPressed() {
  if (key === " ") {
    startAudioMechanic();
  }

  if (key === "p" || key === "P") {
    resetPerlinMechanic();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  angleMode(RADIANS);
  buildScene();

  if (grainLayer) {
    buildGrain();
  }

  angleMode(DEGREES);
  initPerlinMechanic();
}

function drawInstructionText() {
  push();

  const x = 24;
  const y = 28;

  textAlign(LEFT, TOP);
  textSize(13);
  noStroke();

  // Semi-transparent background panel
  fill(0, 0, 0, 28);
  rectMode(CORNER);
  rect(x - 10, y - 10, 390, 78, 12);

  fill(0, 0, 100, 82);

  if (!audioStarted) {
    text("Press Space: start music", x, y);
  } else {
    text("Press Space: play / pause music", x, y);
  }

  text("Click canvas: create halo pulses, particles and network links", x, y + 22);
  text("Press P: regenerate Perlin layer", x, y + 44);

  pop();
}

function buildScene() {
  randomSeed(43690);
  noiseSeed(724551);

  scene = {
    washes: [],
    circles: [],
    shards: [],
    bars: [],
    rays: [],
    nodes: [],
  };

  eventClock = {
    warm: -9999,
    cool: -9999,
    burst: -9999,
    dark: -9999,
  };

  for (let i = 0; i < 42; i++) {
    scene.washes.push({
      x: random(-0.15, 1.15),
      y: random(-0.12, 1.12),
      r: random(0.22, 0.72),
      c: pick(PALETTES.base),
      a: random(4, 13),
      seed: random(1000),
      drift: random(0.004, 0.018),
      oval: random(0.65, 1.45),
    });
  }

  const anchorCircles = [
    [0.12, 0.78, 0.27, [198, 86, 52], 23],
    [0.74, 0.23, 0.17, [214, 32, 98], 31],
    [0.79, 0.79, 0.23, [197, 82, 64], 25],
    [0.40, 0.56, 0.19, [6, 78, 95], 24],
    [0.63, 0.36, 0.22, [37, 82, 100], 22],
    [0.88, 0.38, 0.28, [154, 62, 70], 19],
    [0.19, 0.25, 0.21, [184, 82, 60], 22],
    [0.47, 0.87, 0.16, [43, 74, 100], 20],
  ];

  for (const item of anchorCircles) {
    scene.circles.push({
      x: item[0],
      y: item[1],
      r: item[2],
      baseR: item[2],
      c: item[3],
      a: item[4],
      spin: random(-0.8, 0.8),
      start: random(TWO_PI_F),
      span: random(0.35, 1.25),
      wedge: true,
      warmBias: item[3][0] < 60 || item[3][0] > 330,
      seed: random(1000),
      energy: 0,
    });
  }

  for (let i = 0; i < 76; i++) {
    const palette = random() < 0.42 ? PALETTES.cool : PALETTES.base;
    const c = pick(palette);

    scene.circles.push({
      x: random(-0.08, 1.08),
      y: random(-0.08, 1.08),
      r: random() < 0.22 ? random(0.11, 0.24) : random(0.018, 0.105),
      baseR: 0,
      c,
      a: random(8, 28),
      spin: random(-1.1, 1.1),
      start: random(TWO_PI_F),
      span: random(0.2, 1.55),
      wedge: random() < 0.62,
      warmBias: c[0] < 62 || c[0] > 330,
      seed: random(1000),
      energy: 0,
    });

    const last = scene.circles[scene.circles.length - 1];
    last.baseR = last.r;
  }

  for (let i = 0; i < 72; i++) {
    scene.shards.push({
      x: random(-0.1, 1.1),
      y: random(-0.1, 1.1),
      r: random(0.035, 0.23),
      c: pick(random() < 0.34 ? PALETTES.warm : PALETTES.base),
      a: random(7, 23),
      rot: random(TWO_PI_F),
      spin: random(-0.38, 0.38),
      seed: random(1000),
      verts: makeShardVerts(),
    });
  }

  for (let i = 0; i < 56; i++) {
    const long = random() < 0.72;

    scene.bars.push({
      x: random(-0.1, 1.1),
      y: random(-0.1, 1.1),
      w: long ? random(0.08, 0.36) : random(0.025, 0.09),
      h: long ? random(0.006, 0.025) : random(0.025, 0.12),
      c: pick(random() < 0.66 ? PALETTES.cool : PALETTES.warm),
      a: random(10, 31),
      rot: random(TWO_PI_F),
      drift: random(0.006, 0.025),
      seed: random(1000),
    });
  }

  for (let i = 0; i < 46; i++) {
    scene.rays.push({
      x: random(-0.08, 1.08),
      y: random(-0.08, 1.08),
      len: random(0.08, 0.35),
      c: pick(random() < 0.52 ? PALETTES.burst : PALETTES.cool),
      a: random(18, 50),
      rot: random(TWO_PI_F),
      seed: random(1000),
      weight: random(0.8, 2.6),
    });
  }

  for (let i = 0; i < 64; i++) {
    scene.nodes.push({
      x: random(-0.04, 1.04),
      y: random(-0.04, 1.04),
      r: random(0.004, 0.014),
      c: pick(random() < 0.55 ? PALETTES.cool : PALETTES.warm),
      a: random(28, 70),
      rot: random(TWO_PI_F),
      len: random(0.035, 0.16),
      seed: random(1000),
    });
  }
}

function buildGrain() {
  grainLayer = createGraphics(420, 420);
  grainLayer.pixelDensity(1);
  grainLayer.loadPixels();

  for (let i = 0; i < grainLayer.pixels.length; i += 4) {
    const shade = random() < 0.52 ? 255 : 0;
    grainLayer.pixels[i] = shade;
    grainLayer.pixels[i + 1] = shade;
    grainLayer.pixels[i + 2] = shade;
    grainLayer.pixels[i + 3] = random(4, 18);
  }

  grainLayer.updatePixels();
}

function makeShardVerts() {
  const sides = floor(random(3, 6));
  const verts = [];
  let start = random(TWO_PI_F);

  for (let i = 0; i < sides; i++) {
    const a = start + (i / sides) * TWO_PI_F + random(-0.3, 0.3);
    const r = random(0.35, 1);
    verts.push([cos(a) * r, sin(a) * r]);
  }

  return verts;
}

function drawGradientBackground(phase) {
  blendMode(BLEND);

  const g = drawingContext.createLinearGradient(0, 0, width, height);
  g.addColorStop(0, phase.info.bg[0]);
  g.addColorStop(0.48, phase.info.bg[1]);
  g.addColorStop(1, phase.info.bg[2]);

  drawingContext.fillStyle = g;
  drawingContext.fillRect(0, 0, width, height);

  noStroke();

  const darkAlpha = phase.index === 3 ? 38 + phase.progress * 28 : 9;

  fill(210, 75, 8, darkAlpha);
  rect(width / 2, height / 2, width * 1.08, height * 1.08);

  const warmLift = phase.index === 0 ? 20 + phase.progress * 28 : phase.index === 2 ? 26 : 10;

  drawSoftGlow(width * 0.37, height * 0.47, unit() * 0.55, [30, 80, 100], warmLift);
  drawSoftGlow(width * 0.72, height * 0.63, unit() * 0.48, [190, 66, 82], 12);
}

function drawBaseWashes(phase, seconds) {
  blendMode(BLEND);
  noStroke();

  for (const s of scene.washes) {
    const driftStrength = phase.index === 1 ? 2.4 : phase.index === 3 ? 0.5 : 1;
    const dx = sin(seconds * 0.18 + s.seed) * unit() * s.drift * driftStrength;
    const dy = cos(seconds * 0.16 + s.seed * 1.7) * unit() * s.drift * driftStrength;
    const a = s.a * phaseLayerAlpha(phase, "wash");

    fill(s.c[0], s.c[1], s.c[2], a);

    push();
    translate(s.x * width + dx, s.y * height + dy);
    rotate(s.seed + seconds * 0.01);
    ellipse(0, 0, s.r * unit() * s.oval, s.r * unit());
    pop();
  }
}

function drawCircles(phase, seconds) {
  for (const c of scene.circles) {
    const coolDrift = phase.index === 1 ? unit() * 0.025 : unit() * 0.006;
    const dx = sin(seconds * 0.24 + c.seed) * coolDrift;
    const dy = cos(seconds * 0.19 + c.seed * 1.3) * coolDrift;

    let grow = 1;

    if (phase.index === 0) {
      grow = 1 + phase.progress * 0.32 + sin(seconds * 0.8 + c.seed) * 0.04;
    } else if (phase.index === 2) {
      grow = 1 + sin(phase.progress * Math.PI) * 0.16;
    } else if (phase.index === 3) {
      grow = 0.95 - phase.progress * 0.16;
    }

    const warmBoost = phase.index === 0 && c.warmBias ? 1.75 : 1;
    const a = c.a * phaseLayerAlpha(phase, "circle") * warmBoost;
    const x = c.x * width + dx;
    const y = c.y * height + dy;
    const energy = 1 + (c.energy || 0) * 0.8;
    const breathing = 1 + sin(frameCount * 0.02 + c.seed) * 0.04;
    const r = c.baseR * unit() * grow * energy * breathing;

    fill(c.c[0], c.c[1], c.c[2], a);
    ellipse(x, y, r * 2, r * 2);

    if (c.wedge) {
      const burstSpin = phase.index === 2 ? 3.8 : phase.index === 3 ? 0.25 : 0.75;
      const angle = c.start + seconds * c.spin * burstSpin;

      fill(shiftHue(c.c[0], 18), max(20, c.c[1] - 8), min(100, c.c[2] + 8), a * 0.85);
      arc(x, y, r * 2.05, r * 2.05, angle, angle + c.span, PIE);
    }

    if (phase.index === 2 && (c.energy || 0) > 0.6 && random() < 0.006) {
      flashes.push(makeFlash(x, y, c.c));
    }
  }
}

function drawShards(phase, seconds) {
  blendMode(BLEND);
  noStroke();

  for (const s of scene.shards) {
    const energySpin = phase.index === 2 ? 2.2 : phase.index === 3 ? 0.25 : 0.7;
    const drift = phase.index === 1 ? unit() * 0.024 : unit() * 0.009;
    const x = s.x * width + sin(seconds * 0.2 + s.seed) * drift;
    const y = s.y * height + cos(seconds * 0.17 + s.seed) * drift;
    const r = s.r * unit() * (phase.index === 2 ? 1.08 : 1);
    const a = s.a * phaseLayerAlpha(phase, "shard");

    push();
    translate(x, y);
    rotate(s.rot + seconds * s.spin * energySpin);
    fill(s.c[0], s.c[1], s.c[2], a);

    beginShape();

    for (const v of s.verts) {
      vertex(v[0] * r, v[1] * r);
    }

    endShape(CLOSE);
    pop();
  }
}

function drawBars(phase, seconds) {
  blendMode(BLEND);
  noStroke();

  for (const b of scene.bars) {
    const softDrift = phase.index === 1 ? 3.4 : phase.index === 3 ? 0.45 : 1.1;
    const energy = phase.index === 2 ? 1.7 : 1;
    const x = b.x * width + sin(seconds * 0.32 + b.seed) * unit() * b.drift * softDrift;
    const y = b.y * height + cos(seconds * 0.28 + b.seed * 1.5) * unit() * b.drift * softDrift;
    const w = b.w * unit() * (phase.index === 2 ? 1.12 : 1);
    const h = max(1.5, b.h * unit() * energy);
    const a = b.a * phaseLayerAlpha(phase, "bar");

    push();
    translate(x, y);
    rotate(b.rot + sin(seconds * 0.18 + b.seed) * 0.08);
    fill(b.c[0], b.c[1], b.c[2], a);
    rect(0, 0, w, h);
    pop();
  }
}

function drawRays(phase, seconds) {
  const intensity = phase.index === 2 ? 2.9 : phase.index === 3 ? 0.45 : 1;

  blendMode(phase.index === 2 ? ADD : BLEND);

  for (const r of scene.rays) {
    const spin = phase.index === 2 ? 2.6 : 0.38;
    const angle = r.rot + seconds * 0.12 * spin + sin(seconds + r.seed) * 0.07;
    const x = r.x * width;
    const y = r.y * height;
    const len = r.len * unit() * (phase.index === 2 ? 1.22 : 1);

    stroke(r.c[0], r.c[1], r.c[2], r.a * phaseLayerAlpha(phase, "ray") * intensity);
    strokeWeight(max(1, r.weight * (phase.index === 2 ? 1.4 : 1)));
    line(x, y, x + cos(angle) * len, y + sin(angle) * len);
  }

  noStroke();
  blendMode(BLEND);
}

function drawNodes(phase, seconds) {
  const lineAlpha = phase.index === 2 ? 42 : phase.index === 3 ? 13 : 24;

  blendMode(BLEND);

  for (const n of scene.nodes) {
    const drift = phase.index === 1 ? unit() * 0.018 : unit() * 0.005;
    const x = n.x * width + sin(seconds * 0.3 + n.seed) * drift;
    const y = n.y * height + cos(seconds * 0.22 + n.seed) * drift;
    const a = n.rot + seconds * (phase.index === 2 ? 1.8 : 0.24);

    stroke(n.c[0], n.c[1], n.c[2], lineAlpha * phaseLayerAlpha(phase, "node"));
    strokeWeight(1);
    line(x, y, x + cos(a) * n.len * unit(), y + sin(a) * n.len * unit());

    noStroke();
    drawSoftGlow(x, y, n.r * unit() * 8, n.c, 14 * phaseLayerAlpha(phase, "node"));

    fill(n.c[0], n.c[1], min(100, n.c[2] + 15), n.a * phaseLayerAlpha(phase, "node"));
    ellipse(x, y, n.r * unit() * 2, n.r * unit() * 2);

    fill(205, 80, 12, 55 * phaseLayerAlpha(phase, "node"));
    ellipse(x, y, n.r * unit() * 0.75, n.r * unit() * 0.75);
  }
}

function drawGrain(phase) {
  if (!grainLayer) return;

  blendMode(phase.index === 3 ? SCREEN : OVERLAY);
  tint(0, 0, 100, phase.index === 3 ? 9 : 15);
  image(grainLayer, 0, 0, width, height);
  noTint();
  blendMode(BLEND);
}

function drawSoftGlow(x, y, radius, c, alpha) {
  noStroke();

  for (let i = 5; i >= 1; i--) {
    const k = i / 5;
    fill(c[0], c[1], c[2], (alpha * (1 - k + 0.18)) / i);
    ellipse(x, y, radius * k * 2, radius * k * 2);
  }
}