let warmPalette;
let coolPalette;
let lightPalette;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  angleMode(DEGREES);
  noLoop();
  noStroke();

  // 固定随机种子，让每次画面保持一致
  randomSeed(18);

  warmPalette = [
    color(255, 90, 35, 90),
    color(255, 140, 40, 80),
    color(255, 190, 60, 80),
    color(230, 45, 50, 70),
    color(255, 220, 90, 70)
  ];

  coolPalette = [
    color(0, 120, 150, 70),
    color(0, 160, 170, 65),
    color(20, 90, 120, 70),
    color(10, 60, 90, 75),
    color(30, 140, 130, 60),
    color(0, 80, 110, 70)
  ];

  lightPalette = [
    color(220, 240, 255, 70),
    color(180, 220, 255, 60),
    color(255, 245, 210, 65),
    color(255, 210, 170, 55)
  ];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  randomSeed(18); // 保持随机元素位置一致
  redraw();

}

function draw() {
  drawBackground();
  drawLargeColourFields();
  drawTransparentGeometry();
  drawCircleDiscs();
  drawLightBeams();
  drawSmallDetails();
  drawTexture();
  //drawVignette();
}

// 深色青蓝背景
function drawBackground() {
  background(7, 38, 48);

  for (let i = 0; i < 220; i++) {
    let c = random(coolPalette);
    fill(red(c), green(c), blue(c), random(15, 45));

    let x = random(width);
    let y = random(height);
    let s = random(120, 420);

    ellipse(x, y, s, s);
  }
}

// 大面积暖色和冷色区域
function drawLargeColourFields() {
  push();
  blendMode(SCREEN);

  // 左下和中部偏暖
  for (let i = 0; i < 26; i++) {
    let c = random(warmPalette);
    fill(red(c), green(c), blue(c), random(35, 80));

    let x = random(-150, width * 0.65);
    let y = random(height * 0.25, height + 120);
    let w = random(180, 520);
    let h = random(120, 420);

    push();
    translate(x, y);
    rotate(random(-45, 45));
    rect(0, 0, w, h);
    pop();
  }

  // 右侧和上方偏冷
  for (let i = 0; i < 36; i++) {
    let c = random(coolPalette);
    fill(red(c), green(c), blue(c), random(35, 75));

    let x = random(width * 0.2, width + 80);
    let y = random(-80, height);
    let w = random(160, 460);
    let h = random(120, 380);

    push();
    translate(x, y);
    rotate(random(-60, 60));
    rect(0, 0, w, h);
    pop();
  }

  pop();
}

// 半透明三角形、四边形，制造参考图中的抽象层次
function drawTransparentGeometry() {
  push();
  blendMode(SCREEN);

  for (let i = 0; i < 90; i++) {
    let paletteChoice = random() < 0.55 ? coolPalette : warmPalette;
    let c = random(paletteChoice);

    fill(red(c), green(c), blue(c), random(25, 70));

    let x = random(width);
    let y = random(height);
    let s = random(70, 260);

    push();
    translate(x, y);
    rotate(random(360));

    if (random() < 0.65) {
      triangle(
        0, -s * random(0.2, 0.8),
        s * random(0.5, 1.2), s * random(0.2, 0.8),
        -s * random(0.5, 1.2), s * random(0.2, 0.8)
      );
    } else {
      beginShape();
      vertex(random(-s, s), random(-s, s));
      vertex(random(-s, s), random(-s, s));
      vertex(random(-s, s), random(-s, s));
      vertex(random(-s, s), random(-s, s));
      endShape(CLOSE);
    }

    pop();
  }

  pop();
}

// 画大量圆形光盘
function drawCircleDiscs() {
  push();
  blendMode(SCREEN);

  for (let i = 0; i < 55; i++) {
    let c;

    if (random() < 0.45) {
      c = random(coolPalette);
    } else if (random() < 0.8) {
      c = random(warmPalette);
    } else {
      c = random(lightPalette);
    }

    let x = random(width);
    let y = random(height);
    let r = random(25, 150);

    drawDisc(x, y, r, c);
  }

  // 几个主要大圆，模拟参考图中的视觉焦点
  drawDisc(width * 0.5, height * 0.9, 135, color(0, 175, 230, 110));
  drawDisc(width * 0.8, height * 0.8, 125, color(255, 210, 70, 100));
  drawDisc(width * 0.6, height * 0.5, 75, color(255, 170, 45, 90));
  drawDisc(width * 0.7, height * 0.8, 100, color(0, 120, 150, 90));
  drawDisc(width * 0.8, height * 0.9, 65, color(255, 100, 40, 90));

  pop();
}

// 带有放射渐变感觉的圆
function drawDisc(x, y, r, c) {
  push();
  translate(x, y);

  fill(red(c), green(c), blue(c), alpha(c));
  ellipse(0, 0, r * 2, r * 2);

  // 圆内扇形分割，接近图中“光盘”的感觉
  for (let a = 0; a < 360; a += random(25, 55)) {
    fill(255, 255, 255, random(6, 20));
    arc(0, 0, r * 2, r * 2, a, a + random(10, 35), PIE);
  }

  // 中心暗点
  fill(0, 40, 55, 100);
  ellipse(0, 0, r * 0.16, r * 0.16);

  // 中心亮点
  fill(255, 230, 180, 130);
  ellipse(0, 0, r * 0.05, r * 0.05);

  pop();
}

// 光束、长条形、连接线
function drawLightBeams() {
  push();
  blendMode(SCREEN);

  for (let i = 0; i < 38; i++) {
    let x = random(width);
    let y = random(height);
    let length = random(120, 520);
    let thickness = random(15, 65);

    let c = random() < 0.55 ? random(warmPalette) : random(lightPalette);
    fill(red(c), green(c), blue(c), random(35, 85));

    push();
    translate(x, y);
    rotate(random(360));

    beginShape();
    vertex(0, -thickness * 0.25);
    vertex(length, -thickness);
    vertex(length * 1.05, thickness);
    vertex(0, thickness * 0.25);
    endShape(CLOSE);

    pop();
  }

  // 细连接线
  strokeWeight(2);
  for (let i = 0; i < 45; i++) {
    let c = random(warmPalette);
    stroke(red(c), green(c), blue(c), random(45, 100));

    let x1 = random(width);
    let y1 = random(height);
    let x2 = x1 + random(-250, 250);
    let y2 = y1 + random(-250, 250);

    line(x1, y1, x2, y2);
  }

  noStroke();
  pop();
}

// 小点、小圆、小三角，增加画面复杂度
function drawSmallDetails() {
  push();
  blendMode(SCREEN);

  for (let i = 0; i < 180; i++) {
    let c = random() < 0.5 ? random(warmPalette) : random(coolPalette);
    fill(red(c), green(c), blue(c), random(60, 130));

    let x = random(width);
    let y = random(height);
    let s = random(3, 14);

    if (random() < 0.75) {
      ellipse(x, y, s, s);
    } else {
      push();
      translate(x, y);
      rotate(random(360));
      triangle(0, -s, s, s, -s, s);
      pop();
    }
  }

  pop();
}

// 轻微颗粒纹理，使画面更像数字绘画
function drawTexture() {
  loadPixels();

  for (let i = 0; i < pixels.length; i += 4) {
    let noiseAmount = random(-12, 12);

    pixels[i] += noiseAmount;
    pixels[i + 1] += noiseAmount;
    pixels[i + 2] += noiseAmount;
  }

  updatePixels();
}

// 暗角，让中心更亮，边缘更深
function drawVignette() {
  push();
  noFill();

  // 只压暗边缘，不压暗中心
  for (let i = 0; i < 120; i++) {
    let alphaValue = map(i, 0, 120, 0, 8);
    stroke(0, 15, 20, alphaValue);
    strokeWeight(8);
    rect(i, i, width - i * 2, height - i * 2);
  }

  pop();
}