import React from 'react';
import styled from 'styled-components';
import * as colors from '../../styles/colors';

const InputFieldWrapper = styled.div`
  width: 240px;
  margin: 16px auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  box-sizing: border-box;
  margin-top: 8px;
  &:focus {
    outline: solid 1px ${props => `${colors[props.color]}`};
  }
`;

const Label = styled.label`
  color: ${props => `${colors[props.color]}`};
  margin-bottom: 8px;
`

export default (props) => (
  <InputFieldWrapper>
    <Label color={props.color}>{props.placeholder}</Label>
    <Input
      color={props.color}
      onChange={(e) => props.onChange(e.target.value)}
    />
  </InputFieldWrapper>
);
