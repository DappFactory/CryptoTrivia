import { connect } from 'react-redux';
import EndScreen from './EndScreen';

const mapStateToProps = state => ({
  quizInstance: state.app.quizInstance,
  userAddress: state.app.userAddress,
});

export default connect(
  mapStateToProps,
  null,
)(EndScreen);
