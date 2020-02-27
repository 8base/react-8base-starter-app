import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import eightBase from '8base-js-sdk';

import Routes from './routes';
import { ApiContext } from './shared/components/ApiContext';
import { AuthContext } from './shared/components/AuthContext';

const workspaceId = process.env.REACT_APP_WORKSPACE_ID;
const authProfileId = process.env.REACT_APP_AUTH_PROFILE_ID;
const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;
const domain = process.env.REACT_APP_AUTH_DOMAIN;

const { auth, api } = eightBase.configure({
  workspaceId: workspaceId,
  Auth: {
    strategy: 'AUTH0_AUTH',
    settings: {
      authProfileId,
      clientId,
      domain,
      redirectUri: `${window.location.origin}/auth/callback`,
      logoutRedirectUri: `${window.location.origin}/logout`,
    },
  },
  Api: {
    headers: () => {
      const idToken = localStorage.getItem('idToken');

      if (idToken) {
        return {
          Authorization: `Bearer ${idToken}`,
        };
      }

      return {};
    },
  },
});

class Application extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <ApiContext.Provider value={api}>
          <AuthContext.Provider value={auth}>
            <Routes />
          </AuthContext.Provider>
        </ApiContext.Provider>
      </BrowserRouter>
    );
  }
}

export { Application };
