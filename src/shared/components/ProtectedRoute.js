import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Depending on the props available, the rendered component
 * must be handled appropriately and then returned.
 */
const renderComponent = props => {
  const { render, children, component, ...restProps } = props;

  let rendered = null;

  if (component) {
    rendered = React.createElement(component, { ...restProps }, children);
  }

  if (render) {
    rendered = render({ ...restProps, children });
  }

  if (typeof children === 'function') {
    rendered = children(restProps);
  } else if (children) {
    rendered = children;
  } else if (!rendered) {
    throw new Error(
      'Error: must specify either a render prop, a render function as children, or a component prop.'
    );
  }

  return rendered;
};
/**
 * ProtectedRoute component checks the auth state during navigation.
 * If the user isAuthorized, it will render the next component. Otherwise,
 * it will redirect to the '/auth' route, requiring that the user login.
 */
class ProtectedRoute extends React.Component {
  renderRoute = () => {
    const idToken = localStorage.getItem('idToken');

    if (idToken) {
      return renderComponent(this.props);
    }
    /**
     * If the user should be redirected to a different path when not authorized, add
     * that route as the redirect's pathname.
     */
    return (
      <Redirect
        to={{ pathname: '/auth', state: { from: this.props.location } }}
      />
    );
  };

  render() {
    const { component, render, ...rProps } = this.props;

    return <Route {...rProps} render={this.renderRoute} />;
  }
}

export { ProtectedRoute };
