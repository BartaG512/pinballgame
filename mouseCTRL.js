
function MouseCTRL({ canvas, updateMouseCoordinates} ) {
  updateMouseCoordinates;
  let  rect = canvas.getBoundingClientRect();

  document.addEventListener("mousemove", function(e) {
    //get coordinates of mouse
    this.mousePos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    updateMouseCoordinates(this.mousePos);
  }.bind(this));
}
