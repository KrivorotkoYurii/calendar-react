import React from 'react';
import { DayCell } from '../DayCell';
import { getMonthDays } from '../../utils/dateUtils';
import { Event } from '../../types/Event';

interface Props {
  month: Date;
  events: Event[];
  onDayClick: () => void;
  onEventClick: (event: Event) => void;
}

export const CalendarGrid: React.FC<Props> = ({
  month,
  events,
  onDayClick,
  onEventClick,
}) => {
  const days = getMonthDays(month);

  return (
    <div className="calendar-grid">
      {days.map(day => (
        <DayCell
          key={day.toISOString()}
          day={day}
          events={events.filter(
            event => new Date(event.date).toDateString() === day.toDateString(),
          )}
          onDayClick={onDayClick}
          onEventClick={onEventClick}
        />
      ))}
    </div>
  );
};
