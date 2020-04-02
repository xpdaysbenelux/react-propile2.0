import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import { useRouteMatch } from 'react-router-dom';
import { SearchInput, Button, Icon } from '../../_shared';
import { translations } from '../../_translations';
import { programsSelectors } from '../../_store/selectors';
import { FillMetadataQueryFunction, HttpMetadataQuery } from '../../_http';
import { programsActions } from '../../_store/actions';
import ProgramsTable from './ProgramsTable';
import './programsOverview.scss';

interface Prop {
  conferenceId: string;
}

const ProgramsOverview: FC<Prop> = ({ conferenceId }) => {
  const { url } = useRouteMatch();
  const programs = useSelector(programsSelectors.programsFromConference(conferenceId));
  const isLoading = useSelector(programsSelectors.isLoading);
  const query = useSelector(programsSelectors.query);
  const dispatch = useDispatch();

  const setQuery: FillMetadataQueryFunction = (partialQuery: HttpMetadataQuery) => {
    dispatch(new programsActions.SetProgramsQuery({ query: { ...query, ...partialQuery } }));
  };

  return (
    <Container className="programs-overview">
      <header className="header">
        <SearchInput query={query} setQuery={setQuery} />
        <Button href={`${url}/programs/create-program`} isTextLink>
          <Icon name="SvgAdd" size={1.6} />
          {translations.getLabel('PROGRAMS.OVERVIEW.CREATE_PROGRAM')}
        </Button>
      </header>
      <ProgramsTable data={programs} isLoading={isLoading} setQuery={setQuery} />
    </Container>
  );
};

export default ProgramsOverview;
