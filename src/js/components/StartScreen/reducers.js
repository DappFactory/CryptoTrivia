export const START_QUIZ = 'QUIZ/START_QUIZ';
export const CONTRACT_ERROR = 'QUIZ/CONTRACT_ERROR';
export const BET_ERROR = 'QUIZ/BET_ERROR';

export function startQuiz(betAmount, quizInstance, changeView) {
  return (dispatch, getState) => {
    if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
      dispatch({ type: BET_ERROR, payload: true });
    } else {
      quizInstance.start(betAmount)
        .then((res) => {
          dispatch({ type: START_QUIZ, betAmount });
          changeView('quiz')
        })
        .catch((error) => {
          console.log(error)
          dispatch({ type: CONTRACT_ERROR, payload: error });
        })
    }
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case START_QUIZ:
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
