/*
icon1 = center icon
icon2 = decide icon
icon3 = do nothing icon
icon4 = gift from everyone icon
icon5 = give to everyone icon
icon6 = left icon
icon7 = link icon
icon8 = loose everything icon
icon9 = right icon
icon10 = take everything icon
*/

let bkgrndImage;
let randNum = 0;
let i = 0;
let emptyImage;
let imageAarray = ['icon1.svg','icon2.svg','icon3.svg','icon4.svg','icon5.svg','icon6.svg','icon7.svg','icon8.svg','icon9.svg','icon10.svg'];

//time the image appears for
let t=250;

var rollButton;

function preload(){
    bkgrndImage = loadImage('images/Background.jpg');
    emptyIMage = loadImage('DiceIcons/clearIcon.svg');
}

function setup(){
    canvasWidth = window.innerWidth*.80;
    canvasHeight = window.innerHeight*0.80;
    
    let can = createCanvas(canvasWidth ,canvasHeight);   
    can.position(displayWidth-can.width-(.1*displayWidth), displayHeight-can.height-(.2*displayHeight));
    background(bkgrndImage);
    
    //create rectangle with boarder for dice images
    fill('white');
    stroke('black');
    rectMode(CENTER);
    translate(width / 2-101, height / 2 - 101);
    rect(100, 100, 202, 202);
    
    makeRollButton();
}

function makeRollButton(){
    rollButton = createButton('Roll');
    rollButton.position(displayWidth/2-40,displayHeight/2+100);
    rollButtonStyle();
    rollButton.mouseOver(rollButtonHover);
    rollButton.mouseOut(rollButtonStyle);
    rollButton.mousePressed(roll);
}

function rollButtonStyle(){    
    rollButton.style('background-color', '#f7c139');
    rollButton.style('border-radius', '10px');
    rollButton.style('font-size', '36px');
    rollButton.style('font-family', 'sono');
    rollButton.style('border', 'none');
}

function rollButtonHover(){
    rollButton.style('border-radius', '20px');
    rollButton.style('background-color', '#f9ac34');
}

function roll(){
    randNum = random(1, 11);
    rollButton.hide();
    for (let i = 1; i <= randNum; i++){
        
    }
    setTimeout(resetRoll, 5000);
}
