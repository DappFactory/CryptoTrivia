import { connect } from 'react-redux';
import Quiz from './Quiz';
import {
  initializeQuestions,
  changeAnswer,
  answerQuestion,
  lowerTimer
} from './reducers'

// props for App Component
const mapStateToProps = state =>  ({
  question: state.quiz.question,
  numQuestions: state.quiz.numQuestions,
  timer: state.quiz.timer,
  answer: state.quiz.answer,
  endQuiz: state.quiz.endQuiz,
  index: state.quiz.index
})

//functions
const mapDispatchToProps = {
  initializeQuestions,
  changeAnswer,
  answerQuestion,
  lowerTimer
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz)
