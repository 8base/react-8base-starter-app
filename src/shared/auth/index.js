import { Auth, AUTH_STRATEGIES } from '8base-sdk';
import { AUTH_CLIENT_ID, AUTH_DOMAIN, LOGOUT_REDIRECT_URI, REDIRECT_URI } from '../constants';

/**
 * There are multiple auth strategies that can be
 * used when using 8base. By default, specifying
 * 'web_8base_cognito' will configure the 8base auth client.
 */
export const authClient = Auth.createClient(
  {
    strategy: AUTH_STRATEGIES.WEB_8BASE_COGNITO,
    subscribable: true,
  },
  {
    domain: AUTH_DOMAIN,
    clientId: AUTH_CLIENT_ID,
    redirectUri: REDIRECT_URI,
    logoutRedirectUri: LOGOUT_REDIRECT_URI,
  }
);
