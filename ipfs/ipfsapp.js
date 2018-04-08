// setup = require('./setup/setupnode')
var path = require('path');
var FileInterface = require('./fileinterface/addquiz')

// var quizfilepath = '/Users/adam2392/Documents/CryptoTrivia/ipfs/_data/processed/'
var quizfilepath = path.join(__dirname, 'data/processed/');
var quizname = 'quiz1.csv'
// run check and setup
// let check = setup.checkversion()
var IPFSInterface = new FileInterface(quizfilepath, quizname);
IPFSInterface.start();

IPFSInterface.node.on('ready', () => {
  IPFSInterface.addfile(quizfilepath, quizname)
  .then(function(result) {
    IPFSInterface.readfile(result, quizname)
      .then(function(data) {
        process.stdout.write(data);
        IPFSInterface.stop();
      })
      .catch(function(err) {
        console.log(err);
      });
  })
  .catch(function(error) {
    console.log(error);
  });
});


