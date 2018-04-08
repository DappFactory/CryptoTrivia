import styled from 'styled-components';
import * as colors from '../../styles/colors';

const getTextSize = ({ size }) => {
  const textSize = size ? size.toLowerCase() : null;
  switch (textSize) {
    case 'small':
      return '1em';
    case 'medium':
      return '1.5em';
    case 'large':
      return '2em';
    case 'xl':
      return '2.5em';
    default:
      return '1em';
  }
}

const justifyContent = ({ justify }) => {
  const justifyText = justify ? justify.toLowerCase() : null;
  switch (justifyText) {
    case 'left':
      return 'left';
    case 'center':
      return 'center';
    case 'right':
      return 'right';
    default:
      return 'left';
  }
}

export default styled.p`
  text-align: ${justifyContent};
  font-size: ${getTextSize};
  color: ${props => `${colors[props.colors]}`};
`;