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
      musicList: {},
    };
  }

  componentDidMount = async () => {
    const { match } = this.props; // recupera o match do router-dom, com id como prop vinda da url
    const musics = await getMusic(match.params.id);
    this.setState({
      musicList: musics[0],
    });
    this.setState({
      musics: musics.filter((element) => (
        element.kind === 'song'
      )),
    });
  }

  render() {
    const { musics, musicList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musics.length > 0 ? (
          <div>
            <p data-testid="artist-name">
              { musicList.artistName }
            </p>
            <p data-testid="album-name">
              { musicList.collectionName }
            </p>
            {musics.map((music, index) => ( // mapeamento via props- Jarbas
              <MusicCard
                music={ music }
                key={ index }
              />
            ))}
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
