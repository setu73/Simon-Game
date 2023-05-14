let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];

let userClickedPattern = [];

var started = false;

var level = 0;

var currentLevel = 0;

$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    //$("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  //console.log(userClickedPattern);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    //console.log("success");
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

  }
  else{
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
}
function nextSequence() {
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  level++;

  $("#level-title").text("Level " + level);


  // $("#" + randomChosenColor).on("click", function () {
  //
  //     //$("." + randomChosenColor).fadeTo(200, 0.3 ).fadeTo(200, 1);
  //     $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //
  //     var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  //     audio.play();
  //     return randomChosenColor;
  // });
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// $.(document).keydown(function(){
//   //makeSound(e.key);
//   //buttonAnimation(e.key);
//   //console.log(e);
//   console.log(e.key);
//   // if(started==False){
//   //   nextSequence();
//   //   started=True;
//   // }
//
// });



//$(".btn").click(nextSequence);
