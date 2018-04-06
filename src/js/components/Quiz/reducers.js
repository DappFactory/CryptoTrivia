import axios from 'axios';
import config from '../../config';
import parse from 'csv-parse';

export const GET_ALL_QUESTIONS = 'QUIZ/GET_ALL_QUESTIONS';
export const GET_QUESTION = 'QUIZ/GET_QUESTION';
export const GET_TIMER = 'QUIZ/GET_TIMER';
export const GET_NUM_QUESTIONS = 'QUIZ/GET_NUM_QUESTIONS';
export const INCREASE_SCORE = 'QUIZ/INCREASE_SCORE';
export const INCREASE_INDEX = 'QUIZ/INCREASE_INDEX';
export const CHOOSE_ANSWER = 'QUIZ/CHOOSE_ANSWER';
export const END_QUIZ = 'QUIZ/END_QUIZ';

const initialState = {
  questions: [],
  question: {},
  index: 0,
  timer: null,
  numQuestions: 20, // can probably make this dynamic based on user input
  answer: '',
  endQuiz: false
};

let timerFunc;

function mapQuestion(question) {
  return {
    question: question[1].replace(/^\*/, ''),
    answer: question[6].toUpperCase(),
    A: question[2].replace(/^A\)/, ''),
    B: question[3].replace(/^B\)/, ''),
    C: question[4].replace(/^C\)/, ''),
    D: question[5].replace(/^D\)/, '')
  };
}

/* function that initializes quiz and retrieves appropriate values */
export function initializeQuestions() {
  return (dispatch, getState) => {
    axios.get(config.ipfs + '/' + config.hash)
      .then(questions => {
        parse(questions.data, function(err, result) {
          let setQuestions = [];
          let setIndices = new Set();
          while (setIndices.size < getState().quiz.numQuestions) {
            const index = Math.floor(Math.random() * result.length);
            const prevSetSize = setIndices.size;
            setIndices.add(index);

            if (setIndices.size === prevSetSize + 1) {
                setQuestions.push(result[index]);
            }
          }

          const resultQuestions = setQuestions.map(mapQuestion);

          dispatch({ type: GET_NUM_QUESTIONS, payload: resultQuestions.length });
          dispatch({ type: GET_ALL_QUESTIONS, payload: resultQuestions });
          dispatch({ type: GET_QUESTION, payload: resultQuestions[0] });
          dispatch({ type: GET_TIMER, payload: 5 });
        });
      })
  }
}


/* function that gets the next question */
function getQuestion() {
  return (dispatch, getState) => {
    const quizState = getState().quiz;

    dispatch({ type: GET_QUESTION, payload: quizState.questions[quizState.index] });
  }
}

export function lowerTimer() {
  return (dispatch, getState) => {
    timerFunc = setInterval(function(){
      dispatch({ type: GET_TIMER, payload: getState().quiz.timer-1 });
    }, 1000);
  }
}

export function changeAnswer(answer) {
  return (dispatch) => {
    dispatch({ type: CHOOSE_ANSWER, payload: answer });
  }
}

export function answerQuestion(question, answer) {
  return (dispatch, getState) => {
    const quizInstance = getState().app.quizInstance;
    const isCorrect = answer === question.answer;
    const newIndex = getState().quiz.index + 1;

    quizInstance.answerQuestion(isCorrect, { from: getState().app.userAddress })

    if (newIndex >= getState().quiz.questions.length) {
      dispatch({ type: END_QUIZ, payload: true });
      clearInterval(timerFunc);
    } else {
      dispatch({ type: GET_TIMER, payload: 5 });
      dispatch({ type: CHOOSE_ANSWER, payload: '' });
      dispatch({ type: INCREASE_INDEX, payload: newIndex });
      dispatch({ type: GET_QUESTION, payload: getState().quiz.questions[newIndex] });
    }
  }
}


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_QUESTIONS: return { ...state, questions: action.payload }
    case GET_QUESTION: return { ...state, question: action.payload }
    case GET_NUM_QUESTIONS: return { ...state, numQuestions: action.payload }
    case GET_TIMER: return { ...state, timer: action.payload }
    case INCREASE_INDEX: return { ...state, index: action.payload }
    case CHOOSE_ANSWER: return { ...state, answer: action.payload }
    case END_QUIZ: return { ...state, endQuiz: action.payload }
    default: return state
  }
}
