import React, { FC } from 'react';
import DatePicker from 'react-datepicker';

import classnames from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';
import './dateSelector.scss';

export interface DatePickerProps {
  className?: string;
  label: string;
  name: string;
  onChange: (value: string, name: string) => void;
  showPopperArrow?: boolean;
  value: string;
}

const DateSelector: FC<DatePickerProps> = ({ className, label, onChange, value, name, showPopperArrow }) => {
  const inputWrapperRef = React.createRef<HTMLDivElement>();
  const selectedDate = new Date(value);

  return (
    <div className={classnames('date-selector', className)} ref={inputWrapperRef}>
      <label className="label" htmlFor={name}>
        <span>{label}</span>
      </label>
      <DatePicker
        minDate={new Date()}
        onChange={newDate => {
          onChange(newDate.toISOString(), name);
        }}
        selected={selectedDate}
        showDisabledMonthNavigation
        showPopperArrow={showPopperArrow}
      />
    </div>
  );
};

export default DateSelector;
