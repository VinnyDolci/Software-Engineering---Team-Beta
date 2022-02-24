let slider;
let slider2;
let redSlider;
let greenSlider;
let blueSlider;
let startButton;

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

function setup() {
  // put setup code here    
    let can = createCanvas(displayWidth*.80,displayHeight*0.60);
    
    can.position(displayWidth-can.width-(.1*displayWidth), displayHeight-can.height-(.2*displayHeight));
    
    slider = createSlider(0,can.width,0,1);
    slider.position(100, 10);
    slider.style('width', '255px');
    
    slider2 = createSlider(0,can.height,0,1);    
    slider2.position(200, 30);
    slider2.style('width', '255px');    
    
    redSlider = createSlider(0,255,0,1);    
    redSlider.position(500, 30);
    redSlider.style('width', '255px');
    
    greenSlider = createSlider(0,255,0,1);    
    greenSlider.position(500, 50);
    greenSlider.style('width', '255px');
    
    blueSlider = createSlider(0,255,255,1);    
    blueSlider.position(500, 70);
    blueSlider.style('width', '255px');
    
    colorMode(RGB, 255);
    
    let c = color(19,100,117);
    startButton = createButton('Lose all your money');
    startButton.style('background-color', c);
    startButton.style('border-radius: 7px');
    startButton.style('font-size: 16px');
}

function draw() {
  // put drawing code here
    let R = redSlider.value();
    let G = greenSlider.value();
    let B = blueSlider.value();
    
    background(R, G, B);
    
    let xPos = slider.value();
    let yPos = slider2.value();     
    
    startButton.position(xPos+(displayWidth*.1), yPos+(displayHeight*.2));
}