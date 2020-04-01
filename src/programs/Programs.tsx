import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { profileSelectors } from '../_store/selectors';
import CreateProgram from './create/CreateProgram';

const Programs: React.FC = () => {
  const { url } = useRouteMatch();
  const permissions = useSelector(profileSelectors.permissions);

  return (
    <Switch>{permissions?.programs.edit && <Route component={CreateProgram} exact path={`${url}/create-program`} />}</Switch>
  );
};

export default Programs;
