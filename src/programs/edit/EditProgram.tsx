import React, { FC } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { IProgramForm, IProgram, programDefaultEndTime, programDefaultStartTime } from '../_models';
import { translations } from '../../_translations';
import { programsSelectors, conferencesSelectors } from '../../_store/selectors';
import { programsActions } from '../../_store/actions';
import { GoBackLink } from '../../_shared';
import { dateTimeFromString, ISOStringFromDate, getDateAndCustomTimeString } from '../../_utils/timeHelpers';
import { handleProgramFormBeforeSubmit } from '../_utils';
import LoadingSpinner from '../../_shared/loadingSpinner/LoadingSpinner';
import ProgramForm from '../ProgramForm';

const getInitialForm = (program: IProgram): IProgramForm => {
  return {
    conferenceId: program.conference.id,
    date: program?.date || new Date().toISOString(),
    endTime: program
      ? program.endTime
      : ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(new Date().toISOString(), programDefaultEndTime))),
    startTime: program
      ? program.startTime
      : ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(new Date().toISOString(), programDefaultStartTime))),
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
        submitForm={(values: IProgramForm) => dispatch(new programsActions.UpdateProgram({ programId: program.id, values }))}
      />
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default EditProgram;
