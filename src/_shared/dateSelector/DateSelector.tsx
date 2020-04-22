import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';

import ErrorMessage from '../errorMessage/ErrorMessage';
import { useInputError } from '../../_hooks';

import 'react-datepicker/dist/react-datepicker.css';
import './dateSelector.scss';

export interface DatePickerProps {
  className?: string;
  errorMessage?: string;
  label: string;
  maxDate?: string;
  minDate?: string;
  name: string;
  onChange: (value: string, name: string) => void;
  showPopperArrow?: boolean;
  value: string;
}

const DateSelector: FC<DatePickerProps> = ({
  className,
  errorMessage,
  label,
  onChange,
  value,
  name,
  showPopperArrow,
  minDate,
  maxDate,
}) => {
  const { showError } = useInputError(errorMessage);
  const selectedDate = new Date(value);

  return (
    <div className={classnames('date-selector', className)}>
      <label className="label" htmlFor={name}>
        <span>{label}</span>
      </label>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        maxDate={new Date(maxDate)}
        minDate={minDate ? new Date(minDate) : new Date()}
        onChange={newDate => {
          onChange(newDate.toISOString(), name);
        }}
        selected={selectedDate}
        showDisabledMonthNavigation
        showPopperArrow={showPopperArrow}
      />
      <ErrorMessage isVisible={showError}>{errorMessage}</ErrorMessage>
    </div>
  );
};

export default DateSelector;
