import React, { FC } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { ICreateProgramForm } from '../_models';
import { translations } from '../../_translations';
import { programsSelectors, conferencesSelectors } from '../../_store/selectors';
import { programsActions } from '../../_store/actions';
import { IConference } from '../../conferences/_models';
import { GoBackLink } from '../../_shared';
import {
  dateStringFromISOString,
  dateTimeFromString,
  getCombinedDateTimeString,
  ISOStringFromDate,
  getDateAndCustomTimeString,
} from '../../_utils/timeHelpers';
import CreateProgramForm from './CreateProgramForm';

const getInitialForm = (conference: IConference): ICreateProgramForm => {
  // These vars get used to prefill the date selectors for the start & endtimes of a program
  const givenStartTime = '08:00';
  const givenEndTime = '20:00';

  return {
    conferenceId: conference?.id || '',
    date: conference?.startDate || new Date().toISOString(),
    endTime: conference
      ? ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(conference.startDate, givenEndTime)))
      : new Date().toISOString(),
    startTime: conference
      ? ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(conference.startDate, givenStartTime)))
      : new Date().toISOString(),
    title: '',
  };
};

const CreateProgram: FC = () => {
  const { conferenceId } = useParams();
  const conference = useSelector(conferencesSelectors.conference(conferenceId));
  const dispatch = useDispatch();
  const isSubmitting = useSelector(programsSelectors.isLoading);
  const error = useSelector(programsSelectors.errorCrudProgram);

  if (!conference) return <Redirect to={`conferences/${conferenceId}`} />;
  const initialForm = getInitialForm(conference);

  const beforeSubmit = (givenValues: ICreateProgramForm): ICreateProgramForm => {
    const { date, startTime, endTime, title, conferenceId } = givenValues;
    const values: ICreateProgramForm = { conferenceId, date, endTime, startTime, title };

    // This var is used to set the time of the program date to 1 minute after the start of a conference date
    const timeForDate = '00:01';
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

  return (
    <Container as="main">
      <GoBackLink label={translations.getLabel('PROGRAMS.GO_BACK')} to={`/conferences/${conferenceId}`} />
      <h1>{translations.getLabel('PROGRAMS.CREATE.TITLE')}</h1>
      <CreateProgramForm
        buttons={
          <Button href="/programs" theme="secondary">
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        }
        conference={conference}
        error={error}
        initialForm={initialForm}
        isSubmitting={isSubmitting}
        submitForm={(values: ICreateProgramForm) => dispatch(new programsActions.CreateProgram({ values: beforeSubmit(values) }))}
      />
    </Container>
  );
};

export default CreateProgram;
