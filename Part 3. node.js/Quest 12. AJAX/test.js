// function resolveAfter2Seconds() {
//     console.log("starting slow promise")
//     return new Promise(resolve => {
//       setTimeout(function() {
//         resolve("slow")
//         console.log("slow promise is done")
//       }, 2000)
//     })
//   }
  
//   function resolveAfter1Second() {
//     console.log("starting fast promise")
//     return new Promise(resolve => {
//       setTimeout(function() {
//         resolve("fast")
//         console.log("fast promise is done")
//       }, 1000)
//     })
//   }
  
//   async function sequentialStart() {
//     console.log('==SEQUENTIAL START==')
  
//     // 1. Execution gets here almost instantly
//     const slow = await resolveAfter2Seconds()
//     console.log(slow) // 2. this runs 2 seconds after 1.
  
//     const fast = await resolveAfter1Second()
//     console.log(fast) // 3. this runs 3 seconds after 1.
//   }
  
//   async function concurrentStart() {
//     console.log('==CONCURRENT START with await==');
//     const slow = resolveAfter2Seconds() // starts timer immediately
//     const fast = resolveAfter1Second() // starts timer immediately
  
//     // 1. Execution gets here almost instantly
//     console.log(await slow) // 2. this runs 2 seconds after 1.
//     console.log(await fast) // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
//   }
  
//   function concurrentPromise() {
//     console.log('==CONCURRENT START with Promise.all==')
//     return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()])
//     .then((messages) => {
//       console.log(messages[0]) // slow
//       console.log(messages[1]) // fast
//     })
//   }
  
//   async function parallel() {
//     console.log('==PARALLEL with await Promise.all==')
    
//     // Start 2 "jobs" in parallel and wait for both of them to complete
//     await Promise.all([
//         (async()=>console.log(await resolveAfter2Seconds()))(),
//         (async()=>console.log(await resolveAfter1Second()))()
//     ])
//   }
  
//   // This function does not handle errors. See warning below!
//   function parallelPromise() {
//     console.log('==PARALLEL with Promise.then==')
//     resolveAfter2Seconds().then((message)=>console.log(message))
//     resolveAfter1Second().then((message)=>console.log(message))
//   }
  
//   sequentialStart() // after 2 seconds, logs "slow", then after 1 more second, "fast"
  
//   // wait above to finish
//   setTimeout(concurrentStart, 4000) // after 2 seconds, logs "slow" and then "fast"
  
//   // wait again
//   setTimeout(concurrentPromise, 7000) // same as concurrentStart
  
//   // wait again
//   setTimeout(parallel, 10000) // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"
  
//   // wait again
//   setTimeout(parallelPromise, 13000) // same as parallel

// var promiseTRSANSG = (promiseThatResolvesAfterNSecondsGenerator = function(
//     n = 0
//   ) {
//     return new Promise(function(resolve, reject) {
//       setTimeout(function() {
//         resolve({
//           resolvedAfterNSeconds: n
//         });
//       }, n * 100);
//     });
//   });
//   var promiseTRJANSG = (promiseThatRejectsAfterNSecondsGenerator = function(
//     n = 0
//   ) {
//     return new Promise(function(resolve, reject) {
//       setTimeout(function() {
//         reject({
//           rejectedAfterNSeconds: n
//         });
//       }, n * 100);
//     });
//   });

//   var promise1 = promiseTRJANSG(3);
// promise1.then(function(result) {
//   console.log("THEN",result);
// });promise1.catch(function(reason) {
//   console.log("CATCH", reason);
// });

// function executingAt() {
//     startTime = performance.now();
//     return (performance.now() - startTime) / 1000;
// };

// async function fetchUserDetailsWithStats() {
//     let i = 0;
//     for (name of ["nkgokul", "BrendanEich", "gaearon"]) {
//       i++;
//       console.log("Starting API call " + i + " at " + executingAt());
//       userDetails = await fetch("https://api.github.com/users/" + name);
//       userDetailsJSON = await userDetails.json();
//       console.log("Finished API call " + i + "at " + executingAt());
//       console.log("userDetailsJSON", userDetailsJSON);
//     }
//   }

//   fetchUserDetailsWithStats()

var fs = require('fs');
function thread(fn) {
  var gen = fn();
  function next(err, res) {
    var ret = gen.next(res);
    if (ret.done) return;
    ret.value(next);
  }
  
  next();
}
thread(function *(){
  var a = yield read('Readme.md');
  var b = yield read('package.json');
  console.log(a);
  console.log(b);
});
function read(path) {
  return function(done){
    fs.readFile(path, 'utf8', done);
  }
}