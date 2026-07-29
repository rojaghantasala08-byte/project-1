// Career Compass AI - Administrative Dashboard Component

import { firebaseService } from '../services/firebaseService.js';
import { careersData } from '../data/careersData.js';

export function renderAdminDashboard(containerId = "admin-root") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const customCareers = firebaseService.getCustomCareers();
  const allCareers = [...customCareers, ...careersData];

  container.innerHTML = `
    <div class="glass-card animate-fade-in" style="padding:2rem;">
      
      <!-- Top Analytics Grid -->
      <div class="grid grid-cols-4 gap-4" style="margin-bottom: 2rem;">
        <div class="stat-box">
          <div class="stat-icon"><i data-lucide="briefcase"></i></div>
          <div>
            <p style="font-size:0.8rem; color:var(--text-muted);">Total Careers</p>
            <h3 style="font-size:1.5rem;">${allCareers.length}</h3>
          </div>
        </div>

        <div class="stat-box">
          <div class="stat-icon" style="color:var(--accent-purple);"><i data-lucide="users"></i></div>
          <div>
            <p style="font-size:0.8rem; color:var(--text-muted);">Registered Students</p>
            <h3 style="font-size:1.5rem;">12,480</h3>
          </div>
        </div>

        <div class="stat-box">
          <div class="stat-icon" style="color:var(--accent-emerald);"><i data-lucide="award"></i></div>
          <div>
            <p style="font-size:0.8rem; color:var(--text-muted);">Active Scholarships</p>
            <h3 style="font-size:1.5rem;">5</h3>
          </div>
        </div>

        <div class="stat-box">
          <div class="stat-icon" style="color:var(--accent-amber);"><i data-lucide="zap"></i></div>
          <div>
            <p style="font-size:0.8rem; color:var(--text-muted);">Roadmap Views</p>
            <h3 style="font-size:1.5rem;">89,200</h3>
          </div>
        </div>
      </div>

      <!-- Add New Career Form Modal Trigger -->
      <div class="flex justify-between items-center" style="margin-bottom:1.5rem;">
        <div>
          <h3>Manage Careers & Data Records</h3>
          <p style="font-size:0.875rem; color:var(--text-muted);">Add, edit, feature or remove career profiles in real-time.</p>
        </div>
        <button id="admin-add-career-btn" class="btn btn-primary">
          + Create New Career Profile
        </button>
      </div>

      <!-- Careers Table -->
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead>
            <tr style="border-bottom:2px solid var(--border-color); background:var(--bg-tertiary);">
              <th style="padding:0.85rem;">Job Title</th>
              <th style="padding:0.85rem;">Category</th>
              <th style="padding:0.85rem;">Type</th>
              <th style="padding:0.85rem;">Salary</th>
              <th style="padding:0.85rem;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${allCareers.map(c => `
              <tr style="border-bottom:1px solid var(--border-color);">
                <td style="padding:0.85rem; font-weight:700;">${c.jobName}</td>
                <td style="padding:0.85rem; font-size:0.875rem;">${c.category}</td>
                <td style="padding:0.85rem;"><span class="badge ${c.type === 'Government' ? 'badge-amber' : 'badge-purple'}">${c.type}</span></td>
                <td style="padding:0.85rem; color:var(--accent-emerald); font-weight:600; font-size:0.875rem;">${c.salary.split('|')[0]}</td>
                <td style="padding:0.85rem;">
                  <button class="btn btn-sm btn-outline admin-delete-btn" data-id="${c.id}" style="color:var(--accent-rose); border-color:var(--accent-rose);">
                    Delete
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();

  // Add new career modal
  document.getElementById("admin-add-career-btn").onclick = () => renderAddCareerModal();

  // Delete handlers
  container.querySelectorAll(".admin-delete-btn").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      if (confirm(`Are you sure you want to delete career ID: ${id}?`)) {
        firebaseService.deleteCustomCareer(id);
        renderAdminDashboard(containerId);
      }
    };
  });
}

function renderAddCareerModal() {
  const existing = document.getElementById("admin-career-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "admin-career-overlay";
  overlay.className = "modal-overlay active";

  overlay.innerHTML = `
    <div class="modal-container" style="max-width:700px;">
      <div class="modal-header">
        <h3>Create New Career Record</h3>
        <button class="modal-close" id="admin-close-modal">&times;</button>
      </div>

      <div class="modal-body">
        <form id="admin-career-form">
          <div class="grid grid-cols-2 gap-4" style="margin-bottom:1rem;">
            <div class="form-group">
              <label class="form-label">Job Name</label>
              <input type="text" id="ac-name" class="form-input" placeholder="e.g. Cloud DevOps Engineer" required>
            </div>
            <div class="form-group">
              <label class="form-label">Category</label>
              <select id="ac-category" class="form-select">
                <option value="After BTech (All Branches)">After BTech</option>
                <option value="After Degree (BSc, BCom, BA, BBA, BCA, etc.)">After Degree</option>
                <option value="After Intermediate">After Intermediate</option>
                <option value="Research Careers">Research Careers</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4" style="margin-bottom:1rem;">
            <div class="form-group">
              <label class="form-label">Sector Type</label>
              <select id="ac-type" class="form-select">
                <option value="Private">Private</option>
                <option value="Government">Government</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Salary CTC Range</label>
              <input type="text" id="ac-salary" class="form-input" placeholder="Fresher: ₹6 - 12 LPA" required>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:1rem;">
            <label class="form-label">Job Description</label>
            <textarea id="ac-desc" class="form-textarea" rows="3" required></textarea>
          </div>

          <div class="form-group" style="margin-bottom:1rem;">
            <label class="form-label">Required Skills (Comma separated)</label>
            <input type="text" id="ac-skills" class="form-input" placeholder="Linux, Docker, Kubernetes, AWS" required>
          </div>

          <button type="submit" class="btn btn-primary btn-lg" style="width:100%; margin-top:1rem;">
            Save & Publish Career Record
          </button>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.getElementById("admin-close-modal").onclick = () => overlay.remove();

  document.getElementById("admin-career-form").onsubmit = (e) => {
    e.preventDefault();
    const newCareer = {
      id: "custom_" + Date.now(),
      jobName: document.getElementById("ac-name").value,
      category: document.getElementById("ac-category").value,
      type: document.getElementById("ac-type").value,
      salary: document.getElementById("ac-salary").value,
      description: document.getElementById("ac-desc").value,
      requiredSkills: document.getElementById("ac-skills").value.split(",").map(s => s.trim()),
      eligibility: "Graduate",
      ageLimit: "18 - 35 Years",
      qualification: "Degree / BTech",
      requiredExams: "Interview Assessment",
      selectionProcess: "Technical Round",
      topRecruiters: ["Global Companies"],
      books: ["Standard Guide"],
      freeLearningResources: ["Coursera", "NPTEL"],
      youtubeLinks: ["https://youtube.com"],
      tags: ["High Salary", "Freshers"]
    };

    firebaseService.addCustomCareer(newCareer);
    overlay.remove();
    renderAdminDashboard("admin-root");
  };
}
