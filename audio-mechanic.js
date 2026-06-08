// audio-mechanic.js
// Owner: Yibei Yang / yyan0553
// Mechanic: Use audio level and frequency data from a music track to drive the mechanic.

let song;
let amplitude;
let fft;

let audioStarted = false;
let audioLevel = 0;
let smoothAudioLevel = 0;

let audioEnergy = 0;
let bassEnergy = 0;
let midEnergy = 0;
let trebleEnergy = 0;

let denseCircles = [];
let audioShapes = [];
let sparkleParticles = [];

let numberOfDenseCircles = 34;
let numberOfShapes = 58;

function preloadAudioMechanic() {
  song = loadSound("assets/music.mp3");
}

function initAudioMechanic() {
  amplitude = new p5.Amplitude();
  fft = new p5.FFT(0.88, 64);

  amplitude.setInput(song);
  fft.setInput(song);

  // Scene A: volume-driven layered circles
  for (let i = 0; i < numberOfDenseCircles; i++) {
    denseCircles.push({
      x: random(width * 0.03, width * 0.97),
      y: random(height * 0.05, height * 0.92),
      baseSize: random(70, 210),
      hue: random([25, 45, 165, 185, 205, 260, 295, 320]),
      alpha: random(28, 58),
      offset: random(360),
      moveOffsetX: random(1000),
      moveOffsetY: random(1000),
      speed: random(0.001, 0.004)
    });
  }

  // Scene B: ecosystem with circles, rings, lines, rectangles and dots
  for (let i = 0; i < numberOfShapes; i++) {
    audioShapes.push({
      type: random(["circle", "circle", "ring", "rect", "line", "dot"]),
      x: random(width * 0.06, width * 0.94),
      y: random(height * 0.08, height * 0.90),
      baseSize: random(20, 105),
      hue: random([32, 48, 165, 185, 205, 260, 300, 325]),
      alpha: random(12, 34),
      noiseOffsetX: random(1000),
      noiseOffsetY: random(1000),
      rotation: random(360),
      phase: random(360),
      waveSpeed: random(0.25, 1.1),
      speed: random(0.001, 0.0045)
    });
  }
}

function startAudioMechanic() {
  userStartAudio();

  if (!audioStarted) {
    song.loop();
    audioStarted = true;
    console.log("Music started");
  } else {
    if (song.isPlaying()) {
      song.pause();
      console.log("Music paused");
    } else {
      song.loop();
      console.log("Music resumed");
    }
  }
}

function updateAudioMechanic() {
  if (audioStarted && song.isPlaying()) {
    audioLevel = amplitude.getLevel();
    smoothAudioLevel = lerp(smoothAudioLevel, audioLevel, 0.12);
  } else {
    smoothAudioLevel = lerp(smoothAudioLevel, 0, 0.08);
  }

  fft.analyze();

  bassEnergy = map(fft.getEnergy("bass"), 0, 255, 0, 1);
  midEnergy = map(fft.getEnergy("mid"), 0, 255, 0, 1);
  trebleEnergy = map(fft.getEnergy("treble"), 0, 255, 0, 1);

  audioEnergy = constrain(smoothAudioLevel * 70, 0, 1);
}

// Switch scene every 10 seconds based on music time
function getCurrentScene() {
  if (audioStarted && song.isPlaying()) {
    return floor(song.currentTime() / 10) % 2;
  }

  return floor(frameCount / 600) % 2;
}

function drawAudioBackgroundGlow() {
  let timeHue = (215 + frameCount * 0.04 + bassEnergy * 45 + trebleEnergy * 70) % 360;

  push();
  blendMode(SCREEN);
  noStroke();

  let washHue1 = (timeHue + 70) % 360;
  let washHue2 = (timeHue + 150) % 360;

  fill(washHue1, 55, 45, 8 + audioEnergy * 10);
  ellipse(width * 0.28, height * 0.35, width * 0.70 + bassEnergy * 180, height * 0.50);

  fill(washHue2, 65, 50, 7 + trebleEnergy * 10);
  ellipse(width * 0.75, height * 0.62, width * 0.60, height * 0.50 + midEnergy * 150);

  blendMode(BLEND);
  pop();
}

function drawAudioMechanic() {
  let scene = getCurrentScene();

  drawAudioBackgroundGlow();

  if (scene === 0) {
    drawSceneA();
  } else {
    drawSceneB();
  }

  drawSparkleParticles();
  drawAudioEnergyMeter(scene);
}

// Scene A: denser, volume-driven circle composition
function drawSceneA() {
  push();

  noStroke();

  let colourShift = (frameCount * 0.12 + bassEnergy * 45 + trebleEnergy * 70) % 360;

  for (let i = 0; i < denseCircles.length; i++) {
    let c = denseCircles[i];

    let moveX = map(noise(c.moveOffsetX), 0, 1, -35, 35);
    let moveY = map(noise(c.moveOffsetY), 0, 1, -35, 35);

    let pulse = sin(frameCount * 0.9 + c.offset);
    let pulseAmount = map(pulse, -1, 1, 0.82, 1.18);

    // Audio level and bass make circles breathe
    let size = c.baseSize * pulseAmount * (0.78 + audioEnergy * 1.35 + bassEnergy * 0.65);

    let currentHue = (c.hue + colourShift + i * 1.5) % 360;
    let brightness = 62 + audioEnergy * 22 + trebleEnergy * 16;
    let alpha = c.alpha + audioEnergy * 24;

    let x = c.x + moveX;
    let y = c.y + moveY;

    // Outer translucent circle
    fill(currentHue, 65, brightness, alpha * 0.55);
    ellipse(x, y, size, size);

    // Inner layer
    fill((currentHue + 28) % 360, 58, 95, alpha * 0.35);
    ellipse(x, y, size * 0.52, size * 0.52);

    // Small orbit point
    fill((currentHue + 60) % 360, 85, 100, alpha * 0.8);
    ellipse(
      x + cos(frameCount * 1.4 + c.offset) * size * 0.18,
      y + sin(frameCount * 1.4 + c.offset) * size * 0.18,
      size * 0.10 + trebleEnergy * 8,
      size * 0.10 + trebleEnergy * 8
    );

    c.moveOffsetX += c.speed + audioEnergy * 0.0015;
    c.moveOffsetY += c.speed + audioEnergy * 0.0015;
  }

  // Add a few soft horizontal bars so it does not become only circles
  for (let i = 0; i < 7; i++) {
    let y = height * (0.12 + i * 0.12);
    let barWave = sin(frameCount * 0.5 + i * 45);

    fill((colourShift + i * 35) % 360, 55, 80, 12 + audioEnergy * 16);
    rectMode(CENTER);
    rect(
      width * 0.5 + barWave * 80,
      y,
      width * (0.18 + bassEnergy * 0.18),
      10 + midEnergy * 22
    );
  }

  pop();
}

// Scene B: more open ecosystem composition
function drawSceneB() {
  push();

  let timeShift = frameCount * 0.08;

  let globalWave = map(sin(frameCount * 0.55), -1, 1, 0, 1);
  let wavePower = globalWave * (0.35 + audioEnergy * 0.75);

  let colourShift = (timeShift + bassEnergy * 50 + trebleEnergy * 80) % 360;

  noStroke();

  for (let i = 0; i < audioShapes.length; i++) {
    let s = audioShapes[i];

    let localWave = map(sin(frameCount * s.waveSpeed + s.phase), -1, 1, 0, 1);

    let movementRange = 18 + wavePower * 45 + audioEnergy * 30;

    let noiseX = noise(s.noiseOffsetX);
    let noiseY = noise(s.noiseOffsetY);

    let x = s.x + map(noiseX, 0, 1, -movementRange, movementRange);
    let y = s.y + map(noiseY, 0, 1, -movementRange, movementRange);

    let size = s.baseSize * (0.75 + localWave * 0.35 + bassEnergy * 0.85 + audioEnergy * 0.35);

    let currentHue = (s.hue + colourShift * 0.35 + i * 2) % 360;

    let brightness = 58 + wavePower * 18 + midEnergy * 12 + trebleEnergy * 18;
    let alpha = s.alpha + wavePower * 22 + audioEnergy * 24;

    push();
    translate(x, y);
    rotate(s.rotation + frameCount * (0.05 + audioEnergy * 0.45));

    if (s.type === "circle") {
      fill(currentHue, 62, brightness, alpha);
      ellipse(0, 0, size, size);

      fill((currentHue + 40) % 360, 55, 95, alpha * 0.35);
      ellipse(0, 0, size * 0.42, size * 0.42);
    }

    if (s.type === "ring") {
      noFill();

      stroke(currentHue, 70, brightness, alpha + bassEnergy * 20);
      strokeWeight(1.2 + bassEnergy * 2.2);
      ellipse(0, 0, size * 1.35, size * 1.35);

      stroke((currentHue + 55) % 360, 75, 95, alpha * 0.4);
      ellipse(0, 0, size * 0.75, size * 0.75);

      noStroke();
    }

    if (s.type === "rect") {
      rectMode(CENTER);

      fill(currentHue, 58, brightness, alpha * 0.72);

      let rectWidth = size * (1.1 + midEnergy * 1.9 + globalWave * 0.5);
      let rectHeight = size * 0.20;

      rect(0, 0, rectWidth, rectHeight);
    }

    if (s.type === "line") {
      stroke(currentHue, 70, brightness, alpha * 0.7);
      strokeWeight(0.8 + trebleEnergy * 1.8);

      let lineLength = size * (1.3 + midEnergy * 1.5);
      line(-lineLength, 0, lineLength, 0);

      noStroke();
    }

    if (s.type === "dot") {
      fill(currentHue, 85, 100, alpha + trebleEnergy * 25);
      ellipse(0, 0, size * 0.22 + trebleEnergy * 7, size * 0.22 + trebleEnergy * 7);
    }

    pop();

    s.noiseOffsetX += s.speed + audioEnergy * 0.0025 + trebleEnergy * 0.001;
    s.noiseOffsetY += s.speed + audioEnergy * 0.0025 + trebleEnergy * 0.001;
  }

  // Treble creates occasional small bursts
  if (audioStarted && song.isPlaying() && trebleEnergy > 0.68 && frameCount % 10 === 0) {
    createSparkleBurst(trebleEnergy);
  }

  pop();
}

function createSparkleBurst(trebleEnergy) {
  let centreX = random(width * 0.12, width * 0.88);
  let centreY = random(height * 0.14, height * 0.86);

  for (let i = 0; i < 5; i++) {
    sparkleParticles.push({
      x: centreX,
      y: centreY,
      vx: random(-2.1, 2.1) * trebleEnergy,
      vy: random(-2.1, 2.1) * trebleEnergy,
      size: random(3, 8),
      hue: random([35, 180, 210, 285, 320]),
      alpha: 75
    });
  }

  if (sparkleParticles.length > 100) {
    sparkleParticles.splice(0, 25);
  }
}

function drawSparkleParticles() {
  noStroke();

  for (let i = sparkleParticles.length - 1; i >= 0; i--) {
    let p = sparkleParticles[i];

    p.x += p.vx * (1 + audioEnergy);
    p.y += p.vy * (1 + audioEnergy);
    p.alpha -= 3;
    p.size *= 0.985;

    fill(p.hue, 75, 100, p.alpha);
    ellipse(p.x, p.y, p.size, p.size);

    if (p.alpha <= 0) {
      sparkleParticles.splice(i, 1);
    }
  }
}

function drawAudioEnergyMeter(scene) {
  push();

  rectMode(CORNER);
  noStroke();

  const margin = 24;
  const meterWidth = 300;
  const meterHeight = 7;

  // Right bottom position
  const meterX = width - meterWidth - margin;
  const meterY = height - margin - 26;

  // Background bar
  fill(0, 0, 100, 14);
  rect(meterX, meterY, meterWidth, meterHeight, 8);

  // Audio energy bar
  fill(180, 70, 100, 70);
  rect(meterX, meterY, meterWidth * audioEnergy, meterHeight, 8);

  // Label
  fill(0, 0, 100, 78);
  textSize(12);
  textAlign(LEFT, BOTTOM);

  let label = "";

  if (!audioStarted) {
    label = "Audio: Press Space to start music";
  } else {
    if (scene === 0) {
      label = "Audio: Level drives circle pulses";
    } else {
      label = "Audio: Frequency reshapes geometry";
    }
  }

  text(label, meterX, meterY - 8);

  pop();
}