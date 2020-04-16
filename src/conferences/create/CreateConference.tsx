import React, { FC } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { IConferenceForm, createEmptyRoom, conferenceDefaultStartTime, conferenceDefaultEndTime } from '../_models';
import { translations } from '../../_translations';
import { conferencesSelectors } from '../../_store/selectors';
import { conferencesActions } from '../../_store/actions';
import { parseValuesToNumber } from '../../_utils/objectHelpers';
import { ISOStringFromDate, dateTimeFromString, getDateAndCustomTimeString } from '../../_utils/timeHelpers';
import ConferenceForm from '../ConferenceForm';

const initialForm: IConferenceForm = {
  endDate: new Date().toISOString(),
  name: '',
  rooms: [createEmptyRoom(1), createEmptyRoom(2)],
  startDate: new Date().toISOString(),
};

const CreateConference: FC = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(conferencesSelectors.isLoading);
  const error = useSelector(conferencesSelectors.errorCrudConference);

  const parseNumberValues = (givenValues: IConferenceForm): IConferenceForm => {
    const { rooms, name, startDate, endDate } = givenValues;
    const values: IConferenceForm = { endDate, name, rooms: [], startDate };

    values.startDate = ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(startDate, conferenceDefaultStartTime)));
    values.endDate = ISOStringFromDate(dateTimeFromString(getDateAndCustomTimeString(endDate, conferenceDefaultEndTime)));

    rooms.forEach(room => {
      room.maxParticipants = parseValuesToNumber(room.maxParticipants);
    });

    values.rooms = rooms;
    return values;
  };

  return (
    <Container as="main">
      <h1>{translations.getLabel('CONFERENCES.CREATE.TITLE')}</h1>
      <ConferenceForm
        buttons={
          <Button href="/conferences" theme="secondary">
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        }
        error={error}
        initialForm={initialForm}
        isSubmitting={isSubmitting}
        submitForm={(values: IConferenceForm) =>
          dispatch(new conferencesActions.CreateConference({ values: parseNumberValues(values) }))
        }
      />
    </Container>
  );
};

export default CreateConference;
