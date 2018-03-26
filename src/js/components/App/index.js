import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import App from './App'

const initialState = {

}

// props for App Component
const mapStateToProps = state => {
    console.log(state)
    return {
      isLoading: state.isLoading
    }
}

//functions
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => console.log('hello')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
