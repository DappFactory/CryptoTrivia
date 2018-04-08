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

    // Testing set bet with correct amount
    function testStartUsingNewQuiz_CanBeSet() public {

        Quiz quiz = new Quiz(1, 5);
        quiz.bet(3);
        quiz.start();
        address a = quiz.GetOwner();

        uint betAmount;
        uint questionsCorrect;
        uint questionCounter;
        uint questionStartTime;
        uint reward;
        bool ended;

        (betAmount,questionsCorrect,questionCounter,questionStartTime,reward,ended) = quiz.quizzes(a);

        Assert.equal(3, betAmount, "Bet amount should be set.");
        Assert.equal(0, questionsCorrect, "Questions correct should be zero.");
        Assert.equal(0, questionCounter, "Question counter should be zero.");
        Assert.equal(0, questionStartTime, "Question start time should be zero.");
        Assert.equal(0, reward, "Reward should be zero.");
        Assert.equal(false, ended, "Quiz should not be ended.");
    }
}
