import styled from 'styled-components';
import * as colors from '../../styles/colors';

const getButtonHeight = ({ size }) => {
  const buttonSize = size ? size.toLowerCase() : null;
  switch (buttonSize) {
    case 'small':
      return '30px';
    case 'medium':
      return '40px';
    case 'large':
      return '50px';
    case 'xl':
      return '60px';
    default:
      return buttonSize ? `${buttonSize}` : '40px';
  }
}

const getButtonTextSize = ({ size }) => {
  const textSize = size ? size.toLowerCase() : null;
  switch (textSize) {
    case 'small':
      return '14px';
    case 'medium':
      return '18px';
    case 'large':
      return '22px';
    case 'xl':
      return '26px';
    default:
      return textSize ? `${textSize}` : '14px';
  }
}

export default styled.button`
  width: ${props => props.width};
  height: ${getButtonHeight};
  font-size: ${getButtonTextSize};
  text-align: center;
  padding: 10px 20px;
  margin: 8px;
  background-color: ${props => `${colors[props.bgColor]}`};
  color: ${props => `${colors[props.color]}`};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => `${colors[props.hoverColor]}`};
  }
  
  &:focus {
    outline: none;
    background-color: ${props => `${colors[props.hoverColor]}`};
  }
`;