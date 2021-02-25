var buttonsColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var isStarted = false;

//Start point
// $(document).keydown(function() {
//   if (!isStarted) {
//     $("#level-title").text("Level 0");
//     nextSequence();
//     isStarted = true;
//   }
// })

//Start point by button
$(".btn-aux").click(function() {
  if (!isStarted) {
    $("#level-title").text("Level 0");
    nextSequence();
    isStarted = true;
  }
})

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1)
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    endGame();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonsColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("#level-title").text("Level " + level);
}

function endGame() {
  playSound("wrong");
  $("body").toggleClass("game-over");
  setTimeout(function() {
    $("body").toggleClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  level = 0;
  gamePattern = [];
  isStarted = false;
}

function playSound(soundKey) {
  var sound = new Audio("sounds/" + soundKey + ".mp3");
  sound.play();
}

function animatePress(buttonKey) {
  $("#" + buttonKey).toggleClass("pressed");
  setTimeout(function() {
    $("#" + buttonKey).toggleClass("pressed");
  }, 100);
}
