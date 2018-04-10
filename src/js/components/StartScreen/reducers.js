export const QUIZ_STARTED = 'QUIZ/QUIZ_STARTED';
export const PLACE_BET = 'QUIZ/PLACE_BET';
export const CONTRACT_ERROR = 'QUIZ/CONTRACT_ERROR';
export const BET_ERROR = 'QUIZ/BET_ERROR';
export const BET_RECEIVED ='QUIZ/BET_RECEIVED';

export function placeBet(betAmount, quizInstance, userAddress) {
  return (dispatch) => {
    console.log(userAddress);
    if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
      dispatch({ type: BET_ERROR, payload: true });
    } else {
      quizInstance.bet(betAmount, { from: userAddress })
        .then((res) => {
          console.log(res);
          dispatch({ type: PLACE_BET, betAmount });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: CONTRACT_ERROR, payload: error });
        })
    }
  }
}

export function startQuiz(quizInstance, userAddress) {
  return (dispatch) => {
    console.log('init start quiz listener');
    quizInstance.BetPlaced().watch((err, res) => {
      console.log('=== bet placed ===');
      console.log(res);
      console.log(err);
      if (!err) {
        console.log('=== about to start');
        const res = quizInstance.start.call({ from: userAddress });
        console.log(res);
          // .then((result) => {
          //   console.log('=== quiz started ===');
          //   console.log(result);
          //   dispatch({ type: QUIZ_STARTED });
          // })
          // .catch((error) => {
          //   console.log(error);
          //   dispatch({ type: CONTRACT_ERROR, payload: error });
          // });
      }
    });
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

    default: return state;
  }
}