import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
// import ProfileForm from '../components/ProfileForm';
// import { Redirect } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: '',
      description: '',
      email: '',
      image: '',
      isEditButtonBlocked: true,
    //   isEditFinished: false,
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

    onEditButtonClick = async (event) => {
      const { history } = this.props;
      event.preventDefault();
      const { name, email, image, description } = this.state;
      const userData = { name, email, image, description };
      await updateUser(userData);
      history.push('/profile');
      //   this.editFinished();
      //   const updatedData = await getUser();
      //   if (updatedData > 0) { this.editFinished(); }
      //   if (updatedData.name === name
      //       && updatedData.email === email
      //       && updatedData.description === description
      //       && updatedData.image === image) { this.editFinished(); }
    }

    // editFinished = () => {
    //   const { isLoading } = this.state;
    //   if (isLoading === false) { this.setState({ isEditFinished: true }); }
    // }

    handleChange = ({ target: { id, value } }) => {
      this.setState({ [id]: value });
      // handleChange = (event) => {
      //   const { target } = event;
      const { name, email, image, description } = this.state;
      if (name.length > 0
            && email.length > 0
            && image.length > 0
            && description.length > 0
      ) {
        this.setState({ isEditButtonBlocked: false });
      } else {
        this.setState({ isEditButtonBlocked: true });
      }
    }

    render() {
      const { name, email, image, description, isEditButtonBlocked,
      // isEditFinished,
        isLoading } = this.state;
      //   if (isEditFinished === true) { return <Navigate to="/profile" />; }
      //   if (isEditFinished === true
      //     && isLoading === false) { return <Redirect to="/profile" />; }
      return (
        <div data-testid="page-profile-edit">
          <Header />
          <form>
            { isLoading && <Loading /> }
            {/* { isEditFinished && <Redirect to="/profile" /> } */}
            {/* { isEditFinished && <Navigate to="/profile" /> } */}
            <label htmlFor="name">
              <p>User:</p>
              <input
                data-testid="edit-input-name"
                id="name"
                name="name"
                type="text"
                placeholder="Insert your name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              <p>Email:</p>
              <input
                data-testid="edit-input-email"
                id="email"
                name="email"
                type="email"
                placeholder="Insert your email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              <p>Description:</p>
              <input
                data-testid="edit-input-description"
                id="description"
                name="description"
                type="text"
                placeholder="Insert your description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="image">
              <p>Image:</p>
              <input
                data-testid="edit-input-image"
                id="image"
                name="image"
                type="text"
                placeholder="Insert your image"
                value={ image }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="edit-button-save"
              id="edit-button-save"
              type="submit"
              disabled={ isEditButtonBlocked }
              onClick={ this.onEditButtonClick }
            >
              Editar perfil
            </button>
          </form>
          <p>Profile edition page</p>
        </div>
      );
    }
}

ProfileEdit.propTypes = {
  history: PropTypes.object, // proptype nativa ?
}.isRequired;

export default ProfileEdit;

// Referencias:
// https://www.youtube.com/watch?v=a7uPQ10UyM0&t=62s - History component
// https://dev.to/projectescape/programmatic-navigation-in-react-3p1l - history prop
