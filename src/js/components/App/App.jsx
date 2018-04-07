import React from 'react';
import PropTypes from 'prop-types';
import ToggleAppInfo from '../ToggleAppInfo';
import Loader from '../SharedComponents/Loader.js';
import ButtonWrapper from './ButtonWrapper.js';
import AppBody from './AppBody.js';
import StartScreen from '../StartScreen/StartScreen';

export default class App extends React.Component {

  componentWillMount() {
    this.props.initializeAllContracts()
  }

  /** waits for all promises to resolve so we don't have to wrap all functions
      in 'if (exists) kind of stuff'
  **/
  render() {
    if (this.props.isLoading) {
      return (
        <Loader>Is loading...</Loader>
      );
    } else {
      return (
        <AppBody>
          <StartScreen/>
          {/*
          <ButtonWrapper>
            <ToggleAppInfo
              getMethod="getMaxNumberPlayers"
              hideLabel="Hide Max Players"
              showLabel="Show Max Players"
              quizInstance={this.props.quizInstance}
            />

            <ToggleAppInfo
              getMethod="getTotalBet"
              hideLabel="Hide Pot Size"
              showLabel="Show Pot Size"
              quizInstance={this.props.quizInstance}
            />
          </ButtonWrapper>
          */}
        </AppBody>
      );
    }
  }
}

App.propTypes = {
  isLoading: PropTypes.bool,
  quizInstance: PropTypes.object,
  initializeAllContracts: PropTypes.func
};
