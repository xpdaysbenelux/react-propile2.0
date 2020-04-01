import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Roles from '../../../roles/Roles';
import Users from '../../../users/Users';
import Sessions from '../../../sessions/Sessions';
import { profileSelectors } from '../../../_store/selectors';
import {
  hasUsersPermissions,
  hasRolesPermissions,
  hasSessionsPermissions,
  hasConferencesPermissions,
  hasProgramsPermissions,
} from '../../../profile/_utils';
import Profile from '../../../profile/Profile';
import Dashboard from '../../../dashboard/Dashboard';
import Conferences from '../../../conferences/Conferences';
import Programs from '../../../programs/Programs';
import AuthorizedLayoutMenu from './menu/AuthorizedLayoutMenu';
import './authorizedLayout.scss';

const AuthorizedLayout: React.FC = () => {
  const permissions = useSelector(profileSelectors.permissions);
  return (
    <div className="authorized-layout">
      <AuthorizedLayoutMenu />
      <Switch>
        <Route component={Profile} path="/profile" />
        <Route component={Dashboard} path="/dashboard" />
        {hasUsersPermissions(permissions) && <Route component={Users} path="/users" />}
        {hasRolesPermissions(permissions) && <Route component={Roles} path="/roles" />}
        {hasSessionsPermissions(permissions) && <Route component={Sessions} path="/sessions" />}
        {hasConferencesPermissions(permissions) && <Route component={Conferences} path="/conferences" />}
        {hasProgramsPermissions(permissions) && <Route component={Programs} path="/programs" />}
        <Redirect to="/profile" />
      </Switch>
    </div>
  );
};

export default AuthorizedLayout;
