const RowCalc = {
  LTR: 'ltr',
  RTL: 'rtl',
  merge: function (nums, mode) {
    var mod = mode || RowCalc.LTR;

    if (mod == RowCalc.LTR) {
      return this._ltrMerge(nums);
    } else if (mod == RowCalc.RTL){
      return this._ltrMerge(nums.reverse()).reverse();
    }
  },
  _ltrMerge: function(nums) {
    var newNums = [];
    for (var i = nums.length - 1; i >= 0; i--) {
      var num = nums[i];

      if (num == 0) continue;
      while (i - 1 >= 0 && nums[i - 1] == 0) i--;

      if (num == nums[i - 1] ) {
        newNums.unshift(num + nums[i - 1]);
        i--;
      } else {
        newNums.unshift(num);
      }
    }

    var fixedZeroLength = nums.length - newNums.length;
    for (var i = 0; i < fixedZeroLength; i++) {
      newNums.unshift(0);
    }
    
    return newNums;
  }
};

module.exports = RowCalc;
