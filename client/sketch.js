//Vars to declare (might be in a key)
let cloudx;
let cloudy;

let isShark;
let sharkSpeed;
let sharkX = 400;


let bottles = [{id:1},{id:2},{id:3}] //list of bottles with id







//island name
let islandName;

//island colour (rgb)
let islandColour;

//islands = ls of islands 
let islands; 


let myFont;
function preload() {
  myFont = loadFont('assets/upheavtt.ttf');
  shark = loadImage('assets/sharkfin.png');
  bottle = loadImage('assets/bottle.png')
}








function setup() {
  createCanvas(windowWidth, windowHeight);
  
  isShark = true
  sharkSpeed = 0.3
  islandName = "Durham"
  
  cloudx = 100;
  cloudy = 100;

  islandColour = color(255, 247, 153)
  islands = [[70,10],[100,8],[130,10]] //each island has a size int and a points int
  
  //Gen x and y coord for bottles 
for (index = 0; index < bottles.length; index++) {
    rx = Math.floor(Math.random() * 200);
    ry = Math.floor(Math.random() * 200);
    bottles[index].x = width/2+rx
    bottles[index].y = height/2-ry
}
  

 
 
}

function draw() {

  drawSea(color(90, 151, 250)) //Sea color will be random
  if (isShark){
    
    sharkX -= sharkSpeed
    let sharkY = -sharkX
    
    image(shark, sharkX, 10, 30,30)
    
  }
  drawIsland(islandColour,200,5) //Island size, island points
  islandText(islandName)
  
  
  for (index = 0; index < bottles.length; index++) {
    x = bottles[index].x
    y = bottles[index].y
    image(bottle,x,y,100,100)
    
    
    
  
    
}
  
  
  
  makeCloud(cloudx, cloudy-50);
  makeCloud(cloudx - 100, cloudy + 100)
  makeCloud(cloudx + 400, cloudy + 100)
  makeCloud(cloudx - 50, cloudy + 100)
  makeCloud(cloudx +70, cloudy + 300)
  cloudx+=0.05;
  sharkX += 0.02
  
  
 
}


function mouseClicked(){
  for (index = 0; index < bottles.length; index++) {
    x = bottles[index].x
    y = bottles[index].y
    
    
    if ((x-70 <= mouseX && mouseX <= x+70) && (y-70 <= mouseY && mouseY <= y+70)){
      
      bottles.splice(index, 1);
      //OPEN BOTTLE FUNCTION
      break
    }
    
    
  }
  
 
}


function islandText(name){
  fill(0)
  textFont(myFont);
  textSize(30);
  textAlign(CENTER);
  text(name+" island", width/2+100,height/2+100)
}

//[[150,4],[130,6],[200,3]] 
function drawIsland(islandColor,islandSize,islandPoints){
  fill(islandColor)
  
  //Loop through islands
  for (let i = 0; i < islands.length; i++) {
    polygon(width/2+(i*50),height/2-(i*30),islands[i][0],islands[i][1])
  }
  
  
  
}


function makeCloud(cloudx, cloudy) {
  fill('rgba(214, 214, 214, 0.8)')
  noStroke();
  
  polygon(cloudx + 10, cloudy + 10, 50, 5);
  polygon(cloudx + 10, cloudy + 10, 30, 10);
  polygon(cloudx - 20, cloudy + 10, 20, 5);
 
}





function drawSea(seaColor){
 
  background(seaColor)
}


function polygon(x, y, radius, npoints) {
  noStroke();
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


