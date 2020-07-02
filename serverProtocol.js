var ws = require('./wsConnect');


function add(cid, size) {
    var msg = {};
    msg.name = 'add';
    msg.storeSvr = 'node1';
    msg.cid = cid;
    msg.size = size;

    return ws.sendMsg(msg);
}

function get(sectorid) {
    var msg = {};
    msg.name = 'get';
    msg.storeSvr = 'node1';
    msg.sectorid = sectorid;

    return ws.sendMsg(msg);
}


module.exports.add = add;
module.exports.get = get;