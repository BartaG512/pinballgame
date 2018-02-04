function Ball({canvas, pos, velocity, color, size, damage }) {
  this.canvas = canvas;
  this.pos = pos;
  this.velocity = velocity;
  this.color = color;
  this.size = size;
  this.damage = damage;
}

Ball.prototype.move = function() {
  //TOP
  if(this.pos.y - this.size < 0) {
    this.velocity.y = this.velocity.y *-1;
    //this.velocity.x = this.velocity.x ;
  }
  //LEFT
  if(this.pos.x - this.size < 0) {
  //  this.velocity.y = this.velocity.y *-1;
    this.velocity.x = this.velocity.x *-1 ;
  }
  // RIGHT
  if(this.pos.x + this.size > this.canvas.width) {
//    this.velocity.y = this.velocity.y *-1;
    this.velocity.x = this.velocity.x *-1 ;
  }
  // BOTTOM
  if(this.pos.y + this.size > this.canvas.height) {
  this.velocity.y = this.velocity.y *-1 ;
  //  this.velocity.x = this.velocity.x *-1;
  }
  let acceleration = 0;
  let friction = 1/1000;
  this.velocity.x += acceleration - this.velocity.x * friction;
  this.velocity.y += acceleration - this.velocity.y * friction;
  this.pos.x += this.velocity.x;
  this.pos.y += this.velocity.y;
};
