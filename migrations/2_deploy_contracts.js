var Quiz = artifacts.require("./Quiz.sol");

module.exports = function(deployer) {
  deployer.deploy(Quiz, 5, 1000, {
    gas: 3000000,
    gasPrice: web3.toWei("200", "gwei")
  }).then(
    () => console.log("Quiz address: " + Quiz.address));
};
