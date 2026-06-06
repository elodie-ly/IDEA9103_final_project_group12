// audio-mechanic.js
// Owner: Yibei Yang
// Mechanic: Audio level drives scale, transparency, brightness and movement.

// Microphone input
let mic;

// Audio state
let audioStarted = false;
let audioLevel = 0;
let smoothAudioLevel = 0;

// Array to store audio reactive circles
let audioCircles = [];

// Number of circles in the system
let numberOfCircles = 35;

function initAudioMechanic() {
  mic = new p5.AudioIn();

  // Create initial CUDA-style circles
  for (let i = 0; i < numberOfCircles; i++) {
    audioCircles.push({
      x: random(width),
      y: random(height),
      baseSize: random(30, 160),
      hue: random(0, 360),
      alpha: random(20, 55),
      noiseOffsetX: random(1000),
      noiseOffsetY: random(1000),
      speed: random(0.002, 0.008)
    });
  }
}

// Browser needs user interaction before audio can start
function mousePressed() {
  if (!audioStarted) {
    userStartAudio();
    mic.start();
    audioStarted = true;
  }
}

function updateAudioMechanic() {
  if (audioStarted) {
    // Get microphone volume
    audioLevel = mic.getLevel();

    // Smooth the value so the animation feels less jumpy
    smoothAudioLevel = lerp(smoothAudioLevel, audioLevel, 0.1);
  } else {
    smoothAudioLevel = 0;
  }
}

function drawAudioMechanic() {
  push();

  noStroke();

  // Convert small microphone value into stronger visual energy
  let energy = smoothAudioLevel * 8;

  for (let i = 0; i < audioCircles.length; i++) {
    let c = audioCircles[i];

    // Use Perlin noise for smooth floating movement
    let noiseX = noise(c.noiseOffsetX);
    let noiseY = noise(c.noiseOffsetY);

    let xMovement = map(noiseX, 0, 1, -80, 80);
    let yMovement = map(noiseY, 0, 1, -80, 80);

    let x = c.x + xMovement;
    let y = c.y + yMovement;

    // Audio controls circle size
    let audioSize = c.baseSize + energy * 180;

    // Audio controls brightness and transparency
    let brightness = 70 + energy * 30;
    let alpha = c.alpha + energy * 45;

    fill(c.hue, 80, brightness, alpha);
    ellipse(x, y, audioSize);

    // Inner circle to create layered CUDA-style depth
    fill((c.hue + 40) % 360, 70, 100, alpha * 0.5);
    ellipse(x, y, audioSize * 0.45);

    // Update noise location every frame
    c.noiseOffsetX += c.speed + energy * 0.002;
    c.noiseOffsetY += c.speed + energy * 0.002;
  }

  pop();
}