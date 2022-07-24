import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/">Login</Link>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/album/:id">Albums</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        <div data-testid="header-user-name">
          { isLoginHappening && <Loading /> }
          { isLoginFinished && username }
        </div>
        {/* {isLoginHappening && <Loading /> } */}
        {/* {isLoginFinished && <a href="/profile" data-testid="header-user-name"> { username } </a> } */}

      </header>
    );
  }
}

export default Header;
