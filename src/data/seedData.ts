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
  VerificationRequest
} from '../types/index.ts';

// Image assets generated for genuine talent personas
export const TALENT_HERO_IMAGE = '/src/assets/images/hero_marketplace_talent_1792864540279.jpg';
export const AVATAR_DESIGNER = '/src/assets/images/avatar_designer_priya_1792864541049.jpg';
export const AVATAR_DEVELOPER = '/src/assets/images/avatar_developer_rahul_1792864541298.jpg';
export const AVATAR_MARKETER = '/src/assets/images/avatar_marketer_ananya_1792864541088.jpg';
export const AVATAR_ANALYST = '/src/assets/images/avatar_analyst_vikram_1792864541343.jpg';

export const SEED_USERS: UserProfile[] = [
  // Employers
  {
    id: 'emp-1',
    name: 'Aarav Malhotra',
    email: 'aarav@zynapse.ai',
    role: 'employer',
    city: 'Bengaluru',
    timezone: 'Asia/Kolkata (IST)',
    createdAt: '2026-08-15T09:00:00Z',
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=AaravMalhotra&backgroundColor=b6e3f4'
  },
  {
    id: 'emp-2',
    name: 'Meera Nambiar',
    email: 'meera@elevatestudio.in',
    role: 'employer',
    city: 'Mumbai',
    timezone: 'Asia/Kolkata (IST)',
    createdAt: '2026-09-01T10:30:00Z',
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=MeeraNambiar&backgroundColor=ffd5dc'
  },
  // Professionals
  {
    id: 'pro-1',
    name: 'Rahul Verma',
    email: 'rahul.verma.code@gmail.com',
    role: 'professional',
    city: 'Bengaluru',
    timezone: 'Asia/Kolkata (IST)',
    createdAt: '2026-07-10T08:00:00Z',
    avatarUrl: AVATAR_DEVELOPER
  },
  {
    id: 'pro-2',
    name: 'Priya Sundaram',
    email: 'priya.s.design@gmail.com',
    role: 'professional',
    city: 'Chennai',
    timezone: 'Asia/Kolkata (IST)',
    createdAt: '2026-07-12T11:00:00Z',
    avatarUrl: AVATAR_DESIGNER
  },
  {
    id: 'pro-3',
    name: 'Ananya Deshmukh',
    email: 'ananya.growth@outlook.com',
    role: 'professional',
    city: 'Pune',
    timezone: 'Asia/Kolkata (IST)',
    createdAt: '2026-08-05T14:20:00Z',
    avatarUrl: AVATAR_MARKETER
  },
  {
    id: 'pro-4',
    name: 'Vikram Singhania',
    email: 'vikram.analyst@finpro.in',
    role: 'professional',
    city: 'Gurugram',
    timezone: 'Asia/Kolkata (IST)',
    createdAt: '2026-08-20T16:45:00Z',
    avatarUrl: AVATAR_ANALYST
  },
  {
    id: 'pro-5',
    name: 'Sneha Patel',
    email: 'sneha.motion@designlab.in',
    role: 'professional',
    city: 'Ahmedabad',
    timezone: 'Asia/Kolkata (IST)',
    createdAt: '2026-09-15T12:00:00Z',
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=SnehaPatel&backgroundColor=d1d4f9'
  },
  // Admin
  {
    id: 'admin-1',
    name: 'Dilip Nandiwale (Marketplace Admin)',
    email: 'dilipnandiwale.instagrp@gmail.com',
    role: 'admin',
    city: 'Bengaluru',
    timezone: 'Asia/Kolkata (IST)',
    createdAt: '2026-06-01T00:00:00Z',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=MarketplaceAdmin&backgroundColor=c0aede'
  }
];

export const SEED_EMPLOYER_PROFILES: Record<string, EmployerProfile> = {
  'emp-1': {
    userId: 'emp-1',
    companyName: 'Zynapse AI Technologies Pvt Ltd',
    companyWebsite: 'https://zynapse.ai',
    companyDescription: 'Enterprise AI workflows and automation systems for fast-growing Indian enterprises and global SaaS companies.',
    industry: 'Software & Technology',
    businessLocation: 'Indiranagar, Bengaluru, Karnataka',
    verificationStatus: 'verified',
    verificationDetails: {
      govtIdChecked: true,
      govtIdType: 'Aadhaar & PAN verified',
      skillsAssessed: false,
      businessRegistrationChecked: true,
      businessRegistrationNumber: 'U72900KA2024PTC189201 (MCA Verified)',
      verifiedAt: '2026-08-16T14:30:00Z',
      verifiedByAdminId: 'admin-1'
    },
    totalTasksPosted: 7,
    totalSpentINR: 142000,
    ratingsCount: 5,
    averageRating: 4.9,
    savedProfessionalIds: ['pro-2']
  },
  'emp-2': {
    userId: 'emp-2',
    companyName: 'Elevate Brand Studios',
    companyWebsite: 'https://elevatestudio.in',
    companyDescription: 'Full-service brand identity, direct-to-consumer digital creative studio and video production house.',
    industry: 'Media & Advertising',
    businessLocation: 'Bandra West, Mumbai, Maharashtra',
    verificationStatus: 'verified',
    verificationDetails: {
      govtIdChecked: true,
      govtIdType: 'PAN Card Verified',
      skillsAssessed: false,
      businessRegistrationChecked: true,
      businessRegistrationNumber: 'GSTIN 27AAACE4812K1Z9',
      verifiedAt: '2026-09-02T11:15:00Z',
      verifiedByAdminId: 'admin-1'
    },
    totalTasksPosted: 4,
    totalSpentINR: 88500,
    ratingsCount: 3,
    averageRating: 4.8
  }
};

export const SEED_PROFESSIONAL_PROFILES: Record<string, ProfessionalProfile> = {
  'pro-1': {
    userId: 'pro-1',
    headline: 'Senior Full-Stack Engineer | React, Node.js & High-Throughput APIs',
    bio: '7+ years building production-grade web systems. Ex-Fintech staff engineer. Specializes in rapid bug fixing, complex API integrations, state optimization, and clean scalable TypeScript code.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'API Integration', 'Performance Tuning'],
    hourlyRate: 1800,
    fixedTaskMinRate: 5000,
    experienceYears: 7,
    experienceLevel: 'senior',
    workPreference: 'remote',
    availability: 'available_now',
    availabilityLastConfirmedAt: '2026-10-24T09:15:00Z',
    verificationStatus: 'verified',
    verificationDetails: {
      govtIdChecked: true,
      govtIdType: 'DigiLocker Verified PAN & Aadhaar',
      skillsAssessed: true,
      skillsAssessedNotes: 'Passed TypeScript & Database concurrency technical assessment + verified GitHub repository audits',
      businessRegistrationChecked: false,
      verifiedAt: '2026-07-15T12:00:00Z',
      verifiedByAdminId: 'admin-1'
    },
    portfolio: [
      {
        id: 'port-1',
        title: 'UPI Payment Gateway Webhook Microservice',
        description: 'Engineered idempotent webhook receiver handling 4,500 req/min with zero data loss.',
        linkUrl: 'https://github.com/rahulverma/upi-webhook-engine',
        category: 'Development & Technology',
        tags: ['Node.js', 'PostgreSQL', 'TypeScript']
      },
      {
        id: 'port-2',
        title: 'Real-Time Inventory Reconciliation Dashboard',
        description: 'Optimized render cycles reducing dashboard latency by 68% for high-volume logistics ops.',
        linkUrl: 'https://github.com/rahulverma/inventory-audit-dash',
        category: 'Development & Technology',
        tags: ['React', 'Performance', 'Tailwind CSS']
      }
    ],
    completedAssignmentsCount: 19,
    averageRating: 4.95,
    ratingsCount: 19,
    totalEarningsINR: 238000,
    profileCompleteness: 100
  },
  'pro-2': {
    userId: 'pro-2',
    headline: 'Lead Product Designer | High-Conversion SaaS & Mobile Apps',
    bio: 'Product designer with deep UX intuition. Crafted intuitive interfaces for SaaS dashboards, enterprise tools, and DTC marketplaces. Fast turnaround with Figma components & design systems.',
    skills: ['UI/UX Design', 'Figma', 'Design Systems', 'Graphic Design', 'Social Media Creatives', 'Mobile App UX'],
    hourlyRate: 1500,
    fixedTaskMinRate: 4000,
    experienceYears: 6,
    experienceLevel: 'senior',
    workPreference: 'remote',
    availability: 'available_now',
    availabilityLastConfirmedAt: '2026-10-24T10:00:00Z',
    verificationStatus: 'verified',
    verificationDetails: {
      govtIdChecked: true,
      govtIdType: 'Aadhaar Verified',
      skillsAssessed: true,
      skillsAssessedNotes: 'Comprehensive review of Figma design systems, visual hierarchy & production files',
      businessRegistrationChecked: false,
      verifiedAt: '2026-07-16T15:30:00Z',
      verifiedByAdminId: 'admin-1'
    },
    portfolio: [
      {
        id: 'port-3',
        title: 'Enterprise Billing & Subscription Portal',
        description: 'Complete UI redesign that lowered checkout drop-off rate by 24% for B2B platform.',
        linkUrl: 'https://figma.com/@priyasundaram/enterprise-billing',
        category: 'Design & Creative',
        tags: ['Figma', 'Design System', 'SaaS']
      },
      {
        id: 'port-4',
        title: 'Brand Creative Suite for D2C Launch',
        description: '25 high-converting ad variants and Instagram carousels with 3.8x ROAS.',
        linkUrl: 'https://behance.net/priyasundaram/d2c-launch-suite',
        category: 'Design & Creative',
        tags: ['Social Creatives', 'Branding']
      }
    ],
    completedAssignmentsCount: 26,
    averageRating: 4.9,
    ratingsCount: 26,
    totalEarningsINR: 275000,
    profileCompleteness: 95
  },
  'pro-3': {
    userId: 'pro-3',
    headline: 'B2B Growth & Performance Marketer | Meta & Google Ads Specialist',
    bio: 'Data-driven marketer experienced in building scalable acquisition loops. Helped 14 startups optimize campaign CAC and scale LinkedIn and Google Search campaigns.',
    skills: ['Digital Marketing', 'Google Ads', 'Meta Ads', 'SEO Strategy', 'Content Strategy', 'Copywriting'],
    hourlyRate: 1400,
    fixedTaskMinRate: 6000,
    experienceYears: 5,
    experienceLevel: 'senior',
    workPreference: 'remote',
    availability: 'available_this_week',
    availabilityLastConfirmedAt: '2026-10-23T18:00:00Z',
    verificationStatus: 'verified',
    verificationDetails: {
      govtIdChecked: true,
      govtIdType: 'Passport & PAN Verified',
      skillsAssessed: true,
      skillsAssessedNotes: 'Google Ads & Analytics certifications verified + live campaign performance audit',
      businessRegistrationChecked: false,
      verifiedAt: '2026-08-08T09:40:00Z',
      verifiedByAdminId: 'admin-1'
    },
    portfolio: [
      {
        id: 'port-5',
        title: 'B2B SaaS LinkedIn & Search Campaign',
        description: 'Lowered qualified demo lead cost from ₹4,200 to ₹1,850 in 45 days.',
        linkUrl: 'https://notion.site/ananya/b2b-saas-growth-case-study',
        category: 'Marketing',
        tags: ['Google Ads', 'B2B', 'Analytics']
      }
    ],
    completedAssignmentsCount: 14,
    averageRating: 4.85,
    ratingsCount: 14,
    totalEarningsINR: 168000,
    profileCompleteness: 90
  },
  'pro-4': {
    userId: 'pro-4',
    headline: 'Financial & Business Data Modeler | Advanced Excel & PowerBI',
    bio: 'Chartered accountant background with financial modeling expertise. Builds investor pitch models, unit economics dashboards, and automated Excel tools for high-growth firms.',
    skills: ['Excel and Data Analysis', 'Financial Modeling', 'Business Research', 'Power BI', 'SQL', 'Market Sizing'],
    hourlyRate: 1600,
    fixedTaskMinRate: 7500,
    experienceYears: 8,
    experienceLevel: 'senior',
    workPreference: 'remote',
    availability: 'available_now',
    availabilityLastConfirmedAt: '2026-10-24T08:30:00Z',
    verificationStatus: 'verified',
    verificationDetails: {
      govtIdChecked: true,
      govtIdType: 'ICAI Membership & PAN Verified',
      skillsAssessed: true,
      skillsAssessedNotes: 'Financial statement stress testing and multi-scenario model verified',
      businessRegistrationChecked: false,
      verifiedAt: '2026-08-22T16:00:00Z',
      verifiedByAdminId: 'admin-1'
    },
    portfolio: [
      {
        id: 'port-6',
        title: 'Series-A 3-Statement Dynamic Model & Cap Table',
        description: 'Clean scenario-switchable model used in ₹35 Cr institutional round.',
        linkUrl: 'https://docs.google.com/spreadsheets/d/sample-financial-model',
        category: 'Business & Data',
        tags: ['Excel', 'Financial Modeling', 'Unit Economics']
      }
    ],
    completedAssignmentsCount: 11,
    averageRating: 4.92,
    ratingsCount: 11,
    totalEarningsINR: 195000,
    profileCompleteness: 95
  },
  'pro-5': {
    userId: 'pro-5',
    headline: 'Motion Designer & Short-Form Video Editor | Reels & Ads',
    bio: 'Creates punchy, scroll-stopping videos for YouTube Shorts, Instagram Reels, and performance marketing ad creatives. Quick 24h turnaround for fast-moving brands.',
    skills: ['Video Editing', 'Motion Graphics', 'Short-form Content', 'After Effects', 'Premiere Pro'],
    hourlyRate: 1100,
    fixedTaskMinRate: 3500,
    experienceYears: 3,
    experienceLevel: 'mid',
    workPreference: 'remote',
    availability: 'available_now',
    availabilityLastConfirmedAt: '2026-10-24T10:20:00Z',
    verificationStatus: 'pending',
    verificationDetails: {
      govtIdChecked: true,
      govtIdType: 'Aadhaar submitted (pending admin approval)',
      skillsAssessed: false,
      businessRegistrationChecked: false
    },
    portfolio: [
      {
        id: 'port-7',
        title: 'Tech Podcast 60s Reel Series',
        description: 'Edited 12 episodes into viral hooks averaging 180k organic views.',
        linkUrl: 'https://youtube.com/shorts/sample-reel-showreel',
        category: 'Design & Creative',
        tags: ['Video Editing', 'Shorts', 'Premiere Pro']
      }
    ],
    completedAssignmentsCount: 4,
    averageRating: 4.75,
    ratingsCount: 4,
    totalEarningsINR: 32000,
    profileCompleteness: 80
  }
};

export const SEED_TASKS: Task[] = [
  {
    id: 'task-1',
    employerId: 'emp-1',
    title: 'Urgent: Fix React State Race Condition & Optimize API Cache',
    description: 'We have a high-priority bug in our enterprise client portal where concurrent webhook events cause a race condition in the active order grid. Need a senior React/TypeScript engineer to isolate the state reducer, implement optimistic updates with rollback, and ensure bulletproof tests.',
    category: 'Development & Technology',
    skills: ['React', 'TypeScript', 'API Integration', 'Performance Tuning'],
    experienceLevel: 'senior',
    budgetINR: 15000,
    paymentType: 'fixed',
    estimatedHours: 8,
    deadline: '2026-10-26T18:00:00Z',
    preferredStartTime: 'Immediately (Today)',
    workPreference: 'remote',
    requiredDeliverables: [
      'Clean pull request with bug fix and state synchronization refactor',
      'Integration test demonstrating race condition prevention',
      'Brief 1-page technical write-up for team documentation'
    ],
    additionalRequirements: 'Must be available on Slack during Indian working hours today for swift code walkthrough.',
    status: 'in_progress',
    paymentStatus: 'agreed',
    createdAt: '2026-10-24T08:00:00Z',
    selectedProfessionalId: 'pro-1',
    isModerated: true
  },
  {
    id: 'task-2',
    employerId: 'emp-2',
    title: 'Design High-Converting Mobile Onboarding Flow for Fintech App',
    description: 'Looking for a senior product designer to craft an 8-screen onboarding and KYC experience. Must comply with RBI digital lending guidelines while feeling effortless and delightful. High emphasis on micro-interactions and clean Figma auto-layout tokens.',
    category: 'Design & Creative',
    skills: ['UI/UX Design', 'Figma', 'Design Systems', 'Mobile App UX'],
    experienceLevel: 'senior',
    budgetINR: 22000,
    paymentType: 'fixed',
    estimatedHours: 15,
    deadline: '2026-10-28T20:00:00Z',
    preferredStartTime: 'Within 24 hours',
    workPreference: 'remote',
    requiredDeliverables: [
      'Complete interactive Figma prototype (iOS & Android frames)',
      'Organized component library with variables and color tokens',
      'Hand-off notes with micro-copy recommendations'
    ],
    additionalRequirements: 'Experience with Indian Fintech KYC or DigiLocker flows preferred.',
    status: 'matching',
    paymentStatus: 'not_agreed',
    createdAt: '2026-10-24T09:30:00Z',
    isModerated: true
  },
  {
    id: 'task-3',
    employerId: 'emp-1',
    title: 'B2B Cohort Retention & Unit Economics Financial Model',
    description: 'Need a financial modeling expert to build a multi-scenario investor model projecting revenue, customer churn, LTV/CAC, and runway for our next funding discussions.',
    category: 'Business & Data',
    skills: ['Excel and Data Analysis', 'Financial Modeling', 'Business Research'],
    experienceLevel: 'senior',
    budgetINR: 18000,
    paymentType: 'fixed',
    estimatedHours: 10,
    deadline: '2026-10-29T18:00:00Z',
    preferredStartTime: 'Flexible within 2 days',
    workPreference: 'remote',
    requiredDeliverables: [
      'Fully dynamic Google Sheet / Excel with scenario toggle (Base, Bull, Bear)',
      'Clean summary tab with executive charts for investor deck'
    ],
    status: 'open',
    paymentStatus: 'not_agreed',
    createdAt: '2026-10-24T07:15:00Z',
    isModerated: true
  },
  {
    id: 'task-4',
    employerId: 'emp-2',
    title: 'Cut 10 High-Energy Shorts/Reels from Product Launch Keynote',
    description: 'We have a 45-minute 4K video recording of our flagship launch. Need an energetic video editor to identify top moments, add dynamic motion captions, sound design, and deliver 10 ready-to-post vertical 9:16 clips.',
    category: 'Design & Creative',
    skills: ['Video Editing', 'Motion Graphics', 'Short-form Content'],
    experienceLevel: 'mid',
    budgetINR: 12000,
    paymentType: 'fixed',
    estimatedHours: 12,
    deadline: '2026-10-27T12:00:00Z',
    preferredStartTime: 'Within 48 hours',
    workPreference: 'remote',
    requiredDeliverables: [
      '10 MP4 vertical reels (1080x1920) with burned-in subtitles and sound effects',
      'Clean project file archive'
    ],
    status: 'offers_sent',
    paymentStatus: 'not_agreed',
    createdAt: '2026-10-23T15:00:00Z',
    isModerated: true
  }
];

export const SEED_OFFERS: Offer[] = [
  {
    id: 'off-1',
    taskId: 'task-1',
    employerId: 'emp-1',
    professionalId: 'pro-1',
    proposedRateINR: 15000,
    paymentType: 'fixed',
    estimatedCompletionDate: '2026-10-25T18:00:00Z',
    coverNote: 'I have encountered this exact concurrent state bug in high-traffic portals before. I can dive in immediately, identify the reducer bottleneck, and submit a PR with unit tests by tomorrow morning.',
    status: 'accepted',
    createdAt: '2026-10-24T08:30:00Z',
    respondedAt: '2026-10-24T08:45:00Z'
  },
  {
    id: 'off-2',
    taskId: 'task-4',
    employerId: 'emp-2',
    professionalId: 'pro-5',
    proposedRateINR: 12000,
    paymentType: 'fixed',
    estimatedCompletionDate: '2026-10-27T10:00:00Z',
    coverNote: 'Loved the keynote topic! I specialize in modern kinetic captions, snappy pacing, and sound design that keeps average watch time above 80%. Excited to help you make this viral.',
    status: 'pending',
    createdAt: '2026-10-23T16:00:00Z'
  }
];

export const SEED_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    taskId: 'task-1',
    employerId: 'emp-1',
    professionalId: 'pro-1',
    agreedRateINR: 15000,
    paymentType: 'fixed',
    platformFeeINR: 750, // 5% transparent fee
    totalPayableINR: 15750,
    status: 'in_progress',
    paymentStatus: 'agreed',
    confirmedAt: '2026-10-24T09:00:00Z'
  }
];

export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    taskId: 'task-1',
    assignmentId: 'asg-1',
    participantIds: ['emp-1', 'pro-1'],
    lastMessageText: 'Great, I have cloned the repo branch and isolated the race condition in the order status hook.',
    lastMessageAt: '2026-10-24T10:15:00Z',
    unreadCounts: {
      'emp-1': 1,
      'pro-1': 0
    }
  }
];

export const SEED_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'emp-1',
    text: 'Hi Rahul! Thank you for the rapid turnaround offer. We have accepted and confirmed the task scope.',
    isSystemEvent: true,
    systemEventType: 'scope_confirmed',
    createdAt: '2026-10-24T09:00:00Z'
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'emp-1',
    text: 'Access invitation to our GitHub repository staging branch has been granted. Let me know if you run into any setup hiccups!',
    createdAt: '2026-10-24T09:10:00Z'
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'pro-1',
    text: 'Received and verified access. The local dev container is spun up. Diving into the state reducer now!',
    createdAt: '2026-10-24T09:20:00Z'
  },
  {
    id: 'msg-4',
    conversationId: 'conv-1',
    senderId: 'pro-1',
    text: 'Great, I have cloned the repo branch and isolated the race condition in the order status hook.',
    createdAt: '2026-10-24T10:15:00Z'
  }
];

export const SEED_REVIEWS: StructuredReview[] = [
  {
    id: 'rev-1',
    assignmentId: 'asg-completed-1',
    taskId: 'task-completed-1',
    reviewerId: 'emp-1',
    revieweeId: 'pro-1',
    reviewerRole: 'employer',
    workQualityScore: 5,
    communicationScore: 5,
    timelinessScore: 5,
    deliverablesCompleted: true,
    paymentCompletedAsAgreed: true,
    comments: 'Rahul resolved a critical memory leak in our production React application within 6 hours. Thorough documentation, great automated test coverage, and clean communication. Will hire again!',
    createdAt: '2026-09-18T16:00:00Z'
  },
  {
    id: 'rev-2',
    assignmentId: 'asg-completed-2',
    taskId: 'task-completed-2',
    reviewerId: 'emp-2',
    revieweeId: 'pro-2',
    reviewerRole: 'employer',
    workQualityScore: 5,
    communicationScore: 5,
    timelinessScore: 5,
    deliverablesCompleted: true,
    paymentCompletedAsAgreed: true,
    comments: 'Priya delivered outstanding Figma designs for our D2C branding campaign. Her speed and fidelity exceeded our expectations.',
    createdAt: '2026-10-02T11:30:00Z'
  }
];

export const SEED_VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: 'ver-req-1',
    userId: 'pro-5',
    userType: 'professional',
    verificationType: 'identity',
    documentsOrLinks: ['DigiLocker Government Aadhaar XML Hash #7291-8812-4410'],
    additionalNotes: 'Fresher to PartimePro Instant, verified Indian resident with portfolio of video editing clients.',
    status: 'pending',
    submittedAt: '2026-10-23T14:00:00Z'
  },
  {
    id: 'ver-req-2',
    userId: 'emp-2',
    userType: 'employer',
    verificationType: 'business',
    documentsOrLinks: ['MCA Certificate of Incorporation', 'GSTIN: 27AAACE4812K1Z9'],
    additionalNotes: 'Elevate Brand Studios corporate registration verification.',
    status: 'verified',
    submittedAt: '2026-09-01T10:00:00Z',
    reviewedAt: '2026-09-02T11:15:00Z',
    reviewerNotes: 'Verified via GST portal and official MCA directory.'
  }
];

export const SEED_SAFETY_REPORTS: SafetyReport[] = [
  {
    id: 'rep-1',
    reporterId: 'emp-2',
    reportedUserId: 'pro-unverified-dummy',
    reportType: 'off_platform_payment',
    severity: 'medium',
    details: 'User requested direct wire transfer prior to assignment confirmation and suggested bypassing PartimePro Instant payment escrow.',
    evidenceUrls: ['https://screenshots.partimepro.internal/evidence-391.png'],
    status: 'investigating',
    adminNotes: 'Reviewing conversation logs. Account temporarily flagged for compliance review.',
    createdAt: '2026-10-23T11:00:00Z'
  }
];

export const SEED_ADMIN_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'audit-1',
    adminId: 'admin-1',
    adminName: 'Dilip Nandiwale (Marketplace Admin)',
    action: 'approve_verification',
    targetType: 'user',
    targetId: 'pro-1',
    details: 'Approved Rahul Verma: Verified DigiLocker Government ID and audited code sample repository.',
    timestamp: '2026-07-15T12:00:00Z'
  },
  {
    id: 'audit-2',
    adminId: 'admin-1',
    adminName: 'Dilip Nandiwale (Marketplace Admin)',
    action: 'approve_verification',
    targetType: 'user',
    targetId: 'emp-1',
    details: 'Approved Zynapse AI Technologies: Verified MCA incorporation and official business email domain.',
    timestamp: '2026-08-16T14:30:00Z'
  },
  {
    id: 'audit-3',
    adminId: 'admin-1',
    adminName: 'Dilip Nandiwale (Marketplace Admin)',
    action: 'moderate_task',
    targetType: 'task',
    targetId: 'task-1',
    details: 'Reviewed and certified legitimate task posting from verified employer.',
    timestamp: '2026-10-24T08:05:00Z'
  }
];

export const CATEGORIES = [
  {
    id: 'design',
    name: 'Design & Creative',
    description: 'UI/UX design, Figma, brand identity, social creatives, 3D and motion graphics.',
    icon: 'Palette',
    popularSkills: ['UI/UX Design', 'Figma', 'Graphic Design', 'Social Media Creatives', 'Video Editing', 'Motion Graphics']
  },
  {
    id: 'dev',
    name: 'Development & Technology',
    description: 'React, Node.js, bug fixing, mobile apps, API integrations, DevOps and cloud.',
    icon: 'Code2',
    popularSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Python', 'Tailwind CSS', 'API Integration']
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Performance ads, Google/Meta campaigns, SEO, organic growth, email and funnels.',
    icon: 'TrendingUp',
    popularSkills: ['Digital Marketing', 'Google Ads', 'Meta Ads', 'SEO Strategy', 'Content Strategy', 'Copywriting']
  },
  {
    id: 'business',
    name: 'Business & Data',
    description: 'Excel modeling, PowerBI, financial pitch decks, market research and analytics.',
    icon: 'BarChart3',
    popularSkills: ['Excel and Data Analysis', 'Financial Modeling', 'Business Research', 'Power BI', 'SQL', 'Market Sizing']
  },
  {
    id: 'writing',
    name: 'Writing & Language',
    description: 'Copywriting, technical blogs, proofreading, website copy and localization.',
    icon: 'FileText',
    popularSkills: ['Copywriting', 'Content Writing', 'Technical Writing', 'Proofreading', 'SEO Copywriting']
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Online tutoring, technical mentorship, entrance exam guidance and language coaching.',
    icon: 'GraduationCap',
    popularSkills: ['Online Tutoring', 'STEM Coaching', 'Coding Mentorship', 'English Proficiency']
  },
  {
    id: 'support',
    name: 'Customer Support',
    description: 'Multi-channel support, live chat assistance, escalation and ticket resolution.',
    icon: 'Headphones',
    popularSkills: ['Customer Support', 'Live Chat', 'Zendesk', 'Email Resolution', 'Client Success']
  },
  {
    id: 'admin',
    name: 'Administration',
    description: 'Virtual assistance, data entry, CRM hygiene, scheduling and operations.',
    icon: 'Briefcase',
    popularSkills: ['Virtual Assistance', 'Data Entry', 'CRM Management', 'Executive Scheduling']
  }
];
