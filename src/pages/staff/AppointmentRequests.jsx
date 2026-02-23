import { useMemo, useState } from 'react';

const requestSeed = [
  { id: 1, patient: 'Andrea Lim', department: 'Cardiology', requestedTime: '09:30', type: 'new' },
  { id: 2, patient: 'Paolo de Vera', department: 'Pediatrics', requestedTime: '10:45', type: 'reschedule' },
  { id: 3, patient: 'Janine Cruz', department: 'General Medicine', requestedTime: '13:00', type: 'new' },
];

const initialSlots = [
  { id: 'slot-1', time: '09:30', item: null },
  { id: 'slot-2', time: '10:45', item: null },
  { id: 'slot-3', time: '13:00', item: null },
  { id: 'slot-4', time: '15:00', item: null },
];

function AppointmentRequests() {
  const [requests, setRequests] = useState(requestSeed);
  const [slots, setSlots] = useState(initialSlots);
  const [dragId, setDragId] = useState(null);

  const pendingCount = useMemo(() => requests.length, [requests]);

  const removeRequest = (id) => {
    setRequests((prev) => prev.filter((request) => request.id !== id));
  };

  const onDropToSlot = (slotId) => {
    if (!dragId) return;
    const request = requests.find((item) => item.id === dragId);
    if (!request) return;

    setSlots((prev) => prev.map((slot) => (slot.id === slotId ? { ...slot, item: request } : slot)));
    setDragId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">Appointment Requests</h1>
          <p className="mt-2 text-sm text-slate-600">Approve, reject, or drag requests into the clinic calendar slots.</p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">Pending Requests</h2>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">{pendingCount} pending</span>
            </div>
            <div className="space-y-3">
              {requests.map((request) => (
                <div
                  key={request.id}
                  draggable
                  onDragStart={() => setDragId(request.id)}
                  className="cursor-grab rounded-xl border border-slate-200 bg-slate-50 p-4 active:cursor-grabbing"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{request.patient}</p>
                      <p className="text-sm text-slate-600">{request.department} | Requested: {request.requestedTime}</p>
                    </div>
                    <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium capitalize text-slate-700">{request.type}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={() => removeRequest(request.id)} className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700">
                      Approve
                    </button>
                    <button type="button" className="rounded-md bg-amber-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-600">
                      Reschedule
                    </button>
                    <button type="button" onClick={() => removeRequest(request.id)} className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">Calendar Drop Zone</h2>
            <div className="space-y-3">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onDropToSlot(slot.id)}
                  className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{slot.time}</p>
                  {slot.item ? (
                    <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                      {slot.item.patient} | {slot.item.department}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-slate-500">Drop request here</p>
                  )}
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}

export default AppointmentRequests;
