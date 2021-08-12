import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '8base-react-sdk';
import ERROR_CODES from '@8base/error-codes';
import { useApolloClient } from '@apollo/client';

import { CURRENT_USER_QUERY, USER_SIGN_UP_MUTATION } from 'shared/graphql';
import { AUTH_PROFILE_ID } from 'shared/constants';

const authorizeUser = async ({ authClient, apolloClient, history }) => {
  /* Get authResult from auth client after redirect */
  const { idToken, email, firstName, lastName } = await authClient.getAuthorizedData();
  /* Add the idToken to the auth state */
  authClient.setState({ token: idToken });

  const singUpUser = () =>
    apolloClient.mutate({
      mutation: USER_SIGN_UP_MUTATION,
      variables: {
        user: {
          email,
          firstName,
          lastName,
        },
        authProfileId: AUTH_PROFILE_ID,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
      awaitRefetchQueries: true,
    });

  apolloClient
    .query({
      query: CURRENT_USER_QUERY,
      errorPolicy: 'all',
    })
    .then(({ errors }) => {
      /* Check user exist error */
      if (errors) {
        if (Array.isArray(errors)) {
          if (errors.some((err) => err?.code === ERROR_CODES.UserNotFoundErrorCode)) {
            /* If user does does not exist at 8base - create user */
            return singUpUser();
          }
        }

        if (errors?.code === ERROR_CODES.UserNotFoundErrorCode) {
          /* If user does does not exist at 8base - create user */
          return singUpUser();
        }
      }
    })
    .finally(() => {
      /* Redirect user to root path */
      history.replace('/');
    });
};

export const CallbackContainer = () => {
  const { authClient } = useAuth();
  const apolloClient = useApolloClient();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    authorizeUser({ authClient, apolloClient, history });
  }, [authClient, apolloClient, loading, history]);

  return <h2>Loading...</h2>;
};
