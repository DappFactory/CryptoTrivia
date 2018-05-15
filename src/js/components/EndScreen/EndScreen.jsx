import React from 'react';
import styled from 'styled-components';
import { BigNumber } from 'bignumber.js';

import Title from '../SharedComponents/Title';
import Text from '../SharedComponents/Text';
import Card from '../SharedComponents/Card';
import Button from '../SharedComponents/Button';

import CONSTANTS from './constants';

const Span = styled.span`
  font-size: 1.25em;
`;

export default class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionCorrect: 0,
      reward: 0,
    }
  }

  componentDidMount = () => {
    const { quizInstance, userAddress } = this.props;
    quizInstance.getQuestionsCorrect({
      from: userAddress
    })
    .then((questionsCorrect) => {
      const result = new BigNumber(questionsCorrect);
      console.log(result);
      this.setState({ questionsCorrect: result.toNumber() })
    });

    quizInstance.distributeReward({
      from: userAddress
    })
    .then((reward) => {
      console.log(reward);
      const result = new BigNumber(reward);
      console.log(result);
      this.setState( { reward })
    })
  }

  render() {
    const correctRate = `${this.state.questionsCorrect}/5`;
    const result = `${CONSTANTS.PRE_RESULT} ${this.state.reward} ${CONSTANTS.POST_RESULT}`;

    return (
      <Card size="medium">
        <Title size="small">
          {CONSTANTS.PRE_TITLE}
          <Span>&nbsp;{correctRate}&nbsp;</Span>
          {CONSTANTS.POST_TITLE}
        </Title>
        <Text
          justify="center"
          size="xl"
        >
         {result}
        </Text>
        <Button
          bgColor="darkPink"
          hoverColor="darkerPink"
          color="white"
          height="50px"
          size="xl"
          width="200px"
        >
          {CONSTANTS.PLAY_AGAIN}
        </Button>
      </Card>
    );
  }
}