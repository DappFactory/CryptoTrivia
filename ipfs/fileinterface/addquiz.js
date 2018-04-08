'use strict'
// load ipfs module
const IPFS = require('ipfs')
// load async module
const async = require('async');
const fs = require('fs');

function _bufferFile(relPath) {
    // return fs.readFileSync(path.join(__dirname, relPath)); 
    return fs.readFileSync(relPath)
}

function FileInterface(quizPath, filename) {
    this.node = null;
    this.quizPath = quizPath;
    this.filename = filename;
    this.quizFilePath = quizPath + filename;

    // Start the ipfs node
    this.start = function() {
        this.node = new IPFS();
    }

    // Stop the ipfs node
    this.stop = function() {
        this.node.stop(() => {});
    }

    this.addfile = function() {
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
        const me = this;
        return new Promise(function(resolve, reject) {
            me.node.files.add({
                path: me.quizFilePath,
                content: Buffer.from(_bufferFile(me.quizFilePath))
            }, (err, filesAdded) => {
                if (err) {
                    reject(err);
                } else {
                    // console.log(filesAdded)
                    // once file added, get back an object of the path, multihash and size of file
                    var _path = filesAdded[0].path
                    var _hash = filesAdded[filesAdded.length-1].hash 
                    var _size = filesAdded[0].size
                    var dirMultihash = filesAdded[0].hash
                    // console.log('\nAdded file: %s with hash %s with size %s', _path, _hash, _size)
                    resolve(dirMultihash);
                }
            });
        });
    };

    this.readfile = function(dirMultihash, fileName) {
        const me = this;
        return new Promise(function(resolve, reject) {
            const filePath = dirMultihash + '/' + fileName;
            me.node.files.cat(filePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}


// function addfile(quizpath, filename, node) {
//     /*
//     Function to add the quiz files onto the ipfs node.
    
//     To Do:
//     - return dirmultihash to parent functions that call this function

//     @params:
//     - quizfile (str/char) quizfile path to extract the contents 

//     @output:
//     - dirMultihash (char) hash code that leads to the ipfs hash
//     for the quizpath, which we can then load up any quizfile if we
//     store quizfiles in the quizpath.
//     */    
//     async.series([
//         (cb) => node.on('ready', cb),
//         (cb) => node.files.add({
//             path: quizfilepath,
//             content: Buffer.from(_bufferFile(quizfilepath))
//         }, (err, filesAdded) => {
//             if (err) { 
//                 return cb(err, null);
//             }

//             console.log(filesAdded)
//             // once file added, get back an object of the path, multihash and size of file
//             var _path = filesAdded[0].path
//             var _hash = filesAdded[filesAdded.length-1].hash 
//             var _size = filesAdded[0].size
//             dirMultihash = filesAdded[0].hash

//             console.log('\nAdded file: %s with hash %s with size %s', _path, _hash, _size)
//             cb(null, dirMultihash);
//         }), 
//         (cb) => node.files.cat(dirMultihash +'/'+ filename, (err, data) => {
//             if (err) { 
//                 return cb(err);
//             }

//             console.log('\nFile content:')
//             process.stdout.write(data);
//             cb(null, data);
//         })
//     ], function(err, results) {
//         console.log(results);
//         console.log(err);
//         if (err)
//             return false;
//         return true;
//     });
// }

module.exports = FileInterface;