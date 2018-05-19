import { combineReducers } from 'redux';
import app from './components/App/reducers';
import quiz from './components/Quiz/reducers';
import start from './components/StartQuiz/reducers';
import placeBet from './components/PlaceBet/reducers';

export default combineReducers({
  app,
  quiz,
  start,
  placeBet,
})
