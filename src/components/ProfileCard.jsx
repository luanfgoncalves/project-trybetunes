import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileCard extends Component {
  render() {
    const {
      userName,
      userInfo,
      userEmail,
      userImg,
    } = this.props;
    return (
      <>
        <img data-testid="profile-image" src={ userImg } alt={ userName } />
        <p>{`Nome: ${userName}`}</p>
        <p>{`Email: ${userEmail}`}</p>
        <p>{`Descrição: ${userInfo}`}</p>
        <Link to="/profile/edit">
          <button type="button">Editar perfil</button>
        </Link>
      </>
    );
  }
}

ProfileCard.propTypes = {
  userName: PropTypes.string,
  userInfo: PropTypes.string,
  userEmail: PropTypes.string,
  userImg: PropTypes.string,
}.isRequired;

export default ProfileCard;
