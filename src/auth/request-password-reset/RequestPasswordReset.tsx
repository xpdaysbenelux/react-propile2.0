import React from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputField } from '../../_shared';
import { useForm } from '../../_hooks';
import { translations } from '../../_translations';
import { authActions } from '../../_store/actions';
import { authSelectors } from '../../_store/selectors';
import { FormValidationErrors } from '../../_hooks/useForm';
import { formValidator } from '../../_utils/formValidation';
import { IRequestPasswordResetForm } from '../_models';
import './requestPasswordReset.scss';

const initialForm: IRequestPasswordResetForm = {
  email: '',
};

function validateForm(values: IRequestPasswordResetForm): FormValidationErrors<IRequestPasswordResetForm> {
  return {
    email: formValidator.isEmail(values.email),
  };
}

const RequestPasswordReset = () => {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(authSelectors.isRequestPasswordResetLoading);
  const form = useForm<IRequestPasswordResetForm>({
    initialForm,
    submitForm: values => dispatch(new authActions.RequestPasswordReset({ values })),
    validateForm,
  });

  return (
    <Container as="main" className="request-password-reset">
      <h1>{translations.getLabel('AUTH.REQUEST_PASSWORD_RESET.TITLE')}</h1>
      <p>{translations.getLabel('AUTH.REQUEST_PASSWORD_RESET.DESCRIPTION')}</p>
      <form onSubmit={form.submit}>
        <InputField
          autoComplete="email"
          errorMessage={form.validationErrors.email}
          name="email"
          onChange={form.setAttribute}
          type="email"
          value={form.values.email}
        />
        <div className="actions">
          <Button loading={isSubmitting} primary type="submit">
            {translations.getLabel('AUTH.REQUEST_PASSWORD_RESET.RESET')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default RequestPasswordReset;
