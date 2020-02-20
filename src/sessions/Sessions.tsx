import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateSession from './create/CreateSession';

const Sessions: React.FC = () => {
  return (
    <Switch>
      <Route component={CreateSession} />
    </Switch>
  );
};

export default Sessions;
