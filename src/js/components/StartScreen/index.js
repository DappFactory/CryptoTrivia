import { connect } from 'react-redux';
import StartScreen from './StartScreen';
import { startQuiz, placeBet } from './reducers';

// Functions to pass to our component
const mapDispatchToProps = dispatch => ({
  placeBet: (betAmount, quizInstance, userAddress) => dispatch(placeBet(betAmount, quizInstance, userAddress)),
  startQuiz: (betAmount, quizInstance, changeView) => dispatch(startQuiz(betAmount, quizInstance, changeView)),
});

// Props to pass to our component
const mapStateToProps = state => ({
  betError: state.start.betError,
  quizInstance: state.app.quizInstance,
  userAddress: state.app.userAddress,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartScreen);
