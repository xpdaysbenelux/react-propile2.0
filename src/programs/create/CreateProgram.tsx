import React, { FC } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { IProgramForm, programDefaultEndTime, programDefaultStartTime } from '../_models';
import { translations } from '../../_translations';
import { programsSelectors, conferencesSelectors } from '../../_store/selectors';
import { programsActions } from '../../_store/actions';
import { IConference } from '../../conferences/_models';
import { GoBackLink } from '../../_shared';
import { dateTimeFromString, ISOStringFromDate, getDateAndCustomTimeString } from '../../_utils/timeHelpers';
import { handleProgramFormBeforeSubmit } from '../_utils';
import ProgramForm from '../ProgramForm';

const getInitialForm = (conference: IConference): IProgramForm => {
  return {
    conferenceId: conference?.id || '',
    date: conference?.startDate || new Date().toISOString(),
    endTime: conference
      ? ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(conference.startDate, programDefaultEndTime)))
      : new Date().toISOString(),
    startTime: conference
      ? ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(conference.startDate, programDefaultStartTime)))
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

  return (
    <Container as="main">
      <GoBackLink label={translations.getLabel('PROGRAMS.GO_BACK')} to={`/conferences/${conferenceId}`} />
      <h1>{translations.getLabel('PROGRAMS.CREATE.TITLE')}</h1>
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
        submitForm={(values: IProgramForm) => dispatch(new programsActions.CreateProgram({ values }))}
      />
    </Container>
  );
};

export default CreateProgram;
