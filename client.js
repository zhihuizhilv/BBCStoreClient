var WebSocketClient = require('websocket').client;
const readline = require('readline')
var connSta = require('./connectstate').connState;
var connStaObj = require('./connectstate').connStateObj;

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

var rlClosed = false;


// 监听键入回车事件
rl.on('line', (str) => {
    var arr = parseCmd(str);
    console.log('split cmd:' + arr);

    // str即为输入的内容
    if (str === 'close') {
        // 关闭逐行读取流 会触发关闭事件
        rl.close()
        rlClosed = true;
    }

})

// 监听关闭事件
rl.on('close', () => {
    console.log('received close order');
    rlClosed = true;

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
 
// client.connect('ws://localhost:8080/', 'bbcstore-protocol', 'https://mysite.com');
client.connect('ws://localhost:8080/', '', 'https://mysite.com');

// sendNumber();
