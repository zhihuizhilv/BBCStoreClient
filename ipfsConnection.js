var help = require('./help');
const fs = require('fs');
const BufferList = require('bl/BufferList')
const IpfsHttpClient = require('ipfs-http-client');
const { globSource } = IpfsHttpClient;
var config = require('./config');


function init() {
}

async function add(filepath) {
    if (!help.isFile(filepath)) {
        throw TypeError('invalid file path');
    }

    const ipfs = IpfsHttpClient({
        url: config["ipfsnode"],
    });

    let files = [];
    for await (const file of ipfs.add(globSource(filepath, { recursive: true }))) {
        files.push(file);
      }

      console.log(files);
      if (files.length > 0) {
          return files[0];
      } else {
          return null;
      }
}

async function get(cid, filepath) {
    console.log('ipfs get, cid:' + cid + ', filepath:' + filepath);

    if (help.isExist(filepath)) {
        if (help.isDir(filepath)) {
            console.log('error: path is directory. path:' + filepath)
            return
        }
    
        if (help.isFile(filepath)) {
            console.log('warn: path exist already, will be overwritten!')
        }
    }

   let fd = fs.openSync(filepath, 'w');

    console.log(1)
    const ipfs = IpfsHttpClient();
    console.log(1)
    // let file = await ipfs.get(cid)

    for await (const file of ipfs.get(cid)) {
        console.log(file.path)
      
        if (!file.content) continue;
      
        const content = new BufferList()
        for await (const chunk of file.content) {
            content.append(chunk);
            fs.writeSync(fd, chunk);
        }
      
        console.log(content.toString())
      } 

    
    fs.closeSync(fd);
    console.log(1)
}

module.exports.init = init;
module.exports.add = add;
module.exports.get = get;


