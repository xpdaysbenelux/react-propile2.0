import React, { FC } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { ICreateConferenceForm } from '../_models';
import { translations } from '../../_translations';
import { conferencesSelectors } from '../../_store/selectors';
import { conferencesActions } from '../../_store/actions';
import CreateConferenceForm from './CreateConferenceForm';

const initialForm: ICreateConferenceForm = {
  endDate: new Date().toISOString(),
  name: '',
  rooms: [
    {
      maxParticipants: 50,
      name: 'Room 1',
    },
    {
      maxParticipants: 50,
      name: 'Room 2',
    },
  ],
  startDate: new Date().toISOString(),
};

const CreateConference: FC = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(conferencesSelectors.isLoading);
  const error = useSelector(conferencesSelectors.errorCrudConference);

  return (
    <Container as="main">
      <h1>{translations.getLabel('CONFERENCES.CREATE.TITLE')}</h1>
      <CreateConferenceForm
        buttons={
          <Button href="/conferences" theme="secondary">
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        }
        error={error}
        initialForm={initialForm}
        isSubmitting={isSubmitting}
        submitForm={(values: ICreateConferenceForm) => dispatch(new conferencesActions.CreateConference({ values }))}
      />
    </Container>
  );
};

export default CreateConference;
