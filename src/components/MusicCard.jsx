import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { music } = this.props;
    return (
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default MusicCard;
