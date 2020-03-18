import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import ProgramsOverview from './overview/ProgramsOverview';

const Programs: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <Switch>
      <Route component={ProgramsOverview} exact path={url} />
    </Switch>
  );
};

export default Programs;
