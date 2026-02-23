import { useMemo, useState } from 'react';

const noticeSeed = [
  { id: 1, type: 'cancellation', severity: 'medium', patient: 'Carla Mendoza', message: 'Cancelled 08:30 slot for Cardiology.', time: '08:04' },
  { id: 2, type: 'conflict', severity: 'high', patient: 'John Aquino', message: 'Double booking detected at 09:15.', time: '08:09' },
  { id: 3, type: 'late arrival', severity: 'low', patient: 'Maria Torres', message: 'Patient ETA moved to 10:35.', time: '08:24' },
  { id: 4, type: 'urgent reschedule', severity: 'high', patient: 'Neil Salazar', message: 'Doctor unavailable. Needs immediate reassignment.', time: '08:31' },
];

const severityClass = {
  low: 'bg-sky-100 text-sky-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
};

function NotificationCenter() {
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filteredNotices = useMemo(() => {
    return noticeSeed.filter((notice) => {
      const passType = typeFilter === 'all' || notice.type === typeFilter;
      const passSeverity = severityFilter === 'all' || notice.severity === severityFilter;
      return passType && passSeverity;
    });
  }, [typeFilter, severityFilter]);

  const types = ['all', ...new Set(noticeSeed.map((notice) => notice.type))];
  const severities = ['all', 'low', 'medium', 'high'];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">Notification Center</h1>
          <p className="mt-2 text-sm text-slate-600">Track cancellations, conflicts, late arrivals, and urgent reschedules.</p>
        </header>

        <section className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Type Filter</span>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm capitalize">
              {types.map((type) => (
                <option key={type} value={type} className="capitalize">{type}</option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Severity Filter</span>
            <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm capitalize">
              {severities.map((severity) => (
                <option key={severity} value={severity} className="capitalize">{severity}</option>
              ))}
            </select>
          </label>
        </section>

        <section className="space-y-3">
          {filteredNotices.map((notice) => (
            <article key={notice.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-700">{notice.type}</span>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${severityClass[notice.severity]}`}>{notice.severity}</span>
                  </div>
                  <h2 className="mt-2 text-base font-semibold text-slate-900">{notice.patient}</h2>
                  <p className="mt-1 text-sm text-slate-600">{notice.message}</p>
                </div>
                <span className="text-xs font-medium text-slate-500">{notice.time}</span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default NotificationCenter;
