/*
  Write a bubble sort here
  Name the function bubbleSort
  Return the sorted array at the end
  
  To run the tests, change the `test.skip(…)` below to `test(…)`
  
  Bubble sort works by comparing two adjacent numbers next to each other and then
  swapping their places if the smaller index's value is larger than the larger
  index's. Continue looping through until all values are in ascending order
*/

class Solution {
  bubbleSort = (nums: number[]) => {
    let iterate = true;
    const result = Array.from(nums);
    while (iterate) {
      iterate = false;
      for (let i = 0; i < result.length; i++) {
        const currentNumber = result[i];
        const nextNumber =
          i + 1 !== result.length ? result[i + 1] : currentNumber;
        if (currentNumber > nextNumber) {
          iterate = true;
          result[i] = nextNumber;
          result[i + 1] = currentNumber;
        }
      }
    }
    console.log(result);
    return result;
  };
}

// do not modify the below code
test("bubble sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const sortedNums = new Solution().bubbleSort(nums);
  expect(sortedNums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
