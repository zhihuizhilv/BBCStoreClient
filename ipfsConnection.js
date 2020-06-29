const IpfsHttpClient = require('ipfs-http-client');
const { globSource } = IpfsHttpClient;
const ipfs = IpfsHttpClient();


async function init() {
    let files = [];
    for await (const file of ipfs.add(globSource('/home/lzh/文档/ipfs-test/', { recursive: true }))) {
        files.push(file);
      }

      console.log(files);
}

module.exports.init = init;


