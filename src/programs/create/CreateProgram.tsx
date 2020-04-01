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
  DateStringFromISOString,
  dateTimeFromString,
  getCombinedDateTimeString,
  ISOStringFromDate,
  getDateAndCustomTimeString,
} from '../../_utils/timeHelpers';
import CreateProgramForm from './CreateProgramForm';

const getInitialForm = (conference: IConference): ICreateProgramForm => ({
  conferenceId: conference?.id || '',
  date: conference?.startDate || new Date().toISOString(),
  endTime: conference
    ? ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(conference.startDate, '20:00')))
    : new Date().toISOString(),
  startTime: conference
    ? ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(conference.startDate, '08:00')))
    : new Date().toISOString(),
  title: '',
});

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
    values.date = ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(date, '02:01')));

    if (
      DateStringFromISOString(startTime) !== DateStringFromISOString(date) ||
      DateStringFromISOString(endTime) !== DateStringFromISOString(date)
    ) {
      console.log('not the same');
      values.startTime = ISOStringFromDate(dateTimeFromString(getCombinedDateTimeString(date, startTime)));
      values.endTime = ISOStringFromDate(dateTimeFromString(getCombinedDateTimeString(date, endTime)));
    }

    console.log(values);
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
