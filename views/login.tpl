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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<style>
body,h1,h2,h3,h4,h5,h6 {font-family: "Lato", sans-serif}
.w3-bar,h1,button {font-family: "Montserrat", sans-serif}
.fa-anchor,.fa-coffee {font-size:200px}
</style>
</head>
<body>

<!-- Navbar -->
<div class="w3-top">
  <div class="w3-bar w3-lime w3-card w3-left-align w3-large">
    <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red" href="javascript:void(0);" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
    <a href="index" class="w3-bar-item w3-button w3-padding-large w3-hover-white">Home</a>
    <a href="#" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-blue w3-white">Login</a>
    <a href="NewSession" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">New Session</a>
    <a href="JoinSession" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Join a Session</a>
    <a href="GameInstructions" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Game Instructions</a>
    <a href="About" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">About</a>
    <a href="diceRoll" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Game</a>
  </div>

  <!-- Navbar on small screens -->
  <div id="navDemo" class="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large">
    <a href="NewSession" class="w3-bar-item w3-button w3-padding-large">New Session</a>
    <a href="#" class="w3-bar-item w3-button w3-padding-large">Login</a>
    <a href="JoinSession" class="w3-bar-item w3-button w3-padding-large">Join a Session</a>
    <a href="GameInstructions" class="w3-bar-item w3-button w3-padding-large">Game Instructions</a>
    <a href="About" class="w3-bar-item w3-button w3-padding-large">About</a>
  </div>
</div>
<header class="w3-container w3-green w3-center" style="padding:244px 16px">
<h1 class="w3-margin w3-jumbo">Login Here</h1>
<form class="w3-green" action="/login" method="post">
  <hr/>
  <table class="w3-margin w3-xlarge" style="padding:0px 650px">
    <tr>
      <td><em>Name</em></td>
      <td><input type="text" name="username" id="username"/><br/></td>
    </tr>
    <tr>
      <td><em>Add BetaBucks</em></td>
      <td><input type="text" name="betaBucks" id="betaBucks"/><br/></td>
    </tr>
    <!--
    <tr>
      <td><em>Password</em></td>
      <td><input type="password" name="password"/></td>
    </tr>
    -->
  </table>
  <hr/>
  <input class="w3-button w3-black w3-padding-large w3-large w3-margin-top" name="submit" id="submit" type="submit" value="Login"/>
</form>
</header>

<script>
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

   window.onload = async function run_test() {
        console.log("run_test called");
        let testing;
        testing = getCookie("testing");
        console.log(testing);

        if (testing == 'true'){
            document.getElementById("username").value="Tester";
            document.getElementById("betaBucks").value="123456";
            let button = document.getElementById("submit");
            await new Promise(resolve => setTimeout(resolve, 750));
            button.click();
        }
    }

</script>

<!-- Footer -->
<footer class="w3-container w3-black w3-padding-64 w3-center w3-opacity">
    <p class="w3-margin w3-xlarge">LRC Expanded</p>
    <a href="https://github.com/VinnyDolci/Software-Engineering---Team-Beta">View the Game Project on GitHub</a>
</footer>

<script>
// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}
</script>
</body>
</html>