import { useState } from 'react';
import StaffPageHeader from '../components/StaffPageHeader';

const seedRequests = [
  { id: 1, patient: 'Andrea Lim', department: 'Cardiology', requestedTime: '09:30', type: 'new' },
  { id: 2, patient: 'Paolo de Vera', department: 'Pediatrics', requestedTime: '10:45', type: 'reschedule' },
  { id: 3, patient: 'Janine Cruz', department: 'General Medicine', requestedTime: '13:00', type: 'new' },
];

const seedSlots = [
  { id: 'slot-1', time: '09:30', item: null },
  { id: 'slot-2', time: '10:45', item: null },
  { id: 'slot-3', time: '13:00', item: null },
  { id: 'slot-4', time: '15:00', item: null },
];

function StaffAppointmentRequestsPage() {
  const [requests, setRequests] = useState(seedRequests);
  const [slots, setSlots] = useState(seedSlots);
  const [dragId, setDragId] = useState(null);

  const removeRequest = (id) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDrop = (slotId) => {
    if (!dragId) return;
    const selected = requests.find((item) => item.id === dragId);
    if (!selected) return;
    setSlots((prev) => prev.map((slot) => (slot.id === slotId ? { ...slot, item: selected } : slot)));
    setDragId(null);
  };

  return (
    <div className="space-y-6">
      <StaffPageHeader title="Appointment Requests" subtitle="Approve, reschedule, reject, and drag requests into schedule slots." />

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Pending Requests</h2>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">{requests.length} pending</span>
          </div>
          <div className="space-y-3">
            {requests.map((request) => (
              <div key={request.id} draggable onDragStart={() => setDragId(request.id)} className="cursor-grab rounded-xl border border-slate-200 bg-slate-50 p-4 active:cursor-grabbing">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{request.patient}</p>
                    <p className="text-sm text-slate-600">{request.department} | Requested {request.requestedTime}</p>
                  </div>
                  <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-semibold capitalize text-slate-700">{request.type}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => removeRequest(request.id)} type="button" className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">Approve</button>
                  <button type="button" className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600">Reschedule</button>
                  <button onClick={() => removeRequest(request.id)} type="button" className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Calendar Drop Zone</h2>
          <div className="mt-4 space-y-3">
            {slots.map((slot) => (
              <div key={slot.id} onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(slot.id)} className="rounded-xl border border-dashed border-blue-300 bg-blue-50/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{slot.time}</p>
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
  );
}

export default StaffAppointmentRequestsPage;
