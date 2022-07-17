import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      isLoginHappening: false,
      isLoginFinished: false,
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    this.setState({ isLoginHappening: true });
    const { name } = await getUser();
    this.setState({
      username: name,
      isLoginHappening: false,
      isLoginFinished: true,
    });
  }

  render() {
    const { username, isLoginHappening, isLoginFinished } = this.state;
    return (
      <header data-testid="header-component">
        <a href="/">Login</a>
        <a href="/search">Search</a>
        <a href="/favorites">Favorites</a>
        <a href="/album/:id">Albums</a>
        <a href="/profile" data-testid="header-user-name">
          { isLoginHappening && <Loading /> }
          { isLoginFinished && username }
        </a>
        {/* {isLoginHappening && <Loading /> } */}
        {/* {isLoginFinished && <a href="/profile" data-testid="header-user-name"> { username } </a> } */}

      </header>
    );
  }
}

export default Header;
