import React, { FC } from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

import { IUpdateSessionForm, SessionTopic, SessionType, SessionState, SessionDuration, SessionExpierenceLevel } from '../_models';
import { roomMaxParticipants } from '../../conferences/_models';
import { InputField, InputTextArea, Dropdown, Toggle, Button } from '../../_shared';
import { ApiError } from '../../_http';
import { useForm } from '../../_hooks';
import { FormValidationErrors, SubmitFormFunction } from '../../_hooks/useForm';
import { translations } from '../../_translations';
import { hasSessionsAdminPermissions } from '../../profile/_utils';
import { profileSelectors } from '../../_store/selectors';
import { formValidator } from '../../_utils/formValidation';
import ErrorMessage from '../../_shared/errorMessage/ErrorMessage';
import './editSessionForm.scss';

interface Props {
  buttons?: JSX.Element | JSX.Element[];
  error?: ApiError;
  initialForm: IUpdateSessionForm;
  isSubmitting: boolean;
  sessionId: string;
  submitForm: SubmitFormFunction<IUpdateSessionForm>;
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'SESSION_NOT_FOUND') return translations.getLabel(`SESSIONS.ERRORS.SESSION_NOT_FOUND`);
  if (error?.error === 'SESSION_TITLE_ALREADY_IN_USE')
    return translations.getLabel(`SESSIONS.ERRORS.SESSION_TITLE_ALREADY_IN_USE`);
  if (error?.error === 'SESSION_PRESENTERS_EMAILS_MUST_DIFFER')
    return translations.getLabel('SESSIONS.ERRORS.SESSION_PRESENTERS_EMAILS_MUST_DIFFER');
  if (error?.error === 'SESSION_EDIT_NOT_ALLOWED') return translations.getLabel(`SESSIONS.ERRORS.SESSION_EDIT_NOT_ALLOWED`);
  return null;
}

const UpdateSessionForm: FC<Props> = ({ sessionId, initialForm, submitForm, isSubmitting, error, buttons }) => {
  const permissions = useSelector(profileSelectors.permissions);

  function validateForm(values: IUpdateSessionForm): FormValidationErrors<IUpdateSessionForm> {
    const errors: FormValidationErrors<IUpdateSessionForm> = {};
    errors.title = formValidator.isRequired(values.title);
    errors.emailFirstPresenter = formValidator.isEmail(values.emailFirstPresenter);
    if (values.emailSecondPresenter !== '') errors.emailSecondPresenter = formValidator.isEmail(values.emailSecondPresenter);
    errors.description = formValidator.isRequired(values.description);
    errors.xpFactor = formValidator.isBetween(values.xpFactor, 0, 10, 'Xp factor');
    errors.maxParticipants = formValidator.isBetween(values.maxParticipants, 1, roomMaxParticipants, 'amount of participants');

    return errors;
  }

  const form = useForm<IUpdateSessionForm>({ error, initialForm, submitForm, validateForm });

  const renderDescriptivefields = () => (
    <>
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
      {hasSessionsAdminPermissions(permissions) && (
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
      )}
      <div role="group">
        <InputTextArea
          errorMessage={form.validationErrors.shortDescription}
          label={translations.getLabel('SESSIONS.SHORT_DESCRIPTION')}
          name="shortDescription"
          onChange={form.setAttribute}
          rows={2}
          type="textarea"
          value={form.values.shortDescription}
        />
      </div>
      <div role="group">
        <InputTextArea
          errorMessage={form.validationErrors.description}
          label={translations.getLabel('SESSIONS.DESCRIPTION') + '*'}
          name="description"
          onChange={form.setAttribute}
          rows={5}
          type="textarea"
          value={form.values.description}
        />
      </div>
      <div role="group">
        <InputTextArea
          errorMessage={form.validationErrors.goal}
          label={translations.getLabel('SESSIONS.GOAL')}
          name="goal"
          onChange={form.setAttribute}
          rows={2}
          type="textarea"
          value={form.values.goal}
        />
      </div>
      <div className="last-of-partial-form" role="group">
        <InputField
          errorMessage={form.validationErrors.xpFactor}
          label={translations.getLabel('SESSIONS.XP_FACTOR')}
          name="xpFactor"
          onChange={form.setAttribute}
          type="number"
          value={form.values.xpFactor.toString()}
        />
        {hasSessionsAdminPermissions(permissions) && (
          <Dropdown
            errorMessage={form.validationErrors.sessionState}
            label={translations.getLabel('SESSIONS.STATE')}
            name="sessionState"
            onChange={form.setAttribute}
            options={Object.values(SessionState).map(value => ({
              key: value,
              text: translations.getLabel(`SESSIONS.ENUMS.STATE.${value}`),
              value,
            }))}
            value={form.values.sessionState}
          />
        )}
      </div>
    </>
  );

  const renderLimitationFields = () => (
    <>
      <div role="group">
        <Dropdown
          errorMessage={form.validationErrors.type}
          label={translations.getLabel('SESSIONS.TYPE')}
          name="type"
          onChange={form.setAttribute}
          options={Object.values(SessionType).map(value => ({
            key: value,
            text: translations.getLabel(`SESSIONS.ENUMS.TYPE.${value}`),
            value,
          }))}
          value={form.values.type}
        />
        <Dropdown
          errorMessage={form.validationErrors.topic}
          label={translations.getLabel('SESSIONS.TOPIC')}
          name="topic"
          onChange={form.setAttribute}
          options={Object.values(SessionTopic).map(value => ({
            key: value,
            text: translations.getLabel(`SESSIONS.ENUMS.TOPIC.${value}`),
            value,
          }))}
          value={form.values.topic}
        />
      </div>
      <div role="group">
        <Dropdown
          errorMessage={form.validationErrors.duration}
          label={translations.getLabel('SESSIONS.DURATION')}
          name="duration"
          onChange={form.setAttribute}
          options={Object.values(SessionDuration).map(value => ({
            key: value,
            text: translations.getLabel(`SESSIONS.ENUMS.DURATION.${value}`),
            value,
          }))}
          value={form.values.duration}
        />
        <InputField
          errorMessage={form.validationErrors.maxParticipants}
          label={translations.getLabel('SESSIONS.MAX_PARTICIPANTS')}
          name="maxParticipants"
          onChange={form.setAttribute}
          type="number"
          value={form.values.maxParticipants.toString()}
        />
      </div>
      <div role="group">
        <Dropdown
          errorMessage={form.validationErrors.expierenceLevel}
          label={translations.getLabel('SESSIONS.EXPERIENCE_LEVEL')}
          name="expierenceLevel"
          onChange={form.setAttribute}
          options={Object.values(SessionExpierenceLevel).map(value => ({
            key: value,
            text: translations.getLabel(`SESSIONS.ENUMS.EXPERIENCE_LEVEL.${value}`),
            value,
          }))}
          value={form.values.expierenceLevel}
        />
        <Toggle
          label={translations.getLabel('SESSIONS.LAPTOPS_REQUIRED')}
          leftValue="No"
          name="laptopsRequired"
          onChange={form.setAttribute}
          rightValue="Yes"
          value={form.values.laptopsRequired}
        />
      </div>
      <div role="group">
        <InputTextArea
          errorMessage={form.validationErrors.neededMaterials}
          label={translations.getLabel('SESSIONS.NEEDED_MATERIALS')}
          name="neededMaterials"
          onChange={form.setAttribute}
          rows={2}
          type="textarea"
          value={form.values.neededMaterials}
        />
      </div>
      <div role="group">
        <InputTextArea
          errorMessage={form.validationErrors.roomSetup}
          label={translations.getLabel('SESSIONS.ROOM_SETUP')}
          name="roomSetup"
          onChange={form.setAttribute}
          rows={2}
          type="textarea"
          value={form.values.roomSetup}
        />
      </div>
      <div className="last-of-partial-form" role="group">
        <InputTextArea
          errorMessage={form.validationErrors.otherLimitations}
          label={translations.getLabel('SESSIONS.OTHER_LIMITATIONS')}
          name="otherLimitations"
          onChange={form.setAttribute}
          rows={2}
          type="textarea"
          value={form.values.otherLimitations}
        />
      </div>
    </>
  );

  const renderMaterialFields = () => (
    <>
      <div role="group">
        <InputTextArea
          errorMessage={form.validationErrors.outline}
          label={translations.getLabel('SESSIONS.OUTLINE')}
          name="outline"
          onChange={form.setAttribute}
          rows={4}
          type="textarea"
          value={form.values.outline}
        />
      </div>
      <div role="group">
        <InputTextArea
          errorMessage={form.validationErrors.materialDescription}
          label={translations.getLabel('SESSIONS.MATERIAL_DESCRIPTION')}
          name="materialDescription"
          onChange={form.setAttribute}
          rows={1}
          type="textarea"
          value={form.values.materialDescription}
        />
      </div>
      <div role="group">
        <InputTextArea
          errorMessage={form.validationErrors.materialUrl}
          label={translations.getLabel('SESSIONS.MATERIAL_URL')}
          name="materialUrl"
          onChange={form.setAttribute}
          rows={1}
          type="textarea"
          value={form.values.materialUrl}
        />
      </div>
    </>
  );

  return (
    <form className={classnames('update-session', 'ui', 'form')} onSubmit={form.submit}>
      {renderDescriptivefields()}
      {renderLimitationFields()}
      {renderMaterialFields()}
      {error ? <ErrorMessage isVisible>{errorAsString(error)}</ErrorMessage> : null}
      <div className="actions">
        {buttons}
        <Button loading={isSubmitting} type="submit">
          {translations.getLabel(sessionId ? 'SHARED.BUTTONS.SAVE' : 'SHARED.BUTTONS.CREATE')}
        </Button>
      </div>
    </form>
  );
};

export default UpdateSessionForm;
