//--------------VARIABLES------------------//
//Game Variables
var buttonColours = ["red", "yellow", "blue", "green"];
var gameStarted = false;
var level = 0;
var currentEntry = 0;

//Game Patterns
var gamePattern = [];
var userPattern = [];


//--------------LISTENERS------------------//

//Press any key to start listener
$(document).keypress(function() {
  if (gameStarted == false) {
    gameStarted = true;
    nextSequence();
  }
})

//Click the button listener
$(".btn").click(function() {
  var userColour = $(this).attr("id");
  userPattern.push(userColour);
  playEffects(userColour);
  checkAnswer(currentEntry)
});

//--------------GAME FUNCTIONS------------------//

//Adds the next button press into a sequence
function nextSequence() {
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  var ranColour = buttonColours[randomNumber]
  gamePattern.push(ranColour)
  $("#level-title").text("Level " + level);
  playEffects(ranColour);
}

//Checks the user button press to the stored
function checkAnswer(level) {

  if ((gamePattern[level] == userPattern[level]) && (gamePattern.length == userPattern.length)) {
    $("#level-title").text("Congraduations");
    setTimeout(function() {
      userPattern = [];
      currentEntry = 0;
      nextSequence();
    }, 1000);
  } else if (gamePattern[level] != userPattern[level]) {
    $("#level-title").text("Failed! Press any key to try again");
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 100);
    restart();

  } else {
    currentEntry++;
  }
}

//restarts the game
function restart() {
  userPattern = [];
  gamePattern = [];
  level = 0;
  gameStarted = false;
}

//controls the effects of the buttons
function playEffects(colour) {

  $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed")
  }, 100);
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();

}
