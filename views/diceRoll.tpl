<!DOCTYPE html>
<html lang="en">
    <head>
        <title>LRC Game</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
            body,h1,h2,h3,h4,h5,h6 {font-family: "Lato", sans-serif}
            .w3-bar,h1,button {font-family: "Montserrat", sans-serif}
            .fa-anchor,.fa-coffee {font-size:200px}
            <!--#PlayerIcons {
                    background-color: lightbgreen;
                    color: black;
                    padding: 1.0px;
                    text-align: center;

            } -->
        </style>

        <script src="p5.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <!-- <script src="../addons/p5.sound.js"></script> -->
        <!-- <script src="diceRoll.js">let idOfGame = {{gameID}}; </script> -->

        <!-- PRO GAMER MOVE -->
        <script>
            let userName;
let currentUserTurn;
let randNum = 0; //random number for roll outcome
let i = 0; //used for roll icons loop
let mode = 0; //used for switch that displays roll description
let currImage; //used for displaying the roll icons
let users = []; //string array of users
let userBetaBucks = []; //int array of users betabucks, last one is the pot
let temp; //temporarily stores the string userBetaBucks array, ask seth if you really want to know
let pot; //game pot
let can; //canvas
let hasBeenCalled = false;
let counter = 0;

//this array acts as a deck of cards with the number of each card representing the probability of
//drawing that card at random; this is then used with the roll function to make certain outcomes
//statistically more probable than others when the user presses roll.
let rollDeck = [1,1,3,3,6,6,9,9,2,5,1,1,3,3,6,6,9,9,2,7,1,1,3,3,6,6,9,9,2,5,1,1,3,3,6,6,9,9,2,5,1,1,3,6,6,9,2,4,5,7,1,1,3,3,6,6,9,9,2,4,1,1,3,3,6,6,9,9,2,4,1,1,3,3,6,6,9,9,2,5,1,1,3,3,6,6,9,9,2,8,1,3,3,6,9,9,4,5,8,10];
let testDeck = [1];

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
    can.position(displayWidth-can.width-(.35*displayWidth), 250);
    can.parent('canvasHolder');

    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textFont('Lato');
    textSize(35);
    makeRollButton();

    setInterval(updateInfo, 1000);
    //userName = users[userInfo.joinIndex];
}

function draw(){
    background('#4CAF50'); //this is the true background, the other is for testing positions of the canvas
    //background('white');

    //read in beta bucks file

    //create rectangle with boarder for dice images
    fill('white');
    stroke('black');
    translate(width / 2 - 101, height / 2 - 101);
    rect(100, 100, 202, 202);

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
    rollButton.position(displayWidth-can.width-(.22*displayWidth), 310);
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
        currImage.position(displayWidth-can.width-(.253*displayWidth), 390)
        setTimeout(removeImage, t);
        setTimeout(addImage, t);
    }
    else{
        currImage = createImg("icon" + i + ".svg");
        currImage.position(displayWidth-can.width-(.253*displayWidth), 390)
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
function drawReadBetaBucksFileEnd(){
    for (let i = 0; i < temp.length; ++i){
        temp[i] = temp[i].slice(6);
    }
    userBetaBucks = int(temp);
    console.log(userBetaBucks);
}

function drawReadUserFileEnd(){
    console.log("Before For: " + users.length);
    for (let i = 0; i < users.length; ++i){
        users[i] = users[i].slice(6);
    }
    console.log(users);
    console.log("After For: " + users.length);
    //loop();
}

function updateInfo(){
    temp = loadStrings(`{{gameID}}-bucks.txt`, drawReadBetaBucksFileEnd);

    console.log("Before Callback: " + users.length);
    users = loadStrings(`{{gameID}}-users.txt`, drawReadUserFileEnd);
    ++counter;
    console.log(counter);
}

function ajaxThing(){
    console.log("AJAX: " + users.length)

    switch(users.length){
        case 1:
            users[1] = ""; users[2] = ""; users[3] = ""; users[4] = "";
            userBetaBucks[1] = ""; userBetaBucks[2] = ""; userBetaBucks[3] = ""; userBetaBucks[4] = "";
        case 2:
            users[2] = ""; users[3] = ""; users[4] = "";
            userBetaBucks[2] = ""; userBetaBucks[3] = ""; userBetaBucks[4] = "";
        case 3:
            users[3] = ""; users[4] = "";
            userBetaBucks[3] = ""; userBetaBucks[4] = "";
        case 4:
            users[4] = "";
            userBetaBucks[4] = "";

    }

    let rawData = {"user0Name": users[0],
         "user0Bucks": userBetaBucks[0],
         "user1Name": users[1],
         "user1Bucks": userBetaBucks[1],
         "user2Name": users[2],
         "user2Bucks": userBetaBucks[2],
         "user3Name": users[3],
         "user3Bucks": userBetaBucks[3],
         "user4Name": users[4],
         "user4Bucks": userBetaBucks[4]
        };

    $.ajax({
        url: "/updateValues",
        type: "POST",
        dataType: "json",
        data: rawData,
        contentType: "application/json;",
    });
    console.log("AJAX Complete");
}

//individual roll functions
function myCenter(){
    //stuff
    hasBeenCalled = true;
    //ajaxThing();
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
</script>
    </head>
    <body>
        <!-- Navbar -->
        <div class="w3-top">
            <div class="w3-bar w3-lime w3-card w3-left-align w3-large">
                <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red" href="javascript:void(0);" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
                <a href="index" class="w3-bar-item w3-button w3-padding-large w3-hover-white">Home</a>
                <a href="NewSession" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">New Session</a>
                <a href="JoinSession" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Join a Session</a>
                <a href="GameInstructions" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Game Instructions</a>
                <a href="About" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">About</a>
            </div>

            <!-- Navbar on small screens -->
            <div id="navDemo" class="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large">
                <a href="NewSession" class="w3-bar-item w3-button w3-padding-large">New Session</a>
                <a href="JoinSession" class="w3-bar-item w3-button w3-padding-large">Join a Session</a>
                <a href="GameInstructions" class="w3-bar-item w3-button w3-padding-large">Game Instructions</a>
                <a href="About" class="w3-bar-item w3-button w3-padding-large">About</a>
            </div>
        </div>

        <div class="w3-green w3-left" ">
            <h1 style="color:black; padding:40px 0px 0px 5px">Game ID</h1></br>
            <h2 style="color:black; padding:0px 0px 5px 5px">{{gameID}}</h2>
        </div>

        <!-- Player Icons -->
        <div id="PlayerIcons" class="w3-green w3-center" style="padding:40px 100px 0px; margin-left:450px">
            <div id="Player 1 Info" style="padding:20px 50px 0px 0px; float:left">
                <img src="iconPlayerBlue.png" width="100" height="100">
                <div id="player0Name" style="padding:10px; color:black">
                    {{player0Name}}
                </div>
                <div id="player0Bucks" style="padding:10px; color:black; color:black">
                    {{player0Bucks}}
                </div>
            </div>
            <div id="Player 2 Info" style="padding:20px 50px 0px 0px; float:left">
                <img src="iconPlayerLime.png" width="100" height="100">
                <div id="player1Name" style="padding:10px; color:black">
                    {{player1Name}}
                </div>
                <div id="player1Bucks" style="padding:10px; color:black">
                    {{player1Bucks}}
                </div>
            </div>
            <div id="Player 3 Info" style="padding:20px 50px 0px 0px; float:left">
                <img src="iconPlayerOrange.png" width="100" height="100">
                <div id="player2Name" style="padding:10px; color:black">
                    {{player2Name}}
                </div>
                <div id="player2Bucks" style="padding:10px; color:black">
                    {{player2Bucks}}
                </div>
            </div>
            <div id="Player 4 Info" style="padding:20px 50px 0px 0px; float:left">
                <img src="iconPlayerRed.png" width="100" height="100">
                <div id="player3Name" style="padding:10px; color:black">
                    {{player3Name}}
                </div>
                <div id="player3Bucks" style="padding:10px; color:black">
                    {{player3Bucks}}
                </div>
            </div>
            <div id="Player 5 Info" style="padding:20px 50px 0px 0px; float:left">
                <img src="iconPlayerWhite.png" width="100" height="100">
                <div id="player4Name" style="padding:10px; color:black">
                    {{player4Name}}
                </div>
                <div id="player4Bucks" style="padding:10px; color:black">
                    {{player4Bucks}}
                </div>
            </div>
        </div>




        <header class="w3-container w3-green w3-center" style="padding:450px 16px" id="canvasHolder">
        </header>

        <!-- Footer -->
        <footer class="w3-container w3-black w3-padding-64 w3-center w3-opacity">
            <p class="w3-margin w3-xlarge">LRC Expanded</p>
            <a href="https://github.com/VinnyDolci/Software-Engineering---Team-Beta">View the Game Project on GitHub</a>
        </footer>
    </body>


</html>