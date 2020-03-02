const 
	path = require('path'),
	express = require('express'),
	utils = require('./utils'),
	session = require('express-session')
	app = express(),
	{ sequelize } = require('./models');

sequelize.sync();

app.use(express.static('client'));
app.use(session({
	secret: 'vavara',
	resave: false,
	saveUninitialized: true,
}));

app.use(express.json());

app.get('/list', async (req, res) => {
	if (req.session.isLogin) {
		const fileList = await utils.readFileAll(req.session.userId);
		res.json(fileList)
	} else {
		res.redirect('/');
	}
});

app.post('/notepad', (req, res) => {
	if (req.session.isLogin) {
		const isSuccess = utils.postFile(req.body.title, req.body.text, req.session.userId);
		res.json({success: isSuccess, title: req.body.title, text: req.body.text})
	} else {
		res.redirect('/');
	}
});

app.put('/notepad', async (req, res) => {
	if (req.session.isLogin) {
		const isSuccess = await utils.putFile(req.body.oldTitle, req.body.title, req.body.text);
		res.json({success: isSuccess, title: req.body.title, text: req.body.text})
	}
});

app.post('/userdata', (req, res) => {
	if (req.session.isLogin) {
		const data = req.body;
		const isSuccess = utils.saveUserdata(data.userId, data.tabs, data.selectedTab, data.cursor);
		res.json({success: isSuccess});
	}
});

app.put('/userdata', (req, res) => {
	if (req.session.isLogin) {
		const data = req.body;
		const isSuccess = utils.putUserdata(data.userId, data.tabs, data.selectedTab, data.cursor);
		res.json({success: isSuccess});
	}
})

app.get('/userdata', async (req, res) => {
	if (req.session.userId) {
		const data = await utils.readUserData(req.session.userId)
		if (data) {
			res.json({
				tabs: JSON.parse(data.dataValues.tabs),
				selectedTab: JSON.parse(data.dataValues.selectedTab),
				cursor: JSON.parse(data.dataValues.cursorLen),
				success: true,
				noState: false
			})
		} else {
			res.json({success: true, noState: true});
		}
	} else {
		res.json({success: false, isLogin: false})
	}
})

app.post('/login', async (req, res) => {
	const user = await utils.login(req.body.userId, req.body.password);
	if (user.isLogin) {
		res.cookie('sessionId', req.session.id);
		res.cookie('isLogin', user.isLogin);
		res.cookie('userId', user.userId);
		res.cookie('nickname', user.nickname);
		req.session.userId = user.userId;
		req.session.isLogin = true;
		res.json({
			isLogin: user.isLogin,
			userId: user.userId || 'error',
			username: user.nickname
		})
	} else {
		res.json({ isLogin: false })
	}
});

app.post('/logout', (req, res) => {
	req.session.destroy();
	res.cookie('isLogin', false);
	res.cookie('nickname', 'undefined');
	res.json({
		result: true,
	});
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(8080, () => {
	console.log('Server started!');
});
