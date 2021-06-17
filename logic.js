// Declairing Constants
const score = document.querySelector(".scores");
const pop = document.querySelector(".popUp");
const area = document.querySelector(".area");

// Creating Objects
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, };
let player = { speed: 11, score: 0 };

// Firing Click Event For The PopUp Box
pop.addEventListener('click', start);

// Creating Function to start the Game
function start() {
    area.classList.remove('hide');
    pop.classList.add('hide');

    player.start= true; // To confirm that the player is ready to play
    player.score= 0; // To set The score
    window.requestAnimationFrame(play); // Calling The function To Play The Game

    // Creating Our RoadLines
    for (l=0; l<5; l++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y= (l*150);
        roadLine.style.top = roadLine.y+"px";
        area.appendChild(roadLine);
    }

    // Creating The Car
    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    area.appendChild(car);

    // Getting The position of Car
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // Creating Our Enemy Cars
    for (l=0; l<3; l++) {
        let enemy = document.createElement('div');
        enemy.setAttribute('class', 'enemy');
        enemy.y= ((l+1)*350)*-1;
        enemy.style.top = enemy.y+"px";
        enemy.style.backgroundColor= 'red';
        enemy.style.left= Math.floor(Math.random()*350)+"px";
        area.appendChild(enemy);
    }
}

// Creating Function to play the game
function play() {
    let car = document.querySelector(".car");
    let road = area.getBoundingClientRect(); // To get all information about area

    if (player.start) {
        moveLines(); // Calling The Function to move the RoadLines
        moveEnemy(car); // Calling The Function to move Our Enemy Cars

        // Increasing the value of our Car position
        if (keys.ArrowUp && player.y > (road.top + 66)) { player.y -= player.speed };
        if (keys.ArrowDown && player.y < (road.bottom - 80)) { player.y += player.speed };
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed };
        if (keys.ArrowRight && player.x < (road.width - 54)) { player.x += player.speed };

        // Moving The Car
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(play); // Creating Function-Loop
        player.score++; // Increasing score
        score.innerText= "Score:\n"+player.score;
    }

    // Getting input from the user Through the Keyboard
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    // Creating Function for Getting input from the user
    function keyDown(e) {
        e.preventDefault();
        keys[e.key] = true;
    }

    function keyUp(e) {
        e.preventDefault();
        keys[e.key] = false;
    }

    // Animating Our RoadLines
    function moveLines(){
        let lines = document.querySelectorAll('.lines');
        lines.forEach(function(item){
            if(item.y>700){
                item.y-= 750;
            }
            item.y += player.speed;
            item.style.top= item.y+"px";
        });
    }
    
    // Moving Our Enemy Cars
    function moveEnemy(car){
        let enemy = document.querySelectorAll('.enemy');
        enemy.forEach(function(item){
            if(isCollide(car, item)){
                endGame(); // It will End The game
            }
            if(item.y>=750){
                item.y = -300;
                item.style.left= Math.floor(Math.random()*350)+"px";
            }
            item.y += player.speed;
            item.style.top= item.y+"px";
        });
    }

    // Alerting The Collidation
    function isCollide(a, b){
        aRect= a.getBoundingClientRect(); // Getting The information about The Car
        bRect= b.getBoundingClientRect(); // Getting The information about The Enemy Car

        return !((aRect.top>bRect.bottom) || (aRect.bottom<bRect.top) ||
         (aRect.left>bRect.right) || (aRect.right<bRect.left))
    }

    // Creating The function to End the Game
    function endGame(){
        player.start= false;
        score.style.color= "red";
        pop.classList.remove('hide');
        pop.innerHTML= "Game Over <br> Your Score Was "+(player.score+1)+"<br> Reload Website to restart the Game";
    }
}