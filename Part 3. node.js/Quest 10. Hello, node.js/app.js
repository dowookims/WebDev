const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end("Hello world");
});

server.listen(port, hostname, () => {
    console.log(`This server running at http://${hostname}:${port}/`);
    console.log(`THIS. global, ${__dirname}`)
});