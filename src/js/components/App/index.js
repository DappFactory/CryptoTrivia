import { connect } from 'react-redux';
import App from './App';
import {
  initializeAllContracts
} from './reducers'

// props for App Component
const mapStateToProps = state =>  ({
  isLoading: state.app.isLoading,
  quizInstance: state.app.quizInstance,
  contractError: state.start.contractError,
})

//functions
const mapDispatchToProps = {
  initializeAllContracts
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
