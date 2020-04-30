import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormValidationErrors } from '../../_hooks/useForm';
import { formValidator } from '../../_utils/formValidation';
import { eventsSelectors } from '../../_store/selectors';
import { useForm } from '../../_hooks';
import { ApiError } from '../../_http';
import { Modal, InputField, Button, ErrorMessage } from '../../_shared';
import { IEvent, IEventForm } from '../_models';
import { IProgram } from '../../programs/_models';
import { translations } from '../../_translations';
import { eventsActions } from '../../_store/actions';

interface Props {
  closeModal: () => void;
  event?: IEvent;
  program: IProgram;
}

const getInitialForm = (program: IProgram, event?: IEvent): IEventForm => {
  const defaultEndTime = new Date(program.endTime);
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
};

function validateForm(values: IEventForm): FormValidationErrors<IEventForm> {
  const errors: FormValidationErrors<IEventForm> = {};
  errors.title = formValidator.isRequired(values.title);

  return errors;
}

function errorAsString(error?: ApiError): string {
  // TODO handle possible BE errors
  if (error) return null;
}

const EventModal: FC<Props> = ({ event, program, closeModal }) => {
  const dispatch = useDispatch();
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
      <form onSubmit={form.submit}>
        <Modal.Header>
          {event
            ? translations.getLabel('EVENTS.EDIT_EVENT.TITLE', { eventTitle: event.title })
            : translations.getLabel('EVENTS.ADD_EVENT.TITLE')}
        </Modal.Header>
        <Modal.Content>
          <InputField
            errorMessage={form.validationErrors.title}
            label={translations.getLabel('EVENTS.TITLE')}
            name="title"
            onChange={form.setAttribute}
            type="text"
            value={form.values.title}
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
