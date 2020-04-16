import React, { FC } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { IProgramForm, IProgram } from '../_models';
import { translations } from '../../_translations';
import { programsSelectors, conferencesSelectors } from '../../_store/selectors';
import { programsActions } from '../../_store/actions';
import { GoBackLink } from '../../_shared';
import {
  dateStringFromISOString,
  dateTimeFromString,
  getCombinedDateTimeString,
  ISOStringFromDate,
  getDateAndCustomTimeString,
} from '../../_utils/timeHelpers';
import ProgramForm from '../ProgramForm';
import LoadingSpinner from '../../_shared/loadingSpinner/LoadingSpinner';

const getInitialForm = (program: IProgram): IProgramForm => {
  // These vars get used to prefill the date selectors for the start & endtimes of a program
  const givenStartTime = '08:00';
  const givenEndTime = '20:00';

  return {
    conferenceId: program.conference.id,
    date: program?.date || new Date().toISOString(),
    endTime: program
      ? program.endTime
      : ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(new Date().toISOString(), givenEndTime))),
    startTime: program
      ? program.startTime
      : ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(new Date().toISOString(), givenStartTime))),
    title: program?.title || '',
  };
};

const EditProgram: FC = () => {
  const { id } = useParams();
  const program = useSelector(programsSelectors.program(id));
  const conference = useSelector(conferencesSelectors.conference(program.conference.id));
  const dispatch = useDispatch();
  const isSubmitting = useSelector(programsSelectors.isLoading);
  const error = useSelector(programsSelectors.errorCrudProgram);

  if (!program) return <Redirect to={`programs/${id}`} />;
  const initialForm = getInitialForm(program);

  const beforeSubmit = (givenValues: IProgramForm): IProgramForm => {
    const { date, startTime, endTime, title, conferenceId } = givenValues;
    const values: IProgramForm = { conferenceId, date, endTime, startTime, title };

    // This var is used to set the time of the program date to 1 minute after the start of a conference date
    const timeForDate = '02:01';
    values.date = ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(date, timeForDate)));

    if (
      dateStringFromISOString(startTime) !== dateStringFromISOString(date) ||
      dateStringFromISOString(endTime) !== dateStringFromISOString(date)
    ) {
      values.startTime = ISOStringFromDate(dateTimeFromString(getCombinedDateTimeString(date, startTime)));
      values.endTime = ISOStringFromDate(dateTimeFromString(getCombinedDateTimeString(date, endTime)));
    }

    return values;
  };

  return program ? (
    <Container as="main">
      <GoBackLink label={translations.getLabel('PROGRAMS.GO_BACK')} to={`/conferences/${conference.id}`} />
      <h1>{translations.getLabel('PROGRAMS.EDIT.TITLE', { programTitle: program.title })}</h1>
      <ProgramForm
        buttons={
          <Button href="/programs" theme="secondary">
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        }
        conference={conference}
        error={error}
        initialForm={initialForm}
        isSubmitting={isSubmitting}
        programId={program.id}
        submitForm={(values: IProgramForm) =>
          dispatch(new programsActions.UpdateProgram({ programId: program.id, values: beforeSubmit(values) }))
        }
      />
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default EditProgram;
