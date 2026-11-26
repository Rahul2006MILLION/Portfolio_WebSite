import { EducationItem } from "@/types/portfolio";

export const educationData: EducationItem[] = [
  {
    id: "edu-dsu",
    institution: "Dayananda Sagar University",
    degree: "Bachelor of Technology (B.Tech)",
    specialization: "Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    period: "2024 — 2028",
    status: "In Progress",
    location: "Bengaluru, Karnataka, India",
    score: "9.35",
    scoreType: "CGPA",
    coursework: [
      "Data Structures and Algorithms",
      "Machine Learning Foundations",
      "Discrete Mathematics & Linear Algebra",
      "Object-Oriented Programming (Java / C++)",
      "Operating Systems & Systems Principles",
      "Database Management Systems",
      "Software Engineering & Testing"
    ],
    highlights: [
      "Maintaining an outstanding CGPA of 9.35 in CSE (AI & ML)",
      "Serving as appointed Class Representative",
      "Serving as Team Head for Smart India Hackathon participation",
      "Active researcher in multilingual LLM calibration and agent reliability"
    ],
    description: "Pursuing rigorous undergraduate engineering specializing in Artificial Intelligence and Machine Learning, focusing on algorithmic foundations, mathematical statistics, deep learning architectures, and scalable computing."
  },
  {
    id: "edu-pu",
    institution: "MKCPM PU College",
    degree: "Pre-University Certificate (Class XII)",
    specialization: "Science (PCMB / PCMC)",
    period: "2024",
    status: "Completed",
    location: "Karnataka, India",
    score: "91%",
    scoreType: "Percentage",
    highlights: [
      "Secured 91% distinction in Class XII Pre-University Examination",
      "Solid mathematical grounding in Differential & Integral Calculus and Analytical Geometry"
    ],
    description: "Completed higher secondary education in science and mathematics, building core analytical and problem-solving fundamentals."
  },
  {
    id: "edu-school",
    institution: "Jeevan Jyothi High School",
    degree: "Secondary School Leaving Certificate (Class X)",
    period: "2022",
    status: "Completed",
    location: "Karnataka, India",
    score: "95.84%",
    scoreType: "Percentage",
    highlights: [
      "Graduated with top academic honors and distinction scoring 95.84%",
      "Consistent academic excellence across sciences and mathematics"
    ],
    description: "Completed secondary school education with exemplary academic distinction, developing foundational interests in computing and scientific exploration."
  }
];
