import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  ProfessionalProfile,
  EmployerProfile,
  Task,
  Offer,
  Assignment,
  Conversation,
  Message,
  StructuredReview,
  SafetyReport,
  AdminAuditLog,
  VerificationRequest,
  Notification,
  AvailabilityStatus,
  TaskStatus,
  UserRole
} from '../types/index.ts';
import {
  SEED_USERS,
  SEED_EMPLOYER_PROFILES,
  SEED_PROFESSIONAL_PROFILES,
  SEED_TASKS,
  SEED_OFFERS,
  SEED_ASSIGNMENTS,
  SEED_CONVERSATIONS,
  SEED_MESSAGES,
  SEED_REVIEWS,
  SEED_VERIFICATION_REQUESTS,
  SEED_SAFETY_REPORTS,
  SEED_ADMIN_AUDIT_LOGS
} from '../data/seedData.ts';

interface AppContextType {
  currentUser: UserProfile;
  allUsers: UserProfile[];
  employerProfiles: Record<string, EmployerProfile>;
  professionalProfiles: Record<string, ProfessionalProfile>;
  tasks: Task[];
  offers: Offer[];
  assignments: Assignment[];
  conversations: Conversation[];
  messages: Message[];
  reviews: StructuredReview[];
  safetyReports: SafetyReport[];
  verificationRequests: VerificationRequest[];
  auditLogs: AdminAuditLog[];
  notifications: Notification[];
  activeView: 'landing' | 'employer_dashboard' | 'professional_dashboard' | 'admin_dashboard' | 'talent_directory' | 'messages' | 'safety_center';
  setActiveView: (view: 'landing' | 'employer_dashboard' | 'professional_dashboard' | 'admin_dashboard' | 'talent_directory' | 'messages' | 'safety_center') => void;
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
  
  // Actions
  switchUser: (userId: string) => void;
  loginAsRole: (role: UserRole) => void;
  registerUser: (name: string, email: string, role: UserRole, city: string) => void;
  createTask: (taskData: Partial<Task>) => Task;
  sendOffer: (taskId: string, professionalId: string, proposedRateINR: number, coverNote: string) => Offer;
  respondToOffer: (offerId: string, action: 'accept' | 'decline', reason?: string) => void;
  confirmAssignment: (offerId: string) => Assignment | null;
  submitDeliverables: (assignmentId: string, notes: string, links: string[]) => void;
  completeAssignment: (assignmentId: string) => void;
  updateProfessionalAvailability: (status: AvailabilityStatus) => void;
  submitVerificationRequest: (type: 'identity' | 'skills' | 'business', docs: string[], notes?: string) => void;
  adminReviewVerification: (requestId: string, status: 'verified' | 'rejected', notes: string) => void;
  adminModerateTask: (taskId: string, approved: boolean, notes: string) => void;
  adminSuspendUser: (userId: string, reason: string) => void;
  adminRestoreUser: (userId: string) => void;
  submitReview: (reviewData: Omit<StructuredReview, 'id' | 'createdAt'>) => void;
  submitSafetyReport: (reportData: Omit<SafetyReport, 'id' | 'createdAt' | 'status'>) => void;
  sendMessage: (conversationId: string, text: string) => void;
  getOrCreateConversation: (taskId: string, otherUserId: string) => string;
  markNotificationsRead: () => void;
  updateCurrentUserProfile: (updates: Partial<UserProfile>) => void;
  updateProfessionalData: (updates: Partial<ProfessionalProfile>) => void;
  updateEmployerData: (updates: Partial<EmployerProfile>) => void;
  savedProfessionalIds: string[];
  saveProfessional: (proId: string) => void;
  removeSavedProfessional: (proId: string) => void;
  toggleSaveProfessional: (proId: string) => void;
  isProfessionalSaved: (proId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(SEED_USERS[0]); // Starts as Employer (Aarav)
  const [allUsers, setAllUsers] = useState<UserProfile[]>(SEED_USERS);
  const [employerProfiles, setEmployerProfiles] = useState<Record<string, EmployerProfile>>(SEED_EMPLOYER_PROFILES);
  const [professionalProfiles, setProfessionalProfiles] = useState<Record<string, ProfessionalProfile>>(SEED_PROFESSIONAL_PROFILES);
  const [tasks, setTasks] = useState<Task[]>(SEED_TASKS);
  const [offers, setOffers] = useState<Offer[]>(SEED_OFFERS);
  const [assignments, setAssignments] = useState<Assignment[]>(SEED_ASSIGNMENTS);
  const [conversations, setConversations] = useState<Conversation[]>(SEED_CONVERSATIONS);
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [reviews, setReviews] = useState<StructuredReview[]>(SEED_REVIEWS);
  const [safetyReports, setSafetyReports] = useState<SafetyReport[]>(SEED_SAFETY_REPORTS);
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>(SEED_VERIFICATION_REQUESTS);
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(SEED_ADMIN_AUDIT_LOGS);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const [activeView, setActiveView] = useState<'landing' | 'employer_dashboard' | 'professional_dashboard' | 'admin_dashboard' | 'talent_directory' | 'messages' | 'safety_center'>('landing');

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      userId: 'emp-1',
      title: 'Offer Accepted for React Bug Fix',
      message: 'Rahul Verma accepted the offer for ₹15,000 and is now working on the assignment.',
      type: 'assignment',
      read: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'notif-2',
      userId: 'pro-1',
      title: 'Assignment Active: Staging Branch Setup',
      message: 'Zynapse AI confirmed task scope. Staging repo access granted.',
      type: 'assignment',
      read: false,
      createdAt: new Date().toISOString()
    }
  ]);

  const switchUser = (userId: string) => {
    const user = allUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      if (user.role === 'employer') setActiveView('employer_dashboard');
      else if (user.role === 'professional') setActiveView('professional_dashboard');
      else if (user.role === 'admin') setActiveView('admin_dashboard');
    }
  };

  const loginAsRole = (role: UserRole) => {
    const target = allUsers.find(u => u.role === role);
    if (target) {
      switchUser(target.id);
    }
  };

  const registerUser = (name: string, email: string, role: UserRole, city: string) => {
    const newId = `user-${Date.now()}`;
    const newUser: UserProfile = {
      id: newId,
      name,
      email,
      role,
      city: city || 'Bengaluru',
      timezone: 'Asia/Kolkata (IST)',
      createdAt: new Date().toISOString(),
      avatarUrl: `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(name)}&backgroundColor=e2e8f0`
    };

    setAllUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);

    if (role === 'employer') {
      const newEmpProfile: EmployerProfile = {
        userId: newId,
        companyName: `${name}'s Firm`,
        companyDescription: 'Growing business seeking specialized on-demand professionals.',
        industry: 'Services & Technology',
        businessLocation: `${city}, India`,
        verificationStatus: 'unverified',
        verificationDetails: {
          govtIdChecked: false,
          skillsAssessed: false,
          businessRegistrationChecked: false
        },
        totalTasksPosted: 0,
        totalSpentINR: 0,
        ratingsCount: 0,
        averageRating: 5.0
      };
      setEmployerProfiles(prev => ({ ...prev, [newId]: newEmpProfile }));
      setActiveView('employer_dashboard');
    } else if (role === 'professional') {
      const newProProfile: ProfessionalProfile = {
        userId: newId,
        headline: 'Skilled Professional on PartimePro Instant',
        bio: 'Available for flexible, high-impact tasks and fast turnarounds.',
        skills: ['Graphic Design', 'Content Writing'],
        hourlyRate: 1000,
        fixedTaskMinRate: 3000,
        experienceYears: 2,
        experienceLevel: 'junior',
        workPreference: 'remote',
        availability: 'available_now',
        availabilityLastConfirmedAt: new Date().toISOString(),
        verificationStatus: 'unverified',
        verificationDetails: {
          govtIdChecked: false,
          skillsAssessed: false,
          businessRegistrationChecked: false
        },
        portfolio: [],
        completedAssignmentsCount: 0,
        averageRating: 5.0,
        ratingsCount: 0,
        totalEarningsINR: 0,
        profileCompleteness: 50
      };
      setProfessionalProfiles(prev => ({ ...prev, [newId]: newProProfile }));
      setActiveView('professional_dashboard');
    } else {
      setActiveView('admin_dashboard');
    }
  };

  const createTask = (taskData: Partial<Task>): Task => {
    const newId = `task-${Date.now()}`;
    const newTask: Task = {
      id: newId,
      employerId: currentUser.id,
      title: taskData.title || 'Untitled Skilled Task',
      description: taskData.description || '',
      category: taskData.category || 'Development & Technology',
      skills: taskData.skills || ['React'],
      experienceLevel: taskData.experienceLevel || 'mid',
      budgetINR: taskData.budgetINR || 10000,
      paymentType: taskData.paymentType || 'fixed',
      estimatedHours: taskData.estimatedHours || 10,
      deadline: taskData.deadline || new Date(Date.now() + 86400000 * 3).toISOString(),
      preferredStartTime: taskData.preferredStartTime || 'Immediately',
      workPreference: taskData.workPreference || 'remote',
      location: taskData.location,
      requiredDeliverables: taskData.requiredDeliverables || ['Source code and verification test'],
      additionalRequirements: taskData.additionalRequirements,
      supervisorName: taskData.supervisorName,
      supervisorPhone: taskData.supervisorPhone,
      status: 'matching',
      paymentStatus: 'not_agreed',
      createdAt: new Date().toISOString(),
      isModerated: true
    };

    setTasks(prev => [newTask, ...prev]);

    // Update employer stats
    setEmployerProfiles(prev => {
      const emp = prev[currentUser.id];
      if (!emp) return prev;
      return {
        ...prev,
        [currentUser.id]: {
          ...emp,
          totalTasksPosted: emp.totalTasksPosted + 1
        }
      };
    });

    // Notify admins
    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        adminId: 'system',
        adminName: 'Automated Compliance Engine',
        action: 'moderate_task',
        targetType: 'task',
        targetId: newId,
        details: `Task posted by ${currentUser.name}: "${newTask.title}" for ₹${newTask.budgetINR.toLocaleString('en-IN')}`,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);

    return newTask;
  };

  const sendOffer = (taskId: string, professionalId: string, proposedRateINR: number, coverNote: string): Offer => {
    const offerId = `off-${Date.now()}`;
    const targetTask = tasks.find(t => t.id === taskId);
    const newOffer: Offer = {
      id: offerId,
      taskId,
      employerId: currentUser.id,
      professionalId,
      proposedRateINR,
      paymentType: targetTask?.paymentType || 'fixed',
      estimatedCompletionDate: targetTask?.deadline || new Date(Date.now() + 86400000 * 3).toISOString(),
      coverNote,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setOffers(prev => [newOffer, ...prev]);

    // Update task status
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'offers_sent' } : t));

    // Create notification for professional
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        userId: professionalId,
        title: 'New Paid Task Offer Received',
        message: `${currentUser.name} sent you an offer of ₹${proposedRateINR.toLocaleString('en-IN')} for: "${targetTask?.title}"`,
        type: 'offer',
        read: false,
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);

    // Also spin up a conversation
    getOrCreateConversation(taskId, professionalId);

    return newOffer;
  };

  const respondToOffer = (offerId: string, action: 'accept' | 'decline', reason?: string) => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return;

    if (action === 'accept') {
      setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'accepted', respondedAt: new Date().toISOString() } : o));
      confirmAssignment(offerId);
    } else {
      setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: 'declined', declineReason: reason || 'Currently unavailable', respondedAt: new Date().toISOString() } : o));
      // Notify employer
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          userId: offer.employerId,
          title: 'Offer Declined (No Penalty)',
          message: `${currentUser.name} declined the offer: "${reason || 'Unavailable'}". You can review other matched professionals.`,
          type: 'offer',
          read: false,
          createdAt: new Date().toISOString()
        },
        ...prev
      ]);
    }
  };

  const confirmAssignment = (offerId: string): Assignment | null => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return null;

    const task = tasks.find(t => t.id === offer.taskId);
    if (!task) return null;

    const asgId = `asg-${Date.now()}`;
    const platformFee = Math.round(offer.proposedRateINR * 0.05); // 5% platform fee
    const newAssignment: Assignment = {
      id: asgId,
      taskId: offer.taskId,
      employerId: offer.employerId,
      professionalId: offer.professionalId,
      agreedRateINR: offer.proposedRateINR,
      paymentType: offer.paymentType,
      platformFeeINR: platformFee,
      totalPayableINR: offer.proposedRateINR + platformFee,
      status: 'in_progress',
      paymentStatus: 'agreed',
      confirmedAt: new Date().toISOString()
    };

    setAssignments(prev => [newAssignment, ...prev]);

    // Update task
    setTasks(prev => prev.map(t => t.id === offer.taskId ? {
      ...t,
      status: 'in_progress',
      paymentStatus: 'agreed',
      selectedProfessionalId: offer.professionalId
    } : t));

    // Send system message in conversation
    const conv = conversations.find(c => c.taskId === offer.taskId);
    if (conv) {
      const sysMsg: Message = {
        id: `msg-${Date.now()}`,
        conversationId: conv.id,
        senderId: offer.employerId,
        text: `Assignment Confirmed! Scope and budget of ₹${offer.proposedRateINR.toLocaleString('en-IN')} agreed. Work is now In Progress.`,
        isSystemEvent: true,
        systemEventType: 'scope_confirmed',
        createdAt: new Date().toISOString()
      };
      setMessages(prev => [...prev, sysMsg]);
    }

    return newAssignment;
  };

  const submitDeliverables = (assignmentId: string, notes: string, links: string[]) => {
    setAssignments(prev => prev.map(a => a.id === assignmentId ? {
      ...a,
      deliverablesNotes: notes,
      deliverablesSubmitted: links,
      deliverablesSubmittedAt: new Date().toISOString()
    } : a));

    const asg = assignments.find(a => a.id === assignmentId);
    if (asg) {
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          userId: asg.employerId,
          title: 'Deliverables Submitted for Review',
          message: `${currentUser.name} has submitted deliverables for task #${asg.taskId.slice(-4)}. Please review and confirm completion.`,
          type: 'assignment',
          read: false,
          createdAt: new Date().toISOString()
        },
        ...prev
      ]);

      const conv = conversations.find(c => c.taskId === asg.taskId);
      if (conv) {
        const sysMsg: Message = {
          id: `msg-${Date.now()}`,
          conversationId: conv.id,
          senderId: asg.professionalId,
          text: `Deliverables submitted! Note: "${notes}". Links: ${links.join(', ')}`,
          isSystemEvent: true,
          systemEventType: 'deliverable_submitted',
          createdAt: new Date().toISOString()
        };
        setMessages(prev => [...prev, sysMsg]);
      }
    }
  };

  const completeAssignment = (assignmentId: string) => {
    const asg = assignments.find(a => a.id === assignmentId);
    if (!asg) return;

    setAssignments(prev => prev.map(a => a.id === assignmentId ? {
      ...a,
      status: 'completed',
      paymentStatus: 'paid',
      completedAt: new Date().toISOString()
    } : a));

    setTasks(prev => prev.map(t => t.id === asg.taskId ? {
      ...t,
      status: 'completed',
      paymentStatus: 'paid'
    } : t));

    // Update professional total earnings and completed assignment count
    setProfessionalProfiles(prev => {
      const pro = prev[asg.professionalId];
      if (!pro) return prev;
      return {
        ...prev,
        [asg.professionalId]: {
          ...pro,
          completedAssignmentsCount: pro.completedAssignmentsCount + 1,
          totalEarningsINR: pro.totalEarningsINR + asg.agreedRateINR
        }
      };
    });

    // Update employer total spent
    setEmployerProfiles(prev => {
      const emp = prev[asg.employerId];
      if (!emp) return prev;
      return {
        ...prev,
        [asg.employerId]: {
          ...emp,
          totalSpentINR: emp.totalSpentINR + asg.totalPayableINR
        }
      };
    });

    // Notifications
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        userId: asg.professionalId,
        title: 'Assignment Completed & Payment Released',
        message: `Task #${asg.taskId.slice(-4)} marked as completed. ₹${asg.agreedRateINR.toLocaleString('en-IN')} has been disbursed. Please leave structured feedback!`,
        type: 'assignment',
        read: false,
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const updateProfessionalAvailability = (status: AvailabilityStatus) => {
    const now = new Date().toISOString();
    setProfessionalProfiles(prev => {
      const current = prev[currentUser.id];
      if (!current) return prev;
      return {
        ...prev,
        [currentUser.id]: {
          ...current,
          availability: status,
          availabilityLastConfirmedAt: now
        }
      };
    });
  };

  const submitVerificationRequest = (type: 'identity' | 'skills' | 'business', docs: string[], notes?: string) => {
    const newReq: VerificationRequest = {
      id: `ver-req-${Date.now()}`,
      userId: currentUser.id,
      userType: currentUser.role === 'employer' ? 'employer' : 'professional',
      verificationType: type,
      documentsOrLinks: docs,
      additionalNotes: notes,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    setVerificationRequests(prev => [newReq, ...prev]);

    // Update user's profile state to pending
    if (currentUser.role === 'professional') {
      setProfessionalProfiles(prev => {
        const pro = prev[currentUser.id];
        if (!pro) return prev;
        return {
          ...prev,
          [currentUser.id]: {
            ...pro,
            verificationStatus: 'pending'
          }
        };
      });
    } else if (currentUser.role === 'employer') {
      setEmployerProfiles(prev => {
        const emp = prev[currentUser.id];
        if (!emp) return prev;
        return {
          ...prev,
          [currentUser.id]: {
            ...emp,
            verificationStatus: 'pending'
          }
        };
      });
    }
  };

  const adminReviewVerification = (requestId: string, status: 'verified' | 'rejected', notes: string) => {
    const req = verificationRequests.find(r => r.id === requestId);
    if (!req) return;

    setVerificationRequests(prev => prev.map(r => r.id === requestId ? {
      ...r,
      status,
      reviewedAt: new Date().toISOString(),
      reviewerNotes: notes
    } : r));

    if (req.userType === 'professional') {
      setProfessionalProfiles(prev => {
        const pro = prev[req.userId];
        if (!pro) return prev;
        return {
          ...prev,
          [req.userId]: {
            ...pro,
            verificationStatus: status,
            verificationDetails: {
              ...pro.verificationDetails,
              govtIdChecked: status === 'verified',
              govtIdType: status === 'verified' ? 'DigiLocker Verified' : undefined,
              skillsAssessed: status === 'verified',
              verifiedAt: status === 'verified' ? new Date().toISOString() : undefined,
              verifiedByAdminId: currentUser.id
            }
          }
        };
      });
    } else {
      setEmployerProfiles(prev => {
        const emp = prev[req.userId];
        if (!emp) return prev;
        return {
          ...prev,
          [req.userId]: {
            ...emp,
            verificationStatus: status,
            verificationDetails: {
              ...emp.verificationDetails,
              govtIdChecked: status === 'verified',
              businessRegistrationChecked: status === 'verified',
              verifiedAt: status === 'verified' ? new Date().toISOString() : undefined,
              verifiedByAdminId: currentUser.id
            }
          }
        };
      });
    }

    // Add audit log
    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        adminId: currentUser.id,
        adminName: currentUser.name,
        action: status === 'verified' ? 'approve_verification' : 'reject_verification',
        targetType: 'user',
        targetId: req.userId,
        details: `Verification request ${requestId} marked as ${status}: ${notes}`,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const adminModerateTask = (taskId: string, approved: boolean, notes: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? {
      ...t,
      isModerated: approved,
      moderationNotes: notes,
      status: approved ? t.status : 'cancelled'
    } : t));

    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        adminId: currentUser.id,
        adminName: currentUser.name,
        action: 'moderate_task',
        targetType: 'task',
        targetId: taskId,
        details: approved ? `Task approved: ${notes}` : `Task suspended/cancelled: ${notes}`,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const adminSuspendUser = (userId: string, reason: string) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, isSuspended: true, suspensionReason: reason } : u));
    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        adminId: currentUser.id,
        adminName: currentUser.name,
        action: 'suspend_user',
        targetType: 'user',
        targetId: userId,
        details: `Account suspended. Reason: ${reason}`,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const adminRestoreUser = (userId: string) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, isSuspended: false, suspensionReason: undefined } : u));
    setAuditLogs(prev => [
      {
        id: `audit-${Date.now()}`,
        adminId: currentUser.id,
        adminName: currentUser.name,
        action: 'restore_user',
        targetType: 'user',
        targetId: userId,
        details: `Account reinstated following safety review.`,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const submitReview = (reviewData: Omit<StructuredReview, 'id' | 'createdAt'>) => {
    const newRev: StructuredReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    setReviews(prev => [newRev, ...prev]);

    // Recalculate average rating for reviewee
    if (reviewData.reviewerRole === 'employer') {
      setProfessionalProfiles(prev => {
        const pro = prev[reviewData.revieweeId];
        if (!pro) return prev;
        const currentCount = pro.ratingsCount;
        const currentAvg = pro.averageRating;
        const score = (reviewData.workQualityScore + reviewData.communicationScore + reviewData.timelinessScore) / 3;
        const newAvg = Number(((currentAvg * currentCount + score) / (currentCount + 1)).toFixed(2));
        return {
          ...prev,
          [reviewData.revieweeId]: {
            ...pro,
            ratingsCount: currentCount + 1,
            averageRating: newAvg
          }
        };
      });
    } else {
      setEmployerProfiles(prev => {
        const emp = prev[reviewData.revieweeId];
        if (!emp) return prev;
        const currentCount = emp.ratingsCount;
        const currentAvg = emp.averageRating;
        const score = (reviewData.communicationScore + reviewData.timelinessScore) / 2;
        const newAvg = Number(((currentAvg * currentCount + score) / (currentCount + 1)).toFixed(2));
        return {
          ...prev,
          [reviewData.revieweeId]: {
            ...emp,
            ratingsCount: currentCount + 1,
            averageRating: newAvg
          }
        };
      });
    }
  };

  const submitSafetyReport = (reportData: Omit<SafetyReport, 'id' | 'createdAt' | 'status'>) => {
    const newRep: SafetyReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setSafetyReports(prev => [newRep, ...prev]);

    // Notify user that report is acknowledged
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        userId: currentUser.id,
        title: 'Safety Report Acknowledged',
        message: `Your report (#${newRep.id}) has been submitted to the PartimePro Trust & Safety squad. We will investigate promptly.`,
        type: 'safety',
        read: false,
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const sendMessage = (conversationId: string, text: string) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      text,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMsg]);

    setConversations(prev => prev.map(c => {
      if (c.id !== conversationId) return c;
      const otherUser = c.participantIds.find(p => p !== currentUser.id);
      return {
        ...c,
        lastMessageText: text,
        lastMessageAt: new Date().toISOString(),
        unreadCounts: otherUser ? {
          ...c.unreadCounts,
          [otherUser]: (c.unreadCounts[otherUser] || 0) + 1
        } : c.unreadCounts
      };
    }));
  };

  const getOrCreateConversation = (taskId: string, otherUserId: string): string => {
    const existing = conversations.find(c => c.taskId === taskId && c.participantIds.includes(otherUserId));
    if (existing) return existing.id;

    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      taskId,
      participantIds: [currentUser.id, otherUserId],
      lastMessageText: 'Task conversation initiated',
      lastMessageAt: new Date().toISOString(),
      unreadCounts: {
        [otherUserId]: 1,
        [currentUser.id]: 0
      }
    };

    setConversations(prev => [newConv, ...prev]);
    return newConvId;
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => n.userId === currentUser.id ? { ...n, read: true } : n));
  };

  const updateCurrentUserProfile = (updates: Partial<UserProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...updates } : u));
  };

  const updateProfessionalData = (updates: Partial<ProfessionalProfile>) => {
    setProfessionalProfiles(prev => ({
      ...prev,
      [currentUser.id]: {
        ...(prev[currentUser.id] || {}),
        ...updates
      }
    }));
  };

  const updateEmployerData = (updates: Partial<EmployerProfile>) => {
    setEmployerProfiles(prev => ({
      ...prev,
      [currentUser.id]: {
        ...(prev[currentUser.id] || {}),
        ...updates
      }
    }));
  };

  const currentEmployer = employerProfiles[currentUser.id];
  const savedProfessionalIds = currentEmployer?.savedProfessionalIds || [];

  const saveProfessional = (proId: string) => {
    setEmployerProfiles(prev => {
      const emp = prev[currentUser.id] || {
        userId: currentUser.id,
        companyName: `${currentUser.name}'s Firm`,
        companyDescription: '',
        industry: 'Services',
        businessLocation: currentUser.city,
        verificationStatus: 'unverified',
        verificationDetails: { govtIdChecked: false, skillsAssessed: false, businessRegistrationChecked: false },
        totalTasksPosted: 0,
        totalSpentINR: 0,
        ratingsCount: 0,
        averageRating: 5.0,
        savedProfessionalIds: []
      };
      const existing = emp.savedProfessionalIds || [];
      if (existing.includes(proId)) return prev;
      return {
        ...prev,
        [currentUser.id]: {
          ...emp,
          savedProfessionalIds: [...existing, proId]
        }
      };
    });
  };

  const removeSavedProfessional = (proId: string) => {
    setEmployerProfiles(prev => {
      const emp = prev[currentUser.id];
      if (!emp) return prev;
      const existing = emp.savedProfessionalIds || [];
      return {
        ...prev,
        [currentUser.id]: {
          ...emp,
          savedProfessionalIds: existing.filter(id => id !== proId)
        }
      };
    });
  };

  const toggleSaveProfessional = (proId: string) => {
    if (isProfessionalSaved(proId)) {
      removeSavedProfessional(proId);
    } else {
      saveProfessional(proId);
    }
  };

  const isProfessionalSaved = (proId: string): boolean => {
    const emp = employerProfiles[currentUser.id];
    return (emp?.savedProfessionalIds || []).includes(proId);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        employerProfiles,
        professionalProfiles,
        tasks,
        offers,
        assignments,
        conversations,
        messages,
        reviews,
        safetyReports,
        verificationRequests,
        auditLogs,
        notifications,
        activeView,
        setActiveView,
        selectedTaskId,
        setSelectedTaskId,
        switchUser,
        loginAsRole,
        registerUser,
        createTask,
        sendOffer,
        respondToOffer,
        confirmAssignment,
        submitDeliverables,
        completeAssignment,
        updateProfessionalAvailability,
        submitVerificationRequest,
        adminReviewVerification,
        adminModerateTask,
        adminSuspendUser,
        adminRestoreUser,
        submitReview,
        submitSafetyReport,
        sendMessage,
        getOrCreateConversation,
        markNotificationsRead,
        updateCurrentUserProfile,
        updateProfessionalData,
        updateEmployerData,
        savedProfessionalIds,
        saveProfessional,
        removeSavedProfessional,
        toggleSaveProfessional,
        isProfessionalSaved
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
