pragma solidity ^0.4.21;

contract Quiz {
    address public owner;
    uint public QuestionTime;
    uint public TotalQuestions;

    struct QuizInstance {
        uint betAmount;
        uint questionsCorrect;
        uint questionCounter;
        uint questionStartTime;
        uint reward;
        bool ended;
    }

    function GetOwner() public view returns(address ownerAddress) {
        return owner;
    }

    mapping(address => QuizInstance) public quizzes;

    // Event signaling bet placed by participant
    event BetPlaced(address playerInfo, uint betAmount);

    // Event signaling question answered
    event QuestionAnswered(address playerInfo, bool answer);

    // Event signaling quiz ended
    event QuizEnded(address playerInfo, uint amount);

    function Quiz(
      uint totalQuestions,
      uint questionTime) public {
        owner = msg.sender;
        TotalQuestions = totalQuestions;
        QuestionTime = questionTime;
    }

    function bet() public payable {
    /*
    Function (public) Set the amount to bet for the quiz.

    @output:
    - None
    */
        require(msg.value > 0);
        require(quizzes[msg.sender].questionCounter == 0);

        quizzes[msg.sender].betAmount = msg.value;

        start();

        emit BetPlaced(msg.sender, msg.value);
    }

    function start() public {
    /*
    Function (public) Start the quiz if bet placed and reset all question stats.

    @output:
    - None
    */
        quizzes[msg.sender].questionsCorrect = 0;
        quizzes[msg.sender].questionCounter = 0;
        quizzes[msg.sender].ended = false;
        quizzes[msg.sender].questionStartTime = now;
    }

    function answerQuestion(bool ans) public {
    /*
    Function (public) Record the result of an answered question and emit event

    @output:
    - None
    */
        require(quizzes[msg.sender].betAmount > 0);
        require(quizzes[msg.sender].questionCounter <= TotalQuestions);

        bool correct = false;

        if (now - quizzes[msg.sender].questionStartTime < QuestionTime && ans) {
            quizzes[msg.sender].questionsCorrect++;
            correct = true;
        }

        emit QuestionAnswered(msg.sender, correct);

        quizzes[msg.sender].questionCounter++;
        quizzes[msg.sender].questionStartTime = now;
    }

    function getQuestionsCorrect() public view returns (uint total) {
    /*
    Function (public) to get total questions correct.

    @output:
    - (uint) total number of questions correct
    */
        return quizzes[msg.sender].questionsCorrect;
    }

    function distributeReward() public {
    /*
    Function (public) to distribute reward to the participant.

    @output:
    - None
    */
        // TODO: figure out why gas limit estimation in metamask is broken when using accessing betAmount value
        require(!quizzes[msg.sender].ended);
        require(quizzes[msg.sender].questionCounter == TotalQuestions);

        quizzes[msg.sender].ended = true;
        uint amount = quizzes[msg.sender].betAmount * quizzes[msg.sender].questionsCorrect / TotalQuestions;
        //quizzes[msg.sender].betAmount = 0;
        quizzes[msg.sender].reward = amount;
        emit QuizEnded(msg.sender, amount);

        msg.sender.transfer(amount);
    }

    function kill() public {
    // necessary to include with all contracts to allow us to destroy if necessary
        if (msg.sender == owner) selfdestruct(owner);
    }
}
