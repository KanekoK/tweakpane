'use strict';

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
}

let x;
let y;
function draw() {
  background(0);
  stroke(255);
  strokeWeight(10);
  line(x, y, x, y);
  x = rand(1000, 1000);
  y = rand(1000, 1000);
}

let rand = function (range) {
  return(Math.random() * range);
};

let randNumber = (timer, range) => {
  setInterval(function(){
    return(rand(range));
  }, timer);
}

