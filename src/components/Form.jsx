import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      isLoginButtonDisabled: true,
      username: '',
      isLoginHappening: false,
      isLoginFinished: false,
    };
  }

      handleChange = (event) => {
        const { target } = event;
        const minimalUsernameLength = 3;
        this.setState({
          username: target.value,
          isLoginButtonDisabled: target.value.length < minimalUsernameLength,
        });
      }

      onLoginButtonClick = async () => {
        const { username } = this.state;
        this.setState({ isLoginHappening: true });
        await createUser({ name: username });
        this.setState({ isLoginHappening: false, isLoginFinished: true });
      }

      render() {
        const {
          isLoginButtonDisabled,
          username,
          isLoginHappening,
          isLoginFinished,
        } = this.state;
        return (
          <form>
            { isLoginHappening && <Loading /> }
            { isLoginFinished && <Redirect to="/search" /> }

            <label htmlFor="login-name-input">
              <p>User:</p>
              <input
                data-testid="login-name-input"
                id="login-name-input"
                name="loginName"
                type="text"
                placeholder="Insert your username"
                value={ username }
                onChange={ this.handleChange }
              />
            </label>

            <button
              data-testid="login-submit-button"
              id="login-submit-button"
              type="submit"
              disabled={ isLoginButtonDisabled }
              onClick={ this.onLoginButtonClick }
            >
              Entrar
            </button>

          </form>
        );
      }
}

export default Form;
