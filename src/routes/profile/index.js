import React from 'react';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../../shared/graphql';

let Profile = ({ data }) => (
  <>
    <h1>Welcome Profile!</h1>
    {data.loading ? (
      <span>Loading...</span>
    ) : (
      <div>
        <h1>{data.user.email}</h1>
        <ul>
          <li>ID: {data.user.id}</li>
          <li>
            Name: {data.user.firstName} {data.user.lastName}
          </li>
        </ul>
      </div>
    )}
  </>
);

Profile = compose(graphql(CURRENT_USER_QUERY))(Profile);

export { Profile };
