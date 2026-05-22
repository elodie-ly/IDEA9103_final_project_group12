function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  angleMode(DEGREES);
  colorMode(RGB, 255, 255, 255, 255);
}

function draw() {
  background(4, 66, 70);

  let s = min(width, height);
  let ox = (width - s) / 2;
  let oy = (height - s) / 2;

  push();
  translate(ox, oy);
  scale(s / 1024);

  drawBackground();
  drawLargeTransparentCircles();
  drawMainPolygons();
  drawLightBeams();
  drawDarkCircularNodes();
  drawBrightCircles();
  drawFineLines();
  drawSmallDetails();
  drawVignette();

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

// ============================
// 1. Background base
// ============================
function drawBackground() {
  noStroke();

  fill(5, 78, 78, 255);
  rect(0, 0, 1024, 1024);

  blendMode(SCREEN);

  fill(0, 160, 150, 50);
  rect(0, 0, 1024, 1024);

  fill(0, 95, 95, 90);
  polygon([
    [0, 0], [260, 0], [160, 300], [0, 240]
  ]);

  fill(0, 135, 150, 70);
  polygon([
    [690, 0], [1024, 0], [1024, 210], [800, 170]
  ]);

  fill(0, 120, 95, 95);
  polygon([
    [0, 620], [260, 520], [410, 1024], [0, 1024]
  ]);

  fill(0, 70, 85, 120);
  polygon([
    [710, 600], [1024, 500], [1024, 1024], [820, 1024]
  ]);

  blendMode(BLEND);
}

// ============================
// 2. Large transparent circles
// ============================
function drawLargeTransparentCircles() {
  blendMode(SCREEN);
  noStroke();

  circleLayer(300, 90, 250, 0, 190, 205, 85);
  circleLayer(415, 90, 330, 255, 160, 60, 75);
  circleLayer(305, 270, 210, 255, 215, 75, 120);

  circleLayer(790, 100, 195, 250, 230, 95, 120);
  circleLayer(865, 245, 230, 0, 180, 185, 85);
  circleLayer(835, 325, 220, 255, 210, 70, 125);

  circleLayer(160, 370, 260, 190, 235, 255, 125);
  circleLayer(170, 500, 235, 225, 238, 255, 85);

  circleLayer(410, 505, 230, 255, 55, 55, 125);
  circleLayer(500, 630, 255, 255, 170, 45, 80);

  circleLayer(615, 725, 240, 255, 220, 90, 120);
  circleLayer(740, 735, 260, 255, 80, 75, 100);

  circleLayer(120, 845, 220, 255, 170, 55, 95);
  circleLayer(335, 925, 235, 0, 165, 110, 130);
  circleLayer(875, 820, 250, 0, 160, 185, 105);

  circleLayer(75, 600, 145, 120, 215, 160, 70);
  circleLayer(210, 820, 170, 0, 130, 160, 65);
  circleLayer(940, 735, 170, 255, 80, 75, 70);

  blendMode(BLEND);
}

// ============================
// 3. Main polygon layers
// ============================
function drawMainPolygons() {
  blendMode(SCREEN);
  noStroke();

  fill(0, 220, 215, 95);
  polygon([
    [40, 160], [210, 70], [360, 250], [120, 320]
  ]);

  fill(20, 210, 220, 70);
  polygon([
    [220, 0], [565, 0], [460, 310], [260, 250]
  ]);

  fill(255, 160, 65, 95);
  polygon([
    [245, 210], [545, 235], [520, 400], [270, 355]
  ]);

  fill(255, 60, 60, 110);
  polygon([
    [340, 350], [565, 300], [520, 610], [270, 555]
  ]);

  fill(230, 235, 255, 95);
  polygon([
    [520, 260], [720, 330], [630, 530]
  ]);

  fill(255, 230, 120, 90);
  polygon([
    [650, 245], [925, 180], [880, 435], [700, 410]
  ]);

  fill(255, 110, 80, 80);
  polygon([
    [750, 300], [1024, 330], [1010, 620], [820, 515]
  ]);

  fill(210, 225, 255, 105);
  polygon([
    [640, 545], [860, 480], [780, 745], [600, 710]
  ]);

  fill(255, 135, 60, 90);
  polygon([
    [250, 620], [470, 620], [510, 800], [220, 760]
  ]);

  fill(0, 185, 165, 95);
  polygon([
    [600, 660], [760, 790], [575, 945], [480, 780]
  ]);

  fill(248, 70, 65, 82);
  polygon([
    [700, 760], [940, 710], [1024, 1024], [770, 1024]
  ]);

  fill(0, 140, 155, 80);
  polygon([
    [40, 725], [230, 680], [190, 1024], [0, 1024]
  ]);

  fill(255, 235, 160, 75);
  polygon([
    [55, 330], [300, 350], [210, 470], [0, 420]
  ]);

  fill(150, 225, 255, 75);
  polygon([
    [120, 350], [360, 410], [250, 610], [0, 560]
  ]);

  fill(255, 95, 65, 75);
  polygon([
    [390, 420], [690, 410], [650, 620], [430, 610]
  ]);

  fill(90, 210, 220, 65);
  polygon([
    [755, 75], [1024, 120], [930, 300], [720, 250]
  ]);

  fill(255, 225, 110, 65);
  polygon([
    [555, 710], [785, 650], [700, 900], [510, 845]
  ]);

  blendMode(BLEND);
}

// ============================
// 4. Light beams
// ============================
function drawLightBeams() {
  blendMode(SCREEN);
  noStroke();

  beam(62, 346, 250, 300, 310, 380, 255, 180, 35, 135);
  beam(62, 346, 250, 315, 300, 420, 255, 240, 150, 80);

  beam(170, 392, 20, 346, 300, 350, 220, 235, 255, 120);
  beam(170, 392, 52, 230, 200, 545, 190, 225, 255, 85);

  beam(480, 342, 380, 560, 580, 525, 255, 220, 110, 110);
  beam(480, 342, 515, 140, 430, 520, 255, 205, 75, 95);

  beam(650, 285, 760, 350, 820, 420, 255, 210, 95, 105);
  beam(650, 285, 760, 220, 830, 275, 210, 230, 255, 95);

  beam(850, 310, 990, 250, 945, 380, 255, 230, 110, 125);
  beam(850, 310, 955, 530, 790, 470, 255, 185, 95, 85);

  beam(620, 660, 740, 775, 590, 820, 250, 225, 95, 110);
  beam(805, 632, 915, 860, 780, 760, 160, 230, 255, 95);

  beam(110, 800, 310, 740, 260, 900, 255, 170, 55, 95);
  beam(390, 865, 560, 845, 455, 1010, 35, 200, 160, 110);

  beam(720, 780, 600, 1024, 820, 1024, 255, 90, 65, 80);
  beam(135, 80, 370, 60, 315, 120, 0, 220, 220, 75);
  beam(745, 65, 930, 20, 865, 170, 255, 230, 115, 70);

  blendMode(BLEND);
}

// ============================
// 5. Dark circular nodes
// ============================
function drawDarkCircularNodes() {
  blendMode(BLEND);

  darkNode(58, 106, 46);
  darkNode(472, 38, 43);
  darkNode(472, 345, 62);
  darkNode(670, 277, 62);
  darkNode(915, 140, 105);
  darkNode(1004, 328, 44);
  darkNode(836, 632, 50);
  darkNode(164, 928, 70);
  darkNode(555, 507, 36);
  darkNode(785, 792, 25);
  darkNode(315, 765, 42);
  darkNode(895, 780, 35);
  darkNode(355, 735, 28);
  darkNode(980, 225, 38);
  darkNode(150, 630, 35);
}

// ============================
// 6. Bright circles
// ============================
function drawBrightCircles() {
  blendMode(SCREEN);
  noStroke();

  circleLayer(398, 505, 110, 255, 55, 55, 185);
  circleLayer(616, 163, 82, 225, 230, 255, 185);
  circleLayer(300, 251, 120, 255, 220, 95, 145);
  circleLayer(58, 346, 84, 255, 180, 40, 145);
  circleLayer(670, 665, 50, 250, 245, 195, 150);
  circleLayer(530, 899, 78, 145, 230, 200, 120);
  circleLayer(355, 890, 45, 205, 240, 255, 145);

  circleLayer(635, 610, 45, 0, 205, 195, 130);
  circleLayer(858, 740, 52, 0, 195, 190, 110);
  circleLayer(136, 618, 80, 160, 230, 205, 105);
  circleLayer(95, 450, 55, 30, 200, 200, 95);

  circleLayer(760, 355, 95, 255, 220, 145, 95);
  circleLayer(720, 110, 110, 245, 230, 120, 80);
  circleLayer(870, 95, 120, 255, 240, 150, 75);

  blendMode(BLEND);
}

// ============================
// 7. Fine lines
// ============================
function drawFineLines() {
  blendMode(SCREEN);

  glowLine(65, 345, 230, 360, 255, 238, 165, 160, 5);
  glowLine(90, 800, 260, 720, 255, 164, 53, 150, 4);
  glowLine(456, 345, 540, 310, 255, 223, 95, 130, 5);
  glowLine(530, 890, 510, 770, 255, 78, 69, 130, 5);
  glowLine(625, 280, 745, 355, 255, 235, 145, 120, 5);
  glowLine(800, 635, 855, 780, 190, 230, 255, 135, 5);
  glowLine(850, 310, 980, 260, 248, 223, 96, 130, 5);
  glowLine(170, 390, 265, 195, 180, 225, 255, 110, 6);

  glowLine(520, 38, 590, 15, 255, 86, 60, 90, 2);
  glowLine(815, 140, 760, 300, 255, 83, 62, 90, 2);
  glowLine(425, 720, 552, 702, 255, 214, 80, 120, 4);
  glowLine(645, 750, 700, 900, 255, 245, 140, 110, 3);
  glowLine(230, 825, 325, 730, 255, 108, 64, 120, 3);

  glowLine(30, 90, 200, 10, 0, 200, 210, 80, 4);
  glowLine(720, 900, 875, 1010, 255, 80, 70, 80, 3);
  glowLine(910, 655, 1024, 600, 0, 190, 210, 90, 3);
  glowLine(120, 500, 20, 620, 180, 230, 255, 80, 3);

  blendMode(BLEND);
}

// ============================
// 8. Small details
// ============================
function drawSmallDetails() {
  blendMode(SCREEN);
  noStroke();

  circleLayer(165, 200, 17, 0, 180, 205, 120);
  circleLayer(545, 284, 12, 250, 245, 210, 140);
  circleLayer(180, 880, 18, 255, 190, 98, 120);
  circleLayer(865, 856, 30, 195, 230, 255, 135);
  circleLayer(132, 631, 21, 225, 245, 255, 95);
  circleLayer(32, 450, 12, 145, 210, 80, 85);
  circleLayer(537, 582, 12, 225, 230, 255, 120);
  circleLayer(735, 98, 14, 0, 125, 135, 120);
  circleLayer(735, 960, 28, 0, 210, 183, 110);

  circleLayer(980, 410, 16, 255, 65, 60, 120);
  circleLayer(420, 760, 20, 255, 220, 100, 100);
  circleLayer(620, 830, 18, 255, 230, 160, 100);
  circleLayer(80, 940, 16, 255, 180, 55, 90);
  circleLayer(250, 145, 18, 230, 240, 255, 100);

  blendMode(BLEND);
}

// ============================
// 9. Vignette
// ============================
function drawVignette() {
  blendMode(MULTIPLY);
  noFill();

  for (let r = 600; r < 1250; r += 45) {
    stroke(0, 30, 35, 13);
    strokeWeight(48);
    ellipse(512, 512, r, r);
  }

  blendMode(BLEND);
}

// ============================
// Helper functions
// ============================
function polygon(points) {
  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i][0], points[i][1]);
  }
  endShape(CLOSE);
}

function circleLayer(x, y, d, r, g, b, a) {
  fill(r, g, b, a);
  ellipse(x, y, d, d);
}

function beam(x1, y1, x2, y2, x3, y3, r, g, b, a) {
  fill(r, g, b, a);
  triangle(x1, y1, x2, y2, x3, y3);
}

function darkNode(x, y, d) {
  noStroke();

  fill(0, 42, 46, 170);
  ellipse(x, y, d, d);

  fill(0, 20, 25, 110);
  ellipse(x, y, d * 0.55, d * 0.55);

  fill(255, 255, 255, 18);
  ellipse(x - d * 0.18, y - d * 0.18, d * 0.18, d * 0.18);
}

function glowLine(x1, y1, x2, y2, r, g, b, a, w) {
  stroke(r, g, b, a);
  strokeWeight(w);
  line(x1, y1, x2, y2);
}