//Below line will result in ERROR as document object does not exist in NODE JS

//var refToTxtName = document.getElementById("txtName");

var counter = 0;
function SayHi()
{
    counter = counter + 1;
    console.log(counter);
}


//window.setInterval(SayHi, 1000);

setInterval(SayHi, 1000);
// console.log(global)