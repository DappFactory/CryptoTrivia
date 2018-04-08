pragma solidity ^0.4.17;

contract Quiz {
    address owner;
    uint public QuestionTime;
    uint public TotalQuestions;

    struct QuizInstance {
        uint betAmount;
        uint questionsCorrect;
        uint questionCounter;
        uint questionStartTime;
        uint[] answers;
        uint reward;
        bool ended;
    }

    mapping(address => QuizInstance) public quizzes;

    // Event signaling bet placed by participant
    event BetPlaced(address playerInfo, uint betAmount);

    // Event signaling question and timer started
    event QuestionStarted(address playerInfo, uint questionNumber);

    // Event signaling question answered
    event QuestionAnswered(address playerInfo, uint answer);

    // Event signaling quiz ended
    event QuizEnded(address playerInfo, uint amount);

    function Quiz(
      uint totalQuestions,
      uint questionTime) public {
        owner = msg.sender;
        QuestionTime = questionTime;
        TotalQuestions = totalQuestions;
    }

    function bet(uint amount) public payable {
    /*
    Function (public) Set the amount to bet for the quiz.

    @output:
    - None
    */
        require(amount > 0);
        require(quizzes[msg.sender].questionCounter == 0);

        quizzes[msg.sender].betAmount = amount;

        emit BetPlaced(msg.sender, amount);
    }

    function start() public {
    /*
    Function (public) Start the quiz if bet placed and reset all question stats.

    @output:
    - None
    */
        require(quizzes[msg.sender].betAmount > 0);

        quizzes[msg.sender].questionsCorrect = 0;
        quizzes[msg.sender].questionCounter = 0;
        quizzes[msg.sender].reward = 0;
        quizzes[msg.sender].ended = false;

        quizzes[msg.sender].answers = new uint[](TotalQuestions);
    }

    function startQuestion() public {
    /*
    Function (public) Start a new question and emit event

    @output:
    - None
    */
        require(quizzes[msg.sender].betAmount > 0);
        require(quizzes[msg.sender].questionCounter < TotalQuestions);

        quizzes[msg.sender].questionStartTime = now;

        emit QuestionStarted(msg.sender, quizzes[msg.sender].questionCounter);
    }

    function answerQuestion(bool ans) public {
    /*
    Function (public) Record the result of an answered question and emit event

    @output:
    - None
    */
        require(quizzes[msg.sender].betAmount > 0);
        require(quizzes[msg.sender].questionCounter < TotalQuestions);

        if (now - quizzes[msg.sender].questionStartTime > QuestionTime) {
            quizzes[msg.sender].answers[quizzes[msg.sender].questionCounter] = 100;
        }
        else if (ans) {
            quizzes[msg.sender].answers[quizzes[msg.sender].questionCounter] = 1;
            quizzes[msg.sender].questionsCorrect++;
        }
        else {
            quizzes[msg.sender].answers[quizzes[msg.sender].questionCounter] = 0;
        }

        emit QuestionAnswered(msg.sender, quizzes[msg.sender].answers[quizzes[msg.sender].questionCounter]);

        quizzes[msg.sender].questionCounter++;
    }

    function distributeReward() public payable {
    /*
    Function (public) to distribute reward to the participant.

    @output:
    - None
    */
        require(quizzes[msg.sender].betAmount > 0);
        require(quizzes[msg.sender].questionCounter == TotalQuestions);

        quizzes[msg.sender].ended = true;
        emit QuizEnded(msg.sender, quizzes[msg.sender].betAmount);

        if (quizzes[msg.sender].questionsCorrect == TotalQuestions) {
            quizzes[msg.sender].reward == quizzes[msg.sender].betAmount;
        } else if (quizzes[msg.sender].questionsCorrect < TotalQuestions / 4) {
            quizzes[msg.sender].reward == 0;
        } else {
            quizzes[msg.sender].reward == quizzes[msg.sender].betAmount / 2;
        }

        msg.sender.transfer(quizzes[msg.sender].reward);
    }

    function kill() public {
    // necessary to include with all contracts to allow us to destroy if necessary
        if (msg.sender == owner) selfdestruct(owner);
    }
}
