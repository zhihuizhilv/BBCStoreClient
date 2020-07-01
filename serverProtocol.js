var ws = require('./wsConnect');


function add(cid, size) {
    var msg = {};
    msg.name = 'add';
    msg.storeSvr = 'node1';
    msg.cid = cid;
    msg.size = size;

    return ws.sendMsg(msg);
}

function get(cid, filepath) {

}


module.exports.add = add;
module.exports.get = get;