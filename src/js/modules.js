import Web3 from 'web3'

export const GET_WEB_3 = 'GET_WEB_3';
export const IS_LOADING = 'IS_LOADING';

const initialState = {
  web3: null,
  isLoading: true
};

export function getWeb3() {
  return (dispatch) => {
    new Promise(function(resolve, reject) {
      window.addEventListener('load', function() {
        let web3 = window.web3
        if (typeof web3 !== 'undefined') {
          web3 = new Web3(web3.currentProvider)
          resolve({ web3: web3 })
          dispatch({ type: GET_WEB_3, payload: web3 })
          dispatch({ type: IS_LOADING, payload: false })
        } else {
          const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
          web3 = new Web3(provider)
          resolve({ web3: web3 })
          dispatch({ type: GET_WEB_3, payload: web3 })
          dispatch({ type: IS_LOADING, payload: false })
        }
      })
    })
  }
}


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WEB_3: return { ...state, web3: action.payload }
    case IS_LOADING: return { ...state, isLoading: action.payload }

    default: return state
  }
}
