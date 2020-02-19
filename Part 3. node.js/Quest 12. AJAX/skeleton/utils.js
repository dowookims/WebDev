
const path = require('path'),
    fs = require('fs'),
    notepadPath = path.join(__dirname, 'notepad');

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
        console.log(e);
        return false;
    }
};

utils.putFile = (oldName, newName, text) => {
    try {
        fs.renameSync(`${notepadPath}/${oldName}.txt`, `${notepadPath}/${newName}.txt`);
        fs.writeFileSync(`${notepadPath}/${newName}.txt`, text, 'utf-8');
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

module.exports = utils;