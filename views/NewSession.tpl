<html>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        body,h1,h2,h3,h4,h5,h6 {font-family: "Lato", sans-serif}
        .w3-bar,h1,button {font-family: "Montserrat", sans-serif}
        .fa-anchor,.fa-coffee {font-size:200px}
    </style>
<body>

<!-- Navbar -->
<div class="w3-top">
  <div class="w3-bar w3-lime w3-card w3-left-align w3-large">
    <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red" href="javascript:void(0);" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
    <a href="index" class="w3-bar-item w3-button w3-padding-large w3-hover-white">Home</a>
    <a href="login" class="w3-bar-item w3-button w3-padding-large w3-hover-white">Login</a>
    <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-blue  w3-white">New Session</a>
    <a href="JoinSession" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Join a Session</a>
    <a href="GameInstructions" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Game Instructions</a>
    <a href="About" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">About</a>
    <a href="diceRoll" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Game</a>
  </div>

  <!-- Navbar on small screens -->
  <div id="navDemo" class="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large">
    <a href="#" class="w3-bar-item w3-button w3-padding-large">New Session</a>
    <a href="JoinSession" class="w3-bar-item w3-button w3-padding-large">Join a Session</a>
    <a href="GameInstructions" class="w3-bar-item w3-button w3-padding-large">Game Instructions</a>
    <a href="About" class="w3-bar-item w3-button w3-padding-large">About</a>
  </div>
</div>

<!-- Header -->
<header class="w3-container w3-green w3-center" style="padding:244px 16px">
  <h1 class="w3-margin w3-jumbo">Generate Code</h1>
  <p class="w3-xlarge">Create random code to host a game</p>
  <!-- oncliclk() function for Start button-->
  <!--############################################################-->
    <h2 class="w3-margin w3-xlarge">The Random Code Is</h2>
    <form action="/NewSession" method="post" id="code">
        <div id="example_text" class="w3-black" name></div>
        <input id="gameID" type="text" name="gameID" readonly/><br/>
    </form>
    <button class="w3-button w3-black w3-padding-large w3-large w3-margin-top" type="submit" id="generate" onclick="load_text()" form="code">Generate</button>

</header>
<!-- Footer -->
<footer class="w3-container w3-black w3-padding-64 w3-center w3-opacity">
    <p class="w3-margin w3-xlarge">LRC Expanded</p>
    <a href="https://github.com/VinnyDolci/Software-Engineering---Team-Beta">View the Game Project on GitHub</a>
</footer>
    <script>

            function load_text() {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

                for (var i = 0; i < 12; i++){
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }

                element = document.getElementById("gameID").value=text;
            }

            function getCookie(cname) {
                console.log("getCookie Entered");
                let name = cname + "=";
                let decodedCookie = decodeURIComponent(document.cookie);
                let ca = decodedCookie.split(';');
                for(let i = 0; i <ca.length; i++) {
                    let c = ca[i];
                        while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            }

            window.onload = function continue_test(){
                let testing = getCookie("testing");
                if (testing == 'true'){
                    console.log("IF entered");
                    let button = document.getElementById("generate");
                    console.log(button);
                    button.click();
                }
            }

    </script>

</body>
</html>