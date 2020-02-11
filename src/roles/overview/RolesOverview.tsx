import React, { useEffect, FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { translations } from '../../_translations';
import { Icon, Button, SearchInput } from '../../_shared';
import { rolesSelectors, profileSelectors } from '../../_store/selectors';
import { rolesActions } from '../../_store/actions';
import { HttpMetadataQuery, FillMetadataQueryFunction } from '../../_http';
import RolesTable from './RolesTable';
import './rolesOverview.scss';

const RolesOverview: FC = () => {
  const roles = useSelector(rolesSelectors.roles);
  const isLoading = useSelector(rolesSelectors.isGetRolesLoading);
  const query = useSelector(rolesSelectors.query);
  const permissions = useSelector(profileSelectors.permissions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new rolesActions.GetRoles());
  }, [dispatch]);

  const setQuery: FillMetadataQueryFunction = (partialQuery: HttpMetadataQuery) => {
    dispatch(new rolesActions.SetRolesQuery({ query: { ...query, ...partialQuery } }));
  };

  return (
    <Container as="main" className="roles">
      <div className="header">
        <SearchInput query={query} setQuery={setQuery} />
        {permissions?.roles.edit && (
          <Button href="/roles/create" isTextLink primary>
            <Icon name="SvgAdd" size={1.6} />
            {translations.getLabel('ROLES.OVERVIEW.CREATE_ROLE')}
          </Button>
        )}
      </div>
      <RolesTable data={roles} isLoading={isLoading} setQuery={setQuery} />
    </Container>
  );
};

export default RolesOverview;
