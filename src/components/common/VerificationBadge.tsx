import React, { useState } from 'react';
import { ShieldCheck, Clock, AlertCircle, Info, X } from 'lucide-react';
import { VerificationStatus, VerificationCheckDetails } from '../../types/index.ts';

interface VerificationBadgeProps {
  status: VerificationStatus;
  details?: VerificationCheckDetails;
  showDetailsOnClick?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  details,
  showDetailsOnClick = true
}) => {
  const [showModal, setShowModal] = useState(false);

  if (status === 'verified') {
    return (
      <>
        <button
          type="button"
          onClick={() => showDetailsOnClick && setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
          title="Click to view verified credentials"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verified Pro</span>
        </button>

        {showModal && details && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Verified Credentials</h3>
                    <p className="text-xs text-slate-500">Transparent Trust & Safety Audit</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                  <div className="font-medium text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Government Identity Verification
                  </div>
                  <p className="text-slate-600 pl-3.5">
                    {details.govtIdChecked
                      ? details.govtIdType || 'Government ID verified via official DigiLocker database.'
                      : 'Government ID pending review.'}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                  <div className="font-medium text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Technical Skill & Portfolio Assessment
                  </div>
                  <p className="text-slate-600 pl-3.5">
                    {details.skillsAssessed
                      ? details.skillsAssessedNotes || 'Portfolio samples, code repositories, or production artifacts independently certified.'
                      : 'Skill assessment in progress.'}
                  </p>
                </div>

                {details.businessRegistrationChecked && (
                  <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                    <div className="font-medium text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Business Registration
                    </div>
                    <p className="text-slate-600 pl-3.5">
                      {details.businessRegistrationNumber || 'Verified MCA corporate registry & GSTIN active.'}
                    </p>
                  </div>
                )}

                {details.verifiedAt && (
                  <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Verified on:</span>
                    <span className="font-mono text-slate-600">
                      {new Date(details.verifiedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
        <Clock className="w-3.5 h-3.5 text-amber-600" />
        <span>Verification Pending</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
      <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
      <span>Unverified</span>
    </span>
  );
};
