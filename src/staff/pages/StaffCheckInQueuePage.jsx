import { useMemo, useState } from 'react';
import StaffPageHeader from '../components/StaffPageHeader';

const seed = [
  { id: 1, patient: 'Carla Mendoza', doctor: 'Dr. Lim', room: '-', status: 'waiting', eta: '08:30' },
  { id: 2, patient: 'John Aquino', doctor: 'Dr. Cruz', room: 'Room 2', status: 'in consultation', eta: '09:15' },
  { id: 3, patient: 'Mia Torres', doctor: 'Dr. Ramos', room: '-', status: 'waiting', eta: '10:45' },
];

const nextStatus = {
  waiting: 'in consultation',
  'in consultation': 'completed',
  completed: 'completed',
};

function StaffCheckInQueuePage() {
  const [queue, setQueue] = useState(seed);

  const totals = useMemo(() => {
    return {
      waiting: queue.filter((row) => row.status === 'waiting').length,
      inConsultation: queue.filter((row) => row.status === 'in consultation').length,
      completed: queue.filter((row) => row.status === 'completed').length,
    };
  }, [queue]);

  const assignRoom = (id, room) => {
    setQueue((prev) => prev.map((row) => (row.id === id ? { ...row, room } : row)));
  };

  const advance = (id) => {
    setQueue((prev) => prev.map((row) => (row.id === id ? { ...row, status: nextStatus[row.status] } : row)));
  };

  return (
    <div className="space-y-6">
      <StaffPageHeader title="Check-in and Queue" subtitle="Monitor waiting patients, room assignments, and consultation progress." />

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-600">Waiting</p>
          <p className="mt-1 text-2xl font-bold text-amber-700">{totals.waiting}</p>
        </article>
        <article className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-600">In consultation</p>
          <p className="mt-1 text-2xl font-bold text-blue-700">{totals.inConsultation}</p>
        </article>
        <article className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-600">Completed</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">{totals.completed}</p>
        </article>
      </section>

      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Patient</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Doctor</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">ETA</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Room</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {queue.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/60">
                  <td className="px-4 py-3 font-semibold text-slate-800">{row.patient}</td>
                  <td className="px-4 py-3 text-slate-600">{row.doctor}</td>
                  <td className="px-4 py-3 text-slate-600">{row.eta}</td>
                  <td className="px-4 py-3 text-slate-600">{row.room}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize text-slate-700">{row.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => assignRoom(row.id, 'Room 1')} className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100">Room 1</button>
                      <button type="button" onClick={() => assignRoom(row.id, 'Room 2')} className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100">Room 2</button>
                      <button type="button" onClick={() => advance(row.id)} disabled={row.status === 'completed'} className="rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">Next Status</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default StaffCheckInQueuePage;
