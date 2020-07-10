var ipfs = require('./ipfsConnection');
var sProrocol = require('./serverProtocol');
var wsConn = require('./wsConnect');
const fs = require('fs');
const cryptoRandomString = require('crypto-random-string');

// function isRightParamCount(params) {
//     switch (cmd) {
//         case 'add':
//             console.log('usage: add [filepath]');
//             break;
//         case 'get':
//             console.log('usage: get [cid] [localpath]');
//             break;
//         }
// }


function printCmdHelp(cmd) {
    switch (cmd) {
        case 'create':
            console.log('usage: create [filepath]');
            break;
        case 'add':
            console.log('usage: add [filepath]');
            break;
        case 'get':
            console.log('usage: get [sectorid] [localpath]');
            break;
        case 'challenge':
            console.log('usage: challenge sectorid');
            break;
            }
}

async function doCreate(path) {
    let size = 1016;
    let fd = fs.openSync(path, 'w');
    let randStr = cryptoRandomString({length: size});
    fs.writeSync(fd, randStr);
    fs.closeSync(fd);
    console.log('create random file successful');
    console.log('filepath:' + path + ', size:' + size);
}

async function doAdd(filepath) {
    let fileinfo = await ipfs.add(filepath);
    if (fileinfo == null) {
        throw new TypeError('add file to ipfs fail');
    }

    console.log(fileinfo.cid.toString());

    err = sProrocol.add(fileinfo.cid.toString(), fileinfo.size);
}

async function doGet(sectorid, filepath) {
    wsConn.setSavePath(filepath);
    console.log('ipfs get ' + sectorid + ', ' + filepath);
    return sProrocol.get(sectorid);
}

async function doChallenge(sectorid) {
    return sProrocol.challenge(sectorid);
}

function onInput(params) {
    switch (params[0]) {
        case 'create':
            if (params.length != 2) {
                printCmdHelp(params[0]);
            } else {
                let err = doCreate(params[1]);
            }
            break;
        case 'add':
            if (params.length != 2) {
                printCmdHelp(params[0]);
            } else {
                let err = doAdd(params[1]);
            }
            break;
        case 'get':
            if (params.length != 3) {
                printCmdHelp(params[0]);
            } else {
                let err = doGet(params[1], params[2]);
            }
            break;
        case 'challenge':
            if (params.length != 2) {
                printCmdHelp(params[0]);
            } else {
                let err = doChallenge(params[1]);
            }
            break;
        default:
            console.log('invalid command!');
            break;
    }
}


module.exports.onInput = onInput;