// Career Compass AI - Firebase & Local Storage Unified Service

class FirebaseStoreService {
  constructor() {
    this.storageKeyUser = "career_compass_user";
    this.storageKeySaved = "career_compass_saved_careers";
    this.storageKeyAdminCareers = "career_compass_custom_careers";
    this.storageKeyProgress = "career_compass_roadmap_progress";
    
    // Initialize default local state if empty
    if (!localStorage.getItem(this.storageKeySaved)) {
      localStorage.setItem(this.storageKeySaved, JSON.stringify(["ai-ml-engineer", "ias-ips-officer-upsc"]));
    }
    if (!localStorage.getItem(this.storageKeyProgress)) {
      localStorage.setItem(this.storageKeyProgress, JSON.stringify({ "ai-ml-engineer": [1, 2] }));
    }
  }

  // Auth Operations
  getCurrentUser() {
    const data = localStorage.getItem(this.storageKeyUser);
    return data ? JSON.parse(data) : null;
  }

  async loginUser(email, password) {
    // Simulated auth delay
    await new Promise(r => setTimeout(r, 600));
    const user = {
      uid: "user_" + Date.now(),
      email: email,
      displayName: email.split("@")[0].toUpperCase(),
      role: email.includes("admin") ? "admin" : "student",
      targetStream: "B.Tech / Degree",
      createdAt: new Date().toLocaleDateString()
    };
    localStorage.setItem(this.storageKeyUser, JSON.stringify(user));
    return user;
  }

  async registerUser(name, email, password, stream) {
    await new Promise(r => setTimeout(r, 600));
    const user = {
      uid: "user_" + Date.now(),
      email: email,
      displayName: name,
      role: email.includes("admin") ? "admin" : "student",
      targetStream: stream || "General",
      createdAt: new Date().toLocaleDateString()
    };
    localStorage.setItem(this.storageKeyUser, JSON.stringify(user));
    return user;
  }

  async logoutUser() {
    localStorage.removeItem(this.storageKeyUser);
    return true;
  }

  // Wishlist & Saved Careers
  getSavedCareers() {
    const data = localStorage.getItem(this.storageKeySaved);
    return data ? JSON.parse(data) : [];
  }

  toggleSaveCareer(careerId) {
    const saved = this.getSavedCareers();
    const index = saved.indexOf(careerId);
    if (index > -1) {
      saved.splice(index, 1);
    } else {
      saved.push(careerId);
    }
    localStorage.setItem(this.storageKeySaved, JSON.stringify(saved));
    return saved;
  }

  // Roadmap Progress Tracking
  getRoadmapProgress(careerId) {
    const data = localStorage.getItem(this.storageKeyProgress);
    const store = data ? JSON.parse(data) : {};
    return store[careerId] || [];
  }

  toggleStepProgress(careerId, stepNumber) {
    const data = localStorage.getItem(this.storageKeyProgress);
    const store = data ? JSON.parse(data) : {};
    const steps = store[careerId] || [];
    const index = steps.indexOf(stepNumber);
    if (index > -1) {
      steps.splice(index, 1);
    } else {
      steps.push(stepNumber);
    }
    store[careerId] = steps;
    localStorage.setItem(this.storageKeyProgress, JSON.stringify(store));
    return steps;
  }

  // Admin Data Management
  getCustomCareers() {
    const data = localStorage.getItem(this.storageKeyAdminCareers);
    return data ? JSON.parse(data) : [];
  }

  addCustomCareer(careerObj) {
    const list = this.getCustomCareers();
    list.unshift(careerObj);
    localStorage.setItem(this.storageKeyAdminCareers, JSON.stringify(list));
    return list;
  }

  deleteCustomCareer(careerId) {
    let list = this.getCustomCareers();
    list = list.filter(c => c.id !== careerId);
    localStorage.setItem(this.storageKeyAdminCareers, JSON.stringify(list));
    return list;
  }
}

export const firebaseService = new FirebaseStoreService();
