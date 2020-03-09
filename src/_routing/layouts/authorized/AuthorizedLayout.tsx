import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Roles from '../../../roles/Roles';
import Users from '../../../users/Users';
import Sessions from '../../../sessions/Sessions';
import { profileSelectors } from '../../../_store/selectors';
import { hasUsersPermissions, hasRolesPermissions, hasSessionsPermissions } from '../../../profile/_utils';
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
        {hasSessionsPermissions(permissions) && <Route component={Sessions} path="/sessions" />}
        <Redirect to="/profile" />
      </Switch>
    </div>
  );
};

export default AuthorizedLayout;
