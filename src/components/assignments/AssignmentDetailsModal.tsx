import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  X,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
  Lock,
  DollarSign
} from 'lucide-react';
import { Assignment } from '../../types/index.ts';
import { SafetyModal } from '../safety/SafetyModal.tsx';

interface AssignmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment;
}

export const AssignmentDetailsModal: React.FC<AssignmentDetailsModalProps> = ({
  isOpen,
  onClose,
  assignment
}) => {
  const { tasks, allUsers, currentUser } = useApp();
  const task = tasks.find(t => t.id === assignment.taskId);
  const employer = allUsers.find(u => u.id === assignment.employerId);
  const professional = allUsers.find(u => u.id === assignment.professionalId);

  const [showReportModal, setShowReportModal] = useState(false);

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full border border-slate-200 overflow-hidden text-xs">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-sm">Assignment Agreement #{assignment.id.slice(-6)}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Status & Contract Header */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="font-bold text-slate-900 text-sm">{task.title}</div>
              <p className="text-[11px] text-slate-500">
                Created: {new Date(assignment.confirmedAt).toLocaleDateString()}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-blue-100 text-blue-800">
              {assignment.status.replace('_', ' ')}
            </span>
          </div>

          {/* Parties */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Hiring Client</span>
              <div className="font-bold text-slate-900">{employer?.name}</div>
              <p className="text-slate-500 text-[11px]">{employer?.city}, India</p>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Assigned Pro</span>
              <div className="font-bold text-slate-900">{professional?.name}</div>
              <p className="text-slate-500 text-[11px]">{professional?.city}, India</p>
            </div>
          </div>

          {/* Scope & Deliverables */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Agreed Scope</h4>
            <p className="p-3 bg-slate-50 rounded-lg text-slate-600 leading-relaxed">
              {task.description}
            </p>
          </div>

          {/* Deliverables List */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Mandatory Deliverables</h4>
            <ul className="space-y-1">
              {task.requiredDeliverables.map((d, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* On-Site Protocol if applicable */}
          {task.workPreference === 'onsite' && (
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
              <div className="font-bold text-amber-950 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>On-Site Workplace Verification</span>
              </div>
              <p className="text-amber-800 text-[11px]">
                <strong>Address:</strong> {task.location || 'Verified client premises'}
              </p>
              {task.supervisorName && (
                <p className="text-amber-800 text-[11px]">
                  <strong>On-Site Supervisor:</strong> {task.supervisorName} ({task.supervisorPhone || 'Contact verified'})
                </p>
              )}
            </div>
          )}

          {/* Financial Breakdown */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Financial Terms & Escrow
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-600">Agreed Talent Payout:</span>
                <span className="font-mono font-bold text-slate-900">₹{assignment.agreedRateINR.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Platform Trust & Guarantee Fee (5%):</span>
                <span className="font-mono">₹{assignment.platformFeeINR.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Contract Value:</span>
                <span className="font-mono text-amber-600">₹{assignment.totalPayableINR.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Safety & Anti-Circumvention Notice */}
          <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-[11px] flex items-start gap-2">
            <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>
              All milestone sign-offs and fund disbursements are logged permanently for trust and safety. Never conduct payments outside PartimePro Instant.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={() => setShowReportModal(true)}
              className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Report Issue or Dispute</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {showReportModal && (
        <SafetyModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          reportedUserId={currentUser.role === 'employer' ? assignment.professionalId : assignment.employerId}
          reportedTaskId={assignment.taskId}
        />
      )}
    </div>
  );
};
