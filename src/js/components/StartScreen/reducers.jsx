const initialState = {
  betAmount: 250,
};

export const START_QUIZ = 'QUIZ/START_QUIZ';
export const CONTRACT_ERROR = 'QUIZ/CONTRACT_ERROR';
export const BET_ERROR = 'QUIZ/BET_ERROR';

export function startQuiz(betAmount, quizInstance) {
  return (dispatch) => {
    if (!betAmount || isNaN(betAmount)) {
      dispatch({ type: BET_ERROR, payload: true });
    } else {
      quizInstance.start()
        .then((res) => {
          console.log(res);
          dispatch({ type: START_QUIZ, betAmount });
        })
        .catch((error) => {
          dispatch({ type: CONTRACT_ERROR, payload: error });
        })
    }
  }
}

export default (state = initialState, action) => {
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