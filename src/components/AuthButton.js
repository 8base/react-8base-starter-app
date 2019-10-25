import React from 'react';
import { compose } from 'recompose';
import { withAuth } from '@8base/react-sdk';
import { Query, withApollo } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../shared/graphql';

class AuthButton extends React.Component {
  renderContent = ({ loading }) => {
    const { auth, client } = this.props;

    if (loading) {
      return null;
    }

    const Logout = () => (
      <button
        onClick={async () => {
          await client.clearStore();
          auth.authClient.logout();
        }}
      >
        Sign Out
      </button>
    );

    const Login = () => <button onClick={() => auth.authClient.authorize()}>Sign In</button>;

    return <>{auth.isAuthorized ? <Logout /> : <Login />}</>;
  };

  render() {
    return <Query query={CURRENT_USER_QUERY}>{this.renderContent}</Query>;
  }
}

AuthButton = compose(
  withApollo,
  withAuth
)(AuthButton);

export { AuthButton };
