import { useOutletContext } from 'react-router-dom';
import BackToDashboardBar from '../../components/patient/navigation/BackToDashboardBar';
import { getFromStorage } from '../../services/StorageService';
import { mockAppointments } from '../../utils/SampleData';
import PatientCalendarView from '../../components/patient/calendar/PatientCalendarView';
import '../../assets/styles/PatientCalendar.css';

function PatientCalendar({ onNavigate }) {
  const outletContext = useOutletContext?.() || {};
  const { searchValue = '' } = outletContext;
  const appointments = getFromStorage('appointments') || mockAppointments;

  return (
    <section className="calendar-page">
      <BackToDashboardBar onNavigate={onNavigate} />
      <PatientCalendarView appointments={appointments} searchValue={searchValue} />
    </section>
  );
}

export default PatientCalendar;
