import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  ShieldCheck,
  AlertTriangle,
  UserCheck,
  UserX,
  FileCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Building2,
  FileText,
  TrendingUp,
  Activity,
  History
} from 'lucide-react';
import { VerificationRequest, SafetyReport, Task, UserProfile } from '../../types/index.ts';

export const AdminDashboard: React.FC = () => {
  const {
    allUsers,
    verificationRequests,
    tasks,
    assignments,
    safetyReports,
    auditLogs,
    adminReviewVerification,
    adminModerateTask,
    adminSuspendUser,
    adminRestoreUser
  } = useApp();

  const [activeTab, setActiveTab] = useState<'verifications' | 'moderation' | 'reports' | 'users' | 'audit'>('verifications');
  const [selectedReqForReview, setSelectedReqForReview] = useState<VerificationRequest | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  // Metrics
  const pendingPros = verificationRequests.filter(r => r.status === 'pending' && r.userType === 'professional').length;
  const pendingEmps = verificationRequests.filter(r => r.status === 'pending' && r.userType === 'employer').length;
  const openTasksCount = tasks.filter(t => t.status === 'open' || t.status === 'matching').length;
  const activeAssignmentsCount = assignments.filter(a => a.status === 'in_progress' || a.status === 'confirmed').length;
  const completedAssignmentsCount = assignments.filter(a => a.status === 'completed').length;
  const unresolvedReports = safetyReports.filter(r => r.status === 'pending' || r.status === 'investigating').length;

  const handleReviewAction = (reqId: string, status: 'verified' | 'rejected') => {
    adminReviewVerification(reqId, status, reviewNotes || 'Reviewed and certified by admin');
    setSelectedReqForReview(null);
    setReviewNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500 text-slate-950 font-bold text-xs">ADMIN</span>
            <h1 className="text-xl font-bold">Platform Trust, Verification & Ops Center</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Privileged compliance controls for Indian talent verification, task moderation, and dispute settlement.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 font-mono">
            Audit Trail Active
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">Pending Verifications</div>
          <div className="text-2xl font-bold font-mono text-amber-600 mt-1 tabular-nums">
            {pendingPros + pendingEmps}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {pendingPros} Pros · {pendingEmps} Employers
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">Open Tasks</div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
            {openTasksCount}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Under live matching</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">Active Assignments</div>
          <div className="text-2xl font-bold font-mono text-blue-600 mt-1 tabular-nums">
            {activeAssignmentsCount}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{completedAssignmentsCount} completed</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">Avg Qualified Response</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1 tabular-nums">
            18m
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Confirmed match: 2.4h</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] text-slate-500 font-medium">Unresolved Disputes</div>
          <div className="text-2xl font-bold font-mono text-red-600 mt-1 tabular-nums">
            {unresolvedReports}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Cancellation: 1.8%</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-4">
        <div className="flex border-b border-slate-200 gap-6 text-xs font-semibold overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('verifications')}
            className={`pb-3 cursor-pointer whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'verifications'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Verification Queue ({verificationRequests.filter(r => r.status === 'pending').length})
          </button>

          <button
            onClick={() => setActiveTab('moderation')}
            className={`pb-3 cursor-pointer whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'moderation'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Task Moderation ({tasks.length})
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`pb-3 cursor-pointer whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'reports'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Safety Reports & Investigations ({safetyReports.length})
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 cursor-pointer whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'users'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            User Registry & Suspensions ({allUsers.length})
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 cursor-pointer whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'audit'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Admin Audit Trail ({auditLogs.length})
          </button>
        </div>

        {/* Tab 1: Verification Queue */}
        {activeTab === 'verifications' && (
          <div className="space-y-3 text-xs">
            {verificationRequests.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
                No verification submissions in queue.
              </div>
            ) : (
              verificationRequests.map(req => {
                const user = allUsers.find(u => u.id === req.userId);
                return (
                  <div
                    key={req.id}
                    className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={user?.avatarUrl}
                          alt={user?.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{user?.name}</span>
                            <span className="text-[10px] font-semibold text-slate-500 uppercase">
                              ({req.userType})
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">{user?.email} · {user?.city}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            req.status === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : req.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {req.status}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(req.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                      <div className="font-semibold text-slate-800 capitalize">
                        Type: {req.verificationType.replace('_', ' ')}
                      </div>
                      <div className="text-slate-600 text-[11px]">
                        <strong>Credentials / Evidence:</strong> {req.documentsOrLinks.join(', ')}
                      </div>
                      {req.additionalNotes && (
                        <p className="text-slate-500 italic text-[11px]">Note: "{req.additionalNotes}"</p>
                      )}
                    </div>

                    {req.status === 'pending' && (
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => handleReviewAction(req.id, 'rejected')}
                          className="px-3 py-1.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 font-medium cursor-pointer"
                        >
                          Reject with Reason
                        </button>
                        <button
                          onClick={() => handleReviewAction(req.id, 'verified')}
                          className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-xs cursor-pointer"
                        >
                          Approve & Issue Trust Badge
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: Task Moderation */}
        {activeTab === 'moderation' && (
          <div className="space-y-3 text-xs">
            {tasks.map(task => {
              const employer = allUsers.find(u => u.id === task.employerId);
              return (
                <div key={task.id} className="bg-white p-5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{task.title}</span>
                      <p className="text-[11px] text-slate-500">
                        Employer: {employer?.name} · Budget: ₹{task.budgetINR.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          task.isModerated ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {task.isModerated ? 'Approved & Certified' : 'Flagged / Suspended'}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs">{task.description}</p>

                  <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                    {task.isModerated ? (
                      <button
                        onClick={() => adminModerateTask(task.id, false, 'Suspended for compliance inspection')}
                        className="px-3 py-1 rounded border border-red-200 text-red-700 hover:bg-red-50"
                      >
                        Suspend Listing
                      </button>
                    ) : (
                      <button
                        onClick={() => adminModerateTask(task.id, true, 'Verified legitimate')}
                        className="px-3 py-1 bg-emerald-600 text-white rounded font-bold"
                      >
                        Restore Listing
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Safety Reports */}
        {activeTab === 'reports' && (
          <div className="space-y-3 text-xs">
            {safetyReports.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
                No active safety incidents reported.
              </div>
            ) : (
              safetyReports.map(rep => {
                const reporter = allUsers.find(u => u.id === rep.reporterId);
                const reported = allUsers.find(u => u.id === rep.reportedUserId);
                return (
                  <div key={rep.id} className="bg-white p-5 rounded-xl border border-red-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded bg-red-100 text-red-700 font-bold uppercase text-[10px]">
                          {rep.severity}
                        </span>
                        <span className="font-bold text-slate-900 capitalize">
                          {rep.reportType.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(rep.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-slate-700 text-xs bg-red-50/50 p-3 rounded-lg border border-red-100 italic">
                      "{rep.details}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <div>
                        Reporter: <strong>{reporter?.name}</strong> | Reported: <strong>{reported?.name || 'Task/Listing'}</strong>
                      </div>
                      {reported && (
                        <button
                          onClick={() => adminSuspendUser(reported.id, `Reported for ${rep.reportType}`)}
                          className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer"
                        >
                          Suspend Reported Account
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 4: User Registry & Suspensions */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-xs">
            <table className="w-full text-left divide-y divide-slate-200">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 flex items-center gap-2.5">
                      <img src={u.avatarUrl} alt={u.name} className="w-7 h-7 rounded-full object-cover" referrerPolicy="no-referrer" />
                      <div>
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{u.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize font-medium">{u.role}</td>
                    <td className="px-4 py-3 text-slate-600">{u.city}</td>
                    <td className="px-4 py-3">
                      {u.isSuspended ? (
                        <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold">
                          Suspended
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {u.isSuspended ? (
                        <button
                          onClick={() => adminRestoreUser(u.id)}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium"
                        >
                          Reinstate
                        </button>
                      ) : u.role !== 'admin' ? (
                        <button
                          onClick={() => adminSuspendUser(u.id, 'Administrative security flag')}
                          className="px-2.5 py-1 rounded bg-red-50 hover:bg-red-100 text-red-700 font-medium"
                        >
                          Suspend
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 5: Admin Audit Trail */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Privileged Action Audit Trail</h3>
            <p className="text-slate-500 text-[11px]">Immutable record of all administrative verifications, suspensions, and moderations.</p>

            <div className="space-y-2 pt-2">
              {auditLogs.map(log => (
                <div key={log.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between gap-4">
                  <div>
                    <div className="font-bold text-slate-900 capitalize flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      {log.action.replace('_', ' ')}
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">{log.details}</p>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Enacted by: <strong>{log.adminName}</strong>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
