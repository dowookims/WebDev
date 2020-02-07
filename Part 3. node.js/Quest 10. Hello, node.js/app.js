// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-type', 'text/plain');
//     res.end("Hello world");
// });

// server.listen(port, hostname, () => {
//     console.log(`This server running at http://${hostname}:${port}/`);
//     console.log(`THIS. global, ${__dirname}`)
// });

console.log(`- process.env: ${process.env}`);
console.log(`- process.version: ${process.version}`);
console.log(`- process.versions: ${process.versions}`);
console.log(`- process.arch: ${process.arch}`);
console.log(`- process.platform: ${process.platform}`);
console.log(`- process.uptime: ${process.uptime()}`);

process.argv.forEach((val, idx, arr) => {
    console.log(`${idx} : ${val} arr: ${arr}`)
});