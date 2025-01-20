var someObject = require("./Maths_V2");
// var {Add, Sub, pi, Person} = require('./Maths_V2');
//Above line is as good as:
// var someObject = {Add, Sub, pi, Person};

// console.log(someObject);
var result = someObject.Add(10, 20);
console.log(result);

console.log(someObject.pi);

var person = new someObject.Person(10, "sachin");
person.Print();
