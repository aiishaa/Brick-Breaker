# Brick-Breaker Game
This is an Interesting and Funny Game where you have to Break Bricks using the Ball and the Paddle.This Game is Also Known as "Block Breaker". When you Break a Block there is a Chance that it will Give you a Bonus. Once all the Bricks are Broken, you will Move to the Next Level!


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
```function detectCollision(my_ball, my_paddle){
    return (my_ball.point_x + my_ball.width >= my_paddle.x)  // the ball's top right corner passes the paddle's top left corner 
    && (my_ball.point_x <= my_paddle.x + my_paddle.width)  // the ball's top left corner doesn't exceed the paddle's right top corner
    && (my_ball.point_y + my_ball.height >= my_paddle.y)   // the ball's bottom left corner passes the paddle's left corner
    && (my_ball.point_y <= my_paddle.y + my_paddle.height) // the ball's top left corner doesn't exceed the paddle's bottom left corner
}
```
