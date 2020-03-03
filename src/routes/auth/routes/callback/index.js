import React from 'react';
import { compose } from 'recompose';

import { withContext } from '../../../../shared/components/withContext';
import { AuthContext } from '../../../../shared/components/AuthContext';
import { ApiContext } from '../../../../shared/components/ApiContext';
import { CURRENT_USER_QUERY } from '../../../../shared/graphql';

class CallbackContainer extends React.Component {
  async handleAuthentication({ idToken, idTokenPayload }) {
    const { api, auth } = this.props;
    /**
     * Check if user exists in 8base.
     */
    const userResponse = await api.request(
      CURRENT_USER_QUERY,
      {},
      /**
       * Auth headers for communicating with the 8base API.
       */
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    /**
     * If user doesn't exist, an error will be
     * returned, which then the new user can be
     * created using the authResult values.
     */
    if (userResponse.errors && userResponse.errors.length !== 0) {
      const { email } = idTokenPayload;

      await auth.signUpWithToken({ email }, idToken);
    }
  }

  async componentDidMount() {
    const { auth, history } = this.props;
    /* Get authResult from auth client after redirect */
    const authResult = await auth.getAuthorizedData();
    /* Identify or create user record using authenticated details */
    await this.handleAuthentication(authResult);
    /* Add the idToken to the local storage */
    localStorage.setItem('idToken', authResult.idToken);
    /* Redirect user to root path */
    history.replace('/');
  }

  render() {
    return <h2>Loading...</h2>;
  }
}
/* withContext injects 'auth' and 'api' props into component */
CallbackContainer = compose(
  withContext('auth', AuthContext),
  withContext('api', ApiContext)
)(CallbackContainer);

export { CallbackContainer };
