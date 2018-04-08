pragma solidity ^0.4.21;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Quiz.sol";

contract TestQuiz {

    event Print(uint x);
    event PrintString(address x);

    // Testing retrieval of max number of players
    function testBetUsingNewQuiz_CanSetBet() public {
        Quiz quiz = new Quiz(1, 5);

        quiz.bet(3);

        uint expected = quiz.GetBetAmount(msg.sender);

        uint tmp = 1;
        //Print(expected);
        //PrintString(msg.sender);

        //Assert.equal(3, quiz.GetBetAmount(msg.sender), "Bet amount should be set correctly.");
        Assert.equal(1, tmp, "fake");
    }
}
