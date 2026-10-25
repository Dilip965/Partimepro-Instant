import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { X, CheckCircle, ShieldCheck, Zap, Bookmark, BookmarkCheck } from 'lucide-react';
import { Task, ProfessionalProfile } from '../../types/index.ts';

interface SendOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  professional: ProfessionalProfile;
  initialTaskId?: string;
}

export const SendOfferModal: React.FC<SendOfferModalProps> = ({
  isOpen,
  onClose,
  professional,
  initialTaskId
}) => {
  const { tasks, currentUser, sendOffer, allUsers, isProfessionalSaved, saveProfessional, toggleSaveProfessional } = useApp();
  const employerTasks = tasks.filter(t => t.employerId === currentUser.id && t.status !== 'completed' && t.status !== 'cancelled');

  const [selectedTaskId, setSelectedTaskId] = useState(initialTaskId || employerTasks[0]?.id || '');
  const targetTask = tasks.find(t => t.id === selectedTaskId) || employerTasks[0];

  const proUser = allUsers.find(u => u.id === professional.userId);
  const isSaved = isProfessionalSaved(professional.userId);
  const [saveToBench, setSaveToBench] = useState<boolean>(true);
  const [offerRate, setOfferRate] = useState<number>(targetTask?.budgetINR || professional.fixedTaskMinRate);
  const [coverNote, setCoverNote] = useState(
    `Hi ${proUser?.name || 'there'}, we were impressed by your verified portfolio and rapid availability. We'd love to partner with you for this task.`
  );
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskId) return;

    sendOffer(selectedTaskId, professional.userId, offerRate, coverNote);
    if (saveToBench) {
      saveProfessional(professional.userId);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="font-bold text-sm">Send Instant Task Offer</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Task Offer Dispatched!</h4>
            <p className="text-xs text-slate-500">
              {proUser?.name} has been notified via instant in-app dispatch. You will receive an alert once accepted.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-6 space-y-4 text-xs">
            {/* Pro Preview with Save Toggle */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={proUser?.avatarUrl}
                  alt={proUser?.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-slate-900">{proUser?.name}</div>
                  <div className="text-[11px] text-slate-500">{professional.headline}</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                    Standard Rate: ₹{professional.hourlyRate}/hr · Min Task: ₹{professional.fixedTaskMinRate}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleSaveProfessional(professional.userId)}
                className={`p-2 rounded-lg border transition-colors cursor-pointer shrink-0 ${
                  isSaved
                    ? 'bg-amber-100 border-amber-300 text-amber-800'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
                title={isSaved ? 'Remove from Saved' : 'Save to my talent bench'}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4 fill-amber-600" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>

            {/* Select Task */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Select Open Task</label>
              {employerTasks.length === 0 ? (
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg">
                  You have no open tasks. Please create a task first.
                </div>
              ) : (
                <select
                  value={selectedTaskId}
                  onChange={e => {
                    setSelectedTaskId(e.target.value);
                    const t = tasks.find(tsk => tsk.id === e.target.value);
                    if (t) setOfferRate(t.budgetINR);
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  required
                >
                  {employerTasks.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.title} (Budget: ₹{t.budgetINR.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Proposed Rate */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Proposed Compensation (₹ INR)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={offerRate}
                  onChange={e => setOfferRate(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-300 font-mono font-bold"
                  required
                />
              </div>
              <div className="pt-1 text-[11px] text-slate-400 flex items-center justify-between">
                <span>PartimePro Platform Fee (5%):</span>
                <span className="font-mono">₹{Math.round(offerRate * 0.05).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Personalized Offer Note</label>
              <textarea
                rows={3}
                value={coverNote}
                onChange={e => setCoverNote(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
                required
              />
            </div>

            {/* Fee Transparency */}
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Agreed Talent Payout:</span>
                <span className="font-mono font-semibold">₹{offerRate.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Platform Assurance & Trust:</span>
                <span className="font-mono">₹{Math.round(offerRate * 0.05).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>Total Due Upon Completion:</span>
                <span className="font-mono text-amber-600">₹{(offerRate + Math.round(offerRate * 0.05)).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Save to bench checkbox */}
            <div className="p-2.5 rounded bg-amber-50/70 border border-amber-200/80">
              <label className="flex items-center gap-2 cursor-pointer text-slate-800">
                <input
                  type="checkbox"
                  checked={saveToBench}
                  onChange={e => setSaveToBench(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
                />
                <span className="font-medium text-[11px] text-amber-950">
                  Save {proUser?.name} to my Saved Professionals list for future re-hiring
                </span>
              </label>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={employerTasks.length === 0}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-xs cursor-pointer disabled:opacity-50"
              >
                Send Offer Now
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
