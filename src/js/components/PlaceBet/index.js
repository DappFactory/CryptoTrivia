import { connect } from 'react-redux';
import PlaceBetScreen from './PlaceBet';
import { placeBet } from './reducers';

// Functions to pass to our component
const mapDispatchToProps = dispatch => ({
  placeBet: (betAmount, quizInstance, userAddress, changeView) => dispatch(placeBet(betAmount, quizInstance, userAddress, changeView)),
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
)(PlaceBetScreen);
