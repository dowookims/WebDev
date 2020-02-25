const 
	path = require('path'),
	express = require('express'),
	utils = require('./utils'),
	session = require('express-session');
	app = express();

app.use(express.static('client'));
app.use(session({
	secret: 'knowredev',
	resave: false,
	saveUninitialized: true,
}));

app.use(express.json());

app.get('/list', (req, res) => {
	const fileList = utils.readFileAll();
	res.json(fileList)
})

app.post('/notepad', (req, res) => {
	const isSuccess = utils.postFile(req.body.title, req.body.text);
	res.json({success: isSuccess, title: req.body.title, text: req.body.text})
});

app.put('/notepad', (req, res) => {
	const isSuccess = utils.putFile(req.body.oldTitle, req.body.title, req.body.text);
	res.json({success: isSuccess, title: req.body.title, text: req.body.text})
});

app.post('/login', (req, res) => {
	const user = utils.login(req.body.userId, req.body.password);
	if (user.isLogin) {
		const sess = req.session;
		res.cookie('isLogin', user.isLogin, {
			maxAge: 60*60*1000,
			httpOnly: true
		});
		res.cookie('nickname', user.nickname, {
			maxAge: 60*60*1000,
			httpOnly: true
		})
	} else {
		res.cookie('isLogin', false);
		res.cookie('nickname', user.nickname);
	}
	res.json({
		isLogin: user.isLogin,
		username: user.nickname
	})
});

app.post('/logout', (req, res) => {
	req.session.destroy();
	res.cookie('isLogin', false);
	res.cookie('nickname', 'undefined');
	res.json({
		result: true,
	})
});

app.get('/', (req, res) => {
	console.log("COOKIE", res.cookies);
	res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(8080, () => {
	console.log('Server started!');
});
