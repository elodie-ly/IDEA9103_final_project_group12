// sketch.js
// Main sketch file

function preload() {
  preloadAudioMechanic();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);

  initAudioMechanic();
}

function draw() {
  background(220, 60, 8);

  updateAudioMechanic();
  drawAudioMechanic();

  drawInstructionText();
}

function mousePressed() {
  startAudioMechanic();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawInstructionText() {
  push();

  fill(0, 0, 100, 80);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);

  if (!audioStarted) {
    text("Click to start music", width / 2, height - 40);
  } else {
    text("Music controls size, colour, transparency and movement", width / 2, height - 40);
  }

  pop();
}