import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { X, Plus, Trash2, ShieldCheck, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../../data/seedData.ts';
import { PaymentType, WorkPreference } from '../../types/index.ts';

interface PostTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated?: (taskId: string) => void;
}

export const PostTaskModal: React.FC<PostTaskModalProps> = ({ isOpen, onClose, onTaskCreated }) => {
  const { createTask, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1].name); // Default Dev & Tech
  const [skillsInput, setSkillsInput] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>(['React', 'TypeScript']);
  const [experienceLevel, setExperienceLevel] = useState<'junior' | 'mid' | 'senior'>('senior');
  const [budgetINR, setBudgetINR] = useState<number>(15000);
  const [paymentType, setPaymentType] = useState<PaymentType>('fixed');
  const [estimatedHours, setEstimatedHours] = useState<number>(10);
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [preferredStartTime, setPreferredStartTime] = useState('Immediately (Within 24h)');
  const [workPreference, setWorkPreference] = useState<WorkPreference>('remote');
  const [location, setLocation] = useState('');
  const [supervisorName, setSupervisorName] = useState('');
  const [supervisorPhone, setSupervisorPhone] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([
    'Tested code branch or pull request',
    'Short technical walkthrough summary'
  ]);
  const [newDeliverable, setNewDeliverable] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [oathConfirmed, setOathConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (skillsInput.trim() && !skillsList.includes(skillsInput.trim())) {
      setSkillsList([...skillsList, skillsInput.trim()]);
      setSkillsInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkillsList(skillsList.filter(s => s !== skill));
  };

  const handleAddDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables([...deliverables, newDeliverable.trim()]);
      setNewDeliverable('');
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Please provide a descriptive task title.');
      return;
    }
    if (description.trim().length < 20) {
      setErrorMsg('Please describe the task scope in detail (minimum 20 characters).');
      return;
    }
    if (skillsList.length === 0) {
      setErrorMsg('Please specify at least one required skill tag.');
      return;
    }
    if (!budgetINR || budgetINR < 500) {
      setErrorMsg('Please specify a fair budget (minimum ₹500 INR).');
      return;
    }
    if (workPreference === 'onsite' && !location.trim()) {
      setErrorMsg('For on-site tasks, exact workplace address/city is mandatory for worker safety.');
      return;
    }
    if (deliverables.length === 0) {
      setErrorMsg('Please specify at least one required deliverable.');
      return;
    }
    if (!oathConfirmed) {
      setErrorMsg('You must certify the task legitimacy and scope accuracy.');
      return;
    }

    const created = createTask({
      title,
      description,
      category,
      skills: skillsList,
      experienceLevel,
      budgetINR,
      paymentType,
      estimatedHours: paymentType === 'hourly' ? estimatedHours : undefined,
      deadline: new Date(deadline).toISOString(),
      preferredStartTime,
      workPreference,
      location: workPreference === 'onsite' ? location : undefined,
      supervisorName: workPreference === 'onsite' ? supervisorName : undefined,
      supervisorPhone: workPreference === 'onsite' ? supervisorPhone : undefined,
      requiredDeliverables: deliverables,
      additionalRequirements
    });

    onClose();
    if (onTaskCreated) onTaskCreated(created.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <h2 className="text-base font-bold">Post a Skilled Task</h2>
              <p className="text-xs text-slate-300">Connect with available, verified professionals</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Optimize React State & Fix API Concurrency Bug"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          {/* Category & Experience Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Skill Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Required Seniority</label>
              <select
                value={experienceLevel}
                onChange={e => setExperienceLevel(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              >
                <option value="junior">Junior (1-2 years experience)</option>
                <option value="mid">Mid-Level (3-5 years experience)</option>
                <option value="senior">Senior / Staff (5+ years experience)</option>
              </select>
            </div>
          </div>

          {/* Required Skills Tags */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Required Skills <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Type a skill and hit Add (e.g. React, Figma, Excel)"
                value={skillsInput}
                onChange={e => setSkillsInput(e.target.value)}
                onKeyDown={handleAddSkill}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skillsList.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs border border-slate-200"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Detailed Scope & Context <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Describe the objective, current blockers, technical stack, and what success looks like..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          {/* Budget & Payment Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Payment Structure</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentType('fixed')}
                  className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                    paymentType === 'fixed'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Fixed Task
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentType('hourly')}
                  className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                    paymentType === 'hourly'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Hourly
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Budget (₹ INR) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={budgetINR}
                  onChange={e => setBudgetINR(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-xs rounded-lg border border-slate-300 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                {paymentType === 'hourly' ? 'Est. Hours' : 'Deadline'}
              </label>
              {paymentType === 'hourly' ? (
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={estimatedHours}
                  onChange={e => setEstimatedHours(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              ) : (
                <input
                  type="date"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              )}
            </div>
          </div>

          {/* Work Arrangement: Remote vs On-site */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-800">Work Arrangement</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setWorkPreference('remote')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    workPreference === 'remote'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Remote
                </button>
                <button
                  type="button"
                  onClick={() => setWorkPreference('onsite')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    workPreference === 'onsite'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  On-Site
                </button>
              </div>
            </div>

            {workPreference === 'onsite' && (
              <div className="pt-2 border-t border-slate-200 space-y-3">
                <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>On-Site Safety Mandate:</strong> Exact physical location and on-site supervisor details are strictly required for emergency verification and worker check-ins.
                  </span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Workplace Address / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5th Floor, Tower B, Embassy TechVillage, Outer Ring Rd, Bengaluru"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    required={workPreference === 'onsite'}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">On-Site Supervisor Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Priya Sharma (Lead Architect)"
                      value={supervisorName}
                      onChange={e => setSupervisorName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">Supervisor Mobile</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={supervisorPhone}
                      onChange={e => setSupervisorPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Required Deliverables */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Required Deliverables <span className="text-red-500">*</span>
            </label>
            <div className="space-y-1.5 mb-2">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-800">{idx + 1}. {item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(idx)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add deliverable (e.g. Figma component library with tokens)"
                value={newDeliverable}
                onChange={e => setNewDeliverable(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300"
              />
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="px-3 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
              >
                Add Deliverable
              </button>
            </div>
          </div>

          {/* Additional Requirements */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">Additional Requirements</label>
            <input
              type="text"
              placeholder="e.g. Must have active DigiLocker verification, IST business hours availability..."
              value={additionalRequirements}
              onChange={e => setAdditionalRequirements(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
            />
          </div>

          {/* Employer Oath / Confirmation */}
          <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/90 space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={oathConfirmed}
                onChange={e => setOathConfirmed(e.target.checked)}
                className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                required
              />
              <span className="text-[11px] text-amber-950 leading-relaxed">
                <strong>Employer Truth & Trust Oath:</strong> I confirm that this task is legitimate, the compensation is accurate, and I will honor the agreed deliverables and payment upon successful completion without soliciting off-platform work.
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Post & Find Matches Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
