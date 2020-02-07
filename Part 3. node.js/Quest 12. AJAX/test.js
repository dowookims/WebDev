// var i = 0;
// var cnt = 0;
// function foo(){
//   i++;
//   if(i>20){
//     return;
//   }
//   console.log("foo", i);
//   setTimeout(()=>{
//     cnt++;
//     console.log("setTimeout", i, cnt);
//   },0);
//   process.nextTick(foo);
// }

// setTimeout(foo, 2);
// setTimeout(()=>{
//   console.log("Other setTimeout");
// }, 2);

// var i = 0;
// function foo(){
//   i++;
//   if(i>20){
//     return;
//   }
//   console.log("foo");
//   setTimeout(()=>{
//     console.log("setTimeout");
//   },0);
//   process.nextTick(foo);
// }   
// setTimeout(foo, 2);

// var i = 0;
// var start = new Date();
// function foo () {
//     i++;
//     if (i < 1000) {
//         setTimeout(foo, 0);
//     } else {
//         var end = new Date();
//         console.log("Execution time: ", (end - start));
//     }
// }
// foo();

var i = 0;
var start = new Date();
function foo () {
    i++;
    if (i < 1000) {
        setImmediate(foo);
    } else {
        var end = new Date();
        console.log("Execution time: ", (end - start));
    }
}
foo();