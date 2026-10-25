import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { Zap, MessageSquare, Shield, User, Menu, X, PlusCircle, Bell } from 'lucide-react';

interface NavbarProps {
  onOpenPostTask?: () => void;
  onOpenAuth?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPostTask, onOpenAuth }) => {
  const { currentUser, activeView, setActiveView, notifications, markNotificationsRead } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const userNotifs = notifications.filter(n => n.userId === currentUser.id);
  const unreadCount = userNotifs.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand title, one line */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveView('landing')}
              className="flex items-center gap-2 group text-left cursor-pointer focus-visible:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-amber-500 shadow-sm group-hover:bg-slate-800 transition-colors">
                <Zap className="w-5 h-5 fill-amber-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap leading-none">
                  PartimePro <span className="text-amber-600 font-extrabold">Instant</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase mt-0.5">
                  Trusted Skills · Now
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-5 concise single-line text links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveView('talent_directory')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'talent_directory' ? 'text-amber-600 font-semibold' : ''
              }`}
            >
              Find Talent
            </button>

            {currentUser.role === 'employer' ? (
              <button
                onClick={() => setActiveView('employer_dashboard')}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeView === 'employer_dashboard' ? 'text-amber-600 font-semibold' : ''
                }`}
              >
                Employer Hub
              </button>
            ) : currentUser.role === 'professional' ? (
              <button
                onClick={() => setActiveView('professional_dashboard')}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeView === 'professional_dashboard' ? 'text-amber-600 font-semibold' : ''
                }`}
              >
                Pro Dashboard
              </button>
            ) : null}

            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActiveView('admin_dashboard')}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeView === 'admin_dashboard' ? 'text-amber-600 font-semibold' : ''
                }`}
              >
                Admin Console
              </button>
            )}

            <button
              onClick={() => setActiveView('messages')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeView === 'messages' ? 'text-amber-600 font-semibold' : ''
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Workspace Chat</span>
            </button>

            <button
              onClick={() => setActiveView('safety_center')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeView === 'safety_center' ? 'text-amber-600 font-semibold' : ''
              }`}
            >
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Trust & Safety</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications && unreadCount > 0) markNotificationsRead();
                }}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg relative transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-900">Notifications</span>
                    <span className="text-[11px] text-slate-400 font-mono">{userNotifs.length} total</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 py-1">
                    {userNotifs.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-500">No new notifications</div>
                    ) : (
                      userNotifs.map(n => (
                        <div key={n.id} className="py-2 px-1 hover:bg-slate-50 rounded text-xs space-y-0.5">
                          <div className="font-semibold text-slate-900">{n.title}</div>
                          <div className="text-slate-600 text-[11px]">{n.message}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {currentUser.role === 'employer' ? (
              <button
                onClick={onOpenPostTask}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Task</span>
              </button>
            ) : currentUser.role === 'professional' ? (
              <button
                onClick={() => setActiveView('talent_directory')}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Explore Open Market
              </button>
            ) : (
              <button
                onClick={() => setActiveView('admin_dashboard')}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Moderation Center
              </button>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => { setActiveView('talent_directory'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Find Talent
          </button>
          <button
            onClick={() => { setActiveView('employer_dashboard'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Employer Hub
          </button>
          <button
            onClick={() => { setActiveView('professional_dashboard'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Pro Dashboard
          </button>
          <button
            onClick={() => { setActiveView('messages'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Workspace Chat
          </button>
          <button
            onClick={() => { setActiveView('safety_center'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Trust & Safety
          </button>
          {currentUser.role === 'admin' && (
            <button
              onClick={() => { setActiveView('admin_dashboard'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Admin Console
            </button>
          )}
        </div>
      )}
    </header>
  );
};
