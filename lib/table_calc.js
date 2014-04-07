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
      var ret = this.merge(this.transform(tableNums), TableCalc.LTR);
      return { result: this.transform(ret.result), mergedNums: ret.mergedNums };

    } else if (mod == TableCalc.BTT) {
      var ret = this.merge(this.transform(tableNums), TableCalc.RTL);
      return { result: this.transform(ret.result), mergedNums: ret.mergedNums };
    }
  },
  _merge: function (tableNums, mode) {
    var newTableNums = [];
    var mergedNums = [];

    tableNums.forEach(function (rowNums) {
      var ret = rowCalc.merge(rowNums, mode);
      newTableNums.push(ret.result);
      mergedNums.push(ret.mergedNums);
    });

    return {
      result: newTableNums,
      mergedNums: mergedNums
    };
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
