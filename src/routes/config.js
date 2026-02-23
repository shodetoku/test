export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  INTAKE: '/intake',
  DASHBOARD: '/dashboard',
  APPOINTMENTS: '/dashboard/appointments',
  MEDICAL_RECORDS: '/dashboard/medical-records',
  LAB_RESULTS: '/dashboard/lab-results',
  PRESCRIPTIONS: '/dashboard/prescriptions',
  BILLING: '/dashboard/billing',
  PROFILE_SETTINGS: '/dashboard/profile-settings',
  BOOK_APPOINTMENT: '/dashboard/book-appointment',
  CALENDAR: '/dashboard/calendar',
  PROFILE: '/dashboard/profile',
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
  'profile-settings': ROUTES.PROFILE_SETTINGS,
  calendar: ROUTES.CALENDAR,
  'book-appointment': ROUTES.BOOK_APPOINTMENT,
  dashboard: ROUTES.DASHBOARD,
  profile: ROUTES.PROFILE,
};
