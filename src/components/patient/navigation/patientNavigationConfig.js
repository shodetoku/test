import {
  faCalendarDays,
  faChartLine,
  faCreditCard,
  faFileLines
} from '@fortawesome/free-solid-svg-icons';

export const PATIENT_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/patient-portal', icon: faChartLine },
  { id: 'calendar', label: 'Calendar', path: '/patient-portal/calendar', icon: faCalendarDays },
  { id: 'appointments', label: 'Appointments', path: '/patient-portal/appointments', icon: faCalendarDays },
  { id: 'timeline', label: 'Medical Timeline', path: '/patient-portal/medical-records', icon: faFileLines },
  { id: 'billing', label: 'Billing', path: '/patient-portal/billing', icon: faCreditCard }
];

export const PATIENT_MOBILE_NAV_ITEMS = [
  { id: 'dashboard', label: 'Home', path: '/patient-portal', icon: faChartLine },
  { id: 'appointments', label: 'Appointments', path: '/patient-portal/appointments', icon: faCalendarDays },
  { id: 'timeline', label: 'Records', path: '/patient-portal/medical-records', icon: faFileLines }
];

export function resolveActivePortalItem(pathname, items = PATIENT_NAV_ITEMS) {
  const sortedItems = [...items].sort((first, second) => second.path.length - first.path.length);

  const match = sortedItems.find((item) => (
    pathname === item.path || (
      item.id !== 'dashboard' && pathname.startsWith(`${item.path}/`)
    )
  ));

  return match?.id ?? null;
}
