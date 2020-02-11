import React from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { translations } from '../../_translations';
import { InputField, Button } from '../../_shared';
import { useForm } from '../../_hooks';
import { authSelectors } from '../../_store/selectors';
import { authActions } from '../../_store/actions';
import ErrorMessage from '../../_shared/errorMessage/ErrorMessage';
import { FormValidationErrors } from '../../_hooks/useForm';
import { ApiError, HttpStatus } from '../../_http';
import { formValidator } from '../../_utils/formValidation';
import { ILoginForm } from '../_models';
import './login.scss';

const initialForm: ILoginForm = {
  password: '',
  username: '',
};

function validateForm(values: ILoginForm): FormValidationErrors<ILoginForm> {
  return {
    password: formValidator.isRequired(values.password),
    username: formValidator.isEmail(values.username),
  };
}

function errorAsString(error?: ApiError): string {
  if (error?.statusCode === HttpStatus.Unauthorized) return translations.getLabel(`AUTH.ERRORS.UNAUTHORIZED`);
  if (error?.error === 'USER_STATE_NOT_ALLOWED') return translations.getLabel(`AUTH.ERRORS.USER_STATE_NOT_ALLOWED`);
  return null;
}

const Login = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const isSubmitting = useSelector(authSelectors.isLoginLoading);
  const error = useSelector(authSelectors.errorLogin);
  const form = useForm<ILoginForm>({
    error,
    initialForm,
    submitForm: values => dispatch(new authActions.Login({ pathname: state?.pathname, values })),
    validateForm,
  });

  return (
    <Container as="main" className="login">
      <h1>{translations.getLabel('AUTH.LOGIN.TITLE')}</h1>
      <form onSubmit={form.submit}>
        <InputField
          autoComplete="username"
          errorMessage={form.validationErrors.username}
          label={translations.getLabel('AUTH.LOGIN.USERNAME')}
          name="username"
          onChange={form.setAttribute}
          type="email"
          value={form.values.username}
        />
        <InputField
          autoComplete="current-password"
          errorMessage={form.validationErrors.password}
          label={translations.getLabel('AUTH.LOGIN.PASSWORD')}
          name="password"
          onChange={form.setAttribute}
          type="password"
          value={form.values.password}
        />
        <ErrorMessage isVisible>{errorAsString(error)}</ErrorMessage>
        <div className="actions">
          <Link to="/auth/request-password-reset">{translations.getLabel('AUTH.LOGIN.FORGOT_PASSWORD')}</Link>
          <Button loading={isSubmitting} primary type="submit">
            {translations.getLabel('AUTH.LOGIN.LOGIN')}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
