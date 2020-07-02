const fs = require('fs');

function isFile(path) {
    let stat = fs.statSync(path);
    return stat.isFile();
}

function isDir(path) {
    let stat = fs.statSync(path);
    return stat.isDirectory();
}

function isExist(path) {
    return fs.existsSync(path)
}


module.exports.isFile = isFile;
module.exports.isDir = isDir;
module.exports.isExist = isExist;

