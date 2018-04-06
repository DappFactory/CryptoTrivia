pragma solidity ^0.4.17;

contract Quiz {
    address public owner;
    uint256 public minimumBet;
    uint256 public totalBet;
    uint256 public numberOfBets;
    uint256 public maxAmountOfBets = 100;
    uint256 public MaxNumberPlayers = 10;
    address[] public players;

    struct Player {
        uint256 amountBet;
        uint256 answerSelected;
    }

    struct Question {
        string text;
        uint256 answer;
    }

    mapping(address => Player) public playerInfo;

    function Quiz(uint256 _minimumBet, uint256 maxNumberPlayers) public {
        owner = msg.sender;
        minimumBet = _minimumBet;
        MaxNumberPlayers = maxNumberPlayers;
    }

    function bet(uint256 answerSelected) public payable {
    /*
    Function (public) to create bets and allows this function to receive ether.

    @params: 
    - answerSelected (uint256) is the answer that was selected by this 
    player.

    @output:
    - None

    */
        // *WHAT IS THIS DOING?*
        require(!checkPlayerExists(msg.sender));
        require(answerSelected >= 1 && answerSelected <= 4);
        require(msg.value >= minimumBet);
        playerInfo[msg.sender].amountBet = msg.value;
        playerInfo[msg.sender].answerSelected = answerSelected;
        numberOfBets++;
        players.push(msg.sender);
        totalBet += msg.value;
    }

    function getMaxNumberPlayers() public view returns(uint256) {
    /*
    Function (public) to check what the max number of players set was.
    *IS THIS NECESSARY?*

    @params:
    - None

    @output:
    - MaxNumberPlayers (uint256)
    */  
        return MaxNumberPlayers;
    }

    function getTotalBet() public view returns(uint256) {
        return totalBet;
    }

    function generateNumberWinner() public {
        // *I DON'T THINK THIS IS NECESSARY / NEEDS TO BE MODDED*
        uint256 numberGenerated = block.number % 10 + 1;
        distributePrizes(numberGenerated);
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
