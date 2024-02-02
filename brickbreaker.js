//board variables
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

//playerbar variables
let playerWidth = 80; 
let playerHeight = 10;
let playerVelocityX = 10; 

let player = {
    x : boardWidth/2 - playerWidth/2,
    y : boardHeight - playerHeight - 5,
    width: playerWidth,
    height: playerHeight,
    velocityX : playerVelocityX
}

//ball variables
let ball_width = 10;
let ball_height = 10;
let ball_velocityX = 4;
let ball_velocityY = 2;

let ball = {
    point_x: boardWidth/2,
    point_y: boardHeight/2,
    width: ball_width,
    height: ball_height,
    ballVelocityX: ball_velocityX,
    ballVelocityY: ball_velocityY
}

//blocks variables
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8; 
let blockRows = 3; //add more as game goes on
let blockMaxRows = 10; //limit how many rows
let blockCount = 0;

//starting block corners top left 
let blockX = 15;
let blockY = 45;

//scoring variable
let score = 0;

// to handle game over
let gameOver = false;

///------------------ Functions to save and display highest score  ------------
// Add this function to update and display the highest score on the screen
function updateHighScore() {
    const currentHighScore = loadHighScore();
    localStorage.setItem("highScore", Math.max(currentHighScore, score)); //- to avoid the lower score to override the higher score  
    const highScoreElement = document.getElementById("highScore");
    highScoreElement.textContent = "Highest Score: " + loadHighScore();
}

// Add this function to save the high score in local storage - to avoid the lower score to override the higher score  
function saveHighScore() {
    const currentHighScore = loadHighScore();
    if (score > currentHighScore) {
        localStorage.setItem("highScore", score);
    }
}
// Add this function to load the high score from local storage
function loadHighScore() {
    return localStorage.getItem("highScore") || 0;
}

// Add this function to initialize the high score
function initializeHighScore() {
    if (!loadHighScore()) {
        saveHighScore();
    }
}


// -------------------------------------------------------------------------------

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); 
    initializeHighScore();
    updateHighScore();
    //draw initial player
    context.fillStyle="lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);
    // add the Mouse move eventListner
    document.addEventListener("mousemove", handleMouseMove);

    //create blocks
    createBlocks();
}

function update() {
    requestAnimationFrame(update);
    //check if the game is over -> return
    if(gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // player
    context.fillStyle = "brown";
    context.fillRect(player.x, player.y, player.width, player.height);

    // Draw the ball
    context.fillStyle = "brown";
    ball.point_x += ball.ballVelocityX;
    ball.point_y += ball.ballVelocityY;
    context.fillRect(ball.point_x, ball.point_y, ball.width, ball.height);

    // Bounce the ball off the wall
    // if the ball touch the top corner of the canvas
    if (ball.point_y <= 0) { 
        // if ball touches top of canvas
        ball.ballVelocityY *= -1; //reverse direction
    }
    else if (ball.point_x <= 0 || (ball.point_x + ball.width >= boardWidth)) {
        // if ball touches left or right of canvas
        ball.ballVelocityX *= -1; //reverse direction
    }
    else if((ball.point_y + ball.height) == boardHeight){
        //if ball touches bottom of canvas -> game over
        context.font = "20px sans-serif";
        //print the message of game over
        context.fillText("Game Over! \nPress Space to Restart.",80,400)
        //change the value of game over to true
        gameOver = true;
    }

    // Bouncing the ball off the paddle
    if (detectCollision(ball, player)) {
        ball.ballVelocityY *= -1;   // flip y direction up or down
    }
    
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
    
        if (!block.break) {
            context.fillStyle = block.color || "brown";
            context.fillRect(block.x, block.y, block.width, block.height);
    
            if (detectCollision(ball, block)) {
                handleBlockCollision(block);
            }
        }
    }

    //create new levels after breaking all block
    if(blockCount == 0){
        //adding bonus for clearing the blocks (100 point for each block)
        score+= 100*blockColumns*blockRows;
        //increase the number of rows of blocks for the next level
        blockRows = Math.min(blockRows + 1, blockMaxRows);
        //create new blocks
        createBlocks();
         //return the ball to the start position
            ball = {
                point_x: boardWidth/2,
                point_y: boardHeight/2,
                width: ball_width,
                height: ball_height,
                ballVelocityX: ball_velocityX,
                ballVelocityY: ball_velocityY
            }
    }
    context.font = "20px sans-serif";
    context.fillText(score, 10, 25);
}

function outOfBounds(xPosition) {
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}


// Function to handle collisions with blocks .
function handleBlockCollision(block) {
    if (block.color === "red") {
        block.hits--;

        if (block.hits === 0) {
            block.break = true;
            score += 200; // Score for breaking red brick
            blockCount--;
            BrickHitSound();
        } else {
            // Change the color to brown after one hit
            block.color = "brown";
            ball.ballVelocityY *= -1;
            score += 100; // Score for hitting red brick
        }
    } else {
        block.break = true;
        ball.ballVelocityY *= -1;
        score += 100; // Score for breaking brown brick
        blockCount--;
        BrickHitSound();
    }
}



function movePlayer(e) {
    //if the game is over and pressed space -> restart the game 
    if(gameOver){
        if(e.code == "Space"){
            restartGame();
        }
    }

    if (e.code == "ArrowLeft") {
        let nextplayerX = player.x - player.velocityX;
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX;
        }
    }
    else if (e.code == "ArrowRight") {
        let nextplayerX = player.x + player.velocityX;
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX;
        }
       
    }
}

function handleMouseMove(e) {
    // Update player position based on mouse x-coordinate
    const mouseX = e.clientX - board.getBoundingClientRect().left;
    const nextPlayerX = mouseX - player.width / 2;

    // Ensure the player stays within the board boundaries
    if (!outOfBounds(nextPlayerX)) {
        player.x = nextPlayerX;
    }
}

function detectCollision(my_ball, my_paddle){
    return (my_ball.point_x + my_ball.width >= my_paddle.x)  // the ball's top right corner passes the paddle's top left corner 
    && (my_ball.point_x <= my_paddle.x + my_paddle.width)  // the ball's top left corner doesn't exceed the paddle's right top corner
    && (my_ball.point_y + my_ball.height >= my_paddle.y)   // the ball's bottom left corner passes the paddle's left corner
    && (my_ball.point_y <= my_paddle.y + my_paddle.height) // the ball's top left corner doesn't exceed the paddle's bottom left corner
}


function createBlocks() {
    blockArray = [];
    for (let c = 0; c < blockColumns; c++) {
        for (let r = 0; r < blockRows; r++) {
            //make red bricks need two hits to break it
            let isRedBrick = Math.random() < 0.2; // 20% chance to be red
            let hits = isRedBrick ? 2 : 1; // Red bricks require 2 hits
            let color = isRedBrick ? "red" : "brown"; // Red bricks are red, others are brown
            let block = {
                x: blockX + c * blockWidth + c * 10,
                y: blockY + r * blockHeight + r * 10,
                width: blockWidth,
                height: blockHeight,
                break: false,
                hits: hits,
                color: color,
            };
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length;
}
//function to restart the game after gameOver
function restartGame(){
    //change the flag to false
    gameOver = false;

    //save the current score before resetting  --> HIGHESTsCORE
    saveHighScore();

    //return player to the start position 
    player = {
        x : boardWidth/2 - playerWidth/2,
        y : boardHeight - playerHeight - 5,
        width: playerWidth,
        height: playerHeight,
        velocityX : playerVelocityX
    }
    //return the ball to the start position
    ball = {
        point_x: boardWidth/2,
        point_y: boardHeight/2,
        width: ball_width,
        height: ball_height,
        ballVelocityX: ball_velocityX,
        ballVelocityY: ball_velocityY
    }
    //reset block array
    blockArray = [];
    //reset the score
    score = 0;
    //reset block
    blockRows = 3;
    //recreate blocks
    createBlocks();

    //update the displayed high score --> HIGHESTsCORE
    updateHighScore();

}

// play the brick hit sound
function BrickHitSound() {
    const brickHitSound = new Audio("brick-dropped-on-other-bricks-14722.mp3");
    brickHitSound.play();
}