import { ExperienceItem } from "@/types/portfolio";

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-future-interns",
    role: "Machine Learning Intern",
    company: "Future Interns",
    location: "Remote",
    period: "2026",
    type: "Internship",
    summary: "Engineered machine learning workflows for predictive sales forecasting, IT support ticket NLP classification, and candidate-job semantic ranking systems.",
    deliverables: [
      {
        title: "Sales Forecasting Workflow",
        description: "Developed end-to-end machine learning time-series and regression forecasting workflows, handling missing values, temporal feature engineering, and rigorous model evaluation.",
        metrics: "Reported MAE: 74.82 · Reported RMSE: 278.79",
        technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "EDA", "Regression Models"]
      },
      {
        title: "NLP Support Ticket Classification",
        description: "Built an NLP-based classification pipeline processing approximately 4,000 IT support tickets to automatically categorize and route organizational support requests by issue domain and priority.",
        metrics: "Dataset: ~4,000 IT Support Tickets Analyzed & Categorized",
        technologies: ["Python", "NLP", "Text Preprocessing", "Scikit-learn", "TF-IDF / Embeddings"]
      },
      {
        title: "Resume Screening and Candidate Ranking",
        description: "Implemented a semantic similarity analysis system evaluating resumes against job descriptions. Designed algorithms to identify matched and missing technical skills and compute normalized candidate screening scores.",
        metrics: "Automated Skill Extraction, Gap Identification & Scored Rankings",
        technologies: ["Python", "NLP", "Cosine Similarity", "Feature Extraction", "Pandas"]
      }
    ]
  }
];
