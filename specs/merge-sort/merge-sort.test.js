/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const merge = (lhs, rhs) => {
  const result = [];

  while (lhs.length && rhs.length) {
    if (lhs[0] > rhs[0]) {
      result.push(rhs.shift());
    } else {
      result.push(lhs.shift());
    }
  }

  if (lhs.length) {
    return result.concat(lhs);
  } else if (rhs.length) {
    return result.concat(rhs);
  }
  return result;
};

const mergeSort = (nums) => {
  // code goes here
  if (!Array.isArray(nums)) {
    throw new Error("merge Sort expects an array", `argument: ${nums}`);
  }
  if (nums.length <= 1) {
    return nums;
  }

  const lhs = nums.slice(0, nums.length / 2);
  const rhs = nums.slice(nums.length / 2, nums.length);

  return merge(mergeSort(lhs), mergeSort(rhs));
};

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
