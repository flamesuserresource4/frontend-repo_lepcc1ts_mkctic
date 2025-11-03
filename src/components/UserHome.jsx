import { useMemo, useState } from 'react';
import { Calendar, MapPin, Search, Stethoscope, User } from 'lucide-react';

const doctors = [
  { id: 'd1', name: 'Dr. Aisha Khan', spec: 'Cardiologist', city: 'Mumbai', rating: 4.8, mode: ['Online','Walk-in'] },
  { id: 'd2', name: 'Dr. Rohan Gupta', spec: 'Dermatologist', city: 'Delhi', rating: 4.6, mode: ['Online'] },
  { id: 'd3', name: 'Dr. Meera Iyer', spec: 'Pediatrician', city: 'Bengaluru', rating: 4.9, mode: ['Walk-in','Home'] },
  { id: 'd4', name: 'Dr. Kunal Shah', spec: 'Orthopedic', city: 'Mumbai', rating: 4.7, mode: ['Online','Walk-in'] },
];

export default function UserHome() {
  const [city, setCity] = useState('');
  const [term, setTerm] = useState('');
  const [tab, setTab] = useState('find');
  const [appointments, setAppointments] = useState([]);

  const results = useMemo(() => {
    return doctors.filter(d =>
      (city ? d.city.toLowerCase().includes(city.toLowerCase()) : true) &&
      (term ? (d.name.toLowerCase().includes(term.toLowerCase()) || d.spec.toLowerCase().includes(term.toLowerCase())) : true)
    );
  }, [city, term]);

  function book(d) {
    const appt = { id: `a-${Date.now()}`, doctor: d.name, spec: d.spec, date: new Date().toLocaleDateString(), mode: d.mode[0] };
    setAppointments(prev => [appt, ...prev]);
    setTab('my');
  }

  return (
    <section id="user-home" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">User Home</h2>
            <p className="text-slate-600">Find doctors, book appointments, and manage your records.</p>
          </div>
          <div className="inline-flex rounded-md border border-slate-200 overflow-hidden">
            <button onClick={()=>setTab('find')} className={`px-4 py-2 text-sm ${tab==='find'?'bg-sky-600 text-white':'bg-white text-slate-700'}`}>Find a Doctor</button>
            <button onClick={()=>setTab('book')} className={`px-4 py-2 text-sm ${tab==='book'?'bg-sky-600 text-white':'bg-white text-slate-700'}`}>Book Appointment</button>
            <button onClick={()=>setTab('my')} className={`px-4 py-2 text-sm ${tab==='my'?'bg-sky-600 text-white':'bg-white text-slate-700'}`}>My Appointments</button>
            <button onClick={()=>setTab('profile')} className={`px-4 py-2 text-sm ${tab==='profile'?'bg-sky-600 text-white':'bg-white text-slate-700'}`}>Profile</button>
          </div>
        </div>

        {tab === 'find' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Enter city" className="w-full rounded-md border-slate-300 pl-9" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Search by name or specialty</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input value={term} onChange={e=>setTerm(e.target.value)} placeholder="e.g. Cardiologist, Aisha" className="w-full rounded-md border-slate-300 pl-9" />
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <ul className="grid sm:grid-cols-2 gap-4">
                {results.map(d => (
                  <li key={d.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center text-slate-600">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{d.name}</p>
                        <p className="text-sm text-slate-600">{d.spec} • {d.city} • ⭐ {d.rating}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {d.mode.map(m => (
                            <span key={m} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button onClick={()=>book(d)} className="px-4 py-2 rounded-md bg-sky-600 text-white">Book</button>
                    </div>
                  </li>
                ))}
                {results.length === 0 && (
                  <li className="text-sm text-slate-600">No doctors found for your filters.</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {tab === 'book' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Select a slot</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['09:00','09:30','10:00','10:30','11:00','11:30','12:00','04:00','04:30','05:00'].map(t => (
                  <button key={t} className="px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50">{t}</button>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 rounded-md bg-sky-600 text-white inline-flex items-center gap-2"><Calendar className="w-4 h-4"/>Confirm Appointment</button>
                <button className="px-4 py-2 rounded-md border border-slate-200">Cancel</button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2">Summary</h4>
                <p className="text-sm text-slate-700">Consultation with a specialist at your chosen time. Options: Walk-in or Online.</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'my' && (
          <div className="border border-slate-200 rounded-lg">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">My Appointments</h3>
              <span className="text-xs text-slate-500">{appointments.length} total</span>
            </div>
            <ul className="divide-y divide-slate-200">
              {appointments.map(a => (
                <li key={a.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{a.doctor}</p>
                    <p className="text-sm text-slate-600">{a.spec} • {a.date}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-sky-50 text-sky-700 rounded">{a.mode}</span>
                </li>
              ))}
              {appointments.length === 0 && (
                <li className="p-4 text-sm text-slate-600">No appointments yet. Find a doctor to get started.</li>
              )}
            </ul>
          </div>
        )}

        {tab === 'profile' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                  <User className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Your Profile</p>
                  <p className="text-sm text-slate-600">Personal details and uploaded documents</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <ReadOnly label="Full name" value="—" />
                <ReadOnly label="Email" value="—" />
                <ReadOnly label="Mobile" value="—" />
                <ReadOnly label="Age" value="—" />
                <ReadOnly label="Gender" value="—" />
                <ReadOnly label="Blood group" value="—" />
                <ReadOnly label="Address" value="—" />
                <ReadOnly label="City" value="—" />
                <ReadOnly label="Vitals (self-entered)" value="BP, HR, SpO2, Temp" />
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-slate-900 mb-2">Documents</h4>
                <ul className="list-disc list-inside text-sm text-slate-700">
                  <li>Previous medical records</li>
                  <li>ID proofs (Aadhar, PAN)</li>
                  <li>Insurance (if any)</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2">Quick actions</h4>
                <div className="flex flex-wrap gap-2">
                  <button onClick={()=>setTab('find')} className="px-3 py-2 rounded-md bg-slate-900 text-white text-sm">Find Doctor</button>
                  <button onClick={()=>setTab('book')} className="px-3 py-2 rounded-md bg-sky-600 text-white text-sm">Book Slot</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ReadOnly({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}
