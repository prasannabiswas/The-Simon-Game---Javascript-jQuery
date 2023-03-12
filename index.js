var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }    
});

function nextSequence() {
    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
    
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
}

$(".btn").click( function() {
    var chosenColor = $(this).attr("id");
    userClickedPattern.push(chosenColor);

    playSound(chosenColor);
    animatePress(chosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }        
    }
    else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100);
}







