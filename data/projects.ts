import { forecasting } from "./forecasting";
import { defectSegmentation } from "./defectSegmentation";
import { anomalyDetection } from "./anomalyDetection";
import { visionseg } from "./visionseg";

export type Project = {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
};
export const projects: Project[] = [
  {
    slug: "logiq-ai-agent",
    title: "LogIQ — Role-Aware AI Log Intelligence",
    technologies: [
      "Python",
      "Agentic AI",
      "SereneDB",
      "SQL",
      "MCP",
      "Docker"
    ],
    category: "Agentic AI",
    description: "An AI agent that investigates nearly 5 million infrastructure log records and produces evidence-grounded answers tailored to engineers, team leads, and managers."
  },
  {
    slug: "industrial-knowledge-copilot",
    title: "Industrial Knowledge Copilot",
    description: "A production-oriented retrieval-augmented generation system for answering questions across industrial documentation with measurable retrieval quality.",
    technologies: [
      "Python",
      "RAG",
      "Embeddings",
      "Vector Search",
      "Evaluation",
    ],
    category: "Generative AI",
  },
  defectSegmentation,
  anomalyDetection,
  visionseg,
  forecasting,
];
