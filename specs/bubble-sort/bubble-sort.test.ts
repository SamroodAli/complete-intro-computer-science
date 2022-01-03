/*
  Write a bubble sort here
  Name the function bubbleSort
  Return the sorted array at the end
  
  To run the tests, change the `test.skip(…)` below to `test(…)`
  
  Bubble sort works by comparing two adjacent numbers next to each other and then
  swapping their places if the smaller index's value is larger than the larger
  index's. Continue looping through until all values are in ascending order
*/

/**
 * Worst case
 * S -> O(N) since I chose to create a new copy of the array
 * T -> O(N^2) since there is an outer while loop and an inner for loop which both could iterate as much as N
 * Best Case
 * sorted Loop
 * S -> O(N)
 * T -> O(N)  since it would be swapped in the first try and the outer while loop would only run once. N comes from the inner loop which will run once from one to N
 */

class Solution {
  bubbleSort = (nums: number[]) => {
    let swapped = false;
    let iterations = 0;
    do {
      swapped = false;
      for (let i = 0; i < nums.length - iterations; i++) {
        if (nums[i] > nums[i + 1]) {
          const temp = nums[i];
          nums[i] = nums[i + 1];
          nums[i + 1] = temp;
          swapped = true;
        }
      }
      iterations += 1;
    } while (swapped);
    return nums;
  };
}

// do not modify the below code
test("bubble sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const sortedNums = new Solution().bubbleSort(nums);
  expect(sortedNums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
