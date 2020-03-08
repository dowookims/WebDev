const express = require('express');
const { auth, controller } = require('../utils');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use('/', authMiddleware)

router.post('/', (req, res) => {
	const data = req.body;
	const isSuccess = controller.saveUserdata(data.userId, data.tabs, data.selectedTab, data.cursor);
	res.json({success: isSuccess});
});

router.put('/', (req, res) => {
	const data = req.body;
	const isSuccess = controller.putUserdata(data.userId, data.tabs, data.selectedTab, data.cursor);
	res.json({success: isSuccess});
})

router.get('/', async (req, res) => {
	const clientToken = req.headers['x-access-token'];
	const decodeInfo = auth.verifyToken(clientToken);
	const data = await controller.readUserData(decodeInfo.id);
	console.log(data);
	if (data) {
		res.json({
			tabs: JSON.parse(data.dataValues.tabs),
			selectedTab: JSON.parse(data.dataValues.selectedTab),
			cursor: JSON.parse(data.dataValues.cursorLen),
			success: true,
			hasState: true
		})
	} else {
		res.json({success: true, hasState: false});
	}
})

module.exports = router;