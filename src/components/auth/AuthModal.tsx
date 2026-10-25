import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { X, ShieldCheck, Briefcase, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../../types/index.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'employer'
}) => {
  const { registerUser } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [companyName, setCompanyName] = useState('');
  const [skills, setSkills] = useState('React, TypeScript');
  const [rate, setRate] = useState(1500);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !name.trim()) {
      setErrorMsg('Please enter both name and email address.');
      return;
    }

    registerUser(name, email, role, city);
    setSuccessMsg('Account registered successfully! Redirecting to your dedicated workspace...');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden text-xs">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm">
              {mode === 'register' ? 'Join PartimePro Instant' : 'Welcome Back'}
            </h3>
            <p className="text-[11px] text-slate-400">Trusted Indian Skilled Talent Marketplace</p>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-2.5 rounded bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Role Selection */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">Select Account Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  role === 'employer'
                    ? 'border-amber-500 bg-amber-50/60 text-amber-950 font-bold shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="w-5 h-5 text-amber-600" />
                <span>I Want to Hire</span>
                <span className="text-[10px] text-slate-500 font-normal">Business / Startup</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('professional')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  role === 'professional'
                    ? 'border-amber-500 bg-amber-50/60 text-amber-950 font-bold shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Zap className="w-5 h-5 text-amber-600" />
                <span>I Want to Work</span>
                <span className="text-[10px] text-slate-500 font-normal">Skilled Professional</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Vikram Iyer"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">Work / Business Email</label>
            <input
              type="email"
              placeholder="e.g. vikram@startup.in"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">Location / Hub</label>
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="Bengaluru">Bengaluru (Karnataka)</option>
              <option value="Mumbai">Mumbai (Maharashtra)</option>
              <option value="Delhi NCR">Delhi NCR / Gurugram</option>
              <option value="Hyderabad">Hyderabad (Telangana)</option>
              <option value="Pune">Pune (Maharashtra)</option>
              <option value="Chennai">Chennai (Tamil Nadu)</option>
              <option value="Ahmedabad">Ahmedabad (Gujarat)</option>
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 rounded-lg text-slate-700 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-xs cursor-pointer"
            >
              {mode === 'register' ? 'Complete Onboarding' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
