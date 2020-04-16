import React, { FC } from 'react';
import { Container, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { IConferenceForm, IConference, createEmptyRoom, conferenceDefaultStartTime, conferenceDefaultEndTime } from '../_models';
import { translations } from '../../_translations';
import { conferencesSelectors } from '../../_store/selectors';
import { conferencesActions } from '../../_store/actions';
import { parseValuesToNumber } from '../../_utils/objectHelpers';
import { ISOStringFromDate, dateTimeFromString, getDateAndCustomTimeString } from '../../_utils/timeHelpers';
import LoadingSpinner from '../../_shared/loadingSpinner/LoadingSpinner';
import ConferenceForm from '../ConferenceForm';

const getInitialForm = (conference: IConference): IConferenceForm => ({
  endDate: conference?.endDate || new Date().toISOString(),
  name: conference?.name || '',
  rooms: conference?.rooms || [createEmptyRoom(1), createEmptyRoom(2)],
  startDate: conference?.startDate || new Date().toISOString(),
});

const EditConference: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isSubmitting = useSelector(conferencesSelectors.isLoading);
  const error = useSelector(conferencesSelectors.errorCrudConference);
  const conference = useSelector(conferencesSelectors.conference(id));
  const initialForm = getInitialForm(conference);

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

  return conference ? (
    <Container as="main">
      <h1>{translations.getLabel('CONFERENCES.EDIT.TITLE', { conferenceName: conference.name })}</h1>
      <ConferenceForm
        buttons={
          <Button href="/conferences" theme="secondary">
            {translations.getLabel('SHARED.BUTTONS.CANCEL')}
          </Button>
        }
        conferenceId={id}
        error={error}
        initialForm={initialForm}
        isSubmitting={isSubmitting}
        submitForm={(values: IConferenceForm) =>
          dispatch(new conferencesActions.UpdateConference({ conferenceId: id, values: parseNumberValues(values) }))
        }
      />
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default EditConference;
