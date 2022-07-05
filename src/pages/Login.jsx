import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Login extends React.Component {
  render() {
    const {
      onLoginButtonClick,
    } = this.props;

    return (
      <div data-testid="page-login">

        <Header />

        <p>Login page</p>

        <form>

          <label htmlFor="login-name-input">
            <p>User:</p>
            <input
              data-testid="login-name-input"
              id="login-name-input"
              name="loginName"
              type="text"
              placeholder="Insert your username"
            />
          </label>

          <button
            data-testid="login-submit-button"
            id="login-submit-button"
            type="submit"
            onClick={ onLoginButtonClick } // ADICIONAR FUNÇÃO AO APP(cria obj com a ker name contendo o nome digitado)
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  onLoginButtonClick: PropTypes.func.isRequired,
};

export default Login;
