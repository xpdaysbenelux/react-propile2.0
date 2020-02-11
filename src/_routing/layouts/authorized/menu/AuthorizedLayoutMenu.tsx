import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { translations } from '../../../../_translations';
import { authActions } from '../../../../_store/actions';
import { profileSelectors } from '../../../../_store/selectors';
import { hasUsersPermissions, hasRolesPermissions } from '../../../../profile/_utils';
import { SvgLogo } from '../../../../_assets/svg';
import { Icon } from '../../../../_shared';
import './authorizedLayoutMenu.scss';

const AuthorizedLayoutMenu: FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelectors.profile);
  const permissions = useSelector(profileSelectors.permissions);

  return (
    <header className="main-menu">
      <NavLink className="logo" to="/">
        <SvgLogo />
      </NavLink>
      <nav>
        <div>
          {hasUsersPermissions(permissions) && <NavLink to="/users">{translations.getLabel('SHARED.NAVIGATION.USERS')}</NavLink>}
          {hasRolesPermissions(permissions) && <NavLink to="/roles">{translations.getLabel('SHARED.NAVIGATION.ROLES')}</NavLink>}
        </div>
        <NavLink to="/profile">
          <Icon name="SvgUser" size={2} />
          <span>{profile.email}</span>
        </NavLink>
      </nav>
      <Icon
        label={translations.getLabel('AUTH.LOGOUT')}
        name="SvgLogout"
        onClick={() => dispatch(new authActions.Logout())}
        size={1.6}
      />
    </header>
  );
};

export default AuthorizedLayoutMenu;
