import React, { Component } from 'react';

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      isSearchButtonDisabled: true,
      artistName: '',
    };
  }

    // Habilita o botão de pesquisar caso o nome do artista tenha mais de dois caracteres
    handleChange = (event) => {
      const { target } = event;
      const minimalArtistNameLength = 2;
      this.setState({
        artistName: target.value,
        isSearchButtonDisabled: target.value.length < minimalArtistNameLength,
      });
      console.log('O input do nome ddo artista foi alterado');
    }

    render() {
      const { isSearchButtonDisabled, artistName } = this.state;
      return (
        <form>

          <input
            data-testid="search-artist-input"
            id="search-artist-input"
            name="searchArtist"
            type="text"
            placeholder="Artist name"
            value={ artistName }
            onChange={ this.handleChange }
          />

          <button
            data-testid="search-artist-button"
            id="search-artist-button"
            type="submit"
            disabled={ isSearchButtonDisabled }
          >
            Pesquisar
          </button>

        </form>
      );
    }
}

export default SearchForm;
