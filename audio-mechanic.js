// audio-mechanic.js
// Owner: Yibei Yang / yyan0553
// Mechanic: Use audio level and frequency data from a music track to drive the mechanic.

// Music and audio analysis
let song;
let amplitude;
let fft;

// Audio state
let audioStarted = false;
let audioLevel = 0;
let smoothAudioLevel = 0;

// Visual elements controlled by music
let audioCircles = [];
let numberOfCircles = 35;

// Load the music file before the sketch starts
function preloadAudioMechanic() {
  song = loadSound("assets/music.mp3");
}

// Set up amplitude and frequency analysis
function initAudioMechanic() {
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();

  amplitude.setInput(song);
  fft.setInput(song);

  // Create initial CUDA-inspired circular forms
  for (let i = 0; i < numberOfCircles; i++) {
    audioCircles.push({
      x: random(width),
      y: random(height),
      baseSize: random(30, 160),
      hue: random(0, 360),
      alpha: random(18, 50),
      noiseOffsetX: random(1000),
      noiseOffsetY: random(1000),
      speed: random(0.002, 0.008)
    });
  }
}

// Start or pause the music when the user clicks
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

// Update audio level every frame
function updateAudioMechanic() {
  if (audioStarted && song.isPlaying()) {
    audioLevel = amplitude.getLevel();

    // Smooth the audio value so the visuals feel organic
    smoothAudioLevel = lerp(smoothAudioLevel, audioLevel, 0.12);
  } else {
    smoothAudioLevel = lerp(smoothAudioLevel, 0, 0.08);
  }
}

// Draw the music-reactive visual layer
function drawAudioMechanic() {
  push();
  noStroke();

  // Convert the small audio level into stronger visual energy
  let energy = constrain(smoothAudioLevel * 35, 0, 1);

  // Analyse frequency data
  fft.analyze();

  let bass = fft.getEnergy("bass");
  let mid = fft.getEnergy("mid");
  let treble = fft.getEnergy("treble");

  let bassEnergy = map(bass, 0, 255, 0, 1);
  let midEnergy = map(mid, 0, 255, 0, 1);
  let trebleEnergy = map(treble, 0, 255, 0, 1);

  for (let i = 0; i < audioCircles.length; i++) {
    let c = audioCircles[i];

    // Perlin noise creates smooth floating movement
    let noiseX = noise(c.noiseOffsetX);
    let noiseY = noise(c.noiseOffsetY);

    let xMovement = map(noiseX, 0, 1, -90, 90);
    let yMovement = map(noiseY, 0, 1, -90, 90);

    let x = c.x + xMovement;
    let y = c.y + yMovement;

    // Low frequency controls large pulsing circles
    let audioSize = c.baseSize + energy * 220 + bassEnergy * 130;

    // Mid and high frequencies affect brightness
    let brightness = 55 + energy * 25 + midEnergy * 10 + trebleEnergy * 20;

    // Overall audio level affects transparency
    let alpha = c.alpha + energy * 45;

    // Main translucent circle
    fill(c.hue, 75, brightness, alpha);
    ellipse(x, y, audioSize);

    // Inner circle creates layered CUDA-style depth
    fill((c.hue + 40) % 360, 70, 100, alpha * 0.45);
    ellipse(x, y, audioSize * 0.45);

    // Treble creates small bright centre details
    fill((c.hue + 90) % 360, 80, 100, trebleEnergy * 45);
    ellipse(x, y, audioSize * 0.12);

    // Music makes the movement faster
    c.noiseOffsetX += c.speed + energy * 0.004;
    c.noiseOffsetY += c.speed + energy * 0.004;
  }

  pop();
}