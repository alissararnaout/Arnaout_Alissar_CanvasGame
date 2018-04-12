(() => {
  console.log('game stuff ready!');

const theCanvas = document.querySelector('canvas'),
      ctx = theCanvas.getContext('2d'),
      playerImg = document.querySelector('.ship'),

      enemy1 = document.querySelector('enemyOne'),
      enemy2 = document.querySelector('enemyTwo'),
      enemy3 = document.querySelector('enemyThree'),

      player = { x: 275, y: 550, width: 50, height: 50, speed: 15, lives: 3 },
      bullets = [];
      squares = [
        { x: 30, y: 30, x2: 30, y2: 30, image : enemy1, xspeed : 3, yspeed : 10},
        { x: 60, y: 30, x2: 40, y2 : 40, image : enemy2, xspeed : 7, yspeed : 5},
        { x: 90, y: 30, x2: 30, y2: 30, image : enemy3, xspeed : 5, yspeed : 10}
      ],
      playButton = document.querySelector('play'),
      pauseButton = document.querySelector('.pause');

var playState = true,
    score = 0;

function draw() {
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    bullets.forEach((bullet, index) => {
      ctx.fillStyle = 'rgb(0, 0, 255,)';
      ctx.fillRect(bullet.x, bullet.y, bullet.x2, bullet.y2);

      let bulletIndex = index;

      squares.forEach((square, index) => {
        //check for collision (bullt and box)

        if (bullet.y <= (square.y + square.y2) && bullet.y > square.y && bullet.x > square.x && bullet.x < (square.x + square.x2)) {
          squares.splice(index, 1);
          bullets.splice(bulletIndex);

          score += square.points;
          console.log(`Score = ${score}`);

          //play explosion souind]
          let explode = document.createElement('audio');
          explode.src = "audio/explosion.mp3";

          document.body.appendChild(explode);

          explode.addEventListener('ended', () => {
            document.body.removeChild(explode);
          });

          explode.play();

        }
        });

      bullet.y -= bullet.speed;

      //bullet is out of the playing area
      if (bullet.y < 0) {
        delete bullets[index];
      }
    });

    squares.forEach(square => {
      //ctx.fillStyle = square.color;
      ctx.drawImage(square.image, square.x, square.y, square.x2, square.y2);


      if (square.x + square.x2 > theCanvas.width) {
        square.xspeed *= -1;
      } else if (square.x < 0) {
        square.xspeed *= -1;
      }

      if (square.y + square.y2 > theCanvas.height) {
        square.yspeed *= -1;
      } else if (square.y < 0) {
        square.yspeed *= -1;
      }

      square.x += square.xspeed;
      square.y += square.yspeed;
    });

  if (playState === false) {
    window.cancelAnimationFrame(draw);
    return;
  }

    window.requestAnimationFrame(draw);
}

//function moveShip(e) {
  //debugger;
  //check the keycode of the key you're pressing
  //switch (e.keyCode) {
    //case 37:
    //console.log('move the ship left');
    //if (player.x > 0) {
    //player.x -= player.speed; //move the ship left
    //}
    //break;

    //case 39:
    //right arrow key
    //console.log('move the ship left');
    //if (player.x + player.width < theCanvas.width) {
    //player.x += player.speed; //move the ship right
    //}
    //break;

    //default:
    //do nothing
  //}

//}

function createBullet() {
  //create bullet and push in into bullet array
  let newBullet = {
    x : player.x + player.width / 2 - 2.5,
    y: theCanvas.height - player.height - 10,
    x2 : 5,
    y2 : 10,
    speed: 8
  };

  bullets.push(newBullet);

  //play cheesy laser music
  let laser = document.createElement('audio');
  laser.src = "audio/laser.mp3";
  document.body.appendChild(laser);

  laser.addEventListener('ended', () => {
    document.body.removeChild(laser);
  });

  laser.play();
}

function movePlayer(e) {
  //clientx is the mouth postion of the user
  player.x = e.clientX - theCanvas.offsetLeft;
}

function resumeGame() {
  playState = true;
  window.requestAnimationFrame(draw);
}

function pauseGame() {
  playState =  false;
}

window.requestAnimationFrame(draw);

//window.addEventListener('keydown', moveShip);
theCanvas.addEventListener('mousemove', movePlayer);
theCanvas.addEventListener('click', createBullet);

playButton.addEventListener('click', resumeGame);
pauseButton.addEventListener('click', pauseGame);
})();
