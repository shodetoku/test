import { useMemo, useState } from 'react';
import StaffPageHeader from '../components/StaffPageHeader';

const seed = [
  { id: 1, name: 'Carla Mendoza', phone: '0917-230-1102', doctor: 'Dr. Lim', nextAppointment: '2026-02-24 08:30' },
  { id: 2, name: 'John Aquino', phone: '0918-555-3284', doctor: 'Dr. Velasco', nextAppointment: '2026-02-24 09:15' },
  { id: 3, name: 'Maria Torres', phone: '0908-440-9902', doctor: 'Dr. Lim', nextAppointment: '2026-02-25 10:20' },
];

const empty = { name: '', phone: '', doctor: '', nextAppointment: '' };

function StaffPatientDirectoryPage() {
  const [patients, setPatients] = useState(seed);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter((item) => {
      return item.name.toLowerCase().includes(q) || item.phone.toLowerCase().includes(q) || item.doctor.toLowerCase().includes(q);
    });
  }, [patients, query]);

  const openAdd = () => {
    setEditId(null);
    setForm(empty);
    setOpen(true);
  };

  const openEdit = (patient) => {
    setEditId(patient.id);
    setForm({
      name: patient.name,
      phone: patient.phone,
      doctor: patient.doctor,
      nextAppointment: patient.nextAppointment,
    });
    setOpen(true);
  };

  const save = (event) => {
    event.preventDefault();
    if (!form.name || !form.phone || !form.doctor || !form.nextAppointment) return;
    if (editId) {
      setPatients((prev) => prev.map((item) => (item.id === editId ? { ...item, ...form } : item)));
    } else {
      const nextId = Math.max(0, ...patients.map((item) => item.id)) + 1;
      setPatients((prev) => [...prev, { id: nextId, ...form }]);
    }
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <StaffPageHeader
        title="Patient Directory"
        subtitle="Search patient records, update details, and check upcoming appointments."
        action={
          <button onClick={openAdd} type="button" className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            Add Patient
          </button>
        }
      />

      <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
        <div className="relative w-full max-w-lg">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.5 3a5.5 5.5 0 014.473 8.702l3.662 3.663a.75.75 0 11-1.06 1.06l-3.663-3.662A5.5 5.5 0 118.5 3zm-4 5.5a4 4 0 108 0 4 4 0 00-8 0z" clipRule="evenodd" />
            </svg>
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, phone, or doctor..."
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Patient</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Phone</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Doctor</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Upcoming Appointment</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((patient) => (
                  <tr key={patient.id} className="hover:bg-blue-50/60">
                    <td className="px-5 py-4 font-semibold text-slate-800">{patient.name}</td>
                    <td className="px-5 py-4 text-slate-600">{patient.phone}</td>
                    <td className="px-5 py-4 text-slate-600">{patient.doctor}</td>
                    <td className="px-5 py-4 text-slate-600">{patient.nextAppointment}</td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => openEdit(patient)}
                        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-blue-100 bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">{editId ? 'Edit Patient' : 'Add Patient'}</h2>
            <form onSubmit={save} className="mt-4 space-y-3">
              <input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Full name" className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              <input value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} placeholder="Phone" className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              <input value={form.doctor} onChange={(e) => setForm((prev) => ({ ...prev, doctor: e.target.value }))} placeholder="Assigned doctor" className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              <input value={form.nextAppointment} onChange={(e) => setForm((prev) => ({ ...prev, nextAppointment: e.target.value }))} placeholder="YYYY-MM-DD HH:MM" className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              <div className="flex justify-end gap-2 pt-1">
                <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</button>
                <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffPatientDirectoryPage;
