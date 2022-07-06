import React from 'react';
import Header from '../components/Header';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <Header />
        <p>Error 404:</p>
        <p>Page not Found</p>
      </div>
    );
  }
}

export default NotFound;
