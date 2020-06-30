const fs = require('fs');

function isFile(path) {
    let stat = fs.statSync(path);
    return stat.isFile();
}


module.exports.isFile = isFile;