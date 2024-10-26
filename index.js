var boxColor = ["one", "two", "three", "four"];
var gamePattern = [];
var playerPattern = [];
var level = 0;
var checker = false;
var wrong = new Audio("./sounds/wrong.mp3"); 

function playSound(color) {
  var a = new Audio("./sounds/" + color + ".mp3"); a.play();
}

function animatePress(color) {
  $("#" + color).addClass("press");
  setTimeout(function () {
    $("#" + color).removeClass("press");
  }, 100);
}

function clickEffect(color) {
  $("#" + color).fadeOut(100, function () {
    $("#" + color).fadeIn();
  });
}

function blink(times) {
  $(".effect").fadeOut(100, function () {
      $(".effect").fadeIn(100, function () {
        blink(times - 1);
      });
  });
}

function startOver() {
  document.querySelector(".title").classList.remove("design");
  checker = false;
  gamePattern = [];
  level = 0;
}

function nextSequence() {
  playerPattern = [];
  $(".title").html("Level " + (++level));
  
  var a = Math.random() * 4; var randNum = Math.floor(a);
  var randColor = boxColor[randNum];
  gamePattern.push(randColor);

  clickEffect(randColor); animatePress(randColor); playSound(randColor);
}

$(document).keydown(function () {
  if (!checker) {
    $("h1").text("Level " + level);
    setTimeout(function () {
      nextSequence();
    }, 500);
    checker = true;
  }
});

$(".card").on("click", function () {
  var playerColor = this.id; 
  playerPattern.push(playerColor);

  clickEffect(playerColor); animatePress(playerColor); playSound(playerColor);
  checkAnswer(playerPattern.length -1);
});

function checkAnswer(index) {
  if (playerPattern[index] === gamePattern[index]) {
    if (playerPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    wrong.play(); 
    $("body").addClass("game-over");
    document.querySelector(".title").classList.add("design");
    $(".title").text("Game Over. Press any key to restart"); blink(10);
    
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    if ($(document).keydown(function () {
      setTimeout(function () {
        startOver(); 
      }, 100);
    }));
  }
}
