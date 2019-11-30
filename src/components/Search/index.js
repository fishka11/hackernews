import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchRef = null;
    this.setSearchRef = (element) => {
      this.searchRef = element;
    };
  }

  componentDidMount() {
    if (this.searchRef) this.searchRef.focus();
  }

  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={this.setSearchRef}
        />
        <Button type="submit">
          {children}
        </Button>
      </form>
    );
  }
}

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Search;
