let timeMechanic;
let shapes = [];
let particles = [];
let glowFields = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
  noStroke();

  randomSeed(18);

  timeMechanic = new TimeMechanic();

  // Base layered composition, similar to the reference image
  for (let i = 0; i < 120; i++) {
    shapes.push(new AbstractShape(floor(random(4)), true));
  }

  // Soft glowing fields behind the geometry
  for (let i = 0; i < 35; i++) {
    glowFields.push(new GlowField());
  }
}

function draw() {
  timeMechanic.update();
  let settings = timeMechanic.getPhaseSettings();

  drawDeepBackground(settings);

  // Soft luminous background layer
  for (let glow of glowFields) {
    glow.update(settings);
    glow.display(settings);
  }

  // Time-based mechanic controls spawning and burst events
  timeMechanic.runTimedEvents(shapes, particles);

  // Main geometry layer
  for (let i = shapes.length - 1; i >= 0; i--) {
    shapes[i].update(settings);
    shapes[i].display(settings);

    if (shapes[i].isDead()) {
      shapes.splice(i, 1);
    }
  }

  // Particle burst layer
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }

  // Keep performance stable
  while (shapes.length > 220) {
    shapes.shift();
  }

  drawCentralMist(settings);
  drawVignette();

  timeMechanic.displayDebugText();
}

function drawDeepBackground(settings) {
  let fadeAmount = settings.backgroundFade;

  if (settings.colourMode === "warm") {
    background(8, 32, 38, fadeAmount);
  } else if (settings.colourMode === "cool") {
    background(5, 34, 50, fadeAmount);
  } else if (settings.colourMode === "burst") {
    background(10, 24, 36, fadeAmount);
  } else {
    background(3, 16, 25, fadeAmount);
  }

  push();
  blendMode(SCREEN);
  noStroke();

  fill(0, 110, 130, 18);
  ellipse(width * 0.25, height * 0.25, width * 0.7, height * 0.65);

  fill(20, 120, 160, 16);
  ellipse(width * 0.78, height * 0.5, width * 0.7, height * 0.75);

  fill(255, 170, 65, 10);
  ellipse(width * 0.52, height * 0.42, width * 0.45, height * 0.45);

  pop();
}

function drawCentralMist(settings) {
  push();
  blendMode(SCREEN);
  noStroke();

  let mistAlpha = 10;

  if (settings.colourMode === "burst") {
    mistAlpha = 26;
  } else if (settings.colourMode === "dark") {
    mistAlpha = 6;
  }

  fill(220, 235, 255, mistAlpha);
  ellipse(width * 0.5, height * 0.5, width * 0.55, height * 0.48);

  fill(255, 210, 150, mistAlpha * 0.55);
  ellipse(width * 0.42, height * 0.46, width * 0.35, height * 0.32);

  pop();
}

function drawVignette() {
  push();
  noFill();

  for (let i = 0; i < 18; i++) {
    stroke(0, 10);
    strokeWeight(i * 8);
    rect(i * 4, i * 4, width - i * 8, height - i * 8);
  }

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// ------------------------------------------------------------
// Shape system
// ------------------------------------------------------------

class AbstractShape {
  constructor(phaseIndex, baseLayer = false) {
    this.phaseIndex = phaseIndex;
    this.baseLayer = baseLayer;

    this.x = random(width);
    this.y = random(height);

    this.size = baseLayer ? random(90, 420) : random(45, 260);
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.006, 0.006);

    this.vx = random(-0.18, 0.18);
    this.vy = random(-0.18, 0.18);

    this.life = 0;
    this.lifeMax = baseLayer ? random(28000, 52000) : random(8000, 22000);

    this.type = random(["circle", "arc", "arc", "triangle", "beam", "quad", "thinLine"]);

    this.colour = this.pickColour(phaseIndex);
    this.baseAlpha = baseLayer ? random(18, 55) : random(35, 95);

    this.arcStart = random(TWO_PI);
    this.arcEnd = this.arcStart + random(PI / 5, PI * 1.6);

    this.innerRatio = random(0.25, 0.75);
  }

  pickColour(phaseIndex) {
    let warmPalette = [
      color(229, 81, 65),
      color(242, 132, 62),
      color(245, 188, 72),
      color(255, 215, 120),
      color(40, 145, 140)
    ];

    let coolPalette = [
      color(20, 105, 135),
      color(30, 150, 180),
      color(25, 90, 130),
      color(45, 145, 125),
      color(170, 220, 235)
    ];

    let burstPalette = [
      color(255, 220, 115),
      color(255, 245, 220),
      color(255, 85, 75),
      color(255, 145, 55),
      color(120, 220, 255)
    ];

    let darkPalette = [
      color(5, 45, 60),
      color(8, 65, 80),
      color(18, 75, 85),
      color(30, 45, 70),
      color(70, 55, 95)
    ];

    if (phaseIndex === 0) return random(warmPalette);
    if (phaseIndex === 1) return random(coolPalette);
    if (phaseIndex === 2) return random(burstPalette);
    return random(darkPalette);
  }

  update(settings) {
    this.life += deltaTime;

    this.rotation += this.rotationSpeed * settings.speed;

    this.x += this.vx * settings.speed;
    this.y += this.vy * settings.speed;

    if (this.x < -this.size) this.x = width + this.size;
    if (this.x > width + this.size) this.x = -this.size;
    if (this.y < -this.size) this.y = height + this.size;
    if (this.y > height + this.size) this.y = -this.size;

    if (settings.colourMode === "warm") {
      this.size += sin(frameCount * 0.01 + this.x * 0.01) * 0.18;
    }

    if (settings.colourMode === "burst") {
      this.size += sin(frameCount * 0.05 + this.y * 0.01) * 0.75;
      this.rotation += this.rotationSpeed * 2.5;
    }

    if (settings.colourMode === "dark") {
      this.baseAlpha *= 0.9988;
    }
  }

  display(settings) {
    push();
    blendMode(SCREEN);
    translate(this.x, this.y);
    rotate(this.rotation);

    let fade = map(this.life, 0, this.lifeMax, 1, 0);
    fade = constrain(fade, 0, 1);

    let a = this.baseAlpha * fade * settings.opacity;

    fill(red(this.colour), green(this.colour), blue(this.colour), a);
    stroke(red(this.colour), green(this.colour), blue(this.colour), a * 0.35);
    strokeWeight(1);

    if (this.type === "circle") {
      this.drawCircle(a);
    } else if (this.type === "arc") {
      this.drawArc(a);
    } else if (this.type === "triangle") {
      this.drawTriangle();
    } else if (this.type === "beam") {
      this.drawBeam();
    } else if (this.type === "quad") {
      this.drawQuad();
    } else if (this.type === "thinLine") {
      this.drawThinLine();
    }

    pop();
  }

  drawCircle(a) {
    noStroke();

    fill(red(this.colour), green(this.colour), blue(this.colour), a);
    ellipse(0, 0, this.size, this.size);

    fill(255, 255, 255, a * 0.18);
    ellipse(0, 0, this.size * this.innerRatio, this.size * this.innerRatio);

    fill(0, 40, 50, a * 0.35);
    ellipse(0, 0, this.size * 0.12, this.size * 0.12);
  }

  drawArc(a) {
    noStroke();

    fill(red(this.colour), green(this.colour), blue(this.colour), a);
    arc(0, 0, this.size, this.size, this.arcStart, this.arcEnd, PIE);

    fill(255, 255, 255, a * 0.12);
    arc(
      0,
      0,
      this.size * 0.62,
      this.size * 0.62,
      this.arcStart + 0.15,
      this.arcEnd - 0.15,
      PIE
    );
  }

  drawTriangle() {
    noStroke();
    triangle(
      -this.size * 0.48,
      this.size * 0.38,
      this.size * 0.48,
      this.size * 0.34,
      random(-4, 4),
      -this.size * 0.72
    );
  }

  drawBeam() {
    noStroke();
    triangle(
      0,
      0,
      this.size * 1.65,
      -this.size * 0.06,
      this.size * 1.65,
      this.size * 0.06
    );
  }

  drawQuad() {
    noStroke();
    quad(
      -this.size * 0.48,
      -this.size * 0.18,
      this.size * 0.42,
      -this.size * 0.35,
      this.size * 0.58,
      this.size * 0.28,
      -this.size * 0.28,
      this.size * 0.48
    );
  }

  drawThinLine() {
    strokeWeight(random(1, 3));
    line(-this.size * 0.8, 0, this.size * 0.8, 0);
  }

  isDead() {
    return this.life > this.lifeMax || this.baseAlpha < 2;
  }
}

// ------------------------------------------------------------
// Burst particle class
// ------------------------------------------------------------

class BurstParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = random(TWO_PI);
    this.speed = random(1.2, 6.5);
    this.size = random(3, 20);
    this.life = 0;
    this.lifeMax = random(600, 1600);

    this.colour = random([
      color(255, 235, 160),
      color(255, 120, 80),
      color(255, 255, 255),
      color(120, 220, 255),
      color(255, 185, 70)
    ]);
  }

  update() {
    this.life += deltaTime;

    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    this.speed *= 0.975;
  }

  display() {
    push();
    blendMode(SCREEN);
    noStroke();

    let a = map(this.life, 0, this.lifeMax, 180, 0);
    fill(red(this.colour), green(this.colour), blue(this.colour), a);
    ellipse(this.x, this.y, this.size, this.size);

    pop();
  }

  isDead() {
    return this.life > this.lifeMax;
  }
}

// ------------------------------------------------------------
// Soft glow layer
// ------------------------------------------------------------

class GlowField {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(160, 620);
    this.offset = random(1000);

    this.colour = random([
      color(40, 150, 170),
      color(65, 190, 210),
      color(255, 180, 90),
      color(190, 220, 240),
      color(40, 120, 100)
    ]);
  }

  update(settings) {
    this.x += sin(frameCount * 0.002 + this.offset) * settings.speed * 0.7;
    this.y += cos(frameCount * 0.0025 + this.offset) * settings.speed * 0.7;
  }

  display(settings) {
    push();
    blendMode(SCREEN);
    noStroke();

    let a = 8 * settings.opacity;

    if (settings.colourMode === "burst") {
      a = 15;
    }

    fill(red(this.colour), green(this.colour), blue(this.colour), a);
    ellipse(this.x, this.y, this.size, this.size);

    pop();
  }
}