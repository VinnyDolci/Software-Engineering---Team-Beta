var blueIcon = /images/iconPlayerBlue.png/;
var limeIcon = /images/iconPlayerLime.png;
var orangeIcon = /images/iconPlayerOrange.png;
var redIcon = /images/iconPlayerRed.png;
var whiteIcon = /images/iconPlayerWhite.png;
var yellowIcon = /images/iconPlayerYellow.png;


class player {
    constructor(name, funds) {
        this.name = getName();
        this.funds = 0;
    }
    
    displayFunds() {
         document.getElementById("fundsButton").innerHTML = "player.funds";
    }
    getName() {
        let name = prompt("Input player name");
        document.querySelector("p.Player1").innerHTML = player1;
    }
    selectIcon() {
        let playerColor = prompt("Input player name");
        
        var theimage = document.createElement("img");
        theimage.setAttribute('src', key);
        
    }
}

class pot {
    constructor(total);
    this.total = total;
    check
}
