import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { profileSelectors } from '../_store/selectors';
import EditProgram from './edit/EditProgram';
import ProgramDetail from './detail/ProgramDetail';

const Programs: React.FC = () => {
  const { url } = useRouteMatch();
  const permissions = useSelector(profileSelectors.permissions);

  return (
    <Switch>
      <Route component={ProgramDetail} exact path={`${url}/:programId`} />
      {permissions?.programs.edit && <Route component={EditProgram} exact path={`${url}/edit/:id`} />}
      <Redirect to="/conferences" />
    </Switch>
  );
};

export default Programs;
