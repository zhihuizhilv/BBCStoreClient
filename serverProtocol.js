var ws = require('./wsConnect');


function add(cid, size) {
    var msg = {};
    msg.name = 'add';
    msg.nodename = 'node-lzh';
    msg.cid = cid;
    msg.size = size;

    return ws.sendMsg(msg);
}

function get(sectorid) {
    var msg = {};
    msg.name = 'get';
    msg.nodename = 'node-lzh';
    msg.sectorid = sectorid;
    return ws.sendMsg(msg);
}

function challenge(sectorid) {
    var msg = {};
    msg.name = 'challenge';
    msg.nodename = 'node-lzh';
    msg.sectorid = sectorid;
    return ws.sendMsg(msg);
}


module.exports = {
    add,
    get,
    challenge,
}
