import { ResearchItem } from "@/types/portfolio";

export const researchData: ResearchItem[] = [
  {
    id: "res-01",
    slug: "cross-lingual-confidence-calibration-llms",
    title: "Cross-Lingual Confidence Calibration in Multilingual LLMs",
    researchProblem: "Multilingual LLMs (such as Gemma 3 4B IT) exhibit significant probability overconfidence and calibration degradation when evaluated on non-English Indic languages, leading to unreliable confidence estimates for high-stakes decisions.",
    proposedApproach: "Evaluated Expected Calibration Error (ECE), Brier Score, and Murphy Decomposition across 4,050 model inferences in 5 languages (English, Hindi, Bengali, Telugu, Tamil). Applied Language-Shift Platt Scaling to adjust confidence post-hoc across linguistic distributions.",
    experimentalMethodology: "Systematic multi-prompt testing extracting raw token logits across 4,050 inferences. Applied Murphy resolution and reliability decomposition alongside bootstrap resampling (1,000 iterations) to establish statistically rigorous variance bounds.",
    implementationStatus: "Experimental pipeline and evaluation codebase fully implemented.",
    technologies: ["Gemma 3 4B IT", "PyTorch", "Hugging Face", "Platt Scaling", "Bootstrap Statistics", "ECE / Brier Score"],
    keyFindings: [
      "Demonstrated significant variance in raw calibration errors across high-resource vs Indic languages",
      "Language-Shift Platt Scaling yielded measurable calibration improvements in Indic languages",
      "Crucial empirical finding: The English baseline calibration worsened following global recalibration, proving language-shift trade-offs"
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/NLP_Multi_lingual-Project",
    note: "Empirical evaluation over 4,050 model inferences. Code repository verified."
  },
  {
    id: "res-02",
    slug: "llm-uncertainty-classification",
    title: "LLM Uncertainty Classification via Semantic Entropy & Consistency",
    researchProblem: "Generative LLMs frequently hallucinate without internal signals of uncertainty, making it difficult to distinguish between queries the model genuinely knows vs ambiguous or completely unknown knowledge boundaries.",
    proposedApproach: "Multi-response stochastic sampling coupled with semantic clustering using Sentence Transformers. Computes semantic entropy and embedding dispersion to categorize prompt difficulty into KNOWN, AMBIGUOUS, and UNKNOWN classes with an adaptive fast-path.",
    experimentalMethodology: "Extracted feature matrices capturing semantic entropy, lexical variance, length dispersion, and cluster entropy across multiple completions generated via local Ollama inference.",
    implementationStatus: "Feature extraction pipeline implemented; classifier training pending gold annotations (README reports: 'CLASSIFIER NOT TRAINED').",
    technologies: ["Ollama", "Sentence Transformers", "Semantic Entropy", "XGBoost", "Python", "NumPy"],
    keyFindings: [
      "Formulated three-tier epistemic taxonomy: KNOWN, AMBIGUOUS, and UNKNOWN queries",
      "Implemented adaptive fast-path to bypass expensive multi-sampling on high-confidence prompts",
      "Constructed modular feature extraction suite ready for supervised training once gold annotations are completed"
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/LLM-Uncertainty-Classification",
    note: "Architecture and feature pipelines verified. No production classifier is claimed as training is explicitly pending."
  },
  {
    id: "res-03",
    slug: "counterfactual-denial-attribution-ai-agents",
    title: "Counterfactual Denial Attribution in Tool-Calling AI Agents",
    researchProblem: "Autonomous AI agents executing multi-turn tool calling can circumvent security boundaries or infer private policies through denial-feedback leakage, leading to causality laundering across intermediate steps.",
    proposedApproach: "A runtime reference monitor constructing dynamic provenance graphs of agent tool requests, applying counterfactual attribution and trust propagation to evaluate policy decisions and leakage vectors.",
    experimentalMethodology: "Simulated multi-turn tool execution harness mimicking enterprise authorization environments, evaluating graph causality under synthetic constraint scenarios.",
    implementationStatus: "Phase 1 foundational graph structures and simulation harness implemented; live-LLM interactive evaluation remains in planned development.",
    technologies: ["Python", "Directed Provenance Graphs", "Security Reference Monitor", "Causal Analysis", "Simulated Agent Harness"],
    keyFindings: [
      "Formalized threat model for multi-turn denial telemetry leakage in autonomous agents",
      "Developed directed provenance tracking attributing security policy triggers counterfactually",
      "Structured reference monitor validating actions prior to execution dispatch"
    ],
    githubUrl: "https://github.com/Rahul2006MILLION/counterfactual-denial-attribution",
    note: "Foundational phase implemented. Live-LLM testing is planned and not claimed as completed."
  }
];
