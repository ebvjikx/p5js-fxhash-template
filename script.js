const e = Math.min(innerWidth, innerHeight);
const canvas = {};
canvas.w = e;
canvas.h = e;
const mm = e * 0.001;

const isMob = /Android|webOS|iPhone|iPad|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

function preload() {
  const seed = Math.round($fx.rand() * 2e9);
  randomSeed(seed);
}

function setup() {
  createCanvas(canvas.w, canvas.h);

  isMob ? pixelDensity(1) : pixelDensity(min(window.devicePixelRatio), 2);

  // if the algorithm is animated, set the frame-rate
  //frameRate(20);

  //display hash in console
  console.log("fxhash:", $fx.hash);

  // uncomment if sketch is not animated
  //noLoop();
}

function draw() {
  // draw code goes here

  // call fxpreview when output is rendered
  $fx.preview();
}

// function to save an output with filename as hash
function keyTyped() {
  if (keyCode === 83) {
    save($fx.hash);
  }
  return false; // prevent any unwanted default browser behaviour
}
