import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Albums extends Component {
  render() {
    const { artistName,
      // albums,
      collectionId,
      artworkUrl100,
      collectionName,
    } = this.props;
    return (
      <>
        <p>
          { `Albuns de ${artistName}` }
        </p>
        <div>
          <Link
            to={ `/album/${collectionId}` }
            // key={ collectionId }
            data-testid={ `link-to-album-${collectionId}` }
          >
            <img
              src={ artworkUrl100 }
              alt={ collectionName }
            />
          </Link>
          <h1>{ artistName }</h1>
          <p>{ collectionName }</p>
        </div>
      </>
    );
  }
}

Albums.propTypes = {
  artistName: PropTypes.string,
  // albums: PropTypes.arrayOf(shape({})),
  collectionId: PropTypes.string,
  collectionName: PropTypes.string,
  artworkUrl100: PropTypes.string,
}.isRequired;

export default Albums;
