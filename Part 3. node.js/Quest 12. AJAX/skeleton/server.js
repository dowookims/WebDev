const fs = require('fs'),
	path = require('path'),
	express = require('express'),
	utils = require('./utils');
	app = express();

app.use(express.static('client'));
app.use(express.json());

app.get('/list', (req, res) => {
	const fileList = utils.readFileAll();
	res.json({fileList})
})

app.post('/', (req, res) => {
	const isSuccess = utils.postFile(req.body.title, req.body.text);
	res.json({success: isSuccess, title: req.body.title, text: req.body.text})
});

app.put('/', (req, res) => {
	const isSuccess = utils.putFile(req.body.oldTitle, req.body.title, req.body.text);
	res.json({success: isSuccess, title: req.body.title, text: req.body.text})
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

const server = app.listen(8080, () => {
	console.log('Server started!');
});
