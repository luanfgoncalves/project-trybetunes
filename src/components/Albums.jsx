import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Albums extends Component {
  render() {
    const {
      searchedArtist,
      albums,
    } = this.props;
    return (
      <div>
        <p>
          { `Resultado de álbuns de: ${searchedArtist}` }
        </p>
        { albums.map(
          ({
            artistName,
            collectionId,
            collectionName,
            artworkUrl100,
          }) => (
            <Link
              to={ `/album/${collectionId}` }
              key={ collectionId }
              data-testid={ `link-to-album-${collectionId}` }
            >
              <div>
                <img
                  src={ artworkUrl100 }
                  alt={ collectionName }
                />
                <h1>{artistName}</h1>
                <p>{collectionName}</p>
              </div>
            </Link>
          ),
        )}
      </div>
    );
  }
}

Albums.propTypes = {
  searchedArtist: PropTypes.string,
  // albums: PropTypes.arrayOf(shape({})),
  collectionId: PropTypes.string,
  collectionName: PropTypes.string,
  artworkUrl100: PropTypes.string,
}.isRequired;

export default Albums;
