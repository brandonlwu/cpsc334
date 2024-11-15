
let scale;
let xScale;
let yScale;

let grids = [1,2,3,4,5,6,7,8]

let firstLine;
let secondLine;
let secondLineEnd;
let thirdLine;
let fourthLine;
let fourthLineStart;
let fourthLineEnd;
let fifthLine;
let sixthLine;
let sixthLineStart;
let sixthLineEnd;
let y;
let y2;
let y3;
let y4;
let y5;
let y5s;
let y5e;
let y6;

let r1, r2, r3;
let g1, g2, g3;
let b1, b2, b3;

let c1;
let c2;
let c3;

let colors;
let shuffledColors;

let speed;

let randrot;

let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  scale = Math.max(windowHeight, windowWidth)/9;
  speed = Math.max(windowWidth,windowHeight)/90;
  xScale = windowWidth/9;
  yScale = windowHeight/9;
  xSpeed = Math.max(windowWidth)/90;
  ySpeed = Math.max(windowHeight)/90;
  randrot = random(10);
  background(255);
  strokeCap(SQUARE);
  firstLine = random(grids);
  secondLine = random(grids);
  secondLineEnd = random([0, firstLine]);
  // secondLineEnd = firstLine;
  
  //determine's half of third line
  if (secondLine <4 ) {
    thirdLine = random([6, 7, 8]);
  } else if (secondLine < 6) {
    thirdLine = random([1,2,7,8]);
  } else  {
    thirdLine = random([1,2,3]);
  }
  
  //determines half of fourth line based off 1st and 3rd
  if (firstLine <4 ) {
    fourthLine = random([6,7, 8]);
    fourthLineEnd = random([9,secondLine]);
  } else if (firstLine < 6) {
    fourthLine = random([1,2,7,8]);
    if (fourthLine < 3) {
      fourthLineEnd = random([9,thirdLine]);
    } else {
      fourthLineEnd = random([9, secondLine]);
    }
  } else  {
    fourthLine = random([1,2,3]);
    fourthLineEnd = random([9,thirdLine]);
  }
  
  if (fourthLineEnd == 9) {
    fifthLine = random(grids.filter(item => item !== thirdLine && item!== secondLine));
  } else {
    fifthLine = -1;
  }
  
  if (firstLine < fourthLine) {
    y5 = firstLine*xScale;
    y5s = firstLine*xScale;
    y5e = fourthLine*xScale;
  } else {
    y5 = fourthLine*xScale;
    y5s = fourthLine*xScale;
    y5e = firstLine*xScale;
  }
  
  sixthLine = random([1,2,3])
  
  
  colors = [1, 2, 3];
  shuffledColors = colors.sort((a, b) => 0.5 - Math.random());
  console.log(shuffledColors);
  
  
  y = 0;
  y2 = windowWidth;
  y3 = 0;
  y4 = 0;
  y6 = 0;
  
  r1 = 0;
  g1 = 0;
  b1 = 0;
  r2 = 0;
  g2 = 0;
  b2 = 0;
  r3 = 0;
  g3 = 0;
  b3 = 0;
}



function draw() {
  fill(255);  
  if (randrot >=7) {
    angleMode(DEGREES);
    rotate(180);
    translate(-windowWidth, -windowHeight)
  }
  switch(shuffledColors[0]) {
    case 1:
      if (r1 < 226) {
        r1+=10;
        g1+=3;
        b1+=2;
        r2+=10;
        g2+=9;
        b2+=3;
        r3+=3;
        g3+=5;
        b3+=7;
      }
      break;
    case 2:
      if (r1 < 247) {
        r1+=10;
        g1+=9;
        b1+=3;
        r2+=3;
        g2+=5;
        b2+=7;
        r3+=10;
        g3+=3;
        b3+=2;
      }
      break;
    case 3:
      if (b1 < 161) {
        r1+=3;
        g1+=5;
        b1+=7;
        r2+=10;
        g2+=3;
        b2+=2;
        r3+=10;
        g3+=9;
        b3+=3;
      }
      break;
  }
  
  strokeWeight(0);
  
  fill(r1,g1,b1);
  if (fourthLine < firstLine) {
    rect(firstLine*xScale, 0, (windowWidth-firstLine*xScale), secondLine*yScale);
  } else {
    rect(fourthLine*xScale, 0, (windowWidth-fourthLine*xScale), secondLine*yScale);
  }
  
  fill(r2,g2,b2);
  
  if (fourthLineEnd == 9) {
    if (fourthLine > firstLine) {
      console.log("here");
      let lowestLine = Math.max(fifthLine, secondLine);
        rect(firstLine*xScale,lowestLine*yScale, (fourthLine-firstLine)*xScale, windowHeight-fifthLine*yScale);
    } else {
      console.log('h')
      let lowestLine = Math.max(fifthLine, thirdLine);
        rect(fourthLine*xScale,lowestLine*yScale, (firstLine-fourthLine)*xScale, windowHeight-fifthLine*yScale);
    }
  } else {
    if (secondLineEnd == 0) {
      rect(0,Math.max(thirdLine, secondLine)*yScale, firstLine*xScale, windowHeight - Math.max(thirdLine, secondLine)*yScale);
    } else {
      rect(0,thirdLine*yScale, firstLine*xScale, windowHeight -thirdLine*yScale);
    }
  }

  
  fill(r3,g3,b3);
  if (fourthLine < firstLine) {
    if (secondLine < thirdLine && secondLineEnd == 0) {
      rect(0,0, fourthLine*xScale, secondLine*yScale);
    } else {
      rect(0,0, fourthLine*xScale, thirdLine*yScale);
    }
  } else {
    if (secondLine < thirdLine && secondLineEnd == 0) {
      rect(0,0, firstLine*xScale, secondLine*yScale);
    } else {
      rect(0,0, firstLine*xScale, thirdLine*yScale);
    }
  }

  
  if (y < windowHeight) {
    y+=ySpeed;
  }
  if (y > secondLineEnd*yScale && y2 > secondLineEnd*xScale) {
    y2-=xSpeed;
  }
  if (y > windowHeight- firstLine*yScale && y3 < firstLine*xScale) {
    y3+=xSpeed;
  }
  if (y > windowHeight - fourthLineEnd*yScale && y4 < fourthLineEnd*yScale) {
    y4+=ySpeed;
  }
  if (y > windowHeight - (Math.abs(fourthLine-firstLine))*yScale && y5s*xScale < y5e*xScale ) {
    y5s+=xSpeed;
  }
  
  if (y > windowHeight - firstLine*scale && y6 < firstLine*scale ) {
    y6+=speed;
  }

  strokeWeight(10);
  stroke(51, 51, 51);
  line(firstLine*xScale, 0, firstLine*xScale, y);
  line(y2, secondLine*yScale, windowWidth, secondLine*yScale);
  line(0, thirdLine*yScale, y3, thirdLine*yScale);
  line(fourthLine*xScale, 0, fourthLine*xScale, y4);
  line(y5, fifthLine*yScale, y5s, fifthLine*yScale);
  // line(0, sixthLine*scale, y6, sixthLine*scale)
  
  if (time < 300) {
    time++;
  } else {
    time = 0;
    setup();
  }  
}