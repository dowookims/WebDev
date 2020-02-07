const fs = require('fs');

fs.readFile('./a.txt', () => {
    setTimeout(() => {
        console.log('setTimeout');
    }, 0);
    setImmediate(() => {
      console.log('setImmediate');
    });
})

