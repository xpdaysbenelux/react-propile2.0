import React, { FC } from 'react';
import DatePicker from 'react-datepicker';
import classnames from 'classnames';

import ErrorMessage from '../errorMessage/ErrorMessage';
import { useInputError } from '../../_hooks';

import 'react-datepicker/dist/react-datepicker.css';
import './timeSelector.scss';

export interface DatePickerProps {
  className?: string;
  errorMessage?: string;
  label: string;
  name: string;
  onChange: (value: string, name: string) => void;
  showPopperArrow?: boolean;
  timeFormat: string;
  timeIntervals: number;
  value: string;
}

const TimeSelector: FC<DatePickerProps> = ({
  className,
  errorMessage,
  label,
  onChange,
  value,
  name,
  showPopperArrow,
  timeFormat,
  timeIntervals,
}) => {
  const { showError } = useInputError(errorMessage);
  const selectedDate = new Date(value);

  return (
    <div className={classnames('date-time-selector', className)}>
      <label className="label" htmlFor={name}>
        <span>{label}</span>
      </label>
      <DatePicker
        dateFormat={timeFormat}
        onChange={newDate => {
          onChange(newDate.toISOString(), name);
        }}
        selected={selectedDate}
        showPopperArrow={showPopperArrow}
        showTimeSelect
        showTimeSelectOnly
        timeCaption="Time"
        timeIntervals={timeIntervals}
      />
      <ErrorMessage isVisible={showError}>{errorMessage}</ErrorMessage>
    </div>
  );
};

export default TimeSelector;
