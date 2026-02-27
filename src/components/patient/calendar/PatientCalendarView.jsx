import { useMemo, useState } from 'react';
import {
  CalendarDays,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const MAP_EMBED_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.3035304122955!2d121.0897142782518!3d14.701069349176487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397bbba3609fa85%3A0xc366d577a349e1d3!2sZeal%20Community%20Medical%20Mission%20Foundation!5e1!3m2!1sen!2sph!4v1772120826836!5m2!1sen!2sph";

function toDateKey(dateLike) {
  const date = typeof dateLike === 'string' ? new Date(dateLike) : dateLike;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().split('T')[0];
}

function enrichAppointments(appointments) {
  return appointments.map((appointment) => {
    const scheduled = new Date(appointment.date);
    const now = new Date();
    const isPast = scheduled < new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return {
      ...appointment,
      isPast,
      mode: (appointment.mode || 'in-person').toLowerCase()
    };
  });
}

function buildEventsByDate(appointments) {
  return enrichAppointments(appointments).reduce((accumulator, appointment) => {
    const key = toDateKey(appointment.date);
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(appointment);
    return accumulator;
  }, {});
}

function getSearchHighlightDates(eventsByDate, query) {
  if (!query) return new Set();
  const normalized = query.toLowerCase();
  const matches = new Set();

  Object.entries(eventsByDate).forEach(([dateKey, events]) => {
    const hasMatch = events.some((event) => {
      const haystack = [
        event.doctor,
        event.department,
        event.notes,
        event.type
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalized);
    });

    if (hasMatch) {
      matches.add(dateKey);
    }
  });

  return matches;
}

function PatientCalendarView({ appointments, searchValue }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsByDate = useMemo(
    () => buildEventsByDate(appointments || []),
    [appointments]
  );

  const highlightedDates = useMemo(
    () => getSearchHighlightDates(eventsByDate, searchValue),
    [eventsByDate, searchValue]
  );

  const monthLabel = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const leadingDays = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (dateKey) => {
    const events = eventsByDate[dateKey] || [];
    setSelectedEvent(events[0] || null);
  };

  return (
    <>
      <div className="calendar-layout">
        <article className="calendar-main">
          <div className="calendar-main-header">
            <button type="button" onClick={handlePrevMonth} aria-label="Previous month">
              <ChevronLeft size={18} />
            </button>
            <div className="calendar-month-label">
              <CalendarDays size={18} />
              <span>{monthLabel}</span>
            </div>
            <button type="button" onClick={handleNextMonth} aria-label="Next month">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="calendar-legend">
            <div className="legend-item">
              <span className="calendar-dot calendar-dot-upcoming" />
              <span>Upcoming</span>
            </div>
            <div className="legend-item">
              <span className="calendar-dot calendar-dot-past" />
              <span>Past</span>
            </div>
          </div>

          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday) => (
              <div key={weekday} className="calendar-weekday">
                {weekday}
              </div>
            ))}

            {Array.from({ length: leadingDays }).map((_, index) => (
              <div key={`leading-${index}`} className="calendar-cell muted" />
            ))}

            {Array.from({ length: totalDays }).map((_, index) => {
              const day = index + 1;
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const key = toDateKey(date);
              const events = eventsByDate[key] || [];
              const event = events[0];

              const hasUpcoming = events.some((item) => !item.isPast);
              const hasPast = events.some((item) => item.isPast);
              const tone = hasUpcoming ? 'upcoming' : hasPast ? 'past' : null;
              const isHighlighted = highlightedDates.has(key);

              return (
                <button
                  type="button"
                  key={key}
                  className={`calendar-cell minimalist ${tone ? `cell-${tone}` : ''} ${isHighlighted ? 'highlight' : ''}`}
                  onClick={() => handleDateClick(key)}
                  aria-label={event ? `Appointments on ${date.toDateString()}` : date.toDateString()}
                >
                  <span className="day-number">{day}</span>
                </button>
              );
            })}
          </div>
        </article>

        <aside className="calendar-drawer split-sidebar">
          {!selectedEvent && (
            <div className="drawer-empty-card">
              <h3>Selected Date Details</h3>
              <p>Select a date with a color indicator to view appointment specifics.</p>
            </div>
          )}

          {selectedEvent && (
            <div className="drawer-card">
              <h3>Selected Date Details</h3>
              <p className="drawer-date">
                {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <div className="drawer-meta">
                <div className="drawer-meta-row">
                  <span className="drawer-meta-icon">
                    <CalendarDays size={16} />
                  </span>
                  <div>
                    <span className="drawer-label">Doctor</span>
                    <span className="drawer-value">{selectedEvent.doctor}</span>
                  </div>
                </div>
                <div className="drawer-meta-row">
                  <span className="drawer-meta-icon">
                    <Clock size={16} />
                  </span>
                  <div>
                    <span className="drawer-label">Time</span>
                    <span className="drawer-value">{selectedEvent.time}</span>
                  </div>
                </div>
                <div className="drawer-meta-row">
                  <span className="drawer-meta-icon">
                    <CalendarDays size={16} />
                  </span>
                  <div>
                    <span className="drawer-label">Department</span>
                    <span className="drawer-value">{selectedEvent.department}</span>
                  </div>
                </div>
                <div className="drawer-meta-row">
                  <span className="drawer-meta-icon">
                    <MapPin size={16} />
                  </span>
                  <div>
                    <span className="drawer-label">Visit Type</span>
                    <span className="drawer-value">
                      {selectedEvent.mode === 'virtual' ? 'Virtual' : 'In‑Person'}
                    </span>
                  </div>
                </div>
              </div>
              {selectedEvent.notes && (
                <div className="drawer-notes">
                  <span className="drawer-label">Notes</span>
                  <p>{selectedEvent.notes}</p>
                </div>
              )}
              <div className="drawer-map-section">
                <button
                  type="button"
                  className="drawer-map-btn"
                  onClick={() => {
                    window.open(
                      'https://www.google.com/maps/search/?api=1&query=Zeal%20Community%20Medical%20Mission%20Foundation',
                      '_blank',
                      'noopener,noreferrer'
                    );
                  }}
                >
                  <MapPin size={16} />
                  <span>Get Directions</span>
                </button>
                <div className="drawer-map-frame">
                  <iframe
                    title="Zeal Community Medical Mission Foundation Map"
                    src={MAP_EMBED_SRC}
                    width="100%"
                    height="260"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

export default PatientCalendarView;

