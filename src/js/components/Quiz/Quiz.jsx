import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../SharedComponents/Card.js';
import AnswerButton from './AnswerButton.js';
import SubmitButtonAllowed from './SubmitButtonAllowed.js';
import SubmitButtonNotAllowed from './SubmitButtonNotAllowed.js';
import AnswerButtonClicked from './AnswerButtonClicked.js';

const NumQuestions = styled.div`
  font-weight: bold;
  color: lightgray;
  width: 30%;
  text-align: right;
  display: inline-block;
  margin-bottom: 30px;
`;

const Timer = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: lightgray;
  width: 67%;
  text-align: left;
  display: inline-block;
`;

const Question  = styled.div`
  font-weight: bold;
`;

export default class Quiz extends React.Component {

  componentWillMount() {
    this.props.initializeQuestions();
    this.props.lowerTimer();
  }

  answerAndGetNextQuestion(e) {
    e.preventDefault();
    this.props.answerQuestion(this.props.question, this.props.answer);
  }

  handleClick(e, answer) {
    e.preventDefault();
    this.props.changeAnswer(answer);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timer === 0) {
      this.props.answerQuestion(this.props.question, '-1');
    }
  }

  render() {
    const { question, timer, numQuestions, answer, index, endQuiz } = this.props;

    /* finish loading Quiz and question */
    if (question && numQuestions > 0) {
      return (
        <div>
          <Card>
            <Timer> {timer} seconds </Timer>
            <NumQuestions> {index+1} / {numQuestions} Questions </NumQuestions>
            <Question> {question.question} </Question>
          </Card>
          <div>
            {(answer === 'A')
            ? <AnswerButtonClicked onClick={(e) => this.handleClick(e, 'A')}> {question.A} </AnswerButtonClicked>
            : <AnswerButton onClick={(e) => this.handleClick(e, 'A')}> {question.A} </AnswerButton>}
            {(answer === 'B')
            ? <AnswerButtonClicked onClick={(e) => this.handleClick(e, 'B')}> {question.B} </AnswerButtonClicked>
            : <AnswerButton onClick={(e) => this.handleClick(e, 'B')}> {question.B} </AnswerButton>}
          </div>
          <div>
            {(answer === 'C')
            ? <AnswerButtonClicked onClick={(e) => this.handleClick(e, 'C')}> {question.C} </AnswerButtonClicked>
            : <AnswerButton onClick={(e) => this.handleClick(e, 'C')}> {question.C} </AnswerButton>}
            {(answer === 'D')
            ? <AnswerButtonClicked onClick={(e) => this.handleClick(e, 'D')}> {question.D} </AnswerButtonClicked>
            : <AnswerButton onClick={(e) => this.handleClick(e, 'D')}> {question.D} </AnswerButton>}
          </div>
          {(answer && !endQuiz) && <SubmitButtonAllowed onClick={(e) => this.answerAndGetNextQuestion(e)}> Submit </SubmitButtonAllowed>}
          {(!answer || endQuiz) && <SubmitButtonNotAllowed> Submit </SubmitButtonNotAllowed>}
        </div>
      );
    } else {
      return (
        <div> </div>
      );
    }
  }
}

Quiz.propTypes = {
  quizInstance: PropTypes.object,
  question: PropTypes.object,
  timer: PropTypes.number,
  numQuestions: PropTypes.number,
  initializeQuestions: PropTypes.func,
  changeAnswer: PropTypes.func,
  lowerTimer: PropTypes.func,
  answerQuestion: PropTypes.func,
  endQuiz: PropTypes.bool
};
