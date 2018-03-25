import React from 'react'
import ReactDOM from 'react-dom'
import QuizContract from '../../build/contracts/Quiz.json'
import getWeb3 from '../utils/web3util'
import '../css/index.css'
import TruffleContract from 'truffle-contract'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false,
      web3: null,
      quizInstance: null,
    }
  }

  componentWillMount() {
    getWeb3.then(results => {
      let quizContract = TruffleContract(QuizContract)
      quizContract.setProvider(results.web3.currentProvider)
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
        })
      })

    }).catch((err) => {
      console.log(err)
    })
  }

  showMaxPlayers() {
    if (this.state.quizInstance && !this.state.isClicked) {
      this.state.quizInstance.getMaxNumberPlayers().then(result => {
        this.setState({
          isClicked: true,
          maxPlayers: result.c[0]
        })
      })
    } else {
      this.setState({
        isClicked: false
      })
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="sample-button" onClick={() => this.showMaxPlayers()}>
          {(this.state.isClicked) ? 'Hide Max Players' : 'Show Max Players'}
        </div>
        {(this.state.isClicked) &&
        <div className="max-players">
          {this.state.maxPlayers}
        </div>}
      </div>
    )
  }
}

ReactDOM.render( <App / > , document.querySelector('#root'))
