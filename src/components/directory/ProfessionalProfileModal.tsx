import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  X,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  ExternalLink,
  Award,
  CheckCircle2,
  Calendar,
  MessageSquare,
  AlertTriangle,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { ProfessionalProfile, UserProfile } from '../../types/index.ts';
import { VerificationBadge } from '../common/VerificationBadge.tsx';

interface ProfessionalProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  professional: ProfessionalProfile;
  user: UserProfile;
  onSendOfferClick: () => void;
}

export const ProfessionalProfileModal: React.FC<ProfessionalProfileModalProps> = ({
  isOpen,
  onClose,
  professional,
  user,
  onSendOfferClick
}) => {
  const { reviews, allUsers, setActiveView, getOrCreateConversation, currentUser, isProfessionalSaved, toggleSaveProfessional } = useApp();
  const proReviews = reviews.filter(r => r.revieweeId === professional.userId);
  const isSaved = isProfessionalSaved(professional.userId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 border border-slate-200 overflow-hidden">
        {/* Header Banner */}
        <div className="relative bg-slate-900 text-white p-6 pb-8">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => toggleSaveProfessional(professional.userId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-400'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save Professional'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 fill-slate-950" /> : <Bookmark className="w-4 h-4" />}
              <span>{isSaved ? 'Saved to Bench' : 'Save Pro'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-18 h-18 rounded-2xl object-cover border-2 border-amber-500/80 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <VerificationBadge status={professional.verificationStatus} details={professional.verificationDetails} />
              </div>
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed">{professional.headline}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {user.city}, India
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <strong className="text-white font-mono">{professional.averageRating.toFixed(2)}</strong> ({professional.ratingsCount} reviews)
                </span>
                <span>·</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Available Now
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
          {/* Rate & Availability Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Hourly Rate</div>
              <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                ₹{professional.hourlyRate.toLocaleString('en-IN')}<span className="text-[10px] text-slate-500">/hr</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Min Task Budget</div>
              <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                ₹{professional.fixedTaskMinRate.toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Assignments</div>
              <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                {professional.completedAssignmentsCount} completed
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Experience</div>
              <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                {professional.experienceYears} Years
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Professional Summary</h3>
            <p className="text-slate-600 leading-relaxed text-xs">{professional.bio}</p>
          </div>

          {/* Skills Badges */}
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Verified Skills & Tools</h3>
            <div className="flex flex-wrap gap-1.5">
              {professional.skills.map(s => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Verification Audit Breakdown */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Identity & Audited Credentials</span>
            </div>
            <div className="space-y-1.5 text-[11px] text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  <strong>Identity:</strong> {professional.verificationDetails.govtIdType || 'Government DigiLocker Aadhaar/PAN certified.'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  <strong>Skills Audit:</strong> {professional.verificationDetails.skillsAssessedNotes || 'Portfolio code and production design files certified.'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Last availability check confirmed within 24 hours.</span>
              </div>
            </div>
          </div>

          {/* Portfolio Items */}
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">Verified Work Samples & Portfolio</h3>
            {professional.portfolio.length === 0 ? (
              <p className="text-slate-500">No public portfolio items attached yet.</p>
            ) : (
              <div className="space-y-2.5">
                {professional.portfolio.map(item => (
                  <div key={item.id} className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-white">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-900 text-xs">{item.title}</h4>
                      <a
                        href={item.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-600 hover:text-amber-700 flex items-center gap-1 font-medium"
                      >
                        <span>View Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{item.description}</p>
                    <div className="flex gap-1 mt-2">
                      {item.tags.map(t => (
                        <span key={t} className="text-[10px] text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reviews & Feedback */}
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Verified Client Feedback ({proReviews.length})
            </h3>
            {proReviews.length === 0 ? (
              <p className="text-slate-500">No client reviews yet.</p>
            ) : (
              <div className="space-y-3">
                {proReviews.map(r => {
                  const reviewer = allUsers.find(u => u.id === r.reviewerId);
                  return (
                    <div key={r.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">{reviewer?.name || 'Verified Employer'}</span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-mono font-bold text-slate-900 text-[11px]">
                            {((r.workQualityScore + r.communicationScore + r.timelinessScore) / 3).toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 italic">"{r.comments}"</p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1">
                        <span>Quality: {r.workQualityScore}/5</span>
                        <span>·</span>
                        <span>Communication: {r.communicationScore}/5</span>
                        <span>·</span>
                        <span>Timeliness: {r.timelinessScore}/5</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-slate-500 text-xs">
            Directly connect with <strong>{user.name}</strong>
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium hover:bg-slate-100"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onSendOfferClick();
              }}
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-xs cursor-pointer"
            >
              Send Task Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
