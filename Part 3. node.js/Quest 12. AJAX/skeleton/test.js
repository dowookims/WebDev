const path = require('path'),
    fs = require('fs'),
    notepadPath = path.join(__dirname, 'notepad');

const putFile = (newName, oldName, text) => {
    try {
        fs.renameSync(`${notepadPath}/${oldName}.txt`, `${notepadPath}/${newName}.txt`);
        fs.writeFileSync(`${notepadPath}/${newName}.txt`, text, 'utf-8');
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

putFile("pos2", "pos", "kakaki");