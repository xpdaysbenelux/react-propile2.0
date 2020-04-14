import React, { FC } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { ICreateConferenceForm } from '../_models';
import { translations } from '../../_translations';
import { conferencesSelectors } from '../../_store/selectors';
import { conferencesActions } from '../../_store/actions';
import { parseValuesToNumber } from '../../_utils/objectHelpers';
import { ISOStringFromDate, dateTimeFromString, getDateAndCustomTimeString } from '../../_utils/timeHelpers';
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

  const parseNumberValues = (givenValues: ICreateConferenceForm): ICreateConferenceForm => {
    const { rooms, name, startDate, endDate } = givenValues;
    const values: ICreateConferenceForm = { endDate, name, rooms: [], startDate };

    // These vars get used to set the start & end times of a conference as early and as late as possible
    const conferenceStartTime = '00:00';
    const conferenceEndTime = '23:59';
    values.startDate = ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(startDate, conferenceStartTime)));
    values.endDate = ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(endDate, conferenceEndTime)));

    rooms.forEach(room => {
      room.maxParticipants = parseValuesToNumber(room.maxParticipants);
    });

    values.rooms = rooms;
    return values;
  };

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
        submitForm={(values: ICreateConferenceForm) =>
          dispatch(new conferencesActions.CreateConference({ values: parseNumberValues(values) }))
        }
      />
    </Container>
  );
};

export default CreateConference;
