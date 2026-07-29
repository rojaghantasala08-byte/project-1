// Career Compass AI - Live Resume Builder Component

export function renderResumeBuilder(containerId = "resume-builder-root") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const resumeData = {
    fullName: "Aarav Sharma",
    jobTitle: "AI & Machine Learning Engineer",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    linkedin: "linkedin.com/in/aarav-sharma",
    summary: "Passionate B.Tech Computer Science graduate specializing in Machine Learning, PyTorch, Deep Learning, and MLOps. Built 3 end-to-end AI applications with 95%+ classification accuracy.",
    experience: "Machine Learning Intern at AI Tech Labs (2025 - Present)\n- Fine-tuned BERT LLM models reducing inference latency by 35%.\n- Developed FastAPI REST endpoints for PyTorch computer vision pipeline.",
    education: "B.Tech in Computer Science & Engineering (2022 - 2026)\nXYZ Institute of Technology | CGPA: 8.8 / 10",
    skills: "Python, PyTorch, TensorFlow, Scikit-Learn, SQL, FastAPI, Docker, Git"
  };

  function updatePreview() {
    const paper = document.getElementById("resume-paper-preview");
    if (!paper) return;

    paper.innerHTML = `
      <div class="resume-preview-header">
        <h1 class="resume-preview-name">${resumeData.fullName}</h1>
        <p style="font-weight:700; color:var(--accent-blue); font-size:1.1rem;">${resumeData.jobTitle}</p>
        <div class="resume-preview-contact">
          <span>${resumeData.email}</span> • 
          <span>${resumeData.phone}</span> • 
          <span>${resumeData.location}</span>
        </div>
      </div>

      <div>
        <h3 class="resume-section-title">Professional Summary</h3>
        <p style="font-size:0.9rem; line-height:1.5;">${resumeData.summary}</p>
      </div>

      <div>
        <h3 class="resume-section-title">Technical Skills</h3>
        <p style="font-size:0.9rem; font-weight:600;">${resumeData.skills}</p>
      </div>

      <div>
        <h3 class="resume-section-title">Experience & Projects</h3>
        <div style="white-space:pre-line; font-size:0.875rem; line-height:1.5;">${resumeData.experience}</div>
      </div>

      <div>
        <h3 class="resume-section-title">Education</h3>
        <div style="white-space:pre-line; font-size:0.875rem; line-height:1.5;">${resumeData.education}</div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="section-header flex flex-col items-center text-center gap-2" style="margin-bottom: 2rem;">
      <span class="badge badge-purple">Career Tool</span>
      <h2>Interactive <span class="gradient-text">Resume Builder</span></h2>
      <p>Build a professional ATS-friendly resume in real-time and export to PDF.</p>
    </div>

    <div class="resume-builder-wrapper">
      <!-- Editor Form -->
      <div class="resume-editor-form">
        <h3>Edit Resume Details</h3>
        
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" id="rb-name" class="form-input" value="${resumeData.fullName}">
        </div>

        <div class="form-group">
          <label class="form-label">Target Job Title</label>
          <input type="text" id="rb-title" class="form-input" value="${resumeData.jobTitle}">
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" id="rb-email" class="form-input" value="${resumeData.email}">
          </div>
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input type="text" id="rb-phone" class="form-input" value="${resumeData.phone}">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Summary</label>
          <textarea id="rb-summary" class="form-textarea" rows="3">${resumeData.summary}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Skills (Comma-separated)</label>
          <input type="text" id="rb-skills" class="form-input" value="${resumeData.skills}">
        </div>

        <div class="form-group">
          <label class="form-label">Experience & Projects</label>
          <textarea id="rb-exp" class="form-textarea" rows="4">${resumeData.experience}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Education</label>
          <textarea id="rb-edu" class="form-textarea" rows="3">${resumeData.education}</textarea>
        </div>

        <button id="rb-print-btn" class="btn btn-primary btn-lg" style="margin-top:1rem;">
          🖨️ Export & Print PDF Resume
        </button>
      </div>

      <!-- Live Preview -->
      <div class="resume-preview-paper" id="resume-paper-preview">
        <!-- Rendered via JS -->
      </div>
    </div>
  `;

  updatePreview();

  // Attach live input listeners
  const bindInput = (id, key) => {
    const el = document.getElementById(id);
    if (el) {
      el.oninput = (e) => {
        resumeData[key] = e.target.value;
        updatePreview();
      };
    }
  };

  bindInput("rb-name", "fullName");
  bindInput("rb-title", "jobTitle");
  bindInput("rb-email", "email");
  bindInput("rb-phone", "phone");
  bindInput("rb-summary", "summary");
  bindInput("rb-skills", "skills");
  bindInput("rb-exp", "experience");
  bindInput("rb-edu", "education");

  document.getElementById("rb-print-btn").onclick = () => {
    window.print();
  };
}
