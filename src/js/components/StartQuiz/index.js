import { connect } from 'react-redux';
import StartQuizScreen from './StartQuiz';
import { startQuiz } from './reducers';

// Functions to pass to our component
const mapDispatchToProps = dispatch => ({
  startQuiz: (betAmount, quizInstance, changeView) => dispatch(startQuiz(betAmount, quizInstance, changeView)),
});

// Props to pass to our component
const mapStateToProps = state => ({
  quizInstance: state.app.quizInstance,
  userAddress: state.app.userAddress,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartQuizScreen);
