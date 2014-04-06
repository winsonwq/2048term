const should = require('chai').should();
const rowCalc = require('../lib/row_calc');

describe('row calculator', function() {

  describe('left to right calculation', function() {

    it('could merge [0, 2] to [0, 2]', function() {
      rowCalc.merge([0, 2]).should.eql([0, 2]);
    });

    it('could merge [2, 2] to [0, 4]', function() {
      rowCalc.merge([2, 2]).should.eql([0, 4]);
    });

    it('could merge [0, 0, 2] to [0, 0, 2]', function() {
      rowCalc.merge([0, 0, 2]).should.eql([0, 0, 2]);
    });

    it('could merge [0, 2, 2] to [0, 0, 4]', function() {
      rowCalc.merge([0, 2, 2]).should.eql([0, 0, 4]);
    });

    it('could merge [2, 2, 2] to [0, 2, 4]', function() {
      rowCalc.merge([2, 2, 2]).should.eql([0, 2, 4]);
    });

    it('could merge [2, 2, 2, 2] to [0, 0, 4, 4]', function() {
      rowCalc.merge([2, 2, 2, 2]).should.eql([0, 0, 4, 4]);
    });

    it('could merge [2, 4, 2, 4] to [2, 4, 2, 4]', function() {
      rowCalc.merge([2, 4, 2, 4], rowCalc.LTR).should.eql([2, 4, 2, 4]);
    });

  });

  describe('right to left calculation', function() {

    it('could merge [0, 2] to [2, 0]', function() {
      rowCalc.merge([0, 2], rowCalc.RTL).should.eql([2, 0]);
    });

    it('could merge [2, 2, 2, 2] to [4, 4, 0, 0]', function() {
      rowCalc.merge([2, 2, 2, 2], rowCalc.RTL).should.eql([4, 4, 0, 0]);
    });

  });

});
