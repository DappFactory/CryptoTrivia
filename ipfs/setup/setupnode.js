// load async module
const async = require('async');
// load ipfs module
const IPFS = require('ipfs')

// instantiate an IPFS node
const node = new IPFS()

function checkversion() {
	/*
	Function to check the current version of the node

	Prints it out on console to check.
	*/
	// check the 
	async.series([
	  (cb) => node.on('ready', cb),
	  (cb) => node.version((err, version) => {
	    if (err) { return cb(err) }
	    console.log('Version:', version.version)
	    cb()
	  })
	])
}

module.exports = { checkversion }