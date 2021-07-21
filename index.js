
var buttonsArray = ["blue", "green", "red", "yellow"];
// will compare these two arrays to check if player answers are correct
var generatedColor = []; // pushes the randomly generatedColor here
var playerInput = []; // pushes the playerInput here
var level = 0;


// Start Game
$(document).keydown(function(event) {
  if (event.which === 65 && level === 0) {
    nextSequence();
  }
});


// Generates random button
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * buttonsArray.length);
  var randomColor = buttonsArray[randomNumber];
  generatedColor.push(randomColor);
  console.log("New Random Color: " + randomColor);
  console.log(generatedColor);

  playSound(randomColor);
  playAnimation(randomColor);

  level++;
  $("h1").text("Level " + level);
};


// Player Input
$(".btn").click(function() {
  // gets the id of the button the player clicked
  var clickedButton = $(this).attr("id");
  // adds the id to the playerInput array
  playerInput.push(clickedButton);

  playSound(clickedButton);
  playerInputAnimation(clickedButton);

  // Checks the player answer against the generatedColor array, every time they click a button.
  checkAnswer(playerInput.length - 1);

});


// Checks Answer
function checkAnswer(currenLevel) {
  // if last pushed player value is equal its corresponding generatedColor value, in the array
  if (playerInput[currenLevel] === generatedColor[currenLevel]) {
    // then check if both arrays have the same length, or wait until they do
    if (playerInput.length === generatedColor.length) {
      // trigger next sequence after 1 second
      setTimeout(nextSequence, 1000);
      playerInput = []; // resets the playerInput array
      console.log("Correct Answer");
    }
  } else {
    gameOver();
    restartGame();
    console.log("Wrong Answer!!!");
  }
};


// Handles GameOver
function gameOver() {
  var wrongAudio = new Audio("sounds/wrong.mp3");
  wrongAudio.play();

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);

  $("h1").text("GameOver, Press Any Key to Restart");
};

// Handles Restart Game
function restartGame() {
  $("body").keypress(function() {
    location.reload();
  });
}

// Plays Sounds
function playSound(generatedColor) {
  var audio = new Audio("sounds/" + generatedColor + ".mp3");
  audio.play();
};

// Player Input Buttons Animations
function playerInputAnimation(clickedButton) {
  $("#" + clickedButton).addClass("pressed")
  setTimeout(function() {
    $("#" + clickedButton).removeClass("pressed");
  }, 30);
};

// Random Generated Buttons Animations
function playAnimation(generatedColor) {
  $("#" + generatedColor).fadeIn(100).fadeOut(100).fadeIn(100);
};
