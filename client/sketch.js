




//Vars to declare (might be in a key)
let cloudx;
let cloudy;

let isShark;
let sharkSpeed;
let sharkX = 400;

let glassSound;








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
//   glassSound = loadSound('assets/glass_sound.mp3')
}




let mapKey = "Durham?[[200,5],[120,9],[300,6]]?" //await fetch map key 
let bottles = [{id:1},{id:2},{id:3}] //list of bottles with id await get bottles

part1 = true
//Decode map key
for (let i = 0; i < mapKey.length; i++) {

    if (mapKey[i] === "?"){
        if (part1){
            islandName = mapKey.substring(0, i);
            part1 = false;
        } else{
            islands = mapKey.substring(islandName.length+1,mapKey.length-1)

        }
       
    }


}

islands = eval(islands)




function setup() {
  createCanvas(windowWidth, windowHeight);
  
  isShark = true
  sharkSpeed = 0.3
  
  cloudx = 100;
  cloudy = 100;

  islandColour = color(255, 247, 153)
  console.log(islands)
 //each island has a size int and a points int
  console.log(islands)
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


  fill(255)
  textFont(myFont);
  textSize(60);
  textAlign(CENTER);
  text("BREAK THIS BOTTLE",width/2,height-height+50)
  textSize(20);
  text("A messaging web app (kind of)",width/2+100,height-height+70)
  

 
}


function mouseClicked(){
  for (index = 0; index < bottles.length; index++) {
    x = bottles[index].x
    y = bottles[index].y
    
    
    if ((x-70 <= mouseX && mouseX <= x+70) && (y-70 <= mouseY && mouseY <= y+70)){
      
      bottles.splice(index, 1);
    //   glassSound.play()
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


