import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isFavoriting: false,
      isFavorited: false,
    };
  }

  componentDidMount = () => {
    this.recoverFavorite();
  }

  recoverFavorite = async () => {
    const { music } = this.props; // declarar music como uma let dentro do escopo geral ?
    // const { favorites } = this.state;
    // const favorite = favorites.some((ai) => ai.trackId === trackId);
    // if (favorite) await removeSong(music);
    const favorite = await getFavoriteSongs(music);
    if (favorite.some((element) => element.trackId === music.trackId)) {
      this.setState({ isFavorited: true });
    }
    if (favorite.some((element) => element.trackId !== music.trackId)) {
      this.setState({ isFavorited: false });
    }
  }

  addToFavorite = async () => {
    const { music } = this.props;
    this.setState({
      isFavoriting: true,
    });
    await addSong(music);
    this.setState({
      isFavorited: true,
      isFavoriting: false,
    });
    this.recoverFavorite(); // ver se da certo req10
  }

  handleFavorite = () => {
    const { isFavorited } = this.state;
    if (isFavorited === false) {
      this.setState({ isFavorited: true });
    }
    if (isFavorited === true) {
      this.setState({ isFavorited: false });
    }
    this.addToFavorite();
  }

  removeFavorite = async () => {
    const { music } = this.props;
    this.setState({ isFavoriting: true });
    await removeSong(music);
    this.setState({ isFavoriting: false }); // Mudar nome do estado pq não tá só favoritando
  }

  render() {
    const { music } = this.props;
    const { isFavoriting,
      isFavorited,
    } = this.state;
    return (
      <div>
        { isFavoriting ? (<Loading />
        ) : (
          <div>
            {music.trackName}
            <audio
              data-testid="audio-component"
              src={ music.previewUrl }
              controls
            >
              <track kind="captions" />
              `O seu navegador não suporta o elemento`
              <code>audio</code>
              .
            </audio>
            <label htmlFor="checkbox">
              <input
                data-testid={ `checkbox-music-${music.trackId}` }
                name="checkbox"
                type="checkbox"
                onChange={ this.handleFavorite } // checa se é favorito antes de adicionar req8
                checked={ isFavorited }
              />
            </label>

          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.object,
}.isRequired;

export default MusicCard;
