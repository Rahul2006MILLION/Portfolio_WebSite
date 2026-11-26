import { SkillCategoryGroup } from "@/types/portfolio";

export const skillCategoriesData: SkillCategoryGroup[] = [
  {
    id: "programming-languages",
    title: "Programming Languages",
    categoryNumber: "01",
    description: "Core languages used for systems programming, machine learning models, and application architecture.",
    skills: [
      { name: "Python", isKeySkill: true, levelTag: "Primary / ML & Systems" },
      { name: "Java", isKeySkill: true, levelTag: "OOP & Core CS" },
      { name: "C", isKeySkill: false, levelTag: "Foundational & Memory" },
      { name: "SQL", isKeySkill: true, levelTag: "Relational Queries" },
      { name: "HTML", isKeySkill: false, levelTag: "Semantic Markup" },
      { name: "CSS", isKeySkill: false, levelTag: "Styling & Layout" },
      { name: "ROS 2", isKeySkill: false, levelTag: "Robotics Middleware" },
      { name: "Gazebo", isKeySkill: false, levelTag: "Robot Simulation" }
    ]
  },
  {
    id: "ai-machine-learning",
    title: "AI / Machine Learning",
    categoryNumber: "02",
    description: "Statistical modeling, deep learning architectures, LLMs, and empirical model evaluation.",
    skills: [
      { name: "Machine Learning", isKeySkill: true, levelTag: "Algorithms" },
      { name: "Deep Learning", isKeySkill: true, levelTag: "Neural Networks" },
      { name: "NLP", isKeySkill: true, levelTag: "Text & Tokenization" },
      { name: "LLMs", isKeySkill: true, levelTag: "Gemma / Local Models" },
      { name: "PyTorch", isKeySkill: true, levelTag: "Deep Learning" },
      { name: "Hugging Face", isKeySkill: true, levelTag: "Transformers" },
      { name: "Scikit-learn", isKeySkill: true, levelTag: "Classical ML" },
      { name: "XGBoost", isKeySkill: true, levelTag: "Gradient Boosting" },
      { name: "Random Forest", isKeySkill: false, levelTag: "Ensemble Trees" },
      { name: "SVM", isKeySkill: false, levelTag: "Kernel Methods" },
      { name: "Model Evaluation", isKeySkill: true, levelTag: "ECE / Brier / F1" },
      { name: "Feature Engineering", isKeySkill: true, levelTag: "Transforms & Scaling" }
    ]
  },
  {
    id: "backend-databases",
    title: "Backend and Databases",
    categoryNumber: "03",
    description: "High-performance REST API services, transactional databases, and object-relational mapping.",
    skills: [
      { name: "FastAPI", isKeySkill: true, levelTag: "Async Web Framework" },
      { name: "Pydantic", isKeySkill: true, levelTag: "Data Validation" },
      { name: "SQLAlchemy", isKeySkill: true, levelTag: "Python ORM" },
      { name: "PostgreSQL", isKeySkill: true, levelTag: "Relational ACID" },
      { name: "SQLite", isKeySkill: false, levelTag: "Embedded DB" },
      { name: "REST APIs", isKeySkill: true, levelTag: "API Contracts" }
    ]
  },
  {
    id: "ai-tools-infrastructure",
    title: "AI Tools and Infrastructure",
    categoryNumber: "04",
    description: "Local inference runtimes, foundational API integrations, containerization, and version control.",
    skills: [
      { name: "Ollama", isKeySkill: true, levelTag: "Local LLM Serving" },
      { name: "Gemini API", isKeySkill: true, levelTag: "Multimodal AI" },
      { name: "Docker", isKeySkill: true, levelTag: "Containerization" },
      { name: "Git", isKeySkill: true, levelTag: "Version Control" },
      { name: "GitHub", isKeySkill: true, levelTag: "CI/CD & Collaboration" }
    ]
  },
  {
    id: "engineering-development",
    title: "Engineering and Development",
    categoryNumber: "05",
    description: "Core computer science principles, computational simulations, test automation, and systems architecture.",
    skills: [
      { name: "Data Structures and Algorithms", isKeySkill: true, levelTag: "Optimization & LeetCode" },
      { name: "Object-Oriented Programming", isKeySkill: true, levelTag: "Design Paradigms" },
      { name: "Software Testing", isKeySkill: true, levelTag: "Verification" },
      { name: "pytest", isKeySkill: true, levelTag: "Automated Test Suites" },
      { name: "System Design", isKeySkill: true, levelTag: "Scalability & Modular" },
      { name: "PyBullet", isKeySkill: true, levelTag: "Physics Multi-Agent Sim" }
    ]
  }
];
