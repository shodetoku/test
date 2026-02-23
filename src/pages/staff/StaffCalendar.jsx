import { useMemo, useState } from 'react';

const appointments = [
  { id: 1, patient: 'Carla Mendoza', doctor: 'Dr. Lim', department: 'Cardiology', time: '08:30', status: 'checked-in' },
  { id: 2, patient: 'John Aquino', doctor: 'Dr. Velasco', department: 'Pediatrics', time: '09:15', status: 'waiting' },
  { id: 3, patient: 'Maria Torres', doctor: 'Dr. Lim', department: 'Cardiology', time: '10:20', status: 'consultation' },
  { id: 4, patient: 'Neil Salazar', doctor: 'Dr. Cruz', department: 'General Medicine', time: '11:00', status: 'cancellation' },
  { id: 5, patient: 'Lia Gomez', doctor: 'Dr. Ramos', department: 'Dermatology', time: '13:10', status: 'waiting' },
];

const statusClass = {
  'checked-in': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  waiting: 'bg-amber-100 text-amber-800 border-amber-200',
  consultation: 'bg-blue-100 text-blue-700 border-blue-200',
  cancellation: 'bg-rose-100 text-rose-700 border-rose-200',
};

function StaffCalendar() {
  const [department, setDepartment] = useState('All');
  const [doctor, setDoctor] = useState('All');
  const [date, setDate] = useState('2026-02-23');
  const [view, setView] = useState('day');

  const departments = ['All', ...new Set(appointments.map((apt) => apt.department))];
  const doctors = ['All', ...new Set(appointments.map((apt) => apt.doctor))];

  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const byDepartment = department === 'All' || apt.department === department;
      const byDoctor = doctor === 'All' || apt.doctor === doctor;
      return byDepartment && byDoctor;
    });
  }, [department, doctor]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">Master Clinic Calendar</h1>
          <p className="mt-2 text-sm text-slate-600">Filter and monitor appointments by department, doctor, and date.</p>
        </header>

        <section className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:grid-cols-4">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Department</span>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              {departments.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Doctor</span>
            <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              {doctors.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
          </label>

          <div className="space-y-2">
            <span className="text-sm font-medium text-slate-700">View</span>
            <div className="flex gap-2">
              {['day', 'week', 'month'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setView(option)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium capitalize ${
                    view === option ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">{view[0].toUpperCase() + view.slice(1)} View</h2>
            <p className="text-sm text-slate-500">Date: {date}</p>
          </div>

          <div className="grid gap-3">
            {filteredAppointments.map((apt) => (
              <div key={apt.id} className={`rounded-xl border px-4 py-3 ${statusClass[apt.status]}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{apt.time} - {apt.patient}</p>
                  <span className="rounded-full bg-white/60 px-2.5 py-1 text-xs font-semibold uppercase">{apt.status}</span>
                </div>
                <p className="mt-1 text-sm">{apt.department} | {apt.doctor}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default StaffCalendar;
