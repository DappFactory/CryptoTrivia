import assert from 'assert';
import path from 'path';
import fs from 'fs';

import FileInterface from '../../ipfs/fileinterface/addquiz';
const quizFilePath = path.join(__dirname, '../../ipfs/data/processed/');
const quizFile = 'quiz1.csv';

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

describe('File Interface', () => {
  describe('#Test upload and retrieve files', () => {
    it('should upload a file with no errors', (done) => {
      let ipfs = new FileInterface(quizFilePath, quizFile);
      ipfs.start();
      ipfs.node.on('ready', () => {
        ipfs.addfile(quizFilePath, quizFile)
          .then(result => {
            ipfs.stop();
            done();
          }).catch(err => {
            done(err);
          });
      });
    });

    it('should have uploaded file be the same as the one on disk', (done) => {
      let ipfs = new FileInterface(quizFilePath, quizFile);
      ipfs.start();
      ipfs.node.on('ready', () => {
        ipfs.addfile(quizFilePath, quizFile)
          .then(result => {
            console.log('hash: ' + result);
            const fileOnDisk = fs.readFileSync(quizFilePath + quizFile);
            ipfs.readfile(result, quizFile)
              .then((data) => {
                ipfs.stop();
                if (Buffer.compare(data, fileOnDisk) === 0) 
                  done();
                else 
                  done(new Error("Data is not the same on disk"));
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