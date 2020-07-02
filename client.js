const readline = require('readline')
var ws = require('./wsConnect');
var command = require('./command');
// var ipfs = require('./ipfsConnection');


//////////////////readline////////////////////////

function parseCmd(cmdStr) {
    var ret = [];
    if (cmdStr === undefined || cmdStr === null) {
        return ret;
    }

    var arr = cmdStr.toString().split(' ');
    if (arr.length == 0) {
        return arr;
    }

    arr.forEach(v => {
        v = v.trim();
        if (v != '') {
            ret.push(v);
        }
    });

    return ret;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


rl.on('line', (str) => {
    var arr = parseCmd(str);
    if (arr.length == 0) {
        return;
    }

    var err = null;
    switch (arr[0]) {
        case 'close':
            rl.close()
            break;
        default:
            command.onInput(arr);
            break;
    }

    if (err != null) {
        console.log('cmd fail. err:' + err);
    }
})

rl.on('close', () => {
    console.log('received close order');
    ws.doDisConnect();
})

 
function main() {
    // ipfs.get('Qmc8dhQ511YwbFgJuYY66rwSb5mDtR4tMSvVAmapSp2C9u',  '/home/lzh/ipfstestfile/w/1.txt');
    ws.doConnect();
}


main();
