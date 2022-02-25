let bgImage;
let canvasWidth;
let canvasHeight;
let canPosX;

var startButton;
var infoButton;

/*
var button;
function setup() { 
  createCanvas(400, 400);
  background(220);
  button = createButton('Email');
  button.position(10,10);                                 //This exists as a reminder of how to make abutton open a new webpage. 
  button.mousePressed(openEmail);                         //Our pages will basically just be seaparate canvasses wit hwhatever wa want to display.
} 


function openEmail(){
  window.open("https://mail.google.com");
  
}
*/


// This preloads the image into the bgImage variable before setup
function preload(){
    bgImage = loadImage('images/Background.jpg');
}


function setup() {
  // put setup code here    
    canvasWidth = window.innerWidth*.80;
    canvasHeight = window.innerHeight*0.80;
    
    let can = createCanvas(canvasWidth ,canvasHeight);   
    can.position(displayWidth-can.width-(.1*displayWidth), displayHeight-can.height-(.2*displayHeight));    
    background(bgImage);   
   
    makeStartButton();
    makeInfoButton();
}

function makeStartButton(){    
    startButton = createButton('Start');
    startButton.position(displayWidth/2-60,displayHeight/2-200);
    startButtonStyle();
    startButton.mouseOver(startButtonHover);
    startButton.mouseOut(startButtonStyle);
    startButton.mousePressed(startButtonPress);
    //startButton.mouseClicked(beginGame);
}

function makeInfoButton(){    
    infoButton = createButton('How-To-Play');
    infoButton.position(displayWidth/2-60,displayHeight/2-150);
    infoButtonStyle();
    infoButton.mouseOver(infoButtonHover);
    infoButton.mouseOut(infoButtonStyle);
    infoButton.mousePressed(infoButtonPress);
    //infoButton.mouseClicked(showInfo);
}

function startButtonStyle(){    
    startButton.style('background-color', '#f7c139');
    startButton.style('border-radius', '10px');
    startButton.style('font-size', '36px');
    startButton.style('font-family', 'sono');
    startButton.style('border', 'none');
}

function infoButtonStyle(){    
    infoButton.style('background-color', '#f7c139');
    infoButton.style('border-radius', '10px');
    infoButton.style('font-size', '36px');
    infoButton.style('font-family', 'sono');
    infoButton.style('border', 'none');
}

function startButtonHover(){
    startButton.style('border-radius', '20px');
    startButton.style('background-color', '#f9ac34');
}

function infoButtonHover(){
    infoButton.style('border-radius', '20px');
    infoButton.style('background-color', '#f9ac34');
}

function startButtonPress(){
    startButton.style('border-radius', '5px');
    startButton.style('background-color', 'red');
}

function infoButtonPress(){
    infoButton.style('border-radius', '5px');
    infoButton.style('background-color', 'red');
}

function draw() {  
    buttonStuff();
}