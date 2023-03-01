// Game constants and variables

//Directions X and Y
let direction = { x:0,y:0};


//sounds
const moveSound = new Audio("./assets/move.wav"); 
const foodSound = new Audio("./assets/food.wav"); 
const gameOverSound = new Audio("./assets/gameo.wav"); 

//speed
let speed = 5;
let lastPaintTime = 0;


//snake
let snakeArray = [{x:13,y:15}];
let food = {x:6,y:7};

//Game functions (ctime = current time)
function main(ctime) {
        window.requestAnimationFrame(main)
        //console.log(ctime);
        if((ctime-lastPaintTime)/1000 < 0.5){
            return;
        }
        lastPaintTime = ctime;
}




// Main logic using requestAnimationFrame
window.requestAnimationFrame(main);
window.addEventListener('keydown' , e => {
    switch (e.key) {
        case "ArrowUp":
            console.log('Arrow Up pressed!');
            break;
        case "ArrowDown":
             console.log('Arrow Down pressed!');
             break;
        case "ArrowLeft":
            console.log('Arrow Left pressed!');
             break;
        case "ArrowRight":
            console.log('Arrow rigth pressed!');
             break;

    }
})