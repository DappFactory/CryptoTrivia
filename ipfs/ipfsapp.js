// setup = require('./setup/setupnode')
fileinterface = require('./fileinterface/addquiz')

var quizfilepath = '/Users/adam2392/Documents/CryptoTrivia/ipfs/_data/processed/'
var quizname = 'quiz1.csv'
// run check and setup
// let check = setup.checkversion()

let test = fileinterface.addfile(quizfilepath, quizname)

