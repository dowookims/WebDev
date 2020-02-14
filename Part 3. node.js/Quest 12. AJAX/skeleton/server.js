const fs = require('fs'),
	path = require('path'),
	express = require('express'),
	app = express();

const notepadPath = path.join(__dirname, 'notepad');


app.use(express.static('client'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/list', (req, res) => {
	let fileList = []
	fs.readdirSync(notepadPath).forEach(file => {
		fileList.push({
			title: file.split('.')[0],
			text: fileList.text = fs.readFileSync(`${notepadPath}/${file}`, 'utf-8')
		})
	})
	res.json({fileList})
})

app.post('/', (req, res) => {
	fs.writeFile(`${notepadPath}/${req.body.name}.txt`, req.body.text, (err) => {
		console.log(err);
	})
	res.json({wow: 'good'})
});

app.patch('/', (req, res) => {
	res.end("PAAAAtch")
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

const server = app.listen(8080, () => {
	console.log('Server started!');
});
