let bgImage;
let canvasWidth;
let canvasHeight;

var startButton;
var infoButton;



// This preloads the image into the bgImage variable before setup
function preload(){
    bgImage = loadImage('images/Background.jpg');
}

function setup() {    
    canvasWidth = window.innerWidth*.80;
    canvasHeight = window.innerHeight*0.80;
    
    let can = createCanvas(canvasWidth ,canvasHeight);   
    can.position(displayWidth-can.width-(.1*displayWidth), displayHeight-can.height-(.2*displayHeight));    
    background(bgImage);   
   
    makeStartButton();
    makeInfoButton();
}

function makeStartButton(){    
    startButton = createButton('START');
    startButton.position(displayWidth*0.47,displayHeight*0.40);
    startButtonStyle();
    startButton.mouseOver(startButtonHover);
    startButton.mouseOut(startButtonStyle);
    startButton.mousePressed(startButtonPress);
}

function makeInfoButton(){    
    infoButton = createButton('HOW-TO-PLAY');
    infoButton.position(displayWidth*0.43,displayHeight*0.50);
    infoButtonStyle();
    infoButton.mouseOver(infoButtonHover);
    infoButton.mouseOut(infoButtonStyle);
    infoButton.mousePressed(showInfo);    
}

function startButtonStyle(){    
    startButton.style('background-color', '#f7c139');
    startButton.style('border-radius', '10px');
    startButton.style('font-size', '36px');
    startButton.style('font-family', 'Lato');
    startButton.style('border', 'none');
}

function infoButtonStyle(){    
    infoButton.style('background-color', '#f7c139');
    infoButton.style('border-radius', '10px');
    infoButton.style('font-size', '36px');
    infoButton.style('font-family', 'Lato');
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
    window.open('diceRoll.html');
    window.close('index.html');
}

function showInfo(){    
    infoButton.style('border-radius', '5px');
    infoButton.style('background-color', 'red');
    window.open('info.html');
    window.close('index.html');
}
