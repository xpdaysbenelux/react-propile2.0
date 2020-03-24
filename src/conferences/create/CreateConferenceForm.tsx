import React, { FC } from 'react';
import classnames from 'classnames';

import { ApiError } from '../../_http';
import { ICreateConferenceForm, IRoom } from '../_models';
import useForm, { SubmitFormFunction, FormValidationErrors } from '../../_hooks/useForm';
import { formValidator } from '../../_utils/formValidation';
import { InputField, Button, DateSelector } from '../../_shared';
import ErrorMessage from '../../_shared/errorMessage/ErrorMessage';
import { translations } from '../../_translations';
import './createConferenceForm.scss';

interface Props {
  buttons?: JSX.Element | JSX.Element[];
  error?: ApiError;
  initialForm: ICreateConferenceForm;
  isSubmitting: boolean;
  submitForm: SubmitFormFunction<ICreateConferenceForm>;
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'CONFERENCE_NAME_ALREADY_IN_USE')
    return translations.getLabel(`CONFERENCES.ERRORS.CONFERENCE_NAME_ALREADY_IN_USE`);
  return null;
}

const CreateConferenceForm: FC<Props> = ({ initialForm, submitForm, isSubmitting, error, buttons }) => {
  function validateForm(values: ICreateConferenceForm): FormValidationErrors<ICreateConferenceForm> {
    const errors: FormValidationErrors<ICreateConferenceForm> = {};
    errors.name = formValidator.isRequired(values.name);

    if (values.startDate > values.endDate) {
      errors.endDate = 'The end date must be later than the start date!';
    }

    values.rooms.every(room => {
      if (room.name === '') {
        errors.rooms = 'All the rooms their values must be filled in.';
        return false;
      } else if (room.maxParticipants < 0 || room.maxParticipants > 50) {
        errors.rooms = formValidator.isBetween(room.maxParticipants, 0, 50, 'max amount of participants');
        return false;
      } else {
        return true;
      }
    });

    return errors;
  }

  const form = useForm<ICreateConferenceForm>({ error, initialForm, submitForm, validateForm });

  function addRoomToForm() {
    form.setAttribute([...form.values.rooms, { maxParticipants: 50, name: `Room ${form.values.rooms.length + 1}` }], 'rooms');
  }

  function removeRoomFromForm(givenIndex: number) {
    const rooms = [...form.values.rooms];
    console.log('remove', rooms);
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

    const removeRoom = () => {
      removeRoomFromForm(index);
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
          <div className="delete-room-button">
            <Button onClick={removeRoom} theme="warning">
              X
            </Button>
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
        {form.validationErrors.endDate ? <ErrorMessage isVisible>{form.validationErrors.endDate}</ErrorMessage> : null}
      </div>
      <div className="conference-rooms">
        <h3>{translations.getLabel('CONFERENCES.CREATE.ROOMS')}</h3>
        {form.values.rooms.map((room: IRoom, index: number) => renderRoomRow(room, index, index <= 1 ? false : true))}
        {form.validationErrors.rooms ? <ErrorMessage isVisible>{form.validationErrors.rooms}</ErrorMessage> : null}
        <Button onClick={addRoomToForm}>Add a room</Button>
      </div>
      {error ? <ErrorMessage isVisible>{errorAsString(error)}</ErrorMessage> : null}
      <div className="actions">
        {buttons}
        <Button loading={isSubmitting} type="submit">
          {translations.getLabel('SHARED.BUTTONS.CREATE')}
        </Button>
      </div>
    </form>
  );
};

export default CreateConferenceForm;
