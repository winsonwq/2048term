const should = require('chai').should();
const tableCalc = require('../lib/table_calc');

describe('table calculation', function() {

  describe('left to right calculation', function() {

    it('could merge[[2, 0], [2, 0]] to [[0, 2], [0, 2]]', function() {
      tableCalc.merge([
          [2, 0],
          [2, 0]
        ]).result.should.eql([
          [0, 2],
          [0, 2]
        ]);
    });

    it('could merge [[2, 2, 2], [2, 0, 2], [0, 0, 2]] to [[0, 2, 4], [0, 0, 4], [0, 0, 2]]', function() {
      tableCalc.merge([
          [2, 2, 2],
          [2, 0, 2],
          [0, 0, 2]
        ], tableCalc.LTR).result.should.eql([
          [0, 2, 4],
          [0, 0, 4],
          [0, 0, 2]
        ]);
    });

  });

  describe('right to left calculation', function() {

    it('could merge[[0, 2], [0, 2]] to [[2, 0], [2, 0]]', function() {
      tableCalc.merge([
          [0, 2],
          [0, 2]
        ], tableCalc.RTL).result.should.eql([
          [2, 0],
          [2, 0]
        ]);
    });

    it('could merge [[2, 2, 2], [2, 0, 2], [0, 0, 2]] to [[4, 2, 0], [4, 0, 0], [2, 0, 0]]', function() {
      tableCalc.merge([
          [2, 2, 2],
          [2, 0, 2],
          [0, 0, 2]
        ], tableCalc.RTL).result.should.eql([
          [4, 2, 0],
          [4, 0, 0],
          [2, 0, 0]
        ]);
    });

  });

  describe('top to bottom calculation', function() {

    it('could merge [[2, 2], [0, 0] to [[0, 0], [2, 2]]', function() {
      tableCalc.merge([
          [2, 2],
          [0, 0]
        ], tableCalc.TTB).result.should.eql([
          [0, 0],
          [2, 2]
        ]);
    });

    it('could merge [[2, 2, 2], [2, 0, 2], [0, 0, 2]] to [[0, 0, 0], [0, 0, 2], [4, 2, 4]]', function() {
      tableCalc.merge([
          [2, 2, 2],
          [2, 0, 2],
          [0, 0, 2]
        ], tableCalc.TTB).result.should.eql([
          [0, 0, 0],
          [0, 0, 2],
          [4, 2, 4]
        ]);
    });

    it('should return [[2, 2], [2, 2]] while merging [[2, 2, 2], [2, 0, 2], [0, 0, 2]]', function() {
      tableCalc.merge([
          [2, 2, 2],
          [2, 0, 2],
          [0, 0, 2]
        ], tableCalc.TTB).mergedNums.should.eql([[4], [], [4]]);
    });

  });

  describe('bottom to top calculation', function() {

    it('could merge [[0, 0], [2, 2]] to [[2, 2], [0, 0]]', function() {
      tableCalc.merge([
          [0, 0],
          [2, 2]
        ], tableCalc.BTT).result.should.eql([
          [2, 2],
          [0, 0]
        ]);
    });

    it('could merge [[2, 2, 2], [2, 0, 2], [0, 0, 2]] to [[4, 2, 4], [0, 0, 2], [0, 0, 0]]', function() {
      tableCalc.merge([
          [2, 2, 2],
          [2, 0, 2],
          [0, 0, 2]
        ], tableCalc.BTT).result.should.eql([
          [4, 2, 4],
          [0, 0, 2],
          [0, 0, 0]
        ]);
    });

  });

  describe('table is same right to left calculation', function() {

    it('should be the same', function() {
      var table = [[4, 2], [0, 0]],
        new_table = tableCalc.merge(table, tableCalc.RTL);

      tableCalc.isSame(table, new_table.result).should.eql(true);
    });

    it('should not be the same', function() {
      var table = [[2, 2], [4, 4]],
        new_table = tableCalc.merge(table, tableCalc.RTL);

      tableCalc.isSame(table, new_table.result).should.eql(false);
    });

  });

  describe('table is same left to right calculation', function() {

    it('should be the same', function() {
      var table = [[4, 2], [0, 0]],
        new_table = tableCalc.merge(table, tableCalc.LTR);

      tableCalc.isSame(table, new_table.result).should.eql(true);
    });

    it('should not be the same', function() {
      var table = [[2, 2], [4, 4]],
        new_table = tableCalc.merge(table, tableCalc.LTR);

      tableCalc.isSame(table, new_table.result).should.eql(false);
    });

  });

  describe('table is same top to bottom calculation', function() {

    it('should be the same', function() {
      var table = [[4, 0], [2, 0]],
        new_table = tableCalc.merge(table, tableCalc.TTB);

      tableCalc.isSame(table, new_table.result).should.eql(true);
    });

    it('should not be the same', function() {
      var table = [[2, 4], [2, 4]],
        new_table = tableCalc.merge(table, tableCalc.TTB);

      tableCalc.isSame(table, new_table.result).should.eql(false);
    });

  });

  describe('table is same bottom to top calculation', function() {

    it('should be the same', function() {
      var table = [[4, 0], [2, 0]],
        new_table = tableCalc.merge(table, tableCalc.BTT);

      tableCalc.isSame(table, new_table.result).should.eql(true);
    });

    it('should not be the same', function() {
      var table = [[2, 4], [2, 4]],
        new_table = tableCalc.merge(table, tableCalc.BTT);

      tableCalc.isSame(table, new_table.result).should.eql(false);
    });

  });

});
