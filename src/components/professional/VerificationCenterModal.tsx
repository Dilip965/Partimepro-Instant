import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Upload, Link2, FileCheck } from 'lucide-react';

interface VerificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationCenterModal: React.FC<VerificationCenterModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, submitVerificationRequest, professionalProfiles } = useApp();
  const pro = professionalProfiles[currentUser.id];

  const [verificationType, setVerificationType] = useState<'identity' | 'skills' | 'business'>('identity');
  const [docLink, setDocLink] = useState('');
  const [docLinksList, setDocLinksList] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleAddDoc = () => {
    if (docLink.trim()) {
      setDocLinksList([...docLinksList, docLink.trim()]);
      setDocLink('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (docLinksList.length === 0 && !docLink.trim()) return;

    const allDocs = docLink.trim() ? [...docLinksList, docLink.trim()] : docLinksList;
    submitVerificationRequest(verificationType, allDocs, notes);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden text-xs">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm">Trust & Verification Center</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Verification Submitted</h4>
            <p className="text-slate-500">
              Our manual Trust & Compliance team will audit your submission within 12 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
              <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Fake Profile Guarantee</span>
              </div>
              <p className="text-emerald-800 text-[11px] leading-relaxed">
                PartimePro Instant reviews all government credentials and portfolio samples manually. Verified members earn 3.4x more job offers.
              </p>
            </div>

            {/* Type selector */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Verification Category</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setVerificationType('identity')}
                  className={`py-2 rounded-lg font-medium border text-center transition-colors ${
                    verificationType === 'identity'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Govt Identity
                </button>
                <button
                  type="button"
                  onClick={() => setVerificationType('skills')}
                  className={`py-2 rounded-lg font-medium border text-center transition-colors ${
                    verificationType === 'skills'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Skills / Code
                </button>
                <button
                  type="button"
                  onClick={() => setVerificationType('business')}
                  className={`py-2 rounded-lg font-medium border text-center transition-colors ${
                    verificationType === 'business'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  GST / Entity
                </button>
              </div>
            </div>

            {/* Document or Link Input */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                {verificationType === 'identity'
                  ? 'DigiLocker Share Code or Document URL'
                  : verificationType === 'skills'
                  ? 'GitHub Repo, Live Figma, or Portfolio Showcase Link'
                  : 'GSTIN Registration / MCA Certificate Link'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://... or DigiLocker XML hash"
                  value={docLink}
                  onChange={e => setDocLink(e.target.value)}
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={handleAddDoc}
                  className="px-3 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
                >
                  Add
                </button>
              </div>

              {docLinksList.length > 0 && (
                <div className="mt-2 space-y-1">
                  {docLinksList.map((doc, idx) => (
                    <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded flex justify-between">
                      <span className="font-mono text-[11px] text-slate-700 truncate">{doc}</span>
                      <button
                        type="button"
                        onClick={() => setDocLinksList(docLinksList.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Additional Context for Admin Reviewers</label>
              <textarea
                rows={3}
                placeholder="Mention any client references, specific certifications or background context..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-2xs cursor-pointer"
              >
                Submit for Audit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
