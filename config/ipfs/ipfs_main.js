var ipfsAPI = require('ipfs-api')

// connect to ipfs daemon API server
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) // leaving out the arguments will default to these values
// or connect with multiaddr
// var ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')
// or using options
// var ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})

import './ipfs_config'		// load configurations

function uploadFile(file, callback) {

}

function readHash(hash, callback) {

}


ipfs.util.addFromURL('http://example.com/', (err, result) => {
  if (err) {
    throw err
  }
  console.log(result)
})

ipfs.util.addFromFs('path/to/a/folder', { recursive: true , ignore: ['subfolder/to/ignore/**']}, (err, result) => {
  if (err) { throw err }
  console.log(result)
})