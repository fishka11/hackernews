import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  className,
  type,
  onClick,
  children
// eslint-disable-next-line react/button-has-type
}) => <button onClick={onClick} type={type} className={className}>{children}</button>;

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  className: '',
  onClick: null
};

export default Button;
