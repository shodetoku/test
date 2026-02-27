import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useAppNavigation } from '../context/AppNavigationContext';
import { ROUTES } from './RoutePaths';

import AppLayout from '../components/AppLayout';
import PublicLayout from '../components/PublicLayout';
import AppointmentModal from '../components/AppointmentModal';

import Appointments from '../pages/patient/Appointments';
import BillingEnhanced from '../pages/patient/BillingEnhanced';
import BookAppointment from '../pages/patient/BookAppointment';
import ForgotPassword from '../pages/auth/ForgotPassword';
import IntakeForm from '../pages/auth/IntakeForm';
import LaboratoryResults from '../pages/patient/LaboratoryResults';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/auth/Login';
import MedicalRecords from '../pages/patient/MedicalRecords';
import PatientCalendar from '../pages/patient/PatientCalendar';
import PatientDashboard from '../pages/patient/PatientDashboard';
import Prescriptions from '../pages/patient/Prescriptions';
import StaffPortal from '../pages/staff-portal/StaffPortal';

function AppRoutes() {
  const navigate = useNavigate();
  const { handleNavigate, triggerNotification, showModal, setShowModal, showNotification, notificationType } = useAppNavigation();

  const openIntakeForm = () => {
    setShowModal(false);
    navigate(ROUTES.INTAKE);
  };

  const openLogin = () => {
    setShowModal(false);
    navigate(ROUTES.LOGIN);
  };

  const handleIntakeFormComplete = (isCompleted) => {
    navigate(ROUTES.HOME);
    if (isCompleted) {
      triggerNotification('intake');
    }
  };

  const handleLoginNavigation = (destination) => {
    if (destination === 'home') {
      navigate(ROUTES.DASHBOARD);
      triggerNotification('login');
      return;
    }
    handleNavigate(destination);
  };

  const handlePatientNavigation = (destination) => {
    if (destination === 'my-account' || destination === 'profile' || destination === 'profile-settings') {
      navigate(`${ROUTES.DASHBOARD}?account=1`);
      return;
    }
    handleNavigate(destination);
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

        <Route path={ROUTES.DASHBOARD} element={<AppLayout />}>
          <Route index element={<PatientDashboard onNavigate={handlePatientNavigation} />} />
          <Route path="appointments" element={<Appointments onNavigate={handlePatientNavigation} />} />
          <Route path="medical-records" element={<MedicalRecords onNavigate={handlePatientNavigation} />} />
          <Route path="lab-results" element={<LaboratoryResults onNavigate={handlePatientNavigation} />} />
          <Route path="prescriptions" element={<Prescriptions onNavigate={handlePatientNavigation} />} />
          <Route path="billing" element={<BillingEnhanced onNavigate={handlePatientNavigation} />} />
          <Route path="book-appointment" element={<BookAppointment onNavigate={handlePatientNavigation} />} />
          <Route path="calendar" element={<PatientCalendar onNavigate={handlePatientNavigation} />} />
          <Route path="profile" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path="profile-settings" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Route>

        <Route path={ROUTES.STAFF_PORTAL} element={<StaffPortal />} />

        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>

      <AppointmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onFirstTime={openIntakeForm}
        onReturning={openLogin}
      />

      {showNotification && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 pointer-events-none">
          <div className="pointer-events-auto flex max-w-lg items-center gap-4 rounded-xl border border-emerald-400 bg-gradient-to-r from-emerald-100 to-emerald-200 px-8 py-5 font-semibold text-emerald-900 shadow-xl animate-slideDown">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center text-2xl font-bold">&#10003;</div>
            <div className="flex flex-col gap-1">
              <div className="text-base font-bold tracking-wide">
                {notificationType === 'intake' ? 'Form Submitted Successfully!' : 'Login Successful!'}
              </div>
              <div className="text-sm font-medium opacity-90">You can now book an appointment.</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AppRoutes;
