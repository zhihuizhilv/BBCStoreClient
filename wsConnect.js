var config = require('./config');
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
            // console.log('Received: ');
            // console.log(message.utf8Data);

            var msg = JSON.parse(message.utf8Data);
            switch (msg.name) {
                case 'addresp':
                    if (msg.retcode == 0) {
                        let sectorid = msg.sectorid;
                        if (sectorid === undefined || sectorid == null || sectorid == 0) {
                            console.log('getresp message invalid sectorid');
                            return;
                        }

                        console.log('storage data to ipfs successful. sectorid:' + sectorid);
                    } else {
                        console.log('storage data to ipfs failed. error:', msg.descrip);
                    }
                    break;
                case 'getresp':
                    let cid = msg.cid;
                    if (cid === undefined || cid == null || cid == '') {
                        console.log('getresp message invalid cid');
                        return;
                    }

                    console.log('should get file from ipfs. savepath:' + savepath);
                    ipfs.get(msg.cid, savepath);
                    break;
                case 'challengeresp':
                    if (msg.retcode == 0) {
                        console.log('challenge post successful');
                    } else {
                        console.log('challenge post failed. error:', msg.descrip);
                    }
                    break;
                    case 'wait':
                    console.log(msg.descrip);
                    break;
            }
        }
    });
});

function doConnect() {
    client.connect(config['serverip'], '', 'https://mysite.com');
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
    msg.username = 'user1';

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

