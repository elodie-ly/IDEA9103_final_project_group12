// input-mechanic.js
// Mouse input creates CUDA-style glowing nodes, soft halos and short ray connections.

let clickCount = 0;
let clickRadius = 190;

let clickNodes = [];
let clickRays = [];
let clickParticles = [];
let connections = [];

function handleInputMechanic() {
  clickCount++;

  let x = mouseX;
  let y = mouseY;

  // Pick warm/cool CUDA-style colours.
  let h = random([35, 45, 185, 195, 205, 8]);
  let nodeCol = [h, 85, 100];

  // Main glowing click node.
  clickNodes.push({
    x: x,
    y: y,
    hue: h,
    age: 0,
    life: 2.8,
    coreSize: random(7, 12),
    haloSize: random(70, 120),
    pulseSpeed: random(3.5, 5.5)
  });

  // Short thin rays like the video.
  for (let i = 0; i < 7; i++) {
    let a = random(360);
    let len = random(45, 135);

    clickRays.push({
      x1: x,
      y1: y,
      x2: x + cos(a) * len,
      y2: y + sin(a) * len,
      hue: h,
      age: 0,
      life: random(1.2, 2.4),
      weight: random(0.6, 1.3)
    });
  }

  // Small glowing particles near the click.
  for (let i = 0; i < 10; i++) {
    let a = random(360);
    let speed = random(0.4, 2.2);

    clickParticles.push({
      x: x,
      y: y,
      vx: cos(a) * speed,
      vy: sin(a) * speed,
      hue: random([35, 45, 185, 195, 205, 8]),
      size: random(2.5, 6.5),
      age: 0,
      life: random(1.1, 2.2)
    });
  }

  // Connect click point to nearby base circles.
  if (typeof scene !== "undefined" && scene && scene.circles) {
    for (let c of scene.circles) {
      let cx = c.x * width;
      let cy = c.y * height;

      let d = dist(x, y, cx, cy);
      let force = map(d, 0, clickRadius, 1, 0);
      force = constrain(force, 0, 1);

      if (force > 0) {
        c.energy = (c.energy || 0) + force * 0.55;
        c.energy = min(c.energy, 1.15);
        c.a += force * 14;

        connections.push({
          x1: x,
          y1: y,
          x2: cx,
          y2: cy,
          hue: h,
          age: 0,
          life: 1.8,
          alpha: 42 * force
        });
      }
    }
  }

  // Keep arrays light.
  if (clickNodes.length > 35) clickNodes.splice(0, clickNodes.length - 35);
  if (clickRays.length > 160) clickRays.splice(0, clickRays.length - 160);
  if (clickParticles.length > 180) clickParticles.splice(0, clickParticles.length - 180);
  if (connections.length > 120) connections.splice(0, connections.length - 120);
}

function drawInputMechanic() {
  let dt = Math.min(deltaTime || 16.67, 40) / 1000;

  drawClickHalos(dt);
  drawClickRays(dt);
  drawClickConnections(dt);
  drawClickParticles(dt);
}

function drawClickHalos(dt) {
  push();
  blendMode(SCREEN);
  noStroke();

  for (let i = clickNodes.length - 1; i >= 0; i--) {
    let n = clickNodes[i];

    n.age += dt;
    let k = n.age / n.life;

    if (k >= 1) {
      clickNodes.splice(i, 1);
      continue;
    }

    let fade = 1 - k;
    let pulse = 1 + sin(frameCount * n.pulseSpeed) * 0.08;

    // Large soft halo.
    for (let j = 5; j >= 1; j--) {
      let layer = j / 5;
      fill(n.hue, 70, 100, 7 * fade * layer);
      ellipse(
        n.x,
        n.y,
        n.haloSize * pulse * layer,
        n.haloSize * pulse * layer
      );
    }

    // Middle glow.
    fill(n.hue, 85, 100, 28 * fade);
    ellipse(n.x, n.y, n.coreSize * 4.2, n.coreSize * 4.2);

    // Dark centre dot like the video.
    fill(205, 80, 10, 82 * fade);
    ellipse(n.x, n.y, n.coreSize * 1.25, n.coreSize * 1.25);

    // Bright small centre.
    fill(n.hue, 90, 100, 90 * fade);
    ellipse(n.x, n.y, n.coreSize * 0.65, n.coreSize * 0.65);
  }

  blendMode(BLEND);
  pop();
}

function drawClickRays(dt) {
  push();
  blendMode(SCREEN);

  for (let i = clickRays.length - 1; i >= 0; i--) {
    let r = clickRays[i];

    r.age += dt;
    let k = r.age / r.life;

    if (k >= 1) {
      clickRays.splice(i, 1);
      continue;
    }

    let fade = 1 - k;
    let endX = lerp(r.x1, r.x2, 0.25 + k * 0.85);
    let endY = lerp(r.y1, r.y2, 0.25 + k * 0.85);

    stroke(r.hue, 50, 100, 30 * fade);
    strokeWeight(r.weight);
    line(r.x1, r.y1, endX, endY);
  }

  noStroke();
  blendMode(BLEND);
  pop();
}

function drawClickConnections(dt) {
  push();
  blendMode(SCREEN);

  for (let i = connections.length - 1; i >= 0; i--) {
    let lineData = connections[i];

    lineData.age += dt;
    let k = lineData.age / lineData.life;

    if (k >= 1) {
      connections.splice(i, 1);
      continue;
    }

    let fade = 1 - k;

    stroke(lineData.hue, 55, 100, lineData.alpha * fade);
    strokeWeight(0.8);
    line(
      lineData.x1,
      lineData.y1,
      lineData.x2,
      lineData.y2
    );
  }

  noStroke();
  blendMode(BLEND);
  pop();
}

function drawClickParticles(dt) {
  push();
  blendMode(SCREEN);
  noStroke();

  for (let i = clickParticles.length - 1; i >= 0; i--) {
    let p = clickParticles[i];

    p.age += dt;
    let k = p.age / p.life;

    if (k >= 1) {
      clickParticles.splice(i, 1);
      continue;
    }

    let fade = 1 - k;

    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.985;
    p.vy *= 0.985;

    // Tiny soft glow.
    fill(p.hue, 75, 100, 16 * fade);
    ellipse(p.x, p.y, p.size * 3.2, p.size * 3.2);

    // Core particle.
    fill(p.hue, 90, 100, 70 * fade);
    ellipse(p.x, p.y, p.size, p.size);
  }

  blendMode(BLEND);
  pop();
}

function updateEnergyDecay() {
  if (typeof scene === "undefined" || !scene || !scene.circles) return;

  for (let c of scene.circles) {
    c.energy = (c.energy || 0) * 0.92;
    c.energy = Math.min(c.energy, 1.15);
    c.a = lerp(c.a, 20, 0.05);
  }
}