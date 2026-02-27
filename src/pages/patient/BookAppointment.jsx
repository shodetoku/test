import { useMemo, useState } from 'react';
import { getCurrentUser } from '../../services/AuthService';
import { saveToStorage, getFromStorage } from '../../services/StorageService';
import { mockDepartments, mockDoctors, mockTimeSlots, mockAppointments } from '../../utils/SampleData';
import BackToDashboardBar from '../../components/patient/navigation/BackToDashboardBar';
import '../../assets/styles/BookAppointment.css';

function BookAppointment({ onNavigate }) {
  const user = getCurrentUser();
  const [step, setStep] = useState(1);
  const [departmentId, setDepartmentId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredDoctors = useMemo(
    () => mockDoctors.filter((doctor) => doctor.departmentId === departmentId),
    [departmentId]
  );

  const selectedDepartment = mockDepartments.find((department) => department.id === departmentId);
  const selectedDoctor = mockDoctors.find((doctor) => doctor.id === doctorId);

  const canMoveNext = (step === 1 && departmentId) || (step === 2 && doctorId) || (step === 3 && date && time);

  const confirmAppointment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const existingAppointments = getFromStorage('appointments') || mockAppointments;
      const newAppointment = {
        id: Date.now().toString(),
        patientId: user?.id || '1',
        department: selectedDepartment?.name || 'General Medicine',
        doctor: selectedDoctor?.name || 'Dr. Sarah Johnson',
        date,
        time,
        status: 'confirmed',
        type: 'Consultation'
      };
      saveToStorage('appointments', [...existingAppointments, newAppointment]);
      setConfirmed(true);
      setIsProcessing(false);
    }, 700);
  };

  return (
    <div className="booking-overlay-page">
      <div className="booking-overlay-card">
        <BackToDashboardBar onNavigate={onNavigate} />
        <div className="booking-overlay-head">
          <div>
            <h1>Book Appointment</h1>
            <p>3-step overlay flow: choose service, clinician, then schedule.</p>
          </div>
          <button type="button" className="close-overlay-btn" onClick={() => onNavigate('dashboard')}>Close</button>
        </div>

        {confirmed ? (
          <div className="booking-confirmed">
            <h2>Appointment Confirmed</h2>
            <p>{selectedDepartment?.name} with {selectedDoctor?.name}</p>
            <p>{date} at {time}</p>
            <button type="button" onClick={() => onNavigate('appointments')}>View Appointments</button>
          </div>
        ) : (
          <>
            <div className="booking-stepper">
              <span className={step >= 1 ? 'active' : ''}>1. Service</span>
              <span className={step >= 2 ? 'active' : ''}>2. Clinician</span>
              <span className={step >= 3 ? 'active' : ''}>3. Schedule</span>
            </div>

            {step === 1 && (
              <div className="booking-step-content">
                <h2>Select Department</h2>
                <div className="booking-grid">
                  {mockDepartments.map((department) => (
                    <button
                      key={department.id}
                      type="button"
                      className={`select-card ${departmentId === department.id ? 'selected' : ''}`}
                      onClick={() => setDepartmentId(department.id)}
                    >
                      <strong>{department.name}</strong>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="booking-step-content">
                <h2>Select Doctor</h2>
                <div className="booking-grid">
                  {filteredDoctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      type="button"
                      className={`select-card ${doctorId === doctor.id ? 'selected' : ''}`}
                      onClick={() => setDoctorId(doctor.id)}
                    >
                      <strong>{doctor.name}</strong>
                      <span>{doctor.specialty}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="booking-step-content">
                <h2>Choose Date and Time</h2>
                <label>Date</label>
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                <label>Time</label>
                <div className="timeslots">
                  {mockTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`timeslot ${time === slot ? 'selected' : ''}`}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="booking-actions">
              <button type="button" disabled={step === 1} onClick={() => setStep((current) => current - 1)}>Previous</button>
              {step < 3 && (
                <button type="button" disabled={!canMoveNext} onClick={() => setStep((current) => current + 1)}>Next</button>
              )}
              {step === 3 && (
                <button type="button" disabled={!canMoveNext || isProcessing} onClick={confirmAppointment}>
                  {isProcessing ? 'Processing...' : 'Confirm'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BookAppointment;
