import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { profileSelectors } from '../_store/selectors';
import CreateSession from './create/CreateSession';

const Sessions: React.FC = () => {
  const { url } = useRouteMatch();
  const permissions = useSelector(profileSelectors.permissions);

  return (
    <Switch>
      <Route component={CreateSession} />
    </Switch>
  );
};

export default Sessions;
