import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'semantic-ui-react';

import { Button, Icon } from '../_shared';
import { translations } from '../_translations';
import { profileSelectors } from '../_store/selectors';
import { sessionsActions } from '../_store/actions';
import YourSessionsTable from './YourSessionsTable';
import './dashboard.scss';

const Dashboard: React.FC = () => {
  const { id } = useSelector(profileSelectors.profile);
  const permissions = useSelector(profileSelectors.permissions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new sessionsActions.GetSessions());
  }, [dispatch]);

  return (
    <Container as="main" className="dashboard">
      <div className="your-sessions">
        <header className="header">
          <h3>{translations.getLabel('DASHBOARD.OVERVIEW.YOUR_SESSIONS')}</h3>
          {permissions?.sessions.edit && (
            <Button href="/sessions/create" isTextLink>
              <Icon name="SvgAdd" size={1.6} />
              {translations.getLabel('DASHBOARD.OVERVIEW.CREATE_SESSION')}
            </Button>
          )}
        </header>
      </div>
      <YourSessionsTable userId={id} />
    </Container>
  );
};

export default Dashboard;
