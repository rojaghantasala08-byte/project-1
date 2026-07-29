// Career Compass AI - Career Explorer & Filter Component

import { careersData } from '../data/careersData.js';
import { firebaseService } from '../services/firebaseService.js';
import { renderRoadmapModal } from './roadmapViewer.js';

let activeCategory = "All";
let activeSearchQuery = "";
let selectedForCompare = [];

let activeFilters = {
  sector: "All",
  highSalary: false,
  freshers: false,
  womenFriendly: false,
  remote: false,
  abroad: false
};

export function renderCareerExplorer(containerId = "career-explorer-root") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const customCareers = firebaseService.getCustomCareers();
  const fullList = [...customCareers, ...careersData];

  container.innerHTML = `
    <div class="section-header flex flex-col items-center gap-2 text-center" style="margin-bottom: 2.5rem;">
      <span class="badge badge-purple">Career Directory</span>
      <h2>Explore <span class="gradient-text">Hundreds of Careers</span></h2>
      <p style="max-width: 600px;">Discover popular and hidden career paths with complete eligibility, exams, top recruiters, and salary insights.</p>
    </div>

    <!-- Explorer Controls & Filter Bar -->
    <div class="glass-card" style="padding: 1.25rem; margin-bottom: 2rem;">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        
        <!-- Search Input -->
        <div class="search-input-wrapper" style="width:100%; max-width:400px; box-shadow:none;">
          <i data-lucide="search" style="color:var(--text-muted);"></i>
          <input type="text" id="explorer-search-input" class="search-input" placeholder="Search job title, qualification, skill..." value="${activeSearchQuery}">
        </div>

        <!-- Filter Tags Checkboxes -->
        <div class="flex flex-wrap items-center gap-3">
          <button id="filter-sector-btn" class="btn btn-sm ${activeFilters.sector !== 'All' ? 'btn-primary' : 'btn-secondary'}">
            Sector: ${activeFilters.sector}
          </button>
          
          <button id="filter-high-salary-btn" class="btn btn-sm ${activeFilters.highSalary ? 'btn-primary' : 'btn-secondary'}">
            💰 High Salary
          </button>

          <button id="filter-freshers-btn" class="btn btn-sm ${activeFilters.freshers ? 'btn-primary' : 'btn-secondary'}">
            🎓 Freshers Friendly
          </button>

          <button id="filter-remote-btn" class="btn btn-sm ${activeFilters.remote ? 'btn-primary' : 'btn-secondary'}">
            🌐 Remote / Abroad
          </button>

          ${selectedForCompare.length > 0 ? `
            <button id="compare-modal-btn" class="btn btn-sm btn-primary" style="background:var(--accent-purple);">
              Compare (${selectedForCompare.length}/3)
            </button>
          ` : ''}
        </div>

      </div>
    </div>

    <!-- Category Pills Bar -->
    <div class="flex items-center gap-2" style="overflow-x: auto; padding-bottom: 0.75rem; margin-bottom: 2rem; scrollbar-width: none;">
      ${["All", "After 10th", "After Intermediate", "After Diploma", "After ITI", "After Polytechnic", "After Degree", "After BTech (All Branches)", "After PG", "Research Careers", "Study Abroad", "Entrepreneurship", "Freelancing"].map(cat => `
        <button class="cat-pill-btn btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}" data-category="${cat}" style="white-space:nowrap;">
          ${cat}
        </button>
      `).join('')}
    </div>

    <!-- Career Cards Grid -->
    <div class="grid grid-cols-3 gap-6" id="career-cards-grid">
      <!-- Injected via JS -->
    </div>
  `;

  // Render cards
  filterAndRenderCards(fullList);

  // Initialize Lucide icons
  if (window.lucide) window.lucide.createIcons();

  // Attach Event Handlers
  const searchInput = document.getElementById("explorer-search-input");
  if (searchInput) {
    searchInput.oninput = (e) => {
      activeSearchQuery = e.target.value;
      filterAndRenderCards(fullList);
    };
  }

  // Category buttons
  document.querySelectorAll(".cat-pill-btn").forEach(btn => {
    btn.onclick = () => {
      activeCategory = btn.getAttribute("data-category");
      renderCareerExplorer(containerId);
    };
  });

  // Filter Buttons
  document.getElementById("filter-sector-btn").onclick = () => {
    activeFilters.sector = activeFilters.sector === "All" ? "Government" : activeFilters.sector === "Government" ? "Private" : "All";
    renderCareerExplorer(containerId);
  };

  document.getElementById("filter-high-salary-btn").onclick = () => {
    activeFilters.highSalary = !activeFilters.highSalary;
    renderCareerExplorer(containerId);
  };

  document.getElementById("filter-freshers-btn").onclick = () => {
    activeFilters.freshers = !activeFilters.freshers;
    renderCareerExplorer(containerId);
  };

  document.getElementById("filter-remote-btn").onclick = () => {
    activeFilters.remote = !activeFilters.remote;
    renderCareerExplorer(containerId);
  };

  const compareBtn = document.getElementById("compare-modal-btn");
  if (compareBtn) {
    compareBtn.onclick = () => renderCompareModal(fullList);
  }
}

function filterAndRenderCards(fullList) {
  const grid = document.getElementById("career-cards-grid");
  if (!grid) return;

  const savedList = firebaseService.getSavedCareers();

  let filtered = fullList.filter(c => {
    // Category match
    if (activeCategory !== "All" && !c.category.toLowerCase().includes(activeCategory.toLowerCase())) {
      return false;
    }
    // Search Query match
    if (activeSearchQuery.trim() !== "") {
      const q = activeSearchQuery.toLowerCase();
      const match = c.jobName.toLowerCase().includes(q) ||
                    c.qualification.toLowerCase().includes(q) ||
                    c.description.toLowerCase().includes(q) ||
                    c.requiredSkills.some(s => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    // Sector filter
    if (activeFilters.sector !== "All" && c.type !== activeFilters.sector) {
      return false;
    }
    // High salary filter
    if (activeFilters.highSalary && !c.tags.includes("High Salary")) {
      return false;
    }
    // Freshers filter
    if (activeFilters.freshers && !c.tags.includes("Freshers")) {
      return false;
    }
    // Remote filter
    if (activeFilters.remote && !c.tags.includes("Remote") && !c.tags.includes("Abroad")) {
      return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 4rem 1rem;">
        <i data-lucide="search-x" style="width:48px; height:48px; color:var(--text-muted); margin-bottom:1rem;"></i>
        <h3>No careers found matching your criteria</h3>
        <p>Try clearing your active search filters or selecting a different category.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(career => {
    const isSaved = savedList.includes(career.id);
    const isCompared = selectedForCompare.includes(career.id);

    return `
      <div class="career-card animate-fade-in">
        <div class="career-header">
          <div>
            <div class="flex items-center gap-2" style="margin-bottom:0.35rem;">
              <span class="badge ${career.type === 'Government' ? 'badge-amber' : 'badge-purple'}">${career.type}</span>
              ${career.isHidden ? `<span class="badge badge-emerald">🔥 Hidden Gem</span>` : ''}
            </div>
            <h3 class="career-title">${career.jobName}</h3>
          </div>
          <button class="icon-btn save-career-btn" data-id="${career.id}" title="Save to Wishlist">
            <i data-lucide="bookmark" style="${isSaved ? 'fill:var(--accent-blue); color:var(--accent-blue);' : ''}"></i>
          </button>
        </div>

        <p style="font-size:0.875rem; color:var(--text-secondary); line-clamp:2; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
          ${career.description}
        </p>

        <div>
          <p style="font-size:0.775rem; color:var(--text-muted); margin-bottom:0.25rem;">Est. Salary Trajectory</p>
          <div class="career-salary">${career.salary.split('|')[0]}</div>
        </div>

        <div class="career-meta">
          ${career.requiredSkills.slice(0, 3).map(skill => `<span class="tag">${skill}</span>`).join('')}
        </div>

        <div class="flex items-center gap-2" style="margin-top:0.5rem; padding-top:0.85rem; border-top:1px solid var(--border-color);">
          <button class="btn btn-primary btn-sm view-detail-btn" data-id="${career.id}" style="flex:1;">
            View Full Guide
          </button>
          <button class="btn btn-outline btn-sm view-roadmap-btn" data-id="${career.id}">
            Roadmap
          </button>
          <button class="icon-btn compare-toggle-btn" data-id="${career.id}" title="Compare Career">
            <i data-lucide="${isCompared ? 'check-square' : 'square'}"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();

  // Attach card action listeners
  grid.querySelectorAll(".view-detail-btn").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      const c = fullList.find(item => item.id === id);
      if (c) renderCareerDetailModal(c);
    };
  });

  grid.querySelectorAll(".view-roadmap-btn").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      renderRoadmapModal(id);
    };
  });

  grid.querySelectorAll(".save-career-btn").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      firebaseService.toggleSaveCareer(id);
      renderCareerExplorer("career-explorer-root");
    };
  });

  grid.querySelectorAll(".compare-toggle-btn").forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-id");
      const idx = selectedForCompare.indexOf(id);
      if (idx > -1) {
        selectedForCompare.splice(idx, 1);
      } else {
        if (selectedForCompare.length >= 3) {
          alert("You can compare maximum 3 careers simultaneously.");
          return;
        }
        selectedForCompare.push(id);
      }
      renderCareerExplorer("career-explorer-root");
    };
  });
}

export function renderCareerDetailModal(career) {
  const existing = document.getElementById("career-detail-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "career-detail-overlay";
  overlay.className = "modal-overlay active";

  overlay.innerHTML = `
    <div class="modal-container">
      <div class="modal-header">
        <div>
          <span class="badge ${career.type === 'Government' ? 'badge-amber' : 'badge-purple'}">${career.type} Career</span>
          <h2 style="margin-top:0.25rem;">${career.jobName}</h2>
        </div>
        <button class="modal-close" id="career-modal-close">&times;</button>
      </div>

      <div class="modal-body flex flex-col gap-6">
        <div>
          <h4>Overview & Role Description</h4>
          <p style="margin-top:0.35rem;">${career.description}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md);">
            <h5 style="color:var(--accent-blue);">Eligibility & Age Limit</h5>
            <p style="font-size:0.875rem; margin-top:0.25rem;">${career.eligibility}</p>
            <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.25rem;">Age Limit: ${career.ageLimit}</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md);">
            <h5 style="color:var(--accent-emerald);">Salary & Compensation</h5>
            <p style="font-size:0.95rem; font-weight:700; color:var(--accent-emerald); margin-top:0.25rem;">${career.salary}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4>Required Skills</h4>
            <div class="flex flex-wrap gap-2" style="margin-top:0.5rem;">
              ${career.requiredSkills.map(s => `<span class="tag" style="background:var(--gradient-hero); color:var(--accent-blue);">${s}</span>`).join('')}
            </div>
          </div>
          <div>
            <h4>Required Entrance Exams</h4>
            <p style="font-size:0.9rem; margin-top:0.35rem;">${career.requiredExams}</p>
          </div>
        </div>

        <div>
          <h4>Selection Process</h4>
          <p style="font-size:0.9rem; margin-top:0.25rem;">${career.selectionProcess}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <h4 style="color:var(--accent-emerald);">Top Recruiters</h4>
            <ul style="margin-left:1.25rem; font-size:0.9rem; margin-top:0.35rem;">
              ${career.topRecruiters.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>
          <div>
            <h4 style="color:var(--accent-purple);">Recommended Books</h4>
            <ul style="margin-left:1.25rem; font-size:0.9rem; margin-top:0.35rem;">
              ${career.books.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div>
          <h4>Free Learning Resources & YouTube Tutorials</h4>
          <div class="flex flex-wrap gap-2" style="margin-top:0.5rem;">
            ${career.freeLearningResources.map(res => `
              <span class="badge badge-blue">${res}</span>
            `).join('')}
          </div>
          <div class="flex flex-wrap gap-2" style="margin-top:0.75rem;">
            ${career.youtubeLinks.map(link => `
              <a href="${link}" target="_blank" class="btn btn-sm btn-outline">
                <i data-lucide="youtube"></i> Free YouTube Course
              </a>
            `).join('')}
          </div>
        </div>

        <div class="flex gap-4" style="margin-top:1rem;">
          <button id="modal-open-roadmap-btn" class="btn btn-primary btn-lg" style="flex:1;">
            Open Visual Career Roadmap
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  if (window.lucide) window.lucide.createIcons();

  document.getElementById("career-modal-close").onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  document.getElementById("modal-open-roadmap-btn").onclick = () => {
    overlay.remove();
    renderRoadmapModal(career.id);
  };
}

function renderCompareModal(fullList) {
  const careers = fullList.filter(c => selectedForCompare.includes(c.id));
  if (careers.length === 0) return;

  const existing = document.getElementById("compare-modal-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "compare-modal-overlay";
  overlay.className = "modal-overlay active";

  overlay.innerHTML = `
    <div class="modal-container" style="max-width:900px;">
      <div class="modal-header">
        <h3>Career Comparison Matrix (${careers.length}/3)</h3>
        <button class="modal-close" id="compare-close-btn">&times;</button>
      </div>
      <div class="modal-body overflow-x-auto">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead>
            <tr style="border-bottom:2px solid var(--border-color);">
              <th style="padding:1rem;">Metric</th>
              ${careers.map(c => `<th style="padding:1rem; color:var(--accent-blue);">${c.jobName}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:1rem; font-weight:700;">Sector</td>
              ${careers.map(c => `<td style="padding:1rem;">${c.type}</td>`).join('')}
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:1rem; font-weight:700;">Salary Range</td>
              ${careers.map(c => `<td style="padding:1rem; color:var(--accent-emerald); font-weight:600;">${c.salary}</td>`).join('')}
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:1rem; font-weight:700;">Qualification</td>
              ${careers.map(c => `<td style="padding:1rem;">${c.qualification}</td>`).join('')}
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:1rem; font-weight:700;">Exams</td>
              ${careers.map(c => `<td style="padding:1rem;">${c.requiredExams}</td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.getElementById("compare-close-btn").onclick = () => overlay.remove();
}
