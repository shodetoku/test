import { Link } from 'react-router-dom';

const statCards = [
  { label: 'Total Appointments Today', value: 48, tone: 'text-blue-600' },
  { label: 'Checked In', value: 29, tone: 'text-emerald-600' },
  { label: 'Waiting', value: 13, tone: 'text-amber-600' },
  { label: 'No-show / Cancellations', value: 6, tone: 'text-rose-600' },
];

const registrations = [
  { staff: 'M. Santos', count: 8 },
  { staff: 'L. Reyes', count: 6 },
  { staff: 'C. Dela Cruz', count: 5 },
  { staff: 'A. Ramos', count: 4 },
];

const quickActions = [
  { label: 'Open Master Calendar', to: '/dashboard/staff/calendar' },
  { label: 'Manage Queue', to: '/dashboard/staff/queue' },
  { label: 'Review Requests', to: '/dashboard/staff/requests' },
  { label: 'Check Alerts', to: '/dashboard/staff/notifications' },
];

function StaffDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl bg-gradient-to-r from-cyan-700 via-sky-700 to-blue-800 p-6 text-white shadow-lg">
          <p className="text-sm uppercase tracking-wide text-cyan-100">Staff Portal</p>
          <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Clinic Operations Dashboard</h1>
          <p className="mt-2 text-sm text-cyan-100 md:text-base">Live overview of appointments, check-ins, and front-desk activity.</p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className={`mt-2 text-3xl font-bold ${card.tone}`}>{card.value}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-5">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">New Registrations by Staff</h2>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">Today</span>
            </div>
            <ul className="mt-4 space-y-3">
              {registrations.map((entry) => (
                <li key={entry.staff} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
                  <span className="font-medium text-slate-700">{entry.staff}</span>
                  <span className="text-sm font-semibold text-slate-900">{entry.count} registrations</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-800">Quick Actions</h2>
            <div className="mt-4 space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="block rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-800"
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}

export default StaffDashboard;
