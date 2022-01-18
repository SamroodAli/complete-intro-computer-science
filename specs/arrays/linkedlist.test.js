
class LinkedList {
  constructor() {
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);
    if (!this.length) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  pop() {
    return this.delete(this.length - 1);
  }
  
  print(){
    let current = this.head
    let array =  []
    for(let i=0;i < this.length;i++){
      array.push(current.value)
      current = current.next;
    }
    console.log(array)
    return array
  }

  getNode(index) {
    if (index >= this.length) {
      return;
    }

    if (index === this.length - 1) {
      return this.tail;
    }

    let current = this.head;
    for (let i = 1; i <= index; i++) {
      //starting with 1 since we already got the head
      current = current.next;
    }
    return current;
  }

  get(index) {
    return this.getNode(index).value;
  }

  delete(index) {
    if (index >= this.length) return;

    // let deleted
    if (index === this.length - 1) {
      // deleting tail by shifting this.tail one node backward
      this.tail = this.getNode(index - 1);
      var deleted = this.tail.next.value; //deleted is the previous'        s tail's value
      delete this.tail.next;
    } else {
      const currentNode = this.getNode(index);
      var deleted = currentNode.value;
      currentNode.delete(); // updates node even if it is head
    }

    this.length--;
    return deleted; //since var is not blocked scoped, it is available here
  }

  reverse() {
    let current = this.head;
    let prev;
    let next;
    this.head = this.tail;
    this.tail = current;
    for (let i = 0;i < this.length; i++) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
  }
}


class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
  delete() {
    if (this.next) {
      this.value = this.next.value;
      this.next = this.next.next;
    } else {
      this.value = this.next = undefined;
    }
  }
}

// unit tests
// do not modify the below code
describe("LinkedList", function () {
  const range = (length) =>
    Array.apply(null, { length: length }).map(Number.call, Number);
  const abcRange = (length) =>
    range(length).map((num) => String.fromCharCode(97 + num));
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  test("constructor", () => {
    expect(list).toEqual(expect.any(LinkedList));
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
