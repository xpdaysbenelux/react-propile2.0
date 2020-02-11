import React from 'react';
import { Switch, Redirect, Route, NavLink } from 'react-router-dom';
import Auth from '../../../auth/Auth';
import './unauthorizedLayout.scss';
import { SvgLogo } from '../../../_assets/svg';
import { translations } from '../../../_translations';

export const UNAUTHORIZES_ROUTES = ['/auth'];

const UnauthorizedLayout: React.FC = () => {
  return (
    <div className="unauthorized-layout">
      <aside>
        <NavLink to="/">
          <SvgLogo />
          <span>{translations.getLabel('AUTH.SIDEBAR_TITLE')}</span>
        </NavLink>
      </aside>
      <Switch>
        <Route component={Auth} path="/auth" />
        <Redirect to="/auth" />
      </Switch>
    </div>
  );
};

export default UnauthorizedLayout;
