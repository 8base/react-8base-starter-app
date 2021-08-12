import { useCallback } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { useAuth } from '8base-react-sdk';

import { CURRENT_USER_QUERY } from 'shared/graphql';

export const AuthButton = () => {
  const { authClient, isAuthorized } = useAuth();
  const apolloClient = useApolloClient();
  const { loading } = useQuery(CURRENT_USER_QUERY);

  const onLogoutClick = useCallback(async () => {
    await apolloClient.clearStore();
    authClient.logout();
  }, [apolloClient, authClient]);

  const onLoginClick = useCallback(() => {
    authClient.authorize();
  }, [authClient]);

  if (loading) {
    return null;
  }

  if (isAuthorized) {
    return <button onClick={onLogoutClick}>Sign Out</button>;
  }

  return <button onClick={onLoginClick}>Sign In</button>;
};
