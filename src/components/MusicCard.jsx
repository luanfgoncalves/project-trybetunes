import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isFavoriting: false,
      isFavorited: false,
    };
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
  }

  render() {
    const { music } = this.props;
    const { isFavoriting, isFavorited } = this.state;
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
            <input
              data-testid={ `checkbox-music-${music.trackId}` }
              type="checkbox"
              onChange={ this.addToFavorite }
              checked={ isFavorited }
            />

          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default MusicCard;
