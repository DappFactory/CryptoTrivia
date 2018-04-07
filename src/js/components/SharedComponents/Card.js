import styled from 'styled-components';
import * as colors from '../../styles/colors';

const getSize = (size, customSize) => {
  const cardSize = size ? size.toLowerCase() : null;
  switch (cardSize) {
    case 'small':
      return '200px';
    case 'medium':
      return '350px';
    case 'large':
      return '500px';
    default:
      return customSize ? `${customSize}` : '200px';
  }
}

export default styled.div`
  width: ${props => getSize(props.size, props.width)};
  height:${props => getSize(props.size, props.height)};
  border-radius: 8px;
  background-color: ${colors.snow};
  margin: 50px auto;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  position: relative;
  padding: 32px;
`;