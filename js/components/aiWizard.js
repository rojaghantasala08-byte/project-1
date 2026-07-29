// Career Compass AI - AI Career Recommendation Assistant Component

import { calculateCareerMatches } from '../services/aiRecommendationEngine.js';
import { renderCareerDetailModal } from './careerExplorer.js';
import { renderRoadmapModal } from './roadmapViewer.js';

export function renderAIWizard(containerId = "ai-wizard-root") {
  const container = document.getElementById(containerId);
  if (!container) return;

  let currentStep = 1;

  const wizardState = {
    education: "BTech",
    stream: "Computer Science / Tech",
    interests: [],
    skills: [],
    budget: "Medium",
    sector: "Any",
    expectedSalary: "High"
  };

  function renderStep() {
    container.innerHTML = `
      <div class="glass-card animate-fade-in" style="max-width: 800px; margin: 0 auto; padding: 2.5rem;">
        
        <!-- Header & Progress Indicator -->
        <div style="margin-bottom: 2rem; text-align:center;">
          <span class="badge badge-purple" style="margin-bottom:0.5rem;">AI Career Match Engine</span>
          <h2>Find Your Perfect Career Path</h2>
          <p style="font-size:0.95rem; color:var(--text-secondary); margin-top:0.35rem;">Answer 4 quick questions to get calculated 0-100% match scores & personalized roadmaps.</p>
          
          <div class="progress-bar-outer" style="max-width:400px; margin:1.25rem auto 0;">
            <div class="progress-bar-inner" style="width: ${(currentStep / 4) * 100}%;"></div>
          </div>
        </div>

        <form id="ai-wizard-form">
          ${currentStep === 1 ? `
            <h3 style="margin-bottom:1rem;">1. Background & Stream</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="form-label">Current Education Level</label>
                <select id="wiz-education" class="form-select">
                  <option value="After 10th">10th Passed</option>
                  <option value="After Intermediate" selected>12th / Intermediate</option>
                  <option value="After Diploma">Diploma</option>
                  <option value="After ITI">ITI</option>
                  <option value="After Degree">Bachelor's Degree (BSc/BCom/BA)</option>
                  <option value="After BTech">B.Tech / B.E</option>
                  <option value="After PG">Master's Degree (MTech/MBA/MSc)</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Stream / Branch</label>
                <input type="text" id="wiz-stream" class="form-input" placeholder="e.g. MPC, BiPC, CSE, Mechanical, Finance" value="${wizardState.stream}">
              </div>
            </div>
          ` : ''}

          ${currentStep === 2 ? `
            <h3 style="margin-bottom:1rem;">2. Sector & Salary Target</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="form-label">Preferred Work Sector</label>
                <select id="wiz-sector" class="form-select">
                  <option value="Any">Any Sector (Gov or Private)</option>
                  <option value="Government">Government / Public Sector</option>
                  <option value="Private">Private / Tech / Corporate</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Target Salary Expectation</label>
                <select id="wiz-salary" class="form-select">
                  <option value="High">High Salary (8 - 30+ LPA)</option>
                  <option value="Moderate">Moderate & Stable (4 - 8 LPA)</option>
                </select>
              </div>
            </div>
          ` : ''}

          ${currentStep === 3 ? `
            <h3 style="margin-bottom:1rem;">3. Select Your Core Interests</h3>
            <div class="grid grid-cols-2 gap-3" id="wiz-interests-grid">
              ${["Coding & AI", "Defense & Military", "Government Bureaucracy", "Banking & Finance", "Space & Research", "Design & Creative", "Aerospace & Flying", "Cybersecurity"].map(interest => `
                <div class="quiz-option-card wiz-interest-item ${wizardState.interests.includes(interest) ? 'selected' : ''}" data-val="${interest}">
                  <i data-lucide="check-circle" style="color:var(--accent-blue);"></i> ${interest}
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${currentStep === 4 ? `
            <h3 style="margin-bottom:1rem;">4. Your Key Skills & Strengths</h3>
            <p style="font-size:0.9rem; margin-bottom:1rem;">Type your top skills separated by commas (e.g., Python, Communication, Mathematics, Leadership, AutoCAD)</p>
            <div class="form-group">
              <input type="text" id="wiz-skills-input" class="form-input" placeholder="Python, Mathematics, Leadership..." value="${wizardState.skills.join(', ')}">
            </div>
          ` : ''}

          <div class="flex justify-between items-center" style="margin-top:2rem;">
            ${currentStep > 1 ? `
              <button type="button" id="wiz-prev-btn" class="btn btn-secondary">Previous</button>
            ` : '<div></div>'}
            
            ${currentStep < 4 ? `
              <button type="button" id="wiz-next-btn" class="btn btn-primary">Next Step</button>
            ` : `
              <button type="submit" class="btn btn-primary btn-lg" style="background:var(--gradient-primary);">
                ⚡ Calculate AI Match Scores
              </button>
            `}
          </div>
        </form>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // Handlers
    const prevBtn = document.getElementById("wiz-prev-btn");
    const nextBtn = document.getElementById("wiz-next-btn");

    if (prevBtn) prevBtn.onclick = () => { currentStep--; renderStep(); };
    if (nextBtn) nextBtn.onclick = () => { saveStepInputs(); currentStep++; renderStep(); };

    document.querySelectorAll(".wiz-interest-item").forEach(item => {
      item.onclick = () => {
        const val = item.getAttribute("data-val");
        const idx = wizardState.interests.indexOf(val);
        if (idx > -1) wizardState.interests.splice(idx, 1);
        else wizardState.interests.push(val);
        renderStep();
      };
    });

    document.getElementById("ai-wizard-form").onsubmit = (e) => {
      e.preventDefault();
      saveStepInputs();
      renderResults();
    };
  }

  function saveStepInputs() {
    if (currentStep === 1) {
      wizardState.education = document.getElementById("wiz-education").value;
      wizardState.stream = document.getElementById("wiz-stream").value;
    } else if (currentStep === 2) {
      wizardState.sector = document.getElementById("wiz-sector").value;
      wizardState.expectedSalary = document.getElementById("wiz-salary").value;
    } else if (currentStep === 4) {
      const raw = document.getElementById("wiz-skills-input").value;
      wizardState.skills = raw.split(",").map(s => s.trim()).filter(Boolean);
    }
  }

  function renderResults() {
    const matches = calculateCareerMatches(wizardState);

    container.innerHTML = `
      <div class="animate-fade-in" style="max-width: 1000px; margin:0 auto;">
        <div class="flex justify-between items-center" style="margin-bottom:2rem;">
          <div>
            <span class="badge badge-emerald">Top Recommendations</span>
            <h2 style="margin-top:0.25rem;">Your Personalized AI Career Matches</h2>
          </div>
          <button id="wiz-restart-btn" class="btn btn-secondary btn-sm">Retake Quiz</button>
        </div>

        <div class="grid grid-cols-1 gap-6">
          ${matches.slice(0, 5).map((match, idx) => `
            <div class="glass-card" style="padding:1.75rem; border-left:6px solid ${idx === 0 ? 'var(--accent-emerald)' : 'var(--accent-blue)'};">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div class="flex items-center gap-2" style="margin-bottom:0.35rem;">
                    <span class="badge ${match.career.type === 'Government' ? 'badge-amber' : 'badge-purple'}">${match.career.type}</span>
                    <span class="badge badge-emerald">${match.matchScore}% Match Score</span>
                  </div>
                  <h3>${match.career.jobName}</h3>
                  <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:0.25rem;">${match.career.description}</p>
                </div>

                <div class="flex gap-2">
                  <button class="btn btn-primary btn-sm wiz-view-guide" data-id="${match.career.id}">
                    View Specs
                  </button>
                  <button class="btn btn-outline btn-sm wiz-view-roadmap" data-id="${match.career.id}">
                    Roadmap
                  </button>
                </div>
              </div>

              <!-- Rationale & Gap Analysis -->
              <div class="grid grid-cols-2 gap-4" style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color);">
                <div style="background:var(--bg-tertiary); padding:0.85rem 1rem; border-radius:var(--radius-md);">
                  <strong style="color:var(--accent-emerald); font-size:0.85rem;">Why this matches you:</strong>
                  <ul style="font-size:0.825rem; margin-top:0.25rem; margin-left:1rem;">
                    ${match.reasons.map(r => `<li>${r}</li>`).join('')}
                  </ul>
                </div>

                <div style="background:var(--bg-tertiary); padding:0.85rem 1rem; border-radius:var(--radius-md);">
                  <strong style="color:var(--accent-rose); font-size:0.85rem;">Recommended Skills to Acquire:</strong>
                  <div class="flex flex-wrap gap-1" style="margin-top:0.35rem;">
                    ${match.missingSkills.length > 0 ? match.missingSkills.map(sk => `<span class="tag" style="background:rgba(244,63,94,0.1); color:var(--accent-rose);">${sk}</span>`).join('') : '<span style="font-size:0.8rem;">All core skills matched!</span>'}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.getElementById("wiz-restart-btn").onclick = () => renderStep();

    container.querySelectorAll(".wiz-view-guide").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        const match = matches.find(m => m.career.id === id);
        if (match) renderCareerDetailModal(match.career);
      };
    });

    container.querySelectorAll(".wiz-view-roadmap").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        renderRoadmapModal(id);
      };
    });
  }

  renderStep();
}
