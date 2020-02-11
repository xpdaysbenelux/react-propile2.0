import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateUser from '../users/create/CreateUser';
import UserDetail from '../users/detail/UserDetail';
import UsersOverview from '../users/overview/UsersOverview';
import { profileSelectors } from '../_store/selectors';

const Users: React.FC = () => {
  const { url } = useRouteMatch();
  const permissions = useSelector(profileSelectors.permissions);
  return (
    <Switch>
      <Route component={UsersOverview} exact path={url} />
      {permissions?.users.edit && <Route component={CreateUser} exact path={`${url}/create`} />}
      <Route component={UserDetail} exact path={`${url}/:id`} />
    </Switch>
  );
};

export default Users;
