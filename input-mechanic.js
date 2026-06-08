console.log("INPUT FILE ACTIVE 🚀");
// User Input Mechanic
// Owner: Xinyue Zhang

let clickCount = 0;
let clickX = 0;
let clickY = 0;
let rippleSize = 0;
let rippleAlpha = 255;
let clickRadius = 150;
let connections = [];

function handleInputMechanic() {
  startAudioMechanic();
  userStartAudio();
  console.log("CLICK FIRED");

  console.log("clicked");

  // audio trigger (safe)
  if (typeof audioStarted !== "undefined" && typeof song !== "undefined") {
    if (!audioStarted || !song || !song.isPlaying()) {
      userStartAudio();
      if (song && !song.isPlaying()) {
        song.play();
      }
    }
  }

  clickCount++;

  clickX = mouseX;
  clickY = mouseY;
  rippleSize = 10;
  rippleAlpha = 255;

  rippleSize = 10;
  rippleAlpha = 255;

  // interaction field
  if (typeof scene !== "undefined") {
    for (let c of scene.circles) {

      let cx = c.x * width;
      let cy = c.y * height;

      let d = dist(clickX, clickY, cx, cy);
      let force = map(d, 0, clickRadius, 1, 0);

      if (force > 0) {

       c.energy += force * 0.8;
       c.energy = min(c.energy, 1.2);
       c.a += force * 28;


        connections.push({
          x1: clickX,
          y1: clickY,
          x2: c.x * width,
          y2: c.y * height,
          alpha: 80 * force
        });
      }
    }
  }
}

function drawInputMechanic() {

  noFill();

  // ripple physics
  rippleSize *= 0.94;
  rippleSize += 1.8;
  rippleAlpha *= 0.92;

  let wobble = sin(rippleSize * 0.05) * 2;

  // 发光核心
noStroke();
fill(255, 255, 255, rippleAlpha * 0.15);
circle(clickX, clickY, rippleSize * 6);

// 第一层波纹
noFill();
stroke(255, rippleAlpha);
strokeWeight(3);
circle(clickX, clickY, rippleSize * 2 + wobble);

// 第二层波纹
stroke(255, rippleAlpha * 0.6);
strokeWeight(2);
circle(clickX, clickY, rippleSize * 3);

// 第三层波纹
stroke(255, rippleAlpha * 0.3);
strokeWeight(1);
circle(clickX, clickY, rippleSize * 4);

  // connection lines
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

    lineData.alpha *= 0.92;

    if (lineData.alpha <= 1) {
      connections.splice(i, 1);
    }
  }
}
function updateEnergyDecay() {
  if (!scene) return;

  for (let c of scene.circles) {
    c.energy = (c.energy || 0) * 0.92;
    c.energy = Math.min(c.energy, 1.2);
    c.a = lerp(c.a, 20, 0.05);
  }
}