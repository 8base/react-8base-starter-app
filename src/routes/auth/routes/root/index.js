import React from 'react';

import { withContext } from '../../../../shared/components/withContext';
import { AuthContext } from '../../../../shared/components/AuthContext';

class AuthContainer extends React.Component {
  componentDidMount() {
    const { auth } = this.props;

    auth.authorize();
  }

  render() {
    return <h2>Loading...</h2>;
  }
}

AuthContainer = withContext('auth', AuthContext)(AuthContainer);

export { AuthContainer };
