class TimeMechanic {
  constructor() {
    this.cycleDuration = 32000; // 32 seconds for one full visual cycle
    this.phase = "calm";
    this.pulseShapes = [];
    this.lastSpawnTime = 0;
    this.spawnInterval = 900;
  }

  update() {
    let currentTime = millis() % this.cycleDuration;

    // Divide the full cycle into four timed phases
    if (currentTime < 8000) {
      this.phase = "calm";
    } else if (currentTime < 16000) {
      this.phase = "build";
    } else if (currentTime < 24000) {
      this.phase = "burst";
    } else {
      this.phase = "fade";
    }

    // Timed event: spawn new shapes every few milliseconds
    if (millis() - this.lastSpawnTime > this.spawnInterval) {
      this.spawnTimedShape();
      this.lastSpawnTime = millis();
    }

    // Update all timed shapes
    for (let i = this.pulseShapes.length - 1; i >= 0; i--) {
      this.pulseShapes[i].update();

      if (this.pulseShapes[i].isFinished()) {
        this.pulseShapes.splice(i, 1);
      }
    }
  }

  display() {
    push();
    blendMode(SCREEN);

    // Draw shapes controlled by time
    for (let shape of this.pulseShapes) {
      shape.display(this.phase);
    }

    // Draw a soft timed overlay for each phase
    this.drawPhaseOverlay();

    pop();
  }

  spawnTimedShape() {
    let shapeCount = 1;

    if (this.phase === "calm") {
      shapeCount = 1;
      this.spawnInterval = 1300;
    } else if (this.phase === "build") {
      shapeCount = 2;
      this.spawnInterval = 900;
    } else if (this.phase === "burst") {
      shapeCount = 4;
      this.spawnInterval = 400;
    } else if (this.phase === "fade") {
      shapeCount = 1;
      this.spawnInterval = 1100;
    }

    for (let i = 0; i < shapeCount; i++) {
      this.pulseShapes.push(new TimedShape(this.phase));
    }
  }

  drawPhaseOverlay() {
    noStroke();

    if (this.phase === "calm") {
      fill(0, 60, 80, 20);
      rect(0, 0, width, height);
    }

    if (this.phase === "build") {
      fill(40, 120, 150, 18);
      rect(0, 0, width, height);
    }

    if (this.phase === "burst") {
      fill(255, 180, 60, 22);
      rect(0, 0, width, height);
    }

    if (this.phase === "fade") {
      fill(0, 20, 35, 35);
      rect(0, 0, width, height);
    }
  }
}

class TimedShape {
  constructor(phase) {
    this.x = random(width);
    this.y = random(height);
    this.size = random(40, 220);
    this.rotation = random(TWO_PI);
    this.rotationSpeed = random(-0.01, 0.01);
    this.age = 0;
    this.lifeSpan = random(3000, 7000);
    this.phase = phase;
    this.shapeType = random(["circle", "triangle", "beam", "polygon"]);

    if (phase === "burst") {
      this.lifeSpan = random(1800, 4200);
      this.size = random(120, 360);
    }
  }

  update() {
    this.age += deltaTime;
    this.rotation += this.rotationSpeed;

    // Shapes slowly expand over time
    this.size += 0.03 * deltaTime;
  }

  display(currentPhase) {
    let progress = this.age / this.lifeSpan;
    let alpha = map(progress, 0, 1, 90, 0);

    noStroke();
    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    if (currentPhase === "calm") {
      fill(random(20, 60), random(100, 160), random(140, 200), alpha * 0.45);
    } else if (currentPhase === "build") {
      fill(random(40, 120), random(140, 210), random(160, 230), alpha * 0.55);
    } else if (currentPhase === "burst") {
      fill(random(180, 255), random(80, 220), random(40, 120), alpha * 0.7);
    } else {
      fill(random(20, 80), random(80, 140), random(120, 180), alpha * 0.3);
    }

    if (this.shapeType === "circle") {
      ellipse(0, 0, this.size, this.size);
    }

    if (this.shapeType === "triangle") {
      triangle(
        -this.size * 0.5, this.size * 0.4,
        this.size * 0.5, this.size * 0.4,
        0, -this.size * 0.6
      );
    }

    if (this.shapeType === "beam") {
      triangle(
        0, 0,
        this.size * 1.4, -this.size * 0.08,
        this.size * 1.4, this.size * 0.08
      );
    }

    if (this.shapeType === "polygon") {
      beginShape();
      for (let i = 0; i < 6; i++) {
        let angle = TWO_PI / 6 * i;
        let r = this.size * random(0.35, 0.65);
        vertex(cos(angle) * r, sin(angle) * r);
      }
      endShape(CLOSE);
    }

    pop();
  }

  isFinished() {
    return this.age > this.lifeSpan;
  }
}