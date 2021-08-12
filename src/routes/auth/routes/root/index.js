import { useEffect } from 'react';
import { useAuth } from '8base-react-sdk';

export const AuthContainer = () => {
  const { authClient } = useAuth();

  useEffect(() => {
    authClient.authorize();
  }, [authClient]);

  return <h2>Loading...</h2>;
};
