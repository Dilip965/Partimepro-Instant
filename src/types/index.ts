/**
 * PartimePro Instant - Core Domain Entities & Types
 * Trusted, On-Demand Skilled Talent Marketplace
 */

export type UserRole = 'employer' | 'professional' | 'admin';

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export type AvailabilityStatus = 'available_now' | 'available_this_week' | 'busy' | 'unavailable';

export type TaskStatus = 
  | 'draft' 
  | 'open' 
  | 'matching' 
  | 'offers_sent' 
  | 'awaiting_employer' 
  | 'confirmed' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled' 
  | 'disputed';

export type PaymentStatus = 
  | 'not_agreed' 
  | 'agreed' 
  | 'due' 
  | 'paid' 
  | 'disputed' 
  | 'refunded';

export type PaymentType = 'hourly' | 'fixed';

export type WorkPreference = 'remote' | 'onsite' | 'hybrid';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  city: string;
  timezone: string;
  createdAt: string;
  isSuspended?: boolean;
  suspensionReason?: string;
  blockedUserIds?: string[];
}

export interface VerificationCheckDetails {
  govtIdChecked: boolean;
  govtIdType?: string;
  skillsAssessed: boolean;
  skillsAssessedNotes?: string;
  businessRegistrationChecked: boolean;
  businessRegistrationNumber?: string;
  verifiedAt?: string;
  verifiedByAdminId?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  linkUrl: string;
  thumbnailUrl?: string;
  category: string;
  tags: string[];
}

export interface ProfessionalProfile {
  userId: string;
  headline: string;
  bio: string;
  skills: string[];
  hourlyRate: number; // in INR
  fixedTaskMinRate: number; // in INR
  experienceYears: number;
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
  workPreference: WorkPreference;
  availability: AvailabilityStatus;
  availabilityLastConfirmedAt: string;
  verificationStatus: VerificationStatus;
  verificationDetails: VerificationCheckDetails;
  portfolio: PortfolioItem[];
  completedAssignmentsCount: number;
  averageRating: number;
  ratingsCount: number;
  totalEarningsINR: number;
  profileCompleteness: number; // 0 to 100
}

export interface EmployerProfile {
  userId: string;
  companyName: string;
  companyWebsite?: string;
  companyDescription: string;
  industry: string;
  businessLocation: string;
  verificationStatus: VerificationStatus;
  verificationDetails: VerificationCheckDetails;
  totalTasksPosted: number;
  totalSpentINR: number;
  ratingsCount: number;
  averageRating: number;
  savedProfessionalIds?: string[];
}

export interface TaskSkill {
  name: string;
  required: boolean;
}

export interface Task {
  id: string;
  employerId: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  experienceLevel: 'junior' | 'mid' | 'senior';
  budgetINR: number;
  paymentType: PaymentType;
  estimatedHours?: number;
  deadline: string;
  preferredStartTime: string;
  workPreference: WorkPreference;
  location?: string; // required if onsite
  requiredDeliverables: string[];
  additionalRequirements?: string;
  supervisorName?: string; // for onsite
  supervisorPhone?: string; // for onsite
  status: TaskStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  selectedProfessionalId?: string;
  isModerated: boolean;
  moderationNotes?: string;
}

export interface MatchingScoreBreakdown {
  totalScore: number; // 0 - 100
  skillMatch: number; // max 40
  availabilityMatch: number; // max 25
  budgetMatch: number; // max 15
  experienceMatch: number; // max 10
  preferenceMatch: number; // max 10
  matchReasons: string[];
}

export interface TaskMatch {
  taskId: string;
  professionalId: string;
  scoreBreakdown: MatchingScoreBreakdown;
  notifiedAt?: string;
}

export type OfferStatus = 'pending' | 'accepted' | 'declined' | 'withdrawn' | 'expired';

export interface Offer {
  id: string;
  taskId: string;
  employerId: string;
  professionalId: string;
  proposedRateINR: number;
  paymentType: PaymentType;
  estimatedCompletionDate: string;
  coverNote: string;
  status: OfferStatus;
  declineReason?: string;
  createdAt: string;
  respondedAt?: string;
}

export interface Assignment {
  id: string;
  taskId: string;
  employerId: string;
  professionalId: string;
  agreedRateINR: number;
  paymentType: PaymentType;
  platformFeeINR: number;
  totalPayableINR: number;
  status: TaskStatus;
  paymentStatus: PaymentStatus;
  deliverablesSubmitted?: string[];
  deliverablesNotes?: string;
  deliverablesSubmittedAt?: string;
  confirmedAt: string;
  completedAt?: string;
  onsiteCheckInTime?: string;
  disputeId?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  isSystemEvent?: boolean;
  systemEventType?: 'offer_sent' | 'offer_accepted' | 'scope_confirmed' | 'deliverable_submitted' | 'completed';
  createdAt: string;
}

export interface Conversation {
  id: string;
  taskId: string;
  assignmentId?: string;
  participantIds: string[]; // [employerId, professionalId]
  lastMessageText: string;
  lastMessageAt: string;
  unreadCounts: Record<string, number>; // userId -> unread count
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'offer' | 'assignment' | 'verification' | 'message' | 'system' | 'safety';
  read: boolean;
  linkAction?: string;
  createdAt: string;
}

export interface StructuredReview {
  id: string;
  assignmentId: string;
  taskId: string;
  reviewerId: string;
  revieweeId: string;
  reviewerRole: 'employer' | 'professional';
  workQualityScore: number; // 1 to 5
  communicationScore: number; // 1 to 5
  timelinessScore: number; // 1 to 5
  deliverablesCompleted: boolean;
  paymentCompletedAsAgreed: boolean;
  comments: string;
  isContested?: boolean;
  contestReason?: string;
  createdAt: string;
}

export interface SafetyReport {
  id: string;
  reporterId: string;
  reportedUserId?: string;
  reportedTaskId?: string;
  reportType: 'spam' | 'inappropriate' | 'off_platform_payment' | 'fake_profile' | 'safety_incident' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
  evidenceUrls?: string[];
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  adminNotes?: string;
  resolvedAt?: string;
  resolvedByAdminId?: string;
  createdAt: string;
}

export interface Dispute {
  id: string;
  assignmentId: string;
  initiatedById: string;
  reason: 'work_quality' | 'non_delivery' | 'unresponsive' | 'scope_creep' | 'payment_issue';
  details: string;
  claimedAmountINR: number;
  status: 'opened' | 'under_review' | 'resolved_refund' | 'resolved_release' | 'resolved_split';
  resolutionSummary?: string;
  resolvedByAdminId?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface AdminAuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: 'approve_verification' | 'reject_verification' | 'suspend_user' | 'restore_user' | 'moderate_task' | 'resolve_dispute' | 'resolve_safety_report';
  targetType: 'user' | 'task' | 'assignment' | 'report';
  targetId: string;
  details: string;
  timestamp: string;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  userType: 'professional' | 'employer';
  verificationType: 'identity' | 'skills' | 'business';
  documentsOrLinks: string[];
  additionalNotes?: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
}
