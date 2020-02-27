import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { profileSelectors } from '../_store/selectors';
import { sessionsActions } from '../_store/actions';
import CreateSession from './create/CreateSession';
import EditSession from './edit/EditSession';

const Sessions: React.FC = () => {
  const { url } = useRouteMatch();
  const permissions = useSelector(profileSelectors.permissions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new sessionsActions.GetSessions({ userId: '1d6b0681-d958-416e-a9c1-35377a520e1a' }));
  }, [dispatch]);

  return (
    <Switch>
      <Route component={CreateSession} exact path={`${url}/create-session`} />
      {permissions?.sessions.edit && <Route component={EditSession} exact path={`${url}/update-session/:id`} />}
    </Switch>
  );
};

export default Sessions;
