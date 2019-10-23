import gql from 'graphql-tag';

export const USER_QUERY = gql`
  query {
    user {
      id
      email
      lastName
      firstName
    }
  }
`;
