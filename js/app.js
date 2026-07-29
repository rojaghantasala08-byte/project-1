// Career Compass AI - Main Application Controller & Router

import { renderCareerExplorer, renderCareerDetailModal } from './components/careerExplorer.js';
import { renderAIWizard } from './components/aiWizard.js';
import { renderScholarshipHub } from './components/scholarshipView.js';
import { renderExamHub } from './components/examHubView.js';
import { renderResumeBuilder } from './components/resumeBuilder.js';
import { renderATSChecker } from './components/atsChecker.js';
import { renderMockInterview } from './components/mockInterview.js';
import { renderCareerQuiz } from './components/quizEngine.js';
import { renderPredictors } from './components/predictors.js';
import { renderAdminDashboard } from './components/adminDashboard.js';
import { renderAuthModal, renderUserProfileModal } from './components/authModal.js';
import { initAIChatbot } from './components/chatbot.js';
import { careersData } from './data/careersData.js';
import { newsData, dailyTips } from './data/newsData.js';
import { firebaseService } from './services/firebaseService.js';

document.addEventListener("DOMContentLoaded", () => {
  initThemeEngine();
  initGlobalSearch();
  initNavigationTabs();
  initAuthButtons();
  renderHomePageSections();
  initAIChatbot();
  initDailyTipBanner();
});

// 1. Theme Engine (Dark Mode toggle with local persistence)
function initThemeEngine() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const currentTheme = localStorage.getItem("career_compass_theme") || "light";

  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.onclick = () => {
      const active = document.documentElement.getAttribute("data-theme");
      const next = active === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("career_compass_theme", next);
      updateThemeIcon(next);
    };
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  if (icon) {
    icon.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
    if (window.lucide) window.lucide.createIcons();
  }
}

// 2. Navigation Router
function initNavigationTabs() {
  const sections = ["home", "explorer", "wizard", "tools", "scholarships", "exams", "admin"];
  
  const switchSection = (targetSection) => {
    sections.forEach(sec => {
      const el = document.getElementById(`section-${sec}`);
      if (el) el.style.display = sec === targetSection ? "block" : "none";
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.getAttribute("data-nav") === targetSection) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Lazy initialization of section roots
    if (targetSection === "explorer") renderCareerExplorer("career-explorer-root");
    else if (targetSection === "wizard") renderAIWizard("ai-wizard-root");
    else if (targetSection === "scholarships") renderScholarshipHub("scholarship-root");
    else if (targetSection === "exams") renderExamHub("exam-root");
    else if (targetSection === "admin") renderAdminDashboard("admin-root");
    else if (targetSection === "tools") {
      renderResumeBuilder("resume-builder-root");
      renderATSChecker("ats-checker-root");
      renderMockInterview("mock-interview-root");
      renderCareerQuiz("quiz-root");
      renderPredictors("predictors-root");
    }
  };

  document.querySelectorAll("[data-nav]").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const navTarget = btn.getAttribute("data-nav");
      switchSection(navTarget);
    };
  });
}

// 3. Auth UI & User Badge
function initAuthButtons() {
  const authBtn = document.getElementById("nav-auth-btn");
  const user = firebaseService.getCurrentUser();

  if (user && authBtn) {
    authBtn.innerHTML = `
      <div class="flex items-center gap-2">
        <div style="width:28px; height:28px; border-radius:50%; background:var(--gradient-primary); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.8rem;">
          ${user.displayName ? user.displayName[0] : 'U'}
        </div>
        <span>${user.displayName}</span>
      </div>
    `;
    authBtn.onclick = () => renderUserProfileModal();
  } else if (authBtn) {
    authBtn.onclick = () => renderAuthModal("login");
  }
}

// 4. Global Multi-Search Bar
function initGlobalSearch() {
  const input = document.getElementById("global-search-input");
  const dropdown = document.getElementById("global-search-dropdown");
  if (!input || !dropdown) return;

  input.oninput = (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      dropdown.classList.remove("active");
      return;
    }

    const matches = careersData.filter(c => 
      c.jobName.toLowerCase().includes(q) || 
      c.qualification.toLowerCase().includes(q) ||
      c.requiredSkills.some(s => s.toLowerCase().includes(q))
    );

    if (matches.length === 0) {
      dropdown.innerHTML = `<div style="padding:1rem; text-align:center; color:var(--text-muted);">No matching careers found</div>`;
    } else {
      dropdown.innerHTML = matches.slice(0, 5).map(c => `
        <div class="search-result-item" data-id="${c.id}">
          <div>
            <strong style="color:var(--text-primary); font-size:0.95rem;">${c.jobName}</strong>
            <span class="badge ${c.type === 'Government' ? 'badge-amber' : 'badge-purple'}" style="margin-left:0.5rem;">${c.type}</span>
            <p style="font-size:0.8rem; color:var(--text-muted);">${c.category}</p>
          </div>
          <span style="font-size:0.85rem; color:var(--accent-emerald); font-weight:700;">${c.salary.split('|')[0]}</span>
        </div>
      `).join('');
    }

    dropdown.classList.add("active");

    dropdown.querySelectorAll(".search-result-item").forEach(item => {
      item.onclick = () => {
        const id = item.getAttribute("data-id");
        const career = careersData.find(c => c.id === id);
        dropdown.classList.remove("active");
        input.value = "";
        if (career) renderCareerDetailModal(career);
      };
    });
  };

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
}

// 5. Home Page Dynamic Sections
function renderHomePageSections() {
  // Render Featured Careers Cards Grid
  const featGrid = document.getElementById("home-featured-grid");
  if (featGrid) {
    featGrid.innerHTML = careersData.slice(0, 3).map(c => `
      <div class="career-card glass-card">
        <div class="career-header">
          <div>
            <span class="badge badge-purple">${c.category}</span>
            <h3 class="career-title" style="margin-top:0.35rem;">${c.jobName}</h3>
          </div>
          <span class="badge badge-emerald">${c.type}</span>
        </div>
        <p style="font-size:0.875rem; color:var(--text-secondary); line-clamp:2; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${c.description}</p>
        <div class="career-salary">${c.salary.split('|')[0]}</div>
        <button class="btn btn-primary btn-sm home-view-btn" data-id="${c.id}">
          Explore Path & Roadmap &rarr;
        </button>
      </div>
    `).join('');

    featGrid.querySelectorAll(".home-view-btn").forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        const career = careersData.find(c => c.id === id);
        if (career) renderCareerDetailModal(career);
      };
    });
  }

  // News Grid
  const newsGrid = document.getElementById("home-news-grid");
  if (newsGrid) {
    newsGrid.innerHTML = newsData.map(n => `
      <div class="glass-card" style="padding:1.5rem;">
        <div class="flex justify-between items-center" style="margin-bottom:0.5rem;">
          <span class="badge badge-amber">${n.category}</span>
          <span style="font-size:0.75rem; color:var(--text-muted);">${n.date}</span>
        </div>
        <h4>${n.title}</h4>
        <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.35rem;">${n.summary}</p>
        <a href="${n.url}" target="_blank" style="font-size:0.825rem; font-weight:700; margin-top:0.75rem; display:inline-block;">Read Official Notice &rarr;</a>
      </div>
    `).join('');
  }
}

// 6. Daily Tip Banner
function initDailyTipBanner() {
  const tipBanner = document.getElementById("daily-tip-text");
  if (tipBanner) {
    const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
    tipBanner.innerHTML = randomTip;
  }
}
