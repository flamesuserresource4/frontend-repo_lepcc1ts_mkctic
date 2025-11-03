import Spline from '@splinetool/react-spline';
import { HeartPulse } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[520px] overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/20 pointer-events-none" />

      <div className="relative h-full max-w-6xl mx-auto px-6 flex items-center">
        <div className="text-white max-w-2xl">
          <div className="flex items-center gap-2 text-sky-300 mb-4">
            <HeartPulse className="w-5 h-5" />
            <span className="text-sm tracking-wide">Unified Digital Healthcare Network</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">HealthIon</h1>
          <p className="mt-4 text-slate-200 text-lg">
            Connect patients, doctors, diagnostics, pharmacies, and wellness partners in one seamless platform. Online consultations, lab bookings, medical records, and AI health insights — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#auth" className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-sky-500 hover:bg-sky-600 transition text-white font-medium">
              Get Started
            </a>
            <a href="#user-home" className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-white/10 hover:bg-white/20 transition text-white font-medium">
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
