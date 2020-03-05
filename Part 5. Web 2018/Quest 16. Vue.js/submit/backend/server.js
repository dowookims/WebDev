const 
	express = require('express'),
	session = require('express-session'),
	cors = require('cors'),
	app = express(),
	{ sequelize } = require('./models')
	notepadRouter = require('./routes/notepad'),
	authRouter = require('./routes/auth'),
	userdataRouter = require('./routes/userdata');

sequelize.sync();

// change user login logic to JWT

app.use(express.static('client'));
app.use(session({
	secret: 'vavara',
	resave: false,
	saveUninitialized: false,
}));
app.use(cors());

app.use(express.json());

app.use('/notepad', notepadRouter);
app.use('/auth', authRouter);
app.use('/userdata', userdataRouter);

app.get('/', (req, res) => {
	res.status(404).json({message: 'hellow'})
});

const server = app.listen(8082, () => {
	console.log('Server started!');
});
