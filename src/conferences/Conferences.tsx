import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { profileSelectors } from '../_store/selectors';
import CreateProgram from '../programs/create/CreateProgram';
import ConferencesOverview from './overview/ConferencesOverview';
import CreateConference from './create/CreateConference';
import ConferenceDetail from './detail/ConferenceDetail';
import EditConference from './edit/EditConference';

const Conferences: React.FC = () => {
  const { url } = useRouteMatch();
  const permissions = useSelector(profileSelectors.permissions);

  return (
    <Switch>
      <Route component={ConferencesOverview} exact path={url} />
      {permissions?.conferences.edit && <Route component={CreateConference} exact path={`${url}/create`} />}
      <Route component={ConferenceDetail} exact path={`${url}/:conferenceId`} />
      {permissions?.conferences.edit && <Route component={EditConference} exact path={`${url}/edit/:id`} />}
      {permissions?.programs.edit && permissions?.programs.view && (
        <Route component={CreateProgram} exact path={`${url}/:conferenceId/programs/create`} />
      )}
      <Redirect to="/conferences" />
    </Switch>
  );
};

export default Conferences;
