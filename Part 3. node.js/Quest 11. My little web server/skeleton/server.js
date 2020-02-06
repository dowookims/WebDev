const http = require('http');
const url = require('url');
const qs = require('querystring');

http.createServer((req, res) => {
	// TODO: 이 곳을 채워넣으세요..!
	req.on('connect', (req, cs, head) => {
		console.log(head)
	});
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	const parseObject = url.parse(req.url);
	const pathName = parseObject.pathname;
	if (pathName === '/foo') {
		let queryTexts = qs.parse(parseObject.query);

		if (!queryTexts.bar) queryTexts.bar = '';

		if (req.method === 'GET' || req.method === 'POST') {
			res.end(`HELLO, ${queryTexts.bar}`);
		};
	}
	else {
		res.end("HELLO WORLD");
	}
}).listen(8080);
