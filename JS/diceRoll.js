/*
icon1 = center icon | 19%
icon2 = decide icon | 9%
icon3 = do nothing icon | 19%
icon4 = gift from everyone icon | 4%
icon5 = give to everyone icon | 6%
icon6 = left icon | 19%
icon7 = link icon | 2%
icon8 = lose everything icon | 2%
icon9 = right icon | 19%
icon10 = take everything icon | 1%
*/

/*
---system variable well need---
>turn tracker like some index for the arrays between 1 and 5
>array for the user beata bucks with the 6th item being the pot 
>maybe an array of users since the beta bucks will be an array
>maybe a boolean for whether or not its the current players turn but maybe not if we can keep track of which diceRoll.js file is whos using the turn tracker array

---notes---
>should the game require 5 players to play for could it operate on less?
>
*/

let randNum = 0; //random number for roll outcome 
let i = 0; //used for roll icons loop
let mode = 0; //used for switch that displays roll description 
let currImage; //used for displaying the roll icons
let users; //string array of users
let userBetaBucks; //int array of users betabucks, last one is the pot
let temp; //temporarily stores the string userBetaBucks array, ask seth if you really want to know
let pot; //game pot
let can; //canvas

//session boolean

//this array acts as a deck of cards with the number of each card representing the probability of
//drawing that card at random; this is then used with the roll function to make certain outcomes
//statistically more probable than others when the user presses roll.
let rollDeck = [1,1,3,3,6,6,9,9,2,5,1,1,3,3,6,6,9,9,2,7,1,1,3,3,6,6,9,9,2,5,1,1,3,3,6,6,9,9,2,5,1,1,3,6,6,9,2,4,5,7,1,1,3,3,6,6,9,9,2,4,1,1,3,3,6,6,9,9,2,4,1,1,3,3,6,6,9,9,2,5,1,1,3,3,6,6,9,9,2,8,1,3,3,6,9,9,4,5,8,10];

//time the image appears for
let t=250;

var rollButton;

function preload(){
    //read in users file
    users = loadStrings("/JS/testUsers.txt"); //the file location is for local machines, change for website
    //console.log(users);
}

function setup(){
    canvasWidth = window.innerWidth*.30;
    canvasHeight = window.innerHeight*0.60;

    can = createCanvas(canvasWidth ,canvasHeight);
    can.position(displayWidth-can.width-(.35*displayWidth), displayHeight-can.height-(.03*displayHeight));

    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textFont('Lato');
    textSize(35);
    makeRollButton();
}

function draw(){
    //background('#4CAF50'); //this is the true background, the other is for testing positions of the canvas
    background('white');
    
    //read in beta bucks file

    //create rectangle with boarder for dice images
    fill('white');
    stroke('black');
    translate(width / 2-101, height / 2 - 101);
    rect(100, 100, 202, 202);
    
    drawReadFileStart();
    
    //console.log(userBetaBucks);

     switch(mode){
        case 1:
            fill('black');
            text('Center', 100, 250);
            break;
        case 2:
            fill('black');
            text('Decide', 100, 250);
            break;
        case 3:
            fill('red');
            text('Do Nothing', 100, 250);
            break;
        case 4:
            fill('black');
            text('Gift From Everyone', 100, 250);
            break;
        case 5:
            fill('black');
            text('Give to Everyone', 100, 250);
            break;
        case 6:
            fill('black');
            text('Left', 100, 250);
            break;
        case 7:
            fill('black');
            text('Link', 100, 250);
            break;
        case 8:
            fill('black');
            text('Lose Everything', 100, 250);
            break;
        case 9:
            fill('black');
            text('Right', 100, 250);
            break;
        case 10:
            fill('gold');
            text('Take Everything', 100, 250);
            break;
        default:
            break;
    }
    
    pot = userBetaBucks[userBetaBucks.length-1];
    //console.log(pot);
}

function makeRollButton(){
    rollButton = createButton('Roll');
    rollButton.position(displayWidth-can.width-(.22*displayWidth), displayHeight-can.height-(.1*displayHeight));
    rollButtonStyle();
    rollButton.mouseOver(rollButtonHover);
    rollButton.mouseOut(rollButtonStyle);
    rollButton.mousePressed(roll);
}

function rollButtonStyle(){
    rollButton.style('background-color', '#f7c139');
    rollButton.style('border-radius', '10px');
    rollButton.style('font-size', '36px');
    rollButton.style('font-family', 'Lato');
    rollButton.style('border', 'none');
}

function rollButtonHover(){
    rollButton.style('border-radius', '20px');
    rollButton.style('background-color', '#f9ac34');
}

function roll(){
    randNum = random(rollDeck);
    rollButton.hide();
    addImage();
}

function addImage(){
    if (i < randNum){
        i++;
        //currImage = createImg("icon" + i + ".svg"); //this is for the website 
        currImage = createImg("/images/icon" + i + ".svg"); //this is for local machines
        currImage.position(displayWidth-(.575*displayWidth), displayHeight-(.4*displayHeight))
        setTimeout(removeImage, t);
        setTimeout(addImage, t);
    }
    else{
        //currImage = createImg("icon" + i + ".svg"); //this is for the website
        currImage = createImg("/images/icon" + i + ".svg"); //this is for local machines
        currImage.position(displayWidth-(.575*displayWidth), displayHeight-(.4*displayHeight))
        mode = i;
        i = 0;
        setTimeout(showRoll, 2000);
    }
}

function removeImage(){
    currImage.remove();
}


function showRoll(){
    rollButton.show();
    currImage.remove();
    mode = 0;
    
    //write to server or something
}

// pain
function drawReadFileStart(){
    noLoop();
    temp = loadStrings("/JS/testBetaBucks.txt", drawReadFileEnd); //the file location is for local machines, change for website
}

function drawReadFileEnd(){
    userBetaBucks = int(temp);
    loop();
}

//individual roll functions
function center(){
    //stuff
}

function decide(){
    //stuff
}

function doNothing(){
    //stuff
}

function giftFromEveryone(){
    //stuff
}

function link(){
    //stuff
}

function giveToEveryone(){
    //stuff
}

function left(){
    //stuff
}

function loseEverything(){
    //stuff
}

function right(){
    //stuff
}

function takeEverything(){
    //stuff
}