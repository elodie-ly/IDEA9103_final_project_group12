// User Input Mechanic
// Owner: Xinyue Zhang

let clickCount = 0;
let clickX = 0;
let clickY = 0;
let rippleSize = 0;
let rippleAlpha = 255;
let clickRadius = 150;
let connections = [];

function mousePressed() {

  clickCount++;

  clickX = mouseX;
  clickY = mouseY;

  rippleSize = 10;
  rippleAlpha = 255;

 for (let c of scene.circles) {

  let d = dist(
    clickX,
    clickY,
    c.x * width,
    c.y * height
  );

  if (d < clickRadius) {

  c.r = c.r * 1.15;
 c.a = c.a + 20;

  connections.push({
    x1: clickX,
    y1: clickY,
    x2: c.x * width,
    y2: c.y * height,
    alpha: 15
  });

}

}
  console.log(clickCount);

}

function drawInputMechanic() {

  noFill();

  stroke(255, rippleAlpha);

  circle(
    clickX,
    clickY,
    rippleSize
  );

  if (rippleSize > 0) {
    rippleSize += 3;
    rippleAlpha -= 4;
  }

  for (let i = connections.length - 1; i >= 0; i--) {

    let lineData = connections[i];

    stroke(100, 220, 255, lineData.alpha);
    strokeWeight(1);

    line(
      lineData.x1,
      lineData.y1,
      lineData.x2,
      lineData.y2
    );

    lineData.alpha -= 2;

    if (lineData.alpha <= 0) {
      connections.splice(i, 1);
    }

  }

}