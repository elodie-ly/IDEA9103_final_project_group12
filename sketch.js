let timeMechanic;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  timeMechanic = new TimeMechanic();
}

function draw() {
  background(5, 35, 45, 35);

  timeMechanic.update();
  timeMechanic.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}