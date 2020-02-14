const fs = require('fs');
const path = require('path');

const notepadPath = path.join(__dirname, 'notepad');

const daa = fs.readdirSync(notepadPath)
console.log(daa);
console.log(text);