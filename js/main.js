'use strict';

const params = {
  width: 100,
  height: 100,
  depth: 100,
  backgroundColor: '#f00',
  canRotate: true,
}

function setup() {
  createCanvas(600, 400, WEBGL);

  const pane = new Tweakpane({
    title: 'Parameters',
  });
  const sizeFolder = pane.addFolder({
    title: 'Size',
  });
  sizeFolder.addInput(params, 'width', {
    min: 0,
    max: 200,
  });
  sizeFolder.addButton({
    title: 'Randomize width',
  }).on('click', () => {
    params.width = Math.random() * 100;
    pane.refresh();
  });
  sizeFolder.addInput(params, 'height', {
    step: 10,
    min: 0,
    max: 200,
  });
  sizeFolder.addInput(params, 'depth', {
    options: {
      small: 50,
      medium: 100,
      large: 200,
    }
  });
  pane.addSeparator();
  pane.addInput(params, 'backgroundColor');
  pane.addInput(params, 'canRotate');
  pane.addButton({
    title: 'Export',
  }).on('click', () => {
    const results = pane.exportPreset();
    console.log(JSON.stringify(results, null, 2));
  });
}

function draw() {
  background(color(params.backgroundColor));
  if (params.canRotate) {
    rotateX(frameCount * 0.01)
    rotateY(frameCount * 0.01)
  }
  noFill(); // 塗りの設定
  stroke(255);
  box(params.width, params.height, params.depth);
}