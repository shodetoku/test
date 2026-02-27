import { useMemo, useState } from 'react';

function NextAppointmentCard({ appointment, onNavigate }) {
  const [showMeetingModal, setShowMeetingModal] = useState(false);

  const {
    label,
    metaLine,
    statusLabel,
    statusTone,
    mode,
    primaryCtaLabel
  } = useMemo(() => {
    if (!appointment) {
      return {
        label: 'No upcoming appointments',
        metaLine: 'Book your next consultation to keep your care on track.',
        statusLabel: null,
        statusTone: null,
        mode: null,
        primaryCtaLabel: 'Book Appointment'
      };
    }

    const { date, time, doctor, department, status, mode: appointmentMode } = appointment;
    const isVirtual = (appointmentMode || '').toLowerCase() === 'virtual';

    const labelText = `${date} · ${time}`;
    const meta = `${doctor} · ${department}`;

    const now = new Date();
    const scheduled = new Date(`${date} ${time}`);
    const diffMinutes = (scheduled - now) / (1000 * 60);

    let statusText = 'Confirmed';
    let tone = 'confirmed';

    if (status === 'completed') {
      statusText = 'Completed';
      tone = 'muted';
    } else if (diffMinutes > 0 && diffMinutes <= 30) {
      statusText = 'Starting Soon';
      tone = 'soon';
    }

    return {
      label: labelText,
      metaLine: meta,
      statusLabel: statusText,
      statusTone: tone,
      mode: isVirtual ? 'virtual' : 'in-person',
      primaryCtaLabel: isVirtual ? 'Join Room' : 'Get Directions'
    };
  }, [appointment]);

  const handlePrimaryAction = () => {
    if (!appointment) {
      onNavigate('book-appointment');
      return;
    }

    if (mode === 'virtual') {
      setShowMeetingModal(true);
      return;
    }

    const query = encodeURIComponent(`ZCMMF Clinic ${appointment?.department || ''}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  const handleReschedule = () => {
    onNavigate('appointments');
  };

  return (
    <>
      <div className="next-appointment-card">
        <div className="next-appointment-header">
          <span className="summary-label">Next Appointment</span>
          {mode && (
            <span className={`next-appointment-mode ${mode === 'virtual' ? 'mode-virtual' : 'mode-inperson'}`}>
              {mode === 'virtual' ? 'Virtual Visit' : 'In‑Person Visit'}
            </span>
          )}
        </div>

        <strong className="next-appointment-primary">
          {label}
        </strong>

        <span className="summary-meta next-appointment-meta">
          {metaLine}
        </span>

        <div className="next-appointment-footer">
          <div className="next-appointment-status">
            {statusLabel && (
              <span className={`next-appointment-badge badge-${statusTone}`}>
                {statusLabel}
              </span>
            )}
            <button
              type="button"
              className="next-appointment-reschedule"
              onClick={handleReschedule}
            >
              Reschedule
            </button>
          </div>

          <div className="next-appointment-actions">
            <button
              type="button"
              className={`next-appointment-cta ${mode === 'virtual' ? 'cta-primary' : 'cta-outline'}`}
              onClick={handlePrimaryAction}
            >
              {mode === 'virtual' && (
                <span className="cta-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M15 10.5V8a2 2 0 0 0-2-2H5.5A1.5 1.5 0 0 0 4 7.5v9A1.5 1.5 0 0 0 5.5 18H13a2 2 0 0 0 2-2v-2.5l3.2 2.13A1 1 0 0 0 20 14.8v-4.6a1 1 0 0 0-1.8-.63Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              )}
              {mode === 'in-person' && (
                <span className="cta-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 21s7-5.33 7-11a7 7 0 1 0-14 0c0 5.67 7 11 7 11Zm0-9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              )}
              <span>{primaryCtaLabel}</span>
            </button>
          </div>
        </div>
      </div>

      {showMeetingModal && (
        <div
          className="meeting-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Virtual visit meeting details"
        >
          <div className="meeting-modal">
            <header className="meeting-modal-header">
              <h3>Join Virtual Room</h3>
              <button
                type="button"
                className="meeting-close-btn"
                onClick={() => setShowMeetingModal(false)}
                aria-label="Close meeting details"
              >
                &times;
              </button>
            </header>
            <div className="meeting-modal-body">
              <p>Your secure virtual consultation room is ready.</p>
              <div className="meeting-meta">
                <div>
                  <span className="meeting-label">Scheduled for</span>
                  <span className="meeting-value">
                    {appointment?.date} · {appointment?.time}
                  </span>
                </div>
                <div>
                  <span className="meeting-label">With</span>
                  <span className="meeting-value">
                    {appointment?.doctor}
                  </span>
                </div>
              </div>
              <div className="meeting-actions">
                <button
                  type="button"
                  className="meeting-primary-btn"
                  onClick={() => setShowMeetingModal(false)}
                >
                  Join via Browser
                </button>
                <button
                  type="button"
                  className="meeting-secondary-btn"
                  onClick={() => setShowMeetingModal(false)}
                >
                  Copy Invite Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NextAppointmentCard;

