/**
 * Query the current users details.
 */
export const CURRENT_USER_QUERY = `
  query {
    user {
      id
      email
      lastName
      firstName
    }
  }
`;
