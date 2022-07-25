import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileCard extends Component {
  render() {
    const {
      name,
      description,
      email,
      image,
    } = this.props;
    return (
      <>
        <img data-testid="profile-image" src={ image } alt={ name } />
        <p>{`Nome: ${name}`}</p>
        <p>{`Email: ${email}`}</p>
        <p>{`Descrição: ${description}`}</p>
        <Link to="/profile/edit">
          <button type="button">Editar perfil</button>
        </Link>
      </>
    );
  }
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
}.isRequired;

export default ProfileCard;
