import React, { FC } from 'react';
import { TextArea } from 'semantic-ui-react';
import classnames from 'classnames';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useInputError } from '../../_hooks';
import './inputTextArea.scss';

export interface TextAreaProps {
  autoComplete?: string;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
  fluid?: boolean;
  icon?: string;
  label?: string;
  labelIcon?: string;
  name?: string;
  normalize?: (value: string) => string;
  onChange?: (value: string, name: string) => void;
  placeholder?: string;
  type?: string;
  value?: string;
}

const InputTextArea: FC<TextAreaProps> = ({
  autoComplete,
  autoFocus,
  className,
  label,
  errorMessage,
  onChange,
  normalize,
  ...props
}) => {
  const inputWrapperRef = React.createRef<HTMLDivElement>();
  const { showError, setDirty } = useInputError(errorMessage);

  return (
    <div className={classnames('input-wrapper', className)} ref={inputWrapperRef}>
      {!!label && (
        <label htmlFor={props.name}>
          <span>{label}</span>
        </label>
      )}
      <TextArea
        {...props}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        id={props?.name}
        onChange={(_, data) => {
          const normalizedValue = normalize(data?.value.toString());
          onChange(normalizedValue, data?.name);
          setDirty();
        }}
        rows={3}
      />
      <ErrorMessage isVisible={showError}>{errorMessage}</ErrorMessage>
    </div>
  );
};

InputTextArea.defaultProps = {
  className: '',
  normalize: (value: string) => value,
};

export default InputTextArea;
