import { useMemo, useState } from 'react';
import { User, Stethoscope, Shield, Upload, FileText, LogIn } from 'lucide-react';

const initialDoctor = {
  basic: { fullName: '', email: '', mobile: '', otpEmail: '', otpMobile: '', verified: false },
  personal: { age: '', gender: '', city: '', address: '' },
  professional: {
    certificateName: '', councilNumber: '', councilName: '', councilYear: '',
    specialization: '', qualifications: '', experienceYears: '', hospitalClinic: '', awards: ''
  },
  documents: { regCert: null, qualProof: null, idAadhar: null, idPan: null, introVideo: null, photoId: null },
  security: { password: '', confirm: '', membershipId: '' }
};

const initialUser = {
  basic: { fullName: '', email: '', mobile: '', otpEmail: '', otpMobile: '', verified: false },
  profile: { age: '', gender: '', bloodGroup: '', address: '', city: '' },
  records: { previousDocs: [] },
  ids: { aadhar: null, pan: null },
  insurance: { hasInsurance: 'no', policyNumber: '', providerName: '', docs: [] }
};

export default function RoleAuth() {
  const [role, setRole] = useState('doctor');
  const [step, setStep] = useState(1);
  const [doctor, setDoctor] = useState(initialDoctor);
  const [user, setUser] = useState(initialUser);
  const [finished, setFinished] = useState(false);

  const current = role === 'doctor' ? doctor : user;

  const totalSteps = useMemo(() => {
    return role === 'doctor' ? 5 : 4; // Doctor: Basic -> Personal -> Professional/Docs -> Security -> Done; User: Basic -> Profile/Records -> IDs/Insurance -> Done
  }, [role]);

  function handleBasicVerify() {
    // Simulate dual OTP verification
    if (current.basic.email && current.basic.mobile && current.basic.otpEmail && current.basic.otpMobile) {
      const upd = { ...current, basic: { ...current.basic, verified: true } };
      role === 'doctor' ? setDoctor(upd) : setUser(upd);
      next();
    }
  }

  function next() {
    if (step < totalSteps) setStep(step + 1);
    else setFinished(true);
  }
  function back() { if (step > 1) setStep(step - 1); }

  function onChange(path, value) {
    const [scope, key] = path.split('.');
    const upd = { ...current, [scope]: { ...current[scope], [key]: value } };
    role === 'doctor' ? setDoctor(upd) : setUser(upd);
  }

  function onFile(path, files) {
    const [scope, key] = path.split('.');
    const upd = { ...current, [scope]: { ...current[scope], [key]: files?.[0] || null } };
    role === 'doctor' ? setDoctor(upd) : setUser(upd);
  }

  function onMultiFiles(path, files) {
    const [scope, key] = path.split('.');
    const upd = { ...current, [scope]: { ...current[scope], [key]: Array.from(files || []) } };
    role === 'doctor' ? setDoctor(upd) : setUser(upd);
  }

  function generateMembershipId() {
    const id = Math.floor(100000 + Math.random() * 900000).toString();
    const upd = { ...doctor, security: { ...doctor.security, membershipId: id } };
    setDoctor(upd);
  }

  function finish() {
    setFinished(true);
  }

  return (
    <section id="auth" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Get started</h2>
            <p className="text-slate-600">Register or sign in as a Doctor or User. OTP verification is built-in for both email and mobile.</p>
          </div>
          <div className="inline-flex rounded-md border border-slate-200 overflow-hidden">
            <button onClick={() => { setRole('doctor'); setStep(1); }} className={`px-4 py-2 flex items-center gap-2 ${role==='doctor' ? 'bg-sky-600 text-white' : 'bg-white text-slate-700'}`}>
              <Stethoscope className="w-4 h-4" /> Doctor
            </button>
            <button onClick={() => { setRole('user'); setStep(1); }} className={`px-4 py-2 flex items-center gap-2 ${role==='user' ? 'bg-sky-600 text-white' : 'bg-white text-slate-700'}`}>
              <User className="w-4 h-4" /> User
            </button>
          </div>
        </div>

        {!finished && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <Progress step={step} total={totalSteps} />

            {/* Step content */}
            {step === 1 && (
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Input label="Full name" value={current.basic.fullName} onChange={v=>onChange('basic.fullName', v)} />
                <Input label="Email" type="email" value={current.basic.email} onChange={v=>onChange('basic.email', v)} />
                <Input label="Mobile number" value={current.basic.mobile} onChange={v=>onChange('basic.mobile', v)} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="OTP (Email)" value={current.basic.otpEmail} onChange={v=>onChange('basic.otpEmail', v)} />
                  <Input label="OTP (Mobile)" value={current.basic.otpMobile} onChange={v=>onChange('basic.otpMobile', v)} />
                </div>
                <div className="md:col-span-2 flex items-center justify-between">
                  <span className="text-sm text-slate-600">Enter OTPs sent to your email and phone to verify.</span>
                  <button onClick={handleBasicVerify} className="px-4 py-2 bg-sky-600 text-white rounded-md inline-flex items-center gap-2"><Shield className="w-4 h-4"/> Verify & Continue</button>
                </div>
              </div>
            )}

            {step === 2 && role === 'doctor' && (
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Input label="Age" value={doctor.personal.age} onChange={v=>onChange('personal.age', v)} />
                <Select label="Gender" value={doctor.personal.gender} onChange={v=>onChange('personal.gender', v)} options={["Male","Female","Other"]} />
                <Input label="City" value={doctor.personal.city} onChange={v=>onChange('personal.city', v)} />
                <Input label="Address" value={doctor.personal.address} onChange={v=>onChange('personal.address', v)} />
                <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
                  <Input label="Name (as per certificate)" value={doctor.professional.certificateName} onChange={v=>onChange('professional.certificateName', v)} />
                  <Input label="Council Registration Number" value={doctor.professional.councilNumber} onChange={v=>onChange('professional.councilNumber', v)} />
                  <Input label="Council Name" value={doctor.professional.councilName} onChange={v=>onChange('professional.councilName', v)} />
                  <Input label="Council Registration Year" value={doctor.professional.councilYear} onChange={v=>onChange('professional.councilYear', v)} />
                  <Input label="Specialisation" value={doctor.professional.specialization} onChange={v=>onChange('professional.specialization', v)} />
                  <Input label="Qualifications" value={doctor.professional.qualifications} onChange={v=>onChange('professional.qualifications', v)} />
                  <Input label="Years of Experience" value={doctor.professional.experienceYears} onChange={v=>onChange('professional.experienceYears', v)} />
                  <Input label="Hospital/Clinic/Services" value={doctor.professional.hospitalClinic} onChange={v=>onChange('professional.hospitalClinic', v)} />
                  <Input label="Awards/Recognitions" value={doctor.professional.awards} onChange={v=>onChange('professional.awards', v)} />
                </div>
              </div>
            )}

            {step === 2 && role === 'user' && (
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Input label="Age" value={user.profile.age} onChange={v=>onChange('profile.age', v)} />
                <Select label="Gender" value={user.profile.gender} onChange={v=>onChange('profile.gender', v)} options={["Male","Female","Other"]} />
                <Select label="Blood group" value={user.profile.bloodGroup} onChange={v=>onChange('profile.bloodGroup', v)} options={["A+","A-","B+","B-","AB+","AB-","O+","O-"]} />
                <Input label="Address" value={user.profile.address} onChange={v=>onChange('profile.address', v)} />
                <Input label="Location / City" value={user.profile.city} onChange={v=>onChange('profile.city', v)} />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Previous medical records</label>
                  <input type="file" multiple onChange={e=>onMultiFiles('records.previousDocs', e.target.files)} className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200" />
                  <p className="text-xs text-slate-500 mt-1">Upload lab reports, prescriptions, or discharge summaries.</p>
                </div>
              </div>
            )}

            {step === 3 && role === 'doctor' && (
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <FileInput label="Medical registration certificate" onChange={f=>onFile('documents.regCert', f)} />
                <FileInput label="Qualification proof (PG/MS)" onChange={f=>onFile('documents.qualProof', f)} />
                <FileInput label="Aadhar (mandatory)" onChange={f=>onFile('documents.idAadhar', f)} />
                <FileInput label="PAN (mandatory)" onChange={f=>onFile('documents.idPan', f)} />
                <FileInput label="Introduce yourself (video)" accept="video/*" onChange={f=>onFile('documents.introVideo', f)} />
                <FileInput label="Photo ID" onChange={f=>onFile('documents.photoId', f)} />
                <div className="md:col-span-2 flex items-center justify-between">
                  <button onClick={generateMembershipId} className="px-4 py-2 bg-slate-900 text-white rounded-md">Generate Membership ID</button>
                  {doctor.security.membershipId && (
                    <span className="text-sm text-slate-700">Your ID: <span className="font-semibold">{doctor.security.membershipId}</span></span>
                  )}
                </div>
              </div>
            )}

            {step === 3 && role === 'user' && (
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <FileInput label="Aadhar" onChange={f=>onFile('ids.aadhar', f)} />
                <FileInput label="PAN" onChange={f=>onFile('ids.pan', f)} />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Do you have health insurance?</label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center gap-2 text-sm text-slate-700"><input type="radio" name="ins" checked={user.insurance.hasInsurance==='yes'} onChange={()=>onChange('insurance.hasInsurance','yes')} /> Yes</label>
                    <label className="inline-flex items-center gap-2 text-sm text-slate-700"><input type="radio" name="ins" checked={user.insurance.hasInsurance==='no'} onChange={()=>onChange('insurance.hasInsurance','no')} /> No</label>
                  </div>
                </div>
                {user.insurance.hasInsurance === 'yes' && (
                  <>
                    <Input label="Policy number" value={user.insurance.policyNumber} onChange={v=>onChange('insurance.policyNumber', v)} />
                    <Input label="Provider name" value={user.insurance.providerName} onChange={v=>onChange('insurance.providerName', v)} />
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Insurance documents</label>
                      <input type="file" multiple onChange={e=>onMultiFiles('insurance.docs', e.target.files)} className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200" />
                    </div>
                  </>
                )}
              </div>
            )}

            {step === 4 && role === 'doctor' && (
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Input label="Create password" type="password" value={doctor.security.password} onChange={v=>onChange('security.password', v)} />
                <Input label="Re-enter password" type="password" value={doctor.security.confirm} onChange={v=>onChange('security.confirm', v)} />
                <div className="md:col-span-2">
                  <button onClick={finish} className="px-5 py-2 bg-sky-600 text-white rounded-md inline-flex items-center gap-2"><LogIn className="w-4 h-4"/> Complete Registration</button>
                </div>
              </div>
            )}

            {step === 4 && role === 'user' && (
              <div className="mt-6">
                <div className="p-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800">
                  Your details and documents will be verified by our partner. You can continue to your home page while verification happens in the background.
                </div>
                <div className="mt-4">
                  <button onClick={finish} className="px-5 py-2 bg-sky-600 text-white rounded-md inline-flex items-center gap-2"><LogIn className="w-4 h-4"/> Continue to Home</button>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <button disabled={step===1} onClick={back} className={`px-4 py-2 rounded-md border ${step===1? 'opacity-50 cursor-not-allowed border-slate-200 text-slate-400' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}>Back</button>
              <button onClick={next} className="px-4 py-2 rounded-md bg-slate-900 text-white">Next</button>
            </div>
          </div>
        )}

        {finished && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 mt-6">
            <h3 className="text-emerald-900 font-semibold mb-1">You're all set!</h3>
            <p className="text-emerald-800 text-sm">{role === 'doctor' ? 'Doctor registration complete. You can access your dashboard below.' : 'User setup complete. Jump to your personalized home experience below.'}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Progress({ step, total }) {
  const pct = Math.round((step - 1) / (total - 1) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-2 text-xs text-slate-600">
        <span>Step {step} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full bg-sky-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text' }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} className="w-full rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500 text-slate-900" />
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <select value={value} onChange={e=>onChange(e.target.value)} className="w-full rounded-md border-slate-300 focus:border-sky-500 focus:ring-sky-500 text-slate-900">
        <option value="">Select...</option>
        {options.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
      </select>
    </label>
  );
}

function FileInput({ label, accept, onChange }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <div className="flex items-center gap-3">
        <Upload className="w-4 h-4 text-slate-500" />
        <input type="file" accept={accept} onChange={e=>onChange(e.target.files)} className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200" />
      </div>
    </label>
  );
}
