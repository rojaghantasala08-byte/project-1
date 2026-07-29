// Career Compass AI - Floating AI Chatbot Component ("CompassBot")

export function initAIChatbot() {
  const existing = document.getElementById("chatbot-root");
  if (existing) existing.remove();

  const widget = document.createElement("div");
  widget.id = "chatbot-root";
  widget.className = "chatbot-widget";

  widget.innerHTML = `
    <!-- Expandable Chat Window -->
    <div class="chatbot-window" id="chat-window">
      <div class="chatbot-header">
        <div class="flex items-center gap-2">
          <div style="width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-weight:800;">
            🤖
          </div>
          <div>
            <h4 style="font-size:0.95rem; color:#fff;">JobHunt AI</h4>
            <span style="font-size:0.75rem; color:rgba(255,255,255,0.8);">Live Career Advisor</span>
          </div>
        </div>
        <button id="chat-close-btn" style="background:none; border:none; color:#fff; cursor:pointer; font-size:1.2rem;">&times;</button>
      </div>

      <div class="chatbot-messages" id="chat-msg-list">
        <div class="chat-bubble bot">
          Hello! I am JobHunt AI, your career assistant. Ask me anything about after-12th streams, SSC/UPSC exams, high-pay tech roadmaps, or scholarship eligibility! 🚀
        </div>
      </div>

      <form id="chat-input-form" class="chatbot-input-bar">
        <input type="text" id="chat-user-input" class="search-input" placeholder="Ask career question..." style="font-size:0.875rem;" required>
        <button type="submit" class="btn btn-primary btn-sm" style="padding:0.4rem 0.75rem;">
          Send
        </button>
      </form>
    </div>

    <!-- Trigger Floating Circle -->
    <button class="chatbot-trigger" id="chat-trigger-btn" title="Ask AI Assistant">
      <i data-lucide="message-square" style="width:24px; height:24px;"></i>
    </button>
  `;

  document.body.appendChild(widget);
  if (window.lucide) window.lucide.createIcons();

  const trigger = document.getElementById("chat-trigger-btn");
  const win = document.getElementById("chat-window");
  const close = document.getElementById("chat-close-btn");
  const form = document.getElementById("chat-input-form");
  const msgList = document.getElementById("chat-msg-list");

  trigger.onclick = () => win.classList.toggle("active");
  close.onclick = () => win.classList.remove("active");

  form.onsubmit = (e) => {
    e.preventDefault();
    const input = document.getElementById("chat-user-input");
    const query = input.value.trim();
    if (!query) return;

    // Append User Bubble
    const uBubble = document.createElement("div");
    uBubble.className = "chat-bubble user";
    uBubble.textContent = query;
    msgList.appendChild(uBubble);

    input.value = "";
    msgList.scrollTop = msgList.scrollHeight;

    // Simulated AI response logic
    setTimeout(() => {
      const bBubble = document.createElement("div");
      bBubble.className = "chat-bubble bot";
      
      const q = query.toLowerCase();
      if (q.includes("btech") || q.includes("coding") || q.includes("ai")) {
        bBubble.textContent = "For BTech / Coding paths, I recommend starting with our AI & Machine Learning Mastery roadmap. Check out step 1 for free Python & Math resources!";
      } else if (q.includes("upsc") || q.includes("ias") || q.includes("government")) {
        bBubble.textContent = "UPSC CSE requires 100% focus on NCERTs (Class 6-12) and Laxmikanth Polity. View our civil services roadmap in the explorer for step-by-step guidance!";
      } else if (q.includes("scholarship") || q.includes("money") || q.includes("grant")) {
        bBubble.textContent = "Check out our Scholarships section for AICTE Pragati ($50k/yr for girls) and Reliance Foundation scholarships ($2-6 Lakhs)!";
      } else {
        bBubble.textContent = "Great question! Use our AI Career Recommendation Wizard on the homepage to calculate exact match scores for your stream and interests!";
      }

      msgList.appendChild(bBubble);
      msgList.scrollTop = msgList.scrollHeight;
    }, 600);
  };
}
