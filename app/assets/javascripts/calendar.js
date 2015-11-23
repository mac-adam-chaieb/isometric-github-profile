function Calendar(debugMode) {
  if(debugMode == true)
    debug = this;
  this.grid = new Grid(52, 7);
  this.graphicsManager = new GraphicsManager(this.grid);
  this.graphicsManager.drawBoard();
  this.graphicsManager.drawTiles();
};

/*
  Resets the calendar state. This prevents having to create multiple Calendar objects.
*/
Calendar.prototype.reset = function() {
  this.grid = new Grid(52, 7);
  this.graphicsManager.drawBoard();
  this.graphicsManager.drawTiles();
}