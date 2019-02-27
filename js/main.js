'use strict';

const params = {

}

function setup() {
  frameRate(3);
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  // translate(width / 2, height / 2);
  strokeWeight(1);
  noFill();
  stroke(255, 255, 255);
  beginShape();
  for (var i=1; i<5; i++) {
    curveVertex(rand(0, 1500), rand(0, 1500));
  }
  endShape();
}

// 特定の範囲でのランダムな数字を返す
let rand = function (min, max) {
  return Math.random() * (max - min) + min;
};

let randNumber = (timer, range) => {
  setInterval(function(){
    return(rand(range));
  }, timer);
}