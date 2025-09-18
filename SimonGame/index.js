var noOfBtns = document.querySelectorAll(".btn").length;
var sequence= [];
var gameStarted = false;
var currentIndex = 0;
var level = 0;


for(var i=0;i<noOfBtns;i++){
    document.querySelectorAll(".btn")[i].addEventListener("click",function(e){
        e.stopPropagation();
        if(gameStarted === true){
            var clickedBtn;
            clickedBtn = this.id;
            checkAnswer(clickedBtn);
            playSound(clickedBtn);
        }
        else{
            return;
        }
    });
};


document.addEventListener("keydown", function(){
    if (gameStarted === false) {
        gameStarted = true;
        startgame();   
    }
});

document.addEventListener("click",function(){
    if (gameStarted === false) {
        gameStarted = true;
        startgame();    
    }    
});




function startgame(){
    currentIndex = 0;
    level = 0;
    sequence = [];
    newLevel();
}

function buttonAnimation(key){
    document.querySelector("." + key).classList.add("pressed");

    setTimeout(function(){
        document.querySelector("." + key).classList.remove("pressed");
    }, 200);

};


function newLevel(){
    level++;
    document.querySelector("#level-title").textContent = "Level " + level ;
    newStep();   
    if (level === 1) {
        setTimeout(function(){
           buttonAnimation(sequence[sequence.length - 1]);
           playSound(sequence[sequence.length - 1]); 
        }, 400);      
    }
    else{
        setTimeout(function(){
            buttonAnimation(sequence[sequence.length - 1]);
            playSound(sequence[sequence.length - 1]);            
        }, 1000);
    }
}

function newStep() {
     var randomNumber = Math.floor(Math.random() * 4);

    switch(randomNumber){
        case 0 :
            sequence.push("green");
            break;
        case 1 :
            sequence.push("red");
            break;
        case 2 :
            sequence.push("yellow");
            break;
        case 3 :
            sequence.push("blue");
            break;

    };
    
}

function checkAnswer(id) {
    if (sequence[currentIndex] === id) {
        currentIndex++;
        if (currentIndex >= sequence.length) {
            newLevel();
            currentIndex = 0;            
        }        
    }
    else{
        gameover();
    }    
}

function gameover() {
    document.querySelector("#level-title").textContent = "Game Over, Press any key to restart";
    document.body.classList.add("game-over");

    setTimeout(() => {
        document.body.classList.remove("game-over");        
    }, 200);

    playSound("wrong");
    gameStarted = false;
    
}

function playSound(id) {
    var audio = new Audio("sounds/" + id + ".mp3");
    audio.play();
    
}