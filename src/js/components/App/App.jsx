import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../SharedComponents/Banner';
import AppBody from './AppBody';
import StartScreen from '../StartScreen/index';
import EndScreen from '../EndScreen/index';


export default class App extends React.Component {

  componentWillMount() {
    this.props.initializeAllContracts()
  }

  /** waits for all promises to resolve so we don't have to wrap all functions
      in 'if (exists) kind of stuff'
  **/

  renderBanner() {
    if (this.props.isLoading) {
      return (
        <Banner
          bgColor="black"
          color="white"
        >
          Is loading...
        </Banner>
      );
    } else if (this.props.contractError) {
      return (
        <Banner
          bgColor="danger"
          color="white"
        >
          Error in contract
        </Banner>
      );
    }
  }

  renderStartScreen() {
    if (!this.props.isLoading) {
      return (
        <StartScreen/>
      );
    }
  }

  renderEndScreen() {
    return <EndScreen />
  }

  render() {
    return (
      <div>
        <AppBody>
          {this.renderStartScreen()}
        </AppBody>
        {this.renderBanner()}
      </div>
    );
  }
}

App.propTypes = {
  isLoading: PropTypes.bool,
  quizInstance: PropTypes.object,
  initializeAllContracts: PropTypes.func
};
