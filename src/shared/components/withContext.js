import React from 'react';

export const withContext = (propName, Context) => WrappedComponent => {
  return function WithContext(props) {
    return (
      <Context.Consumer>
        {value => <WrappedComponent {...props} {...{ [propName]: value }} />}
      </Context.Consumer>
    );
  };
};
