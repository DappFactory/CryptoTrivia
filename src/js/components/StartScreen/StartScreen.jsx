import React from 'react';
import PropTypes from 'prop-types';
import Button from '../SharedComponents/Button';
import Card from '../SharedComponents/Card';
import Title from '../SharedComponents/Title';
import InputField from '../SharedComponents/InputField/InputField';

const StartButton = Button.extend`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
`;

const Banner = (props) => (
  <Card>
    {props.children}
    <StartButton 
      bgColor="darkPink" 
      color="white"
      height="50px"
      width="200px"
    >
      Start
    </StartButton>
  </Card>
);

Banner.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

const StartScreen = () => (
  <Banner>
    <Title>Configure your quiz</Title>
    <InputField placeholder="Amount to bet"/>
  </Banner>
);


export default StartScreen;