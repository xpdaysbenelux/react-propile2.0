import React, { FC } from 'react';
import classnames from 'classnames';
import { ISessionForm } from '../_models';
import { InputField, Button } from '../../_shared';
import { ApiError } from '../../_http';
import useForm, { SubmitFormFunction, FormValidationErrors } from '../../_hooks/useForm';
import { translations } from '../../_translations';
import ErrorMessage from '../../_shared/errorMessage/ErrorMessage';
import InputTextArea from '../../_shared/inputTextArea/InputTextArea';
import './sessionForm.scss';
import { formValidator } from '../../_utils/formValidation';

interface Props {
  buttons?: JSX.Element | JSX.Element[];
  error?: ApiError;
  initialForm: ISessionForm;
  isSubmitting?: boolean;
  sessionId?: string;
  submitForm: SubmitFormFunction<ISessionForm>;
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'SESSION_TITLE_ALREADY_IN_USE')
    return translations.getLabel(`SESSIONS.ERRORS.SESSION_TITLE_ALREADY_IN_USE`);

  return null;
}

const SessionForm: FC<Props> = ({ sessionId, initialForm, submitForm, isSubmitting, error, buttons }) => {
  function validateForm(values: ISessionForm): FormValidationErrors<ISessionForm> {
    const errors: FormValidationErrors<ISessionForm> = {};
    errors.title = formValidator.isRequired(values.title);
    errors.emailFirstPresenter = formValidator.isEmail(values.emailFirstPresenter);
    if (values.emailSecondPresenter !== '') errors.emailSecondPresenter = formValidator.isEmail(values.emailSecondPresenter);
    errors.description = formValidator.isRequired(values.description);
    errors.xpFactor = formValidator.isBetween(values.xpFactor, 0, 10);

    return errors;
  }

  const form = useForm<ISessionForm>({ error, initialForm, submitForm, validateForm });

  return (
    <form className={classnames('create-session')} onSubmit={form.submit}>
      <div role="group">
        <InputField
          errorMessage={form.validationErrors.title}
          label={translations.getLabel('SESSIONS.TITLE') + '*'}
          name="title"
          onChange={form.setAttribute}
          type="text"
          value={form.values.title}
        />
      </div>
      <div role="group">
        <InputField
          errorMessage={form.validationErrors.subTitle}
          label={translations.getLabel('SESSIONS.SUB_TITLE')}
          name="subTitle"
          onChange={form.setAttribute}
          type="text"
          value={form.values.subTitle}
        />
      </div>
      <div role="group">
        <InputField
          errorMessage={form.validationErrors.emailFirstPresenter}
          label={translations.getLabel('SESSIONS.FIRST_PRESENTER') + '*'}
          name="emailFirstPresenter"
          onChange={form.setAttribute}
          placeholder="Email"
          type="text"
          value={form.values.emailFirstPresenter}
        />
        <InputField
          errorMessage={form.validationErrors.emailSecondPresenter}
          label={translations.getLabel('SESSIONS.SECOND_PRESENTER')}
          name="emailSecondPresenter"
          onChange={form.setAttribute}
          placeholder="Email"
          type="text"
          value={form.values.emailSecondPresenter}
        />
      </div>
      <div role="group">
        <InputTextArea
          errorMessage={form.validationErrors.description}
          label={translations.getLabel('SESSIONS.DESCRIPTION') + '*'}
          name="description"
          onChange={form.setAttribute}
          type="textarea"
          value={form.values.description}
        />
      </div>
      <div className="xp-factor" role="group">
        <InputField
          errorMessage={form.validationErrors.xpFactor}
          label={translations.getLabel('SESSIONS.XP_FACTOR')}
          name="xpFactor"
          onChange={form.setAttribute}
          type="number"
          value={form.values.xpFactor.toString()}
        />
      </div>
      <ErrorMessage isVisible>{errorAsString(error)}</ErrorMessage>
      <div className="actions">
        {buttons}
        <Button loading={isSubmitting} type="submit">
          {translations.getLabel(sessionId ? 'SHARED.BUTTONS.SAVE' : 'SHARED.BUTTONS.CREATE')}
        </Button>
      </div>
    </form>
  );
};

export default SessionForm;
