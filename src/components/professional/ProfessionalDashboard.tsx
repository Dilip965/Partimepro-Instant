import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Zap,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldCheck,
  Star,
  DollarSign,
  TrendingUp,
  MessageSquare,
  FileCheck,
  Send,
  Upload,
  AlertCircle
} from 'lucide-react';
import { VerificationBadge } from '../common/VerificationBadge.tsx';
import { VerificationCenterModal } from './VerificationCenterModal.tsx';
import { AvailabilityStatus, Offer, Assignment } from '../../types/index.ts';
import { FeedbackModal } from '../reviews/FeedbackModal.tsx';
import { AssignmentDetailsModal } from '../assignments/AssignmentDetailsModal.tsx';

export const ProfessionalDashboard: React.FC = () => {
  const {
    currentUser,
    professionalProfiles,
    offers,
    assignments,
    tasks,
    allUsers,
    reviews,
    respondToOffer,
    updateProfessionalAvailability,
    submitDeliverables,
    getOrCreateConversation,
    setActiveView
  } = useApp();

  const pro = professionalProfiles[currentUser.id] || {
    userId: currentUser.id,
    headline: 'Skilled Professional',
    bio: '',
    skills: [],
    hourlyRate: 1500,
    fixedTaskMinRate: 4000,
    experienceYears: 4,
    experienceLevel: 'senior',
    workPreference: 'remote',
    availability: 'available_now',
    availabilityLastConfirmedAt: new Date().toISOString(),
    verificationStatus: 'verified',
    verificationDetails: {
      govtIdChecked: true,
      skillsAssessed: true,
      businessRegistrationChecked: false
    },
    portfolio: [],
    completedAssignmentsCount: 19,
    averageRating: 4.95,
    ratingsCount: 19,
    totalEarningsINR: 238000,
    profileCompleteness: 100
  };

  const incomingOffers = offers.filter(o => o.professionalId === currentUser.id && o.status === 'pending');
  const pastOffers = offers.filter(o => o.professionalId === currentUser.id && o.status !== 'pending');
  const myAssignments = assignments.filter(a => a.professionalId === currentUser.id);
  const activeAssignments = myAssignments.filter(a => a.status === 'in_progress' || a.status === 'confirmed');
  const completedAssignments = myAssignments.filter(a => a.status === 'completed');
  const myReviews = reviews.filter(r => r.revieweeId === currentUser.id);

  const [activeTab, setActiveTab] = useState<'offers' | 'assignments' | 'completed' | 'reviews'>('offers');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [selectedAsgForDeliverables, setSelectedAsgForDeliverables] = useState<Assignment | null>(null);
  const [deliverableNotes, setDeliverableNotes] = useState('');
  const [deliverableLink, setDeliverableLink] = useState('');
  const [selectedContractModal, setSelectedContractModal] = useState<Assignment | null>(null);
  const [reviewAssignment, setReviewAssignment] = useState<Assignment | null>(null);

  const [declineReasonModalOffer, setDeclineReasonModalOffer] = useState<Offer | null>(null);
  const [declineReason, setDeclineReason] = useState('Schedule currently full');

  const handleToggleAvailability = (status: AvailabilityStatus) => {
    updateProfessionalAvailability(status);
  };

  const handleDeliverableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsgForDeliverables) return;
    submitDeliverables(selectedAsgForDeliverables.id, deliverableNotes, [deliverableLink]);
    setSelectedAsgForDeliverables(null);
    setDeliverableNotes('');
    setDeliverableLink('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Profile & Availability Bar */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/80 shadow-xs shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-slate-900">{currentUser.name}</h1>
              <VerificationBadge status={pro.verificationStatus} details={pro.verificationDetails} />
            </div>
            <p className="text-xs text-slate-600 max-w-xl">{pro.headline}</p>
            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span>{currentUser.city}, India</span>
              <span>·</span>
              <span className="font-mono">Profile Completeness: {pro.profileCompleteness}%</span>
            </div>
          </div>
        </div>

        {/* Availability Toggle & Verification Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-end">
          {/* Availability State */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 w-full sm:w-auto">
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold text-slate-800">Real-Time Status:</span>
              <select
                value={pro.availability}
                onChange={e => handleToggleAvailability(e.target.value as AvailabilityStatus)}
                className="bg-white border border-slate-300 rounded px-2 py-1 font-semibold text-xs text-slate-900 focus:outline-none"
              >
                <option value="available_now">🟢 Available Now</option>
                <option value="available_this_week">🟡 Available This Week</option>
                <option value="busy">🔴 In Progress (Busy)</option>
                <option value="unavailable">⚪ Off Duty / Vacation</option>
              </select>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Timestamped: {new Date(pro.availabilityLastConfirmedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} today
            </div>
          </div>

          <button
            onClick={() => setShowVerificationModal(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 shadow-2xs whitespace-nowrap cursor-pointer"
          >
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Verification Center</span>
          </button>
        </div>
      </div>

      {/* Financials & Reputation Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Total INR Earned</div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
            ₹{pro.totalEarningsINR.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium mt-1">Direct Disbursals</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Completed Tasks</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1 tabular-nums">
            {pro.completedAssignmentsCount}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">100% On-Time Delivery</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Verified Rating</div>
          <div className="text-2xl font-bold font-mono text-amber-500 mt-1 flex items-center gap-1 tabular-nums">
            <span>{pro.averageRating.toFixed(2)}</span>
            <Star className="w-5 h-5 fill-amber-400 inline" />
          </div>
          <div className="text-[10px] text-slate-400 mt-1">From {pro.ratingsCount} peer reviews</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Standard Task Rate</div>
          <div className="text-2xl font-bold font-mono text-blue-600 mt-1 tabular-nums">
            ₹{pro.hourlyRate}/hr
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Min Task: ₹{pro.fixedTaskMinRate}</div>
        </div>
      </div>

      {/* Main Tabs Workspace */}
      <div className="space-y-4">
        <div className="flex border-b border-slate-200 gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('offers')}
            className={`pb-3 cursor-pointer transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'offers'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Incoming Offers</span>
            {incomingOffers.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono text-[10px]">
                {incomingOffers.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('assignments')}
            className={`pb-3 cursor-pointer transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'assignments'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Active Assignments ({activeAssignments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 cursor-pointer transition-colors border-b-2 ${
              activeTab === 'completed'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Past Work & Archive ({completedAssignments.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 cursor-pointer transition-colors border-b-2 ${
              activeTab === 'reviews'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Feedback History ({myReviews.length})
          </button>
        </div>

        {/* Tab 1: Incoming Offers */}
        {activeTab === 'offers' && (
          <div className="space-y-4">
            {incomingOffers.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto" />
                <p>All incoming offers have been reviewed. Keep your availability active to receive new task alerts.</p>
              </div>
            ) : (
              incomingOffers.map(offer => {
                const employer = allUsers.find(u => u.id === offer.employerId);
                const task = tasks.find(t => t.id === offer.taskId);
                return (
                  <div
                    key={offer.id}
                    className="bg-white p-5 rounded-xl border-2 border-amber-300 shadow-xs space-y-4 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={employer?.avatarUrl}
                          alt={employer?.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{task?.title}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                              NEW OFFER
                            </span>
                          </div>
                          <p className="text-slate-500 text-[11px]">
                            Offered by {employer?.name} · Due {new Date(offer.estimatedCompletionDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-bold font-mono text-slate-900">
                          ₹{offer.proposedRateINR.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-emerald-600 font-medium">Guaranteed Platform Disbursal</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed italic">
                      "{offer.coverNote}"
                    </div>

                    {task?.requiredDeliverables && (
                      <div className="space-y-1">
                        <span className="font-semibold text-slate-800">Required Deliverables:</span>
                        <ul className="list-disc list-inside text-slate-600 text-[11px] space-y-0.5">
                          {task.requiredDeliverables.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Zero Penalty Notice */}
                    <div className="p-2.5 rounded bg-blue-50/70 border border-blue-200 text-blue-900 text-[11px] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>
                        <strong>Zero Penalty Guarantee:</strong> You are free to decline offers without any negative impact on your ranking or profile rating.
                      </span>
                    </div>

                    {/* Offer actions */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          getOrCreateConversation(offer.taskId, offer.employerId);
                          setActiveView('messages');
                        }}
                        className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Clarify with Employer</span>
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setDeclineReasonModalOffer(offer)}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg cursor-pointer"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => respondToOffer(offer.id, 'accept')}
                          className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-xs cursor-pointer"
                        >
                          Accept & Start Assignment
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Active Assignments */}
        {activeTab === 'assignments' && (
          <div className="space-y-4">
            {activeAssignments.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                No active assignments in progress. Check incoming offers or browse open tasks.
              </div>
            ) : (
              activeAssignments.map(asg => {
                const employer = allUsers.find(u => u.id === asg.employerId);
                const task = tasks.find(t => t.id === asg.taskId);
                return (
                  <div
                    key={asg.id}
                    className="bg-white p-5 rounded-xl border border-blue-200 shadow-xs space-y-4 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">{task?.title}</h3>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                            IN PROGRESS
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5">Hiring Client: {employer?.name}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-bold font-mono text-slate-900">
                          ₹{asg.agreedRateINR.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[10px] text-slate-400">Payment Escrow: Agreed</span>
                      </div>
                    </div>

                    {/* Scope & Deliverables */}
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-semibold text-slate-800">Agreed Scope:</span>
                      <p className="text-slate-600 text-[11px]">{task?.description}</p>
                    </div>

                    {asg.deliverablesSubmitted ? (
                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] flex items-center justify-between">
                        <div>
                          <strong>Deliverables Submitted:</strong> "{asg.deliverablesNotes}"
                        </div>
                        <span className="text-emerald-700 font-semibold">Under Review</span>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <button
                          onClick={() => setSelectedAsgForDeliverables(asg)}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Submit Completed Deliverables</span>
                        </button>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          getOrCreateConversation(asg.taskId, asg.employerId);
                          setActiveView('messages');
                        }}
                        className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat with Client</span>
                      </button>

                      <button
                        onClick={() => setSelectedContractModal(asg)}
                        className="text-amber-600 hover:text-amber-700 font-medium"
                      >
                        View Full Contract Details &rarr;
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 3: Completed Work */}
        {activeTab === 'completed' && (
          <div className="space-y-3">
            {completedAssignments.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                Completed assignments will appear here once verified by employers.
              </div>
            ) : (
              completedAssignments.map(asg => {
                const employer = allUsers.find(u => u.id === asg.employerId);
                const task = tasks.find(t => t.id === asg.taskId);
                return (
                  <div
                    key={asg.id}
                    className="bg-white p-4 rounded-xl border border-slate-200 text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{task?.title}</span>
                      <p className="text-[11px] text-slate-500">Client: {employer?.name}</p>
                    </div>

                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        PAID ₹{asg.agreedRateINR.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 4: Feedback History */}
        {activeTab === 'reviews' && (
          <div className="space-y-3">
            {myReviews.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                No peer reviews recorded yet. Reviews are added after each completed assignment.
              </div>
            ) : (
              myReviews.map(r => {
                const employer = allUsers.find(u => u.id === r.reviewerId);
                return (
                  <div key={r.id} className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{employer?.name || 'Verified Employer'}</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-mono font-bold text-slate-900 text-xs">
                          {((r.workQualityScore + r.communicationScore + r.timelinessScore) / 3).toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 italic">"{r.comments}"</p>
                    <div className="text-[10px] text-slate-400 flex gap-3 pt-1">
                      <span>Quality: {r.workQualityScore}/5</span>
                      <span>·</span>
                      <span>Communication: {r.communicationScore}/5</span>
                      <span>·</span>
                      <span>Timeliness: {r.timelinessScore}/5</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Deliverable Submission Modal */}
      {selectedAsgForDeliverables && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200 text-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900">Submit Completed Deliverables</h3>
            <p className="text-slate-500">Provide final artifacts or public preview links for client sign-off.</p>

            <form onSubmit={handleDeliverableSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Deliverable URL / Pull Request</label>
                <input
                  type="text"
                  placeholder="https://github.com/... or Figma link"
                  value={deliverableLink}
                  onChange={e => setDeliverableLink(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Hand-off Notes</label>
                <textarea
                  rows={3}
                  placeholder="Summarize completed items, test execution notes, and key changes..."
                  value={deliverableNotes}
                  onChange={e => setDeliverableNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAsgForDeliverables(null)}
                  className="px-4 py-2 bg-slate-100 rounded-lg text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-xs"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Decline Reason Modal */}
      {declineReasonModalOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 border border-slate-200 text-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Decline Task Offer (No Penalty)</h3>
            <p className="text-slate-500">Let the employer know why you cannot take this on right now.</p>

            <div className="space-y-2">
              <label className="block text-slate-700 font-medium">Select Reason</label>
              <select
                value={declineReason}
                onChange={e => setDeclineReason(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="Schedule currently fully booked">Schedule currently fully booked</option>
                <option value="Timeline too aggressive for scope">Timeline too aggressive for scope</option>
                <option value="Outside core technical specialization">Outside core technical specialization</option>
                <option value="Proposed budget below minimum threshold">Proposed budget below minimum threshold</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeclineReasonModalOffer(null)}
                className="px-3 py-1.5 bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  respondToOffer(declineReasonModalOffer.id, 'decline', declineReason);
                  setDeclineReasonModalOffer(null);
                }}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Center Modal */}
      {showVerificationModal && (
        <VerificationCenterModal
          isOpen={showVerificationModal}
          onClose={() => setShowVerificationModal(false)}
        />
      )}

      {/* Contract Details Modal */}
      {selectedContractModal && (
        <AssignmentDetailsModal
          isOpen={!!selectedContractModal}
          onClose={() => setSelectedContractModal(null)}
          assignment={selectedContractModal}
        />
      )}
    </div>
  );
};
