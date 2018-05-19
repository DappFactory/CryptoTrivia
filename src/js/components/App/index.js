import { connect } from 'react-redux';
import App from './App';
import {
  initializeAllContracts,
  changeView
} from './reducers'

// props for App Component
const mapStateToProps = state =>  ({
  isLoading: state.app.isLoading,
  quizInstance: state.app.quizInstance,
  contractError: state.start.contractError,
  quizError: state.quiz.error,
  view: state.app.view
})

//functions
const mapDispatchToProps = {
  initializeAllContracts,
  changeView
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
