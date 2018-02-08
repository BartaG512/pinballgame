function PinballGame({ setupSettings, mapWidth, mapHeight, brickPattern, wall}) {
  this.worldWidth = mapWidth;
  let worldWidth = this.worldWidth;
  this.worldHeight = mapHeight;
  let worldHeight = this.worldHeight;
  this.ballsize = setupSettings.ballsize;
  let ballAmount = setupSettings.ballAmount;
  this.shipWidth = setupSettings.shipWidth;
  this.shipHeight = setupSettings.shipHeight;
  let pattern = brickPattern;
  console.log("pattern", pattern);
  let gravity = {
    x: 0,
    y: 0.05,
  };
  this.ballVelocity = setupSettings.ballVelocity;
  const Engine = Matter.Engine;
  const Events = Matter.Events;
  const Render = Matter.Render;
  const World = Matter.World;
  const Mouse = Matter.Mouse;
//  const MouseConstraint = Matter.MouseConstraint;
  this.Bodies = Matter.Bodies;
  this.ballOnMap = 0;
  // create an engine
//  Matter.Resolver._restingThresh = 0.001;
  this.engine = Engine.create();
  this.player = {life: 3, score: 0};
  engine = this.engine;
  // create a renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: worldWidth,
      height: worldHeight,
      background: '#000',
      wireframes: false,
      showCollisions: true,
    }
  });
  //SET GRAVITY
  engine.world.gravity = gravity;

  //Create ship obj
  this.paddleStartingPos = {
    x: worldWidth / 2,
    y: worldHeight - 30
  };

  this.ship = {
    size: {w: this.shipWidth, h: this.shipHeight},
    color: "#660000",
    body: this.Bodies.rectangle(this.paddleStartingPos.x, this.paddleStartingPos.y, this.shipWidth, this.shipHeight, {
        isStatic: true,
        frictionAir : 0,
        frictionStatic: 0,
        friction: 0,
        inertia : Infinity,
        label: "Ship",
    //    chamfer: { radius: [shipHeight/6*4, shipHeight/6*4, 0, 0] },
        render: {
          fillStyle: "#660000",
        }
      }),
  };


  //create wall
  let worldWall = [
    this.Bodies.rectangle(worldWidth / 2, wall.offset, worldWidth, wall.gauge, {
      isStatic: true,
      frictionAir : 0,
      frictionStatic: 0,
      friction: 0,
      inertia : Infinity,
      label: "TOP-Border",
      render: {
       fillStyle: "#FFFFFF"
      }
    }),
    this.Bodies.rectangle(wall.offset, worldHeight / 2, wall.gauge, worldHeight,  {
      isStatic: true,
      frictionAir : 0,
      frictionStatic: 0,
      friction: 0,
      inertia : Infinity,
      label: "LEFT-Border",
      render: {
        fillStyle: "#FFFFFF"
      }
    }),
    this.Bodies.rectangle(worldWidth - wall.offset, worldHeight / 2, wall.gauge, worldHeight, {
      isStatic: true,
      frictionAir : 0,
      frictionStatic: 0,
      friction: 0,
      inertia : Infinity,
      label: "RIGHT-Border",
      render: {
        fillStyle: "#FFFFFF"
      }
     })
   ];

  this.bricks = this.buildBricks(pattern);
  //ADD SHIP AND WALLS TO THE WORLD
  World.add(engine.world, this.ship.body);
  World.add(engine.world, worldWall);
  World.add(engine.world, this.bricks);



  //CREATE BALLS
  this.balls = [];
  for (var i = 0; i < ballAmount; i++) {
    World.add(engine.world, this.addBall(worldWidth/2, worldHeight/10*7, this.ballVelocity, "white", this.ballsize, 1, false));
  }

  //ADD MOUSE
  const canvas = document.querySelector('canvas');
  this.canvas = canvas;
  this.cxt = this.canvas.getContext ("2d");
  //
  this.mouse = {
    x: 0,
    y: 0
  };

  // let mouse = Mouse.create(render.canvas);
  // let mouseConstraint = MouseConstraint.create(engine, {
  //   mouse: mouse,
  //   constraint: {
  //     //  bodyB: this.balls[0],
  //       stiffness: 1,
  //       damping: 0,
  //       render: {
  //           visible: false
  //       }
  //   }
  // });
  // World.add(engine.world, mouseConstraint);

  // ADD MOUSE
  this.mouseCTRL = new MouseCTRL({
    canvas: canvas,
    updateMouseCoordinates: (mousePos) => { this.updateMouseCoordinates(mousePos); }
  });
  const debug = document.getElementById("debug");

  // CHECK COLLOSION DEBUGGING show info on canvas
  Events.on(engine, 'beforeUpdate', function(event) {
    var engine = event.source;
    let debugBallCount = "<br>Ballonmap: " + this.ballOnMap;
    let shipPos = "<br>Ütő x: " + this.ship.body.position.x + "y: " + this.ship.body.position.y;
    //CHEKC IF BALL IS OUT OF ZONE
    let debugString = "<br>Ütő x: " + this.ship.body.position.x.toFixed(2) + "<br>y: " + this.ship.body.position.y.toFixed(2);
    let debugBalls = "";
    let debugScore = "<br>Player's score: " + this.player.score;
    // IF BALLS MOVE OUT OF AREA REMOVE
    for (var i = 0; i < this.balls.length; i++) {
      //console.log("this.balls.length", this.balls.length);
      if(Math.abs(this.balls[i].position.x) > this.worldWidthwidth || Math.abs(this.balls[i].position.y) > this.worldHeight) {
				World.remove(engine.world, this.balls[i]);
        this.balls.removeElement(this.balls[i]);
        this.ballOnMap--;

        // RESART and GAME END LOGIC
        if(this.ballOnMap === 0 && this.player.life > 0) {
          // place new ball and start
        } else {
          // game end
        }
        console.log(this.balls);
			}
    }

  // SHOW BALLS POSITION and SPEED
    for (var i = 0; i < this.balls.length; i++) {
      let x = this.balls[i].position.x;
      let y = this.balls[i].position.y;
      let velocity = Matter.Vector.magnitude(this.balls[i].velocity);
      debugBalls += "<br>Ball " + i + ":<br>y:" + y.toFixed(10) + ":<br>x:" + x.toFixed(10) + "<br>speed abs: " + velocity.toFixed(10);
      // apply random forces every 5 secs
    }
    debug.innerHTML = debugBallCount + debugScore + debugString + debugBalls;

  }.bind(this));

  Events.on(engine, 'collisionEnd', function(event) {
    var engine = event.source;
    let pairList = event.pairs;
    console.log(event.pairs);
    //Check collosion with brick
    for (var i = 0; i < pairList.length; i++) {
      //if B is brick remove it
      let bodyA = pairList[i].bodyA;
      let bodyB = pairList[i].bodyB;

      // if (bodyA.label === "Ball" && bodyB.label === "Brick") {
      //   World.remove(engine.world, pairList[i].bodyB);
      //   console.log("Első verzió");
      // }
      //if A is brick remove it
      if (bodyA.label === "Brick" && bodyB.label === "Ball") {
        World.remove(engine.world, pairList[i].bodyA);
        console.log("bodyA.point", bodyA.point);
        this.player.score += bodyA.point;
      //  Matter.Body.applyForce(bodyA,);
      // Matter.Body.setStatic(bodyA, false);
      }


      /// Check collosion
      if (bodyA.label === "Ship" && bodyB.label === "Ball") {
        let ship = bodyA;
        let ball = bodyB;
        console.log("ball position",ball.position);
        console.log("paddle position",ship.position);
        let collisionVector = Matter.Vector.sub(ball.position,ship.position);
        collisionNormalVector = Matter.Vector.normalise(collisionVector);
      //  let speed = ball.speed;
        let speed = 10;
        console.log("normalVector", collisionNormalVector);
        let ballNewVelocityVector = Matter.Vector.mult(collisionNormalVector, speed);
        Matter.Body.setVelocity(ball, ballNewVelocityVector);

      }
    }

  }.bind(this));
  // run the engine
  Engine.run(engine);
  // run the renderer
  Render.run(render);
};

 
PinballGame.prototype.startGameState = function(){
//   player life-1
  this.player.life -= 1;
  //       add new ball to the center
  let pos = {
    x: mapWidth/2,
    y: mapHeight - this.shipHeight/2 - setupSettings.ballSize / 2};

    //       set the ball fixed
  World.add(engine.world, this.addball(pos.x, pos.y, {x: 0, y:0}, "white", setupSettings.size, setupSettings.damage, true));
//       set the paddle to fixed and ignore mouse movement
//       give a vector with click (click and ball center)

//       after click
//         set the paddle to normalVector
//        set the ball to normal and give velocity of the click



};

PinballGame.prototype.addBall = function(x, y, velocity , color, size, damage, fixed) {
  let ball = this.Bodies.circle(x, y, size, {
    label : "Ball",
    density: 1,
    slop: 0,
    frictionAir : 0,
    frictionStatic: 0,
    friction: 0,
    inertia : Infinity,
    restitution: 1,
    render: {
      fillStyle: color,
    }
  });
  Matter.Body.setVelocity(ball, velocity);
  ball.damage = damage;
  this.balls.push(ball);
  this.ballOnMap++;
  if (fixed) {
    Matter.Body.setStatic(ball, fixed);
  }
  //console.log("this.balls", this.balls);
  return ball;
};
//

PinballGame.prototype.buildBricks = function(pattern){
  let brickwall = [];
  let brickSize = { w: 50, h: 20 };

  let startpos = (this.worldWidth - brickSize.w * (pattern.length-1))/2;
  for (var i = 0; i < pattern.length; i++) {
    for (var j = 0; j < pattern[0].length; j++) {
      let color = pattern[i][j].color;
      if (pattern[i][j].exist === 1) {
        let brick = this.Bodies.rectangle(startpos + brickSize.w * i, this.worldHeight/5 + brickSize.h * j, brickSize.w, brickSize.h, {
          isStatic: true,
          label: "Brick",
          point: pattern[i][j].point,
          render: {
            fillStyle: color,
          }
        });
         brickwall.push(brick);
         console.log("hello");
      }
    }
  }
  return brickwall;

};



PinballGame.prototype.updateMouseCoordinates = function(mousePos) {
  this.mouse = {
    x: mousePos.x,
    y: mousePos.y
  };
  // let distanceX = game.balls[0].position.x - this.mouse.x;
  // let force = distanceX * 300;
  // let distanceY = game.balls[0].position.y - this.mouse.y;
  let shipBody = this.engine.world.bodies[0];
  //console.log("this.mouse.x < (this.ship.w/2), ", this.mouse.x < (this.ship.size.w/2), "ship", (this.ship.size.w / 2), "mouse.x", this.mouse.x);
  if (this.mouse.x < (this.ship.size.w/2)) {
    Matter.Body.setPosition(shipBody, {x : this.ship.size.w/2, y: this.engine.world.bodies[0].position.y});
  } else if (this.mouse.x > this.worldWidth - this.ship.size.w/2) {
    Matter.Body.setPosition(shipBody, {x : this.worldWidth - this.ship.size.w / 2, y: this.engine.world.bodies[0].position.y});
  } else {
    Matter.Body.setPosition(shipBody, {x : this.mouse.x, y : this.engine.world.bodies[0].position.y});
  }
//  //Matter.Body.setPosition(game.balls[0], {x : this.mouse.y, y : this.mouse.y}, {x: force, y: this.worldHeight - 30});
};



Array.prototype.removeElement = function(element) {
  var index = this.indexOf(element);
  if (index > -1){
    this.splice(index,1);
  }
};
