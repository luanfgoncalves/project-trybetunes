import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusic from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      musicData: {},
      // favorites: [], vai pra favorites.jsx
    };
  }

  componentDidMount() {
    this.recoverMusics();
    // this.recoverFavorites();
  }

  recoverMusics = async () => {
    const { match } = this.props; // recupera o match do router-dom, com id como prop vinda da url
    const musics = await getMusic(match.params.id);
    this.setState({
      musicData: musics[0],
      musics: musics.filter((element) => (
        element.kind === 'song'
      )),
    });
  }

  // recoverFavorites = async () => { //  vai ter que ir pro Favorites
  //   const favoriteMusics = await getFavoriteSongs();
  //   this.setState({
  //     favorites: favoriteMusics,
  //   });
  // }

  render() {
    const { musics, musicData, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musics.length > 0 ? (
          <div>
            <p data-testid="artist-name">
              { musicData.artistName }
            </p>
            <p data-testid="album-name">
              { musicData.collectionName }
            </p>
            {musics.map((music, index) => ( // mapeamento via props- Jarbas
              <MusicCard
                music={ music }
                key={ index }
                // check={ favorites } // passa as musicas favoritas direto como props pra renderização condicional pqp agorafoidesgraçadocaralho4hrs60linhasresumidasem5aeeeeeeepqp -- comentado pq voltei com o isFavorited, mas lembre pq a ideia é boa.
              />
            ))}
            <p>{ favorites }</p>
          </div>
        ) : (
          <Loading />
        )}
        ;
        <p>Album Page</p>
        {/* <p>{`Album ${this.props.match.params.id}`}</p> */}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.arrayOf(Object), // prop vinda da url pelo router dom (12.2 Componentes do Route e passagem de parâmetros)
}.isRequired;

export default Album;
