import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  ShieldCheck,
  Lock,
  AlertTriangle,
  FileCheck,
  Building2,
  Users,
  CheckCircle2,
  MapPin,
  PhoneCall,
  Scale
} from 'lucide-react';
import { SafetyModal } from './SafetyModal.tsx';

export const SafetyCenter: React.FC = () => {
  const { safetyReports, currentUser } = useApp();
  const [showReportModal, setShowReportModal] = useState(false);

  const userReports = safetyReports.filter(r => r.reporterId === currentUser.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-8 bg-slate-900 text-white rounded-2xl shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>PartimePro Instant Trust Standard</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Trust, Safety & Dispute Protection</h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          We combine government identity authentication, independent skill evidence reviews, transparent milestone terms, and on-site worker safety protocols so you can collaborate with total peace of mind.
        </p>
        <button
          onClick={() => setShowReportModal(true)}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>File a Confidential Report</span>
        </button>
      </div>

      {/* 4 Pillars of Marketplace Safety */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">DigiLocker Identity</h3>
          <p className="text-slate-600 leading-relaxed">
            Professionals undergo official DigiLocker XML hash verification for Aadhaar and PAN credentials. We strictly forbid anonymous and unverified identities.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">MCA & GSTIN Verification</h3>
          <p className="text-slate-600 leading-relaxed">
            Employers are validated against Ministry of Corporate Affairs (MCA) records, official GSTIN registrations, and corporate domain email verification.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Milestone Protection</h3>
          <p className="text-slate-600 leading-relaxed">
            Both parties agree on scope, deliverables, and compensation in advance. Payment records are held securely and released upon deliverable confirmation.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
          <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Dispute & Review Audit</h3>
          <p className="text-slate-600 leading-relaxed">
            Contested feedback or deliverable disagreements are mediated by human administrators. Users are never penalized on unverified single complaints.
          </p>
        </div>
      </div>

      {/* On-Site Job Safety Architecture */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-600" />
          <h2 className="text-base font-bold text-slate-900">On-Site Assignment Safety Protocol</h2>
        </div>
        <p className="text-slate-600 leading-relaxed max-w-3xl">
          While PartimePro Instant starts with remote skilled tasks, we have built the architecture to support local on-site assignments with strict physical safeguards:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Exact Physical Location</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Employers must provide exact floor, building, and security verification details before an on-site listing can be published.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Supervisor Identification</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Designated on-site supervisor name and verified mobile phone must be on record for direct point of contact.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Assignment Check-Ins</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Professionals have access to an instant check-in timestamp tool upon arrival and departure with optional trusted-contact alert.
            </p>
          </div>
        </div>
      </div>

      {/* User's Reports Status */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
        <h2 className="text-base font-bold text-slate-900">Your Filed Trust & Safety Reports</h2>
        {userReports.length === 0 ? (
          <p className="text-slate-500">You have no active or historical reports filed.</p>
        ) : (
          <div className="space-y-3">
            {userReports.map(rep => (
              <div key={rep.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 capitalize">
                    {rep.reportType.replace('_', ' ')}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      rep.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {rep.status}
                  </span>
                </div>
                <p className="text-slate-600 italic">"{rep.details}"</p>
                {rep.adminNotes && (
                  <div className="text-[11px] text-blue-700 bg-blue-50 p-2 rounded border border-blue-200">
                    <strong>Admin Update:</strong> {rep.adminNotes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showReportModal && (
        <SafetyModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
};
