import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';

const Sort = ({
  sortKey, onSort, activeSortKey, children
}) => {
  const sortClass = classNames('button-inline',
    { 'button-active': sortKey === activeSortKey });
  return (
    <Button onClick={() => onSort(sortKey)} type="button" className={sortClass}>{children}</Button>
  );
};

Sort.propTypes = {
  sortKey: PropTypes.string.isRequired,
  activeSortKey: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Sort;
