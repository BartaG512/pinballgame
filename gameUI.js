
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
  offset: -27,
  gauge: 50,
};

let setupSettings = {
  ballsize: 10,
  ballAmount: 10,
  ballVelocity: {
    x: 0,
    y: 6,
  },
  shipWidth: 140,
  shipHeight: 20,
};
let sizeX = 10;
let sizeY = 6;
let exist = 0;

let brickPattern = new Array(sizeX).fill().map(() => new Array(sizeY).fill(0)); // empty map
console.log("brickPattern", brickPattern);

for (let j = 0; j < brickPattern[0].length; j++) {
//  let randomColor =  "#" + getRandomInt(31,90).toString() +  getRandomInt(20,50).toString() + getRandomInt(70,70).toString();
  let randomColor = "rgb("+getRandomInt((j+1)*100)+","+getRandomInt(40)+","+getRandomInt(10)+")";
  for (let i = 0; i < brickPattern.length; i++) {
  brickPattern[i][j] = {};
  brickPattern[i][j].color = randomColor;
  brickPattern[i][j].point = (brickPattern[0].length - j + 1) * 10;
    brickPattern[i][j].health = j + 1;
    if ((j + i) % 2 === 0 ) {
    //  console.log("igen");
      console.log("brickPattern["+i+"["+j+"].health", brickPattern[i][j].health);
      brickPattern[i][j].exist = 1;
    } else {
    //  console.log("nem");
      brickPattern[i][j].health = 1;
      brickPattern[i][j].exist = 1;
    }
  }
}
console.log("brickPattern", brickPattern);

var game = new PinballGame( {
  setupSettings: setupSettings,
  mapHeight: 600,
  mapWidth: 900,
  brickPattern: brickPattern,
  wall: wall,
} );



function getRandomInt (max)  {
  return Math.floor (Math.random() * Math.floor (max));
}

function getRandomColor (red, green, blue) {

}
