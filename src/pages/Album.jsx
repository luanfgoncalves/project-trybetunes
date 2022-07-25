import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusic from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      musicData: {},
    };
  }

  componentDidMount() {
    this.recoverMusics();
  }

  recoverMusics = async () => {
    const { match } = this.props;
    const musics = await getMusic(match.params.id);
    this.setState({
      musicData: musics[0],
      musics: musics.filter((element) => (
        element.kind === 'song'
      )),
    });
  }

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
              />
            ))}
            <p>{ favorites }</p>
          </div>
        ) : (
          <Loading />
        )}
        ;
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.arrayOf(Object), // prop vinda da url pelo router dom (12.2 Componentes do Route e passagem de parâmetros)
}.isRequired;

export default Album;
