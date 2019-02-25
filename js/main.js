const bitsArray = [];
const bitsCount = 90;
const projAngle = 60;
const bgAlphaArray = [255, 64, 16, 0];
let stageAngle = 0;
let stageAngleNoise = Math.random() * 1000;
let bgColor = 255;
let bgAlphaNum = 0;
let bgAlpha = bgAlphaArray[bgAlphaNum];
let stageAngleFlag = true;
 
function setup() {
    createCanvas(windowWidth, windowHeight);
    initBits();
    colorMode(HSB, 359, 255, 255, 255);
    noStroke();
}
 
function draw() {
    fill(bgColor, bgAlpha);
    rect(0, 0, width, height);
 
    for (let angle = 0; angle < 360; angle += projAngle) {
        push();
        translate(width / 2, height / 2);
        rotate(radians(stageAngle));
        rotate(radians(angle));
        if (angle % (projAngle * 2) == 0) {
            scale(-1, 1);
        }
        bitsArray.forEach(thisbit => { thisbit.drawMe(); });
        pop();
    }
    bitsArray.forEach(thisbit => { thisbit.updateMe(); });
 
    let stageAngleTrans = noise(stageAngleNoise) - .5;
    if (stageAngleFlag) { stageAngle += stageAngleTrans; }
    stageAngleNoise += .001;
 
    if (random(0, 4096) < 1) { bgAlpha = bgAlphaArray[bgAlphaChange()]; }
}
 
function initBits() {
    for (let i = 0; i < bitsCount; i++) {
        let j = random();
        if (j < .35) {
            bitsArray[i] = new EllipseBit();
        } else if (j >= .35 && j < .75) {
            bitsArray[i] = new TriangleBit();
        } else if (j >= .75 && j < .9) {
            bitsArray[i] = new QuadBit();
        } else if (j >= .9) {
            bitsArray[i] = new StarBit();
        }
    }
}
 
function bgAlphaChange() {
    let j = random();
    if (j < .5) { bgAlphaNum = 0; return 0; }
    else if (j >= .5 && j < .7) { bgAlphaNum = 1; return 1; }
    else if (j >= .7 && j < .9) { bgAlphaNum = 2; return 2; }
    else if (j >= .9) { bgAlphaNum = 3; return 3; }
}
 
function boolPicker(prob) {
    if (random() < prob) { return true; }
    else { return false; }
}
 
function mouseClicked() {
    bgColor = abs(bgColor - 255);
}
 
function keyPressed() {
    if (keyCode === 72) {
        stageAngleFlag = !stageAngleFlag;
    }
    if (keyCode === 32) {
        bgAlphaNum++;
        if (bgAlphaNum > 3) { bgAlphaNum = 0; }
        bgAlpha = bgAlphaArray[bgAlphaNum];
    }
    if (keyCode === 80) {
        saveCanvas();
    }
}
 
class Bit {
    constructor() {
        this.x = random(-width / 2, width / 2);
        this.y = random(-height / 2, height / 2);
        this.xSize = 20;
        this.ySize = 20;
        this.scale = random(1, 4);
        this.col = random(0, 360);
        this.alpha = 92;
        this.weight = random(1, 3);
        this.rot = 0;
        this.rotDif = 0;
        this.noiseRot = random(-1000, 1000);
        this.noiseX = random(-1000, 1000);
        this.noiseY = random(-1000, 1000);
        this.noiseXdif = random(-.01, .01);
        this.noiseYdif = random(-.01, .01);
    }
    updateMe() {
        this.x += noise(this.noiseX) * 2 - 1;
        this.y += noise(this.noiseY) * 2 - 1;
        this.rot += this.rotDif;
        this.noiseX += this.noiseXdif;
        this.noiseY += this.noiseYdif;
        this.rotDif = noise(this.noiseRot) * 4 - 2;
        this.noiseRot += .006
        if (this.x < -width / 1.2 || this.x > width / 1.2) { this.x = -this.x; }
        if (this.y < -height / 1.2 || this.y > height / 1.2) { this.y = -this.y; }
    }
}
 
class EllipseBit extends Bit {
    constructor() {
        super();
        this.shapeFlag = boolPicker(.7);
        this.strokeFlag = boolPicker(.3);
        if (this.shapeFlag) { this.xSize = random(5, 10); this.ySize = random(10, 30); }
    }
    drawMe() {
        push();
        if (this.strokeFlag) { noFill(); stroke(this.col, 192, 255, this.alpha); strokeWeight(this.weight); }
        else { noStroke(); fill(this.col, 192, 255, this.alpha); }
        translate(this.x, this.y);
        rotate(radians(this.rot));
        scale(this.scale);
        ellipse(0, 0, this.xSize, this.ySize);
        pop();
    }
}
 
class TriangleBit extends Bit {
    constructor() {
        super();
        this.strokeFlag = boolPicker(.3);
        this.pAx = random(this.xSize / 5, this.xSize), this.pAy = random(-this.ySize, -this.ySize / 5);
        this.pBx = random(this.xSize / 5, this.xSize), this.pBy = random(this.ySize / 5, this.ySize);
    }
 
    drawMe() {
        push();
        if (this.strokeFlag) { noFill(); stroke(this.col, 192, 255, this.alpha); strokeWeight(this.weight); }
        else { noStroke(); fill(this.col, 192, 255, this.alpha); }
        translate(this.x, this.y);
        rotate(radians(this.rot));
        scale(this.scale);
        triangle(0, 0, this.pAx, this.pAy, this.pBx, this.pBy);
        pop();
    }
}
 
class QuadBit extends Bit {
    constructor() {
        super();
        this.shapeFlag = boolPicker(.5);
        this.strokeFlag = boolPicker(.3);
        this.pAx = random(-this.xSize / 2, this.xSize / 2), this.pAy = random(-this.ySize, 0);
        this.pBx = random(-this.xSize / 2, this.xSize / 2), this.pBy = random(0, this.ySize);
        this.pCx = random(-this.xSize, this.xSize), this.pCy = random(-this.ySize, this.ySize);
        if (!this.shapeFlag) { this.xSize = random(2, 20); this.ySize = random(15, 30); }
    }
 
    drawMe() {
        push();
        if (this.strokeFlag) { noFill(); stroke(this.col, 192, 255, this.alpha); strokeWeight(this.weight); }
        else { noStroke(); fill(this.col, 192, 255, this.alpha); }
        translate(this.x, this.y);
        rotate(radians(this.rot));
        scale(this.scale);
        if (this.shapeFlag) { quad(0, 0, this.pAx, this.pAy, this.pBx, this.pBy, this.pCx, this.pCy); }
        else { rect(0, 0, this.xSize, this.ySize); }
        pop();
    }
}
 
class StarBit extends Bit {
    constructor() {
        super();
        this.strokeFlag = boolPicker(.3);
        this.scale = random(1, 2);
        this.pArray = [];
        for (let i = 0; i < 360; i += 36) {
            let j;
            if (i % 72 != 0) { j = this.xSize; }
            else { j = this.xSize * .36; }
            this.pArray.push(new StarPoints(i, j));
        }
    }
 
    drawMe() {
        push();
        if (this.strokeFlag) { noFill(); stroke(this.col, 192, 255, this.alpha); strokeWeight(this.weight); }
        else { noStroke(); fill(this.col, 192, 255, this.alpha); }
        translate(this.x, this.y);
        rotate(radians(this.rot));
        scale(this.scale);
        beginShape();
        for (let i = 0; i < 10; i++) {
            vertex(this.pArray[i].x, this.pArray[i].y);
        }
        vertex(this.pArray[0].x, this.pArray[0].y);
        endShape();
        pop();
    }
}
 
class StarPoints {
    constructor(ai, jey) {
        this.x = sin(radians(ai)) * jey;
        this.y = cos(radians(ai)) * jey;
    }
}