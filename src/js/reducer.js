import { combineReducers } from 'redux'
import app from './components/App/reducers'
import start from './components/StartScreen/reducers';

export default combineReducers({
  app,
  start,
})
