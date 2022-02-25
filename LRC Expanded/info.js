let infoImage;

var backButton;

function preload(){
    infoImage = loadImage('images/Information-chart.jpg');
}

function setup(){    
    canvasWidth = window.innerWidth*.80;
    canvasHeight = window.innerHeight*0.80;
    
    let can = createCanvas(canvasWidth ,canvasHeight);   
    can.position(displayWidth-can.width-(.1*displayWidth), displayHeight-can.height-(.2*displayHeight));    
    background(infoImage);
    
    makeBackButton();
}

function makeBackButton(){    
    backButton = createButton('Back');
    backButton.position(displayWidth/2+600,displayHeight/2-425);
    backButtonStyle();
    backButton.mouseOver(backButtonHover);
    backButton.mouseOut(backButtonStyle);
    backButton.mousePressed(goHome);
}

function backButtonStyle(){    
    backButton.style('background-color', '#f7c139');
    backButton.style('border-radius', '10px');
    backButton.style('font-size', '36px');
    backButton.style('font-family', 'sono');
    backButton.style('border', 'none');
}

function backButtonHover(){
    backButton.style('border-radius', '20px');
    backButton.style('background-color', '#f9ac34');
}

function goHome(){
    backButton.style('border-radius', '5px');
    backButton.style('background-color', 'red');    
    window.open('index.html');
    window.close('info.html');
}