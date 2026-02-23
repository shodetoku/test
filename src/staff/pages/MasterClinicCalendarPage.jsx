import { useMemo, useState } from 'react';
import StaffPageHeader from '../components/StaffPageHeader';

const events = [
  { id: 1, patient: 'Carla Mendoza', doctor: 'Dr. Lim', department: 'Cardiology', time: '08:30', status: 'checked-in' },
  { id: 2, patient: 'John Aquino', doctor: 'Dr. Cruz', department: 'General Medicine', time: '09:15', status: 'waiting' },
  { id: 3, patient: 'Mia Torres', doctor: 'Dr. Ramos', department: 'Dermatology', time: '10:45', status: 'consultation' },
  { id: 4, patient: 'Neil Salazar', doctor: 'Dr. Lim', department: 'Cardiology', time: '13:00', status: 'cancellation' },
];

const statusStyle = {
  'checked-in': 'border-emerald-200 bg-emerald-50 text-emerald-700',
  waiting: 'border-amber-200 bg-amber-50 text-amber-700',
  consultation: 'border-blue-200 bg-blue-50 text-blue-700',
  cancellation: 'border-rose-200 bg-rose-50 text-rose-700',
};

function MasterClinicCalendarPage() {
  const [department, setDepartment] = useState('All');
  const [doctor, setDoctor] = useState('All');
  const [view, setView] = useState('day');
  const [date, setDate] = useState('2026-02-23');

  const departments = ['All', ...new Set(events.map((item) => item.department))];
  const doctors = ['All', ...new Set(events.map((item) => item.doctor))];

  const filtered = useMemo(() => {
    return events.filter((event) => {
      const okDepartment = department === 'All' || event.department === department;
      const okDoctor = doctor === 'All' || event.doctor === doctor;
      return okDepartment && okDoctor;
    });
  }, [department, doctor]);

  return (
    <div className="space-y-6">
      <StaffPageHeader title="Master Clinic Calendar" subtitle="Filter and manage appointment flow by department, doctor, and date." />

      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-4">
          <label className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">Department</span>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">
              {departments.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">Doctor</span>
            <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm">
              {doctors.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
          </label>
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">View</span>
            <div className="flex gap-2">
              {['day', 'week', 'month'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setView(item)}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold capitalize ${
                    view === item ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">{view[0].toUpperCase() + view.slice(1)} Schedule</h2>
        <div className="mt-4 grid gap-3">
          {filtered.map((event) => (
            <article key={event.id} className={`rounded-xl border px-4 py-3 ${statusStyle[event.status]}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{event.time} - {event.patient}</p>
                <span className="rounded-full bg-white/60 px-2 py-1 text-xs font-semibold uppercase">{event.status}</span>
              </div>
              <p className="mt-1 text-sm">{event.department} | {event.doctor} | {date}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MasterClinicCalendarPage;
