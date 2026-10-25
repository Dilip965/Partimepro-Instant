import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  Search,
  Lock,
  Layers,
  FileCheck,
  Building2,
  ChevronRight,
  TrendingUp,
  Palette,
  Code2,
  BarChart3,
  FileText,
  GraduationCap,
  Headphones,
  Briefcase
} from 'lucide-react';
import { VerificationBadge } from '../common/VerificationBadge.tsx';
import { TALENT_HERO_IMAGE, CATEGORIES } from '../../data/seedData.ts';

interface LandingPageProps {
  onOpenPostTask: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  Headphones: <Headphones className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />
};

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenPostTask }) => {
  const { setActiveView, professionalProfiles, allUsers, switchUser } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const featuredPros = Object.values(professionalProfiles).slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-14 pb-12 bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/80">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Verified Skilled Talent Marketplace · India</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1] text-balance">
                The Right Skill.{' '}
                <span className="text-amber-600">Right When You Need It.</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Find trusted, skilled professionals for flexible work. Connect with available talent, agree on the task, and get started sooner without lengthy agency delays.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    switchUser('emp-1');
                    setActiveView('talent_directory');
                  }}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Find a Professional</span>
                </button>

                <button
                  onClick={() => {
                    switchUser('pro-1');
                    setActiveView('professional_dashboard');
                  }}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>Earn with Your Skills</span>
                </button>
              </div>

              {/* Trust Transparency Note */}
              <div className="pt-3 flex items-start gap-2.5 text-xs text-slate-500 max-w-xl">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Realistic Matching Speed:</strong> We do not claim every task is filled instantaneously. Matching speed depends on skill specificity, real-time availability, and verified capacity.
                </p>
              </div>

              {/* Quick Metrics Strip */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/80">
                <div>
                  <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">18 mins</div>
                  <div className="text-xs text-slate-500 mt-0.5">Avg. 1st Qualified Response</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">100%</div>
                  <div className="text-xs text-slate-500 mt-0.5">ID & Skill Verified Pros</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">₹0 Risk</div>
                  <div className="text-xs text-slate-500 mt-0.5">Clear Milestone Terms</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual / Live Marketplace Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 aspect-16/9 sm:aspect-4/3">
                <img
                  src={TALENT_HERO_IMAGE}
                  alt="PartimePro Instant Tech Workplace in Bengaluru"
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-6 flex flex-col justify-end text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/90 text-slate-950 font-bold text-xs w-max mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant Availability Engine</span>
                  </div>
                  <h3 className="font-bold text-lg">Skilled Talent · Active Now</h3>
                  <p className="text-xs text-slate-300">
                    Engineers, UI/UX designers, and growth marketers ready for immediate task kick-off.
                  </p>
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Verified Available Professionals
                  </span>
                  <button
                    onClick={() => setActiveView('talent_directory')}
                    className="text-amber-600 hover:text-amber-700 font-medium cursor-pointer"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="space-y-2.5">
                  {featuredPros.map(pro => {
                    const user = allUsers.find(u => u.id === pro.userId);
                    return (
                      <div
                        key={pro.userId}
                        onClick={() => {
                          switchUser('emp-1');
                          setActiveView('talent_directory');
                        }}
                        className="p-2.5 rounded-lg border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={user?.avatarUrl}
                            alt={user?.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-slate-900 truncate">{user?.name}</span>
                              <VerificationBadge status={pro.verificationStatus} details={pro.verificationDetails} />
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">{pro.headline}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs font-bold text-slate-900 font-mono">
                            ₹{pro.hourlyRate.toLocaleString('en-IN')}<span className="text-[10px] text-slate-500">/hr</span>
                          </div>
                          <span className="text-[10px] text-emerald-600 font-medium">Available Now</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">Process Built for Speed & Trust</span>
          <h2 className="text-3xl font-extrabold text-slate-950">How PartimePro Instant Works</h2>
          <p className="text-slate-600 text-sm">
            From emergency bug fixes to launch creatives, engage pre-verified professionals without administrative friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative space-y-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center font-mono">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-base">Describe the Task</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Define the exact scope, required deliverables, budget in INR, deadline, and whether work is remote or on-site.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center font-mono">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-base">Discover & Match</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our 5-factor heuristic engine identifies verified professionals whose skill, real-time availability, and rate align.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative space-y-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center font-mono">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-base">Agree on Terms</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent scope, fixed or hourly compensation, milestone dates, and cancellation terms confirmed before kick-off.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs relative space-y-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center font-mono">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-base">Deliver & Review</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Work is delivered securely, confirmed against agreed deliverables, and closed with structured, verified peer feedback.
            </p>
          </div>
        </div>
      </section>

      {/* 8 Supported Skilled Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">Specialized Verticals</span>
            <h2 className="text-3xl font-extrabold text-slate-950 mt-1">Explore High-Demand Skill Domains</h2>
          </div>
          <button
            onClick={() => setActiveView('talent_directory')}
            className="text-xs font-semibold text-slate-900 hover:text-amber-600 flex items-center gap-1 cursor-pointer"
          >
            <span>Browse All Skilled Verticals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                switchUser('emp-1');
                setActiveView('talent_directory');
              }}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-sm transition-all group cursor-pointer space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-amber-100 text-slate-800 group-hover:text-amber-800 flex items-center justify-center transition-colors">
                {CATEGORY_ICONS[cat.icon] || <Zap className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-1">
                {cat.popularSkills.slice(0, 3).map((s, idx) => (
                  <span key={idx} className="text-[10px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Safety Deep-Dive */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero Impersonation Tolerance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Trust Built on Rigorous Verification, Not Promises
            </h2>
            <p className="text-slate-400 text-sm">
              We never display unverified profiles as verified. Every badge represents an authentic check reviewed by human administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Government ID Audits</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                National identity verification via DigiLocker XML hash (Aadhaar & PAN). Sensitive identity records remain strictly restricted and are never exposed publicly.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Skill Evidence & Code Audits</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We evaluate actual production artifacts: Figma links, GitHub commits, financial models, and video portfolios, not self-claimed keyword tags.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Employer Business Verification</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Companies posting tasks are verified against MCA corporate records and active GSTIN registrations with corporate email authentication.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Safety Escalation:</strong> Encountered suspicious behavior or off-platform payment solicitations? Our Trust Squad investigates within 2 hours.
              </span>
            </div>
            <button
              onClick={() => setActiveView('safety_center')}
              className="text-amber-400 hover:text-amber-300 font-semibold whitespace-nowrap cursor-pointer"
            >
              Access Safety Center &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Your next opportunity or trusted professional could be one match away.
            </h2>
            <p className="text-slate-400 text-sm">
              Join Indian startups, agencies, and high-caliber professionals getting high-impact tasks done with verified certainty.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                switchUser('emp-1');
                onOpenPostTask();
              }}
              className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Post a Skilled Task
            </button>
            <button
              onClick={() => {
                switchUser('pro-1');
                setActiveView('professional_dashboard');
              }}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Register as Professional
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
