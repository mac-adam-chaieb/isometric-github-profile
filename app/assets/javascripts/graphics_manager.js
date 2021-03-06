var Point = Isomer.Point;
var Path  = Isomer.Path;
var Shape = Isomer.Shape;
var Color = Isomer.Color;

function GraphicsManager(grid) {
  this.iso = new Isomer(document.getElementById('calendar'));
  this.grid = grid;

  this.config = {
    scale : 20,
    translation : { 
      x : -12, 
      y : 12, 
      z : 0 
    },
    boardColors : [ 
      new Color(180, 180, 180),
      new Color(210, 210, 210) 
    ],
    tileColors : [
      new Color(214, 230, 133),
      new Color(140, 198, 101),
      new Color( 68, 163,  64),
      new Color( 30, 104,  35)
    ]
  }
  
  this.dimensions = {
    x : grid.xSize,
    y : grid.ySize,
    squareSide : 0.7,
    space : 0.3,
    thickness : 0.1
  }

  this.iso.scale = this.config.scale;
};

GraphicsManager.prototype.draw = function() {
  this.drawBoard();
  this.drawTiles();
}

GraphicsManager.prototype.add = function(shape, color) {
  var config = this.config;
  return this.iso.add(
    shape.translate(
      config.translation.x,
      config.translation.y,
      config.translation.z
    ), 
    color
  );
};

GraphicsManager.prototype.drawBoard = function() {
  var dim = this.dimensions;
  var config = this.config;

  this.add(
    Shape.Prism(
      Point(
        - dim.thickness,
        - dim.thickness,
        0
      ), 
      dim.x * dim.squareSide + (dim.x + 1) * dim.space, 
      dim.y * dim.squareSide + (dim.y + 1) * dim.space, 
      dim.thickness
    ),
    config.boardColors[1]
  );

  for (var i = dim.x - 1; i >= 0; i--) {
    for (var j = dim.y - 1; j >= 0; j--) {
      this.add(
        new Path([
          Point(
            i * (dim.squareSide + dim.space) + dim.space, 
            j * (dim.squareSide + dim.space) + dim.space, 
            0
          ), 
          Point(
            (i + 1) * (dim.squareSide + dim.space),
            j    *    (dim.squareSide + dim.space) + dim.space, 
            0
          ),
          Point(
            (i + 1) * (dim.squareSide + dim.space), 
            (j + 1) * (dim.squareSide + dim.space), 
            0
          ),
          Point(
            i    *    (dim.squareSide + dim.space) + dim.space, 
            (j + 1) * (dim.squareSide + dim.space), 
            0
          )
        ]),
        config.boardColors[0]
      );
    };
  };
};

GraphicsManager.prototype.drawTile = function(tile) {
  var dim = this.dimensions;
  var config = this.config;
  if(tile)
    this.add(
      Shape.Prism(
        Point(
          tile.x * (dim.squareSide + dim.space) + dim.space,
          tile.y * (dim.squareSide + dim.space) + dim.space
        ),
        dim.squareSide, 
        dim.squareSide, 
        (tile.level + 0.1) * dim.thickness
      ), 
      this.getTileColor(tile)
    );
};

GraphicsManager.prototype.drawTiles = function() {
  var self = this;
  this.grid.eachTile(function(_, _, tile) {
    self.drawTile(tile);
  });
};

GraphicsManager.prototype.getTileColor = function(tile) {
  var max = this.grid.maxLevel;
  var level = tile.level;
  var config = this.config;
  return config.tileColors[
    Math.floor((1 - ((max - level) / max)) * (config.tileColors.length - 1))
  ];
}
