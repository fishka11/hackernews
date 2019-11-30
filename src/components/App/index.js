import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import {
  DEFAULT_QUERY, DEFAULT_HPP, PATH_BASE, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE, PARAM_HPP
} from '../../constants';
import Search from '../Search';
import Table from '../Table';
import Button from '../Button';

const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  const updatedHits = [...oldHits, ...hits];
  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
  };
};

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      fetchError: null,
      isLoading: false
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line no-underscore-dangle
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-underscore-dangle
    this._isMounted = false;
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({ results: { ...results, [searchKey]: { hits: updatedHits, page } } });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  }

  needsToSearchTopStories(searchTerm) {
    const { results } = this.state;
    return !results[searchTerm];
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then((result) => {
        // eslint-disable-next-line no-underscore-dangle
        if (this._isMounted) {
          this.setSearchTopStories(result.data);
        }
      })
      .catch(fetchError => this.setState({ fetchError }));
  }

  render() {
    const {
      searchTerm, results, searchKey, error, isLoading
    } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    const buttonType = 'button';
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        <div className="interactions">
          <TableWithFetchError
            error={error}
            list={list}
            onDismiss={this.onDismiss}
          />
          <ButtonWithLoading
            isLoading={isLoading}
            type={buttonType}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

const FetchError = () => <p>Something went wrong.</p>;
// eslint-disable-next-line no-shadow,react/prop-types
const withFetchError = Component => ({ fetchError, ...rest }) => (fetchError
  ? <FetchError />
  : <Component {...rest} />);
const TableWithFetchError = withFetchError(Table);

const Loading = () => <div>Loading...</div>;
// eslint-disable-next-line no-shadow,react/prop-types
const withLoading = Component => ({ isLoading, ...rest }) => (isLoading
  ? <Loading />
  : <Component {...rest} />);
const ButtonWithLoading = withLoading(Button);

export default App;
