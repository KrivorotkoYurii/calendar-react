import React from 'react';
import classNames from 'classnames';
import { Event } from '../../types/Event';

interface Props {
  day: Date;
  events: Event[];
  onDayClick: () => void;
  onEventClick: (event: Event) => void;
}

export const DayCell: React.FC<Props> = ({
  day,
  events,
  onDayClick,
  onEventClick,
}) => {
  const isToday = new Date().toDateString() === day.toDateString();

  return (
    <div
      className={classNames('day-cell', { today: isToday })}
      onClick={() => onDayClick()}
    >
      <div className="day-header">
        {day.getDate()} ({day.toLocaleDateString('en-US', { weekday: 'short' })}
        )
      </div>
      <ul className="event-list">
        {events.map(event => (
          <li
            key={event.id}
            onClick={e => {
              e.stopPropagation();
              onEventClick(event);
            }}
          >
            {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
