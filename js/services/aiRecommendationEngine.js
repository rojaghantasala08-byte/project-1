// Career Compass AI - AI Recommendation Engine & Match Algorithm

import { careersData } from '../data/careersData.js';

export function calculateCareerMatches(userInputs) {
  /*
  userInputs: {
    education: "BTech",
    stream: "CSE",
    interests: ["Coding", "AI", "Research"],
    skills: ["Python", "Mathematics", "Problem Solving"],
    budget: "Medium",
    preferredLocation: "Metros",
    sector: "Private", // "Government", "Private", "Any"
    expectedSalary: "High"
  }
  */

  const allCareers = [...careersData];

  const results = allCareers.map(career => {
    let score = 50; // Base score
    const matchReasons = [];
    const missingSkills = [];

    // 1. Sector Check
    if (userInputs.sector && userInputs.sector !== "Any") {
      if (career.type === userInputs.sector) {
        score += 15;
        matchReasons.push(`Matches your preference for ${career.type} sector jobs.`);
      } else {
        score -= 10;
      }
    }

    // 2. Skill Match Analysis
    if (userInputs.skills && userInputs.skills.length > 0) {
      let matchedCount = 0;
      career.requiredSkills.forEach(reqSkill => {
        const isMatched = userInputs.skills.some(userSkill => 
          reqSkill.toLowerCase().includes(userSkill.toLowerCase()) || 
          userSkill.toLowerCase().includes(reqSkill.toLowerCase())
        );
        if (isMatched) {
          matchedCount++;
        } else {
          missingSkills.push(reqSkill);
        }
      });

      if (matchedCount > 0) {
        const skillBonus = Math.min(25, matchedCount * 8);
        score += skillBonus;
        matchReasons.push(`Shares ${matchedCount} core skills with your background.`);
      }
    }

    // 3. Category / Education Match
    if (userInputs.education) {
      if (career.category.toLowerCase().includes(userInputs.education.toLowerCase()) || 
          career.qualification.toLowerCase().includes(userInputs.education.toLowerCase())) {
        score += 15;
        matchReasons.push(`Directly aligned with your education level (${userInputs.education}).`);
      }
    }

    // 4. Interest Alignment
    if (userInputs.interests && userInputs.interests.length > 0) {
      let interestMatched = false;
      userInputs.interests.forEach(interest => {
        if (career.description.toLowerCase().includes(interest.toLowerCase()) || 
            career.jobName.toLowerCase().includes(interest.toLowerCase())) {
          interestMatched = true;
        }
      });
      if (interestMatched) {
        score += 10;
        matchReasons.push("Strong alignment with your professional interests.");
      }
    }

    // Clamp score between 35% and 98%
    const finalScore = Math.min(98, Math.max(35, Math.round(score)));

    return {
      career: career,
      matchScore: finalScore,
      reasons: matchReasons.length > 0 ? matchReasons : ["Solid overall foundation match based on market demand."],
      missingSkills: missingSkills.slice(0, 4),
      suggestedAction: `Start with Phase 1 of the ${career.jobName} visual roadmap.`
    };
  });

  // Sort descending by score
  results.sort((a, b) => b.matchScore - a.matchScore);

  return results;
}
