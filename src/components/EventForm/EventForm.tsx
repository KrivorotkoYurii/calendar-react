import React, { useState } from 'react';
import { Event } from '../../types/Event';

interface Props {
  event: Event | null;
  onSave: (event: Event) => void;
  onDelete: (id: number) => void;
  onClose: () => void;
}

export const EventForm: React.FC<Props> = ({
  event,
  onSave,
  onDelete,
  onClose,
}) => {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [date, setDate] = useState(event?.date || '');
  const [time, setTime] = useState(event?.time || '');

  const isFormValid = title && date;

  const handleSave = () => {
    if (isFormValid) {
      onSave({ title, description, date, time, id: event?.id || Date.now() });
    }
  };

  return (
    <div className="modal">
      <div className="form">
        <button onClick={onClose} className="close-button">
          ×
        </button>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title (required)"
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
        <button onClick={handleSave} disabled={!isFormValid}>
          Save
        </button>
        {event && <button onClick={() => onDelete(event.id)}>Delete</button>}
      </div>
    </div>
  );
};
