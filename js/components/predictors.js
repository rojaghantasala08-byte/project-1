// Career Compass AI - College & Salary Predictors Component

export function renderPredictors(containerId = "predictors-root") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="grid grid-cols-2 gap-8" style="max-width: 1100px; margin: 0 auto;">
      
      <!-- 1. College Predictor -->
      <div class="glass-card" style="padding:2rem;">
        <div style="margin-bottom:1.5rem;">
          <span class="badge badge-blue">College Predictor</span>
          <h3 style="margin-top:0.35rem;">Predict College Admissions</h3>
          <p style="font-size:0.875rem; color:var(--text-secondary);">Enter your entrance exam rank/percentile to estimate college eligibility.</p>
        </div>

        <form id="college-pred-form">
          <div class="form-group" style="margin-bottom:1rem;">
            <label class="form-label">Select Entrance Exam</label>
            <select id="pred-exam" class="form-select">
              <option value="JEE Main">JEE Main / Advanced</option>
              <option value="NEET">NEET UG</option>
              <option value="GATE">GATE CS / ECE</option>
              <option value="CAT">CAT (IIMs / MBA)</option>
              <option value="EAMCET">AP / TS EAMCET</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom:1.25rem;">
            <label class="form-label">Your Entrance Rank / Score</label>
            <input type="number" id="pred-rank" class="form-input" placeholder="e.g. 4500" value="3200" required>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%;">
            Predict Top Eligible Colleges
          </button>
        </form>

        <div id="college-results-box" style="display:none; margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border-color);">
          <!-- Injected Results -->
        </div>
      </div>

      <!-- 2. Salary Trajectory Predictor -->
      <div class="glass-card" style="padding:2rem;">
        <div style="margin-bottom:1.5rem;">
          <span class="badge badge-emerald">Salary Estimator</span>
          <h3 style="margin-top:0.35rem;">10-Year Salary Growth Trajectory</h3>
          <p style="font-size:0.875rem; color:var(--text-secondary);">Simulate income trajectory based on domain and experience years.</p>
        </div>

        <form id="salary-pred-form">
          <div class="form-group" style="margin-bottom:1rem;">
            <label class="form-label">Target Role Domain</label>
            <select id="sal-domain" class="form-select">
              <option value="AI / Tech">AI / Software Engineering</option>
              <option value="Government Bureaucracy">IAS / Civil Services</option>
              <option value="Investment Banking">Banking & Finance</option>
              <option value="Commercial Aviation">Commercial Pilot</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom:1.25rem;">
            <label class="form-label">Years of Experience</label>
            <input type="range" id="sal-exp" min="0" max="15" value="5" class="form-input" oninput="document.getElementById('exp-val').textContent = this.value + ' Years'">
            <span id="exp-val" style="font-weight:700; font-size:0.9rem; color:var(--accent-blue);">5 Years</span>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%;">
            Calculate Salary Growth Projection
          </button>
        </form>

        <div id="salary-results-box" style="display:none; margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border-color);">
          <!-- Injected Results -->
        </div>
      </div>

    </div>
  `;

  document.getElementById("college-pred-form").onsubmit = (e) => {
    e.preventDefault();
    const exam = document.getElementById("pred-exam").value;
    const rank = parseInt(document.getElementById("pred-rank").value);
    const box = document.getElementById("college-results-box");

    box.style.display = "block";
    box.innerHTML = `
      <h4 style="color:var(--accent-blue); margin-bottom:0.5rem;">Predicted College Matches (${exam} Rank: ${rank})</h4>
      <div style="font-size:0.875rem; line-height:1.6;">
        🔹 <strong>Top High Chance:</strong> NIT Trichy / NIT Surathkal (Branch: CSE / ECE)<br>
        🔹 <strong>Medium Chance:</strong> IIIT Hyderabad / BITS Pilani<br>
        🔹 <strong>Safe Admission:</strong> Top State University Campus
      </div>
    `;
  };

  document.getElementById("salary-pred-form").onsubmit = (e) => {
    e.preventDefault();
    const domain = document.getElementById("sal-domain").value;
    const exp = parseInt(document.getElementById("sal-exp").value);
    const box = document.getElementById("salary-results-box");

    let est = "₹12 - 18 LPA";
    if (exp === 0) est = "₹6 - 10 LPA";
    else if (exp >= 5 && exp < 10) est = "₹22 - 38 LPA";
    else if (exp >= 10) est = "₹45 - 85+ LPA";

    box.style.display = "block";
    box.innerHTML = `
      <div style="background:var(--bg-tertiary); padding:1rem; border-radius:var(--radius-md); text-align:center;">
        <span style="font-size:0.8rem; color:var(--text-muted);">Estimated CTC for ${domain} (${exp} Yrs Exp)</span>
        <h3 style="color:var(--accent-emerald); font-size:1.6rem; margin-top:0.25rem;">${est}</h3>
        <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.35rem;">Includes base pay + annual performance bonuses + ESOPs/Allowance</p>
      </div>
    `;
  };
}
