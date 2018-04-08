import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../SharedComponents/Banner.js';
import AppBody from './AppBody.js';
import StartScreen from '../StartScreen/index.js';

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
        <Banner 
          bgColor="black"
          color="white"
        >
          Is loading...
        </Banner>
      );
    } else {
      return (
        <div>
          <AppBody>
            <StartScreen/>
          </AppBody>
          { this.props.contractError && 
            <Banner 
              bgColor="danger"
              color="white"
            >
              Error in contract
            </Banner>
          }
        </div>
      );
    }
  }
}

App.propTypes = {
  isLoading: PropTypes.bool,
  quizInstance: PropTypes.object,
  initializeAllContracts: PropTypes.func
};
