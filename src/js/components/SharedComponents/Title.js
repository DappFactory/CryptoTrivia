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
      return '2em';
  }
}

export default styled.h1`
  text-align: center;
  color: ${colors.slate};
  margin-bottom: 32px;
  font-size: ${getTextSize};
`;