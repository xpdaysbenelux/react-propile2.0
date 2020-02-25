import React, { FC } from 'react';
import { IUpdateSessionForm } from '../_models';
import { ApiError } from '../../_http';
import { useForm } from '../../_hooks';
import { FormValidationErrors, SubmitFormFunction } from '../../_hooks/useForm';

interface Props {
  buttons?: JSX.Element | JSX.Element[];
  error?: ApiError;
  initialForm: IUpdateSessionForm;
  isSubmitting: boolean;
  sessionId: string;
  submitForm: SubmitFormFunction<IUpdateSessionForm>;
}

function errorAsString(error?: ApiError): string {
  return '';
}

const UpdateSessionForm: FC<Props> = ({ sessionId, initialForm, submitForm, isSubmitting, error, buttons }) => {
  function validateForm(values: IUpdateSessionForm): FormValidationErrors<IUpdateSessionForm> {
    const errors: FormValidationErrors<IUpdateSessionForm> = {};

    return errors;
  }

  const form = useForm<IUpdateSessionForm>({ error, initialForm, submitForm, validateForm });

  return <form onSubmit={form.submit}></form>;
};

export default UpdateSessionForm;
