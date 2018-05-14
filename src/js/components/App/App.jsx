import React from 'react';
import PropTypes from 'prop-types';
import Quiz from '../Quiz';
import Banner from '../SharedComponents/Banner';
import AppBody from './AppBody';
import StartQuiz from '../StartQuiz';
import PlaceBet from '../PlaceBet';
import EndScreen from '../EndScreen';

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
    } else if (this.props.contractError || this.props.quizError) {
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
        <PlaceBet />
      );
    }
  }

  renderEndScreen() {
    return <EndScreen />
  }

  render() {
    const hasError = this.props.contractError || this.props.quizError;
    return (
      <div>
        <AppBody>
          {(!hasError && this.props.view === 'placebet') && <PlaceBet changeView={this.props.changeView} />}
          {(!hasError && this.props.view === 'start') && <StartQuiz changeView={this.props.changeView} />}
          {(!hasError && this.props.view === 'quiz') && <Quiz changeView={this.props.changeView} /> }
          {(!hasError && this.props.view === 'end') && <EndScreen changeView={this.props.changeView} /> }
        </AppBody>
        {this.renderBanner()}
      </div>
    );
  }
}

App.propTypes = {
  isLoading: PropTypes.bool,
  quizInstance: PropTypes.object,
  view: PropTypes.string,
  initializeAllContracts: PropTypes.func,
  changeView: PropTypes.func
};
