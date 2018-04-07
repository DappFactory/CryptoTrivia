import { connect } from 'react-redux';
import StartScreen from './StartScreen';
import {
  startQuiz
} from './reducers';

//functions
const mapDispatchToProps = dispatch => ({
  startQuiz: betAmount => dispatch(startQuiz(betAmount)),
});

const mapStateToProps = state => ({
  betError: state.start.betError,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartScreen);
