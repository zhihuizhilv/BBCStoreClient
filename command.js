var ipfs = require('./ipfsConnection');
var sProrocol = require('./serverProtocol');

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
        case 'add':
            console.log('usage: add [filepath]');
            break;
        case 'get':
            console.log('usage: get [cid] [localpath]');
            break;
        }
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
    let ret = sProrocol.get(sectorid);
    if (ret.code == 0) {
        ipfs.get(ret.cid, filepath);
    }
}

function onInput(params) {
    switch (params[0]) {
        case 'add':
            if (params.length != 2) {
                printCmdHelp(params[0]);
            } else {
                err = doAdd(params[1]);
            }
            break;
        case 'get':
            if (params.length != 3) {
                printCmdHelp(params[0]);
            } else {
                err =doGet(params[1], params[2]);
            }
            break;
        default:
            console.log('invalid command!');
            break;
    }
}


module.exports.onInput = onInput;