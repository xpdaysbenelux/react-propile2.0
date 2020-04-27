import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { programsSelectors, conferencesSelectors } from '../../_store/selectors';
import { translations } from '../../_translations';
import { formatTime } from '../../_utils/timeHelpers';
import { GoBackLink } from '../../_shared';
import LoadingSpinner from '../../_shared/loadingSpinner/LoadingSpinner';
import PlanningTable from './PlanningTable';
import './editProgramPlanning.scss';

const EditProgramPlanning: FC = () => {
  const { id } = useParams();
  const program = useSelector(programsSelectors.program(id));
  const conference = useSelector(conferencesSelectors.conference(program.conference.id));

  return program ? (
    <Container as="main">
      <GoBackLink label={translations.getLabel('PROGRAMS.GO_BACK')} to={`/conferences/${conference.id}`} />
      <h1>{translations.getLabel('PROGRAMS.PLANNING.TITLE', { programTitle: program.title })}</h1>
      <div className="program-info">
        <p>
          {translations.getLabel('PROGRAMS.PLANNING.PROGRAM_START_AND_END_TIME', {
            programEndTime: formatTime(program.endTime),
            programStartTime: formatTime(program.startTime),
          })}{' '}
          <Link to={`/programs/edit/${program.id}`}>{translations.getLabel('SHARED.BUTTONS.EDIT')}</Link>
        </p>
        <p>
          {translations.getLabel('PROGRAMS.PLANNING.PROGRAM_ROOMS_AMOUNT', { programRoomAmount: conference.rooms.length })}{' '}
          <Link to={`/conferences/edit/${conference.id}`}>{translations.getLabel('SHARED.BUTTONS.EDIT')}</Link>
        </p>
      </div>
      <PlanningTable endTime={formatTime(program.endTime)} events={program.events} startTime={formatTime(program.startTime)} />
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default EditProgramPlanning;
