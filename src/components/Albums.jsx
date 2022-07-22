import React, { Component } from 'react';
import { arrayOf, string } from 'prop-types';

export class Albums extends Component {
  render() {
    const { artist, albums } = this.props;
    return (
      <div>Albums</div>
    );
  }
}

Albuns.propTypes = {
  artist: string.isRequired,
  albums: arrayOf(shape({})).isRequired,
};

export default Albums;
