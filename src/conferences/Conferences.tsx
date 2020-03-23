import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { profileSelectors } from '../_store/selectors';
import ConferencesOverview from './overview/ConferencesOverview';
import CreateConference from './create/CreateConference';

const Conferences: React.FC = () => {
  const { url } = useRouteMatch();
  const permissions = useSelector(profileSelectors.permissions);

  return (
    <Switch>
      <Route component={ConferencesOverview} exact path={url} />
      {permissions?.conferences.edit && <Route component={CreateConference} exact path={`${url}/create-conference`} />}
    </Switch>
  );
};

export default Conferences;
