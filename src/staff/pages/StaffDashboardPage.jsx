import { Link } from 'react-router-dom';
import StaffPageHeader from '../components/StaffPageHeader';

const stats = [
  { label: 'Total appointments today', value: 54, tone: 'text-blue-700' },
  { label: 'Checked in', value: 34, tone: 'text-emerald-700' },
  { label: 'Waiting', value: 14, tone: 'text-amber-700' },
  { label: 'No-show / cancellations', value: 6, tone: 'text-rose-700' },
];

const actions = [
  { label: 'Open Calendar', to: '/dashboard/staff/calendar' },
  { label: 'Manage Queue', to: '/dashboard/staff/queue' },
  { label: 'Review Requests', to: '/dashboard/staff/requests' },
  { label: 'View Alerts', to: '/dashboard/staff/notifications' },
];

function StaffDashboardPage() {
  return (
    <div className="space-y-6">
      <StaffPageHeader title="Staff Dashboard" subtitle="Daily operations snapshot for the clinic front desk and care team." />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article key={item.label} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">{item.label}</p>
            <p className={`mt-2 text-3xl font-bold ${item.tone}`}>{item.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {actions.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default StaffDashboardPage;
