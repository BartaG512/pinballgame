
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

//
//
// // module aliases
//
//
// let canvas = document.querySelector('canvas');
let wall = {
  offset: -25,
  gauge: 50,
};

let setupSettings = {
  ballsize: 10,
  ballAmount: 1,
  ballVelocity: {
    x: 0,
    y: -1,
  },
  shipWidth: 400,
  shipHeight: 20,
};
let sizeX = 10;
let sizeY = 6;
let exist = 0;

let brickPattern = new Array(sizeX).fill().map(() => new Array(sizeY).fill(0)); // empty map
console.log("brickPattern", brickPattern);

for (let i = 0; i < brickPattern.length; i++) {
  for (let j = 0; j < brickPattern[0].length; j++) {
    if ((j + i) % 2 === 0 ) {
      brickPattern[i][j] = {};
    //  console.log("igen");
      brickPattern[i][j].health = 1;
      brickPattern[i][j].exist = 1;
    } else {
    //  console.log("nem");
      brickPattern[i][j] = {};
      brickPattern[i][j].health = 1;
      brickPattern[i][j].exist = 1;
    }
  }
}
console.log("brickPattern", brickPattern);

var game = new PinballGame( {
  setupSettings: setupSettings,
  mapHeight: 600,
  mapWidth: 400,
  brickPattern: brickPattern,
  wall: wall,
} );
