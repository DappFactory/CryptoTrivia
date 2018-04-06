'use strict'
// load ipfs module
const IPFS = require('ipfs')
// load async module
const async = require('async');
const fs = require('fs');

const node = new IPFS()     // instantiate an IPFS node
let dirmultihash            // the hashcode for the directory we want to store

function _bufferFile(relPath) {
    // return fs.readFileSync(path.join(__dirname, relPath)); 
    return fs.readFileSync(relPath)
}

function addfile(quizpath, filename) {
    /*
    Function to add the quiz files onto the ipfs node.
    
    To Do:
    - return dirmultihash to parent functions that call this function

    @params:
    - quizfile (str/char) quizfile path to extract the contents 

    @output:
    - dirMultihash (char) hash code that leads to the ipfs hash
    for the quizpath, which we can then load up any quizfile if we
    store quizfiles in the quizpath.
    */
    // create the overall filepath to the file
    var quizfilepath = quizpath + filename;
    console.log(quizfilepath);

    async.series([
        (cb) => node.on('ready', cb),
        (cb) => node.files.add({
            path: quizfilepath,
            content: Buffer.from(_bufferFile(quizfilepath))
        }, (err, filesAdded) => {
            if (err) { console.log('error'); return cb(err) }

            console.log(filesAdded)
            // once file added, get back an object of the path, multihash and size of file
            var _path = filesAdded[0].path
            var _hash = filesAdded[filesAdded.length-1].hash 
            var _size = filesAdded[0].size
            dirMultihash = filesAdded[0].hash

            console.log('\nAdded file: %s with hash %s with size %s', _path, _hash, _size)
            cb()
        }), 
        (cb) => node.files.cat(dirMultihash+'/'+filename, (err, data) => {
            if (err) { console.log('error'); return cb(err) }

            console.log('\nFile content:')
            process.stdout.write(data)
        })
    ])
}

function readfile(dirMultihash) {
    (cb) => node.files.cat(dirMultihash+'/'+filename, (err, data) => {
        if (err) { console.log('error'); return cb(err) }

        console.log('\nFile content:')
        process.stdout.write(data)
    })
}

module.exports = { 
    addfile,
    reafile,
}