import { connect } from 'react-redux';
import StartScreen from './StartScreen';
import { startQuiz } from './reducers';

// Functions to pass to our component
const mapDispatchToProps = dispatch => ({
  startQuiz: (betAmount, quizInstance) => dispatch(startQuiz(betAmount, quizInstance)),
});

// Props to pass to our component
const mapStateToProps = state => ({
  betError: state.start.betError,
  quizInstance: state.app.quizInstance,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartScreen);
