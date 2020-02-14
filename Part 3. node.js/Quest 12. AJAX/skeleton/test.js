const fs = require('fs');
const path = require('path');

const notepadPath = path.join(__dirname, 'notepad');

const text = fs.readFileSync(`${notepadPath}/z1e.txt`,'utf-8');
const daa = fs.readdirSync(notepadPath)
console.log(daa);
console.log(text);