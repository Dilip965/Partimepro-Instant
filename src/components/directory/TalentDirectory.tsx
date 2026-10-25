import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  ChevronDown,
  Info,
  CheckCircle2,
  ExternalLink,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { ProfessionalProfile, UserProfile, Task } from '../../types/index.ts';
import { VerificationBadge } from '../common/VerificationBadge.tsx';
import { ProfessionalProfileModal } from './ProfessionalProfileModal.tsx';
import { SendOfferModal } from '../employer/SendOfferModal.tsx';
import { calculateMatchScore } from '../../utils/matchingEngine.ts';
import { CATEGORIES } from '../../data/seedData.ts';

export const TalentDirectory: React.FC = () => {
  const { professionalProfiles, allUsers, tasks, currentUser, isProfessionalSaved, toggleSaveProfessional } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [workPreferenceFilter, setWorkPreferenceFilter] = useState<string>('all');
  const [maxHourlyRate, setMaxHourlyRate] = useState<number>(3000);
  
  // Active task selection for matching score
  const employerTasks = tasks.filter(t => t.employerId === currentUser.id && t.status !== 'completed' && t.status !== 'cancelled');
  const [benchmarkTaskId, setBenchmarkTaskId] = useState<string>(employerTasks[0]?.id || '');
  const benchmarkTask = tasks.find(t => t.id === benchmarkTaskId);

  // Modals state
  const [selectedProForModal, setSelectedProForModal] = useState<ProfessionalProfile | null>(null);
  const [proForOffer, setProForOffer] = useState<ProfessionalProfile | null>(null);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);

  const handleToggleShortlist = (proId: string) => {
    if (shortlistedIds.includes(proId)) {
      setShortlistedIds(shortlistedIds.filter(id => id !== proId));
    } else {
      setShortlistedIds([...shortlistedIds, proId]);
    }
  };

  const proList = Object.values(professionalProfiles);

  const filteredPros = proList.filter(pro => {
    const user = allUsers.find(u => u.id === pro.userId);
    if (!user || user.isSuspended) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = user.name.toLowerCase().includes(q);
      const matchHeadline = pro.headline.toLowerCase().includes(q);
      const matchBio = pro.bio.toLowerCase().includes(q);
      const matchSkills = pro.skills.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchHeadline && !matchBio && !matchSkills) return false;
    }

    // Category / Skill
    if (selectedSkill !== 'all' && !pro.skills.includes(selectedSkill)) {
      return false;
    }

    // Experience
    if (experienceFilter !== 'all' && pro.experienceLevel !== experienceFilter) {
      return false;
    }

    // Rate
    if (pro.hourlyRate > maxHourlyRate) {
      return false;
    }

    // Availability
    if (availabilityOnly && pro.availability !== 'available_now') {
      return false;
    }

    // Verification
    if (verifiedOnly && pro.verificationStatus !== 'verified') {
      return false;
    }

    // Work Preference
    if (workPreferenceFilter !== 'all' && pro.workPreference !== workPreferenceFilter && pro.workPreference !== 'hybrid') {
      return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header & Benchmark Task Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Available Skilled Professionals
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pre-verified independent professionals with active availability timestamps
          </p>
        </div>

        {/* Task Matching Benchmark Dropdown */}
        {employerTasks.length > 0 && (
          <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/90 flex items-center gap-2 text-xs">
            <Zap className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-semibold text-amber-950 whitespace-nowrap">Match Score Benchmark:</span>
            <select
              value={benchmarkTaskId}
              onChange={e => setBenchmarkTaskId(e.target.value)}
              className="bg-white border border-amber-300 rounded px-2 py-1 text-xs text-slate-800 font-medium focus:outline-none"
            >
              {employerTasks.map(t => (
                <option key={t.id} value={t.id}>
                  {t.title.slice(0, 36)}... (₹{t.budgetINR.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Grid: Filters + Directory Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-1 space-y-6 bg-white p-5 rounded-xl border border-slate-200 shadow-xs h-fit text-xs">
          <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-100 pb-3">
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedSkill('all');
                setExperienceFilter('all');
                setAvailabilityOnly(false);
                setVerifiedOnly(false);
                setWorkPreferenceFilter('all');
                setMaxHourlyRate(3000);
              }}
              className="text-amber-600 hover:text-amber-700 text-[11px] font-medium"
            >
              Reset
            </button>
          </div>

          {/* Search */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">Search Keywords</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Skills, name, role..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-800 block">Availability</label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={availabilityOnly}
                onChange={e => setAvailabilityOnly(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="font-medium text-emerald-700">Available Now (Confirmed today)</span>
            </label>
          </div>

          {/* Verification Only Toggle */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-800 block">Trust Level</label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={e => setVerifiedOnly(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="font-medium">Verified Pros Only (ID & Skills)</span>
            </label>
          </div>

          {/* Max Hourly Rate Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-slate-800">Max Hourly Rate</label>
              <span className="font-mono font-bold text-slate-900">₹{maxHourlyRate.toLocaleString('en-IN')}/hr</span>
            </div>
            <input
              type="range"
              min="800"
              max="4000"
              step="100"
              value={maxHourlyRate}
              onChange={e => setMaxHourlyRate(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          {/* Seniority */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">Seniority Level</label>
            <select
              value={experienceFilter}
              onChange={e => setExperienceFilter(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white"
            >
              <option value="all">All Seniority Levels</option>
              <option value="junior">Junior (1-2 Years)</option>
              <option value="mid">Mid-Level (3-5 Years)</option>
              <option value="senior">Senior / Lead (5+ Years)</option>
            </select>
          </div>

          {/* Work Preference */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">Work Arrangement</label>
            <select
              value={workPreferenceFilter}
              onChange={e => setWorkPreferenceFilter(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white"
            >
              <option value="all">Any Arrangement</option>
              <option value="remote">Remote Only</option>
              <option value="onsite">On-Site Compatible</option>
            </select>
          </div>
        </div>

        {/* Right Cards List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Showing <strong>{filteredPros.length}</strong> available professionals</span>
            {benchmarkTask && (
              <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                Sorted by heuristic matching score against: <strong>{benchmarkTask.title.slice(0, 24)}...</strong>
              </span>
            )}
          </div>

          {filteredPros.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200 space-y-3">
              <Search className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-900 text-sm">No professionals matched your current filter criteria</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try widening your rate range, clearing the specific skill filter, or including professionals available this week.
              </p>
            </div>
          ) : (
            filteredPros.map(pro => {
              const user = allUsers.find(u => u.id === pro.userId);
              if (!user) return null;

              const matchBreakdown = benchmarkTask ? calculateMatchScore(benchmarkTask, pro) : null;
              const isShortlisted = shortlistedIds.includes(pro.userId);

              return (
                <div
                  key={pro.userId}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* User Intro */}
                    <div className="flex items-start gap-3.5">
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            onClick={() => setSelectedProForModal(pro)}
                            className="font-bold text-sm text-slate-900 hover:text-amber-600 transition-colors cursor-pointer"
                          >
                            {user.name}
                          </h3>
                          <VerificationBadge status={pro.verificationStatus} details={pro.verificationDetails} />
                          <span className="text-[11px] text-slate-400 font-mono">
                            {user.city}, India
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{pro.headline}</p>

                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <strong className="text-slate-800 font-mono">{pro.averageRating.toFixed(1)}</strong> ({pro.ratingsCount})
                          </span>
                          <span>·</span>
                          <span>{pro.completedAssignmentsCount} tasks completed</span>
                          <span>·</span>
                          <span className="text-emerald-700 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {pro.availability === 'available_now' ? 'Available Now' : 'Available this week'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rates & Actions */}
                    <div className="text-right sm:text-right w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                      <div>
                        <div className="text-sm font-bold text-slate-900 font-mono">
                          ₹{pro.hourlyRate.toLocaleString('en-IN')}<span className="text-xs text-slate-500 font-normal">/hr</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Min task: ₹{pro.fixedTaskMinRate.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => toggleSaveProfessional(pro.userId)}
                          className={`px-2.5 py-1 text-xs rounded border transition-colors flex items-center gap-1 cursor-pointer ${
                            isProfessionalSaved(pro.userId)
                              ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                          title={isProfessionalSaved(pro.userId) ? 'Remove from Saved list' : 'Save professional to bench'}
                        >
                          {isProfessionalSaved(pro.userId) ? (
                            <>
                              <BookmarkCheck className="w-3.5 h-3.5 fill-amber-600 text-amber-700" />
                              <span>Saved</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                              <span>Save Pro</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => setProForOffer(pro)}
                          className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded shadow-2xs transition-colors cursor-pointer"
                        >
                          Send Offer
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {pro.skills.map(s => {
                      const isMatchedSkill = benchmarkTask?.skills.some(ts => ts.toLowerCase() === s.toLowerCase());
                      return (
                        <span
                          key={s}
                          className={`px-2 py-0.5 rounded text-[11px] border font-medium ${
                            isMatchedSkill
                              ? 'bg-amber-50 text-amber-900 border-amber-300 font-semibold'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          {s}
                        </span>
                      );
                    })}
                  </div>

                  {/* Heuristic Match Score Indicator */}
                  {matchBreakdown && (
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 font-bold font-mono flex items-center justify-center text-sm shrink-0">
                          {matchBreakdown.totalScore}%
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            Heuristic Match Score Breakdown
                          </div>
                          <div className="text-[11px] text-slate-500 flex gap-2 flex-wrap">
                            <span>Skills: {matchBreakdown.skillMatch}/40</span>
                            <span>·</span>
                            <span>Availability: {matchBreakdown.availabilityMatch}/25</span>
                            <span>·</span>
                            <span>Budget: {matchBreakdown.budgetMatch}/15</span>
                            <span>·</span>
                            <span>Exp: {matchBreakdown.experienceMatch}/10</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 max-w-sm italic">
                        Why matched: {matchBreakdown.matchReasons.join(', ')}
                      </div>
                    </div>
                  )}

                  {/* Portfolio snippet preview */}
                  {pro.portfolio.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-semibold text-slate-700">Recent Proof:</span>
                        <span className="truncate">{pro.portfolio[0].title}</span>
                      </div>
                      <button
                        onClick={() => setSelectedProForModal(pro)}
                        className="text-amber-600 hover:text-amber-700 font-semibold shrink-0 cursor-pointer"
                      >
                        Full Profile & Evidence &rarr;
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Profile Modal */}
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
          initialTaskId={benchmarkTaskId}
        />
      )}
    </div>
  );
};
