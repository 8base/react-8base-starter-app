import React from 'react';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { USER_QUERY } from '../../shared/graphql';

let Profile = ({ ...restArgs }) => (
  <>
    <h1>Welcome Profile!</h1>
    {restArgs.user.loading ? (
      <span>Loading...</span>
    ) : (
      <div>
        {console.log(restArgs)}
        <h1>{restArgs.user.email}</h1>
      </div>
    )}
  </>
);

Profile = compose(graphql(USER_QUERY, { name: 'user' }))(Profile);

export { Profile };
