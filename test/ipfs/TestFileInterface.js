import assert from 'assert';
import path from 'path';
import fs from 'fs';

import FileInterface from '../../ipfs/fileinterface/addquiz';
const quizFilePath = path.join(__dirname, '../../ipfs/data/processed/');
const quizFile = 'quiz1.csv';

// This is using Mocah testing framework which can be found here: https://mochajs.org/

// Use the `describe` function to specify a suite of tests. We can nest describe statements.
// Use the `it` function to specify a single test in a suite of tests.

// Example code to check array
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {

      // Here we are using simple asserts
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

// Test suite for IPFS file interface code
// Testing asynchronous code is a little different then the above example
describe('File Interface', () => {
  describe('#Test upload and retrieve files', () => {
    it('should upload a file with no errors', (done) => {
      let ipfs = new FileInterface(quizFilePath, quizFile);
      ipfs.start(); // start the ipfs node
      ipfs.node.on('ready', () => {
        // Add the file to the ipfs network
        ipfs.addfile(quizFilePath, quizFile)
          .then(result => {
            ipfs.stop();
            done(); // This indicates that the test passed
          })
          .catch(err => {
            ipfs.stop();
            done(err); // Passing this parameter to the `done` callback will result as a test failure
          });
      });
    });

    it('should have uploaded file be the same as the one on disk', (done) => {
      let ipfs = new FileInterface(quizFilePath, quizFile);
      ipfs.start(); // start our ipfs node
      ipfs.node.on('ready', () => {
        ipfs.addfile(quizFilePath, quizFile)
          .then(result => {
            const fileOnDisk = fs.readFileSync(quizFilePath + quizFile);
            ipfs.readfile(result, quizFile)
              .then((data) => {
                ipfs.stop();
                // Check to make sure that the data on disk and on ipfs network are the same
                if (Buffer.compare(data, fileOnDisk) === 0)
                  done();
                else
                  done(new Error("Data is not the same on disk")); // Fail test if not the same
              })
              .catch((err) => {
                ipfs.stop();
                done(err);
              });
          });
      });
    });
  });
})