import React from 'react';
import TruffleContract from 'truffle-contract';

import QuizContract from '../../../build/contracts/Quiz.json';
import getWeb3 from '../../utils/web3util';
import ToggleAppInfo from './ToggleAppInfo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      quizInstance: null,
    }
  }

  componentWillMount() {
    this.initializeContract();
  }

  initializeContract() {
    getWeb3.then(results => {
      let quizContract = TruffleContract(QuizContract);
      quizContract.setProvider(results.web3.currentProvider);
      
      if (typeof quizContract.currentProvider.sendAsync !== "function") {
        quizContract.currentProvider.sendAsync = function() {
          return quizContract.currentProvider.send.apply(
            quizContract.currentProvider, arguments
          );
        };
      }

      quizContract.deployed().then(instance => {
        this.setState({
          quizInstance: instance,
          web3: results.web3
        });
      });

    }).catch((err) => {
      console.log('Error in index - initializeContract:', err);
    });
  }

  render() {
    return (
      <div className="main-container">
        <div className="toggle-btn-wrapper">
          <ToggleAppInfo
            getMethod="getMaxNumberPlayers"
            hideLabel="Hide Max Players"
            showLabel="Show Max Players"
            quizInstance={this.state.quizInstance}
            web3={this.state.web3}
          />

          <ToggleAppInfo
            getMethod="getTotalBet"
            hideLabel="Hide Pot Size"
            showLabel="Show Pot Size"
            quizInstance={this.state.quizInstance}
            web3={this.state.web3}
          />
        </div>
      </div>
    );
  }
}
