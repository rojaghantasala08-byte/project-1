// Career Compass AI - Personality & Career Assessment Test Component

import { quizQuestions, personalityTraits } from '../data/quizData.js';
import { renderCareerDetailModal } from './careerExplorer.js';
import { careersData } from '../data/careersData.js';

export function renderCareerQuiz(containerId = "quiz-root") {
  const container = document.getElementById(containerId);
  if (!container) return;

  let currentQ = 0;
  const traitScores = {
    Investigative: 0,
    Enterprising: 0,
    Realistic: 0,
    Social: 0
  };

  function renderQuestion() {
    const q = quizQuestions[currentQ];

    container.innerHTML = `
      <div class="glass-card animate-fade-in" style="max-width: 800px; margin: 0 auto; padding: 2.5rem;">
        <div class="flex justify-between items-center" style="margin-bottom: 1.5rem;">
          <span class="badge badge-purple">Holland RIASEC Test</span>
          <span style="font-weight:700; font-size:0.9rem; color:var(--accent-blue);">Question ${currentQ + 1} of ${quizQuestions.length}</span>
        </div>

        <h3 style="margin-bottom:1.5rem;">${q.question}</h3>

        <div class="grid grid-cols-1 gap-3">
          ${q.options.map((opt, idx) => `
            <div class="quiz-option-card quiz-opt-btn" data-trait="${opt.trait}" data-score="${opt.score}">
              <span style="width:32px; height:32px; border-radius:50%; background:var(--bg-tertiary); display:flex; align-items:center; justify-content:center; font-weight:700;">${String.fromCharCode(65 + idx)}</span>
              <span>${opt.text}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll(".quiz-opt-btn").forEach(btn => {
      btn.onclick = () => {
        const trait = btn.getAttribute("data-trait");
        const score = parseInt(btn.getAttribute("data-score"));
        traitScores[trait] += score;

        if (currentQ < quizQuestions.length - 1) {
          currentQ++;
          renderQuestion();
        } else {
          renderResult();
        }
      };
    });
  }

  function renderResult() {
    let topTrait = "Investigative";
    let maxScore = -1;
    for (const [t, s] of Object.entries(traitScores)) {
      if (s > maxScore) {
        maxScore = s;
        topTrait = t;
      }
    }

    const info = personalityTraits[topTrait] || personalityTraits["Investigative"];
    const matchedJobs = careersData.filter(c => info.matchedCareers.includes(c.id));

    container.innerHTML = `
      <div class="glass-card animate-fade-in" style="max-width: 850px; margin: 0 auto; padding: 2.5rem; text-align:center;">
        <span class="badge badge-emerald" style="margin-bottom:0.5rem;">Assessment Complete</span>
        <h2>Your Dominant Personality Archetype</h2>
        
        <div style="background:var(--gradient-hero); padding:2rem; border-radius:var(--radius-xl); margin:1.5rem 0;">
          <h3 style="color:var(--accent-purple); font-size:1.8rem;">${info.title}</h3>
          <p style="font-size:1rem; color:var(--text-secondary); margin-top:0.5rem; max-width:600px; margin-left:auto; margin-right:auto;">
            ${info.description}
          </p>
        </div>

        <h4 style="margin-bottom:1rem; text-align:left;">Matched Job Families for Your Archetype:</h4>
        <div class="grid grid-cols-2 gap-4" style="text-align:left;">
          ${matchedJobs.map(job => `
            <div class="career-card">
              <h4>${job.jobName}</h4>
              <p style="font-size:0.85rem; color:var(--text-muted);">${job.category}</p>
              <button class="btn btn-primary btn-sm quiz-job-detail" data-id="${job.id}" style="margin-top:0.5rem;">
                Explore Details
              </button>
            </div>
          `).join('')}
        </div>

        <button id="quiz-retry-btn" class="btn btn-secondary" style="margin-top:2rem;">
          Retake Personality Assessment
        </button>
      </div>
    `;

    document.getElementById("quiz-retry-btn").onclick = () => {
      currentQ = 0;
      renderQuestion();
    };

    container.querySelectorAll(".quiz-job-detail").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        const job = careersData.find(c => c.id === id);
        if (job) renderCareerDetailModal(job);
      };
    });
  }

  renderQuestion();
}
