import React from 'react';
import styled from 'styled-components';
import * as colors from '../../../styles/colors';

const InputFieldWrapper = styled.div`
  width: 240px;
  margin-left: auto;
  margin-right: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  box-sizing: border-box;
  margin-top: 8px;
  &:focus {
    outline: solid 1px ${colors.purple};
  }
`;

const Label = styled.label`
  color: ${colors.purple};
  margin-bottom: 8px;
`

export default (props) => (
  <InputFieldWrapper>
    <Label>{props.placeholder}</Label>
    <Input/>
  </InputFieldWrapper>
);
