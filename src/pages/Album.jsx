import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album Page</p>
        {/* <p>{`Album ${this.props.match.params.id}`}</p> */}
      </div>
    );
  }
}

export default Album;
