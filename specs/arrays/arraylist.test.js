/*
  ArrayList
  
  We are going to approximate an implementation of ArrayList. In JavaScript terms, that means we are
  going to implement an array using objects. You should not use arrays at all in this exercise, just
  objects. Make a class (or constructor function; something you can call new on) called ArrayList.
  ArrayList should have the following properties (in addition to whatever properties you create):
  
  length - integer  - How many elements in the array
  push   - function - accepts a value and adds to the end of the list
  pop    - function - removes the last value in the list and returns it
  get    - function - accepts an index and returns the value at that position
  delete - function - accepts an index, removes value from list, collapses, 
                      and returns removed value

  As always, you can change describe to xdescribe to prevent the unit tests from running while
  you work
*/
// using Map
// class ArrayList {
//   // code goes here
//   constructor() {
//     this.array = new Map();
//     this.length = 0;
//   }

//   push(item) {
//     this.array.set(this.length++, item);
//   }
//   pop() {
//     if (this.length) {
//       const value = this.array.get(this.length - 1);
//       this.array.delete(this.length - 1);
//       this.length--;
//       return value;
//     }
//   }
//   get(index) {
//     return this.array.get(index);
//   }
//   delete(index) {
//     const value = this.array.get(index);
//     for (let i = index + 1; i < this.length; i++) {
//       const currentValue = this.array.get(i);
//       this.array.set(i - 1, currentValue);
//     }
//     this.pop();
//     return value;
//   }
// }

// using Literal Object
class ArrayList {
  constructor() {
    this.array = {};
    this.length = 0;
  }

  push(item) {
    this.array[this.length++] = item;
  }
  pop() {
    if (this.length) {
      const value = this.array[this.length - 1];
      delete this.array[this.length - 1];
      this.length--;
      return value;
    }
  }
  get(index) {
    return this.array[index];
  }
  delete(index) {
    if (this.length) {
      const value = this.array[index];
      for (let i = index + 1; i < this.length; i++) {
        // shift the current index value to the previous index
        // [0,1,2,3,4,5] => delete (3)=> shift 4 to 3 and 5 to 4 => [0,1,2,4,5,5]
        this.array[i - 1] = this.array[i];
      }
      // delete last one
      this.pop();
      return value;
    }
  }
}

// unit tests
// do not modify the below code
describe("ArrayList", function () {
  const range = (length) =>
    Array.apply(null, { length: length }).map(Number.call, Number);
  const abcRange = (length) =>
    range(length).map((num) => String.fromCharCode(97 + num));
  let list;

  beforeEach(() => {
    list = new ArrayList();
  });

  test("constructor", () => {
    expect(list).toEqual(expect.any(ArrayList));
  });

  test("push", () => {
    abcRange(26).map((character) => list.push(character));
    expect(list.length).toEqual(26);
  });

  test("pop", () => {
    abcRange(13).map((character) => list.push(character));
    expect(list.length).toEqual(13);
    range(10).map(() => list.pop());
    expect(list.length).toEqual(3);
    expect(list.pop()).toEqual("c");
  });

  test("get", () => {
    list.push("first");
    expect(list.get(0)).toEqual("first");
    list.push("second");
    expect(list.get(1)).toEqual("second");
    expect(list.get(0)).toEqual("first");
    abcRange(26).map((character) => list.push(character));
    expect(list.get(27)).toEqual("z");
    expect(list.get(0)).toEqual("first");
    expect(list.get(9)).toEqual("h");
    list.pop();
    expect(list.get(list.length - 1)).toEqual("y");
  });

  test("delete", () => {
    abcRange(26).map((character) => list.push(character));
    list.delete(13);
    expect(list.length).toEqual(25);
    expect(list.get(12)).toEqual("m");
    expect(list.get(13)).toEqual("o");
    list.delete(0);
    expect(list.length).toEqual(24);
    expect(list.get(0)).toEqual("b");
  });
});
