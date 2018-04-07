import React from 'react';
import PropTypes from 'prop-types';
import Card from '../SharedComponents/Card';

const StartCard = (props) => (
  <Card size="medium">
    {props.children}
  </Card>
);

StartCard.propTypes = {
  children: PropTypes.node,
};

export default StartCard;