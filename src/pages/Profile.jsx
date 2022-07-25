import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userName: '',
      userInfo: '',
      userEmail: '',
      userImg: '',
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const userData = await getUser();
    this.setState({
      isLoading: false,
      userName: userData.name,
      userInfo: userData.description,
      userEmail: userData.email,
      userImg: userData.image,
    });
  }

  render() {
    const {
      isLoading,
      userName,
      userInfo,
      userEmail,
      userImg,
    } = this.state;
    // if (isLoading === true) return (<Loading />);
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading && <Loading />}
        <img data-testid="profile-image" src={ userImg } alt={ userName } />
        <p>{`Nome: ${userName}`}</p>
        <p>{`Email: ${userEmail}`}</p>
        <p>{`Descrição: ${userInfo}`}</p>
        <Link to="/profile/edit">
          <button type="button">Editar perfil</button>
        </Link>
        <p>Profile page</p>
      </div>
    );
  }
}

export default Profile;
