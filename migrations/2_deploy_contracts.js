var Quiz = artifacts.require("./Quiz.sol");

module.exports = function(deployer) {
  deployer.deploy(Quiz, 5, 1000).then(
    () => console.log("Quiz address: " + Quiz.address));
};
