import React from 'react';
import { useAuth } from '8base-react-sdk';
import { Route, Redirect } from 'react-router-dom';

/**
 * Depending on the props available, the rendered component
 * must be handled appropriately and then returned.
 */
const renderComponent = (props) => {
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
    throw new Error('Error: must specify either a render prop, a render function as children, or a component prop.');
  }

  return rendered;
};

/**
 * ProtectedRoute component checks the auth state during navigation.
 * If the user isAuthorized, it will render the next component. Otherwise,
 * it will redirect to the '/auth' route, requiring that the user login.
 */
export const ProtectedRoute = (props) => {
  const { isAuthorized } = useAuth();
  const { component, render, ...restProps } = props;

  return (
    <Route
      {...restProps}
      render={() => {
        if (isAuthorized) {
          return renderComponent(props);
        }
        /**
         * If the user should be redirected to a different path when not authorized, add
         * that route as the redirect's pathname.
         */
        return <Redirect to={{ pathname: '/auth', state: { from: restProps.location } }} />;
      }}
    />
  );
};
