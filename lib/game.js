const keypress = require('keypress');

const tableCalc = require('./table_calc');
const DIMENSION = 4;

module.exports = Game;
function Game(input, output) {
  this.dimension = DIMENSION;
  this.init(input, output);
}

Game.prototype = {
  constructor: Game,
  init: function (input, output) {
    this.input = input;
    this.output = output;
    this.table = [];

    for (var i = 0; i < this.dimension; i++) {
      this.table.push(row(this.dimension));
    }

    this.addRandomNum();
    this.addRandomNum();

    keypress(this.input);
  },
  nextPosition: function() {
    var x = parseInt(Math.random() * this.dimension);
    var y = parseInt(Math.random() * this.dimension);

    if (!this.table[x][y]) {
      return { x: x, y: y };
    }

    return this.nextPosition();
  },
  addRandomNum: function() {
    var pos = this.nextPosition();
    this.table[pos.x][pos.y] = 2;
  },
  render: function() {
    this.table.forEach(function(row) {
      console.log(row);
    });
  },
  start: function() {
    var self = this;
    self.render();
    this.input.on('keypress', function(ch, key) {
      if (key.name == 'up' || key.name == 'down' || key.name == 'left' || key.name == 'right') {
        var mode;
        switch (key.name) {
          case 'up':
            mode = tableCalc.BTT;
            break;
          case 'down':
            mode = tableCalc.TTB;
            break;
          case 'left':
            mode = tableCalc.RTL;
            break;
          case 'right':
            mode = tableCalc.LTR;
            break;
        };
        self.table = tableCalc.merge(self.table, mode);
        self.addRandomNum();
        self.render();
      }
    });
  }
};

function row (dimension) {
  var arr = [];
  for (var i = 0; i < dimension; i++) {
    arr.push(0);
  }
  return arr;
}
