import React, { FC } from 'react';

import classnames from 'classnames';
import { ApiError } from '../../_http';
import { ICreateConferenceForm } from '../_models';
import useForm, { SubmitFormFunction, FormValidationErrors } from '../../_hooks/useForm';
import { formValidator } from '../../_utils/formValidation';
import { InputField, Button, DateSelector } from '../../_shared';
import { translations } from '../../_translations';
import './createConferenceForm.scss';

interface Props {
  buttons?: JSX.Element | JSX.Element[];
  error?: ApiError;
  initialForm: ICreateConferenceForm;
  isSubmitting: boolean;
  submitForm: SubmitFormFunction<ICreateConferenceForm>;
}

const CreateConferenceForm: FC<Props> = ({ initialForm, submitForm, isSubmitting, error, buttons }) => {
  function validateForm(values: ICreateConferenceForm): FormValidationErrors<ICreateConferenceForm> {
    const errors: FormValidationErrors<ICreateConferenceForm> = {};
    errors.name = formValidator.isRequired(values.name);

    values.rooms.forEach(room => {
      errors.rooms = formValidator.isRequired(room.name);
    });

    return errors;
  }

  const form = useForm<ICreateConferenceForm>({ error, initialForm, submitForm, validateForm });

  const renderRoomRow = (index: number, showDeleteButton: boolean) => (
    <>
      <div className="room-row" role="group">
        <InputField
          label={translations.getLabel('CONFERENCES.CREATE.ROOM_NAME')}
          name="roomName"
          onChange={form.setAttribute}
          type="text"
          value={form.values.rooms[index].name}
        />
        <InputField
          label={translations.getLabel('CONFERENCES.CREATE.MAX_PARTICIPANTS')}
          name="maxParticipants"
          onChange={form.setAttribute}
          type="number"
          value={form.values.rooms[index].maxParticipants.toString()}
        />
        {showDeleteButton && (
          <div className="delete-room-button">
            <Button theme="warning">X</Button>
          </div>
        )}
      </div>
    </>
  );

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
      </div>
      <div>
        {/*form.values.rooms.forEach((room: IRoom, index: number) => {
          console.log(room);
          {
            renderTest();
          }
          //renderRoomRow(index, index <= 1 ? false : true);
        })*/}
        {renderRoomRow(1, true)}
        <Button>Add a room</Button>
      </div>
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
