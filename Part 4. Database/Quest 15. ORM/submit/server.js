const 
	path = require('path'),
	express = require('express'),
	utils = require('./utils'),
	session = require('express-session')
	app = express(),
	{ sequelize } = require('./models')
	notepadRouter = require('./routes/notepad'),
	authRouter = require('./routes/auth'),
	userdataRouter = require('./routes/userdata');

sequelize.sync();

app.use(express.static('client'));
app.use(session({
	secret: 'vavara',
	resave: false,
	saveUninitialized: true,
}));

app.use(express.json());

app.use('/notepad', notepadRouter);
app.use('/auth', authRouter);
app.use('/userdata', userdataRouter);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(8080, () => {
	console.log('Server started!');
});
