import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { X, ShieldAlert, CheckCircle2, AlertOctagon, Lock } from 'lucide-react';
import { SafetyReport } from '../../types/index.ts';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportedUserId?: string;
  reportedTaskId?: string;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({
  isOpen,
  onClose,
  reportedUserId,
  reportedTaskId
}) => {
  const { currentUser, submitSafetyReport, allUsers, tasks } = useApp();
  const reportedUser = allUsers.find(u => u.id === reportedUserId);
  const reportedTask = tasks.find(t => t.id === reportedTaskId);

  const [reportType, setReportType] = useState<SafetyReport['reportType']>('off_platform_payment');
  const [severity, setSeverity] = useState<SafetyReport['severity']>('medium');
  const [details, setDetails] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    submitSafetyReport({
      reporterId: currentUser.id,
      reportedUserId,
      reportedTaskId,
      reportType,
      severity,
      details,
      evidenceUrls: evidenceUrl.trim() ? [evidenceUrl.trim()] : []
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden text-xs">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <h3 className="font-bold text-sm">Trust & Safety Escalation</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Report Lodged with Trust Squad</h4>
            <p className="text-slate-500 leading-relaxed">
              Your safety report is encrypted and queued for immediate administrative investigation. We will update you via in-app notification.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 bg-red-50/70 border border-red-200 rounded-xl space-y-1">
              <span className="font-bold text-red-950 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-red-600" />
                Confidential Reporting Channel
              </span>
              <p className="text-red-800 text-[11px] leading-relaxed">
                The reported party will not be informed of your identity. PartimePro administrators will review conversation audits and transaction logs.
              </p>
            </div>

            {(reportedUser || reportedTask) && (
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-slate-700 space-y-0.5">
                {reportedUser && (
                  <div>Reporting User: <strong>{reportedUser.name}</strong></div>
                )}
                {reportedTask && (
                  <div>Related Task: <strong>{reportedTask.title}</strong></div>
                )}
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Issue Category</label>
              <select
                value={reportType}
                onChange={e => setReportType(e.target.value as any)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="off_platform_payment">Off-Platform Payment Solicitation</option>
                <option value="fake_profile">Misrepresented Skills / Identity Fraud</option>
                <option value="inappropriate">Harassment or Inappropriate Conduct</option>
                <option value="spam">Spam or Unsolicited Pitch</option>
                <option value="safety_incident">On-Site Safety Concern / Workplace Hazard</option>
                <option value="other">Other Violation of Platform Terms</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Severity Assessment</label>
              <div className="grid grid-cols-4 gap-2">
                {(['low', 'medium', 'high', 'critical'] as const).map(sev => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSeverity(sev)}
                    className={`py-1.5 rounded font-medium capitalize border transition-colors ${
                      severity === sev
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Incident Description & Facts <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Detail what occurred, dates, requested actions, or specific messages..."
                value={details}
                onChange={e => setDetails(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Supporting Screenshot URL (Optional)</label>
              <input
                type="text"
                placeholder="https://..."
                value={evidenceUrl}
                onChange={e => setEvidenceUrl(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
              />
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
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg shadow-xs cursor-pointer"
              >
                Submit Incident Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
