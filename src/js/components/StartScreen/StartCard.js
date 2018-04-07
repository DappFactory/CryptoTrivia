import React from 'react';
import PropTypes from 'prop-types';
import Button from '../SharedComponents/Button';
import Card from '../SharedComponents/Card';

const StartButton = Button.extend`
  position: absolute;
  bottom: 52px;
  left: 50%;
  transform: translateX(-50%);
`;

const StartCard = (props) => (
  <Card size="medium">
    {props.children}
    <StartButton 
      bgColor="darkPink" 
      hoverColor="darkerPink"
      color="white"
      height="50px"
      size="xl"
      width="200px"
    >
      Start
    </StartButton>
  </Card>
);

StartCard.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default StartCard;