import { useMemo, useState } from 'react';

const initialPatients = [
  { id: 1, name: 'Carla Mendoza', phone: '0917-230-1102', doctor: 'Dr. Lim', nextAppointment: '2026-02-24 08:30' },
  { id: 2, name: 'John Aquino', phone: '0918-555-3284', doctor: 'Dr. Velasco', nextAppointment: '2026-02-24 09:15' },
  { id: 3, name: 'Maria Torres', phone: '0908-440-9902', doctor: 'Dr. Lim', nextAppointment: '2026-02-25 10:20' },
  { id: 4, name: 'Neil Salazar', phone: '0995-334-1200', doctor: 'Dr. Cruz', nextAppointment: '2026-02-26 11:00' },
];

const emptyForm = { name: '', phone: '', doctor: '', nextAppointment: '' };

function PatientDirectory() {
  const [patients, setPatients] = useState(initialPatients);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredPatients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return patients;
    return patients.filter((patient) => {
      return (
        patient.name.toLowerCase().includes(normalizedQuery) ||
        patient.phone.toLowerCase().includes(normalizedQuery) ||
        patient.doctor.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [patients, query]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (patient) => {
    setEditingId(patient.id);
    setForm({
      name: patient.name,
      phone: patient.phone,
      doctor: patient.doctor,
      nextAppointment: patient.nextAppointment,
    });
    setIsModalOpen(true);
  };

  const savePatient = (event) => {
    event.preventDefault();
    if (!form.name || !form.phone || !form.doctor || !form.nextAppointment) return;

    if (editingId) {
      setPatients((prev) => prev.map((patient) => (patient.id === editingId ? { ...patient, ...form } : patient)));
    } else {
      const nextId = Math.max(...patients.map((patient) => patient.id)) + 1;
      setPatients((prev) => [...prev, { id: nextId, ...form }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl border border-blue-100 bg-white px-6 py-7 shadow-sm md:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Patient Directory</h1>
          <p className="mt-2 text-sm text-slate-600 md:text-base">Search patients, update records, and review upcoming appointments.</p>
        </header>

        <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-lg">
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
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button type="button" onClick={openAddModal} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              Add Patient
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
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
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="transition hover:bg-blue-50/60">
                      <td className="px-5 py-4 font-semibold text-slate-800">{patient.name}</td>
                      <td className="px-5 py-4 text-slate-600">{patient.phone}</td>
                      <td className="px-5 py-4 text-slate-600">{patient.doctor}</td>
                      <td className="px-5 py-4 text-slate-600">{patient.nextAppointment}</td>
                      <td className="px-5 py-4">
                        <button type="button" onClick={() => openEditModal(patient)} className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100">
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
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-slate-900">{editingId ? 'Edit Patient' : 'Add Patient'}</h2>
            <form onSubmit={savePatient} className="mt-4 space-y-3">
              <input type="text" placeholder="Full name" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input type="text" placeholder="Phone" value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input type="text" placeholder="Assigned doctor" value={form.doctor} onChange={(e) => setForm((prev) => ({ ...prev, doctor: e.target.value }))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input type="text" placeholder="YYYY-MM-DD HH:MM" value={form.nextAppointment} onChange={(e) => setForm((prev) => ({ ...prev, nextAppointment: e.target.value }))} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />

              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDirectory;
