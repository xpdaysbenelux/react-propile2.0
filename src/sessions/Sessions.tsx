import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { profileSelectors } from '../_store/selectors';
import CreateSession from './create/CreateSession';
import EditSession from './edit/EditSession';

const Sessions: React.FC = () => {
  const { url } = useRouteMatch();
  console.log(url);
  const permissions = useSelector(profileSelectors.permissions);

  return (
    <Switch>
      <Route component={CreateSession} exact path={`${url}/create-session`} />
      {permissions?.sessions.edit && <Route component={EditSession} exact path={`${url}/update-session/:id`} />}
    </Switch>
  );
};

export default Sessions;
