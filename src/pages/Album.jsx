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
      musics: '',
      artistName: '',
      collectionName: '',
      artWork: '',
    };
  }

  componentDidMount = async () => {
    const { match } = this.props; // recupera o match do router-dom, com id como prop vinda da url
    const musicsData = await getMusic(match.params.id);
    this.setState({
      musics: musicsData,
      artistName: musicsData[0].artistName,
      collectionName: musicsData[0].collectionName,
      artWork: musicsData[0].artworkUrl100,
    });
  }

  getSon

  render() {
    const { musics, artistName, collectionName, artWork } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musics.length > 0 ? (
          <div>
            <img
              src={ artWork }
              alt={ artistName }
            />
            <p data-testid="artist-name">
              { artistName }
            </p>
            <p data-testid="album-name">
              { collectionName }
            </p>
            {musics.map((music, index) => ( // mapeamento via props- Jarbas
              <MusicCard
                key={ index }
                trackName={ music.trackName }
                previwUrl={ music.previewUrl }
                trackId={ music.trackId }
              />
            ))}
          </div>
        ) : (
          <Loading />
        )}
        ;
        <p>Album Page</p>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.arrayOf(Object), // prop vinda da url pelo router dom (12.2 Componentes do Route e passagem de parâmetros)
}.isRequired;

export default Album;
