import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import Button from '../Button';
import Sort from '../Sort';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse()
};

const largeColumn = {
  width: '40%'
};
const midColumn = {
  width: '30%'
};
const smallColumn = {
  width: '10%'
};

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(key) {
    const { sortKey, isSortReverse } = this.state;
    const setIsSortReverse = sortKey === key && !isSortReverse;
    this.setState({ sortKey: key, isSortReverse: setIsSortReverse });
  }

  render() {
    const {
      list,
      onDismiss
    } = this.props;
    const {
      sortKey,
      isSortReverse
    } = this.state;
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;
    return (
      <div className="table">
        <div className="table-header">
          <span style={largeColumn}>
            <Sort sortKey="TITLE" onSort={this.onSort} activeSortKey={sortKey}>Title</Sort>
          </span>
          <span style={midColumn}>
            <Sort sortKey="AUTHOR" onSort={this.onSort} activeSortKey={sortKey}>Author</Sort>
          </span>
          <span style={smallColumn}>
            <Sort sortKey="COMMENTS" onSort={this.onSort} activeSortKey={sortKey}>Comments</Sort>
          </span>
          <span style={smallColumn}>
            <Sort sortKey="POINTS" onSort={this.onSort} activeSortKey={sortKey}>Points</Sort>
          </span>
          <span style={smallColumn}>
        Archive
          </span>
        </div>
        {reverseSortedList.map((item) => {
          const onHandleDismiss = () => onDismiss(item.objectID);
          return (
            <div key={item.objectID} className="table-row">
              <span style={largeColumn}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a></span>
              <span style={midColumn}>{item.author}</span>
              <span style={smallColumn}>{item.num_comments}</span>
              <span style={smallColumn}>{item.points}</span>
              <span style={smallColumn}><Button onClick={onHandleDismiss} className="button-inline" type="button">Dismiss</Button></span>
            </div>
          );
        })}
      </div>
    );
  }
}

Table.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired
};

export default Table;
