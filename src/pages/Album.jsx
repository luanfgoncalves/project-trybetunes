import React from 'react';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <p>Album Page</p>
        {/* <p>{`Album ${this.props.match.params.id}`}</p> */}
      </div>
    );
  }
}

export default Album;
