import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <a href="/">Login</a>
        <a href="/search">Search</a>
        <a href="/favorites">Favorites</a>
        <a href="/album/:id">Albums</a>
        <a href="/profile">Profile</a>
      </header>
    );
  }
}

export default Header;
