export const QUIZ_STARTED = 'QUIZ/QUIZ_STARTED';
export const PLACE_BET = 'QUIZ/PLACE_BET';
export const CONTRACT_ERROR = 'QUIZ/CONTRACT_ERROR';
export const BET_ERROR = 'QUIZ/BET_ERROR';
export const BET_RECEIVED = 'QUIZ/BET_RECEIVED';

export function startQuestion(quizInstance, changeView, userAddress) {
  return (dispatch) => {
    quizInstance.startQuestion({
      from: userAddress
    })
    changeView('quiz')
  }
}

export function placeBet(betAmount, quizInstance, userAddress) {
  return (dispatch) => {
    if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
      dispatch({
        type: BET_ERROR,
        payload: true
      });
    } else {
      quizInstance.bet(betAmount, {
          from: userAddress
        })
        .then((res) => {
          dispatch({
            type: PLACE_BET,
            betAmount
          });
        })
        .catch((error) => {
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
    case QUIZ_STARTED:
      return {
        ...state,
        quizStarted: true,
        contractError: false,
      }

    default:
      return state;
  }
}
