import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Briefcase, Zap, Shield, User, Bell } from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const { currentUser, switchUser, activeView, setActiveView, notifications } = useApp();
  const unreadNotifs = notifications.filter(n => n.userId === currentUser.id && !n.read).length;

  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-400 uppercase tracking-wider text-[10px]">Active Persona:</span>
          <span className="font-medium text-white">{currentUser.name}</span>
          <span className="text-slate-400">({currentUser.role.toUpperCase()})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px] hidden sm:inline">Switch Demo Role:</span>
          
          <button
            onClick={() => switchUser('emp-1')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              currentUser.id === 'emp-1'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            <span>Employer (Aarav)</span>
          </button>

          <button
            onClick={() => switchUser('pro-1')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              currentUser.id === 'pro-1'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>Pro (Rahul · Dev)</span>
          </button>

          <button
            onClick={() => switchUser('pro-5')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              currentUser.id === 'pro-5'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <User className="w-3 h-3" />
            <span>Pro (Sneha · Pending)</span>
          </button>

          <button
            onClick={() => switchUser('admin-1')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
              currentUser.id === 'admin-1'
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>Admin (Ops & Trust)</span>
          </button>

          {unreadNotifs > 0 && (
            <div className="ml-2 flex items-center gap-1 text-amber-400 font-mono text-[11px]">
              <Bell className="w-3 h-3" />
              <span>{unreadNotifs}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
