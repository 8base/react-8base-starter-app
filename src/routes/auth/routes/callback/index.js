import React from 'react';
import { withAuth } from '@8base/react-sdk';

class CallbackContainer extends React.Component {
  async componentDidMount() {
    const { auth, history } = this.props;
    const { idToken } = await auth.authClient.getAuthorizedData();

    auth.authClient.setState({ token: idToken });
    history.replace('/');
  }

  render() {
    return <h2>Loading...</h2>;
  }
}

CallbackContainer = withAuth(CallbackContainer);

export { CallbackContainer };
