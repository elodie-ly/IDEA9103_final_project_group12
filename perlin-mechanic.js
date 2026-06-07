// perlin-mechanic.js
// Owner: Hanwen Cui
// Mechanic: Perlin noise and randomness
// This mechanic creates floating CUDA-inspired geometric shapes using random values and Perlin noise.

let perlinShapes = [];
let perlinSeed;
let numberOfPerlinShapes = 70;

function initPerlinMechanic() {
  perlinShapes = [];


  perlinSeed = floor(random(100000));

  randomSeed(perlinSeed);
  noiseSeed(perlinSeed);

  console.log("Perlin mechanic initialized with seed:", perlinSeed);
}


function updatePerlinMechanic() {
}


function drawPerlinMechanic() {
}

function resetPerlinMechanic() {
  initPerlinMechanic();
}