var WebSocketClient = require('websocket').client;
const readline = require('readline')
var connSta = require('./connectstate').connState;
var connStaObj = require('./connectstate').connStateObj;
var sProrocol = require('./serverProtocol');
var ipfsConn = require('./ipfsConnection');

connStaObj = new connSta(null, 0);

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

// var rlClosed = false;


// 监听键入回车事件
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
        case 'add':
            if (arr.length != 2) {
                console.log('usage: add [filepath]');
            } else {
                err = sProrocol.add(arr[1]);
            }
            break;
        case 'get':
            if (arr.length != 3) {
                console.log('usage: get [cid] [localpath]');
            } else {
                err = sProrocol.get(arr[1], arr[2]);
            }
            break;
        default:
            console.log('invalid command!');
            break;
    }

    if (err != null) {
        console.log('cmd fail. err:' + err);
    }
})

// 监听关闭事件
rl.on('close', () => {
    console.log('received close order');

    if (connStaObj.connection !==  undefined && connStaObj.connection != null && connStaObj.connection.connected) {
        connStaObj.connection.close();
    }
})


//////////////////websocket client////////////////////////

var client = new WebSocketClient();

// function sendNumber() {
//     console.log('rlClosed:' + rlClosed);
//     if (connStaObj.connection.connected) {
//         if (rlClosed) {
//             connStaObj.connection.close();
//             console.log('websocket client closed');    
//         } else {
//             var number = Math.round(Math.random() * 0xFFFFFF);
//             connStaObj.connection.sendUTF(number.toString());
//             console.log('before setTimeout');
//             setTimeout(sendNumber, 1000);
//             console.log('after setTimeout');                
//         }
//     }
// }

 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');

    connStaObj.set(connection, 0);

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
        connStaObj = null;
    });

    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
        connStaObj = null;
    });

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // console.log("Received: '" + message.utf8Data + "'");
        }
    });
});
 
function main() {
    ipfsConn.init();
    // client.connect('ws://localhost:8080/', 'bbcstore-protocol', 'https://mysite.com');
    client.connect('ws://localhost:18080/', '', 'https://mysite.com');
    // sendNumber();
}


main();
