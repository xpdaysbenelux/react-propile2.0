import React, { FC, ChangeEvent } from 'react';
import { Dropdown as SemanticDropdown, InputOnChangeData } from 'semantic-ui-react';
import { useInputError } from '../../_hooks';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './dropdown.scss';

export interface DropdownOption {
  key?: string;
  text: string;
  value: string;
}

interface Props {
  error?: boolean;
  errorMessage?: string;
  label: string;
  multiple?: boolean;
  name: string;
  normalize?: (value: string) => string;
  onChange: (value: string | string[], name: string) => void;
  options: DropdownOption[] | [];
  value: string | string[];
}

const Dropdown: FC<Props> = ({ name, label, normalize, onChange, errorMessage, options, ...props }) => {
  const { showError, setDirty } = useInputError(errorMessage);

  return (
    <div className="dropdown-wrapper">
      <label htmlFor={name}>{label}</label>
      <SemanticDropdown
        error={showError}
        id={name}
        name={name}
        onChange={(_: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
          const normalizedValue = normalize(data?.value);
          onChange(normalizedValue, data?.name);
          setDirty();
        }}
        options={options || []}
        selection
        {...props}
      />
      <ErrorMessage isVisible={showError}>{errorMessage}</ErrorMessage>
    </div>
  );
};

Dropdown.defaultProps = {
  normalize: (value: string) => value,
};

export default Dropdown;
