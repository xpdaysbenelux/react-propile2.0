import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import { SearchInput, Button, Icon } from '../../_shared';
import { translations } from '../../_translations';
import { programsSelectors } from '../../_store/selectors';
import { FillMetadataQueryFunction, HttpMetadataQuery } from '../../_http';
import { programsActions } from '../../_store/actions';
import ProgramsTable from './ProgramsTable';

interface Prop {
  conferenceId: string;
}

const ProgramsOverview: FC<Prop> = ({ conferenceId }) => {
  const programs = useSelector(programsSelectors.programsFromConference(conferenceId));
  const isLoading = useSelector(programsSelectors.isLoading);
  const query = useSelector(programsSelectors.query);
  const dispatch = useDispatch();

  const setQuery: FillMetadataQueryFunction = (partialQuery: HttpMetadataQuery) => {
    dispatch(new programsActions.SetProgramsQuery({ query: { ...query, ...partialQuery } }));
  };

  console.log('ProgramsOverview', programs);

  return (
    <Container>
      <header className="header">
        <SearchInput query={query} setQuery={setQuery} />
        <Button href="/conferences/create-conference" isTextLink>
          <Icon name="SvgAdd" size={1.6} />
          {translations.getLabel('CONFERENCES.OVERVIEW.CREATE_CONFERENCE')}
        </Button>
      </header>
      {/*<ProgramsTable data={programs} isLoading={isLoading} setQuery={setQuery} /> */}
    </Container>
  );
};

export default ProgramsOverview;
