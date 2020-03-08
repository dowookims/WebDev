const express = require('express');
const { auth, controller } = require('../utils');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use('/', authMiddleware)

router.post('/', async (req, res) => {
	const request = req.body
	const post = await controller.postFile(request.title, request.text, request.userId);
	if (post){
		res.json({...post, saved: true,success: true})
	} else {
		res.json({success: false})
	}
});

router.put('/', async (req, res) => {
	const request = req.body;
	const post = {
		id: request.id,
		title: request.title,
		text: request.text,
		userId: request.userId,
	}
	const success = await controller.putFile(request.id, request.title, request.text, request.userId);
	if (success[0] === 1) {
		res.json({...post, success: true})
	} else {
		res.json({success: false})
	}
});

router.get('/', async (req, res) => {
	const clientToken = req.headers['x-access-token'];
	const decodeInfo = auth.verifyToken(clientToken);
	const fileList = await controller.readFileAll(decodeInfo.id);
	res.json(fileList)
});

module.exports = router;