import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Button, Icon } from '../_shared';
import { translations } from '../_translations';
import { profileSelectors } from '../_store/selectors';
import { sessionsActions } from '../_store/actions';
import './dashboard.scss';

const Dashboard: React.FC = () => {
  const { id } = useSelector(profileSelectors.profile);
  const permissions = useSelector(profileSelectors.permissions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new sessionsActions.GetSessions({ userId: id }));
  }, [dispatch, id]);

  return (
    <Container as="main">
      <div className="yourSessions">
        <div className="header">
          <h3>{translations.getLabel('DASHBOARD.OVERVIEW.YOUR_SESSIONS')}</h3>
          {permissions?.users.edit && (
            <Button href="/sessions/create-session" isTextLink>
              <Icon name="SvgAdd" size={1.6} />
              {translations.getLabel('DASHBOARD.OVERVIEW.CREATE_SESSION')}
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
