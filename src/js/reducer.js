import { combineReducers } from 'redux';
import app from './components/App/reducers';
import quiz from './components/Quiz/reducers';

export default combineReducers({
  app,
  quiz
})
