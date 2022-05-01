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

let userName;
let currentUserTurn;
let randNum = 0; //random number for roll outcome
let i = 0; //used for roll icons loop
let mode = 0; //used for switch that displays roll description
let currImage; //used for displaying the roll icons
let users; //string array of users
let userBetaBucks; //int array of users betabucks, last one is the pot
let temp; //temporarily stores the string userBetaBucks array, ask seth if you really want to know
let pot; //game pot
let can; //canvas
let hasBeenCalled = false;
let idOfGame = {{gameID}}

//this array acts as a deck of cards with the number of each card representing the probability of
//drawing that card at random; this is then used with the roll function to make certain outcomes
//statistically more probable than others when the user presses roll.
let rollDeck = [1,1,3,3,6,6,9,9,2,5,1,1,3,3,6,6,9,9,2,7,1,1,3,3,6,6,9,9,2,5,1,1,3,3,6,6,9,9,2,5,1,1,3,6,6,9,2,4,5,7,1,1,3,3,6,6,9,9,2,4,1,1,3,3,6,6,9,9,2,4,1,1,3,3,6,6,9,9,2,5,1,1,3,3,6,6,9,9,2,8,1,3,3,6,9,9,4,5,8,10];

//time the image appears for
let t=250;

var rollButton;

function preload(){
    //read in users file
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

    //userName = users[userInfo.joinIndex];
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

    //continuously update instance values
    drawReadBetaBucksFileStart();
    drawReadUserFileStart();

    //currentUserTurn = users[];

     switch(mode){
        case 1:
            fill('black');
            text('Center', 100, 250);
            if (!hasBeenCalled){
                myCenter();
            }
            break;
        case 2:
            fill('black');
            text('Decide', 100, 250);
            if (!hasBeenCalled){
                myDecide();
            }
            break;
        case 3:
            fill('red');
            text('Do Nothing', 100, 250);
            if (!hasBeenCalled){
                myDoNothing();
            }
            break;
        case 4:
            fill('black');
            text('Gift From Everyone', 100, 250);
            if (!hasBeenCalled){
                myGiftFromEveryone();
            }
            break;
        case 5:
            fill('black');
            text('Give to Everyone', 100, 250);
            if (!hasBeenCalled){
                myGiveToEveryone();
            }
            break;
        case 6:
            fill('black');
            text('Left', 100, 250);
            if (!hasBeenCalled){
                myLeft();
            }
            break;
        case 7:
            fill('black');
            text('Link', 100, 250);
            if (!hasBeenCalled){
                myLink();
            }
            break;
        case 8:
            fill('black');
            text('Lose Everything', 100, 250);
            if (!hasBeenCalled){
                myLoseEverything();
            }
            break;
        case 9:
            fill('black');
            text('Right', 100, 250);
            if (!hasBeenCalled){
                myRight();
            }
            break;
        case 10:
            fill('gold');
            text('Take Everything', 100, 250);
            if (!hasBeenCalled){
                myTakeEverything();
            }
            break;
        default:
            break;
    }

    //pot = userBetaBucks[userBetaBucks.length-1];
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
        currImage = createImg("icon" + i + ".svg");
        currImage.position(displayWidth-(.575*displayWidth), displayHeight-(.4*displayHeight))
        setTimeout(removeImage, t);
        setTimeout(addImage, t);
    }
    else{
        currImage = createImg("icon" + i + ".svg");
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
    hasBeenCalled = false;
    //write to server or something
}

// pain
function drawReadBetaBucksFileStart(){
    noLoop();
    temp = loadStrings(`../data/games/${idOfGame}-bucks.txt`, drawReadBetaBucksFileEnd);
}

function drawReadBetaBucksFileEnd(){
    userBetaBucks = int(temp);
    loop();
}

function drawReadUserFileStart(){
    noLoop();
    users = loadStrings(`../data/games/${idOfGame}-users.txt1`, drawReadUserFileEnd);
}

function drawReadUserFileEnd(){
    for (let i = 0; i < uses.length; ++i){
        user[i] = user[i].slice(6);
    }
    console.log(users);
    loop();
}

function ajaxThing(){
    $.ajax({
        url:"/updateValues",
        type: "POST",
        data:
        {"user0Name": users[0],
         "user0Bucks": userBetaBucks[0],
         "user1Name": users[1],
         "user1Bucks": userBetaBucks[1],
         "user2Name": users[2],
         "user2Bucks": userBetaBucks[2],
         "user3Name": users[3],
         "user3Bucks": userBetaBucks[3],
         "user4Name": users[4],
         "user4Bucks": userBetaBucks[4]
        },
        dataType: "json"
    });
}

//individual roll functions
function myCenter(){
    //stuff
    hasBeenCalled = true;
    ajaxThing();
}

function myDecide(){
    //stuff
    hasBeenCalled = true;
}

function myDoNothing(){
    //stuff
    hasBeenCalled = true;
}

function myGiftFromEveryone(){
    //stuff
    hasBeenCalled = true;
}

function myLink(){
    //stuff
    hasBeenCalled = true;
}

function myGiveToEveryone(){
    //stuff
    hasBeenCalled = true;
}

function myLeft(){
    //stuff
    hasBeenCalled = true;
}

function myLoseEverything(){
    //stuff
    hasBeenCalled = true;
}

function myRight(){
    //stuff
    hasBeenCalled = true;
}

function myTakeEverything(){
    //stuff
    hasBeenCalled = true;
}