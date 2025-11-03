import { useState } from 'react';
import { Bell, Calendar, FileText, User } from 'lucide-react';

const mockAppointments = [
  { id: 1, name: 'Rahul Sharma', time: '09:30 AM', type: 'Walk-in' },
  { id: 2, name: 'Ananya Verma', time: '10:15 AM', type: 'Online' },
  { id: 3, name: 'Arjun Mehta', time: '12:00 PM', type: 'Walk-in' },
  { id: 4, name: 'Priya Singh', time: '04:30 PM', type: 'Online' },
];

export default function DoctorDashboard() {
  const [notifications, setNotifications] = useState([
    { id: 'n1', text: 'New consultation request from Neha (Online, 15 min slot).', time: 'Just now' },
  ]);

  function accept(id) { setNotifications(prev => prev.filter(n => n.id !== id)); }
  function reject(id) { setNotifications(prev => prev.filter(n => n.id !== id)); }

  const todayCount = mockAppointments.length;
  const walkinCount = mockAppointments.filter(a => a.type === 'Walk-in').length;
  const onlineCount = mockAppointments.filter(a => a.type === 'Online').length;

  return (
    <section id="doctor-dashboard" className="py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Doctor Dashboard</h2>
            <p className="text-slate-600">Welcome back, Dr. Patel</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
              <User className="w-6 h-6 text-slate-600" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <StatCard icon={<Calendar className="w-5 h-5" />} label="Appointments today" value={todayCount} />
          <StatCard icon={<FileText className="w-5 h-5" />} label="Walk-in" value={walkinCount} />
          <StatCard icon={<FileText className="w-5 h-5" />} label="Online" value={onlineCount} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-lg">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Today's Appointments</h3>
              <span className="text-xs text-slate-500">{todayCount} patients</span>
            </div>
            <ul className="divide-y divide-slate-200">
              {mockAppointments.map(a => (
                <li key={a.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{a.name}</p>
                    <p className="text-sm text-slate-600">{a.time}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${a.type === 'Online' ? 'bg-sky-50 text-sky-700' : 'bg-emerald-50 text-emerald-700'}`}>{a.type}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg">
              <div className="p-4 border-b border-slate-200 flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-600" />
                <h3 className="font-semibold text-slate-900">Notifications</h3>
              </div>
              <div className="p-4 space-y-3">
                {notifications.length === 0 && (
                  <p className="text-sm text-slate-600">No new requests.</p>
                )}
                {notifications.map(n => (
                  <div key={n.id} className="p-3 rounded-md border border-slate-200">
                    <p className="text-sm text-slate-800">{n.text}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-slate-500">{n.time}</span>
                      <div className="flex gap-2">
                        <button onClick={()=>accept(n.id)} className="px-3 py-1 rounded-md text-xs bg-emerald-600 text-white">Accept</button>
                        <button onClick={()=>reject(n.id)} className="px-3 py-1 rounded-md text-xs bg-rose-600 text-white">Reject</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600">{label}</p>
          <p className="text-2xl font-semibold text-slate-900">{value}</p>
        </div>
        <div className="w-10 h-10 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
