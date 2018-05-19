import styled from 'styled-components';
import * as colors from '../../styles/colors';

export default styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: ${props => `${colors[props.bgColor]}`};
  color: ${props => `${colors[props.color]}`};
  text-align: center;
  padding: 8px;
`;