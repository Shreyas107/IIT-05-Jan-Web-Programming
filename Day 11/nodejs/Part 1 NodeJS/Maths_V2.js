function Add(x, y) {
  return x + y;
}

function Sub(x, y) {
  return x - y;
}

// const or variable
var pi = 3.14;

// class
class Person {
  constructor(no, name) {
    this.No = no;
    this.Name = name;
  }

  Print() {
    console.log(this.No + this.Name);
  }
}

module.exports = { Add, Sub, pi, Person };
