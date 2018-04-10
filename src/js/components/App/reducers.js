import Web3 from 'web3'
import TruffleContract from 'truffle-contract';
import QuizContract from '../../../../build/contracts/Quiz.json';

export const QUIZ_INSTANCE = 'APP/QUIZ_INSTANCE';
export const IS_LOADING = 'APP/IS_LOADING';
export const ERROR = 'APP/ERROR';
export const USER_ADDRESS = 'APP/USER_ADDRESS';

const initialState = {
  quizInstance: null,
  isLoading: true,
  userAddress: null
};

function getWeb3() {
  return new Promise(function(resolve, reject) {
    window.addEventListener('load', function() {
      let web3 = window.web3;
      if (typeof web3 !== 'undefined') {

        // ADD: Added this line here to extract default account
        const defaultAccount = web3.eth.defaultAccount;

        web3 = new Web3(web3.currentProvider);

        // ADD: Pass this defaultAccount
        resolve({ web3: web3, defaultAccount })
      } else {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
        web3 = new Web3(provider)
        resolve({ web3: web3 })
      }
    })
  })
}

// right now just does quiz, but can initialize all contracts here to pass as props
export function initializeAllContracts() {
  return (dispatch) => {
    getWeb3().then(results => {
      let quizContract = TruffleContract(QuizContract);
      quizContract.setProvider(results.web3.currentProvider);
      if (typeof quizContract.currentProvider.sendAsync !== "function") {
        quizContract.currentProvider.sendAsync = function() {
          return quizContract.currentProvider.send.apply(
            quizContract.currentProvider, arguments
          );
        };
      }

      quizContract.at('0x2336433bf2e08e2a03594f39b96736877eab3bac').then(instance => {
        console.log(instance);
        // ADD: dispatch here and save it in the state.
        dispatch({ type: USER_ADDRESS, payload: results.defaultAccount })
        dispatch({ type: QUIZ_INSTANCE, payload: instance })
        dispatch({ type: IS_LOADING, payload: false })
      });

    }).catch((err) => {
      console.log('Error in index - initializeContract:', err);
      dispatch({ type: ERROR, payload: err })
      dispatch({ type: IS_LOADING, payload: false })
    });
  }
}


export default (state = initialState, action) => {
  switch (action.type) {
    case QUIZ_INSTANCE: return { ...state, quizInstance: action.payload }
    case IS_LOADING: return { ...state, isLoading: action.payload }
    case ERROR: return { ...state, isLoading: action.payload }
    case USER_ADDRESS: return { ...state, userAddress: action.payload }

    default: return state
  }
}
