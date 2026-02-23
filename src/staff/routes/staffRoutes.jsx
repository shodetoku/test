import StaffLayout from '../layouts/StaffLayout';
import StaffDashboardPage from '../pages/StaffDashboardPage';
import MasterClinicCalendarPage from '../pages/MasterClinicCalendarPage';
import StaffPatientDirectoryPage from '../pages/StaffPatientDirectoryPage';
import StaffCheckInQueuePage from '../pages/StaffCheckInQueuePage';
import StaffAppointmentRequestsPage from '../pages/StaffAppointmentRequestsPage';
import StaffNotificationCenterPage from '../pages/StaffNotificationCenterPage';

export const staffRouteConfig = {
  path: '/dashboard/staff',
  element: <StaffLayout />,
  children: [
    { index: true, element: <StaffDashboardPage /> },
    { path: 'calendar', element: <MasterClinicCalendarPage /> },
    { path: 'patients', element: <StaffPatientDirectoryPage /> },
    { path: 'queue', element: <StaffCheckInQueuePage /> },
    { path: 'requests', element: <StaffAppointmentRequestsPage /> },
    { path: 'notifications', element: <StaffNotificationCenterPage /> },
  ],
};
