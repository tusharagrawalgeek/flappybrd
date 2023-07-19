// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
function reload(){
  
}
class Bird {
  constructor() {
    this.i;
    this.j;
    this.rad = 65;
  }
  // i:
  // let rad=65;
}

class Obstacle {
  constructor() {
    this.x;
    this.y;
    this.h;
    this.w = 100;
  }
  // let x,y;
  // let w=100,h;
}

let brd;
let gap = 180; //gap bwn upobs and downobs
let n = 5000; //no  of obstacles
let upobs =[];
let downobs =[];
let minHeightOfObs = 150; //min height of an obs
let d = 350; //distance between obstacles
let gamespeed = 7;
let bird = new Bird();
let vel = 0, acc=10;
let scaleZoom = 400; //10pixel=1m
let time = 0;
let died = false;
let limit = 10,//increase hardness after this time
  count = 0; 
let started = false;
let btn;
function setup() {
  brd = loadImage('bird.png');
  btn=createCanvas(1200, 800);  
  btn.mousePressed(touched);
  // btn=createButton("Click");
  // btn.mouseClicked(touched);
  bird.i = 200;
  bird.j = 100;
  for (let i = 0; i < n; i++) {
    upobs.push(new Obstacle());
    upobs[i].x = i == 0 ? 1200 : upobs[i - 1].x + upobs[i].w + d;
    //prlet(upobs[i].x+" ");
    upobs[i].y = 0;
    upobs[i].h = random(minHeightOfObs, height - minHeightOfObs - gap);
    downobs.push(new Obstacle());
    downobs[i] = new Obstacle();
    downobs[i].x = upobs[i].x;
    //prlet(upobs[i].x+" ");
    downobs[i].y = upobs[i].h + gap;
    downobs[i].h = height;
  }
  // frameRate(60);
}

function draw() {
//  setFrameRate(60);

  if (started) {
    if (!died) {
      
      time += 0.0167;
      background(color(50, 200, 200));
      frameRate(60);
      text(getFrameRate().toFixed(0),0,50);
      makebird();
      fallbird();
      makeObstacles();
      moveObstacles();
      makeExtras();
    }
    if (died) {
      gameover();
    }
    strokeWeight(2);
    stroke(255);
    diedfunc();
    if (time > count) {
      harder();
      count += limit;
    }
    checkletersects();
    textSize(50);
    fill(0);
  } else {
    background(color(50, 200, 200));
    makebird();
    makeExtras();
    makeObstacles();
    textSize(50);
    fill(255);
    text("Press SPACE or touch the screen", 200, height / 2);
  }
}
function checkletersects() {
  for (let i = 0; i < n; i++) {
    let x1 = upobs[i].x,
      y1 = upobs[i].y + upobs[i].h,
      x2 = upobs[i].x + upobs[i].w,
      y2 = upobs[i].y;
    let xn = Math.max(x1, Math.min(bird.i, x2));
    let yn = Math.min(y1, Math.max(bird.j, y2));
    stroke(color(255, 0, 0));
    // strokeWeight(30);
    //polet(xn,yn);

    let x11 = downobs[i].x,
      y11 = downobs[i].y + downobs[i].h,
      x21 = downobs[i].x + downobs[i].w,
      y21 = downobs[i].y;
    let xn1 = Math.max(x11, Math.min(bird.i, x21));
    let yn1 = Math.min(y11, Math.max(bird.j, y21));
    stroke(color(255, 0, 0));
    // strokeWeight(30);
    //polet(xn1,yn1);

    if (
      Math.sqrt(Math.pow(bird.i - xn, 2) + Math.pow(bird.j - yn, 2)) + 3 <
      bird.rad / 2
    ) {
      died = true;
      break;
    }
    if (
      Math.sqrt(Math.pow(bird.i - xn1, 2) + Math.pow(bird.j - yn1, 2)) + 3 <
      bird.rad / 2
    ) {
      died = true;
      break;
    }
  }
}
function harder() {
  gamespeed += 0.5;
}
function makeExtras() {
  fill(color(220, 200, 0));
  rect(0, height - 30, width, 30);
}
function makeObstacles() {
  stroke(0);
  strokeWeight(4);
  fill(color(0, 200, 0));
  for (let i = 0; i < n; i++) {
    rect(upobs[i].x, upobs[i].y, upobs[i].w, upobs[i].h);
    rect(downobs[i].x, downobs[i].y, downobs[i].w, downobs[i].h);
  }
}
function moveObstacles() {
  for (let i = 0; i < n; i++) {
    upobs[i].x -= gamespeed;
    downobs[i].x -= gamespeed;
  }
}
function gameover() {
  fill(color(200, 0, 0));

  //strokeWeight(100);
  textSize(40);
textStyle("light");
  text("Score : " + Math.floor(time * 100) / 100.0 + "s", 470, height / 2-100);
  text("Press SPACE or touch screen", 350, height / 2 + 80-100);
  fill(255);
}
function diedfunc() {
  if (bird.j+bird.rad/2 > height) {
    died = true;
  }
}
function makebird() {
  fill(255);
  image(brd, bird.i - bird.rad / 2, bird.j - bird.rad / 2);
  // circle(bird.i,bird.j,bird.rad);
}
function fallbird() {
  let v = vel + acc * 0.0167;
  bird.j += ((v * v - vel * vel) / (2 * acc)) * scaleZoom;
  //prlet((v*v-vel*vel)/(2*acc)+" ");
  vel = v;
}
function jump() {
  vel = -1.8;
}
function reset() {
  bird.i = 200;
  bird.j = 100;
  gamespeed = 4;
  vel = 0;
  for (let i = 0; i < n; i++) {
    upobs[i] = new Obstacle();
    upobs[i].x = i == 0 ? 1200 : upobs[i - 1].x + upobs[i].w + d;
    //prlet(upobs[i].x+" ");
    upobs[i].y = 0;
    upobs[i].h = random(minHeightOfObs, height - minHeightOfObs - gap);

    downobs[i] = new Obstacle();
    downobs[i].x = upobs[i].x;
    //prlet(upobs[i].x+" ");
    downobs[i].y = upobs[i].h + gap;
    downobs[i].h = height;
  }
}
function keyPressed() {
  if (key === " ") {
    if (!started) {
      started = true;
    } else if (died) {
      died = false;
      reset();
    } else jump();
  }
  // if (key === "d") died = true;
}
function touched(){
  if(!started){
    started=true;
  }else if(died){
    died=false;
    reset();
  }else jump();
}


