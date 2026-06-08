function generateRandomShapes(amount) {
  let shapes = [];

  for (let i = 0; i < amount; i++) {
    let shape = {
      type: random(['circle', 'rect', 'triangle', 'line']),

      x: random(width),
      y: random(height),

      size: random(20, 260),
      w: random(30, 260),
      h: random(20, 220),

      angle: random(360),

      // Pick colours inspired by CUDA reference images
      col: getRandomPaletteColor(),

      // Different transparency levels
      alpha: random(25, 110),

      // Some lines need different length and thickness
      lineLength: random(60, 300),
      lineWeight: random(1, 6)
    };

    shapes.push(shape);
  }

  return shapes;
}

function drawRandomShapes(shapes) {
  noStroke();

  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];

    push();

    translate(s.x, s.y);
    rotate(s.angle);

    fill(red(s.col), green(s.col), blue(s.col), s.alpha);
    stroke(red(s.col), green(s.col), blue(s.col), s.alpha);

    if (s.type === 'circle') {
      drawCircleShape(s);
    } 
    else if (s.type === 'rect') {
      drawRectShape(s);
    } 
    else if (s.type === 'triangle') {
      drawTriangleShape(s);
    } 
    else if (s.type === 'line') {
      drawLineShape(s);
    }

    pop();
  }
}


function drawCircleShape(s) {
  noStroke();
  ellipse(0, 0, s.size, s.size);
}


function drawRectShape(s) {
  noStroke();
  rectMode(CENTER);
  rect(0, 0, s.w, s.h);
}


function drawTriangleShape(s) {
  noStroke();

  let r = s.size / 2;

  triangle(
    -r, r,
    0, -r,
    r, r
  );
}


function drawLineShape(s) {
  noFill();
  strokeWeight(s.lineWeight);

  line(
    -s.lineLength / 2,
    0,
    s.lineLength / 2,
    0
  );
}


function getRandomPaletteColor() {
  let palette = [
    color(15, 110, 120),    // deep teal
    color(20, 150, 170),    // blue green
    color(50, 190, 180),    // bright cyan green
    color(240, 190, 70),    // warm yellow
    color(245, 130, 60),    // orange
    color(220, 60, 65),     // red
    color(230, 235, 255),   // pale blue white
    color(60, 70, 95),      // dark blue grey
    color(25, 90, 75)       // dark green
  ];

  return random(palette);
}