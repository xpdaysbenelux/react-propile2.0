import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Button, ErrorMessage, Dropdown, InputTextArea, Toggle, TimeSelector } from '../../_shared';
import { FormValidationErrors } from '../../_hooks/useForm';
import { formValidator } from '../../_utils/formValidation';
import { eventsSelectors, sessionsSelectors } from '../../_store/selectors';
import { useForm } from '../../_hooks';
import { ApiError } from '../../_http';
import { IEvent, IEventForm } from '../_models';
import { IProgram, programTimeIntervals } from '../../programs/_models';
import { translations } from '../../_translations';
import { eventsActions } from '../../_store/actions';
import { IRoom } from '../../conferences/_models';
import { DropdownOption } from '../../_shared/dropdown/Dropdown';
import { ISession } from '../../sessions/_models';
import './eventModal.scss';

interface Props {
  closeModal: () => void;
  event?: IEvent;
  program: IProgram;
  rooms: IRoom[];
}

function getRoomsDropdownData(rooms: IRoom[]): DropdownOption[] {
  const roomsDropdownData: DropdownOption[] = [];

  rooms.forEach(room => {
    roomsDropdownData.push({ key: room.id, text: room.name, value: room.name });
  });

  return roomsDropdownData;
}

function getSessionsTitlesDropDownData(sessions: ISession[]): DropdownOption[] {
  const titleDropdownData: DropdownOption[] = [];

  sessions.forEach(session => {
    titleDropdownData.push({ key: session.id, text: session.title, value: session.title });
  });

  return titleDropdownData;
}

function getReturningTitlesDropDownData(): DropdownOption[] {
  const titleDropdownData: DropdownOption[] = [];

  titleDropdownData.push({ key: 'Welcome', text: 'Welcome', value: 'Welcome' });
  titleDropdownData.push({ key: 'Registration', text: 'Registration', value: 'Registration' });
  titleDropdownData.push({ key: 'Refistration & Coffee', text: 'Refistration & Coffee', value: 'Refistration & Coffee' });
  titleDropdownData.push({ key: 'Coffee break', text: 'Coffee break', value: 'Coffee break' });
  titleDropdownData.push({ key: 'Lunch', text: 'Lunch', value: 'Lunch' });
  titleDropdownData.push({ key: 'Plenary', text: 'Plenary session', value: 'Plenary' });
  titleDropdownData.push({ key: 'Closing', text: 'Closing', value: 'Closing' });
  titleDropdownData.push({ key: 'Drinks at the bar', text: 'Drinks at the bar', value: 'Drinks at the bar' });
  titleDropdownData.push({ key: 'Conference dinner', text: 'Conference dinner', value: 'Conference dinner' });
  titleDropdownData.push({ key: 'Evening programme', text: 'Evening programme', value: 'Evening programme' });

  return titleDropdownData;
}

function getInitialForm(program: IProgram, event?: IEvent): IEventForm {
  const defaultEndTime = new Date(program.startTime);
  defaultEndTime.setHours(defaultEndTime.getHours() + 1);

  return {
    comment: event?.comment || '',
    endTime: event ? event.endTime : defaultEndTime.toISOString(),
    programId: program.id,
    roomId: event?.room.id || '',
    spanRow: event?.spanRow || false,
    startTime: event ? event.startTime : program.startTime,
    title: event?.title || '',
  };
}

function validateForm(values: IEventForm): FormValidationErrors<IEventForm> {
  const errors: FormValidationErrors<IEventForm> = {};
  errors.title = formValidator.isRequired(values.title);

  return errors;
}

function errorAsString(error?: ApiError): string {
  // TODO handle possible BE errors
  if (error) return null;
}

const EventModal: FC<Props> = ({ event, program, rooms, closeModal }) => {
  const dispatch = useDispatch();
  const sessions = useSelector(sessionsSelectors.sessions);
  const isSubmitting = useSelector(eventsSelectors.isLoading);
  const error = useSelector(eventsSelectors.errorCrudEvent);
  const errorMessage = errorAsString(error);
  const initialForm = getInitialForm(program, event);

  const form = useForm<IEventForm>({
    error,
    initialForm,
    submitForm: values => dispatch(new eventsActions.CreateEvent({ onSuccess: closeModal, values })),
    validateForm,
  });

  return (
    <Modal onClose={closeModal} open>
      <form className="ui form event-modal" onSubmit={form.submit}>
        <Modal.Header>
          {event
            ? translations.getLabel('EVENTS.EDIT_EVENT.TITLE', { eventTitle: event.title })
            : translations.getLabel('EVENTS.ADD_EVENT.TITLE')}
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
          <Dropdown
            errorMessage={form.validationErrors.title}
            label={translations.getLabel(form.values.spanRow ? 'EVENTS.TITLE' : 'EVENTS.SESSION_TITLE')}
            name="title"
            onChange={form.setAttribute}
            options={form.values.spanRow ? getReturningTitlesDropDownData() : getSessionsTitlesDropDownData(sessions)}
            value={form.values.title}
          />
          {!form.values.spanRow && (
            <Dropdown
              errorMessage={form.validationErrors.roomId}
              label={translations.getLabel('EVENTS.ROOM')}
              name="roomId"
              onChange={form.setAttribute}
              options={getRoomsDropdownData(rooms)}
              value={form.values.roomId}
            />
          )}
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
        </Modal.Content>
        <ErrorMessage isGlobal isVisible={!!errorMessage}>
          {errorMessage}
        </ErrorMessage>
        <Modal.Actions>
          <Button loading={isSubmitting} primary type="submit">
            {translations.getLabel(event ? 'SHARED.BUTTONS.SAVE' : 'SHARED.BUTTONS.CREATE')}
          </Button>
        </Modal.Actions>
      </form>
    </Modal>
  );
};

export default EventModal;
