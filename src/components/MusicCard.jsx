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
      unFavorite: false,
    };
  }

  componentDidMount = () => {
    this.recoverFavorite();
  }

  recoverFavorite = async () => {
    const { music } = this.props;
    const favorite = await getFavoriteSongs(music);
    if (favorite.some((element) => element.trackId === music.trackId)) {
      this.setState({ isFavorited: true });
    } else { this.setState({ isFavorited: false }); }
  }

  addToFavorite = async () => {
    const { music } = this.props;
    this.setState({ isFavoriting: true });
    await addSong(music);
    this.setState({ isFavoriting: false });
  }

  handleFavorite = () => {
    const { isFavorited } = this.state;
    const { renderedInFavorites } = this.props;
    if (renderedInFavorites === 'renderedInFavorites') {
      this.removeFavorite();
      this.setState({ unFavorite: true });
    } else if (isFavorited === true) {
      this.setState({ isFavorited: false });
      this.removeFavorite();
    } else if (isFavorited === false) {
      this.setState({ isFavorited: true });
      this.addToFavorite();
    }
  }

  removeFavorite = async () => {
    const { music } = this.props;
    this.setState({ isFavoriting: true });
    await removeSong(music);
    this.setState({ isFavoriting: false });
  }

  render() {
    const { music } = this.props;
    const { isFavoriting, isFavorited, unFavorite } = this.state;
    return (
      <div>
        { isFavoriting && <Loading /> }
        { unFavorite ? null
          : (
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
                Favorita
                <input
                  data-testid={ `checkbox-music-${music.trackId}` }
                  id="checkbox"
                  name="checkbox"
                  type="checkbox"
                  onChange={ this.handleFavorite }
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
