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

      // Habilita o botão de salvar caso o nome de usuário tenha mais de três caracteres
      handleChange = (event) => {
        const { target } = event;
        const minimalUsernameLength = 3;
        this.setState({
          username: target.value,
          isLoginButtonDisabled: target.value.length < minimalUsernameLength,
        });
        console.log('O input do nome de usuário foi alterado');
      }

      // função que chama createUser da API
      onLoginButtonClick = async () => {
        console.log('O botão de login foi clicado');
        const { username } = this.state;
        this.setState({ isLoginHappening: true });
        console.log('O Login está ocorrendo');
        await createUser({ name: username });
        this.setState({ isLoginHappening: false, isLoginFinished: true });
        console.log('O login foi concluido');
      }

      render() {
        const {
          isLoginButtonDisabled,
          username,
          isLoginHappening,
          isLoginFinished,
        } = this.state;
        // if (isLoginHappening === true) return (<Loading />);
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
              disabled={ isLoginButtonDisabled } // deve alternar para true caso o input receba mais de 3 caracteres
              onClick={ this.onLoginButtonClick }
            >
              Entrar
            </button>

          </form>
        );
      }
}

export default Form;
