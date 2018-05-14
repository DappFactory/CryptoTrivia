export const QUIZ_STARTED = 'QUIZ/QUIZ_STARTED';
export const CONTRACT_ERROR = 'QUIZ/CONTRACT_ERROR';

export function startQuiz(quizInstance, userAddress, changeView) {
  return (dispatch) => {
    quizInstance.start({ from: userAddress, gas: 210000 })
      .then((result) => {
        dispatch({ type: QUIZ_STARTED });
        changeView('quiz');
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: CONTRACT_ERROR, payload: error });
      });
  }
}

export default (state = {}, action) => {
  switch (action.type) {
    case QUIZ_STARTED:
      return {
        ...state,
        quizStarted: true,
        contractError: false,
      }

    case CONTRACT_ERROR:
      return {
        ...state,
        quizStarted: false,
        contractError: true,
      }
    default: return state;
  }
}