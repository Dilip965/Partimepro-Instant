import React from 'react';
import { ShieldCheck, Lock, HeartHandshake, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Zap className="w-4 h-4 fill-slate-950" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                PartimePro <span className="text-amber-400">Instant</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India's trust-first, on-demand marketplace connecting high-growth businesses with certified skilled professionals available to execute immediately.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>DigiLocker & MCA Registry Compliant</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs mb-3 tracking-wider uppercase">Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('talent_directory')} className="hover:text-white transition-colors cursor-pointer">
                  Browse Available Professionals
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('employer_dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  Hire On-Demand Talent
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('professional_dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  Earn with Verified Skills
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('landing')} className="hover:text-white transition-colors cursor-pointer">
                  How Instant Matching Works
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs mb-3 tracking-wider uppercase">Trust & Safety</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('safety_center')} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Identity & Skill Verification</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('safety_center')} className="hover:text-white transition-colors cursor-pointer">
                  On-Site Safety Protocols
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('safety_center')} className="hover:text-white transition-colors cursor-pointer">
                  Dispute & Review Resolution
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('safety_center')} className="hover:text-white transition-colors cursor-pointer">
                  Report Suspicious Activity
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs mb-3 tracking-wider uppercase">Operational Hub</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              HQ: 100 Ft Road, Indiranagar, Bengaluru, KA 560038
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Regional Center: BKC, Bandra East, Mumbai, MH 400051
            </p>
            <div className="mt-4 p-2.5 rounded bg-slate-800/80 border border-slate-700/60 text-[11px] leading-tight text-slate-300 flex items-start gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>24/7 Human Trust Escalation Squad available for all confirmed platform assignments.</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} PartimePro Instant Technologies Pvt Ltd. All rights reserved.
          </div>
          <div className="text-center md:text-right max-w-xl text-[10px] text-slate-400 leading-normal">
            Notice: Matching speed depends on skill specificity, real-time verified availability, and task scope. While verification significantly reduces risk through government identity & assessment audits, it does not replace mutual diligence.
          </div>
        </div>
      </div>
    </footer>
  );
};
