// Game constants and variables

//Directions X and Y
let inputDir = { x:0,y:0};


//sounds
const moveSound = new Audio("./assets/move.wav"); 
const foodSound = new Audio("./assets/food.wav"); 
const gameOverSound = new Audio("./assets/gameo.wav"); 

//speed
let speed = 2;
let lastPaintTime = 0;


//snake
let snakeArray = [{x:9,y:9}];
let food = {x:10,y:17};

// scores
let score = 0;
let highScoreVal=0 ;

//Game functions (ctime = current time)
function main(ctime) {
        window.requestAnimationFrame(main)
        //console.log(ctime);
        if((ctime-lastPaintTime)/1000 < 1/speed){
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
}

function collide(snake) {
    for(let i =1; i<snakeArray.length ;i++) {
        if(snake[i].x === snakeArray[0].x && snake[i].y === snakeArray[0].y) {
            console.log('a collision happened');
            return true;
        }
    }

    if (snakeArray[0].x >=18 || snakeArray[0].x <=0 || snakeArray[0].y >=18 || snakeArray[0].y <=0) {
        console.log('a collision happened')
        return true;
        
    }
    return false;
}


function gameEngine() {
// part 1 what happens if the snake eats the food(updating snake and food) 
if(collide(snakeArray)) {
    gameOverSound.play();
    inputDir = { x:0, y:0};
    alert("Game Over : ( Press ctrl +r to refresh!)");
    snakeArray = [{x:13 , y:15}];
    //score = 0;
}

// if food is eaten regenerate it
if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
    foodSound.play();
    score++;
    if(score > highScoreVal) {
        highScoreVal = score;
        localStorage.setItem("highScore", JSON.stringify(highScoreVal));
        highscorebox.innerHTML =  "highScore" + highScoreVal;
    }
    scorebox.innerHTML = "Score: " + score;
    snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
    console.log(snakeArray.length)
    let a=2, b=16;
    food = { x: Math.round(a+(b-a)*Math.random()) , y: Math.round(a+(b-a)*Math.random())}
}

// moving the snake
for(let i=snakeArray.length-2 ; i>=0; i--){
    snakeArray[i+1] = {...snakeArray[i]};
}
snakeArray[0].x += inputDir.x;
snakeArray[0].y += inputDir.y;

// part 2 display the snake and food
// A) access the div in which the game is displayed
playArea.innerHTML = "";
snakeArray.forEach((e, index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

if (index === 0) {
    snakeElement.classList.add('head');
} else{
    snakeElement.classList.add('serpent');
}
playArea.appendChild(snakeElement);
    });

    // the food
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        playArea.appendChild(foodElement);

};




// Main logic using requestAnimationFrame
let highScore = localStorage.getItem("highScore");

if(highScore === null) {
    highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal))
} else {
    highScoreVal = JSON.parse(highScore);
    highscorebox.innerHTML = "High score: " + highScore
}

window.requestAnimationFrame(main);
window.addEventListener('keydown' , e => {
    inputDir = {x:0 ,y:1};
    switch (e.key) {
        case "ArrowUp":
            console.log('Arrow Up pressed!');
            inputDir.x = 0;
            inputDir.y = -1
            break;
        case "ArrowDown":
             console.log('Arrow Down pressed!');
             inputDir.x = 0;
             inputDir.y = 1
             break;
        case "ArrowLeft":
            console.log('Arrow Left pressed!');
            inputDir.x = -1;
            inputDir.y = 0;
             break;
        case "ArrowRight":
            console.log('Arrow rigth pressed!');
            inputDir.x = 1;
            inputDir.y = 0;
             break;

    }
})