import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Roles from '../../../roles/Roles';
import Users from '../../../users/Users';
import { profileSelectors } from '../../../_store/selectors';
import { hasUsersPermissions, hasRolesPermissions } from '../../../profile/_utils';
import Profile from '../../../profile/Profile';
import AuthorizedLayoutMenu from './menu/AuthorizedLayoutMenu';
import './authorizedLayout.scss';

const AuthorizedLayout: React.FC = () => {
  const permissions = useSelector(profileSelectors.permissions);
  return (
    <div className="authorized-layout">
      <AuthorizedLayoutMenu />
      <Switch>
        <Route component={Profile} path="/profile" />
        {hasUsersPermissions(permissions) && <Route component={Users} path="/users" />}
        {hasRolesPermissions(permissions) && <Route component={Roles} path="/roles" />}
        <Redirect to="/profile" />
      </Switch>
    </div>
  );
};

export default AuthorizedLayout;
