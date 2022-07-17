import React from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <SearchForm />
        <p>Search Page</p>

      </div>
    );
  }
}

export default Search;
