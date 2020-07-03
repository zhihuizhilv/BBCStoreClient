var ipfs = require('./ipfsConnection');
var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();
var conn = null;
var msgId = 0;
var savepath = '';
 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');

    conn = connection;
    msgId = 0;
    doLogin();

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
            console.log('Received: ');
            console.log(message.utf8Data);

            var msg = JSON.parse(message.utf8Data);
            switch (msg.name) {
                case 'getresp':
                    let cid = msg.cid;
                    if (cid === undefined || cid == null || cid == '') {
                        console.log('getresp message invalid cid');
                        return;
                    }

                    console.log('should get file from ipfs. savepath:' + savepath);
                    ipfs.get(msg.cid, savepath);
                    break;
            }
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

function doLogin() {
    let msg = {}
    msg.name = 'login';
    msg.clientid = 'client1';

    sendMsg(msg);
}

function sendMsg(msg) {
    msg.msgid = msgId;
    msgId++;
    conn.sendUTF(JSON.stringify(msg));
}

function setSavePath(path) {
    savepath = path;
}

module.exports = {
    doConnect,
    doDisConnect,
    sendMsg,
    setSavePath,
}

