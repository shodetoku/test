import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { ROUTES } from './routes/config';

import PublicLayout from './layouts/PublicLayout';
import AppLayout from './layouts/AppLayout';
import AppointmentModal from './components/AppointmentModal';

import LandingPage from './pages/LandingPage';
import IntakeForm from './pages/IntakeForm';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import PatientDashboard from './pages/PatientDashboard';
import PatientProfile from './pages/PatientProfile';
import Appointments from './pages/Appointments';
import MedicalRecords from './pages/MedicalRecords';
import Prescriptions from './pages/Prescriptions';
import BillingEnhanced from './pages/BillingEnhanced';
import LaboratoryResults from './pages/LaboratoryResults';
import ProfileSettings from './pages/ProfileSettings';
import BookAppointment from './pages/BookAppointment';
import PatientCalendar from './pages/PatientCalendar';
import { staffRouteConfig } from './staff';

import './index.css';

function AppRoutes() {
  const navigate = useNavigate();
  const { handleNavigate, triggerNotification, showModal, setShowModal, showNotification, notificationType } = useNavigation();

  const handleFirstTime = () => {
    setShowModal(false);
    navigate(ROUTES.INTAKE);
  };

  const handleReturning = () => {
    setShowModal(false);
    navigate(ROUTES.LOGIN);
  };

  const handleIntakeFormComplete = (isCompleted) => {
    navigate(ROUTES.HOME);
    if (isCompleted) triggerNotification('intake');
  };

  const handleLoginNavigation = (page) => {
    if (page === 'home') {
      navigate(ROUTES.DASHBOARD);
      triggerNotification('login');
    } else {
      handleNavigate(page);
    }
  };

  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.INTAKE} element={<IntakeForm onClose={handleIntakeFormComplete} />} />
          <Route path={ROUTES.LOGIN} element={<Login onNavigate={handleLoginNavigation} />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword onNavigate={handleLoginNavigation} />} />
        </Route>

        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<PatientDashboard onNavigate={handleNavigate} />} />
          <Route path="profile" element={<PatientProfile onNavigate={handleNavigate} />} />
          <Route path="appointments" element={<Appointments onNavigate={handleNavigate} />} />
          <Route path="medical-records" element={<MedicalRecords onNavigate={handleNavigate} />} />
          <Route path="lab-results" element={<LaboratoryResults onNavigate={handleNavigate} />} />
          <Route path="prescriptions" element={<Prescriptions onNavigate={handleNavigate} />} />
          <Route path="billing" element={<BillingEnhanced onNavigate={handleNavigate} />} />
          <Route path="profile-settings" element={<ProfileSettings onNavigate={handleNavigate} />} />
          <Route path="book-appointment" element={<BookAppointment onNavigate={handleNavigate} />} />
          <Route path="calendar" element={<PatientCalendar onNavigate={handleNavigate} />} />
        </Route>

        <Route path={staffRouteConfig.path} element={staffRouteConfig.element}>
          {staffRouteConfig.children.map((child, index) => (
            <Route key={child.path ?? `index-${index}`} index={child.index} path={child.path} element={child.element} />
          ))}
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>

      <AppointmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onFirstTime={handleFirstTime}
        onReturning={handleReturning}
      />

      {showNotification && (
        <div className="fixed inset-0 flex items-start justify-center pt-20 z-50 pointer-events-none">
          <div className="flex items-center gap-4 px-8 py-5 rounded-xl font-semibold shadow-xl pointer-events-auto max-w-lg bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-900 border border-emerald-400 animate-slideDown">
            <div className="text-2xl font-bold w-7 h-7 flex items-center justify-center flex-shrink-0">&#10003;</div>
            <div className="flex flex-col gap-1">
              <div className="text-base font-bold tracking-wide">
                {notificationType === 'intake' ? 'Form Submitted Successfully!' : 'Login Successful!'}
              </div>
              <div className="text-sm font-medium opacity-90">
                You can now book an appointment.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <NavigationProvider>
      <AppRoutes />
    </NavigationProvider>
  );
}

export default App;
