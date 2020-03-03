import React, { useState, useEffect } from 'react';
import { Switch, Redirect, Route, NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import Auth from '../../../auth/Auth';
import { translations } from '../../../_translations';
import logo from '../../../_assets/png/xpdaysLogo.png';
import './unauthorizedLayout.scss';
import { Button } from '../../../_shared';

export const UNAUTHORIZED_ROUTES = ['/auth'];

const UnauthorizedLayout: React.FC = () => {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();

  const [canCreateSession, setSession] = useState(true);
  useEffect(() => {
    if (pathname === '/auth/create-session') {
      setSession(false);
    }
  }, [pathname]);

  return (
    <div className="unauthorized-layout">
      <aside>
        <NavLink to="/">
          <div onClick={() => setSession(true)}>
            <img alt="Xpdays-logo" src={logo} />
            <span>{translations.getLabel('AUTH.SIDEBAR_TITLE')}</span>
          </div>
        </NavLink>
        {canCreateSession && (
          <div className="create-session-btn" onClick={() => setSession(false)}>
            <Button href={`${path}/create-session`} isTextLink theme="primary">
              {translations.getLabel('SESSIONS.CREATE.TITLE')}
            </Button>
          </div>
        )}
      </aside>
      <Switch>
        <Route component={Auth} path="/auth" />
        <Redirect to="/auth" />
      </Switch>
    </div>
  );
};

export default UnauthorizedLayout;
