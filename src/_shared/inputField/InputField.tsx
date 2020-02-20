import React, { FC, ChangeEvent } from 'react';
import { Input, InputOnChangeData } from 'semantic-ui-react';
import classnames from 'classnames';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Icon from '../icon/Icon';
import { useInputError } from '../../_hooks';
import './inputField.scss';

export interface InputFieldProps {
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

const InputField: FC<InputFieldProps> = ({
  autoComplete,
  autoFocus,
  className,
  label,
  labelIcon,
  errorMessage,
  onChange,
  normalize,
  icon,
  ...props
}) => {
  const inputWrapperRef = React.createRef<HTMLDivElement>();
  const { showError, setDirty } = useInputError(errorMessage);

  return (
    <div className={classnames('input-wrapper', className)} ref={inputWrapperRef}>
      {!!label && (
        <label htmlFor={props.name}>
          {!!labelIcon && <Icon name={labelIcon} />}
          <span>{label}</span>
        </label>
      )}
      <Input
        {...props}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        error={showError}
        icon={icon}
        id={props?.name}
        onChange={(_: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
          const normalizedValue = normalize(data?.value);
          onChange(normalizedValue, data?.name);
          setDirty();
        }}
      />
      <ErrorMessage isVisible={showError}>{errorMessage}</ErrorMessage>
    </div>
  );
};

InputField.defaultProps = {
  className: '',
  normalize: (value: string) => value,
};

export default InputField;
