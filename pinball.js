function PinballGame({ canvas, mapWidth, mapHeight, fps }) {
  // Canvas
  this.canvas = canvas;
  this.cxt = this.canvas.getContext ("2d");
  this.canvas.width = mapWidth;
  this.canvas.height = mapHeight;
  // FPS//difficulty
  this.fps = fps;// frame per second
  // speedChangeRequest
  this.speedChangeRequest = false;

  this.mouse = {
    x: 0,
    y: 0
  };
  //Create first ball
  this.balls = [];
    for (var i = 1; i <= 7; i++) {
      this.addNewBall(mapWidth/10*i  , mapHeight/10*i, i+1, i+1, "white", 20, 1);
    }
  this.startContinueGame();

  this.ship = {
    size: {w: 100, h: 20},
    pos: {x: mapWidth/2, y: mapHeight-20},
    color: "red"
  };

  this.mouseCTRL = new MouseCTRL({
    canvas: canvas,
    updateMouseCoordinates: (mousePos) => { this.updateMouseCoordinates(mousePos); }
  });

};

PinballGame.prototype.addNewBall = function(x, y, vx, vy, color, size, damage ) {
  let ball = new Ball({
    canvas: this.canvas,
    pos: {x: x, y: y},
    velocity: {x: vx, y: vy},
    color: color,
    size: size,
    damage: damage
  });
  this.balls.push(ball);
};

PinballGame.prototype.updateMouseCoordinates = function(mousePos) {
  this.mouse = {
    x: mousePos.x,
    y: mousePos.y
  };
  console.log(this.mouse);

};

PinballGame.prototype.gameLoop = function() {
  this.clearBoard();
  this.updateGame();
  this.drawGame();
};

PinballGame.prototype.updateGame = function() {
  for (var i = 0; i < this.balls.length; i++) {
    this.balls[i].move();
  }
  // move the ball

  /// CHECK collosion
  // LEFT SIDE of the wall
  if (this.mouse.x - this.ship.size.w/2 < 0){
    this.ship.pos.x = this.ship.size.w;
  } else {
    this.ship.pos.x = this.mouse.x + this.ship.size.w/2;
  }
 // COLLOSION WITH RIGHT SIDE OF THE WALL
  if (this.mouse.x + this.ship.size.w/2 > this.canvas.width){
    this.ship.pos.x = this.canvas.width;
  }
  // CHECK BALL POSITION

};


PinballGame.prototype.pauseGame = function() {
  if (this.SessionId) {
    clearInterval(this.SessionId);
  } // pause game
  this.isRunning = false;
};

PinballGame.prototype.clearBoard = function() {
    this.cxt.clearRect (0, 0, this.canvas.width, this.canvas.height);
};

PinballGame.prototype.pauseGame = function() {
  if (this.SessionId) {
    clearInterval(this.SessionId);
  } // pause game
  this.isRunning = false;
};

PinballGame.prototype.startContinueGame = function() {
  this.SessionId = setInterval(this.gameLoop.bind(this), 1000/this.fps); // start game
};


PinballGame.prototype.drawGame = function() {
  //Set background to black
  const backgroundcolor = "rgba(0,0,0,1)";
  const cxt = this.cxt;
  cxt.fillStyle = backgroundcolor;
  cxt.fillRect (0, 0, this.canvas.width, this.canvas.height);

  //DRAW SHIP
  let fill = true;
  let radius = 0;
  cxt.fillStyle = this.ship.color;
  let rectX = this.ship.pos.x - this.ship.size.w;
  let rectY = this.ship.pos.y - this.ship.size.h;
  roundRect(cxt, rectX, rectY, this.ship.size.w, this.ship.size.h, radius, fill);
  //DRAW BALLS
  for (var i = 0; i < this.balls.length; i++) {
    //console.log("this.balls[i].pos", this.balls[i].pos);
    this.drawCircle(this.balls[i].pos.x, this.balls[i].pos.y, this.balls[i].color, this.balls[i].size);
  }
};

PinballGame.prototype.drawCircle = function(posy, posY, color, size, offset) {
  if (typeof offset === 'undefined' || !offset) var offset = 0;
  this.cxt.fillStyle = color;
  this.cxt.beginPath();
  this.cxt.arc(posy, posY, size, 0, Math.PI*2);
  this.cxt.closePath();
  this.cxt.fill();
};

//
// PinballGame.prototype.endGame = function() {
//   if (this.SessionId) {
//     clearInterval(this.SessionId);
//   } // pause game
// };
