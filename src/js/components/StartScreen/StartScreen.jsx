import React from 'react';
import InputField from '../SharedComponents/InputField';
import Card from '../SharedComponents/Card';;
import Button from '../SharedComponents/Button';
import StartTitle from './StartTitle';
import CONSTANTS from './constants';

export default class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      betAmount: null
    }
    // this.props.startQuiz(this.props.quizInstance, this.props.userAddress);
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
      userAddress,
      changeView,
      start,
      startQuestion,
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
        <div class="btn-group">
          <button onClick={()=> placeBet(betAmount, quizInstance)}>BET</button>
          <button onClick={()=> start(quizInstance)}>START</button>
          <button onClick={()=> startQuestion(quizInstance, changeView)}>START_QUESTION</button>
        </div>
      </Card>

    );
  }
}
