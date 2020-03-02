import React, { FC, ChangeEvent } from 'react';
import { Radio, CheckboxProps } from 'semantic-ui-react';
import classnames from 'classnames';
import './toggle.scss';

export interface ToggleProps {
  className?: string;
  disabled?: boolean;
  label: string;
  name: string;
  onChange: (value: boolean, name: string) => void;
  value: boolean;
}

const Toggle: FC<ToggleProps> = ({ className, label, onChange, value, ...props }) => {
  const inputWrapperRef = React.createRef<HTMLDivElement>();

  return (
    <div className={classnames('toggle-wrapper', className)} ref={inputWrapperRef}>
      <label className="label" htmlFor={props.name}>
        <span>{label}</span>
      </label>
      <div className="toggle-input">
        <span>No</span>
        <Radio
          {...props}
          checked={value}
          onChange={(_: ChangeEvent<HTMLInputElement>, data: CheckboxProps) => {
            onChange(data.checked, data.name);
          }}
          toggle
        />
        <span>Yes</span>
      </div>
    </div>
  );
};

export default Toggle;
