import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard/staff', label: 'Dashboard' },
  { to: '/dashboard/staff/calendar', label: 'Master Calendar' },
  { to: '/dashboard/staff/patients', label: 'Patient Directory' },
  { to: '/dashboard/staff/queue', label: 'Check-in Queue' },
  { to: '/dashboard/staff/requests', label: 'Requests' },
  { to: '/dashboard/staff/notifications', label: 'Notifications' },
];

function StaffSidebar() {
  return (
    <aside className="w-full border-b border-blue-100 bg-white lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="px-5 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Staff Portal</p>
        <h2 className="mt-1 text-lg font-semibold text-slate-900">Clinic Operations</h2>
      </div>
      <nav className="space-y-1 px-3 pb-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/dashboard/staff'}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default StaffSidebar;
