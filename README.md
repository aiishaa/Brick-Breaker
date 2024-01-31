# Brick-Breaker
### The main objective of the game is to destroy all the bricks on the screen using a paddle and a bouncing ball.


## Key Features:
### 1-Paddle:
#### • A horizontal paddle at the bottom of the screen controlled by the player.
<div> <img src="https://github.com/aiishaa/Brick-Breaker/assets/72985365/b01aed56-08f0-410e-902e-3b84029bb036" width=250 height=250 ></div>

#### • The paddle can be moved to the right or left side using the keyboard.
```
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
```
#### • The paddle is used to bounce the ball back up to break the bricks.
