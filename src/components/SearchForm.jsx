import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Albums from './Albums';

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      isSearchButtonDisabled: true,
      inputData: '',
      searchedArtist: '',
      isSearchHappening: false,
      isSearchFinished: false,
      albums: [],
    };
  }

    handleChange = (event) => {
      const { target } = event;
      const minimalinputDataLength = 2;
      this.setState({
        inputData: target.value,
        isSearchButtonDisabled: target.value.length < minimalinputDataLength,
      });
    }

    onSearchButtonClick = () => {
      const { inputData } = this.state;
      this.setState({
        isSearchHappening: true,
        searchedArtist: inputData,
        inputData: '',
      }, async () => {
        const { searchedArtist } = this.state;
        this.setState({
          isSearchHappening: false,
          isSearchFinished: true,
          albums: await searchAlbumsAPI(searchedArtist),
        });
      });
    }

    render() {
      const { isSearchButtonDisabled, inputData, isSearchHappening,
        isSearchFinished, albums, searchedArtist } = this.state;
      if (isSearchHappening) return (<Loading />);
      return (
        <main>

          <form>

            <input
              data-testid="search-artist-input"
              id="search-artist-input"
              name="searchArtist"
              type="text"
              placeholder="Artist name"
              value={ inputData }
              onChange={ this.handleChange }
            />

            <button
              data-testid="search-artist-button"
              id="search-artist-button"
              type="submit"
              disabled={ isSearchButtonDisabled }
              onClick={ this.onSearchButtonClick }
            >
              Pesquisar
            </button>

          </form>

          { isSearchFinished && (
            <div>
              { albums.length > 0
                ? <Albums searchedArtist={ searchedArtist } albums={ albums } />
                : <p>Nenhum álbum foi encontrado</p>}
            </div>
          )}

        </main>

      );
    }
}

export default SearchForm;
