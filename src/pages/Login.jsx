import React from 'react';
import Header from '../components/Header';
import Form from '../components/Form';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">

        <Header />
        <Form />

      </div>
    );
  }
}

export default Login;
