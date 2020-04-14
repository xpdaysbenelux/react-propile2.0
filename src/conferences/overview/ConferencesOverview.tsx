import React, { FC, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import { translations } from '../../_translations';
import { Button, Icon, SearchInput } from '../../_shared';
import { conferencesSelectors } from '../../_store/selectors';
import { conferencesActions, programsActions } from '../../_store/actions';
import { FillMetadataQueryFunction, HttpMetadataQuery } from '../../_http';
import ConferencesTable from './ConferencesTable';
import './conferencesOverview.scss';

const ConferencesOverview: FC = () => {
  const conferences = useSelector(conferencesSelectors.conferences);
  const isLoading = useSelector(conferencesSelectors.isLoading);
  const query = useSelector(conferencesSelectors.query);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(new conferencesActions.GetConferences());
    dispatch(new programsActions.GetPrograms());
  }, [dispatch]);

  const setQuery: FillMetadataQueryFunction = (partialQuery: HttpMetadataQuery) => {
    dispatch(new conferencesActions.SetConferencesQuery({ query: { ...query, ...partialQuery } }));
  };

  return (
    <Container as="main" className="conferences-overview">
      <header className="header">
        <SearchInput query={query} setQuery={setQuery} />
        <Button href="/conferences/create" isTextLink>
          <Icon name="SvgAdd" size={1.6} />
          {translations.getLabel('CONFERENCES.OVERVIEW.CREATE_CONFERENCE')}
        </Button>
      </header>
      <ConferencesTable data={conferences} isLoading={isLoading} setQuery={setQuery} />
    </Container>
  );
};

export default ConferencesOverview;
