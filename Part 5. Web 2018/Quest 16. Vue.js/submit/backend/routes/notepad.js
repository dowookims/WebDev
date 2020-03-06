const express = require('express');
const Controller = require('../utils').controller;
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use('/', authMiddleware)

router.post('/', (req, res) => {
	const request = req.body
	const isSuccess = Controller.postFile(request.title, request.text, request.userId);
	res.json({success: isSuccess, title: request.title, text: request.text})
});

router.put('/', async (req, res) => {
	const request = req.body.data
	const isSuccess = await Controller.putFile(request.oldTitle, request.title, request.text);
	res.json({success: isSuccess, title: request.title, text: request.text})
});

router.get('/', async (req, res) => {
	const fileList = await Controller.readFileAll(req.session.userId);
	res.json(fileList)
});

module.exports = router;