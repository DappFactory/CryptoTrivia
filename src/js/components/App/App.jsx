import React from 'react';
import PropTypes from 'prop-types';
import ToggleAppInfo from '../ToggleAppInfo';
import Loader from '../SharedComponents/Loader.js';
import ButtonWrapper from './ButtonWrapper.js';
import AppBody from './AppBody.js';
import Quiz from '../Quiz';

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
          <ButtonWrapper>
            <Quiz />
          </ButtonWrapper>
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
