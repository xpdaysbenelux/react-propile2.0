import React, { FC } from 'react';
import classnames from 'classnames';

import { ApiError } from '../_http';
import useForm, { SubmitFormFunction, FormValidationErrors } from '../_hooks/useForm';
import { formValidator } from '../_utils/formValidation';
import { InputField, Button, DateSelector, Icon } from '../_shared';
import ErrorMessage from '../_shared/errorMessage/ErrorMessage';
import { translations } from '../_translations';
import { IConferenceForm, IRoom, createEmptyRoom, roomMaxParticipants } from './_models';
import './conferenceForm.scss';

interface Props {
  buttons?: JSX.Element | JSX.Element[];
  conferenceId?: string;
  error?: ApiError;
  initialForm: IConferenceForm;
  isSubmitting: boolean;
  submitForm: SubmitFormFunction<IConferenceForm>;
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'CONFERENCE_NAME_ALREADY_IN_USE')
    return translations.getLabel(`CONFERENCES.ERRORS.CONFERENCE_NAME_ALREADY_IN_USE`);
  if (error?.error === 'CONFERENCE_MUST_HAVE_AT_LEAST_TWO_ROOMS')
    return translations.getLabel('CONFERENCES.ERRORS.CONFERENCE_MUST_HAVE_AT_LEAST_TWO_ROOMS');
  return null;
}

function validateRoom(room: IRoom): string {
  if (!room.name || room.maxParticipants.toString() === '')
    return translations.getLabel('CONFERENCES.ERRORS.ALL_ROOM_VALUES_MUST_BE_FILLED_IN');
  return formValidator.isBetween(room.maxParticipants, 0, roomMaxParticipants, 'max amount of participants');
}

const CreateConferenceForm: FC<Props> = ({ conferenceId, initialForm, submitForm, isSubmitting, error, buttons }) => {
  function validateForm(values: IConferenceForm): FormValidationErrors<IConferenceForm> {
    const errors: FormValidationErrors<IConferenceForm> = {};
    errors.name = formValidator.isRequired(values.name);

    if (Date.parse(values.startDate) > Date.parse(values.endDate)) {
      errors.endDate = translations.getLabel('END_DATE_LATER_THAN_START_DATE');
    }

    if (values.rooms.length < 2) {
      errors.rooms = translations.getLabel('CONFERENCES.ERRORS.CONFERENCE_MUST_HAVE_AT_LEAST_TWO_ROOMS');
    } else {
      errors.rooms = values.rooms.map(room => validateRoom(room)).find(error => !!error);
    }

    return errors;
  }

  const form = useForm<IConferenceForm>({ error, initialForm, submitForm, validateForm });

  function addRoomToForm() {
    form.setAttribute([...form.values.rooms, createEmptyRoom(form.values.rooms.length + 1)], 'rooms');
  }

  function removeRoomFromForm(givenIndex: number) {
    const rooms = [...form.values.rooms];
    rooms.splice(givenIndex, 1);
    form.setAttribute(rooms, 'rooms');
  }

  const renderRoomRow = (room: IRoom, index: number, showDeleteButton: boolean) => {
    const onChange = (value: string, name: string) => {
      const index = parseInt(name.split('.')[1]);
      const attribute = name.split('.')[2];
      const rooms = [...form.values.rooms];
      rooms[index][attribute] = value;
      form.setAttribute(rooms, 'rooms');
    };

    return (
      <div className="room-row" key={index} role="group">
        <InputField
          label={translations.getLabel('CONFERENCES.CREATE.ROOM_NAME')}
          name={`rooms.${index}.name`}
          onChange={onChange}
          type="text"
          value={form.values.rooms[index].name}
        />
        <InputField
          label={translations.getLabel('CONFERENCES.CREATE.MAX_PARTICIPANTS')}
          name={`rooms.${index}.maxParticipants`}
          onChange={onChange}
          type="number"
          value={form.values.rooms[index].maxParticipants.toString()}
        />
        {showDeleteButton && (
          <div className="delete-room">
            <Icon name="SvgClose" onClick={() => removeRoomFromForm(index)} size={2.4} />
          </div>
        )}
      </div>
    );
  };

  return (
    <form className={classnames('create-conference', 'ui', 'form')} onSubmit={form.submit}>
      <div role="group">
        <InputField
          errorMessage={form.validationErrors.name}
          label={translations.getLabel('CONFERENCES.NAME') + '*'}
          name="name"
          onChange={form.setAttribute}
          type="text"
          value={form.values.name}
        />
      </div>
      <div role="group">
        <DateSelector
          label={translations.getLabel('CONFERENCES.START_DATE') + '*'}
          name="startDate"
          onChange={form.setAttribute}
          value={form.values.startDate}
        />
        <DateSelector
          label={translations.getLabel('CONFERENCES.END_DATE') + '*'}
          name="endDate"
          onChange={form.setAttribute}
          value={form.values.endDate}
        />
        {form.validationErrors.endDate && <ErrorMessage isVisible>{form.validationErrors.endDate}</ErrorMessage>}
      </div>
      <div className="conference-rooms">
        <h3>{translations.getLabel('CONFERENCES.CREATE.ROOMS')}</h3>
        {form.values.rooms.map((room: IRoom, index: number) => renderRoomRow(room, index, conferenceId ? true : !(index <= 1)))}
        {form.validationErrors.rooms && <ErrorMessage isVisible>{form.validationErrors.rooms}</ErrorMessage>}
        <Button onClick={addRoomToForm}>{translations.getLabel('CONFERENCES.CREATE.ADD_ROOM')}</Button>
      </div>
      {error && <ErrorMessage isVisible>{errorAsString(error)}</ErrorMessage>}
      <div className="actions">
        {buttons}
        <Button loading={isSubmitting} type="submit">
          {translations.getLabel(conferenceId ? 'SHARED.BUTTONS.SAVE' : 'SHARED.BUTTONS.CREATE')}
        </Button>
      </div>
    </form>
  );
};

export default CreateConferenceForm;
