

class connState {
    constructor(conn, msgId) {
        this.connection = conn;
        this.msgId = msgId;
    }

    set(conn, msgId) {
        this.connection = conn;
        this.msgId = msgId;
    }
}

var connStateObj;


module.exports.connState = connState;
module.exports.connStateObj = connStateObj;

