import React from 'react';
import PropTypes from 'prop-types';

import Card from '../SharedComponents/Card';;
import Button from '../SharedComponents/Button';
import StartTitle from '../SharedComponents/StartTitle';
import CONSTANTS from './constants';

const StartQuiz = (props) => {
  const {
    changeView,
    quizInstance,
    startQuiz,
    userAddress,
  } = props;

  return (
    <Card size="medium">
      <StartTitle>{CONSTANTS.TITLE}</StartTitle>
      <Button
        bgColor="darkPink"
        hoverColor="darkerPink"
        color="white"
        height="50px"
        size="xl"
        width="200px"
        onClick={()=> startQuiz(quizInstance, userAddress, changeView)}
      >
        {CONSTANTS.START}
      </Button>
    </Card>
  );
}

StartQuiz.propTypes = {
  changeView: PropTypes.func.isRequired,
  quizInstance: PropTypes.object.isRequired,
  startQuiz: PropTypes.func.isRequired,
  userAddress: PropTypes.string.isRequired,
}

export default StartQuiz;
