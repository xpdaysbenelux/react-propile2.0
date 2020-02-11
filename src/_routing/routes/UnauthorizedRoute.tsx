import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { profileSelectors } from '../../_store/selectors';

const UnauthorizedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector(profileSelectors.isLoggedIn);

  return <Route {...rest} render={props => (!isLoggedIn ? <Component {...props} /> : <Redirect to="/" />)} />;
};

export default UnauthorizedRoute;
