import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import ConferencesOverview from './overview/ConferencesOverview';

const Conferences: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route component={ConferencesOverview} exact path={url} />
    </Switch>
  );
};

export default Conferences;
