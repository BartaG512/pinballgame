// function GameUI() {
//   const canvas = document.querySelector('canvas');
//   const mapWidth = 300;
//   const mapHeight = 500;
//   let fps = 60;
//
//   console.log("initializationData.canvas",canvas);
//   this.game = new PinballGame({
//     canvas: canvas,
//     mapWidth: mapWidth,
//     mapHeight: mapHeight,
//     fps: fps
//   });
// }
//
// const game12 = new GameUI();
//
//
// // module aliases
//
//
// let canvas = document.querySelector('canvas');

let worldWidth = 400;
let worldHeight = 500;
let offset = 1;
//
 var Engine = Matter.Engine,
     Render = Matter.Render,
     World = Matter.World,
     Bodies = Matter.Bodies;

 // create an engine
 var engine = Engine.create();
//
 // create a renderer
 var render = Render.create({
     element: document.body,
     engine: engine,
     options: {
      width: worldWidth,
      height: worldHeight,
      background: '#fff',
      wireframes: true,
    }
 });

engine.world.gravity.x = 1;
engine.world.gravity.y = 0;

World.add(engine.world, [
   Bodies.rectangle(worldWidth / 2, worldHeight - offset, worldWidth, 1, {
     isStatic: true,
     render: {
       fillStyle: "#FFFFFF"
     }
   }),
   Bodies.rectangle(worldWidth / 2, offset, worldWidth, 1, {
     isStatic: true,
     render: {
       fillStyle: "#FFFFFF"
     }
   }),
   Bodies.rectangle(offset, worldHeight / 2, 1, worldHeight, {
     isStatic: true,
     render: {
       fillStyle: "#FFFFFF"
     }
   }),
   Bodies.rectangle(worldWidth - offset, worldHeight / 2, 1, worldHeight, {
     isStatic: true,
     render: {
       fillStyle: "#FFFFFF"
     }
   })
 ]);

 // run the engine
 Engine.run(engine);

 // run the renderer
 Render.run(render);
