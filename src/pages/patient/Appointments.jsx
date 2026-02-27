import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../services/AuthService';
import BackToDashboardBar from '../../components/patient/navigation/BackToDashboardBar';
import { getFromStorage, saveToStorage } from '../../services/StorageService';
import { mockAppointments } from '../../utils/SampleData';
import RescheduleAppointmentModal from '../../components/patient/appointments/RescheduleAppointmentModal';
import '../../assets/styles/Appointments.css';

function Appointments({ onNavigate }) {
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isBooking, setIsBooking] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const user = getCurrentUser();

  useEffect(() => {
    const storedAppointments = getFromStorage('appointments') || mockAppointments;
    setAppointments(storedAppointments);
  }, []);

  if (!user) {
    return (
      <div className="appointments">
        <div className="appointments-container">
          <div className="not-logged-in">
            <h2>Please log in to view your appointments</h2>
            <button className="btn-login-redirect" onClick={() => onNavigate('login')}>
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredAppointments = filterStatus === 'all'
    ? appointments
    : appointments.filter((apt) => apt.status === filterStatus);

  const sortedAppointments = [...filteredAppointments].sort((a, b) => (
    new Date(b.date) - new Date(a.date)
  ));

  const handleBookAppointment = () => {
    setIsBooking(true);
    setTimeout(() => {
      onNavigate('book-appointment');
      setIsBooking(false);
    }, 250);
  };

  const updateAppointments = (updater) => {
    setAppointments((current) => {
      const next = updater(current);
      saveToStorage('appointments', next);
      return next;
    });
  };

  const handleCancel = (appointmentId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this appointment?');
    if (!confirmed) return;

    updateAppointments((current) => current.map((appointment) => (
      appointment.id === appointmentId
        ? { ...appointment, status: 'cancelled' }
        : appointment
    )));
  };

  const openReschedule = (appointment) => {
    setRescheduleTarget(appointment);
  };

  const closeReschedule = () => {
    setRescheduleTarget(null);
  };

  const handleRescheduleSave = ({ date, time }) => {
    if (!rescheduleTarget) return;
    updateAppointments((current) => current.map((appointment) => (
      appointment.id === rescheduleTarget.id
        ? { ...appointment, date, time }
        : appointment
    )));
    setRescheduleTarget(null);
  };

  return (
    <div className="appointments">
      <div className="appointments-container">
        <BackToDashboardBar onNavigate={onNavigate} />
        <div className="appointments-header">
          <button className="btn-new-appointment" disabled={isBooking} onClick={handleBookAppointment}>
            {isBooking ? 'Processing...' : 'Book New Appointment'}
          </button>
          <button className="btn-new-appointment secondary" onClick={() => onNavigate('calendar')}>
            Open Calendar View
          </button>
        </div>

        <div className="filter-section">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filterStatus === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('confirmed')}
          >
            Upcoming
          </button>
          <button
            className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('completed')}
          >
            Completed
          </button>
        </div>

        <div className="appointments-content">
          {sortedAppointments.length > 0 ? (
            <div className="appointments-list">
              {sortedAppointments.map((appointment) => (
                <div key={appointment.id} className={`appointment-card ${appointment.status}`}>
                  <div className="appointment-status-indicator"></div>

                  <div className="appointment-main">
                    <div className="appointment-date-section">
                      <div className="date-box">
                        <span className="date-month">{new Date(appointment.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                        <span className="date-day">{new Date(appointment.date).getDate()}</span>
                        <span className="date-year">{new Date(appointment.date).getFullYear()}</span>
                      </div>
                      <div className="time-info">
                        <span className="time-icon">Time</span>
                        <span className="time-value">{appointment.time}</span>
                      </div>
                    </div>

                    <div className="appointment-details-section">
                      <div className="appointment-header-info">
                        <h3>{appointment.department}</h3>
                        <span className={`status-badge ${appointment.status}`}>
                          {appointment.status === 'confirmed'
                            ? 'Upcoming'
                            : appointment.status === 'completed'
                              ? 'Completed'
                              : 'Cancelled'}
                        </span>
                      </div>

                      <div className="appointment-info-rows">
                        <div className="info-row">
                          <span className="info-icon">Dr</span>
                          <div className="info-content">
                            <span className="info-label">Doctor</span>
                            <span className="info-value">{appointment.doctor}</span>
                          </div>
                        </div>

                        <div className="info-row">
                          <span className="info-icon">Type</span>
                          <div className="info-content">
                            <span className="info-label">Type</span>
                            <span className="info-value">{appointment.type}</span>
                          </div>
                        </div>

                        {appointment.notes && (
                          <div className="appointment-notes">
                            <span className="notes-label">Notes:</span>
                            <p>{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="appointment-actions">
                    {appointment.status === 'confirmed' && (
                      <>
                        <button
                          type="button"
                          className="btn-reschedule"
                          onClick={() => openReschedule(appointment)}
                        >
                          Reschedule
                        </button>
                        <button
                          type="button"
                          className="btn-cancel"
                          onClick={() => handleCancel(appointment.id)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {appointment.status === 'completed' && (
                      <button className="btn-view-details">View Details</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-appointments">
              <div className="no-data-icon">📅</div>
              <p>{filterStatus === 'completed' ? 'No appointments found' : 'No upcoming appointments'}</p>
              <button className="btn-book-now" disabled={isBooking} onClick={handleBookAppointment}>
                {isBooking ? 'Processing...' : 'Book Your First Appointment'}
              </button>
            </div>
          )}
        </div>
      </div>

      <RescheduleAppointmentModal
        isOpen={Boolean(rescheduleTarget)}
        appointment={rescheduleTarget}
        onClose={closeReschedule}
        onSave={handleRescheduleSave}
      />
    </div>
  );
}

export default Appointments;
