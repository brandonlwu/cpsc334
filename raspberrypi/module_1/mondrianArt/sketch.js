let scale = 50;

let height = 450;
let width = 450;

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

let speed = 5;


let time = 0;

function setup() {
  createCanvas(width, height);
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
    y5 = firstLine*scale;
    y5s = firstLine*scale;
    y5e = fourthLine*scale;
  } else {
    y5 = fourthLine*scale;
    y5s = fourthLine*scale;
    y5e = firstLine*scale;
  }
  
  sixthLine = random([1,2,3])
  
  
  colors = [1, 2, 3];
  shuffledColors = colors.sort((a, b) => 0.5 - Math.random());
  console.log(shuffledColors);
  
  
  y = 0;
  y2 = width;
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
    rect(firstLine*scale, 0, (width-firstLine*scale), secondLine*scale);
  } else {
    rect(fourthLine*scale, 0, (width-fourthLine*scale), secondLine*scale);
  }
  
  fill(r2,g2,b2);
  
  if (fourthLineEnd == 9) {
    if (fourthLine > firstLine) {
      console.log("here");
      let lowestLine = Math.max(fifthLine, secondLine);
        rect(firstLine*scale,lowestLine*scale, (fourthLine-firstLine)*scale, height-fifthLine*scale);
    } else {
      console.log('h')
      let lowestLine = Math.max(fifthLine, thirdLine);
        rect(fourthLine*scale,lowestLine*scale, (firstLine-fourthLine)*scale, height-fifthLine*scale);
    }
  } else {
    if (secondLineEnd == 0) {
      rect(0,Math.max(thirdLine, secondLine)*scale, firstLine*scale, height - Math.max(thirdLine, secondLine)*scale);
    } else {
      rect(0,thirdLine*scale, firstLine*scale, height -thirdLine*scale);
    }
  }

  
  fill(r3,g3,b3);
  if (fourthLine < firstLine) {
    if (secondLine < thirdLine && secondLineEnd == 0) {
      rect(0,0, fourthLine*scale, secondLine*scale);
    } else {
      rect(0,0, fourthLine*scale, thirdLine*scale);
    }
  } else {
    if (secondLine < thirdLine && secondLineEnd == 0) {
      rect(0,0, firstLine*scale, secondLine*scale);
    } else {
      rect(0,0, firstLine*scale, thirdLine*scale);
    }
  }

  
  if (y < height) {
    y+=speed;
  }
  if (y > secondLineEnd*scale && y2 > secondLineEnd*scale) {
    y2-=speed;
  }
  if (y > height- firstLine*scale && y3 < firstLine*scale) {
    y3+=speed;
  }
  if (y > height - fourthLineEnd*scale && y4 < fourthLineEnd*scale) {
    y4+=speed;
  }
  if (y > height - (Math.abs(fourthLine-firstLine))*scale && y5s*scale < y5e*scale ) {
    y5s+=speed;
  }
  
  if (y > height - firstLine*scale && y6 < firstLine*scale ) {
    y6+=speed;
  }

  strokeWeight(10);
  stroke(51, 51, 51);
  line(firstLine*scale, 0, firstLine*scale, y);
  line(y2, secondLine*scale, width, secondLine*scale);
  line(0, thirdLine*scale, y3, thirdLine*scale);
  line(fourthLine*scale, 0, fourthLine*scale, y4);
  line(y5, fifthLine*scale, y5s, fifthLine*scale);
  // line(0, sixthLine*scale, y6, sixthLine*scale)
  
  if (time < 300) {
    time++;
  } else {
    time = 0;
    setup();
  }
  
}