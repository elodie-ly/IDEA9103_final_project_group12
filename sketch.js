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
  initPerlinMechanic();
}

function draw() {
  updateAudioMechanic();
  updatePerlinMechanic();

  drawAudioBackground();

  drawPerlinMechanic();
  drawAudioMechanic();

  drawInstructionText();
}

function mousePressed() {
  startAudioMechanic();
}

function keyPressed() {
  if (key === "p" || key === "P") {
    resetPerlinMechanic();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initPerlinMechanic();
}

function drawInstructionText() {
  push();

  fill(0, 0, 100, 78);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);

  if (!audioStarted) {
    text("Click to start music | Press P to regenerate Perlin layer", width / 2, height - 40);
  } else {
    text("Music controls audio layer | Perlin noise creates floating geometry", width / 2, height - 40);
  }

  pop();
}