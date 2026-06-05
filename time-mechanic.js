class TimeMechanic {
  constructor() {
    this.cycleDuration = 40000; // 40 seconds full loop
    this.phase = "Warm Build-up";
    this.phaseIndex = 0;

    this.lastSpawnTime = 0;
    this.lastBurstTime = 0;

    this.spawnInterval = 800;
  }

  update() {
    let t = millis() % this.cycleDuration;

    if (t < 10000) {
      this.phase = "Warm Build-up";
      this.phaseIndex = 0;
    } else if (t < 20000) {
      this.phase = "Cool Drift";
      this.phaseIndex = 1;
    } else if (t < 30000) {
      this.phase = "Energy Burst";
      this.phaseIndex = 2;
    } else {
      this.phase = "Dark Reset";
      this.phaseIndex = 3;
    }
  }

  getPhaseSettings() {
    if (this.phaseIndex === 0) {
      return {
        colourMode: "warm",
        spawnInterval: 650,
        speed: 0.7,
        opacity: 1.0,
        backgroundFade: 28
      };
    }

    if (this.phaseIndex === 1) {
      return {
        colourMode: "cool",
        spawnInterval: 950,
        speed: 0.45,
        opacity: 0.85,
        backgroundFade: 34
      };
    }

    if (this.phaseIndex === 2) {
      return {
        colourMode: "burst",
        spawnInterval: 220,
        speed: 1.8,
        opacity: 1.35,
        backgroundFade: 18
      };
    }

    return {
      colourMode: "dark",
      spawnInterval: 1200,
      speed: 0.25,
      opacity: 0.45,
      backgroundFade: 45
    };
  }

  runTimedEvents(shapes, particles) {
    let now = millis();
    let settings = this.getPhaseSettings();

    // Timed event 1: generate new geometry at different speeds
    if (now - this.lastSpawnTime > settings.spawnInterval) {
      let amount = 1;

      if (this.phaseIndex === 0) amount = 2;
      if (this.phaseIndex === 1) amount = 1;
      if (this.phaseIndex === 2) amount = 5;
      if (this.phaseIndex === 3) amount = 1;

      for (let i = 0; i < amount; i++) {
        shapes.push(new AbstractShape(this.phaseIndex));
      }

      this.lastSpawnTime = now;
    }

    // Timed event 2: burst particles only during the energy phase
    if (this.phaseIndex === 2 && now - this.lastBurstTime > 1000) {
      let x = random(width * 0.15, width * 0.85);
      let y = random(height * 0.15, height * 0.85);

      for (let i = 0; i < 35; i++) {
        particles.push(new BurstParticle(x, y));
      }

      this.lastBurstTime = now;
    }
  }

  displayDebugText() {
    // You can remove this part in the final version
    push();
    fill(255, 190);
    textSize(15);
    textAlign(LEFT, TOP);
    text("Time-based phase: " + this.phase, 20, 20);
    pop();
  }
}