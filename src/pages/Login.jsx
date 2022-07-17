import React from 'react';
import Header from '../components/Header';
import Form from '../components/Form';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">

        <Header />

        <p>Login page</p>

        <Form />

      </div>
    );
  }
}

export default Login;

// Lógica e organização
// 1- Criação Form com inputs dentro de labels
// 2- Value e on change fazendo referencia ás func e estádo referentes ao Value e onChange dos elementos do forms
// 3- handleChange para atualizar o estado de 'isLoginButtonDisabled' (se username tiver menos de 3 letras, o estado é falso, para desabilitar o botão de login)
// 4- a
//
//
