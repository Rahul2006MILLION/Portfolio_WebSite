import { ProjectItem } from "@/types/portfolio";

export const projectsData: ProjectItem[] = [
  {
    id: "proj-01",
    slug: "cross-lingual-confidence-calibration-llms",
    title: "Cross-Lingual Confidence Calibration in Multilingual LLMs",
    shortDescription: "Empirical study on post-hoc confidence calibration across high and low-resource languages using Gemma 3 4B IT and Language-Shift Platt Scaling.",
    category: "Research",
    featured: true,
    thumbnail: "/images/projects/calibration.jpg",
    problemStatement: "Multilingual LLMs frequently output overconfident probabilities on non-English prompts, leading to severe miscalibration across Indic languages. Cross-lingual performance degrades unevenly under standard temperature scaling.",
    solution: "Engineered an empirical evaluation pipeline on Gemma 3 4B IT across English, Hindi, Bengali, Telugu, and Tamil spanning 4,050 model inferences. Evaluated Expected Calibration Error (ECE), Brier Score, and Murphy Decomposition, implementing Language-Shift Platt Scaling with bootstrap confidence intervals.",
    contribution: "Constructed the multi-lingual prompt test harness, extracted raw token logits, computed ECE and Murphy decompositions across languages, and performed bootstrap statistical validation.",
    technologies: ["PyTorch", "Python", "Hugging Face", "Gemma 3 4B IT", "NumPy", "Scipy", "Bootstrap Statistics"],
    keyFeatures: [
      "Rigorous evaluation over 4,050 controlled model inferences across 5 distinct languages",
      "Benchmarked Expected Calibration Error (ECE), Brier Score, and Murphy Decomposition",
      "Applied Language-Shift Platt Scaling to recalibrate post-hoc linguistic confidence",
      "Statistically grounded via bootstrap resampling to determine variance bounds"
    ],
    metrics: [
      { label: "Inferences", value: "4,050" },
      { label: "Languages", value: "5 Languages" },
      { label: "Base Model", value: "Gemma 3 4B IT" }
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/NLP_Multi_lingual-Project",
    status: "Completed Research Pipeline",
    year: "2025",
    reportedNote: "Reported result: Demonstrates language-specific calibration shifts; notably, while low-resource Indic languages saw calibration gains, the English baseline worsened after global recalibration."
  },
  {
    id: "proj-02",
    slug: "cliq-ai-financial-insights-reward-optimization",
    title: "CLIQ – AI Financial Insights & Credit Card Optimization",
    shortDescription: "Full-stack personal finance platform integrating credit card reward optimization, subscription auditing, and deterministic decimal calculations.",
    category: "Software Engineering",
    featured: true,
    thumbnail: "/images/projects/cliq.jpg",
    problemStatement: "Users struggle to maximize credit card merchant reward categories and detect recurring hidden subscription drains, while typical AI tools suffer from floating-point errors and LLM numerical hallucinations in financial calculations.",
    solution: "Architected a secure full-stack platform using FastAPI and Next.js. Financial calculations, reward point math, and fee reconciliations are handled strictly by deterministic Python Decimal algorithms rather than delegated to an LLM, while Gemini API is utilized exclusively for unstructured receipt categorization and multilingual document parsing.",
    contribution: "Engineered the deterministic financial calculation modules, implemented card comparison algorithms, designed relational database schemas in PostgreSQL/Supabase with SQLAlchemy, and created the responsive Next.js frontend.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "Python (Decimal)", "PostgreSQL", "SQLAlchemy", "Gemini API", "SQLite"],
    keyFeatures: [
      "Strict deterministic financial accounting using Python Decimal to eliminate rounding errors",
      "Credit card reward optimization maximizing cashback based on specific merchant categories",
      "Automated subscription auditing detecting recurring charges and frequency anomalies",
      "Secure document ingestion pipeline with client privacy controls and receipt parsing"
    ],
    metrics: [
      { label: "Math Engine", value: "Python Decimal" },
      { label: "Backend", value: "FastAPI + async" },
      { label: "Architecture", value: "Full Stack" }
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/AI-Driven-Financial-Insights-and-Credit-Card-Reward-Optimization-Platform",
    status: "Active Implementation",
    year: "2025",
    reportedNote: "Architectural safeguard: All monetary balances and reward logic are executed through deterministic Python Decimal units, ensuring zero LLM hallucination in financial balances."
  },
  {
    id: "proj-03",
    slug: "sterlebom-robosync-multi-robot-fleet-coordination",
    title: "STERLEBOM / RoboSync – Decentralized Multi-Robot Coordination",
    shortDescription: "Decentralized warehouse multi-robot fleet planning with A* pathfinding, Contract Net Protocol auctioning, and dynamic conflict management.",
    category: "Robotics",
    featured: true,
    thumbnail: "/images/projects/sterlebom.jpg",
    problemStatement: "Centralized multi-robot warehouse dispatchers suffer from single points of failure and computational bottlenecks as fleet sizes scale, leading to spatial deadlocks and path collisions in crowded aisles.",
    solution: "Designed and implemented a decentralized fleet coordination system using the Contract Net Protocol (CNP) for dynamic task allocation combined with space-time reservation tables and cooperative A* path planning. Validated through continuous multi-agent physics simulations in PyBullet.",
    contribution: "Implemented space-time reservation tables to prevent inter-robot path cross-overs, coded the Contract Net task negotiation protocol, built dynamic fault-tolerant task reassignment upon robot stall, and structured the PyBullet simulation environment.",
    technologies: ["Python", "PyBullet", "A* Algorithm", "Contract Net Protocol", "Discrete Event Simulation", "Spatial-Temporal Planning"],
    keyFeatures: [
      "Decentralized dynamic task allocation using Contract Net Protocol auction bidding",
      "Time-extended A* path planning with dynamic 4D (x, y, z, t) reservation tables",
      "Fault-tolerant task reassignment automatically recovering from simulated agent stalls",
      "Physics-based multi-agent validation in simulated PyBullet warehouse environment"
    ],
    metrics: [
      { label: "Coordination", value: "Decentralized" },
      { label: "Protocol", value: "Contract Net" },
      { label: "Simulation", value: "PyBullet" }
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/Sterlebom",
    status: "Verified Simulation Prototype",
    year: "2025",
    reportedNote: "Reported result: Achieved zero collisions in the controlled PyBullet multi-agent simulation test environments (reported simulation result, not a real-world physical guarantee)."
  },
  {
    id: "proj-07",
    slug: "basket-multi-category-retail-platform",
    title: "BASKET — Multi-Category Indian Retail Platform",
    shortDescription: "A multi-category Indian retail platform designed to support product discovery, shopping workflows, authentication and payment integration.",
    category: "Web Development",
    featured: true,
    thumbnail: "/images/projects/basket.jpg",
    problemStatement: "Hyper-local Indian retailers selling across groceries, fashion, electronics and beauty need a single storefront that can handle discovery, carts, orders and payments reliably.",
    solution: "A modular FastAPI (Python) backend on PostgreSQL with SQLAlchemy and Alembic migrations, a Next.js 15 / React 19 storefront styled with Tailwind CSS, Razorpay payments in sandbox (test) mode, and OpenSearch product search that falls back to PostgreSQL full-text search when no search cluster is configured.",
    contribution: "Developed the relational database schema, built REST API endpoints with Pydantic validation, implemented transactional order processing routines, and configured the frontend client.",
    technologies: ["Next.js 15", "React 19", "Tailwind CSS", "Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "Razorpay Sandbox", "OpenSearch"],
    keyFeatures: [
      "Product discovery across multiple retail categories, with OpenSearch search and a PostgreSQL full-text fallback",
      "Shopping workflows: persistent carts, price quotes, inventory reservations and order processing",
      "Authentication with Argon2id password hashing and HTTP-only JWT cookies",
      "Razorpay payment integration in test mode, with server-side capture and webhook signature verification"
    ],
    metrics: [
      { label: "Frontend", value: "Next.js 15 + React 19" },
      { label: "Backend", value: "FastAPI + PostgreSQL" },
      { label: "Payments", value: "Razorpay Sandbox" }
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/Online_Shopping",
    status: "v1.0 Released · v2.0 In Development",
    year: "2024",
    reportedNote: "Status disclosure: Runs locally in sandbox mode — payments use Razorpay test credentials, and the repository documents known limitations (partial multilingual UI, external services required for some features). Not a live production deployment."
  },
  {
    id: "proj-05",
    slug: "counterfactual-denial-attribution-ai-agents",
    title: "Counterfactual Denial Attribution in Tool-Calling AI Agents",
    shortDescription: "Runtime reference monitoring and causal provenance graphs analyzing denial-feedback leakage and policy evaluation in autonomous agents.",
    category: "Research",
    featured: false,
    thumbnail: "/images/projects/denial.jpg",
    problemStatement: "When tool-calling AI agents encounter permission denials, standard denial messages can inadvertently leak sensitive security policies or allow agents to bypass constraints via causality laundering across multiple turns.",
    solution: "Formulated a runtime reference monitor tracking action provenance graphs. Investigates counterfactual attribution and trust propagation across simulated agent execution environments to detect whether agent re-planning exploits denial telemetry.",
    contribution: "Formulated the threat model, constructed the provenance graph data structures, designed simulated tool-calling harness environments, and drafted policy evaluation logic.",
    technologies: ["Python", "Directed Graphs (NetworkX)", "Security Policy Engine", "Simulated Agent Harness", "Causal Analysis"],
    keyFeatures: [
      "Formal tracking of agent action sequences via directed provenance graphs",
      "Counterfactual evaluation isolating causal effects of policy denial messages",
      "Simulated multi-turn tool execution harness mimicking enterprise API integrations",
      "Policy-based reference monitor evaluating action authorization before dispatch"
    ],
    metrics: [
      { label: "Paradigm", value: "Provenance Graphs" },
      { label: "Domain", value: "Agent Security" },
      { label: "Evaluation", value: "Simulated Harness" }
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/counterfactual-denial-attribution",
    status: "Research Prototype (Phase 1 Implemented / Live LLM Planned)",
    year: "2025",
    reportedNote: "Status disclosure: Foundational graph data structures and simulated harness are implemented; full live-LLM interactive evaluation remains in planned development."
  },
  {
    id: "proj-06",
    slug: "aquarestore-aquatic-image-intelligence",
    title: "AquaRestore – Aquatic Image Intelligence & Adaptive Enhancement",
    shortDescription: "Two-stage underwater computer vision pipeline combining MobileNetV3 classification with physics-based CLAHE and Gray World color restoration.",
    category: "AI / ML",
    featured: true,
    thumbnail: "/images/projects/aquarestore.jpg",
    problemStatement: "Underwater optical imaging suffers from wavelength-dependent light attenuation, severe greenish-blue color cast, and haze, degrading marine biological monitoring and autonomous underwater vehicle vision.",
    solution: "Engineered a hybrid vision pipeline. A fine-tuned MobileNetV3-Small classifier acts as a confidence gate; images passing validation are dynamically processed through Gray World color correction, CIE LAB contrast adjustment, and Adaptive Histogram Equalization (CLAHE).",
    contribution: "Trained the MobileNetV3-Small neural network in PyTorch, developed the OpenCV color restoration pipeline, created the interactive Streamlit deployment interface, and benchmarked confidence thresholding.",
    technologies: ["Python", "PyTorch", "MobileNetV3-Small", "OpenCV", "Streamlit", "CIE LAB", "CLAHE"],
    keyFeatures: [
      "Lightweight MobileNetV3-Small backbone optimized for edge and low-power deployment",
      "Physics-grounded color restoration combining Gray World assumption with CLAHE",
      "Confidence-based classification gating preventing degraded out-of-domain images from misprocessing",
      "Interactive Streamlit application providing real-time before/after visual inspection"
    ],
    metrics: [
      { label: "Dataset Size", value: "1,356 Images" },
      { label: "Architecture", value: "MobileNetV3-Small" },
      { label: "Reported Prec", value: "100% @ 0.85" }
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/Aqua-Restore-IPCV-Project",
    status: "Completed & Verified",
    year: "2024",
    reportedNote: "Reported test results: Tested on a curated dataset of 1,356 images; reported 100% precision with 0.00% false acceptance on held-out test data at confidence threshold 0.85 (reported test benchmark, not a universal guarantee)."
  },
  {
    id: "proj-04",
    slug: "llm-uncertainty-classification",
    title: "LLM Uncertainty Classification & Semantic Entropy",
    shortDescription: "Feature-based classification framework predicting LLM response epistemic uncertainty via multi-response consistency and semantic clustering.",
    category: "Research",
    featured: false,
    thumbnail: "/images/projects/uncertainty.jpg",
    problemStatement: "Generative LLMs frequently hallucinate factual assertions without explicit indicators of internal epistemic uncertainty, making automated risk-gating in production pipelines difficult.",
    solution: "Developed an uncertainty quantification framework that samples multiple model completions per query, clusters semantically equivalent answers using Sentence Transformers, and extracts semantic entropy and dispersion features to categorize prompts into KNOWN, AMBIGUOUS, or UNKNOWN categories with an adaptive fast-path.",
    contribution: "Built the multi-query Ollama inference pipeline, implemented semantic entropy mathematical calculations, extracted textual similarity matrices, and structured the XGBoost feature pipeline.",
    technologies: ["Python", "Ollama", "Sentence Transformers", "XGBoost", "NumPy", "Scikit-learn"],
    keyFeatures: [
      "Semantic entropy estimation computed over clustered completion embeddings",
      "Three-tier epistemic taxonomy: KNOWN, AMBIGUOUS, and UNKNOWN queries",
      "Adaptive fast-path skipping redundant multi-sampling on high-confidence prompts",
      "Modular feature extraction pipeline integrating length, lexical variance, and embedding dispersion"
    ],
    metrics: [
      { label: "Taxonomy", value: "3 Categories" },
      { label: "Embedding", value: "Sentence Transformers" },
      { label: "Inference", value: "Ollama Local" }
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/LLM-Uncertainty-Classification",
    status: "Pipeline Implemented (Classifier Not Trained)",
    year: "2025",
    reportedNote: "Verification note: The core feature extraction and entropy architecture is fully implemented; the README explicitly notes 'CLASSIFIER NOT TRAINED' pending curated gold-standard annotations. No production accuracy is claimed."
  },
  {
    id: "proj-08",
    slug: "bullcompass-ai-investment-research-assistant",
    title: "BullCompass – AI Long-Term Investment Research Assistant",
    shortDescription: "Automated equity research assistant orchestrating financial data ingestion, local Ollama LLM synthesis, and structured SQLite storage.",
    category: "Software Engineering",
    featured: false,
    thumbnail: "/images/projects/bullcompass.jpg",
    problemStatement: "Retail investors face information overload parsing 100+ page annual filings, balance sheets, and competitive risk disclosures without institutional research teams.",
    solution: "Built a local financial research workflow with FastAPI and SQLite. Ingests structured historical data and fundamental metrics, utilizing local Ollama LLM instances to synthesize qualitative risk factors and produce structured research briefs.",
    contribution: "Designed the backend REST APIs, implemented financial metric ingestion pipelines, set up SQLite persistence schemas, and engineered localized prompt templates for financial summary synthesis.",
    technologies: ["Python", "FastAPI", "SQLite", "Ollama", "LLMs", "Pydantic", "Pandas"],
    keyFeatures: [
      "Structured data extraction synthesizing fundamental financial metrics",
      "Local LLM inference via Ollama ensuring financial data privacy and zero API costs",
      "Structured storage storing research notes, stock watchlists, and qualitative memos",
      "Automated summary generation highlighting long-term competitive moat and risk disclosures"
    ],
    metrics: [
      { label: "Inference", value: "Local Ollama" },
      { label: "Backend", value: "FastAPI" },
      { label: "Storage", value: "SQLite" }
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/BullCompass-Stock-Analysis",
    status: "Working Prototype",
    year: "2024",
    reportedNote: "Verification note: Tool is designed strictly as an automated research compilation assistant. Does not predict stock prices or provide financial guarantees."
  },
  {
    id: "proj-09",
    slug: "student-performance-predictor",
    title: "Student Performance Predictor (NumPy From Scratch)",
    shortDescription: "Full-stack educational analytics app powered by a Logistic Regression model implemented from mathematical scratch using NumPy.",
    category: "AI / ML",
    featured: false,
    thumbnail: "/images/projects/student-perf.jpg",
    problemStatement: "Understanding ML foundations requires implementing core optimization routines from pure mathematics rather than relying solely on high-level library abstractions.",
    solution: "Implemented binary Logistic Regression from scratch utilizing pure NumPy, coding gradient descent, sigmoid activation, and binary cross-entropy loss by hand. Paired with a custom StandardScaler and deployed via a FastAPI backend and React frontend.",
    contribution: "Coded the mathematical optimization loops, vectorized gradient calculations in NumPy, built the FastAPI serving endpoint, and authored the interactive React/TypeScript UI.",
    technologies: ["Python", "NumPy (From Scratch)", "FastAPI", "React", "TypeScript", "Tailwind CSS"],
    keyFeatures: [
      "Pure mathematical implementation of Logistic Regression and Gradient Descent in NumPy",
      "Custom feature normalization and standardization pipeline",
      "Lightweight REST API container returning real-time inference predictions",
      "Clean interactive web UI allowing educators to test scenario parameters"
    ],
    metrics: [
      { label: "ML Engine", value: "NumPy Scratch" },
      { label: "Algorithm", value: "Logistic Regression" },
      { label: "Serving", value: "FastAPI + React" }
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/Student-Performance-Predictor",
    status: "Completed & Verified",
    year: "2024"
  },
  {
    id: "proj-10",
    slug: "future-interns-sales-forecasting",
    title: "Enterprise Sales Forecasting & Time-Series Pipeline",
    shortDescription: "Machine learning time-series regression workflow modeling retail revenue trends with verified evaluation benchmarks.",
    category: "AI / ML",
    featured: false,
    thumbnail: "/images/projects/sales-forecast.jpg",
    problemStatement: "Supply chains require reliable revenue and unit demand projections to prevent stockouts and minimize warehouse carrying costs under seasonal demand shifts.",
    solution: "Engineered an end-to-end forecasting pipeline during the Future Interns internship. Performed exploratory data analysis, seasonal decomposition, missing value imputation, and trained Scikit-learn regression models.",
    contribution: "Cleaned raw historical sales datasets, engineered lag and rolling statistics features, cross-validated regression models, and verified benchmark performance.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Time Series Analysis"],
    keyFeatures: [
      "Rigorous exploratory data analysis identifying seasonal trends and sales outliers",
      "Lag feature creation and rolling window statistics for temporal predictive power",
      "Standardized data scaling and cross-validation preventing data leakage",
      "Documented regression error analysis comparing linear and ensemble baselines"
    ],
    metrics: [
      { label: "Reported MAE", value: "74.82" },
      { label: "Reported RMSE", value: "278.79" },
      { label: "Domain", value: "Future Interns" }
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/FUTURE_ML_01",
    status: "Verified Internship Deliverable",
    year: "2026",
    reportedNote: "Verified metrics: Evaluated and reported test benchmarks of Mean Absolute Error (MAE): 74.82 and Root Mean Squared Error (RMSE): 278.79."
  },
  {
    id: "proj-11",
    slug: "future-interns-resume-screening-candidate-ranking",
    title: "Semantic Resume Screening & Candidate Ranking System",
    shortDescription: "NLP similarity engine comparing candidate resumes against job descriptions with skill gap identification and ranking.",
    category: "AI / ML",
    featured: false,
    thumbnail: "/images/projects/resume-screening.jpg",
    problemStatement: "Manual resume screening for technical roles is labor-intensive and inconsistent, often failing to objectively map candidate competencies against specific requirements.",
    solution: "Built an NLP candidate screening workflow during the Future Interns internship. Analyzes semantic similarity between resumes and job specifications, extracts matched and missing skills, and computes normalized composite suitability scores.",
    contribution: "Implemented text normalization and tokenization routines, coded TF-IDF vectorization and cosine similarity calculations, and generated structured candidate ranking tables.",
    technologies: ["Python", "NLP", "Scikit-learn", "TF-IDF", "Cosine Similarity", "Pandas", "Feature Engineering"],
    keyFeatures: [
      "Automated extraction of technical skills from unstructured resume text",
      "Skill gap detection identifying missing qualifications relative to job descriptions",
      "Cosine similarity calculation in vector space determining semantic alignment",
      "Objective, explainable score distribution and candidate ranking tables"
    ],
    metrics: [
      { label: "Engine", value: "TF-IDF + Cosine" },
      { label: "Output", value: "Ranked Scoring" },
      { label: "Domain", value: "Future Interns" }
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/FUTURE_ML_03",
    status: "Verified Internship Deliverable",
    year: "2026"
  },
  {
    id: "proj-12",
    slug: "future-interns-nlp-support-ticket-classification",
    title: "IT Support Ticket NLP Classification Workflow",
    shortDescription: "Text classification pipeline categorizing approximately 4,000 enterprise IT support tickets by domain and routing priority.",
    category: "AI / ML",
    featured: false,
    thumbnail: "/images/projects/ticket-nlp.jpg",
    problemStatement: "High-volume IT helpdesks experience severe response delays when support tickets must be manually read and routed to appropriate technical teams.",
    solution: "Developed an NLP classification pipeline processing approximately 4,000 historical IT support tickets. Applied text preprocessing, stop-word removal, and vectorization to train multi-class machine learning classifiers for automated ticket triage.",
    contribution: "Preprocessed the ~4,000 ticket corpus, engineered text representations, trained classification baselines, and evaluated category-wise precision and recall.",
    technologies: ["Python", "NLP", "Scikit-learn", "Text Preprocessing", "Multi-Class Classification", "Pandas"],
    keyFeatures: [
      "Processed and cleansed a corpus of ~4,000 IT support tickets",
      "Multi-class classification pipeline predicting target issue domain and priority tier",
      "Comprehensive text normalization handling domain-specific error codes and jargon",
      "Detailed evaluation across support ticket categories"
    ],
    metrics: [
      { label: "Dataset Scale", value: "~4,000 Tickets" },
      { label: "Task", value: "Multi-Class NLP" },
      { label: "Domain", value: "Future Interns" }
    ],
    status: "Verified Internship Deliverable",
    year: "2026",
    reportedNote: "Internship deliverable: Completed as part of Future Interns machine learning internship program; repository details managed internally within internship records."
  }
];
