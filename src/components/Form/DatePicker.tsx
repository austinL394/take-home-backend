import classNames from 'classnames';
import { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import CalendarIcon from '../../assets/icons/calendar.svg?react';
import { formatDate } from '../../utils/datetime';

const options = {
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  minDate: new Date('1900-01-01'),
};

interface DateInputProps {
  customStyles?: string;
  placeholder?: string;
  value: Date | null;
  onChange?: (_: Date) => void;
  showIcon?: boolean;
}

const DatePickerComponent = ({ customStyles, placeholder, value, showIcon = true, onChange }: DateInputProps) => {
  const [show, setShow] = useState<boolean>(false);

  const handleChange = (_selectedDate: Date) => {
    if (onChange) onChange(_selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div className="w-full relative">
      <input
        className={`${customStyles} relative min-w-[90px] h-[33px] items-center pt-2 text-left pl-2 bg-gray-50 text-gray-900 rounded-[10px] focus:ring-blue-500 focus:border-blue-500 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
        onClick={() => setShow(true)}
        value={formatDate(value || undefined)}
        onChange={() => {}}
        placeholder={placeholder}
      />
      {showIcon && (
        <div className="absolute inset-y-0 end-[9px] flex items-center ps-3.5 pointer-events-none">
          <CalendarIcon />
        </div>
      )}
      <Datepicker
        classNames={classNames('w-0 h-0 overflow-hidden', { hidden: !show })}
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
};

export default DatePickerComponent;
