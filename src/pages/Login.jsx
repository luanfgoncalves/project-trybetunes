import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
// import { getUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoginButtonDisabled: false,
      username: '',

    };
  }

  // Função que habilita o botão de salvar caso o nome de usuário tenha mais de três caracteres
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
  onLoginButtonClick = () => {
    console.log('O botão de login foi clicado');
  }

  loginButtonManager = () => {

  }

  render() {
    const {
      onLoginButtonClick,
      isLoginButtonDisabled,
      username,
    } = this.state;

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
              value={ username }
              onChange={ this.handleChange } // Nota: sempre faça referencia a funções internas e use arrow p/ não precisar do bind
            />
          </label>

          <button
            data-testid="login-submit-button"
            id="login-submit-button"
            type="submit"
            disabled={ isLoginButtonDisabled } // deve alternar para true caso o input receba mais de 3 caracteres
            onClick={ onLoginButtonClick }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

// Login.propTypes = {
//   onLoginButtonClick: PropTypes.func.isRequired,
//   isLoginButtonDisabled: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
// };

export default Login;

// Lógica e organização
// 1- Criação Form com inputs dentro de labels
// 2- Value e on change fazendo referencia ás func e estádo referentes ao Value e onChange dos elementos do forms
// 3- handleChange para atualizar o estado de 'isLoginButtonDisabled' (se username tiver menos de 3 letras, o estado é falso, para desabilitar o botão de login)
// 4- a
//
//
