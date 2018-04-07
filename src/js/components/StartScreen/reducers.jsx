const initialState = {
  betAmount: 250,
};

export const START_QUIZ = 'QUIZ/START_QUIZ';
export const BET_ERROR = 'QUIZ/BET_ERROR';

export function startQuiz(betAmount) {
  if (!betAmount || isNaN(betAmount)) {
    return { type: BET_ERROR, payload: true };
  }
  return { type: START_QUIZ, betAmount }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case START_QUIZ: 
      return {
        ...state,
        betAmount: action.betAmount,
        betError: false,
      }
    case BET_ERROR:
      return { ...state, betError: action.payload }
    
    default: return state;
  }
}