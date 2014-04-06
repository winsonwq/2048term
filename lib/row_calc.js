module.exports = {
  merge: function (nums) {
    var newNums = [];

    for (var i = nums.length - 1; i >= 0; i--) {
      if (i - 1 >= 0 && nums[i] == nums[i - 1] ) {
        newNums.unshift(nums[i] + nums[i - 1]);
        i--;
      } else {
        newNums.unshift(nums[i]);
      }
    }

    var fixedZeroLength = nums.length - newNums.length;
    for (var i = 0; i < fixedZeroLength; i++) {
      newNums.unshift(0);
    }

    return newNums;
  }
};
