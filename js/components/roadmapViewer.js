// Career Compass AI - Visual Roadmap Viewer Component

import { roadmapsData } from '../data/roadmapsData.js';
import { firebaseService } from '../services/firebaseService.js';

export function renderRoadmapModal(careerId) {
  const roadmap = roadmapsData[careerId] || roadmapsData["ai-ml-engineer"];
  const completedSteps = firebaseService.getRoadmapProgress(roadmap.careerId);

  const existing = document.getElementById("roadmap-modal-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "roadmap-modal-overlay";
  overlay.className = "modal-overlay active";

  const progressPercent = Math.round((completedSteps.length / roadmap.totalSteps) * 100);

  overlay.innerHTML = `
    <div class="modal-container" style="max-width: 1000px;">
      <div class="modal-header">
        <div>
          <span class="badge badge-blue">Interactive Roadmap</span>
          <h2 style="margin-top:0.25rem;">${roadmap.title}</h2>
        </div>
        <button class="modal-close" id="roadmap-close-btn">&times;</button>
      </div>

      <div class="modal-body">
        <!-- Progress Bar Header -->
        <div class="roadmap-progress-header">
          <div style="flex:1;">
            <div class="flex justify-between items-center">
              <h4 style="font-size:1.1rem;">Roadmap Progress Tracker</h4>
              <span style="font-weight:800; font-size:1.2rem; color:var(--accent-emerald);" id="roadmap-progress-text">${progressPercent}% Completed</span>
            </div>
            <div class="progress-bar-outer">
              <div class="progress-bar-inner" id="roadmap-progress-fill" style="width: ${progressPercent}%;"></div>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.5rem;">
              Est. Total Duration: <strong>${roadmap.duration}</strong> • Click any milestone to open resource links & practice tasks.
            </p>
          </div>
        </div>

        <!-- Node Timeline -->
        <div class="roadmap-container">
          <div class="roadmap-timeline"></div>

          ${roadmap.steps.map(step => {
            const isDone = completedSteps.includes(step.stepNumber);
            return `
              <div class="roadmap-step">
                <div class="step-card ${isDone ? 'completed' : ''}" data-step="${step.stepNumber}">
                  <div class="step-phase">${step.phaseName}</div>
                  <h3 class="step-title">${step.title}</h3>
                  <div class="step-time">
                    <i data-lucide="clock" style="width:14px;"></i> ${step.estimatedTime}
                  </div>
                  <p style="font-size:0.875rem; color:var(--text-secondary); margin-bottom:0.75rem;">
                    ${step.description}
                  </p>
                  <div class="flex items-center justify-between">
                    <button class="btn btn-sm ${isDone ? 'btn-secondary' : 'btn-outline'} toggle-step-btn" data-step="${step.stepNumber}">
                      ${isDone ? '✓ Completed' : 'Mark Completed'}
                    </button>
                    <span style="font-size:0.8rem; font-weight:700; color:var(--accent-blue);">
                      ${step.resources.length} Resources & Tasks &rarr;
                    </span>
                  </div>
                </div>

                <div class="step-node-badge ${isDone ? 'completed' : ''}">
                  ${isDone ? '✓' : step.stepNumber}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  if (window.lucide) window.lucide.createIcons();

  document.getElementById("roadmap-close-btn").onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  // Step click modal / drawer
  overlay.querySelectorAll(".step-card").forEach(card => {
    card.onclick = (e) => {
      if (e.target.classList.contains("toggle-step-btn")) return;
      const stepNum = parseInt(card.getAttribute("data-step"));
      const step = roadmap.steps.find(s => s.stepNumber === stepNum);
      if (step) renderStepDetailDrawer(step, roadmap.careerId);
    };
  });

  // Toggle completion
  overlay.querySelectorAll(".toggle-step-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const stepNum = parseInt(btn.getAttribute("data-step"));
      const newSteps = firebaseService.toggleStepProgress(roadmap.careerId, stepNum);
      overlay.remove();
      renderRoadmapModal(careerId); // Re-render updated state
    };
  });
}

function renderStepDetailDrawer(step, careerId) {
  const existing = document.getElementById("step-drawer-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "step-drawer-overlay";
  overlay.className = "modal-overlay active";

  overlay.innerHTML = `
    <div class="modal-container" style="max-width: 650px;">
      <div class="modal-header">
        <div>
          <span class="badge badge-purple">${step.phaseName}</span>
          <h3 style="margin-top:0.25rem;">Step ${step.stepNumber}: ${step.title}</h3>
        </div>
        <button class="modal-close" id="step-drawer-close">&times;</button>
      </div>

      <div class="modal-body flex flex-col gap-6">
        <div>
          <h4>Phase Overview</h4>
          <p style="margin-top:0.25rem;">${step.description}</p>
        </div>

        <div>
          <h4 style="color:var(--accent-blue);">Recommended Free Learning Resources</h4>
          <div class="resource-list">
            ${step.resources.map(res => `
              <a href="${res.url}" target="_blank" class="resource-item">
                <span>${res.title}</span>
                <span class="badge badge-blue">${res.type}</span>
              </a>
            `).join('')}
          </div>
        </div>

        <div>
          <h4 style="color:var(--accent-purple);">Practice Tasks & Assignments</h4>
          <ul style="margin-left:1.25rem; font-size:0.9rem; margin-top:0.35rem;">
            ${step.tasks.map(t => `<li style="margin-bottom:0.35rem;">${t}</li>`).join('')}
          </ul>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md);">
            <h5>Mini Projects</h5>
            <p style="font-size:0.85rem; margin-top:0.25rem;">${step.miniProjects ? step.miniProjects.join(", ") : 'N/A'}</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md);">
            <h5>Interview Preparation</h5>
            <p style="font-size:0.85rem; margin-top:0.25rem;">${step.interviewPrep}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.getElementById("step-drawer-close").onclick = () => overlay.remove();
}
