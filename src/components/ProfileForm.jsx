import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileForm extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: '',
      description: '',
      email: '',
      image: '',
      isEditButtonBlocked: true,
      isEditFinished: false,
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
      event.preventDefault();
      const { name, email, image, description } = this.state;
      const userData = { name, email, image, description };
      await updateUser(userData);
      this.setState({ isEditFinished: true });
    }

    editFinished = () => {
      const { isLoading } = this.state;
      if (isLoading === false) { this.setState({ isEditFinished: true }); }
    }

    handleChange = ({ target: { id, value } }) => {
      this.setState({ [id]: value });
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
      const { name, email, image, description,
        isEditButtonBlocked, isEditFinished, isLoading } = this.state;
      if (isEditFinished === true) { return <Redirect to="/profile" />; }
      return (
        <form>
          { isLoading && <Loading /> }
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
      );
    }
}

export default ProfileForm;

// Referencias:
// https://www.youtube.com/watch?v=a7uPQ10UyM0&t=62s - History component
// https://dev.to/projectescape/programmatic-navigation-in-react-3p1l - history prop
// Nota: estas referencias foram utilizadas para um modelo de redirecionamento via history prop, que foi substituido pelo Redirect do react-router-dom.
