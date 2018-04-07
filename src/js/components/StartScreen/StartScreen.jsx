import React from 'react';
import InputField from '../SharedComponents/InputField/InputField';
import StartCard from './StartCard';
import Title from '../SharedComponents/Title';
import Button from '../SharedComponents/Button';

const CardTitle = Title.extend`
  margin-bottom: 52px;
`;

const StartButton = Button.extend`
  position: absolute;
  bottom: 52px;
  left: 50%;
  transform: translateX(-50%);
`;

export default class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      betAmount: null
    }
  }

  onBetAmountChange = (value) => {
    if (value) {
      this.setState({ betAmount: value });
    }
  }

  render() {
    const placeholder = this.props.betError ? 'Enter a valid number' : 'Amount to bet';
    const color = this.props.betError ? 'danger' : 'purple';
    
    return (
      <StartCard>
        <CardTitle>Configure your quiz</CardTitle>
        <InputField
          color={color}
          onChange={this.onBetAmountChange}
          placeholder={placeholder}
        />
        <StartButton 
          bgColor="darkPink" 
          hoverColor="darkerPink"
          color="white"
          height="50px"
          size="xl"
          width="200px"
          onClick={()=> this.props.startQuiz(this.state.betAmount)}
        >
          Start
        </StartButton>
      </StartCard>
    );
  }
}