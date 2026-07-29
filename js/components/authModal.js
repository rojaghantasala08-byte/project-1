// Career Compass AI - Authentication & User Profile Modal Component

import { firebaseService } from '../services/firebaseService.js';

export function renderAuthModal(currentMode = "login") {
  const existing = document.getElementById("auth-modal-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "auth-modal-overlay";
  overlay.className = "modal-overlay active";

  overlay.innerHTML = `
    <div class="modal-container" style="max-width: 480px;">
      <div class="modal-header">
        <h3 id="auth-modal-title">${currentMode === "login" ? "Welcome Back" : currentMode === "signup" ? "Create Account" : "Reset Password"}</h3>
        <button class="modal-close" id="auth-close-btn">&times;</button>
      </div>
      <div class="modal-body">
        <div id="auth-error-msg" class="badge badge-rose" style="display:none; width:100%; margin-bottom:1rem; padding:0.5rem; justify-content:center;"></div>
        
        <form id="auth-form">
          ${currentMode === "signup" ? `
            <div class="form-group" style="margin-bottom:1rem;">
              <label class="form-label">Full Name</label>
              <input type="text" id="auth-name" class="form-input" placeholder="e.g. Ananya Sharma" required>
            </div>
            <div class="form-group" style="margin-bottom:1rem;">
              <label class="form-label">Current Education / Stream</label>
              <select id="auth-stream" class="form-select">
                <option value="After Intermediate (MPC)">After 12th (MPC)</option>
                <option value="After Intermediate (BiPC)">After 12th (BiPC)</option>
                <option value="After BTech (All Branches)">After BTech</option>
                <option value="After Degree (BSc/BCom/BA)">After Degree (BSc/BCom/BA)</option>
                <option value="After Diploma">After Diploma</option>
              </select>
            </div>
          ` : ''}

          <div class="form-group" style="margin-bottom:1rem;">
            <label class="form-label">Email Address</label>
            <input type="email" id="auth-email" class="form-input" placeholder="name@example.com" required value="student@jobhunt.ai">
          </div>

          ${currentMode !== "forgot" ? `
            <div class="form-group" style="margin-bottom:1rem;">
              <div class="flex justify-between items-center">
                <label class="form-label">Password</label>
                ${currentMode === "login" ? `<a href="#" id="auth-switch-forgot" style="font-size:0.8rem;">Forgot Password?</a>` : ''}
              </div>
              <input type="password" id="auth-password" class="form-input" placeholder="••••••••" required value="password123">
            </div>
          ` : ''}

          <button type="submit" class="btn btn-primary btn-lg" style="width:100%; margin-top:0.5rem;">
            ${currentMode === "login" ? "Sign In" : currentMode === "signup" ? "Create Free Account" : "Send Reset Link"}
          </button>
        </form>

        <div style="text-align:center; margin: 1.25rem 0; position:relative;">
          <hr style="border:none; border-top:1px solid var(--border-color);">
          <span style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); background:var(--bg-secondary); padding:0 0.5rem; font-size:0.75rem; color:var(--text-muted);">OR CONTINUATION</span>
        </div>

        <button id="google-login-btn" class="btn btn-secondary" style="width:100%;">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          Continue with Google
        </button>

        <div style="text-align:center; margin-top:1.5rem; font-size:0.875rem;">
          ${currentMode === "login" ? `
            Don't have an account? <a href="#" id="auth-switch-signup" style="font-weight:700;">Sign Up</a>
          ` : `
            Already registered? <a href="#" id="auth-switch-login" style="font-weight:700;">Sign In</a>
          `}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Event Listeners
  document.getElementById("auth-close-btn").onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  const switchLogin = document.getElementById("auth-switch-login");
  const switchSignup = document.getElementById("auth-switch-signup");
  const switchForgot = document.getElementById("auth-switch-forgot");

  if (switchLogin) switchLogin.onclick = (e) => { e.preventDefault(); renderAuthModal("login"); };
  if (switchSignup) switchSignup.onclick = (e) => { e.preventDefault(); renderAuthModal("signup"); };
  if (switchForgot) switchForgot.onclick = (e) => { e.preventDefault(); renderAuthModal("forgot"); };

  // Form Submit
  document.getElementById("auth-form").onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("auth-email").value;
    const errorBox = document.getElementById("auth-error-msg");

    try {
      if (currentMode === "login") {
        const password = document.getElementById("auth-password").value;
        await firebaseService.loginUser(email, password);
      } else if (currentMode === "signup") {
        const name = document.getElementById("auth-name").value;
        const password = document.getElementById("auth-password").value;
        const stream = document.getElementById("auth-stream").value;
        await firebaseService.registerUser(name, email, password, stream);
      } else {
        alert(`Password reset instructions sent to ${email}`);
        overlay.remove();
        return;
      }

      overlay.remove();
      window.location.reload(); // Refresh state
    } catch (err) {
      errorBox.textContent = err.message || "Authentication failed. Please check credentials.";
      errorBox.style.display = "flex";
    }
  };

  // Google Login
  document.getElementById("google-login-btn").onclick = async () => {
    await firebaseService.loginUser("google.user@gmail.com", "google123");
    overlay.remove();
    window.location.reload();
  };
}

export function renderUserProfileModal() {
  const user = firebaseService.getCurrentUser();
  if (!user) {
    renderAuthModal("login");
    return;
  }

  const existing = document.getElementById("profile-modal-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "profile-modal-overlay";
  overlay.className = "modal-overlay active";

  overlay.innerHTML = `
    <div class="modal-container" style="max-width: 600px;">
      <div class="modal-header">
        <h3>User Profile Dashboard</h3>
        <button class="modal-close" id="profile-close-btn">&times;</button>
      </div>
      <div class="modal-body">
        <div class="flex items-center gap-4" style="margin-bottom: 2rem;">
          <div style="width:64px; height:64px; border-radius:50%; background:var(--gradient-primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.8rem; font-weight:800;">
            ${user.displayName ? user.displayName[0] : 'U'}
          </div>
          <div>
            <h3 style="margin-bottom:0.25rem;">${user.displayName}</h3>
            <p style="font-size:0.9rem; color:var(--text-muted);">${user.email}</p>
            <span class="badge badge-purple" style="margin-top:0.4rem;">${user.role.toUpperCase()} • ${user.targetStream}</span>
          </div>
        </div>

        <div style="background:var(--bg-tertiary); padding:1.25rem; border-radius:var(--radius-lg); margin-bottom:1.5rem;">
          <h4 style="margin-bottom:0.75rem;">Account Statistics</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p style="font-size:0.8rem; color:var(--text-muted);">Saved Careers</p>
              <p style="font-weight:700; font-size:1.2rem;">${firebaseService.getSavedCareers().length} Careers</p>
            </div>
            <div>
              <p style="font-size:0.8rem; color:var(--text-muted);">Active Roadmaps</p>
              <p style="font-weight:700; font-size:1.2rem;">2 Active</p>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <button id="logout-btn" class="btn btn-outline" style="color:var(--accent-rose); border-color:var(--accent-rose);">
            Sign Out
          </button>
          <button id="close-profile-btn" class="btn btn-primary">Done</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("profile-close-btn").onclick = () => overlay.remove();
  document.getElementById("close-profile-btn").onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  document.getElementById("logout-btn").onclick = async () => {
    await firebaseService.logoutUser();
    overlay.remove();
    window.location.reload();
  };
}
