// fxhash-p5-template

// e is the minimum edge of the viewport. e can be hard-coded as a size in pixels if preferred e.g. const e = 2000;
// canvas is an object that holds all size-related parameters.
// for a square canvas, setting width and height to e
// multiply sizes of shapes in your script by mm (think millimetres) to keep your script size-agnostic

const e = Math.min(innerWidth, innerHeight);
const canvas = {};
canvas.w = e;
canvas.h = e;
const mm = e * 0.001;
let tlim;

// useful test to determine if code is running on a mobile device. You can use this to e.g. de-activate shaders
// or grain so the code is more light-weight and runs more smoothly on mobile devices
const isMob = /Android|webOS|iPhone|iPad|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

function preload() {
  // seed random and perlin noise functions with fxrand() - needed to make your script deterministic
  // you can now use random() and noise() in the script
  randomSeed(Math.round($fx.rand() * 2e9));
}

function setup() {
  // create a canvas - leave as-is for a 2D canvas or add WEBGL for a 3D WebGL enabled canvas.
  createCanvas(canvas.w, canvas.h);

  // if we are on a mobile device, limit pixel ratio to 1
  // otherwise set the pixel ratio to either 2 or the native pixel ratio, whichever is lowest
  isMob ? pixelDensity(1) : pixelDensity(min(window.devicePixelRatio), 2);

  // if the algorithm is animated, set the frame-rate
  frameRate(20);

  // I like to display the fxhash token in case it proves useful in getting back to a particular output
  // call noLoop() if your code is not animated to stop draw() from running on a loop
  console.log("fxhash:", $fx.hash);
  //noLoop();

  angleMode(DEGREES);
  background(random(255));

  tlim = random(0.5, 1);
}

function draw() {
  // draw code goes here
  drawShape(random(200) * mm, random(360), random(360 * 2), random(75) * mm);

  if (round(millis() / 1000) >= tlim) {
    noLoop();
    $fx.preview();
  }
  // call fxpreview once, when you are satisfied that the output is rendered and you are happy for fxhash
  // to take a snapshot of the output to generate the token's preview
}

// function to save an output, with a the unique hash as the filename (so you can always come back to it),
// when the user presses 's' (upper or lower-case)
function keyTyped() {
  if (keyCode === 83) {
    save($fx.hash);
  }
  return false; // prevent any unwanted default browser behaviour
}

function drawShape(r, angleBegin, angleEnd, size) {
  x = width / 2 + r * cos(angleBegin);
  y = height / 2 + r * sin(angleBegin);

  x_5 = width / 2 + (r + r / 2) * cos((angleBegin + angleEnd) / 2);
  y_5 = height / 2 + (r + r / 2) * sin((angleBegin + angleEnd) / 2);

  x1 = width / 2 + r * cos(angleEnd);
  y1 = height / 2 + r * sin(angleEnd);

  m = width / 2 + (r + size) * cos(angleBegin);
  n = height / 2 + (r + size) * sin(angleBegin);

  m_5 = width / 2 + (r * 2 + size) * cos((angleBegin + angleEnd) / 2);
  n_5 = height / 2 + (r * 2 + size) * sin((angleBegin + angleEnd) / 2);

  m1 = width / 2 + (r + size) * cos(angleEnd);
  n1 = height / 2 + (r + size) * sin(angleEnd);

  z = random(255);
  g = random(255);
  b = random(255);

  fill(z, g, b, random(155));
  noStroke();

  beginShape();
  vertex(x, y);
  bezierVertex(x, y, x_5, y_5, x1, y1);
  vertex(x1, y1);
  vertex(m1, n1);
  bezierVertex(m1, n1, m_5, n_5, m, n);
  vertex(m, n);
  endShape(CLOSE);
}
