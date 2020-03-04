const express = require('express');
const utils = require('../utils');

const router = express.Router();

router.post('/login', async (req, res) => {
	const data = req.body.data
	const user = await utils.login(data.userId, data.password);
	if (user.isLogin) {
		console.log("************************")
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

router.post('/logout', (req, res) => {
	req.session.destroy();
	res.cookie('isLogin', false);
	res.cookie('nickname', 'undefined');
	res.json({
		result: true,
	});
});

module.exports = router;