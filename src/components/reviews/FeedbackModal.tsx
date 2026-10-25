import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { X, Star, CheckCircle2, AlertCircle } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentId: string;
  taskId: string;
  revieweeId: string;
  reviewerRole: 'employer' | 'professional';
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  assignmentId,
  taskId,
  revieweeId,
  reviewerRole
}) => {
  const { currentUser, allUsers, submitReview } = useApp();
  const reviewee = allUsers.find(u => u.id === revieweeId);

  const [workQuality, setWorkQuality] = useState(5);
  const [communication, setCommunication] = useState(5);
  const [timeliness, setTimeliness] = useState(5);
  const [deliverablesCompleted, setDeliverablesCompleted] = useState(true);
  const [paymentHonored, setPaymentHonored] = useState(true);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview({
      assignmentId,
      taskId,
      reviewerId: currentUser.id,
      revieweeId,
      reviewerRole,
      workQualityScore: workQuality,
      communicationScore: communication,
      timelinessScore: timeliness,
      deliverablesCompleted,
      paymentCompletedAsAgreed: paymentHonored,
      comments
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  const renderStarSelector = (score: number, setScore: (val: number) => void) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(val => (
        <button
          key={val}
          type="button"
          onClick={() => setScore(val)}
          className="p-1 cursor-pointer focus:outline-none"
        >
          <Star
            className={`w-5 h-5 ${
              val <= score ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
            } transition-colors`}
          />
        </button>
      ))}
      <span className="ml-2 font-mono font-bold text-slate-800 text-xs self-center">
        {score} / 5
      </span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden text-xs">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm">Submit Verified Peer Review</h3>
            <p className="text-[11px] text-slate-400">Structured assignment feedback</p>
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
            <h4 className="font-bold text-slate-900 text-base">Feedback Recorded!</h4>
            <p className="text-slate-500">
              Your verified review updates the reputation score permanently on PartimePro Instant.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <img
                src={reviewee?.avatarUrl}
                alt={reviewee?.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold">Reviewing</span>
                <div className="font-bold text-slate-900 text-xs">{reviewee?.name}</div>
              </div>
            </div>

            {/* Ratings */}
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Work Quality & Precision</label>
                {renderStarSelector(workQuality, setWorkQuality)}
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Communication & Responsiveness</label>
                {renderStarSelector(communication, setCommunication)}
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Timeliness & Adherence to Deadlines</label>
                {renderStarSelector(timeliness, setTimeliness)}
              </div>
            </div>

            {/* Factual Checks */}
            <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block text-[11px]">Factual Verification</span>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={deliverablesCompleted}
                  onChange={e => setDeliverablesCompleted(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span className="text-slate-700">All agreed deliverables were completed fully</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={paymentHonored}
                  onChange={e => setPaymentHonored(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span className="text-slate-700">Financial compensation terms were honored without dispute</span>
              </label>
            </div>

            {/* Comments */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Written Testimonial / Feedback</label>
              <textarea
                rows={3}
                placeholder="Share specific insights regarding speed, domain mastery, and professionalism..."
                value={comments}
                onChange={e => setComments(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
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
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-xs cursor-pointer"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
