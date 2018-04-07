import styled from 'styled-components';
import * as colors from '../../styles/colors';

export default styled.div`
  width: ${props => props.width};
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 20px;
  background-color: ${props => `${colors[props.bgColor]}`};
  color: ${props => `${colors[props.color]}`};
  cursor: pointer;
  border-radius: 4px;
`;