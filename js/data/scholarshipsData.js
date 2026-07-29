// Career Compass AI - Scholarships Database
// Includes Central, State, Private, Merit, Girls, Category-based scholarships

export const scholarshipsData = [
  {
    id: "nsp-post-matric",
    title: "National Scholarship Portal (NSP) Post-Matric Scholarship",
    category: "Central Government",
    targetAudience: "SC / ST / OBC / Minorities / EWS Students",
    eligibility: "10th/12th/Degree pass with family income less than ₹2.5 LPA",
    amount: "Up to ₹20,000/year + Maintenance Allowance",
    deadline: "31st October 2026",
    applyLink: "https://scholarships.gov.in",
    documentsRequired: ["Income Certificate", "Caste Certificate", "Bank Passbook", "Previous Marksheet"],
    description: "Central government flagship scholarship for post-secondary education across recognized colleges in India."
  },
  {
    id: "pm-research-fellowship",
    title: "Prime Minister's Research Fellowship (PMRF)",
    category: "Merit Scholarships",
    targetAudience: "BTech / MTech / MSc Graduates pursuing PhD at IITs / IISc",
    eligibility: "CGPA 8.0+ or GATE Score 750+ in top national institutes",
    amount: "₹70,000 - ₹80,000/month stipend + ₹2 Lakhs annual research grant",
    deadline: "31st May 2026",
    applyLink: "https://pmrf.in",
    documentsRequired: ["Research Proposal", "Grade Sheets", "Recommendation Letters"],
    description: "Attracts top academic talent to doctoral research in cutting-edge science and technology fields."
  },
  {
    id: "pragati-girls-scholarship",
    title: "AICTE Pragati Scholarship for Girl Students",
    category: "Girls Scholarships",
    targetAudience: "Female students entering 1st year Diploma or Degree in Technical Courses",
    eligibility: "Admitted in AICTE approved institutes, Family income < ₹8 LPA (Max 2 girls per family)",
    amount: "₹50,000 per annum for entire course duration",
    deadline: "30th November 2026",
    applyLink: "https://aicte-india.org",
    documentsRequired: ["AICTE Admission Letter", "Family Income Certificate", "Aadhaar Card"],
    description: "Empowers women in STEM & engineering by covering college fees, computer purchases, and books."
  },
  {
    id: "reliance-foundation-scholarship",
    title: "Reliance Foundation Undergraduate & Postgraduate Scholarship",
    category: "Private Scholarships",
    targetAudience: "Meritorious Students in any stream (UG) or Artificial Intelligence / Tech (PG)",
    eligibility: "First year college students, Minimum 60% in 12th class",
    amount: "Up to ₹2,00,000 (UG) / Up to ₹6,00,000 (PG)",
    deadline: "15th February 2027",
    applyLink: "https://scholarships.reliancefoundation.org",
    documentsRequired: ["12th Certificate", "Income Certificate", "Aptitude Test Score"],
    description: "Supports promising young leaders to continue higher education and build future-proof skill sets."
  },
  {
    id: "jagananna-vidya-deevena",
    title: "AP Jagananna Vidya Deevena & Vasathi Deevena",
    category: "State Government",
    targetAudience: "Polytechnic, ITI, Degree, BTech, BPharm Students in Andhra Pradesh",
    eligibility: "Family income < ₹2.5 LPA, Mandatory 75% college attendance",
    amount: "100% Fee Reimbursement directly credited + ₹20,000 Vasathi Boarding Grant",
    deadline: "Ongoing State Cycle",
    applyLink: "https://jaganannavidyadeevena.ap.gov.in",
    documentsRequired: ["Rice Card / Income Proof", "College ID", "Attendance Record"],
    description: "Total fee reimbursement and hostel food allowance for economically underprivileged state students."
  }
];
