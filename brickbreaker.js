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
let ball_velocityX = 5;
let ball_velocityY = 5;

let ball = {
    x: boardWidth/2,
    y: boardHeight/2,
    width: ball_width,
    heigth: ball_height,
    velocityX: ball_velocityX,
    velocityY: ball_velocityY
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

    // ball
    context.fillStyle = "white";
    context.fillRect(ball.x, ball.y, ball.width, ball.heigth);
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

