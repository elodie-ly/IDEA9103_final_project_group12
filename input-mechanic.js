let clickCount = 0;
let clickX = 0;
let clickY = 0;
let rippleSize = 0;
let rippleAlpha = 0;
let clickRadius = 150;
let connections = [];
let clickParticles = [];

function handleInputMechanic() {
  clickCount++;

  clickX = mouseX;
  clickY = mouseY;
  rippleSize = 10;
  rippleAlpha = 255;

  for (let i = 0; i < 12; i++) {
    clickParticles.push({
      x: clickX,
      y: clickY,
      vx: random(-3, 3),
      vy: random(-3, 3),
      size: random(2, 6),
      alpha: 255
    });
  }

  if (typeof scene !== "undefined" && scene && scene.circles) {
    for (let c of scene.circles) {
      let cx = c.x * width;
      let cy = c.y * height;

      let d = dist(clickX, clickY, cx, cy);
      let force = map(d, 0, clickRadius, 1, 0);
      force = constrain(force, 0, 1);

      if (force > 0) {
        c.energy = (c.energy || 0) + force * 0.8;
        c.energy = min(c.energy, 1.2);
        c.a += force * 28;

        connections.push({
          x1: clickX,
          y1: clickY,
          x2: cx,
          y2: cy,
          alpha: 80 * force
        });
      }
    }
  }
}

function drawInputMechanic() {
  noFill();

  rippleSize *= 0.94;
  rippleSize += 0.9;
  rippleAlpha *= 0.96;

  let wobble = sin(rippleSize * 0.05) * 2;

  noStroke();
  fill(0, 0, 100, rippleAlpha * 0.15);
  circle(clickX, clickY, rippleSize * 6);

  noFill();
  stroke(0, 0, 100, rippleAlpha);
  strokeWeight(3);
  circle(clickX, clickY, rippleSize * 2 + wobble);

  stroke(0, 0, 100, rippleAlpha * 0.6);
  strokeWeight(2);
  circle(clickX, clickY, rippleSize * 3);

  stroke(0, 0, 100, rippleAlpha * 0.3);
  strokeWeight(1);
  circle(clickX, clickY, rippleSize * 4);

  for (let i = clickParticles.length - 1; i >= 0; i--) {
    let p = clickParticles[i];

    noStroke();
    fill(200, 80, 100, p.alpha * 0.5);
    circle(p.x, p.y, p.size);

    p.x += p.vx;
    p.y += p.vy;
    p.alpha *= 0.94;
    p.size *= 0.98;

    if (p.alpha < 5) {
      clickParticles.splice(i, 1);
    }
  }

  for (let i = connections.length - 1; i >= 0; i--) {
    let lineData = connections[i];

    stroke(190, 80, 100, lineData.alpha);
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
  if (typeof scene === "undefined" || !scene || !scene.circles) return;

  for (let c of scene.circles) {
    c.energy = (c.energy || 0) * 0.92;
    c.energy = Math.min(c.energy, 1.2);
    c.a = lerp(c.a, 20, 0.05);
  }
}