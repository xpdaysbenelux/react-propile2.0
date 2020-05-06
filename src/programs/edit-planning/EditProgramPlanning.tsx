import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { programsSelectors, conferencesSelectors, eventsSelectors } from '../../_store/selectors';
import { formatTime, formatDate, dateFromISOString } from '../../_utils/timeHelpers';
import { sessionsActions, eventsActions } from '../../_store/actions';
import { translations } from '../../_translations';
import { GoBackLink } from '../../_shared';
import LoadingSpinner from '../../_shared/loadingSpinner/LoadingSpinner';
import PlanningTable from './PlanningTable';
import './editProgramPlanning.scss';

const EditProgramPlanning: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const program = useSelector(programsSelectors.program(id));
  const conference = useSelector(conferencesSelectors.conference(program.conference.id));
  const events = useSelector(eventsSelectors.events);

  console.log(events);

  useEffect(() => {
    dispatch(new sessionsActions.GetSessions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(new eventsActions.GetEvents({ programId: program.id }));
  }, [dispatch, program.id]);

  return program ? (
    <Container as="main">
      <GoBackLink label={translations.getLabel('PROGRAMS.GO_BACK')} to={`/conferences/${conference.id}`} />
      <h1>{translations.getLabel('PROGRAMS.PLANNING.TITLE', { programTitle: program.title })}</h1>
      <div className="program-info">
        <p>
          {translations.getLabel('PROGRAMS.PLANNING.PROGRAM_DATE', { programDate: formatDate(dateFromISOString(program.date)) })}
        </p>
        <p>
          {translations.getLabel('PROGRAMS.PLANNING.PROGRAM_START_AND_END_TIME', {
            programEndTime: formatTime(program.endTime),
            programStartTime: formatTime(program.startTime),
          })}{' '}
          <Link to={`/programs/${program.id}/edit`}>{translations.getLabel('SHARED.BUTTONS.EDIT')}</Link>
        </p>
        <p>
          {translations.getLabel('PROGRAMS.PLANNING.PROGRAM_ROOMS_AMOUNT', { programRoomAmount: conference.rooms.length })}{' '}
          <Link to={`/conferences/edit/${conference.id}`}>{translations.getLabel('SHARED.BUTTONS.EDIT')}</Link>
        </p>
      </div>
      <PlanningTable program={program} rooms={conference.rooms} />
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default EditProgramPlanning;
