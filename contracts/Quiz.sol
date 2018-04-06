pragma solidity ^0.4.17;

contract Quiz {
    address public owner;
    uint256 public BetAmount;
    uint256 public QuestionTime;
    uint256 public TotalQuestions;
    uint256 public maxAmountOfBets = 100;
    uint256 public MaxNumberPlayers = 10;

    Question[] public QuestionList;
    bool started;
    uint256 questionCounter = 0;
    uint256 questionsCorrect = 0;

    enum Answer {A,B,C,D}

    struct Player {
        uint256 amountBet;
        uint256 answerSelected;
    }

    struct Question {
        string Text;
        Answer Answer;
        uint256 Time;
    }

    function Quiz(
      uint256 totalQuestions,
      uint256 questionTime) public {
        owner = msg.sender;
        QuestionTime = questionTime;
        TotalQuestions = totalQuestions;

        initializeQuestions();
    }

    function start() public {
    /*
    Function (public) Start the quiz

    @output:
    - None
    */
        require(!started);

        started = true;

    }

    function initializeQuestions() public {
    /*
    Function (public) Initialize the set of questions from database on IPFS

    @output:
    - None
    */
        require(TotalQuestions < 20);

        for (uint i = 0; i < TotalQuestions; i++) {
            // TODO: get questions from IPFS
            QuestionList.push(Question({
                Text : 'Question text',
                Answer : 'Question answer',
                Time : QuestionTime
                }));
        }
    }

    function getQuestion() public view returns(Question) {
    /*
    Function (public) Returns the next question

    @output:
    - Question
    */
        require(questionCounter < TotalQuestions);

        return QuestionList[questionCounter];
    }

    function answerQuestion(Answers answer) public {
    /*
    Function (public) Answer the current question and move to next question

    @output:
    - None
    */
        require(questionCounter < TotalQuestions);

        if (QuestionList[questionCounter].Answer == answer) {
            questionsCorrect++;
        }

        questionCounter++;
    }

    function distributePrizes(uint256 winningPlayer) public {
    /*
    Function (public) to distribute rewards to the winner of this Quiz game.

    @params:
    - winningPlayer (uint256) is the winning player

    @output:
    - None
    */
        address[100] memory winners; // We have to create a temporary in memory array with fixed size
        uint256 count = 0; // This is the count for the array of winners
        for(uint256 i = 0; i < players.length; i++){
           address playerAddress = players[i];
           if(playerInfo[playerAddress].answerSelected == winningPlayer){
              winners[count] = playerAddress;
              count++;
           }
           delete playerInfo[playerAddress]; // Delete all the players
        }
        players.length = 0; // Delete all the players array
        uint256 winnerEtherAmount = totalBet / winners.length; // How much each winner gets
        for(uint256 j = 0; j < count; j++){
            if(winners[j] != address(0)) // Check that the address in this fixed array is not empty
                winners[j].transfer(winnerEtherAmount);
        }
    }

    function kill() public {
    // necessary to include with all contracts to allow us to destroy if necessary
        if (msg.sender == owner) selfdestruct(owner);
    }

    function checkPlayerExists(address player) public constant returns(bool){
    /*
    Function (public) to determine if player with certain address exists
    out of the current players in Quiz.

    @params:
    - player (address) the address of the player to check

    @output:
    - true/false (bool) for if this player exists or not
    */
        for(uint256 i = 0; i < players.length; i++){
            if(players[i] == player) return true;
        }
        return false;
    }
}
