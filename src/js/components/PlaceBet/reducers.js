import Web3 from 'web3'

export const PLACE_BET = 'QUIZ/PLACE_BET';
export const CONTRACT_ERROR = 'QUIZ/CONTRACT_ERROR';
export const BET_ERROR = 'QUIZ/BET_ERROR';
export const BET_RECEIVED = 'QUIZ/BET_RECEIVED';

export function placeBet(betAmount, quizInstance, userAddress, changeView) {
  return (dispatch) => {
    if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
      dispatch({
        type: BET_ERROR,
        payload: true
      });
    } else {
      quizInstance.bet({
          from: userAddress,
          value: betAmount,
        })
        .then((res) => {
          dispatch({ type: PLACE_BET, betAmount });
          changeView('start');
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: CONTRACT_ERROR,
            payload: error
          });
        })
    }
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case PLACE_BET:
      return {
        ...state,
        betAmount: action.betAmount,
        betError: false,
        betFormatError: false,
      }
    case BET_ERROR:
      return {
        ...state,
        betError: action.payload,
        contractError: false,
      }
    case CONTRACT_ERROR:
      return {
        ...state,
        contractError: action.payload,
        betError: false,
      }
    default: return state;
  }
}
