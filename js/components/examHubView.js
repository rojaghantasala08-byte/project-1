// Career Compass AI - Government & Entrance Exam Hub Component

import { examsData } from '../data/examsData.js';

export function renderExamHub(containerId = "exam-root") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="section-header flex flex-col items-center text-center gap-2" style="margin-bottom: 2.5rem;">
      <span class="badge badge-amber">Competitive Exams Guide</span>
      <h2>SSC, UPSC, Banking, Railways & <span class="gradient-text">PSU Exam Hub</span></h2>
      <p style="max-width: 600px;">Complete exam patterns, syllabus breakdowns, age limits, and official portal links.</p>
    </div>

    <div class="grid grid-cols-2 gap-6">
      ${examsData.map(exam => `
        <div class="glass-card flex flex-col justify-between gap-4" style="padding:1.75rem;">
          <div>
            <div class="flex justify-between items-start" style="margin-bottom:0.5rem;">
              <span class="badge badge-purple">${exam.category}</span>
              <span class="badge badge-emerald">${exam.frequency}</span>
            </div>
            <h3>${exam.examName}</h3>
            <p style="font-size:0.875rem; color:var(--text-secondary); margin-top:0.35rem;">Body: ${exam.conductingBody}</p>
          </div>

          <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md);">
            <div class="grid grid-cols-2 gap-2" style="font-size:0.85rem;">
              <div>
                <span style="color:var(--text-muted);">Qualification:</span>
                <p style="font-weight:600;">${exam.qualification}</p>
              </div>
              <div>
                <span style="color:var(--text-muted);">Age Limit:</span>
                <p style="font-weight:600;">${exam.ageLimit}</p>
              </div>
            </div>
            <div style="margin-top:0.5rem; padding-top:0.5rem; border-top:1px solid var(--border-color);">
              <span style="color:var(--text-muted); font-size:0.8rem;">Exam Pattern:</span>
              <p style="font-size:0.825rem;">${exam.examPattern}</p>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <strong style="color:var(--accent-emerald); font-size:0.95rem;">${exam.salaryRange}</strong>
            <a href="${exam.officialWebsite}" target="_blank" class="btn btn-outline btn-sm">
              Official Portal &rarr;
            </a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
