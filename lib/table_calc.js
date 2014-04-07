const rowCalc = require('./row_calc');

const TableCalc = {
  LTR: 'ltr',
  RTL: 'rtl',
  TTB: 'ttb',
  BTT: 'btt',
  merge: function (tableNums, mode) {
    var mod = mode || TableCalc.LTR;
    if (mod == TableCalc.LTR || mod == TableCalc.RTL) {
      return this._merge(tableNums, mod);
    } else if (mod == TableCalc.TTB) {
      return this.transform(this.merge(this.transform(tableNums), TableCalc.LTR));
    } else if (mod == TableCalc.BTT) { 
      return this.transform(this.merge(this.transform(tableNums), TableCalc.RTL));
    }
  },
  _merge: function (tableNums, mode) {
    var newTableNums = [];
    tableNums.forEach(function (rowNums) {
      newTableNums.push(rowCalc.merge(rowNums, mode).result);
    });
    return newTableNums;
  },
  transform: function (tableNums) {
    var newTable = [];
    tableNums.forEach(function(rowNums, rowIdx) {
      rowNums.forEach(function(num, columnIdx) {
        newTable[columnIdx] = newTable[columnIdx] || [];
        newTable[columnIdx].push(tableNums[rowIdx][columnIdx]);
      });
    });

    return newTable;
  },
  isSame: function (tableFrom, tableTo) {
    for (var i = 0; i < tableFrom.length; i++) {
      for (var j = 0; j < tableFrom[i].length; j++) {
        if (tableFrom[i][j] != tableTo[i][j]) {
          return false;
        }
      }
    }
    return true;
  }
};

module.exports = TableCalc;
