import React from 'react';
import InputField from '../SharedComponents/InputField/InputField';
import StartCard from './StartCard';
import Title from '../SharedComponents/Title';

const CardTitle = Title.extend`
  margin-bottom: 52px;
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
    return (
      <StartCard>
        <CardTitle>Configure your quiz</CardTitle>
        <InputField
          onChange={this.onBetAmountChange}
          placeholder="Amount to bet"
        />
      </StartCard>
    );
  }
}