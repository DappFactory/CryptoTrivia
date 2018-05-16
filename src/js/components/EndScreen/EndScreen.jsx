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
      questionsCorrect: 0,
      totalQuestions: 0,
      reward: 0,
    }
  }

  componentDidMount = () => {
    //this.initializeEnd(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props === nextProps || !nextProps.quizInstance) {
      return false;
    }
    this.initializeEnd(nextProps);
  }

  initializeEnd = (props) => {
    const { quizInstance, userAddress } = props;

    // Fetch how many questions correct
    quizInstance.getQuestionsCorrect({ from: userAddress })
      .then((questionsCorrect) => {
        const result = new BigNumber(questionsCorrect);
        this.setState({
          questionsCorrect: result.toNumber(),
        });
      });

    // Fetch total questions
    quizInstance.TotalQuestions({ from: userAddress })
      .then(totalQuestions => this.setState({ totalQuestions }));

    quizInstance.distributeReward({
      from: userAddress,
      gas: 66265,
    })
    .then((reward) => {
      console.log(reward);
      const result = new BigNumber(reward).toNumber();
      console.log('reward: ' + result);
      this.setState( { result })
    })
  }

  render() {
    const correctRate = `${this.state.questionsCorrect}/${this.state.totalQuestions}`;
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