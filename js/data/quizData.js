// Career Compass AI - Career & Personality Assessment Quiz (Holland RIASEC Model)

export const quizQuestions = [
  {
    id: 1,
    question: "When faced with a complex problem, what is your immediate natural reaction?",
    options: [
      { text: "Analyze data, patterns, and underlying logic systematically", trait: "Investigative", score: 10 },
      { text: "Build, assemble, or fix physical/digital tools hands-on", trait: "Realistic", score: 10 },
      { text: "Brainstorm creative, out-of-the-box visual or narrative concepts", trait: "Artistic", score: 10 },
      { text: "Talk to people, listen to concerns, and guide them to a solution", trait: "Social", score: 10 }
    ]
  },
  {
    id: 2,
    question: "Which work environment energizes you the most?",
    options: [
      { text: "High-tech innovation lab or quiet research workspace", trait: "Investigative", score: 10 },
      { text: "Dynamic corporate leadership suite or startup pitch room", trait: "Enterprising", score: 10 },
      { text: "Structured, highly organized office with clear rules & order", trait: "Conventional", score: 10 },
      { text: "Community service center, school, or mentoring hub", trait: "Social", score: 10 }
    ]
  },
  {
    id: 3,
    question: "What type of tasks do you feel most confident completing?",
    options: [
      { text: "Coding, mathematical modeling, or scientific experiments", trait: "Investigative", score: 10 },
      { text: "Managing budgets, schedules, databases, and compliance", trait: "Conventional", score: 10 },
      { text: "Leading a team, negotiating deals, and persuading others", trait: "Enterprising", score: 10 },
      { text: "Designing graphics, writing stories, or UI/UX interfaces", trait: "Artistic", score: 10 }
    ]
  },
  {
    id: 4,
    question: "What is your primary long-term career ambition?",
    options: [
      { text: "Become a top technical authority or pioneer groundbreaking technology", trait: "Investigative", score: 10 },
      { text: "Serve the nation in a prestigious government / administrative role", trait: "Enterprising", score: 10 },
      { text: "Create an international remote business or freelance agency", trait: "Enterprising", score: 10 },
      { text: "Help thousands of people improve their lives and education", trait: "Social", score: 10 }
    ]
  }
];

export const personalityTraits = {
  Investigative: {
    title: "The Analytical Problem Solver",
    description: "You excel at deep thinking, data analysis, research, and technical mastery.",
    matchedCareers: ["ai-ml-engineer", "isro-drdo-research-scientist", "ethical-hacker-cyber-forensics", "actuarial-scientist"]
  },
  Enterprising: {
    title: "The Visionary Leader",
    description: "You thrive on leadership, negotiation, high-impact decisions, and launching initiatives.",
    matchedCareers: ["ias-ips-officer-upsc", "sbi-po-bank-probationary-officer", "commercial-pilot", "ui-ux-product-designer"]
  },
  Realistic: {
    title: "The Master Practitioner",
    description: "You love practical, tangible results, engineering structures, machinery, and action.",
    matchedCareers: ["isro-scientist-engineer", "polytechnic-junior-engineer", "railway-loco-pilot", "nda-officer"]
  },
  Social: {
    title: "The Empathetic Educator",
    description: "You derive energy from mentoring, counseling, team building, and social upliftment.",
    matchedCareers: ["ias-ips-officer-upsc", "sbi-po-bank-probationary-officer"]
  }
};
