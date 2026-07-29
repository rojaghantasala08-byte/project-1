// Career Compass AI - AI Resume ATS Checker Component

export function renderATSChecker(containerId = "ats-checker-root") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="glass-card animate-fade-in" style="max-width: 800px; margin: 0 auto; padding: 2.5rem;">
      <div style="text-align:center; margin-bottom:2rem;">
        <span class="badge badge-emerald">AI Scanner</span>
        <h2>Resume ATS Score & Keyword Audit</h2>
        <p style="color:var(--text-secondary); margin-top:0.35rem;">Paste your resume text to scan for applicant tracking system (ATS) compatibility, keyword matches, and formatting errors.</p>
      </div>

      <form id="ats-scan-form">
        <div class="form-group" style="margin-bottom:1.5rem;">
          <label class="form-label">Target Job Title / Domain</label>
          <input type="text" id="ats-job-title" class="form-input" placeholder="e.g. AI Engineer, Civil Engineer, Bank PO" value="AI & Machine Learning Engineer">
        </div>

        <div class="form-group" style="margin-bottom:1.5rem;">
          <label class="form-label">Paste Resume Content</label>
          <textarea id="ats-resume-text" class="form-textarea" rows="8" placeholder="Paste your full resume text here..." required>Aarav Sharma | B.Tech CSE | Python, PyTorch, TensorFlow, SQL | Machine Learning Intern building FastAPI deep learning REST endpoints.</textarea>
        </div>

        <button type="submit" class="btn btn-primary btn-lg" style="width:100%;">
          ⚡ Scan Resume with ATS Engine
        </button>
      </form>

      <div id="ats-results-wrapper" style="display:none; margin-top:2.5rem; padding-top:2rem; border-top:1px solid var(--border-color);">
        <!-- Injected Results -->
      </div>
    </div>
  `;

  document.getElementById("ats-scan-form").onsubmit = (e) => {
    e.preventDefault();
    const text = document.getElementById("ats-resume-text").value;
    const title = document.getElementById("ats-job-title").value;
    calculateATSScore(text, title);
  };
}

function calculateATSScore(text, title) {
  const wrapper = document.getElementById("ats-results-wrapper");
  if (!wrapper) return;

  const len = text.length;
  let score = 65; // base

  const keywords = ["python", "pytorch", "machine learning", "sql", "fastapi", "project", "b.tech", "experience", "data"];
  let matchedCount = 0;
  keywords.forEach(kw => {
    if (text.toLowerCase().includes(kw)) matchedCount++;
  });

  score += Math.min(30, matchedCount * 4);
  score = Math.min(96, score);

  wrapper.style.display = "block";
  wrapper.innerHTML = `
    <div class="flex flex-col items-center text-center gap-4">
      <div class="ats-score-meter" style="--ats-deg: ${(score / 100) * 360}deg;">
        <div class="ats-score-inner">
          <span class="ats-score-value">${score}%</span>
          <span style="font-size:0.75rem; color:var(--text-muted);">ATS Score</span>
        </div>
      </div>

      <div>
        <h3>${score >= 80 ? '🔥 Great ATS Compatibility!' : '⚠️ Needs Optimization'}</h3>
        <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:0.25rem;">
          Analyzed for target role: <strong>${title}</strong>
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4" style="width:100%; text-align:left; margin-top:1rem;">
        <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md);">
          <strong style="color:var(--accent-emerald);">Detected Keywords (${matchedCount}/${keywords.length})</strong>
          <div class="flex flex-wrap gap-1" style="margin-top:0.35rem;">
            ${keywords.map(kw => `
              <span class="tag" style="${text.toLowerCase().includes(kw) ? 'background:rgba(16,185,129,0.1); color:var(--accent-emerald);' : 'background:rgba(244,63,94,0.1); color:var(--accent-rose);'}">${kw}</span>
            `).join('')}
          </div>
        </div>

        <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md);">
          <strong style="color:var(--accent-blue);">Optimization Suggestions</strong>
          <ul style="font-size:0.825rem; margin-top:0.35rem; margin-left:1rem;">
            <li>Quantify results with percentages (e.g. "Improved efficiency by 30%")</li>
            <li>Use bullet points instead of long paragraphs</li>
            <li>Ensure standard section headers (Education, Experience, Skills)</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}
