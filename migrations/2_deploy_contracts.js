var Quiz = artifacts.require("./Quiz.sol");

module.exports = function(deployer) {
  deployer.deploy(Quiz, 5, 100, {
    gas: 3000000
  });
};
