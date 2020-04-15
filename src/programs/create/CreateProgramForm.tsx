import React, { FC } from 'react';
import classnames from 'classnames';

import { ApiError } from '../../_http';
import { ICreateProgramForm } from '../_models';
import { IConference } from '../../conferences/_models';
import useForm, { SubmitFormFunction, FormValidationErrors } from '../../_hooks/useForm';
import { formValidator } from '../../_utils/formValidation';
import { InputField, Button, DateSelector, TimeSelector } from '../../_shared';
import ErrorMessage from '../../_shared/errorMessage/ErrorMessage';
import { translations } from '../../_translations';
import './createProgramForm.scss';

interface Props {
  buttons?: JSX.Element | JSX.Element[];
  conference: IConference;
  error?: ApiError;
  initialForm: ICreateProgramForm;
  isSubmitting: boolean;
  submitForm: SubmitFormFunction<ICreateProgramForm>;
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'CONFERENCE_NOT_FOUND') return translations.getLabel('CONFERENCES.ERRORS.CONFERENCE_NOT_FOUND');
  if (error?.error === 'PROGRAM_NAME_ALREADY_IN_USE')
    return translations.getLabel(`PROGRAMS.ERRORS.PROGRAM_TITLE_ALREADY_IN_USE`);
  if (error?.error === 'PROGRAM_DATE_MUST_BE_BETWEEN_CONFERENCE_DATES')
    return translations.getLabel('PROGRAMS.ERRORS.PROGRAM_DATE_MUST_BE_BETWEEN_CONFERENCE_DATES');
  if (error?.error === 'START_END_TIME_DATES_MUST_BE_SAME_AS_PROGRAM_DATE')
    return translations.getLabel('PROGRAMS.ERRORS.START_END_TIME_DATES_MUST_BE_SAME_AS_PROGRAM_DATE');
  return null;
}

const CreateProgramForm: FC<Props> = ({ initialForm, submitForm, isSubmitting, error, buttons, conference }) => {
  function validateForm(values: ICreateProgramForm): FormValidationErrors<ICreateProgramForm> {
    const errors: FormValidationErrors<ICreateProgramForm> = {};
    errors.title = formValidator.isRequired(values.title);

    return errors;
  }

  const form = useForm<ICreateProgramForm>({ error, initialForm, submitForm, validateForm });

  return (
    <form className={classnames('create-conference', 'ui', 'form')} onSubmit={form.submit}>
      <div role="group">
        <InputField
          errorMessage={form.validationErrors.title}
          label={translations.getLabel('PROGRAMS.TITLE')}
          name="title"
          onChange={form.setAttribute}
          type="text"
          value={form.values.title}
        />
      </div>
      <div role="group">
        <DateSelector
          label={translations.getLabel('PROGRAMS.DATE')}
          maxDate={conference.endDate}
          minDate={conference.startDate}
          name="date"
          onChange={form.setAttribute}
          value={form.values.date}
        />
        <TimeSelector
          label={translations.getLabel('PROGRAMS.START_TIME')}
          name="startTime"
          onChange={form.setAttribute}
          timeFormat="h:mm aa"
          timeIntervals={30}
          value={form.values.startTime}
        />
        <TimeSelector
          label={translations.getLabel('PROGRAMS.END_TIME')}
          name="endTime"
          onChange={form.setAttribute}
          timeFormat="h:mm aa"
          timeIntervals={30}
          value={form.values.endTime}
        />
      </div>
      {error && <ErrorMessage isVisible>{errorAsString(error)}</ErrorMessage>}
      <div className="actions">
        {buttons}
        <Button loading={isSubmitting} type="submit">
          {translations.getLabel('SHARED.BUTTONS.CREATE')}
        </Button>
      </div>
    </form>
  );
};

export default CreateProgramForm;
