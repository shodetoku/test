import { useMemo, useState } from 'react';
import StaffPageHeader from '../components/StaffPageHeader';

const alerts = [
  { id: 1, type: 'cancellation', severity: 'medium', patient: 'Carla Mendoza', message: 'Cancelled 08:30 cardiology visit.', time: '08:04' },
  { id: 2, type: 'conflict', severity: 'high', patient: 'John Aquino', message: 'Double booking conflict at 09:15.', time: '08:14' },
  { id: 3, type: 'late arrival', severity: 'low', patient: 'Mia Torres', message: 'Late by 15 minutes.', time: '08:25' },
  { id: 4, type: 'urgent reschedule', severity: 'high', patient: 'Neil Salazar', message: 'Doctor unavailable, reassign immediately.', time: '08:32' },
];

const tones = {
  low: 'bg-sky-100 text-sky-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
};

function StaffNotificationCenterPage() {
  const [type, setType] = useState('all');
  const [severity, setSeverity] = useState('all');

  const items = useMemo(() => {
    return alerts.filter((alert) => {
      const okType = type === 'all' || alert.type === type;
      const okSeverity = severity === 'all' || alert.severity === severity;
      return okType && okSeverity;
    });
  }, [severity, type]);

  const types = ['all', ...new Set(alerts.map((item) => item.type))];

  return (
    <div className="space-y-6">
      <StaffPageHeader title="Notification Center" subtitle="Monitor cancellations, conflicts, late arrivals, and urgent schedule changes." />

      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">Type</span>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm capitalize">
              {types.map((item) => <option key={item} className="capitalize">{item}</option>)}
            </select>
          </label>
          <label className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">Severity</span>
            <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm capitalize">
              {['all', 'low', 'medium', 'high'].map((item) => <option key={item} className="capitalize">{item}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className="space-y-3">
        {items.map((alert) => (
          <article key={alert.id} className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-700">{alert.type}</span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${tones[alert.severity]}`}>{alert.severity}</span>
                </div>
                <h2 className="mt-2 text-base font-semibold text-slate-900">{alert.patient}</h2>
                <p className="mt-1 text-sm text-slate-600">{alert.message}</p>
              </div>
              <p className="text-xs font-semibold text-slate-500">{alert.time}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default StaffNotificationCenterPage;
