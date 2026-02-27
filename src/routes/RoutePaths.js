export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  INTAKE: '/intake',
  DASHBOARD: '/patient-portal',
  APPOINTMENTS: '/patient-portal/appointments',
  MEDICAL_RECORDS: '/patient-portal/medical-records',
  LAB_RESULTS: '/patient-portal/lab-results',
  PRESCRIPTIONS: '/patient-portal/prescriptions',
  BILLING: '/patient-portal/billing',
  BOOK_APPOINTMENT: '/patient-portal/book-appointment',
  CALENDAR: '/patient-portal/calendar',
  STAFF_PORTAL: '/staff-portal',
};

export const SECTIONS = ['home', 'about', 'services', 'contact'];

export const NAV_KEY_TO_ROUTE = {
  login: ROUTES.LOGIN,
  intake: ROUTES.INTAKE,
  'intake-form': ROUTES.INTAKE,
  appointments: ROUTES.APPOINTMENTS,
  'medical-records': ROUTES.MEDICAL_RECORDS,
  'lab-results': ROUTES.LAB_RESULTS,
  prescriptions: ROUTES.PRESCRIPTIONS,
  billing: ROUTES.BILLING,
  'my-account': `${ROUTES.DASHBOARD}?account=1`,
  calendar: ROUTES.CALENDAR,
  'book-appointment': ROUTES.BOOK_APPOINTMENT,
  dashboard: ROUTES.DASHBOARD,
  'patient-portal': ROUTES.DASHBOARD,
  'staff-portal': ROUTES.STAFF_PORTAL,
};
