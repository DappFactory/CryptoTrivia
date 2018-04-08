pragma solidity ^0.4.21;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Quiz.sol";

contract TestQuiz {

    // Testing set bet with correct amount
    function testBetUsingNewQuiz_CanBeSet() public {

        Quiz quiz = new Quiz(1, 5);
        quiz.bet(3);
        address a = quiz.GetOwner();

        Assert.equal(3, quiz.GetBetAmount(a), "Bet amount should be set.");
    }
}
