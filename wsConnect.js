
var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();
var conn = null;
var msgId = 0;

// class connState {
//     constructor(conn, msgId) {
//         this.connection = conn;
//         this.msgId = msgId;
//     }

//     set(conn, msgId) {
//         this.connection = conn;
//         this.msgId = msgId;
//     }
// }

// var connStateObj;


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

    conn = connection;
    msgId = 0;

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
        conn = null;
    });

    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
        conn = null;
    });

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // console.log("Received: '" + message.utf8Data + "'");
        }
    });
});

function doConnect() {
    // client.connect('ws://localhost:8080/', 'bbcstore-protocol', 'https://mysite.com');
    client.connect('ws://localhost:18080/', '', 'https://mysite.com');
}

function doDisConnect() {
    if (conn !==  undefined && conn != null && conn.connected) {
        conn.close();
        conn = null;
    }
}

function sendMsg(msg) {
    msg.msgid = msgId;
    msgId++;
    conn.sendUTF(JSON.stringify(msg));
}


module.exports.doConnect = doConnect;
module.exports.doDisConnect = doDisConnect;
module.exports.sendMsg = sendMsg;

