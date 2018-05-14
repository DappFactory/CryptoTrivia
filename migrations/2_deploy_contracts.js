var Quiz = artifacts.require("./Quiz.sol");

module.exports = function(deployer) {
  deployer.deploy(Quiz, 5, 100, {
    gas: 3000000,
    gasPrice: web3.toWei("50", "gwei")
  }).then(
    () => console.log("Quiz address: " + Quiz.address));
};
