import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isFavorited: false,
    };
  }

  // componentDidMount() {
  //   this.recoverFavoriteSongs();
  // }

  addToFavorite = async () => {
    const { trackId } = this.props;
    this.setState({
      isLoading: true,
    });
    await addSong({ trackId });
    // await getFavoriteSongs(); // req 10
    this.setState({
      isLoading: false,
      isFavorited: true,
    });
  }

  // recoverFavorites = async () => {
  //   this.setState({ isLoading: true });
  //   const favoriteMusics = await getFavoriteSongs();
  //   this.setState({
  //     favorites: favoriteMusics,
  //   });
  // }

  // removeFavorite = () => {

  // }

  render() {
    const { trackName, trackId, artwork } = this.props;
    const { isLoading, isFavorited } = this.state;
    return (
      <div>
        { isLoading ? (<Loading />
        ) : (
          <div>
            {trackName}
            <audio
              data-testid="audio-component"
              src={ artwork }
              controls
            >
              <track kind="captions" />
              `O seu navegador não suporta o elemento`
              <code>audio</code>
              .
            </audio>
            <input
              data-testid={ `checkbox-music-${trackId}` }
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
  trackName: PropTypes.string,
  trackId: PropTypes.string,
  artwork: PropTypes.string,
}.isRequired;

export default MusicCard;
