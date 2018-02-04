function PinballGame({ mapWidth, mapHeight }) {
  this.worldWidth = mapWidth;
  let worldWidth = this.worldWidth;
  this.worldHeight = mapHeight;
  let worldHeight = this.worldHeight;
  let offset = 5;
  let gauge = 30;
  let ballsize = 40;
  const Engine = Matter.Engine;
  const Events = Matter.Events;
  const Render = Matter.Render;
  const World = Matter.World;
  const Mouse = Matter.Mouse;
  const MouseConstraint = Matter.MouseConstraint;
  this.Bodies = Matter.Bodies;
  // create an engine
  this.engine = Engine.create();
  engine = this.engine;
  // create a renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: worldWidth,
      height: worldHeight,
      background: '#fffff',
      wireframes: false,
    }
  });

  engine.world.gravity.x = 0.0;
  engine.world.gravity.y = 0.0;


    this.ship = {
      size: {w: 100, h: 50},
      pos: {x: mapWidth/2, y: mapHeight-20},
      color: "#ff0000"
    };


  World.add(engine.world, [

    //SHIP
     this.Bodies.rectangle(worldWidth / 2, worldHeight - 30, this.ship.size.w, this.ship.size.h, {
       isStatic: true,
       label: "Bottom-Border",
       chamfer: { radius: [40, 40, 0, 0] },
       render: {
         fillStyle: this.ship.color,
       }
     }),
     // CREATE BORDERS
     this.Bodies.rectangle(worldWidth / 2, offset, worldWidth, gauge, {
       isStatic: true,
       label: "TOP-Border",
       render: {
         fillStyle: "#FFFFFF"
       }
     }),
     this.Bodies.rectangle(offset, worldHeight / 2, gauge, worldHeight,  {
       isStatic: true,
       label: "LEFT-Border",
       render: {
         fillStyle: "#FFFFFF"
       }
     }),
     this.Bodies.rectangle(worldWidth - offset, worldHeight / 2, gauge, worldHeight, {
       isStatic: true,
       label: "RIGHT-Border",
       render: {
         fillStyle: "#FFFFFF"
       }
     })

  ]);
  //CREATE BALLS
  this.balls = [];
  for (var i = 1; i <= 2; i++) {
    World.add(engine.world, this.addNewBall(worldWidth/2, worldHeight/2, i+1, i+1, "white", ballsize, 1));
  }
  console.log("engine.world",engine.world);

  const canvas = document.querySelector('canvas');
  this.canvas = canvas;
  this.cxt = this.canvas.getContext ("2d");
  //
  this.mouse = {
    x: 0,
    y: 0
  };

  let mouse = Mouse.create(render.canvas);
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      //  bodyB: this.balls[0],
        stiffness: 1,
        damping: 0,
        render: {
            visible: false
        }
    }
  });

  World.add(engine.world, mouseConstraint);

  //World.add(engine.world, mouseConstraint);
  // keep the mouse in sync with rendering
  //render.mouse = mouse;

  this.mouseCTRL = new MouseCTRL({
    canvas: canvas,
    updateMouseCoordinates: (mousePos) => { this.updateMouseCoordinates(mousePos); }
  });
  const debug = document.getElementById("debug");

  Events.on(engine, 'beforeUpdate', function(event) {
      var engine = event.source;
      let shipPos = "Ütő x: " + game.engine.world.bodies[0].position.x + "y: " + game.engine.world.bodies[0].position.y;
      let ball = {};
      let x = game.engine.world.bodies[5].position.x;
      let y = game.engine.world.bodies[5].position.y;
      let velocity = Matter.Vector.magnitude(game.engine.world.bodies[5].velocity);
      let debugString = "Ütő x: " + x + "y: " + y +"<br>speed abs :"+ velocity;
      debug.innerHTML = debugString;
      // apply random forces every 5 secs
  });
  // run the engine
  Engine.run(engine);
  // run the renderer
  Render.run(render);


};





PinballGame.prototype.addNewBall = function(x, y, vx, vy, color, size, damage ) {
  let ball = this.Bodies.circle(x, y, size, {
    density: 0.0012,
    frictionAir : 0.0,
    frictionStatic: 0,
    friction: 0,
    inertia : Infinity,
    restitution: 1,
    render: {
      fillStyle: color,
    }
  });
  Matter.Body.setVelocity(ball, {x: 0, y: 10});
  ball.damage = damage;
  this.balls.push(ball);
  console.log("this.balls", this.balls);
  return ball;
};
//
PinballGame.prototype.updateMouseCoordinates = function(mousePos) {
  this.mouse = {
    x: mousePos.x,
    y: mousePos.y
  };
  let distanceX = game.balls[0].position.x - this.mouse.x;
  let force = distanceX * 300;
  let distanceY = game.balls[0].position.y - this.mouse.y;
  let shipBody = this.engine.world.bodies[0];
  console.log("this.mouse.x < (this.ship.w/2), ", this.mouse.x < (this.ship.size.w/2), "ship", (this.ship.size.w / 2), "mouse.x", this.mouse.x);
  if (this.mouse.x < (this.ship.size.w/2)) {
    Matter.Body.setPosition(shipBody, {x : this.ship.size.w/2, y: this.engine.world.bodies[0].position.y});
  } else if (this.mouse.x > this.worldWidth - this.ship.size.w/2) {
    Matter.Body.setPosition(shipBody, {x : this.worldWidth - this.ship.size.w / 2, y: this.engine.world.bodies[0].position.y});
  } else {
    Matter.Body.setPosition(shipBody, {x : this.mouse.x, y : this.engine.world.bodies[0].position.y});
  }
//  //Matter.Body.setPosition(game.balls[0], {x : this.mouse.y, y : this.mouse.y}, {x: force, y: this.worldHeight - 30});
};
