const express = require('express');
const utils = require('../utils');

const router = express.Router();

router.post('/', (req, res) => {
	if (req.session.isLogin) {
		const isSuccess = utils.postFile(req.body.title, req.body.text, req.session.userId);
		res.json({success: isSuccess, title: req.body.title, text: req.body.text})
	} else {
		res.redirect('/');
	}
});

router.put('/', async (req, res) => {
	if (req.session.isLogin) {
		const isSuccess = await utils.putFile(req.body.oldTitle, req.body.title, req.body.text);
		res.json({success: isSuccess, title: req.body.title, text: req.body.text})
	}
});

router.get('/', async (req, res) => {
	if (req.session.isLogin) {
		const fileList = await utils.readFileAll(req.session.userId);
		res.json(fileList)
	} else {
		res.redirect('/');
	}
});

module.exports = router;