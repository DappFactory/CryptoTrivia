// setup = require('./setup/setupnode')
var path = require('path');
var FileInterface = require('./fileinterface/addquiz')

// var quizfilepath = '/Users/adam2392/Documents/CryptoTrivia/ipfs/_data/processed/'
var quizfilepath = path.join(__dirname, 'data/processed/');
var filename = 'quiz1.csv'
// run check and setup
// let check = setup.checkversion()

var IPFSInterface = new FileInterface(quizfilepath, filename);

// Start our IPFS node
IPFSInterface.start();

// When the IPFS node is in the ready state, then we want to add and fetch from ipfs network
IPFSInterface.node.on('ready', () => {
  // Add our file to the ipfs network
  IPFSInterface.addfile(quizfilepath, filename)
    .then(function(result) {
      // Result will contain the directory hash of where our file is located.
      // call readfile with the directory hash that was just returned
      return IPFSInterface.readfile(result, filename);
    })
    .then(function(data) {
      // Data will contain the result of readfile. This will be the data that
      // is contained at the location hash on the ipfs network

      process.stdout.write(data); // print out the data we just fetched
      IPFSInterface.stop();
    })
    .catch(function(error) {
      console.log(error);
      IPFSInterface.stop();
    });
});


