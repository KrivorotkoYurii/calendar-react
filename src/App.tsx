import React, { useState } from 'react';
import { CalendarGrid } from './components/CalendarGrid';
import { DateFilter } from './components/DateFilter';
import { EventForm } from './components/EventForm';
import { useLocalStarage } from './hooks/useLocalStarage';
import { Event } from './types/Event';

export const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [events, setEvents] = useLocalStarage<Event[]>('events', []);

  const handleSaveEvent = (newEvent: Event) => {
    if (editingEvent) {
      setEvents(events.map(e => (e.id === editingEvent.id ? newEvent : e)));
    } else {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
    }

    setEditingEvent(null);
    setIsFormOpen(false);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const onEventClick = (event: Event) => {
    setIsFormOpen(true);
    setEditingEvent(event);
  };

  const handleDayClick = () => {
    setIsFormOpen(true);
    setEditingEvent(null);
  };

  return (
    <div>
      <DateFilter selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <button onClick={() => setIsFormOpen(true)}>+ Add Event</button>
      <CalendarGrid
        month={selectedDate}
        events={events}
        onDayClick={handleDayClick}
        onEventClick={onEventClick}
      />
      {isFormOpen && (
        <EventForm
          event={editingEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};
