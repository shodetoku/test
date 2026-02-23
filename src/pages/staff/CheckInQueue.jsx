import { useMemo, useState } from 'react';

const initialQueue = [
  { id: 1, patient: 'Carla Mendoza', doctor: 'Dr. Lim', room: '-', status: 'waiting', eta: '08:30' },
  { id: 2, patient: 'John Aquino', doctor: 'Dr. Velasco', room: 'Room 3', status: 'in consultation', eta: '09:15' },
  { id: 3, patient: 'Maria Torres', doctor: 'Dr. Lim', room: '-', status: 'waiting', eta: '10:20' },
];

const statusFlow = {
  waiting: 'in consultation',
  'in consultation': 'completed',
  completed: 'completed',
};

function CheckInQueue() {
  const [queue, setQueue] = useState(initialQueue);

  const waitingPatients = useMemo(() => queue.filter((entry) => entry.status === 'waiting').length, [queue]);

  const assignRoom = (id, room) => {
    setQueue((prev) => prev.map((entry) => (entry.id === id ? { ...entry, room } : entry)));
  };

  const moveStatus = (id) => {
    setQueue((prev) =>
      prev.map((entry) => {
        if (entry.id !== id) return entry;
        return { ...entry, status: statusFlow[entry.status] };
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">Check-in and Queue</h1>
          <p className="mt-2 text-sm text-slate-600">Track waiting patients, assign rooms, and advance consultation statuses.</p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Patients Waiting</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">{waitingPatients}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">In Consultation</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">{queue.filter((q) => q.status === 'in consultation').length}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="mt-1 text-2xl font-bold text-emerald-600">{queue.filter((q) => q.status === 'completed').length}</p>
          </article>
        </section>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Patient</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Doctor</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">ETA</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Room</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {queue.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-4 py-3 font-medium text-slate-800">{entry.patient}</td>
                    <td className="px-4 py-3 text-slate-600">{entry.doctor}</td>
                    <td className="px-4 py-3 text-slate-600">{entry.eta}</td>
                    <td className="px-4 py-3 text-slate-600">{entry.room}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">{entry.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => assignRoom(entry.id, 'Room 1')} className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100">
                          Room 1
                        </button>
                        <button type="button" onClick={() => assignRoom(entry.id, 'Room 2')} className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100">
                          Room 2
                        </button>
                        <button type="button" onClick={() => moveStatus(entry.id)} disabled={entry.status === 'completed'} className="rounded-md bg-cyan-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-300">
                          Next Status
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CheckInQueue;
