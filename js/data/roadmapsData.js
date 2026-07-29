// Career Compass AI - Comprehensive Career Visual Roadmaps Data

export const roadmapsData = {
  "ai-ml-engineer": {
    careerId: "ai-ml-engineer",
    title: "AI & Machine Learning Engineer Mastery Roadmap",
    duration: "12 - 18 Months",
    totalSteps: 6,
    steps: [
      {
        stepNumber: 1,
        phaseName: "Foundation & Programming",
        title: "Master Python & Mathematics",
        estimatedTime: "2-3 Months",
        icon: "code",
        description: "Build rock-solid fundamentals in Python programming, Linear Algebra, Calculus, Multivariate Probability, and Data Structures.",
        resources: [
          { title: "Python for Everybody (Coursera)", url: "https://coursera.org", type: "Free Course" },
          { title: "3Blue1Brown Essence of Linear Algebra", url: "https://youtube.com/c/3blue1brown", type: "YouTube Series" },
          { title: "Kaggle Python Micro-Course", url: "https://kaggle.com/learn/python", type: "Interactive" }
        ],
        tasks: ["Solve 50+ Python coding challenges on HackerRank", "Implement Matrix Multiplication & Vector Operations from scratch in pure Python"],
        certifications: ["Python Institute PCEP Certification"],
        miniProjects: ["Command-Line Matrix Calculator", "Automated Web Data Scraper"],
        interviewPrep: "Practice array/string manipulation, recursion, and Big-O notation complexity.",
        applicationPortals: ["GitHub Portfolio Setup", "LinkedIn Profile Building"]
      },
      {
        stepNumber: 2,
        phaseName: "Data Analysis & Visualization",
        title: "Pandas, NumPy, Matplotlib & SQL",
        estimatedTime: "2 Months",
        icon: "database",
        description: "Learn how to clean noisy data, perform Exploratory Data Analysis (EDA), write complex SQL queries, and visualize insights.",
        resources: [
          { title: "Kaggle Data Cleaning & Pandas", url: "https://kaggle.com/learn/pandas", type: "Interactive" },
          { title: "Mode Analytics SQL Tutorial", url: "https://mode.com/sql-tutorial/", type: "Tutorial" }
        ],
        tasks: ["Clean a messy real-world 100k-row CSV dataset", "Perform RFM Customer Segmentation Analysis"],
        certifications: ["IBM Data Analysis with Python"],
        miniProjects: ["Exploratory Data Analysis on COVID-19 / Stock Prices", "Interactive Dashboards using Streamlit"],
        interviewPrep: "SQL JOINs, Window Functions, Group By aggregation, Data Imputation techniques.",
        applicationPortals: ["Kaggle Competition Profile"]
      },
      {
        stepNumber: 3,
        phaseName: "Core Machine Learning",
        title: "Scikit-Learn & Classical Algorithms",
        estimatedTime: "3 Months",
        icon: "brain-circuit",
        description: "Master Supervised (Regression, Classification, Decision Trees, Random Forests, XGBoost) and Unsupervised (K-Means, PCA) Learning.",
        resources: [
          { title: "Andrew Ng's Machine Learning Specialization", url: "https://coursera.org", type: "Course" },
          { title: "StatQuest ML Playlist", url: "https://youtube.com/c/StatQuest", type: "YouTube" }
        ],
        tasks: ["Build a Housing Price Predictor using Random Forests", "Hyperparameter tuning using GridSearchCV"],
        certifications: ["Kaggle Machine Learning Certificate"],
        miniProjects: ["Heart Disease Risk Classification", "Customer Churn Prediction API"],
        interviewPrep: "Explain Bias-Variance Tradeoff, Overfitting prevention, Evaluation metrics (Precision/Recall/F1/ROC-AUC).",
        applicationPortals: ["AngleList / Wellfound AI Internships"]
      },
      {
        stepNumber: 4,
        phaseName: "Deep Learning & Neural Networks",
        title: "PyTorch, CNNs, RNNs & Transformers",
        estimatedTime: "3-4 Months",
        icon: "cpu",
        description: "Understand artificial neural networks, backpropagation, Convolutional Neural Networks (Vision), and Transformer LLMs.",
        resources: [
          { title: "DeepLearning.AI Neural Networks and Deep Learning", url: "https://deeplearning.ai", type: "Course" },
          { title: "Fast.ai Practical Deep Learning for Coders", url: "https://fast.ai", type: "Free Book & Course" }
        ],
        tasks: ["Train a PyTorch CNN model to classify chest X-ray images", "Fine-tune HuggingFace BERT for Sentiment Analysis"],
        certifications: ["DeepLearning.ai TensorFlow / PyTorch Specialization"],
        miniProjects: ["Object Detection System with YOLO", "Custom Fine-tuned AI Customer Support Bot"],
        interviewPrep: "Vanishing gradient problem, Adam optimizer math, Attention mechanism in Transformers.",
        applicationPortals: ["HuggingFace Hub", "GitHub AI Showcase"]
      },
      {
        stepNumber: 5,
        phaseName: "MLOps & Model Deployment",
        title: "Docker, Fast-API, MLflow & Cloud (AWS/GCP)",
        estimatedTime: "2 Months",
        icon: "cloud",
        description: "Package machine learning models into REST APIs, containerize with Docker, track experiments with MLflow, and deploy on cloud servers.",
        resources: [
          { title: "Made With ML MLOps Course", url: "https://madewithml.com", type: "Free Guide" },
          { title: "AWS Cloud Practitioner Free Essentials", url: "https://aws.training", type: "Course" }
        ],
        tasks: ["Containerize a PyTorch model into Docker", "Deploy FastAPI endpoint to AWS EC2 / Render"],
        certifications: ["AWS Certified Cloud Practitioner", "Google Cloud Professional ML Engineer"],
        miniProjects: ["End-to-End MLOps Pipeline with CI/CD GitHub Actions"],
        interviewPrep: "Model latency optimization, quantization, monitoring drift, Docker file syntax.",
        applicationPortals: ["TopToptal AI", "Hired.com", "LinkedIn Direct Apply"]
      },
      {
        stepNumber: 6,
        phaseName: "Portfolio & Job Application",
        title: "Full-Stack AI Capstone & Technical Interviews",
        estimatedTime: "1-2 Months",
        icon: "rocket",
        description: "Create a flagship AI web application, write technical articles, prepare resume for ATS, and crack system design interviews.",
        resources: [
          { title: "Chip Huyen's Designing Machine Learning Systems", url: "https://chiphuyen.com", type: "Book" },
          { title: "LeetCode Data Structures & ML System Design", url: "https://leetcode.com", type: "Practice" }
        ],
        tasks: ["Publish 2 Medium/Substack articles explaining your AI projects", "Conduct 5 mock technical interviews"],
        certifications: ["Career Compass Certified AI Specialist"],
        miniProjects: ["Full-Stack Generative AI SaaS Platform"],
        interviewPrep: "System Design for ML (e.g. Design YouTube Recommendation System, Search Ranking Engine).",
        applicationPortals: ["Google Careers", "Microsoft Careers", "Y Combinator Co-founder / Job Board"]
      }
    ]
  },

  "ias-ips-officer-upsc": {
    careerId: "ias-ips-officer-upsc",
    title: "UPSC Civil Services (IAS / IPS) Success Roadmap",
    duration: "15 - 24 Months",
    totalSteps: 5,
    steps: [
      {
        stepNumber: 1,
        phaseName: "NCERT Foundation & Newspaper Reading",
        title: "Build Basics (Classes 6-12 NCERTs)",
        estimatedTime: "4 Months",
        icon: "book-open",
        description: "Read basic NCERT textbooks in History, Geography, Polity, Economy, and Environment. Develop daily newspaper reading habits (The Hindu / Indian Express).",
        resources: [
          { title: "ePathshala Official Free NCERT PDFs", url: "https://epathshala.nic.in", type: "PDF Books" },
          { title: "The Hindu Editorial Analysis", url: "https://thehindu.com", type: "Daily Newspaper" }
        ],
        tasks: ["Complete Class 6-12 History & Geography NCERTs", "Make concise 1-page notes from daily editorials"],
        certifications: ["N/A"],
        miniProjects: ["Maintain a digital Current Affairs monthly archive"],
        interviewPrep: "Develop neutral, balanced perspectives on social and national policy issues.",
        applicationPortals: ["UPSC Official Portal registration"]
      },
      {
        stepNumber: 2,
        phaseName: "Standard Books & Optional Subject Selection",
        title: "Core GS Papers (1-4) & Optional Selection",
        estimatedTime: "6 Months",
        icon: "landmark",
        description: "Study standard reference books: Laxmikanth (Polity), Spectrum (Modern History), Ramesh Singh (Economy), Shankar IAS (Environment). Choose 1 Optional Subject (e.g., PSIR, Geography, Public Admin, History, Sociology).",
        resources: [
          { title: "Indian Polity by M. Laxmikanth", url: "https://upsc.gov.in", type: "Book" },
          { title: "InsightsIAS Free Secure Answer Writing", url: "https://insightsonindia.com", type: "Free Portal" }
        ],
        tasks: ["Complete 3 revisions of Laxmikanth Polity", "Finish Paper I & II syllabus of chosen Optional"],
        certifications: ["N/A"],
        miniProjects: ["Answer 100+ Previous Year Questions (PYQs)"],
        interviewPrep: "Structure answers logically with Introduction, Body (Bullet Points/Diagrams), and Way Forward.",
        applicationPortals: ["UPSC CSE Online Application Filing"]
      },
      {
        stepNumber: 3,
        phaseName: "Prelims Intensive & CSAT Mastery",
        title: "10,000+ MCQs & CSAT Qualification",
        estimatedTime: "3 Months",
        icon: "target",
        description: "Solve past 15 years Prelims GS Paper I papers and take 30 full-length mock tests. Ensure CSAT (Math/Reasoning) 33% qualifying score.",
        resources: [
          { title: "Vision IAS / Forum IAS Test Series", url: "https://visionias.in", type: "Mock Tests" },
          { title: "Mrunal Patel Economy Lectures", url: "https://mrunal.org", type: "Videos" }
        ],
        tasks: ["Solve 30 full-length Prelims Mock Tests with error log", "Score 100+ consistently in GS-1 mocks"],
        certifications: ["N/A"],
        miniProjects: ["Map Study (India & World Rivers, Mountain Ranges, National Parks)"],
        interviewPrep: "Speed elimination techniques for tricky multiple-choice options.",
        applicationPortals: ["Download UPSC Prelims Admit Card"]
      },
      {
        stepNumber: 4,
        phaseName: "Mains Answer Writing & Essay Practice",
        title: "Mains GS 1-4, Essay & Optional Revision",
        estimatedTime: "4 Months (Post-Prelims)",
        icon: "edit-3",
        description: "Write 2 essays per week, practice Ethics case studies (GS Paper 4), and revise Optional subject thoroughly.",
        resources: [
          { title: "Ethics, Integrity & Aptitude by Subba Rao", url: "https://upsc.gov.in", type: "Book" },
          { title: "IASbaba TLP Free Answer Writing", url: "https://iasbaba.com", type: "Portal" }
        ],
        tasks: ["Write 20 full-length Mains answers per week under 7-minute timer", "Complete 5 Ethics Case Study mocks"],
        certifications: ["N/A"],
        miniProjects: ["Create a quote & case study repository for Essay and Ethics"],
        interviewPrep: "Time management: 150-word answers in 7 mins, 250-word answers in 11 mins.",
        applicationPortals: ["Submit UPSC Detailed Application Form I (DAF-I)"]
      },
      {
        stepNumber: 5,
        phaseName: "Personality Test & DAF Analysis",
        title: "UPSC Board Mock Interviews at Dholpur House",
        estimatedTime: "2 Months",
        icon: "award",
        description: "Analyze every keyword in your DAF (Home State, Graduation, Hobbies). Attend mock interviews with retired UPSC board chairmen.",
        resources: [
          { title: "Drishti / Sam संकल्प Mock Interviews", url: "https://youtube.com/c/DrishtiIAS", type: "Interview Recordings" }
        ],
        tasks: ["Participate in 4 Mock Interview Boards", "Prepare 50 questions on your hometown and hobby"],
        certifications: ["UPSC Final Selection Merit Rank List"],
        miniProjects: ["Hobby Mastery & Current Affairs Rapid Recap"],
        interviewPrep: "Body language, polite disagreement, truthful admission of unknown facts, confidence.",
        applicationPortals: ["LBSNAA Mussoorie Training Letter Reception"]
      }
    ]
  }
};
