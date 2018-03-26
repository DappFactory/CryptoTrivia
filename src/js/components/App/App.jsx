import React from 'react';
import PropTypes from 'prop-types';
import ToggleAppInfo from '../ToggleAppInfo';
import './App.css';

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
        <div className="app-loading"> </div>
      );
    } else {
      return (
        <div className="app-main-container">
          <div className="app-toggle-btn-wrapper">
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
          </div>
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
