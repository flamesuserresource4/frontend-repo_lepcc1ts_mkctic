import HeroSection from './components/HeroSection';
import RoleAuth from './components/RoleAuth';
import DoctorDashboard from './components/DoctorDashboard';
import UserHome from './components/UserHome';

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <HeroSection />
      <RoleAuth />
      <DoctorDashboard />
      <UserHome />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-sky-600" />
          <span className="font-semibold">HealthIon</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
          <a href="#auth" className="hover:text-slate-900">Get Started</a>
          <a href="#doctor-dashboard" className="hover:text-slate-900">Doctor</a>
          <a href="#user-home" className="hover:text-slate-900">User</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#auth" className="px-3 py-1.5 rounded-md bg-sky-600 text-white text-sm">Sign in</a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t border-slate-200 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-600">© {new Date().getFullYear()} HealthIon. All rights reserved.</p>
        <div className="text-sm text-slate-600">Built for accessible, preventive, and data-driven healthcare.</div>
      </div>
    </footer>
  );
}

export default App;
