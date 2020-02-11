import { useState, useEffect } from 'react';
import { ApiError } from '../_http';
import { translations } from '../_translations';

export type FormValidationErrors<T> = {
  [K in keyof T]?: string;
};

export type SubmitFormFunction<T> = (values: T, setValues: (values: T) => void) => void;

interface Params<T> {
  error?: ApiError;
  initialForm: T;
  submitForm: SubmitFormFunction<T>;
  validateForm: (values: T) => FormValidationErrors<T>;
}

interface Response<T> {
  setAttribute: (value: unknown, name: string) => void;
  submit: (event: React.FormEvent) => void;
  validationErrors: FormValidationErrors<T>;
  values: T;
}

function mapToFormValidationErrors<T>(error: ApiError): FormValidationErrors<T> {
  return Object.keys(error.validationErrors).reduce((acc, key) => {
    let message = translations.getLabel('ERRORS.VALIDATION.INVALID');
    if (error.validationErrors[key].constraints?.isNotEmpty) message = translations.getLabel('ERRORS.VALIDATION.REQUIRED');
    return { ...acc, [key]: message };
  }, {});
}

function useForm<T>(params: Params<T>): Response<T> {
  const { error, initialForm, submitForm, validateForm } = params;
  const [values, setValues] = useState<T>(initialForm);
  const [validationErrors, setValidationErrors] = useState<FormValidationErrors<T>>({});

  const submit = (event: React.FormEvent): void => {
    event.preventDefault();
    const errors = validateForm(values);
    const hasError = Object.keys(errors || {}).some(key => !!errors[key]);
    if (!hasError) {
      submitForm(values, setValues);
    }
    setValidationErrors(errors);
  };

  const setAttribute = (value: unknown, name: string) => setValues({ ...values, [name]: value });

  const clearValues = () => setValues(initialForm);

  // Map server errors to form validation errors
  useEffect(() => {
    if (error?.validationErrors) {
      setValidationErrors(mapToFormValidationErrors(error));
    }
  }, [error]);

  useEffect(() => {
    setValues(initialForm);
    // Clear all if the component unmounts
    return () => {
      clearValues();
      setValidationErrors({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    setAttribute,
    submit,
    validationErrors,
    values,
  };
}

export default useForm;
