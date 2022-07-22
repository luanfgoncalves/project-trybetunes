import React, { Component } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Albums from './Albums';

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      isSearchButtonDisabled: true,
      artistName: '',
      isSearchHappening: false,
      isSearchFinished: false,
      albums: [],
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

    onSearchButtonClick = async () => {
      const { artistName } = this.state;
      console.log('O botão de pesquisa foi clicado');
      this.setState({ isSearchHappening: true });
      console.log('A busca pelo artista está ocorrendo');
      const data = await searchAlbumsAPI(artistName);
      const result = await data;
      this.setState({ albums: result, isSearchHappening: false, isSearchFinished: true });
      console.log('Abusca pelo artista foi concluida');
    }

    render() {
      const {
        isSearchButtonDisabled,
        artistName,
        isSearchHappening,
        isSearchFinished,
        albums,
      } = this.state;
      if (isSearchHappening) return (<Loading />);
      return (
        <main>
          {/* { isSearchHappening && <Loading /> && { formStyle: 'hidden' } } */}

          <form className="SearchForm">

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

          { isSearchFinished
          && albums.map((album) => (
            <Albums
              key={ album.collectionId }
              artist={ album.artistName }
              collectionName={ album.collectionName }
              artworkUrl100={ album.artworkUrl100 }
              collectionId={ album.collectionId }
            />
          ))}
          ;

        </main>

      );
    }
}

export default SearchForm;
