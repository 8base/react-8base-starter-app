import React from 'react';

import { withContext } from '../shared/components/withContext';
import { AuthContext } from '../shared/components/AuthContext';

class AuthButton extends React.Component {
  render() {
    const { auth } = this.props;
    const idToken = localStorage.getItem('idToken');
    const Logout = () => (
      <button
        onClick={() => {
          localStorage.removeItem('idToken');
          auth.signOut();
        }}
      >
        Sign Out
      </button>
    );
    const Login = () => (
      <button
        onClick={() => {
          auth.authorize();
        }}
      >
        Sign In
      </button>
    );

    if (idToken) {
      return <Logout />;
    }

    return <Login />;
  }
}

AuthButton = withContext('auth', AuthContext)(AuthButton);

export { AuthButton };
