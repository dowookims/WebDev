const { User, Post, UserWorkingState } = require('../models');
const auth = require('./auth')


const utils = {}

utils.readFileAll = async (userId) => {
    try {
        const res = await Post.findAll({ where: { userId }})
        return res.map(post => post.dataValues);
    } catch (e) {
        console.error(e);
        return [];
    }
};

utils.postFile = async (title, text, userId) => {
    try {
        const res = await Post.create({
            title,
            text,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        return res.dataValues;
    } catch (e) {
        console.error(e);
        return false;
    }
};

utils.putFile = async (id ,title, text, userId) => {
    try {
        const res = await Post.update({
            title, text, userId, updatedAt: new Date()
        }, {
            where: {id}
        });
        return res.dataValues;
    } catch (e) {
        console.error(e);
        return false;
    }
};

utils.saveUserdata = async (userId, tabs, selectedTab, cursor) => {

    const sTabs = JSON.stringify(tabs);
    const sstdTab = JSON.stringify(selectedTab);
    const sCursor = JSON.stringify(cursor);
    try {
        await UserWorkingState.create({
            tabs: sTabs,
            selectedTab: sstdTab,
            cursorLen: sCursor,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId
        });
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

utils.putUserdata = async (userId, tabs, selectedTab, cursor) => {
    const sTabs = JSON.stringify(tabs);
    const sstdTab = JSON.stringify(selectedTab);
    const sCursor = JSON.stringify(cursor);
    try {
        await UserWorkingState.update({
            tabs: sTabs,
            selectedTab: sstdTab,
            cursorLen: sCursor,
            updatedAt: new Date(),
        }, { where : { userId }});
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

utils.readUserData = async (userId) => {
    try {
        return await UserWorkingState.findOne({ where: { userId } })
    } catch (e) {
        console.error(e);
        return false;
    }
}

utils.login = async (userId, password) => {
    const user = await User.findOne({ where: { id: userId } });
    if (!user || user.dataValues.password !== password) {
        return {
            isLogin: false,
            success: true
        }
    } else {
        return {
            isLogin: true,
            success: true,
            userId,
            nickname: user.dataValues.nickname,
            token: auth.makeToken(userId, user.dataValues.nickname)
        }
    }
};

module.exports = utils;