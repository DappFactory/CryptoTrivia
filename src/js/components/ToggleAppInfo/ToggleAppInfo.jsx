import React from 'react';
import PropTypes from 'prop-types';
import Button from '../SharedComponents/Button.js';
import InfoContainer from './InfoContainer';
import ButtonGroup from './ButtonGroup';

export default class ToggleAppInfo extends React.Component {
  state = {
    isClicked: false,
    info: null,
  };

  toggleInfoPanel() {
    const { quizInstance, getMethod } = this.props;
    const { isClicked } = this.state;

    if (!isClicked) {
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
          <InfoContainer className="max-players">
            {info}
          </InfoContainer>
        }
      </div>
    );
  }

  render() {
    const { hideLabel, showLabel } = this.props;
    const buttonLabel = (this.state.isClicked) ? hideLabel : showLabel;

    return (
      <ButtonGroup>
        <Button onClick={() => this.toggleInfoPanel()}>
          { buttonLabel }
        </Button>
        { this.renderInfo() }
      </ButtonGroup>
    );
  }
}

ToggleAppInfo.propTypes = {
  getMethod: PropTypes.string,
  hideLabel: PropTypes.string,
  info: PropTypes.string,
  quizInstance: PropTypes.object,
  showLabel: PropTypes.string,
};
