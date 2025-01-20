//----------Demo 1
// var SayHi = require("./1.functionExport");
// //above statement is as good as:

// // var SayHi =  function ()
// //             {
// //                 console.log("hi");
// //             }

// console.log(SayHi);

// SayHi();

//----------Demo 2
var exportedContent = require("./2.customkey");
var { Sub, Mult } = require("./2.customkey");
console.log(exportedContent);

var result1 = exportedContent.addition(20, 30);
console.log(result1);

var result2 = exportedContent.Sub(20, 30);
console.log(result2);

console.log(Sub);
var result1 = Sub(10, 20);
console.log(result1);

console.log(Mult);
var result2 = Mult(10, 20);
console.log(result2);

//---------Demo 3
var Maths = require("./3.classExport");
console.log(Maths);

var mObject = new Maths();

var result = mObject.Add(10, 20);
console.log(result);

// //---------Demo 4
var mObject = require("./4.instanceExport");
var result3 = mObject.Add(40, 50);
console.log(result3);
