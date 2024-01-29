//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context; 

//playerbar
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

let ball_width = 10;
let ball_length = 10;
let ball_velocityX = 3;
let ball_velocityY = 2;

let ball = {
    point_x: boardWidth/2,
    point_y: boardHeight/2,
    width: ball_width,
    length: ball_length,
    ballVelocityX: ball_velocityX,
    ballVelocityY: ball_velocityY
}

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); 

    //draw initial player
    context.fillStyle="lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    // Draw the ball
    context.fillStyle = "white";
    ball.point_x += ball.ballVelocityX;
    ball.point_y += ball.ballVelocityY;
    context.fillRect(ball.point_x, ball.point_y, ball.width, ball.length);

    // Bounce the ball off the wall
    
    // if the ball touch the top corner of the canvas
    if (ball.point_y == 0) { 
        // if ball touches top of canvas
        ball.ballVelocityY *= -1; //reverse direction
    }
    else if (ball.point_x == 0 || (ball.point_x + ball.width == boardWidth)) {
        // if ball touches left or right of canvas
        ball.ballVelocityX *= -1; //reverse direction
    }
    else if((ball.point_y + ball.length) == boardHeight){
        // game over
    }
}

function outOfBounds(xPosition) {
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

function movePlayer(e) {
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

