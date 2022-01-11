/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

[1234,123,12,1,0]
longest  number = 4
iteration 3,2,1,0

first iteration => i => 3
number place longestNumber size mod  index   getDigit
1234   3     4              4    0    3       4 
123    3     4              3    1    2       3
12     3     4              2    2    1       2
1      3     4              1    3    0       1
second iteration => i => 2
number  place longestNumber size mod index getDigit
1234    2     4             4    0    2      3
123     2     4             3    1    1      2
12      2     4             2    2    0      1
1       2     4             1    3   -1      0 ('1'[-1] || 0)


*/
function getDigit(number, place, longestNumber) {
  const string = number.toString();
  const size = string.length;
  const mod = longestNumber - size;
  const index = place - mod;
  return string[index] || 0;
}

function getLongestNumberLength(array) {
  return array.reduce((prevLength, current) => {
    const currentLength = current.toString().length;
    return currentLength > prevLength ? currentLength : prevLength;
  }, 0);
}

function radixSort(array) {
  // find longest number length
  const longestNumberLength = getLongestNumberLength(array);

  // create 10 buckets, since we are doing radix sort with decimal system
  const buckets = new Array(10).fill().map(() => []);

  // if longest number' length is 4, we iterate with i => 3,2,1,0
  for (let i = longestNumberLength - 1; i >= 0; i--) {
    while (array.length) {
      // we dequeue// take the first item and put it in proper bucket
      const current = array.shift();
      buckets[getDigit(current, i, longestNumberLength)].push(current);
    }

    //we iterate through each bucket and clear out each bucket by shifting the first item untill a bucket empty
    for (let j = 0; j < buckets.length; j++) {
      while (buckets[j].length) {
        array.push(buckets[j].shift());
      }
    }
  }
  return array;
}

// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20,
      51,
      3,
      801,
      415,
      62,
      4,
      17,
      19,
      11,
      1,
      100,
      1244,
      104,
      944,
      854,
      34,
      3000,
      3001,
      1200,
      633
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1,
      3,
      4,
      11,
      17,
      19,
      20,
      34,
      51,
      62,
      100,
      104,
      415,
      633,
      801,
      854,
      944,
      1200,
      1244,
      3000,
      3001
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort((a, b) => a - b));
  });
});
