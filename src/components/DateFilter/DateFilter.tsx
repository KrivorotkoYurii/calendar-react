import React from 'react';

interface Props {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const DateFilter: React.FC<Props> = ({ selectedDate, onDateChange }) => {
  const handlePreviousMonth = () => {
    const prevMonth = new Date(selectedDate);

    prevMonth.setMonth(selectedDate.getMonth() - 1);
    onDateChange(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(selectedDate);

    nextMonth.setMonth(selectedDate.getMonth() + 1);
    onDateChange(nextMonth);
  };

  return (
    <div className="date-filter">
      <button onClick={handlePreviousMonth}>&lt;</button>
      <span>
        {selectedDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
        })}
      </span>
      <button onClick={handleNextMonth}>&gt;</button>
    </div>
  );
};
