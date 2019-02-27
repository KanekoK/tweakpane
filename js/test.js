'use strict';

function setup() {
  // frameRate(10);
  createCanvas(windowWidth, windowHeight);
  background(0);
}

let x = 10;
let y = 10;
function draw() {
  translate(width / 2, height / 2);
  let pre_x = x;
  let pre_y = y;
  x += rand(-10, 10);
  y += rand(-10, 10);
  stroke(rand(0, 255), rand(0, 255), rand(0, 255));
  strokeWeight(1);
  line(pre_x, pre_y, x, y);
  console.log(rand(-50, 50));
}

let rand = function (min, max) {
  return Math.random() * (max - min) + min;
};

let randNumber = (timer, range) => {
  setInterval(function(){
    return(rand(range));
  }, timer);
}