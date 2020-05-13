import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHours } from 'date-fns';

import { Modal, Button, ErrorMessage, Dropdown, InputTextArea, Toggle, TimeSelector } from '../../_shared';
import { FormValidationErrors } from '../../_hooks/useForm';
import { formValidator } from '../../_utils/formValidation';
import { dateFromISOString } from '../../_utils/timeHelpers';
import { eventsSelectors, sessionsSelectors } from '../../_store/selectors';
import { useForm } from '../../_hooks';
import { ApiError } from '../../_http';
import { IEvent, IEventForm, EventTitle, eventMaxDuration } from '../_models';
import { IProgram, programTimeIntervals } from '../../programs/_models';
import { translations } from '../../_translations';
import { eventsActions } from '../../_store/actions';
import { IRoom } from '../../conferences/_models';
import './eventModal.scss';

interface Props {
  event?: IEvent;
  hideModal: () => void;
  program: IProgram;
  rooms: IRoom[];
}

function getInitialForm(program: IProgram, event?: IEvent): IEventForm {
  return {
    comment: event?.comment || '',
    endTime: event ? event.endTime : addHours(new Date(program.startTime), 1).toISOString(),
    programId: program.id,
    roomId: event?.room?.id || '',
    sessionId: event?.session?.id || '',
    spanRow: event?.spanRow || false,
    startTime: event ? event.startTime : program.startTime,
    title: event?.title || '',
  };
}

function checkForOverlap(startTime1: Date, endTime1: Date, startTime2: Date, endTime2: Date): string {
  if (startTime1 < endTime2 && endTime1 > startTime2) {
    console.log('event overlaps');
    return translations.getLabel('EVENTS.ERRORS.EVENT_OVERLAPS');
  }
}

function handleRoomAndSession(values: IEventForm): IEventForm {
  if (values.spanRow) {
    values.roomId = '';
    values.sessionId = '';
  } else {
    values.title = '';
  }

  return values;
}

function validateForm(values: IEventForm, events: IEvent[], eventId?: string): FormValidationErrors<IEventForm> {
  const errors: FormValidationErrors<IEventForm> = {};

  if (values.spanRow) {
    errors.title = formValidator.isRequired(values.title);
  } else {
    errors.sessionId = formValidator.isRequired(values.sessionId);
    errors.roomId = formValidator.isRequired(values.roomId);
    errors.endTime = formValidator.durationNotLongerThan(values.startTime, values.endTime, eventMaxDuration);
  }

  if (Date.parse(values.startTime) > Date.parse(values.endTime)) {
    errors.endTime = translations.getLabel('EVENTS.ERRORS.END_TIME_LATER_THEN_START_TIME');
  }

  // Check dat zelfde event is uitgefilterd
  errors.endTime = events
    .map(existingEvent => {
      if (existingEvent.id !== eventId)
        return checkForOverlap(
          dateFromISOString(values.startTime),
          dateFromISOString(values.endTime),
          dateFromISOString(existingEvent.startTime),
          dateFromISOString(existingEvent.endTime),
        );
    })
    .find(error => !!error);

  return errors;
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'PROGRAM_NOT_FOUND') return translations.getLabel('PROGRAMS.ERRORS.PROGRAM_NOT_FOUND');
  if (error?.error === 'SESSION_NOT_FOUND') return translations.getLabel('SESSIONS.ERRORS.SESSION_NOT_FOUND');
  if (error?.error === 'EVENT_NOT_FOUND') return translations.getLabel('EVENTS.ERRORS.EVENT_NOT_FOUND');
  if (error?.error === 'CONFERENCE_ROOM_NOT_FOUND') return translations.getLabel('CONFERENCES.ERRORS.CONFERENCE_ROOM_NOT_FOUND');
  if (error?.error === 'END_TIME_LATER_THEN_START_TIME')
    return translations.getLabel('EVENTS.ERRORS.END_TIME_LATER_THEN_START_TIME');
  return null;
}

const EventModal: FC<Props> = ({ event, program, rooms, hideModal }) => {
  const dispatch = useDispatch();
  const sessions = useSelector(sessionsSelectors.sessions);
  const events = useSelector(eventsSelectors.events);
  const isSubmitting = useSelector(eventsSelectors.isLoading);
  const error = useSelector(eventsSelectors.errorCrudEvent);
  const errorMessage = errorAsString(error);
  const initialForm = getInitialForm(program, event);

  const form = useForm<IEventForm>({
    error,
    initialForm,
    submitForm: values =>
      event?.id
        ? dispatch(
            new eventsActions.UpdateEvent({
              eventId: event.id,
              onSuccess: hideModal,
              programId: program.id,
              values: handleRoomAndSession(values),
            }),
          )
        : dispatch(
            new eventsActions.CreateEvent({ onSuccess: hideModal, programId: program.id, values: handleRoomAndSession(values) }),
          ),
    validateForm: values => validateForm(values, events, event?.id),
  });

  const renderSessionPart = () => (
    <>
      <Dropdown
        errorMessage={form.validationErrors.sessionId}
        label={translations.getLabel('EVENTS.SESSION_TITLE')}
        name="sessionId"
        onChange={form.setAttribute}
        options={sessions.map(session => {
          return { key: session.id, text: session.title, value: session.id };
        })}
        value={form.values.sessionId}
      />
      <Dropdown
        errorMessage={form.validationErrors.roomId}
        label={translations.getLabel('EVENTS.ROOM')}
        name="roomId"
        onChange={form.setAttribute}
        options={rooms.map(room => {
          return { key: room.id, text: room.name, value: room.id };
        })}
        value={form.values.roomId}
      />
    </>
  );

  const renderTitlePart = () => (
    <Dropdown
      errorMessage={form.validationErrors.title}
      label={translations.getLabel('EVENTS.TITLE')}
      name="title"
      onChange={form.setAttribute}
      options={Object.values(EventTitle).map(value => ({
        key: value,
        text: translations.getLabel(`EVENTS.EVENT_TITLES.${value}`),
        value,
      }))}
      value={form.values.title}
    />
  );

  return (
    <Modal onClose={hideModal} open>
      <form className="ui form event-modal" onSubmit={form.submit}>
        <Modal.Header>
          {event?.id ? translations.getLabel('EVENTS.EDIT_EVENT.TITLE') : translations.getLabel('EVENTS.ADD_EVENT.TITLE')}
        </Modal.Header>
        <Modal.Content>
          <Toggle
            className="span-row-toggle"
            label={translations.getLabel('EVENTS.SPAN_ROW')}
            leftValue={translations.getLabel('SHARED.TOGGLE.NO')}
            name="spanRow"
            onChange={form.setAttribute}
            rightValue={translations.getLabel('SHARED.TOGGLE.YES')}
            value={form.values.spanRow}
          />
          {form.values.spanRow ? renderTitlePart() : renderSessionPart()}
          <InputTextArea
            errorMessage={form.validationErrors.comment}
            label={translations.getLabel('EVENTS.COMMENT')}
            name="comment"
            onChange={form.setAttribute}
            rows={1}
            type="text"
            value={form.values.comment}
          />
          <TimeSelector
            label={translations.getLabel('EVENTS.STARTS_AT')}
            maxTime={program.endTime}
            minTime={program.startTime}
            name="startTime"
            onChange={form.setAttribute}
            timeFormat="h:mm aa"
            timeIntervals={programTimeIntervals}
            value={form.values.startTime}
          />
          <TimeSelector
            label={translations.getLabel('EVENTS.ENDS_AT')}
            maxTime={program.endTime}
            minTime={program.startTime}
            name="endTime"
            onChange={form.setAttribute}
            timeFormat="h:mm aa"
            timeIntervals={programTimeIntervals}
            value={form.values.endTime}
          />
          {form.validationErrors.endTime && <ErrorMessage isVisible>{form.validationErrors.endTime}</ErrorMessage>}
        </Modal.Content>
        <ErrorMessage isGlobal isVisible={!!errorMessage}>
          {errorMessage}
        </ErrorMessage>
        <Modal.Actions>
          {event?.id && (
            <Button
              onClick={() =>
                dispatch(new eventsActions.DeleteEvent({ eventId: event?.id, onSuccess: hideModal, programId: program.id }))
              }
              theme="warning"
              type="button"
            >
              {translations.getLabel('SHARED.BUTTONS.DELETE')}
            </Button>
          )}
          <Button loading={isSubmitting} primary type="submit">
            {translations.getLabel(event?.id ? 'SHARED.BUTTONS.SAVE' : 'SHARED.BUTTONS.CREATE')}
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  );
};

export default EventModal;
