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
let ball_height = 10;
let ball_velocityX = 3;
let ball_velocityY = 2;

let ball = {
    point_x: boardWidth/2,
    point_y: boardHeight/2,
    width: ball_width,
    height: ball_height,
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
        // game over
    }

    // Bouncing the ball off the paddle
    if (topCollision(ball, player) || bottomCollision(ball, player)) {
        ball.ballVelocityY *= -1;   // flip y direction up or down
    }
    else if (leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.ballVelocityX *= -1;   // flip x direction left or right
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

function detectCollision(my_ball, my_paddle){
    return (my_ball.point_x + my_ball.width > my_paddle.x)  // the ball's top right corner passes the paddle's top left corner 
    && (my_ball.point_x < my_paddle.x + my_paddle.width)  // the ball's top left corner doesn't exceed the paddle's right top corner
    && (my_ball.point_y + my_ball.height > my_paddle.y)   // the ball's bottom left corner passes the paddle's left corner
    && (my_ball.point_y < my_paddle.y + my_paddle.height) // the ball's top left corner doesn't exceed the paddle's bottom left corner
}


function topCollision(my_ball, my_paddle){
    
    console.log("top");
    return detectCollision(my_ball, my_paddle) && ((my_ball.point_y + my_ball.height) >= my_paddle.y);
}

function bottomCollision(my_ball, my_paddle){
    console.log("bottom");
    return detectCollision(my_ball, my_paddle) && ((my_paddle.y + my_paddle.height) >= my_ball.point_y);
}

function leftCollision(my_ball, my_paddle){
    console.log("left");
    return detectCollision(my_ball, my_paddle) && ((my_ball.point_x + my_ball.width) >= my_paddle.x);
}

function rightCollision(my_ball, my_paddle){
    console.log("right");
    return detectCollision(my_ball, my_paddle) && (my_paddle.x + my_paddle.width) >= my_ball.point_x;
}