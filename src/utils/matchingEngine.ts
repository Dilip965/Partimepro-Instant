import { Task, ProfessionalProfile, MatchingScoreBreakdown } from '../types/index.ts';

/**
 * Heuristic Matching Engine for PartimePro Instant
 * Weights:
 * - Skill match: 40%
 * - Availability match: 25%
 * - Budget match: 15%
 * - Relevant experience: 10%
 * - Work preference / location: 10%
 */
export function calculateMatchScore(task: Task, pro: ProfessionalProfile): MatchingScoreBreakdown {
  const matchReasons: string[] = [];

  // 1. Skill Match (max 40 pts)
  const taskSkillsNormalized = task.skills.map(s => s.toLowerCase().trim());
  const proSkillsNormalized = pro.skills.map(s => s.toLowerCase().trim());

  let matchedSkillsCount = 0;
  taskSkillsNormalized.forEach(ts => {
    if (proSkillsNormalized.some(ps => ps.includes(ts) || ts.includes(ps))) {
      matchedSkillsCount++;
    }
  });

  const skillRatio = taskSkillsNormalized.length > 0 ? (matchedSkillsCount / taskSkillsNormalized.length) : 0;
  const skillScore = Math.round(skillRatio * 40);

  if (matchedSkillsCount > 0) {
    matchReasons.push(`${matchedSkillsCount} of ${taskSkillsNormalized.length} core skills aligned`);
  }

  // 2. Availability Match (max 25 pts)
  let availabilityScore = 0;
  if (pro.availability === 'available_now') {
    availabilityScore = 25;
    matchReasons.push('Available now (recently confirmed)');
  } else if (pro.availability === 'available_this_week') {
    availabilityScore = 18;
    matchReasons.push('Available for tasks starting this week');
  } else if (pro.availability === 'busy') {
    availabilityScore = 8;
  } else {
    availabilityScore = 0;
  }

  // 3. Budget Match (max 15 pts)
  let budgetScore = 0;
  if (task.paymentType === 'fixed') {
    if (task.budgetINR >= pro.fixedTaskMinRate) {
      budgetScore = 15;
      matchReasons.push(`Budget (₹${task.budgetINR.toLocaleString('en-IN')}) meets minimum task rate`);
    } else {
      const budgetRatio = task.budgetINR / Math.max(pro.fixedTaskMinRate, 1);
      budgetScore = Math.max(0, Math.round(budgetRatio * 15));
    }
  } else {
    // Hourly
    const estimatedHours = task.estimatedHours || 10;
    const taskEffectiveHourly = task.budgetINR / estimatedHours;
    if (taskEffectiveHourly >= pro.hourlyRate) {
      budgetScore = 15;
      matchReasons.push(`Task rate (₹${Math.round(taskEffectiveHourly)}/hr) meets professional hourly rate`);
    } else {
      const budgetRatio = taskEffectiveHourly / Math.max(pro.hourlyRate, 1);
      budgetScore = Math.max(0, Math.round(budgetRatio * 15));
    }
  }

  // 4. Relevant Experience (max 10 pts)
  let experienceScore = 0;
  const experienceHierarchy: Record<string, number> = {
    junior: 1,
    mid: 2,
    senior: 3,
    lead: 4
  };
  const requiredLevelNum = experienceHierarchy[task.experienceLevel] || 2;
  const proLevelNum = experienceHierarchy[pro.experienceLevel] || 2;

  if (proLevelNum >= requiredLevelNum) {
    experienceScore = 10;
    matchReasons.push(`${pro.experienceYears} yrs experience satisfies ${task.experienceLevel} requirement`);
  } else {
    experienceScore = Math.round((proLevelNum / requiredLevelNum) * 10);
  }

  // 5. Work preference & Location match (max 10 pts)
  let preferenceScore = 0;
  if (task.workPreference === 'remote') {
    preferenceScore = 10;
    matchReasons.push('Remote preference fully aligned');
  } else {
    // On-site
    if (pro.workPreference === 'onsite' || pro.workPreference === 'hybrid') {
      preferenceScore = 10;
      matchReasons.push('Available for required on-site arrangements');
    } else {
      preferenceScore = 2; // prefers remote
    }
  }

  const totalScore = Math.min(100, skillScore + availabilityScore + budgetScore + experienceScore + preferenceScore);

  return {
    totalScore,
    skillMatch: skillScore,
    availabilityMatch: availabilityScore,
    budgetMatch: budgetScore,
    experienceMatch: experienceScore,
    preferenceMatch: preferenceScore,
    matchReasons
  };
}
