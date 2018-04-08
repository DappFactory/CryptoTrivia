import React from 'react';
import styled from 'styled-components';

import Title from '../SharedComponents/Title';
import Text from '../SharedComponents/Text';
import Card from '../SharedComponents/Card';
import Button from '../SharedComponents/Button';

import CONSTANTS from './constants';

const Span = styled.span`
  font-size: 1.25em;
`;

export default class StartScreen extends React.Component {
  render() {
    const correctRate = "18/20";
    const etherAmount = "250";
    const result = `${CONSTANTS.PRE_RESULT} ${etherAmount} ${CONSTANTS.POST_RESULT}`;

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