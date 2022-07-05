import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <a href="/">Login</a>
        <a href="/search">Search</a>
        <a href="/favorites">Favorites</a>
        <a href="/albums">Albums</a>
        <a href="/profile">Profile</a>
        <p>Carregando... </p>
      </header>
    );
  }
}

export default Header;
