import { experience } from "@/data/experience";
import { projects } from "@/data/projects";

export type JourneyStage = {
  title: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  experience: (typeof experience)[number];
};

export const journeyStages: JourneyStage[] = [
  {
    title: "Software Engineering",
    description: "Built a foundation in reliable applications, data workflows, and production-oriented systems.",
    capabilities: ["Reliable applications", "Data workflows", "Maintainable software"],
    technologies: ["Python", "SQL", "Git", "CI/CD"],
    experience: experience.find((item) => item.role === "Associate Software Engineer")!,
  },
  {
    title: "Data Science",
    description: "Expanded into statistical analysis, predictive modelling, experimentation, and data-driven decision-making.",
    capabilities: ["Statistical analysis", "Predictive modelling", "Experimentation"],
    technologies: ["Python", "Pandas", "scikit-learn", "SQL"],
    experience: experience.find((item) => item.role === "Data Scientist")!,
  },
  {
    title: "Machine Learning Engineering",
    description: "Focused on model development, evaluation, optimization, and practical ML integration.",
    capabilities: ["Model development", "Evaluation design", "ML integration"],
    technologies: ["PyTorch", "NumPy", "Pytest", "Docker"],
    experience: experience.find((item) => item.role === "Data & Model Engineer")!,
  },
  {
    title: "Applied AI & Computer Vision",
    description: "Worked on industrial inspection, anomaly detection, retrieval systems, and intelligent automation.",
    capabilities: ["Visual inspection", "Evidence retrieval", "Intelligent automation"],
    technologies: ["DINOv2", "YOLOv8", "Embeddings", "OpenCV"],
    experience: experience.find((item) => item.role === "Data & Model Engineer")!,
  },
];

type RelatedProject = { slug: string; title: string; context: string };
export type ExpertiseCategory = {
  id: string;
  title: string;
  headline: string;
  focus: string;
  tools: string[];
  projects: RelatedProject[];
};

function related(slug: string, context: string): RelatedProject {
  const project = projects.find((item) => item.slug === slug)!;
  return { slug: project.slug, title: project.title, context };
}

export const expertiseCategories: ExpertiseCategory[] = [
  {
    id: "applied-ai",
    title: "Applied AI",
    headline: "From information to useful intelligence.",
    focus: "Retrieval, language-model tools, and query-aware workflows that connect questions with relevant evidence.",
    tools: ["LLMs", "RAG", "Embeddings", "Vector Search", "Agentic Workflows", "Prompt Engineering"],
    projects: [related("industrial-knowledge-copilot", "Retrieval architecture & evaluation"), related("logiq-ai-agent", "Role-aware investigation & tool use")],
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    headline: "Understanding what an image contains.",
    focus: "Defect localization, anomaly detection, and pixel-level visual understanding, with attention to class-level evaluation.",
    tools: ["PyTorch", "YOLOv8", "DINOv2", "DeepLabV3", "OpenCV", "Anomaly Detection", "Semantic Segmentation"],
    projects: [related("industrial-vision-anomaly-detection", "Reference-based visual inspection"), related("industrial-defect-detection-segmentation", "Instance segmentation & class-level evaluation"), related("visionseg", "Semantic segmentation & engineering design")],
  },
  {
    id: "data-science",
    title: "Data Science",
    headline: "Turning data into defensible decisions.",
    focus: "Data preparation, statistical modelling, experimentation, and temporal validation that put predictive results in context.",
    tools: ["Python", "SQL", "Pandas", "NumPy", "Scikit-learn", "Statistical Modelling", "Experimentation"],
    projects: [related("forecasting-decision-intelligence", "Demand engineering, backtesting & uncertainty")],
  },
  {
    id: "ml-engineering",
    title: "ML Engineering",
    headline: "The engineering around the model.",
    focus: "Modular pipelines, reproducible evaluation, orchestration, and automated checks, with clear interfaces for integration.",
    tools: ["FastAPI", "Docker", "Airflow", "Cloud Infrastructure", "Automated Testing", "CI/CD"],
    projects: [related("industrial-vision-anomaly-detection", "Calibration & reproducible evaluation"), related("visionseg", "Planned API, container & export integrations"), related("logiq-ai-agent", "Bounded tools & parameterized queries")],
  },
];
