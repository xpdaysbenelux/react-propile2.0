import React, { FormEvent, FC } from 'react';
import { Checkbox, CheckboxProps } from 'semantic-ui-react';
import { translations } from '../../_translations';
import ErrorMessage from '../../_shared/errorMessage/ErrorMessage';
import { Button, InputField } from '../../_shared';
import { useForm } from '../../_hooks';
import { IRoleForm } from '../_models';
import { setInObject } from '../../_utils/objectHelpers';
import './roleForm.scss';
import { FormValidationErrors, SubmitFormFunction } from '../../_hooks/useForm';
import { formValidator } from '../../_utils/formValidation';
import { ApiError } from '../../_http';

interface Props {
  buttons?: JSX.Element | JSX.Element[];
  error?: ApiError;
  initialForm: IRoleForm;
  isSubmitting?: boolean;
  roleId?: string;
  submitForm: SubmitFormFunction<IRoleForm>;
}

function validateForm(values: IRoleForm): FormValidationErrors<IRoleForm> {
  return {
    name: formValidator.isRequired(values.name),
  };
}

function errorAsString(error?: ApiError): string {
  if (error?.error === 'ROLE_IN_USE') return translations.getLabel(`ROLES.ERRORS.ROLE_IN_USE`);
  if (error?.error === 'ROLE_NAME_ALREADY_IN_USE') return translations.getLabel(`ROLES.ERRORS.ROLE_NAME_ALREADY_IN_USE`);
  if (error?.error === 'PERMISSION_DENIED') return translations.getLabel(`ERRORS.PERMISSION_DENIED`);
  return null;
}

const RoleForm: FC<Props> = ({ roleId, initialForm, submitForm, isSubmitting, error, buttons }) => {
  const form = useForm<IRoleForm>({ error, initialForm, submitForm, validateForm });

  const setPermission = (_: FormEvent, data: CheckboxProps) =>
    form.setAttribute(setInObject(form.values.permissions, data.name, data.checked), 'permissions');

  return (
    <form onSubmit={form.submit}>
      <div role="group">
        <InputField
          errorMessage={form.validationErrors.name}
          label={translations.getLabel('ROLES.NAME')}
          name="name"
          onChange={form.setAttribute}
          type="text"
          value={form.values.name}
        />
        <div />
      </div>
      <div className="permissions">
        <h3>{translations.getLabel('ROLES.PERMISSIONS.TITLE')}</h3>
        {Object.keys(form.values.permissions).map(permission => (
          <fieldset key={permission}>
            <legend>{translations.getLabel(`ROLES.PERMISSIONS.FEATURES.${permission.toUpperCase()}`)}</legend>
            <div>
              {Object.keys(form.values.permissions[permission]).map(option => {
                const optionName = `${permission}.${option}`;
                return (
                  <Checkbox
                    checked={form.values.permissions[permission][option]}
                    id={optionName}
                    key={optionName}
                    label={translations.getLabel(`ROLES.PERMISSIONS.RIGHTS.${option.toUpperCase()}`)}
                    name={optionName}
                    onChange={setPermission}
                  />
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <ErrorMessage isVisible>{errorAsString(error)}</ErrorMessage>
      <div className="actions">
        {buttons}
        <Button loading={isSubmitting} primary type="submit">
          {translations.getLabel(roleId ? 'SHARED.BUTTONS.SAVE' : 'SHARED.BUTTONS.CREATE')}
        </Button>
      </div>
    </form>
  );
};

export default RoleForm;
