import React, { Component } from 'react';
// import PropTypes from 'prop-types';
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

    componentDidMount = async () => {
      this.setState({ isLoading: true });
      const userData = await getUser();
      this.setState({
        isLoading: false,
        name: userData.name,
        description: userData.description,
        email: userData.email,
        image: userData.image,
        isEditFinished: false,
      });
    }

    onEditButtonClick = async (event) => {
      event.preventDefault();
      const { name, email, image, description } = this.state;
      const userData = { name, email, image, description };
      await updateUser(userData);
      this.setState({ isEditFinished: true });
    }

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
        isEditFinished, isLoading } = this.state;
      return (
        <form>
          { isLoading && <Loading /> }
          { isEditFinished && <Redirect to="/profile" /> }
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
