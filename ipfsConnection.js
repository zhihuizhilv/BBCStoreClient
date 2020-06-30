var help = require('./help');
const IpfsHttpClient = require('ipfs-http-client');
const { globSource } = IpfsHttpClient;


function init() {
}

async function add(filepath) {
    if (!help.isFile(filepath)) {
        throw TypeError('invalid file path');
    }

    const ipfs = IpfsHttpClient();

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

module.exports.init = init;
module.exports.add = add;


