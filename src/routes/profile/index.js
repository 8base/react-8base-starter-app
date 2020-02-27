import React from 'react';
import { CURRENT_USER_QUERY } from '../../shared/graphql';

import { withContext } from '../../shared/components/withContext';
import { ApiContext } from '../../shared/components/ApiContext';

class Profile extends React.Component {
  state = {};

  async componentDidMount() {
    const userResponse = await this.props.api.request(CURRENT_USER_QUERY);

    if (userResponse.data.user) {
      this.setState({
        user: userResponse.data.user,
      });
    }
  }

  render() {
    const { user } = this.state;

    return (
      <>
        <h1>Welcome Profile!</h1>
        {!user ? (
          <span>Loading...</span>
        ) : (
          <div>
            <h1>{user.email}</h1>
            <ul>
              <li>ID: {user.id}</li>
              <li>
                Name: {user.firstName} {user.lastName}
              </li>
            </ul>
          </div>
        )}
      </>
    );
  }
}

Profile = withContext('api', ApiContext)(Profile);

export { Profile };
