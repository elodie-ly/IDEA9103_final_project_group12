// perlin-mechanic.js
// Owner: Hanwen Cui
// Mechanic: Perlin noise and randomness
// This mechanic creates floating CUDA-inspired geometric shapes using random values and Perlin noise.

let perlinShapes = [];
let perlinSeed;
let numberOfPerlinShapes = 80;

function initPerlinMechanic() {
  perlinShapes = [];

  perlinSeed = floor(random(100000));

  randomSeed(perlinSeed);
  noiseSeed(perlinSeed);

  for (let i = 0; i < numberOfPerlinShapes; i++) {
    let s = {
      type: random(["circle", "circle", "circle", "rect", "line", "triangle"]),
      x: random(width),
      y: random(height),
      size: random(18, 170),
      w: random(30, 190),
      h: random(8, 90),
      angle: random(360),
      hue: random([18, 32, 45, 165, 185, 200, 215, 285, 315]),
      sat: random(35, 85),
      bri: random(55, 100),
      alpha: random(8, 38),
      lineWeight: random(0.5, 2.2),
      noiseX: random(1000),
      noiseY: random(1000),
      noiseAngle: random(1000),
      noiseSpeed: random(0.002, 0.007),
      moveRange: random(15, 80)
    };

    perlinShapes.push(s);
  }
}

function updatePerlinMechanic() {
  for (let i = 0; i < perlinShapes.length; i++) {
    let s = perlinShapes[i];

    s.noiseX += s.noiseSpeed;
    s.noiseY += s.noiseSpeed;
    s.noiseAngle += s.noiseSpeed * 0.7;
  }
}

function drawPerlinMechanic() {
  push();

  blendMode(SCREEN);

  for (let i = 0; i < perlinShapes.length; i++) {
    let s = perlinShapes[i];

    let offsetX = map(noise(s.noiseX), 0, 1, -s.moveRange, s.moveRange);
    let offsetY = map(noise(s.noiseY), 0, 1, -s.moveRange, s.moveRange);
    let angleOffset = map(noise(s.noiseAngle), 0, 1, -35, 35);

    let drawX = s.x + offsetX;
    let drawY = s.y + offsetY;

    push();

    translate(drawX, drawY);
    rotate(s.angle + angleOffset);

    fill(s.hue, s.sat, s.bri, s.alpha);
    stroke(s.hue, s.sat, s.bri, s.alpha + 10);
    strokeWeight(s.lineWeight);

    if (s.type === "circle") {
      noStroke();
      ellipse(0, 0, s.size, s.size);
    }

    if (s.type === "rect") {
      noStroke();
      rectMode(CENTER);
      rect(0, 0, s.w, s.h);
    }

    if (s.type === "line") {
      noFill();
      line(-s.size, 0, s.size, 0);
    }

    if (s.type === "triangle") {
      noStroke();
      let r = s.size / 2;
      triangle(-r, r, 0, -r, r, r);
    }

    pop();
  }

  blendMode(BLEND);
  pop();
}

function resetPerlinMechanic() {
  initPerlinMechanic();
}