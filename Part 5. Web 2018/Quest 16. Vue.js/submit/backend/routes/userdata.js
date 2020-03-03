const express = require('express');
const utils = require('../utils');

const router = express.Router();

router.post('/', (req, res) => {
	if (req.session.isLogin) {
		const data = req.body;
		const isSuccess = utils.saveUserdata(data.userId, data.tabs, data.selectedTab, data.cursor);
		res.json({success: isSuccess});
	}
});

router.put('/', (req, res) => {
	if (req.session.isLogin) {
		const data = req.body;
		const isSuccess = utils.putUserdata(data.userId, data.tabs, data.selectedTab, data.cursor);
		res.json({success: isSuccess});
	}
})

router.get('/', async (req, res) => {
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

module.exports = router;