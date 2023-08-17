let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let hasGameStarted = false;
let level = 0;
let clickCount = 0;

let blueSound = new Audio("sounds/blue.mp3");
let greenSound = new Audio("sounds/green.mp3");
let yellowSound = new Audio("sounds/yellow.mp3");
let redSound = new Audio("sounds/red.mp3");
let wrongSound = new Audio("sounds/wrong.mp3");

$(".btn").on("click", handleClick);

$(document).on("keypress", function () {
  if (!hasGameStarted) {
    $("h1").text("Level " + level);
    nextSequenceWithDelay();
    hasGameStarted = true;
  }
});

function colorBtnSound(color) {
  switch (color) {
    case "red":
      redSound.play();
      break;
    case "blue":
      blueSound.play();
      break;
    case "green":
      greenSound.play();
      break;
    case "yellow":
      yellowSound.play();
      break;
  }
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function nextSequenceWithDelay() {
    setTimeout(function() {
      var randomNumber = Math.floor(Math.random() * 4);
      let randomChosenColor = buttonColors[randomNumber];
      gamePattern.push(randomChosenColor);
  
      $("#" + randomChosenColor)
        .fadeOut(70)
        .fadeIn(120)
        .fadeOut(70)
        .fadeIn(120);
      colorBtnSound(randomChosenColor);
  
      console.log("game pattern: " + gamePattern);
    }, 500); 
  }

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(70)
    .fadeIn(120)
    .fadeOut(70)
    .fadeIn(120);
  colorBtnSound(randomChosenColor);

  console.log("game pattern: " + gamePattern) ///
}

function handleClick() {
    if (hasGameStarted) {
      let userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);
      colorBtnSound(userChosenColor);
      animatePress(userChosenColor);
      console.log("user clicked: " + userChosenColor) ///
      console.log("userClickedPattern length is:" + userClickedPattern.length) ///
      console.log("click count is:" + clickCount) ///
      console.log("game pattern[click]: " + gamePattern[clickCount]) ///
      console.log("game pattern length is:" + gamePattern.length) ///
      clickCheck(userChosenColor);

      
    }
  }

function reset() {
  gamePattern = [];
  userClickedPattern = [];
  hasGameStarted = false;
  level = 0;
  clickCount = 0;
  $("h1").text("You Lost, presse key to restart");
}

function clickCheck(currentColor) {
  if (currentColor == gamePattern[clickCount]) {
    clickCount++;
    if (userClickedPattern.length == gamePattern.length) { // <-- qua c'è un problema
      clickCount = 0;
      userClickedPattern = [];
      level++;
      $("h1").text("Level " + level);
      nextSequenceWithDelay();
    }
  } else {
    wrongSound.play();
    reset();
  }
}
