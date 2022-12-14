import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import ProfileCard from '../components/ProfileCard';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: '',
      description: '',
      email: '',
      image: '',
    };
  }

  componentDidMount = () => {
    this.fetchApi();
  }

  fetchApi = async () => {
    this.setState({ isLoading: true });
    const userData = await getUser();
    this.setState({
      isLoading: false,
      name: userData.name,
      description: userData.description,
      email: userData.email,
      image: userData.image,
    });
  }

  render() {
    const { isLoading, name, description, email, image } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? (<Loading />
        ) : (
          <ProfileCard
            name={ name }
            description={ description }
            email={ email }
            image={ image }
          />
        )}
        ;
      </div>
    );
  }
}

export default Profile;
