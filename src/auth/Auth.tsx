import React from 'react';
import { Switch, Redirect, Route, useRouteMatch } from 'react-router-dom';
import Login from '../auth/login/Login';
import ChoosePassword from '../auth/choose-password/ChoosePassword';
import RequestPasswordReset from '../auth/request-password-reset/RequestPasswordReset';
import './auth.scss';

const Auth: React.FC = () => {
  const { url } = useRouteMatch();
  return (
    <div className="auth">
      <Switch>
        <Route component={Login} path={`${url}/login`} />
        <Route component={ChoosePassword} path={`${url}/register/:token`} />
        <Route path={`${url}/choose-password/:token`} render={() => <ChoosePassword isPasswordReset />} />
        <Route component={RequestPasswordReset} path={`${url}/request-password-reset`} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </div>
  );
};

export default Auth;
