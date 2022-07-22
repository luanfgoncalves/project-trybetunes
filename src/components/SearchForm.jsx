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

    // Habilita o botão de pesquisar caso o nome do artista tenha mais de dois caracteres
    handleChange = (event) => {
      const { target } = event;
      const minimalinputDataLength = 2;
      this.setState({
        inputData: target.value,
        isSearchButtonDisabled: target.value.length < minimalinputDataLength,
      });
      console.log('O input do nome ddo artista foi alterado');
    }

    // requestApi = async () => {
    //   const { searchedArtist } = this.state;
    //   const result = await searchAlbumsAPI(searchedArtist);
    //   const data = await result;
    //   if (data.length > 0) {
    //     this.setState({
    //       albums: data,
    //       isSearchHappening: false,
    //       isSearchFinished: true,
    //     });
    //   }
    // }

    onSearchButtonClick = () => {
      const { inputData } = this.state;
      console.log('O botão de pesquisa foi clicado');
      this.setState({
        isSearchHappening: true,
        searchedArtist: inputData,
        inputData: '',
      }, async () => {
        const { searchedArtist } = this.state;
        console.log('A busca pelo artista está ocorrendo');
        this.setState({
          isSearchHappening: false,
          isSearchFinished: true,
          albums: await searchAlbumsAPI(searchedArtist),
        });
      });
      console.log('Abusca pelo artista foi concluida');
    }

    render() {
      const {
        isSearchButtonDisabled,
        inputData,
        isSearchHappening,
        isSearchFinished,
        albums,
        searchedArtist,
      } = this.state;
      if (isSearchHappening) return (<Loading />);
      return (
        <main>
          {/* { isSearchHappening && <Loading /> && { formStyle: 'hidden' } } */}

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

          {/* { isSearchFinished && <Albums
            artist={ inputData }
            albums={ albums }
          />}
          ; */}
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
