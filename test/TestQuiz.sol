pragma solidity ^0.4.21;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Quiz.sol";

contract TestQuiz {

    uint betAmount;
    uint questionsCorrect;
    uint questionCounter;
    uint questionStartTime;
    uint reward;
    bool ended;

    event PrintUint(uint num);

    // Testing set bet with correct amount
    function testBet_CanBeSet() public {

        Quiz quiz = new Quiz(4, 1);
        quiz.bet(3);
        address a = quiz.GetOwner();

        (betAmount,questionsCorrect,questionCounter,questionStartTime,reward,ended) = quiz.quizzes(a);

        Assert.equal(3, betAmount, "Bet amount should be set.");
    }

    // Testing set bet with correct amount
    function testStartQuiz_CanStart() public {

        Quiz quiz = new Quiz(4, 1);
        quiz.bet(3);
        quiz.start();
        address a = quiz.GetOwner();

        (betAmount,questionsCorrect,questionCounter,questionStartTime,reward,ended) = quiz.quizzes(a);

        Assert.equal(3, betAmount, "Bet amount should be set.");
        Assert.equal(0, questionsCorrect, "Questions correct should be zero.");
        Assert.equal(0, questionCounter, "Question counter should be zero.");
        Assert.equal(0, questionStartTime, "Question start time should be zero.");
        Assert.equal(0, reward, "Reward should be zero.");
        Assert.equal(false, ended, "Quiz should not be ended.");
    }

    // Testing start question
    function testStartQuestion_CanStart() public {

        Quiz quiz = new Quiz(4, 1);
        quiz.bet(3);
        quiz.start();
        address a = quiz.GetOwner();

        quiz.startQuestion();

        (betAmount,questionsCorrect,questionCounter,questionStartTime,reward,ended) = quiz.quizzes(a);

        Assert.isNotZero(questionStartTime, "Question start time should not be zero.");
    }

    // Testing answer question correct
    function testAnswerQuestion_CanAnswerCorrect() public {

        Quiz quiz = new Quiz(4, 1);
        quiz.bet(3);
        quiz.start();
        address a = quiz.GetOwner();

        quiz.startQuestion();
        quiz.answerQuestion(true);

        (betAmount,questionsCorrect,questionCounter,questionStartTime,reward,ended) = quiz.quizzes(a);

        Assert.equal(1, questionCounter, "Question counter should be one.");
        Assert.equal(1, questionsCorrect, "Questions correct should be one.");
    }

    // Testing answer question incorrect
    function testAnswerQuestion_CanAnswerIncorrect() public {

        Quiz quiz = new Quiz(4, 1);
        quiz.bet(3);
        quiz.start();
        address a = quiz.GetOwner();

        quiz.startQuestion();
        quiz.answerQuestion(false);

        (betAmount,questionsCorrect,questionCounter,questionStartTime,reward,ended) = quiz.quizzes(a);

        Assert.equal(1, questionCounter, "Question counter should be one.");
        Assert.equal(0, questionsCorrect, "Questions correct should be zero.");
    }

    // Testing end-to-end
    function testEndToEndQuiz_Completes() public {

        Quiz quiz = new Quiz(4, 1);
        quiz.bet(3);
        quiz.start();
        address a = quiz.GetOwner();

        for (uint ii = 0; ii < 4; ii++) {

            quiz.startQuestion();
            quiz.answerQuestion(true);
        }

        quiz.distributeReward();

        (betAmount,questionsCorrect,questionCounter,questionStartTime,reward,ended) = quiz.quizzes(a);

        Assert.equal(3, betAmount, "Bet amount should be set.");
        Assert.equal(4, questionsCorrect, "Questions correct should be all.");
        Assert.equal(4, questionCounter, "Question counter should be last.");
        Assert.equal(4, quiz.TotalQuestions(), "Total questions is unchanged.");
        Assert.equal(3, reward, "Reward should be bet amount.");
        Assert.equal(true, ended, "Quiz should be ended.");
    }
}
