import React, { FC } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Item } from 'semantic-ui-react';

import { programsSelectors } from '../../_store/selectors';
import { translations } from '../../_translations';
import { GoBackLink, Timestamps } from '../../_shared';
import { formatDate, dateFromISOString, formatTime } from '../../_utils/timeHelpers';

const ProgramDetail: FC = () => {
  const { programId } = useParams();
  const program = useSelector(programsSelectors.program(programId));

  if (!program) return <Redirect to="/conferences" />;

  function renderHeader() {
    return (
      <header>
        <h1>{program.title}</h1>
        <Timestamps entity={program} />
      </header>
    );
  }

  function renderDetailSection() {
    return (
      <Item.Group>
        <h2>{translations.getLabel('SHARED.DETAIL.TITLE')}</h2>
        <Item>
          <Item.Content>
            <Item.Header>{translations.getLabel('PROGRAMS.DATE')}</Item.Header>
            <Item.Description>{formatDate(dateFromISOString(program.date))}</Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header>{translations.getLabel('PROGRAMS.START_TIME')}</Item.Header>
            <Item.Description>{formatTime(program.startTime)}</Item.Description>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Item.Header>{translations.getLabel('PROGRAMS.END_TIME')}</Item.Header>
            <Item.Description>{formatTime(program.endTime)}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }

  return (
    <Container as="main" className="program-detail">
      <GoBackLink label={translations.getLabel('PROGRAMS.DETAIL.BACK')} to="/conferences" />
      {renderHeader()}
      {renderDetailSection()}
    </Container>
  );
};

export default ProgramDetail;
