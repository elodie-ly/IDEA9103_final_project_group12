const PHASE_DURATION = 10000;
const CYCLE_DURATION = PHASE_DURATION * 4;
const TWO_PI_F = Math.PI * 2;

const PHASES = [
  {
    name: "Warm Build-up",
    range: "0-10 sec",
    bg: ["#092f36", "#123f47", "#4e3b37"],
    meter: [25, 90, 100],
  },
  {
    name: "Cool Drift",
    range: "10-20 sec",
    bg: ["#062733", "#0c6374", "#18483c"],
    meter: [185, 82, 82],
  },
  {
    name: "Energy Burst",
    range: "20-30 sec",
    bg: ["#102a36", "#245f70", "#5a4039"],
    meter: [48, 22, 100],
  },
  {
    name: "Dark Reset",
    range: "30-40 sec",
    bg: ["#03090f", "#091c31", "#141123"],
    meter: [255, 55, 54],
  },
];

const PALETTES = {
  base: [
    [187, 78, 62],
    [198, 78, 55],
    [174, 70, 53],
    [151, 58, 56],
    [34, 86, 96],
    [47, 72, 98],
    [4, 78, 88],
    [330, 28, 88],
    [218, 32, 96],
  ],
  warm: [
    [12, 88, 98],
    [24, 94, 100],
    [39, 86, 100],
    [0, 76, 90],
    [51, 66, 98],
  ],
  cool: [
    [181, 78, 72],
    [194, 82, 76],
    [208, 72, 70],
    [154, 62, 65],
    [170, 60, 74],
  ],
  burst: [
    [50, 28, 100],
    [43, 95, 100],
    [0, 0, 100],
    [8, 88, 100],
    [197, 42, 100],
  ],
  dark: [
    [205, 80, 22],
    [187, 90, 20],
    [260, 58, 24],
    [305, 42, 28],
    [215, 34, 13],
  ],
};

let particles = [];
let pulses = [];
let flashes = [];
let lastPhase = -1;
let eventClock;

function getPhase() {
  const cycleTime = millis() % CYCLE_DURATION;
  const index = floor(cycleTime / PHASE_DURATION);
  const localTime = cycleTime - index * PHASE_DURATION;
  return {
    index,
    info: PHASES[index],
    progress: localTime / PHASE_DURATION,
    localTime,
    cycleTime,
  };
}

function runTimedEvents(phase) {
  const now = millis();
  if (phase.index !== lastPhase) {
    handlePhaseStart(phase.index);
    lastPhase = phase.index;
  }

  if (phase.index === 0 && now - eventClock.warm > 1850) {
    eventClock.warm = now;
    const x = random(width * 0.18, width * 0.78);
    const y = random(height * 0.2, height * 0.82);
    pulses.push(makePulse(x, y, random(unit() * 0.18, unit() * 0.38), pick(PALETTES.warm), 2.8, 25));
  }

  if (phase.index === 1 && now - eventClock.cool > 1450) {
    eventClock.cool = now;
    const x = random(width);
    const y = random(height);
    pulses.push(makePulse(x, y, random(unit() * 0.12, unit() * 0.26), pick(PALETTES.cool), 2.2, 18));
  }

  if (phase.index === 2 && now - eventClock.burst > 720) {
    eventClock.burst = now;
    const x = width * random(0.18, 0.88);
    const y = height * random(0.16, 0.84);
    spawnParticleBurst(x, y, 46, 1.25);
    for (let i = 0; i < 4; i++) {
      flashes.push(makeFlash(x, y, pick(PALETTES.burst)));
    }
  }

  if (phase.index === 3 && now - eventClock.dark > 2100) {
    eventClock.dark = now;
    const x = random(width);
    const y = random(height);
    pulses.push(makePulse(x, y, random(unit() * 0.1, unit() * 0.22), pick(PALETTES.dark), 3.4, 12));
  }
}

function handlePhaseStart(index) {
  if (index === 0) {
    pulses.push(makePulse(width * 0.38, height * 0.5, unit() * 0.54, PALETTES.warm[1], 4.2, 21));
  } else if (index === 1) {
    pulses.push(makePulse(width * 0.63, height * 0.42, unit() * 0.46, PALETTES.cool[1], 3.8, 19));
  } else if (index === 2) {
    spawnParticleBurst(width * 0.5, height * 0.52, 130, 1.7);
    for (let i = 0; i < 13; i++) {
      flashes.push(makeFlash(width * random(0.2, 0.82), height * random(0.16, 0.86), pick(PALETTES.burst)));
    }
  } else if (index === 3) {
    pulses.push(makePulse(width * 0.5, height * 0.52, unit() * 0.75, PALETTES.dark[2], 5.0, 16));
  }
}

function makePulse(x, y, radius, c, duration, alpha) {
  return {
    x,
    y,
    radius,
    c,
    duration,
    alpha,
    age: 0,
  };
}

function drawPulses(dt) {
  blendMode(SCREEN);
  for (let i = pulses.length - 1; i >= 0; i--) {
    const p = pulses[i];
    p.age += dt;
    const k = p.age / p.duration;
    if (k >= 1) {
      pulses.splice(i, 1);
      continue;
    }
    const eased = 1 - pow(1 - k, 3);
    noFill();
    stroke(p.c[0], p.c[1], p.c[2], p.alpha * (1 - k));
    strokeWeight(max(1, unit() * 0.004 * (1 - k)));
    ellipse(p.x, p.y, p.radius * eased * 2, p.radius * eased * 2);
    noStroke();
    fill(p.c[0], p.c[1], p.c[2], p.alpha * 0.35 * (1 - k));
    ellipse(p.x, p.y, p.radius * eased * 1.2, p.radius * eased * 1.2);
  }
  blendMode(BLEND);
}

function spawnParticleBurst(x, y, count, force) {
  for (let i = 0; i < count; i++) {
    const a = random(TWO_PI_F);
    const speed = random(65, 420) * force;
    const c = pick(PALETTES.burst);
    particles.push({
      x,
      y,
      vx: cos(a) * speed,
      vy: sin(a) * speed,
      life: random(0.7, 1.9),
      maxLife: 0,
      c,
      size: random(1.6, 5.8),
      spin: random(-4, 4),
      angle: random(TWO_PI_F),
    });
    particles[particles.length - 1].maxLife = particles[particles.length - 1].life;
  }
  if (particles.length > 520) {
    particles.splice(0, particles.length - 520);
  }
}

function drawParticles(dt, phase) {
  const drag = phase.index === 2 ? 0.982 : 0.968;
  blendMode(ADD);
  noStroke();
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }
    p.vx *= drag;
    p.vy *= drag;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.angle += p.spin * dt;
    const k = p.life / p.maxLife;
    fill(p.c[0], p.c[1], p.c[2], 55 * k);
    ellipse(p.x, p.y, p.size * (1.2 + (1 - k) * 2.2), p.size * (1.2 + (1 - k) * 2.2));
    stroke(p.c[0], p.c[1], p.c[2], 36 * k);
    strokeWeight(1);
    line(p.x, p.y, p.x - p.vx * 0.035, p.y - p.vy * 0.035);
    noStroke();
  }
  blendMode(BLEND);
}

function makeFlash(x, y, c) {
  const angle = random(TWO_PI_F);
  const len = random(unit() * 0.09, unit() * 0.32);
  return {
    x1: x,
    y1: y,
    x2: x + cos(angle) * len,
    y2: y + sin(angle) * len,
    c,
    life: random(0.16, 0.38),
    maxLife: 0,
    weight: random(1.2, 3.6),
  };
}

function drawFlashes(dt) {
  blendMode(ADD);
  for (let i = flashes.length - 1; i >= 0; i--) {
    const f = flashes[i];
    if (f.maxLife === 0) {
      f.maxLife = f.life;
    }
    f.life -= dt;
    if (f.life <= 0) {
      flashes.splice(i, 1);
      continue;
    }
    const k = f.life / f.maxLife;
    stroke(f.c[0], f.c[1], f.c[2], 78 * k);
    strokeWeight(f.weight * k);
    line(f.x1, f.y1, lerp(f.x1, f.x2, 1.15 - k * 0.15), lerp(f.y1, f.y2, 1.15 - k * 0.15));
  }
  noStroke();
  blendMode(BLEND);
}

function drawPhaseMeter(phase) {
  const margin = clamp(unit() * 0.022, 16, 26);
  const meterWidth = min(width - margin * 2, 470);
  const meterHeight = 3;
  const x = margin;
  const y = height - margin;
  const seg = meterWidth / 4;

  blendMode(BLEND);
  noStroke();
  fill(0, 0, 100, 10);
  rect(x + meterWidth / 2, y, meterWidth, meterHeight);
  for (let i = 0; i < 4; i++) {
    const c = PHASES[i].meter;
    const progress = i < phase.index ? 1 : i === phase.index ? phase.progress : 0;
    fill(c[0], c[1], c[2], i === phase.index ? 62 : 20);
    rect(x + i * seg + (seg * progress) / 2, y, seg * progress, meterHeight);
  }

  textAlign(LEFT, BOTTOM);
  textSize(clamp(unit() * 0.012, 11, 14));
  fill(205, 24, 96, 68);
  text(`${phase.info.name}  ${phase.info.range}`, x, y - 10);
}

function phaseLayerAlpha(phase, layer) {
  const p = phase.progress;
  if (phase.index === 0) {
    const warm = 0.95 + p * 0.45;
    return layer === "circle" || layer === "wash" ? warm : 0.82;
  }
  if (phase.index === 1) {
    if (layer === "bar" || layer === "node") return 1.55;
    if (layer === "circle") return 0.78;
    return 1.05;
  }
  if (phase.index === 2) {
    if (layer === "ray" || layer === "node") return 1.95;
    if (layer === "bar") return 1.35;
    return 1.15;
  }
  const fade = 0.66 - p * 0.36;
  if (layer === "wash") return fade;
  if (layer === "ray") return fade * 0.7;
  return fade;
}


function unit() {
  return min(width, height);
}

function pick(list) {
  return list[floor(random(list.length))];
}

function shiftHue(h, delta) {
  return (h + delta + 360) % 360;
}

function clamp(value, minValue, maxValue) {
  return Math.max(minValue, Math.min(maxValue, value));
}
