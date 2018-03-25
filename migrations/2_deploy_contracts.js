var Quiz = artifacts.require("./Quiz.sol");

module.exports = function(deployer) {
  deployer.deploy(Quiz, web3.toWei(0.1, 'ether'), 100, {
    gas: 3000000
  });
};
