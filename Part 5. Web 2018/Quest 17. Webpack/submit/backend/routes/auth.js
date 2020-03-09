const express = require('express');
const Controller = require('../utils').controller;

const router = express.Router();

router.post('/login', async (req, res) => {
	const data = req.body.data
	const userData = await Controller.login(data.userId, data.password);
	if (userData) {
		res.json(userData)
	} else {
		res.json({ isLogin: false })
	}
});

router.post('/logout', (req, res) => {
	res.json({
		result: true,
	});
});

module.exports = router;