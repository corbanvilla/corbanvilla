# Week 1: Self Portrait

<!-- Post your documentation and code on the class WordPress blog
Your post should contain the following:
    - Your concept
    - A highlight of some code that you’re particularly proud of
    - Embedded sketch
    - Reflection and ideas for future work or improvements 
-->


## Concept

I wanted to create a self-portrait that reflected my at times chaotic attention span, along with my curly hair. I created a relatively simple portrait, but spent a lot of time tweaking the curls and the eyes (that represent my constantly shifting attention).

## Process

Constructing my self-portrait with P5.js was a relatively iterative process, that required bouncing between the provided reference manual and the IDE itself.

<iframe class="w-full" height=600 src="https://editor.p5js.org/corbanvilla/full/iIWq1moi2"></iframe>

**Highlight:** One of my favorite parts of code is how the curls are drawn. While I was considering what approaches may work, I realized that my multi-variable calculus class could come in handy, representing spirals as [parametric equations](https://www.math.fsu.edu/~cstover/teaching/fa16_2312/handouts/parametric/ParamGraphs.pdf). 

```javascript
function drawSpiral(centerX, centerY, scale, strokeThickness) {
  let numPoints = 1000;
  let maxT = 6 * PI;
  let step = maxT / numPoints;

  stroke(0);
  strokeWeight(strokeThickness);

  for (let t = 0; t <= maxT; t += step) {
    let x = scale * sin(t) * t;
    let y = scale * cos(t) * t;
    point(centerX + x, centerY + y);
  }
}
```

**Improvements:** A potential improvement I would like to implement in the future is to randomize the curls in a more organic way, rather than generating uniformly-random points. For instance, they could be generated using my hair semi-circle, with semi-randomly deviations from a perfect line.

## Code

```javascript
let size = 600;
let midX;
let midY;
let curlNums = 30;
let curlSpeeds;
let curlSizes;
let curlThiccs;

function setup() {
  createCanvas(size, size);
  midX = width / 2;
  midY = height / 2;

  curlSpeeds = generateRandomArray(curlNums, -5, 5);
  curlSizes = generateRandomArray(curlNums, 1, 2);
  curlThiccs = generateRandomArray(curlNums, 2, 5);
  curlXs = generateRandomArray(curlNums, 150, 450);
  curlYs = generateRandomArray(curlNums, 75, 200);
}

function generateRandomArray(length, min, max) {
  return Array.from({ length }, () => getRandomInRange(min, max));
}

function getRandomInRange(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function drawSpinningSpiral(
  centerX,
  centerY,
  scale,
  strokeThickness,
  rotationSpeed
) {
  push();
  translate(centerX, centerY);
  rotate(frameCount * rotationSpeed * 0.01);
  drawSpiral(0, 0, scale, strokeThickness);
  pop();
}

function drawSpiral(centerX, centerY, scale, strokeThickness) {
  let numPoints = 1000;
  let maxT = 6 * PI;
  let step = maxT / numPoints;

  stroke(0);
  strokeWeight(strokeThickness);

  for (let t = 0; t <= maxT; t += step) {
    let x = scale * sin(t) * t;
    let y = scale * cos(t) * t;
    point(centerX + x, centerY + y);
  }
}

function draw() {
  background(255);

  // Head
  noStroke();
  fill("#FFD58C");
  let headSize = size * 0.6;
  let headSizeW = headSize * 0.95;
  let headSizeH = headSize * 1.1;
  ellipse(midX, midY, headSizeW, headSizeH);

  // Eyes
  fill(0);
  let eyeSize = headSize * 0.1;

  // Movement
  let xOffset = 5 * cos(frameCount / 10);
  let yOffset = 5 * sin(frameCount / 10);

  // Left Eye -- todo - ovals
  let leftEyeX = midX / 1.2 + xOffset;
  let leftEyeY = midY / 1.2 + yOffset;
  circle(leftEyeX, leftEyeY, eyeSize);

  // Right eye
  let rightEyeX = size - leftEyeX;
  let rightEyeY = leftEyeY;
  circle(rightEyeX, rightEyeY, eyeSize);

  // Eyebrows
  let eyeBrowWidth = eyeSize;
  let eyeBrowHeight = eyeSize * 0.2;
  let eyeBrowThicc = eyeSize * 0.2;
  noFill();
  stroke(0);
  strokeWeight(eyeBrowThicc);

  // Left eyebrow
  let leftEyeBrowX = leftEyeX;
  let leftEyeBrowY = leftEyeY - eyeBrowWidth;
  arc(leftEyeBrowX, leftEyeBrowY, eyeBrowWidth, eyeBrowHeight, PI, 2 * PI);

  // Right eyebrow
  let rightEyeBrowX = rightEyeX;
  let rightEyeBrowY = rightEyeY - eyeBrowWidth;
  arc(rightEyeBrowX, rightEyeBrowY, eyeBrowWidth, eyeBrowHeight, PI, 2 * PI);

  // Nose bar
  let noseHeight = headSize * 0.08;
  let noseTopOffset = headSize * 0.04;
  let noseTopX = midX;
  let noseTopY = midY + noseTopOffset;
  let noseBottomX = midX;
  let noseBottomY = noseTopY + noseHeight;
  let noseThicc = headSize * 0.02;
  strokeWeight(noseThicc);
  line(noseTopX, noseTopY, noseBottomX, noseBottomY);

  // Nose arc
  let noseArcSize = headSize * 0.06;
  let noseArcLeftX = noseBottomX - noseArcSize * 0.5;
  let noseArcLeftY = noseBottomY;
  let noseArcWidth = noseArcSize;
  let noseArcHeight = noseArcSize;
  arc(noseArcLeftX, noseArcLeftY, noseArcWidth, noseArcHeight, 0, PI);

  // Smile arc
  let smileArcSize = headSize * 0.4;
  let smileYOffset = headSize * 0.25;
  let smileArcLeftX = midX;
  let smileArcLeftY = midY + smileYOffset;
  let smileArcWidth = smileArcSize;
  let smileArcHeight = smileArcSize / 2;
  arc(smileArcLeftX, smileArcLeftY, smileArcWidth, smileArcHeight, 0, PI);

  // Hair
  let hairTopX = midX;
  let hairTopY = midY;
  let hairWidth = headSize;
  let hairHeight = headSize / 2;
  let hairThicc = headSize / 10;
  stroke(20);
  strokeWeight(hairThicc);
  arc(hairTopX, hairTopY, headSizeW, headSizeH, 1.1 * PI, 1.9 * PI);

  // Curls
  let curlScale = 2;
  let curlThicc = 7;
  let curlSpeed = 3;
  for (let i = 0; i < curlNums; i++) {
    drawSpinningSpiral(
      curlXs[i],
      curlYs[i],
      curlSizes[i],
      curlThiccs[i],
      curlSpeeds[i]
    );
  }
}
```