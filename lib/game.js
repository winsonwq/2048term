const keypress = require('keypress'),
  FS = require('fs'),
  Table = require('cli-table'),
  Colors = require('colors'),
  tableCalc = require('./table_calc'),
  DIMENSION = 4;

Colors.setTheme({
  success: 'green',
  b: 'bold',
  'c2': 'white',
  'c4': 'cyan',
  'c8': 'green',
  'c16': 'blue',
  'c32': 'yellow',
  'c64': 'red',
  'c128': 'green',
  'c256': 'blue',
  'c512': 'magenta',
  'c1024': 'cyan',
  'c2048': 'rainbow',
  fail: 'red'
});

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
    this.score = 0;
    this.highestScore = this.readHighestScore();

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
  render: function(result) {
    var self = this;
    this.clear();
    var formatedTable = new Table({
      colWidths: [6, 6, 6, 6]
    });
    this.table.forEach(function(row) {
      formatedTable.push(row.map(function(num) {
        if (num == 0) {
          return ' ';
        } else if (num < 128){
          return num.toString()['c' + num];
        } else {
          return num.toString()['c' + num].b;
        }
      }));
    });

    this.output.write(formatedTable.toString() + '\n');
    this.output.write('SCORE: ' + this.score + '\n');
    this.output.write('HIGHEST SCORE: ' + this.highestScore + '\n');

    if (result.win === -2 || result.win === 1) {
      if (result.win === -2){
        self.output.write('\nGame Over!'.fail);
      } else if (result.win === 1) {
        self.output.write('\nYou Win!'.success);
      }
      this.saveScore();
      process.exit(0);
    }
  },
  clear: function() {
    this.output.write('\033[0m\033[1J');
    this.output.write('\033[0;0H');
  },
  start: function() {
    var self = this;
    self.render({ win: 0 });
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

        var ret = tableCalc.merge(self.table, mode);

        if (!tableCalc.isSame(self.table, ret.result)) {

          self.table = ret.result;
          self.updateScore(ret.mergedNums);

          var result = self.getResult();
          if (result.win === 0) {
            self.addRandomNum();
          }
          self.render(result);
        }
      }
    });
  },
  updateScore: function (mergedNums) {
    this.score += mergedNums.reduce(function (outerSofar, outerCurr) {
      return outerSofar + outerCurr.reduce(function(innerSofar, innerCurr) {
        return innerSofar + innerCurr;
      }, 0)
    }, 0);
  },
  saveScore: function () {
    if (this.score > this.highestScore) {
      var wStream = FS.createWriteStream('score.txt');
      wStream.write(this.score.toString());
    }
  },
  readHighestScore: function () {
    try { return parseInt(FS.readFileSync('score.txt').toString()); }
    catch(ex) { return 0; }
  },
  getResult: function() {
    var has2048 = this.table.filter(function (row) {
      return row.indexOf(2048) !== -1;
    }).length > 0;

    if (has2048) {
      return { win: 1 };
    }

    var notFullRowsLength = this.table.filter(function (row) {
      return row.indexOf(0) !== -1;
    }).length;

    if (notFullRowsLength > 0) {
      return { win: 0  };
    } else {

      var ltrTable = tableCalc.merge(this.table, tableCalc.LTR).result;
      if (tableCalc.isSame(ltrTable, this.table)) {

        var ttbTable = tableCalc.merge(this.table, tableCalc.TTB).result;
        if (tableCalc.isSame(ttbTable, this.table)) {
          return { win: -2 };
        } else {
          return { win: -1 };
        }
      }
    }
  }
};

function row (dimension) {
  var arr = [];
  for (var i = 0; i < dimension; i++) {
    arr.push(0);
  }
  return arr;
}
