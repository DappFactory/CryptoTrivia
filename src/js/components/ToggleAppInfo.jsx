import React from 'react';
import PropTypes from 'prop-types';

export default class ToggleAppInfo extends React.Component {
  state = {
    isClicked: false,
    info: null,
  };

  toggleInfoPanel() {
    const { quizInstance, getMethod } = this.props;
    const { isClicked } = this.state;

    if (quizInstance && !isClicked) {
      quizInstance[getMethod]().then(result => {
        this.setState({
          isClicked: true,
          info: result.c[0]
        })
      }).catch(error => {
        console.log('Error in ToggleAppInfo - displayInfoPanel:', error);
      });
    } else {
      this.setState({
        isClicked: false
      });
    }
  }

  renderInfo() {
    const { isClicked, info } = this.state;
    return (
      <div>
        { (isClicked) &&
          <div className="max-players">
            {info}
          </div>
        }
      </div>
    );
  }

  render() {
    const { hideLabel, showLabel } = this.props;
    const buttonLabel = (this.state.isClicked) ? hideLabel : showLabel;

    return (
      <div className="display-info-panel">
        <div className="sample-button" onClick={() => this.toggleInfoPanel()}>
          { buttonLabel }
        </div>
        { this.renderInfo() }
      </div>
    );
  }
}

ToggleAppInfo.propTypes = {
  getMethod: PropTypes.string,
  hideLabel: PropTypes.string,
  info: PropTypes.string,
  quizInstance: PropTypes.object,
  showLabel: PropTypes.string,
  web3: PropTypes.object,
};