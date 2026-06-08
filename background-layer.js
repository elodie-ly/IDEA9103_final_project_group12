// background-layer.js
// This file stores optional random background palettes.
function generateBackgroundPalette() {
  let palettes = [
    {
      top: color(5, 65, 80),
      middle: color(70, 160, 150),
      bottom: color(10, 50, 70),
      glow1: color(255, 200, 80, 45),
      glow2: color(20, 150, 180, 45),
      glow3: color(240, 90, 80, 35),
      glow4: color(230, 240, 255, 35)
    },
    {
      top: color(10, 45, 90),
      middle: color(80, 170, 190),
      bottom: color(20, 70, 80),
      glow1: color(255, 170, 60, 45),
      glow2: color(40, 200, 180, 40),
      glow3: color(210, 70, 90, 35),
      glow4: color(210, 230, 255, 40)
    },
    {
      top: color(20, 70, 55),
      middle: color(120, 170, 120),
      bottom: color(15, 60, 75),
      glow1: color(255, 220, 90, 45),
      glow2: color(50, 160, 130, 45),
      glow3: color(230, 110, 70, 35),
      glow4: color(220, 240, 230, 35)
    },
    {
      top: color(35, 45, 80),
      middle: color(120, 130, 170),
      bottom: color(10, 55, 70),
      glow1: color(250, 190, 100, 45),
      glow2: color(60, 180, 210, 40),
      glow3: color(220, 80, 110, 35),
      glow4: color(235, 235, 255, 35)
    }
  ];

  return random(palettes);
}

function drawOptionalBackgroundPalette(palette) {
  let topColor = palette.top;
  let middleColor = palette.middle;
  let bottomColor = palette.bottom;

  for (let y = 0; y < height; y++) {
    let inter = y / height;

    let c;

    if (inter < 0.5) {
      c = lerpColor(topColor, middleColor, inter * 2);
    } else {
      c = lerpColor(middleColor, bottomColor, (inter - 0.5) * 2);
    }

    stroke(c);
    line(0, y, width, y);
  }

  noStroke();

  fill(palette.glow1);
  ellipse(width * 0.25, height * 0.55, 420, 300);

  fill(palette.glow2);
  ellipse(width * 0.7, height * 0.25, 500, 360);

  fill(palette.glow3);
  ellipse(width * 0.55, height * 0.65, 380, 280);

  fill(palette.glow4);
  ellipse(width * 0.45, height * 0.4, 500, 260);
}