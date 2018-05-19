import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../SharedComponents/InputField';
import Card from '../SharedComponents/Card';;
import Button from '../SharedComponents/Button';
import StartTitle from '../SharedComponents/StartTitle';
import CONSTANTS from './constants';

export default class PlaceBet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      betAmount: null
    }
  }
  // Keep track of user input bet amount by storing it in state
  onBetAmountChange = (value) => {
    if (value) {
      this.setState({ betAmount: value });
    }
  }

  render() {
    const {
      quizInstance,
      placeBet,
      betError,
      changeView,
      userAddress,
    } = this.props;

    const { betAmount } = this.state;
    // Configure what to render based on errors
    const placeholder = betError ?
      CONSTANTS.PLACEHOLDER_ERR :
      CONSTANTS.PLACEHOLDER;

    const color = betError ? 'danger' : 'purple';

    return (
      <Card size="medium">
        <StartTitle>{CONSTANTS.TITLE}</StartTitle>
        <InputField
          color={color}
          onChange={this.onBetAmountChange}
          placeholder={placeholder}
        />
        <Button
          bgColor="darkPink"
          hoverColor="darkerPink"
          color="white"
          height="50px"
          size="xl"
          width="200px"
          onClick={()=> placeBet(betAmount, quizInstance, userAddress, changeView)}
        >
          {CONSTANTS.PLACE_BET}
        </Button>
      </Card>

    );
  }
}

PlaceBet.propTypes = {
  userAddress: PropTypes.string,
  quizInstance: PropTypes.object,
  placeBet: PropTypes.func.isRequired,
  betError: PropTypes.bool,
  changeView: PropTypes.func,
}
