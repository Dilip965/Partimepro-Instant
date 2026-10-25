import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Briefcase,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  MessageSquare,
  Star,
  Users,
  ShieldCheck,
  FileText,
  Bookmark,
  BookmarkCheck,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { VerificationBadge } from '../common/VerificationBadge.tsx';
import { Assignment, Task, ProfessionalProfile } from '../../types/index.ts';
import { FeedbackModal } from '../reviews/FeedbackModal.tsx';
import { AssignmentDetailsModal } from '../assignments/AssignmentDetailsModal.tsx';
import { ProfessionalProfileModal } from '../directory/ProfessionalProfileModal.tsx';
import { SendOfferModal } from './SendOfferModal.tsx';

interface EmployerDashboardProps {
  onOpenPostTask: () => void;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ onOpenPostTask }) => {
  const {
    currentUser,
    tasks,
    offers,
    assignments,
    allUsers,
    professionalProfiles,
    setActiveView,
    completeAssignment,
    getOrCreateConversation,
    savedProfessionalIds,
    removeSavedProfessional
  } = useApp();

  const myTasks = tasks.filter(t => t.employerId === currentUser.id);
  const myOffers = offers.filter(o => o.employerId === currentUser.id);
  const myAssignments = assignments.filter(a => a.employerId === currentUser.id);

  const activeAssignments = myAssignments.filter(a => a.status === 'in_progress' || a.status === 'confirmed');
  const completedAssignments = myAssignments.filter(a => a.status === 'completed');

  const [activeTab, setActiveTab] = useState<'tasks' | 'offers' | 'assignments' | 'completed' | 'saved'>('tasks');
  const [selectedAssignmentForModal, setSelectedAssignmentForModal] = useState<Assignment | null>(null);
  const [reviewAssignment, setReviewAssignment] = useState<Assignment | null>(null);
  const [selectedProForModal, setSelectedProForModal] = useState<ProfessionalProfile | null>(null);
  const [proForOffer, setProForOffer] = useState<ProfessionalProfile | null>(null);

  // Recommendations: Available verified pros
  const recommendedPros = Object.values(professionalProfiles).filter(p => p.verificationStatus === 'verified').slice(0, 3);
  const savedPros = savedProfessionalIds
    .map(id => professionalProfiles[id])
    .filter((p): p is ProfessionalProfile => Boolean(p));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Employer Control Hub</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Verified Hiring Entity
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Welcome back, <strong>{currentUser.name}</strong> · Zynapse AI Technologies Pvt Ltd
          </p>
        </div>

        <button
          onClick={onOpenPostTask}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a Task Now</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Open Tasks</div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
            {myTasks.filter(t => t.status === 'open' || t.status === 'matching' || t.status === 'offers_sent').length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Pending Offers</div>
          <div className="text-2xl font-bold font-mono text-amber-600 mt-1 tabular-nums">
            {myOffers.filter(o => o.status === 'pending').length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Active Tasks</div>
          <div className="text-2xl font-bold font-mono text-blue-600 mt-1 tabular-nums">
            {activeAssignments.length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium">Completed Tasks</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1 tabular-nums">
            {completedAssignments.length}
          </div>
        </div>

        <div
          onClick={() => setActiveTab('saved')}
          className="bg-white p-4 rounded-xl border border-amber-200/80 shadow-2xs cursor-pointer hover:border-amber-400 transition-colors"
        >
          <div className="text-xs text-amber-800 font-medium flex items-center justify-between">
            <span>Saved Bench</span>
            <Bookmark className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-600 mt-1 tabular-nums">
            {savedPros.length}
          </div>
        </div>
      </div>

      {/* Main Workspace: Segmented Tabs */}
      <div className="space-y-4">
        <div className="flex border-b border-slate-200 gap-6 text-xs font-semibold overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`pb-3 cursor-pointer whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'tasks'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            My Task Requests ({myTasks.length})
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`pb-3 cursor-pointer whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'offers'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sent Offers ({myOffers.length})
          </button>

          <button
            onClick={() => setActiveTab('assignments')}
            className={`pb-3 cursor-pointer whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'assignments'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            In-Progress Assignments ({activeAssignments.length})
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 cursor-pointer whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'completed'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Completed & Reviews ({completedAssignments.length})
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 cursor-pointer whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Professionals ({savedPros.length})</span>
          </button>
        </div>

        {/* Tab 1: Tasks */}
        {activeTab === 'tasks' && (
          <div className="space-y-3">
            {myTasks.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                You haven't posted any tasks yet. Click "Post a Task" to find verified talent.
              </div>
            ) : (
              myTasks.map(task => (
                <div
                  key={task.id}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900">{task.title}</h3>
                        <span className="capitalize px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {task.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Category: {task.category} · Seniority: {task.experienceLevel.toUpperCase()}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-bold text-slate-900 text-sm">
                        ₹{task.budgetINR.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400 capitalize">
                        {task.paymentType} payment · Due {new Date(task.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{task.description}</p>

                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px]">
                    <div className="flex flex-wrap gap-1">
                      {task.skills.map(s => (
                        <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveView('talent_directory')}
                        className="px-3 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded font-medium transition-colors"
                      >
                        Browse Matched Talent &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Offers */}
        {activeTab === 'offers' && (
          <div className="space-y-3">
            {myOffers.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                No active task offers dispatched.
              </div>
            ) : (
              myOffers.map(offer => {
                const pro = allUsers.find(u => u.id === offer.professionalId);
                const task = tasks.find(t => t.id === offer.taskId);
                return (
                  <div
                    key={offer.id}
                    className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={pro?.avatarUrl}
                          alt={pro?.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="font-bold text-slate-900">{pro?.name}</span>
                          <p className="text-[11px] text-slate-500">For: {task?.title}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            offer.status === 'accepted'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : offer.status === 'declined'
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {offer.status.toUpperCase()}
                        </span>
                        <div className="font-mono font-bold text-slate-900 text-xs mt-0.5">
                          ₹{offer.proposedRateINR.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 italic text-[11px] bg-slate-50 p-2 rounded">
                      "{offer.coverNote}"
                    </p>

                    {offer.declineReason && (
                      <div className="text-[11px] text-slate-500 p-2 rounded bg-slate-50">
                        Decline reason (No penalty): {offer.declineReason}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 3: Active Assignments */}
        {activeTab === 'assignments' && (
          <div className="space-y-3">
            {activeAssignments.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                No active in-progress assignments right now.
              </div>
            ) : (
              activeAssignments.map(asg => {
                const pro = allUsers.find(u => u.id === asg.professionalId);
                const task = tasks.find(t => t.id === asg.taskId);
                return (
                  <div
                    key={asg.id}
                    className="bg-white p-5 rounded-xl border border-blue-200 shadow-xs space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={pro?.avatarUrl}
                          alt={pro?.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{task?.title}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                              IN PROGRESS
                            </span>
                          </div>
                          <p className="text-slate-500 text-[11px]">Assigned Pro: {pro?.name}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-bold font-mono text-slate-900">
                          ₹{asg.agreedRateINR.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-slate-400">Payment: {asg.paymentStatus.toUpperCase()}</div>
                      </div>
                    </div>

                    {/* Deliverable submission status */}
                    {asg.deliverablesSubmitted && asg.deliverablesSubmitted.length > 0 ? (
                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1">
                        <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Deliverables Ready for Review</span>
                        </div>
                        <p className="text-slate-700 text-[11px]">{asg.deliverablesNotes}</p>
                        <div className="pt-1 flex gap-2">
                          {asg.deliverablesSubmitted.map((url, i) => (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-700 underline font-mono text-[10px]"
                            >
                              Deliverable Link #{i + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        <span>Professional is actively executing the agreed scope.</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          getOrCreateConversation(asg.taskId, asg.professionalId);
                          setActiveView('messages');
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 font-medium cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Open Task Chat</span>
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedAssignmentForModal(asg)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium cursor-pointer"
                        >
                          View Contract Details
                        </button>
                        <button
                          onClick={() => {
                            completeAssignment(asg.id);
                            setReviewAssignment(asg);
                          }}
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-xs cursor-pointer"
                        >
                          Confirm Completion & Pay
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 4: Completed */}
        {activeTab === 'completed' && (
          <div className="space-y-3">
            {completedAssignments.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
                No completed assignments yet.
              </div>
            ) : (
              completedAssignments.map(asg => {
                const pro = allUsers.find(u => u.id === asg.professionalId);
                const task = tasks.find(t => t.id === asg.taskId);
                return (
                  <div
                    key={asg.id}
                    className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900">{task?.title}</span>
                        <p className="text-[11px] text-slate-500">Completed by: {pro?.name}</p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          COMPLETED · PAID
                        </span>
                        <div className="font-mono font-bold text-slate-900 text-xs mt-0.5">
                          ₹{asg.agreedRateINR.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setReviewAssignment(asg)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded text-[11px] cursor-pointer"
                      >
                        Submit / Update Structured Review
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 5: Saved Professionals */}
        {activeTab === 'saved' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs pb-1">
              <div>
                <span className="font-bold text-slate-900">Saved Professionals Bench</span>
                <p className="text-slate-500 text-[11px]">Specialists you have bookmarked for rapid task assignment and re-hiring</p>
              </div>
              <button
                onClick={() => setActiveView('talent_directory')}
                className="text-amber-600 hover:text-amber-700 font-semibold cursor-pointer"
              >
                + Browse More Available Professionals
              </button>
            </div>

            {savedPros.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500 space-y-3">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-800 text-sm">Your Saved Professionals list is empty</h4>
                <p className="max-w-md mx-auto text-slate-500">
                  Save vetted professionals from the talent directory or while reviewing candidates to quickly dispatch tasks to them without repeated searches.
                </p>
                <button
                  onClick={() => setActiveView('talent_directory')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Discover Skilled Professionals</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedPros.map(pro => {
                  const user = allUsers.find(u => u.id === pro.userId);
                  if (!user) return null;
                  return (
                    <div
                      key={pro.userId}
                      className="bg-white p-5 rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-xs transition-all space-y-3 text-xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4
                                onClick={() => setSelectedProForModal(pro)}
                                className="font-bold text-slate-900 text-sm hover:text-amber-600 cursor-pointer truncate"
                              >
                                {user.name}
                              </h4>
                              <VerificationBadge status={pro.verificationStatus} details={pro.verificationDetails} />
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{pro.headline}</p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1 flex-wrap">
                              <span>{user.city}, India</span>
                              <span>·</span>
                              <span className="text-amber-500 font-bold flex items-center gap-0.5">
                                <Star className="w-3 h-3 fill-amber-400" />
                                {pro.averageRating.toFixed(1)} ({pro.ratingsCount})
                              </span>
                              <span>·</span>
                              <span className="text-emerald-700 font-medium">Available Now</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => removeSavedProfessional(pro.userId)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                          title="Remove from saved list"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {pro.skills.slice(0, 4).map(s => (
                          <span key={s} className="px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200 text-[10px]">
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="font-mono font-bold text-slate-900 text-xs">₹{pro.hourlyRate}/hr</span>
                          <span className="text-[10px] text-slate-400 ml-1.5">Min task: ₹{pro.fixedTaskMinRate}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedProForModal(pro)}
                            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer"
                          >
                            Profile
                          </button>
                          <button
                            onClick={() => setProForOffer(pro)}
                            className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-2xs cursor-pointer"
                          >
                            Send Offer
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Recommended Professionals Spotlight */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Recommended Verified Talent</h3>
            <p className="text-xs text-slate-500">Available right now for quick-turnaround assignments</p>
          </div>
          <button
            onClick={() => setActiveView('talent_directory')}
            className="text-xs font-semibold text-amber-600 hover:text-amber-700"
          >
            Explore All Professionals &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedPros.map(pro => {
            const user = allUsers.find(u => u.id === pro.userId);
            return (
              <div
                key={pro.userId}
                onClick={() => setActiveView('talent_directory')}
                className="p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-2xs transition-all cursor-pointer space-y-2 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user?.avatarUrl}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-bold text-slate-900">{user?.name}</div>
                    <VerificationBadge status={pro.verificationStatus} details={pro.verificationDetails} />
                  </div>
                </div>
                <p className="text-slate-600 text-[11px] line-clamp-1">{pro.headline}</p>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-[11px]">
                  <span className="font-mono font-bold text-slate-900">₹{pro.hourlyRate}/hr</span>
                  <span className="text-emerald-700 font-medium">Available Now</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assignment Contract Modal */}
      {selectedAssignmentForModal && (
        <AssignmentDetailsModal
          isOpen={!!selectedAssignmentForModal}
          onClose={() => setSelectedAssignmentForModal(null)}
          assignment={selectedAssignmentForModal}
        />
      )}

      {/* Review Modal */}
      {reviewAssignment && (
        <FeedbackModal
          isOpen={!!reviewAssignment}
          onClose={() => setReviewAssignment(null)}
          assignmentId={reviewAssignment.id}
          taskId={reviewAssignment.taskId}
          revieweeId={reviewAssignment.professionalId}
          reviewerRole="employer"
        />
      )}

      {/* Selected Pro Profile Modal */}
      {selectedProForModal && (
        <ProfessionalProfileModal
          isOpen={!!selectedProForModal}
          onClose={() => setSelectedProForModal(null)}
          professional={selectedProForModal}
          user={allUsers.find(u => u.id === selectedProForModal.userId)!}
          onSendOfferClick={() => {
            const p = selectedProForModal;
            setSelectedProForModal(null);
            setProForOffer(p);
          }}
        />
      )}

      {/* Send Offer Modal */}
      {proForOffer && (
        <SendOfferModal
          isOpen={!!proForOffer}
          onClose={() => setProForOffer(null)}
          professional={proForOffer}
        />
      )}
    </div>
  );
};
