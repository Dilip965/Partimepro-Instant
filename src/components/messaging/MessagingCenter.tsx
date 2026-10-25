import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import {
  MessageSquare,
  Send,
  Lock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { Conversation, Message, UserProfile } from '../../types/index.ts';

export const MessagingCenter: React.FC = () => {
  const {
    conversations,
    messages,
    currentUser,
    allUsers,
    tasks,
    sendMessage
  } = useApp();

  const userConversations = conversations.filter(c => c.participantIds.includes(currentUser.id));
  const [activeConvId, setActiveConvId] = useState<string>(userConversations[0]?.id || '');

  const activeConv = conversations.find(c => c.id === activeConvId);
  const activeTask = activeConv ? tasks.find(t => t.id === activeConv.taskId) : null;
  const otherUserId = activeConv ? activeConv.participantIds.find(p => p !== currentUser.id) : null;
  const otherUser = otherUserId ? allUsers.find(u => u.id === otherUserId) : null;

  const convMessages = messages.filter(m => m.conversationId === activeConvId);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConvId) return;
    sendMessage(activeConvId, inputText.trim());
    setInputText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col md:flex-row h-[750px]">
        {/* Left: Conversations List */}
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col h-full bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 bg-white">
            <h2 className="font-bold text-slate-900 text-sm">Active Workspace Conversations</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Task-anchored collaboration</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {userConversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No active conversations yet. Messages appear automatically when you send or accept an offer.
              </div>
            ) : (
              userConversations.map(conv => {
                const partnerId = conv.participantIds.find(p => p !== currentUser.id);
                const partner = allUsers.find(u => u.id === partnerId);
                const task = tasks.find(t => t.id === conv.taskId);
                const isSelected = conv.id === activeConvId;

                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`p-3.5 cursor-pointer transition-colors text-xs space-y-1 ${
                      isSelected ? 'bg-amber-50/70 border-l-3 border-amber-500' : 'hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 truncate">{partner?.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 font-medium truncate">
                      Task: {task?.title}
                    </div>

                    <div className="text-[11px] text-slate-600 truncate">{conv.lastMessageText}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Active Chat Room */}
        <div className="flex-1 flex flex-col h-full bg-white">
          {activeConv && otherUser && activeTask ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-3">
                  <img
                    src={otherUser.avatarUrl}
                    alt={otherUser.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-xs">{otherUser.name}</h3>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        ({otherUser.role})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate max-w-md">
                      Task: <strong>{activeTask.title}</strong> (Budget: ₹{activeTask.budgetINR.toLocaleString('en-IN')})
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold uppercase">
                    {activeTask.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Masked PII Safe Messaging Notice */}
              <div className="px-4 py-2 bg-slate-100/90 border-b border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>
                  <strong>Safety Masking Active:</strong> Keep communication and file transfers within PartimePro Instant for milestone guarantees and dispute protection.
                </span>
              </div>

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40 text-xs">
                {convMessages.map(msg => {
                  const isMine = msg.senderId === currentUser.id;
                  const sender = allUsers.find(u => u.id === msg.senderId);

                  if (msg.isSystemEvent) {
                    return (
                      <div key={msg.id} className="flex justify-center my-3">
                        <div className="max-w-md p-2.5 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-950 text-center text-[11px] space-y-0.5 shadow-2xs">
                          <div className="font-bold flex items-center justify-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>System Milestone Event</span>
                          </div>
                          <p>{msg.text}</p>
                          <span className="text-[9px] text-slate-400 font-mono">
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md p-3 rounded-2xl shadow-2xs ${
                          isMine
                            ? 'bg-slate-900 text-white rounded-br-xs'
                            : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs'
                        }`}
                      >
                        <p className="leading-relaxed text-xs">{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 px-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex gap-2">
                <input
                  type="text"
                  placeholder="Discuss deliverable details, ask clarifying questions, share updates..."
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 text-xs disabled:opacity-40 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-xs text-slate-500 space-y-2">
              <MessageSquare className="w-10 h-10 text-slate-300" />
              <h3 className="font-bold text-slate-800 text-sm">Select a Conversation</h3>
              <p className="max-w-xs">
                Pick a task workspace from the left list to review milestone messages and communicate securely.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
