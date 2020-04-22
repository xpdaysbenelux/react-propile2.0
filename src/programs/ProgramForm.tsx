import React, { FC } from 'react';
import classnames from 'classnames';

import { ApiError } from '../_http';
import { IConference } from '../conferences/_models';
import useForm, { SubmitFormFunction, FormValidationErrors } from '../_hooks/useForm';
import { formValidator } from '../_utils/formValidation';
import { InputField, Button, DateSelector, TimeSelector } from '../_shared';
import ErrorMessage from '../_shared/errorMessage/ErrorMessage';
import { translations } from '../_translations';
import { IProgramForm, programTimeIntervals } from './_models';
import './programForm.scss';

interface Props {
  buttons?: JSX.Element | JSX.Element[];
  conference: IConference;
  error?: ApiError;
  initialForm: IProgramForm;
  isSubmitting: boolean;
  programId?: string;
  submitForm: SubmitFormFunction<IProgramForm>;
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

const ProgramForm: FC<Props> = ({ programId, initialForm, submitForm, isSubmitting, error, buttons, conference }) => {
  function validateForm(values: IProgramForm): FormValidationErrors<IProgramForm> {
    const errors: FormValidationErrors<IProgramForm> = {};
    errors.title = formValidator.isRequired(values.title);

    return errors;
  }

  const form = useForm<IProgramForm>({ error, initialForm, submitForm, validateForm });

  return (
    <form className={classnames('create-program', 'ui', 'form')} onSubmit={form.submit}>
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
          dateFormat="dd/MM/yyyy"
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
          timeIntervals={programTimeIntervals}
          value={form.values.startTime}
        />
        <TimeSelector
          label={translations.getLabel('PROGRAMS.END_TIME')}
          name="endTime"
          onChange={form.setAttribute}
          timeFormat="h:mm aa"
          timeIntervals={programTimeIntervals}
          value={form.values.endTime}
        />
      </div>
      {error && <ErrorMessage isVisible>{errorAsString(error)}</ErrorMessage>}
      <div className="actions">
        {buttons}
        <Button loading={isSubmitting} type="submit">
          {translations.getLabel(programId ? 'SHARED.BUTTONS.SAVE' : 'SHARED.BUTTONS.CREATE')}
        </Button>
      </div>
    </form>
  );
};

export default ProgramForm;
