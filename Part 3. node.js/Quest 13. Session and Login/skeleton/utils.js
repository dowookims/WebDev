
const path = require('path'),
    fs = require('fs'),
    notepadPath = path.join(__dirname, 'notepad'),
    userInfoPath = path.join(__dirname, 'users');

const utils = {}

utils.readFileAll = () => {
    let fileList = [];
	fs.readdirSync(notepadPath).forEach(file => {
		fileList.push({
			title: file.split('.')[0],
            text: fileList.text = fs.readFileSync(`${notepadPath}/${file}`, 'utf-8'),
            saved: true,
            originName: file.split('.')[0]
		})
    })
    return fileList
};

utils.readFile = (fileName) => {
    const selectedFilelName = fs.readdirSync(notepadPath).filter(file => fileName === file.split('.')[0]);
    const fileText = fs.readFileSync(`${notepadPath}/${file}`, 'utf-8');
    return {title: selectedFilelName, text: fileText};
};

utils.postFile = (fileName, text) => {
    try {
        fs.writeFileSync(`${notepadPath}/${fileName}.txt`, text, 'utf-8');
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

utils.putFile = (oldName, newName, text) => {
    try {
        fs.renameSync(`${notepadPath}/${oldName}.txt`, `${notepadPath}/${newName}.txt`);
        fs.writeFileSync(`${notepadPath}/${newName}.txt`, text, 'utf-8');
        return true;
    } catch (e) {
        return false;
    }
};

utils.saveUserdata = (userId, tabs, selectedTab, cursor) => {
    const sTabs = JSON.stringify(tabs);
    const sstdTab = JSON.stringify(selectedTab);
    const sCursor = JSON.stringify(cursor);
    const data = `${sTabs}|||${sstdTab}|||${sCursor}`
    try {
        fs.writeFileSync(`${userInfoPath}/${userId}.txt`, data, 'utf-8');
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};

utils.readUserData = (userId) => {
    try {
        const data = fs.readFileSync(`${userInfoPath}/${userId}.txt`, 'utf-8');
        return data.split('|||').map(d => JSON.parse(d))
    } catch (e) {
        if (e.errno === -2) {
            return {};
        }
        console.error(e);
        return false;
    }
}

utils.login = (userId, password) => {
    const user = {
        knowre: {
            password: 'dev',
            nickname: 'cool'
        },
        dowoo: {
            password: 'kim',
            nickname: 'hot'
        },
        fastfive: {
            password:'6th',
            nickname: 'fantastic'
        }
    }
    if (user[userId]) {
        if (user[userId].password === password){
            return {
                userId: userId,
                nickname: user[userId].nickname,
                isLogin: true
            }
        }
    };
    return {
        nickname: 'error',
        isLogin: false
    };
};

module.exports = utils;