import { useState } from 'react';

function RescheduleAppointmentModal({ isOpen, appointment, onClose, onSave }) {
  if (!isOpen || !appointment) return null;

  const [date, setDate] = useState(appointment.date);
  const [time, setTime] = useState(appointment.time);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!date || !time) return;
    onSave({ date, time });
  };

  return (
    <div className="reschedule-modal-backdrop" role="dialog" aria-modal="true" aria-label="Reschedule appointment">
      <div className="reschedule-modal">
        <header className="reschedule-modal-header">
          <h2>Reschedule Appointment</h2>
          <button
            type="button"
            className="reschedule-close-btn"
            onClick={onClose}
            aria-label="Close reschedule dialog"
          >
            &times;
          </button>
        </header>
        <form className="reschedule-modal-body" onSubmit={handleSubmit}>
          <p className="reschedule-summary">
            {appointment.department} with {appointment.doctor}
          </p>
          <label htmlFor="reschedule-date">
            New Date
            <input
              id="reschedule-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
          <label htmlFor="reschedule-time">
            New Time
            <input
              id="reschedule-time"
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </label>
          <div className="reschedule-actions">
            <button type="button" className="reschedule-secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="reschedule-primary-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RescheduleAppointmentModal;

