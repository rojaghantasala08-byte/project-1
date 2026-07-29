// Career Compass AI - AI Mock Interview Simulator Component

export function renderMockInterview(containerId = "mock-interview-root") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const mockQuestions = [
    "Q1: Can you walk us through a challenging technical problem you solved in your past project?",
    "Q2: How do you handle tight deadlines and conflicting priorities when delivering software?",
    "Q3: Explain the difference between Supervised and Unsupervised Machine Learning with practical examples."
  ];

  let qIndex = 0;

  function renderQuestion() {
    container.innerHTML = `
      <div class="glass-card animate-fade-in" style="max-width: 800px; margin: 0 auto; padding: 2.5rem;">
        <div class="flex justify-between items-center" style="margin-bottom: 1.5rem;">
          <span class="badge badge-purple">AI Mock Interview Simulator</span>
          <span style="font-weight:700; font-size:0.9rem; color:var(--accent-blue);">Question ${qIndex + 1} of ${mockQuestions.length}</span>
        </div>

        <div style="background:var(--bg-tertiary); padding:1.5rem; border-radius:var(--radius-lg); margin-bottom:1.5rem; border-left:4px solid var(--accent-purple);">
          <h3 style="font-size:1.15rem; color:var(--text-primary);">${mockQuestions[qIndex]}</h3>
        </div>

        <form id="mock-answer-form">
          <div class="form-group" style="margin-bottom:1.25rem;">
            <label class="form-label">Type or Record Your Response</label>
            <textarea id="mock-response-text" class="form-textarea" rows="5" placeholder="Type your structured STAR response here..." required></textarea>
          </div>

          <div class="flex justify-between items-center">
            <button type="button" id="mock-mic-btn" class="btn btn-secondary btn-sm">
              🎙️ Record Audio Answer
            </button>
            <button type="submit" class="btn btn-primary">
              Submit Response & Get AI Feedback
            </button>
          </div>
        </form>

        <div id="mock-feedback-box" style="display:none; margin-top:2rem; padding:1.25rem; background:rgba(16,185,129,0.08); border:1px solid var(--accent-emerald); border-radius:var(--radius-lg);">
          <h4 style="color:var(--accent-emerald); margin-bottom:0.35rem;">AI Response Evaluation (Score: 88/100)</h4>
          <p style="font-size:0.875rem; color:var(--text-secondary);">
            <strong>Strengths:</strong> Clear structure, relevant terminology used.<br>
            <strong>Tip:</strong> Include specific quantitative metrics (e.g. % performance increase) to make your answer stand out to senior technical panel interviewers.
          </p>
          <button id="mock-next-q-btn" class="btn btn-primary btn-sm" style="margin-top:1rem;">Next Question &rarr;</button>
        </div>
      </div>
    `;

    document.getElementById("mock-mic-btn").onclick = () => {
      alert("Microphone recording simulation activated! Speak clearly.");
    };

    document.getElementById("mock-answer-form").onsubmit = (e) => {
      e.preventDefault();
      document.getElementById("mock-feedback-box").style.display = "block";
    };

    const nextBtn = document.getElementById("mock-next-q-btn");
    if (nextBtn) {
      nextBtn.onclick = () => {
        qIndex = (qIndex + 1) % mockQuestions.length;
        renderQuestion();
      };
    }
  }

  renderQuestion();
}
