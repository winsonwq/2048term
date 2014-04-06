var RowCalc = {
  LTR: 'ltr',
  RTL: 'rtl',
  merge: function (nums, mode) {
    var mod = mode || RowCalc.LTR;
    var newNums = [];
    var action = mod === RowCalc.RTL ? 'push' : 'unshift';

    for (var i = nums.length - 1; i >= 0; i--) {
      if (i - 1 >= 0 && nums[i] == nums[i - 1] ) {
        newNums[action](nums[i] + nums[i - 1]);
        i--;
      } else {
        newNums[action](nums[i]);
      }
    }

    var fixedZeroLength = nums.length - newNums.length;
    for (var i = 0; i < fixedZeroLength; i++) {
      newNums[action](0);
    }

    return newNums;
  }
};

module.exports = RowCalc;
