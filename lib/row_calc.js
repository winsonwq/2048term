const RowCalc = {
  LTR: 'ltr',
  RTL: 'rtl',
  merge: function (nums, mode) {
    var mod = mode || RowCalc.LTR;

    if (mod == RowCalc.LTR) {
      return this._ltrMerge(nums);
    } else if (mod == RowCalc.RTL){
      var ret = this._ltrMerge(nums.reverse());
      return { result: ret.result.reverse(), mergedNums: ret.mergedNums };
    }
  },
  _ltrMerge: function(nums) {
    var newNums = [];
    var mergedNums = [];
    for (var i = nums.length - 1; i >= 0; i--) {
      var num = nums[i];

      if (num == 0) continue;
      while (i - 1 >= 0 && nums[i - 1] == 0) i--;

      if (num == nums[i - 1] ) {
        newNums.unshift(num + nums[i - 1]);
        mergedNums.push(num + nums[i - 1]);

        i--;
      } else {
        newNums.unshift(num);
      }
    }

    var fixedZeroLength = nums.length - newNums.length;
    for (var i = 0; i < fixedZeroLength; i++) {
      newNums.unshift(0);
    }

    return {
      result: newNums,
      mergedNums: mergedNums
    };
  }
};

module.exports = RowCalc;
