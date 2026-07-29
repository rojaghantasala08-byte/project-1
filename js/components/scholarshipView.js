// Career Compass AI - Scholarship Hub Component

import { scholarshipsData } from '../data/scholarshipsData.js';

export function renderScholarshipHub(containerId = "scholarship-root") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="section-header flex flex-col items-center text-center gap-2" style="margin-bottom: 2.5rem;">
      <span class="badge badge-emerald">Financial Aid & Grants</span>
      <h2>National & State <span class="gradient-text">Scholarships Directory</span></h2>
      <p style="max-width: 600px;">Central, State Government, Girls, Merit-based, and Private Scholarships for all categories.</p>
    </div>

    <div class="grid grid-cols-2 gap-6">
      ${scholarshipsData.map(sch => `
        <div class="glass-card flex flex-col justify-between gap-4" style="padding:1.75rem;">
          <div>
            <div class="flex justify-between items-start" style="margin-bottom:0.5rem;">
              <span class="badge badge-blue">${sch.category}</span>
              <span class="badge badge-amber">Deadline: ${sch.deadline}</span>
            </div>
            <h3>${sch.title}</h3>
            <p style="font-size:0.875rem; color:var(--text-secondary); margin-top:0.35rem;">${sch.description}</p>
          </div>

          <div style="background:var(--bg-tertiary); padding:0.85rem 1rem; border-radius:var(--radius-md);">
            <div class="flex justify-between items-center">
              <span style="font-size:0.8rem; color:var(--text-muted);">Financial Grant</span>
              <strong style="color:var(--accent-emerald); font-size:1.05rem;">${sch.amount}</strong>
            </div>
            <p style="font-size:0.8rem; margin-top:0.35rem; color:var(--text-secondary);">Target: ${sch.targetAudience}</p>
          </div>

          <div class="flex items-center justify-between">
            <span style="font-size:0.8rem; color:var(--text-muted);">Eligibility: ${sch.eligibility}</span>
            <a href="${sch.applyLink}" target="_blank" class="btn btn-primary btn-sm">
              Apply Official Portal &rarr;
            </a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
