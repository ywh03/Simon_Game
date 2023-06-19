var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(event){
    if(level === 0){
        started = true;
        $("#level-title").text("Level 0");
        nextSequence();
    }
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function nextSequence(){
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function(){
    if(started===true){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
    }
    else {
        console.log("Fail");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 2000);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    if(currentLevel===level-1){
        setTimeout(function(){
            nextSequence();
        }, 1000)
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern = [];
}