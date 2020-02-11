import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Icon, Button, SearchInput } from '../../_shared';
import { translations } from '../../_translations';
import { usersSelectors, profileSelectors } from '../../_store/selectors';
import { usersActions } from '../../_store/actions';
import { HttpMetadataQuery, FillMetadataQueryFunction } from '../../_http';
import UsersTable from './UsersTable';
import './usersOverview.scss';

const UsersOverview: FC = () => {
  const users = useSelector(usersSelectors.users);
  const isLoading = useSelector(usersSelectors.isGetUsersLoading);
  const query = useSelector(usersSelectors.query);
  const permissions = useSelector(profileSelectors.permissions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new usersActions.GetUsers());
  }, [dispatch]);

  const setQuery: FillMetadataQueryFunction = (partialQuery: HttpMetadataQuery) => {
    dispatch(new usersActions.SetUsersQuery({ query: { ...query, ...partialQuery } }));
  };

  return (
    <Container as="main" className="users">
      <div className="header">
        <SearchInput query={query} setQuery={setQuery} />
        {permissions?.users.edit && (
          <Button href="/users/create" isTextLink primary>
            <Icon name="SvgAdd" size={1.6} />
            {translations.getLabel('USERS.OVERVIEW.CREATE_USER')}
          </Button>
        )}
      </div>
      <UsersTable data={users} isLoading={isLoading} setQuery={setQuery} />
    </Container>
  );
};

export default UsersOverview;
