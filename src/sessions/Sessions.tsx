import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { profileSelectors } from '../_store/selectors';
import { sessionsActions } from '../_store/actions';
import CreateSession from './create/CreateSession';
import EditSession from './edit/EditSession';

const Sessions: React.FC = () => {
  const { url } = useRouteMatch();
  const { id } = useSelector(profileSelectors.profile);
  const permissions = useSelector(profileSelectors.permissions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new sessionsActions.GetSessions({ userId: id }));
  }, [dispatch, id]);

  return (
    <Switch>
      <Route component={CreateSession} exact path={`${url}/create`} />
      {permissions?.sessions.edit && <Route component={EditSession} exact path={`${url}/edit/:id`} />}
    </Switch>
  );
};

export default Sessions;
