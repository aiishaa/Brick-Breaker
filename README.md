# Brick-Breaker Game
This is an Interesting and Funny Game where you have to Break Bricks using the Ball and the Paddle.This Game is Also Known as "Block Breaker". When you Break a Block there is a Chance that it will Give you a Bonus. Once all the Bricks are Broken, you will Move to the Next Level!

https://github.com/aiishaa/Brick-Breaker/assets/71197108/c0c0c766-db01-4af4-bbb5-23117d57153e


# Building the Game 
<p align="center">
    <img src="https://skillicons.dev/icons?i=js,html,css" />
</p>

 1) Meeting with the Team to Discuss the Features.
 2) Agreement on Design and Colors.
 3) Building Design using HTML & CSS.
 4) Using JavaScript to add the Functionality and Movements to the Game.
 5) Day-Day Meeting to Discuss the Progress.
 
# Key Features
# 1) Paddle Move:
To Prevent the Ball from Hitting the Bottom Border.
```
function movePlayer(e) {
    //if the game is over and pressed enter -> restart the game 
    if(gameOver){
        if(e.code == "Enter"){
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
```

# 2) Collision Detection:
To Check Whether a Collision Occurred or Not.
```
function detectCollision(my_ball, my_paddle){
    return (my_ball.point_x + my_ball.width >= my_paddle.x)  // the ball's top right corner passes the paddle's top left corner 
    && (my_ball.point_x <= my_paddle.x + my_paddle.width)  // the ball's top left corner doesn't exceed the paddle's right top corner
    && (my_ball.point_y + my_ball.height >= my_paddle.y)   // the ball's bottom left corner passes the paddle's left corner
    && (my_ball.point_y <= my_paddle.y + my_paddle.height) // the ball's top left corner doesn't exceed the paddle's bottom left corner
}
```
# 3) Collision Handling & Scoring System:
If the Ball Hits Red Block, then it's color turns into Brown and must be Hitten Again to Break. Red Block = 200 point, Brown Block = 100 point.
```
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
```

# 4) Saving Progress:
To save Highest Score of all scores which user gets and Display it at Bottom Border.
```
function saveHighScore() {
    const currentHighScore = loadHighScore();
    if (score > currentHighScore) {
        localStorage.setItem("highScore", score);
    }
}

function loadHighScore() {
    return localStorage.getItem("highScore") || 0;
}
```

# 5) New Levels:
New Level Starts When all the Blocks are Hitten. By the End of  Each Level a Bonus is Added.
```
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
```

# Contributors:
- Aisha Fathy (https://github.com/aiishaa)
- Alaa Alshitany (https://github.com/alaa-alshitany)
- Nadin AbdElazim (https://github.com/NadeenAbdElazimAZ)
- Sara Eldwiny (https://github.com/Sara-Eldwiny)
- Jasmine Walid (https://github.com/jasminewalid)
