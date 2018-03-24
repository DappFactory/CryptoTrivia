pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Quiz.sol";

contract TestQuiz {
  Quiz quiz = Quiz(DeployedAddresses.Quiz());

  // Testing retrieval of max number of players
  function testMaxNumberPlayers() public {
    uint256 expected = 100;
    uint256 actual = quiz.getMaxNumberPlayers();

    Assert.equal(actual, expected, "Max number of players should be set during initialization.");
  }
}
