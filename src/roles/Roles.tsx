import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { profileSelectors } from '../_store/selectors';
import RolesOverview from './overview/RolesOverview';
import CreateRole from './createRole/CreateRole';
import RoleDetail from './detail/RoleDetail';

const Roles: React.FC = () => {
  const { url } = useRouteMatch();
  const permissions = useSelector(profileSelectors.permissions);
  return (
    <Switch>
      <Route component={RolesOverview} exact path={url} />
      {permissions?.roles.edit && <Route component={CreateRole} exact path={`${url}/create`} />}
      <Route component={RoleDetail} exact path={`${url}/:id`} />
    </Switch>
  );
};

export default Roles;
