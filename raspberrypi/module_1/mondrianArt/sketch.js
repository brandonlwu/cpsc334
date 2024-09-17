
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


let time = 0;

function setup() {
  createCanvas(height, width);
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
  }
  
  if (firstLine < fourthLine) {
    y5 = firstLine*50;
    y5s = firstLine*50;
    y5e = fourthLine*50;
  } else {
    y5 = fourthLine*50;
    y5s = fourthLine*50;
    y5e = firstLine*50;
  }
  
  sixthLine = random([1,2,3])
  
  
  colors = [1, 2, 3];
  shuffledColors = colors.sort((a, b) => 0.5 - Math.random());
  console.log(shuffledColors);
  
  
  y = 0;
  y2 = 450;
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
    rect(firstLine*50, 0, (450-firstLine*50), secondLine*50);
  } else {
    rect(fourthLine*50, 0, (450-fourthLine*50), secondLine*50);
  }
  
  fill(r2,g2,b2);
  
  if (fourthLineEnd == 9) {
    if (fourthLine > firstLine) {
      console.log("here");
      let lowestLine = Math.max(fifthLine, secondLine);
        rect(firstLine*50,lowestLine*50, (fourthLine-firstLine)*50, 450-fifthLine*50);
    } else {
      console.log('h')
      let lowestLine = Math.max(fifthLine, thirdLine);
        rect(fourthLine*50,lowestLine*50, (firstLine-fourthLine)*50, 450-fifthLine*50);
    }
  } else {
    if (secondLineEnd == 0) {
      rect(0,Math.max(thirdLine, secondLine)*50, firstLine*50, 450 - Math.max(thirdLine, secondLine)*50);
    } else {
      rect(0,thirdLine*50, firstLine*50, 450 -thirdLine*50);
    }
  }

  
  fill(r3,g3,b3);
  if (fourthLine < firstLine) {
    if (secondLine < thirdLine && secondLineEnd == 0) {
      rect(0,0, fourthLine*50, secondLine*50);
    } else {
      rect(0,0, fourthLine*50, thirdLine*50);
    }
  } else {
    if (secondLine < thirdLine && secondLineEnd == 0) {
      rect(0,0, firstLine*50, secondLine*50);
    } else {
      rect(0,0, firstLine*50, thirdLine*50);
    }
  }

  
  if (y < 450) {
    y+=5;
  }
  if (y > secondLineEnd*50 && y2 > secondLineEnd*50) {
    y2-=5;
  }
  if (y > 450- firstLine*50 && y3 < firstLine*50) {
    y3+=5;
  }
  if (y > 450 - fourthLineEnd*50 && y4 < fourthLineEnd*50) {
    y4+=5;
  }
  if (y > 450 - (Math.abs(fourthLine-firstLine))*50 && y5s*50 < y5e*50 ) {
    y5s+=5;
  }
  
  if (y > 450 - firstLine*50 && y6 < firstLine*50 ) {
    y6+=5;
  }

  strokeWeight(10);
  stroke(51, 51, 51);
  line(firstLine*50, 0, firstLine*50, y);
  line(y2, secondLine*50, 450, secondLine*50);
  line(0, thirdLine*50, y3, thirdLine*50);
  line(fourthLine*50, 0, fourthLine*50, y4);
  line(y5, fifthLine*50, y5s, fifthLine*50)
  // line(0, sixthLine*50, y6, sixthLine*50)
  
  if (time < 300) {
    time++;
  } else {
    time = 0;
    setup();
  }
  
}
