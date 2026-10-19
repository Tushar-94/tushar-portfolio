import type { CaseStudy } from "@/types/case-study";
import { copilot } from "./copilot";
export const caseStudies: CaseStudy[] = [
  {
    slug: "logiq-ai-agent",
    githubUrl: "https://github.com/Tushar-94/logiq-ai-agent-hackathon",
    workedInvestigationUrl: "https://github.com/Tushar-94/logiq-ai-agent-hackathon/blob/main/docs/worked_investigations/openstack_invaliddiskinfo_20261018T184344_296010Z/submission_report_illustrated.md",
    category: "Agentic AI",
    title: "LogIQ — Role-Aware AI Log Intelligence",
    summary: "An AI agent that investigates nearly 5 million infrastructure log records and produces evidence-grounded answers tailored to engineers, team leads, and managers.",
    technologies: [
      "Python",
      "Agentic AI",
      "SereneDB",
      "SQL",
      "MCP",
      "Docker"
    ],
    metrics: [
      {
        value: "4.96M",
        label: "Searchable log records"
      },
      {
        value: "19",
        label: "Investigation tools"
      },
      {
        value: "3",
        label: "Role-specific perspectives"
      }
    ],
    roles: [
      {
        title: "Engineer",
        focus: "Technical diagnosis",
        output: "Errors, traceback context, troubleshooting"
      },
      {
        title: "Team Lead",
        focus: "Investigation coordination",
        output: "Recurring patterns, ownership, priorities"
      },
      {
        title: "Manager",
        focus: "Operational decisions",
        output: "Risk, severity, recommended actions"
      }
    ],
    architecture: [
      "Natural-language question + selected role",
      "AI agent",
      "Selection of predefined investigation tools",
      "Parameterized SQL queries",
      "SereneDB",
      "Retrieved evidence",
      "Role-specific answer + supporting evidence"
    ],
    architectureNote: "19 predefined investigation tools across search, investigation, aggregation, correlation, and prioritization. Tools execute parameterized SQL; the agent does not generate arbitrary SQL.",
    investigation: {
      title: "OpenStack disk inspection failure",
      evidence: [
        {
          value: "8",
          label: "InvalidDiskInfo matches"
        },
        {
          value: "24",
          label: "qemu-img matches"
        },
        {
          value: "192",
          label: "Component ERROR lines"
        }
      ],
      caveat: "These counts overlap and do not represent independent incidents.",
      conclusion: "Root cause was not conclusively established."
    },
    sections: []
  },
  {
    slug: "industrial-knowledge-copilot",
    githubUrl: "https://github.com/Tushar-94/industrial-knowledge-copilot",
    title: copilot.title,
    category: copilot.category,
    summary: copilot.summary,
    technologies: copilot.technologies,
    sections: [],
  },
  {
    slug: "industrial-vision-anomaly-detection",
    category: "Computer Vision",
    title: "Industrial Vision Anomaly Detection",
    summary: "A few-shot industrial visual inspection workflow using DINOv2 anomaly scoring, ROI masking, threshold calibration, and reproducible evaluation.",
    technologies: [
      "DINOv2",
      "PyTorch",
      "OpenCV",
      "Anomaly Detection",
      "ROI Masking",
    ],
    architecture: [
      "Reference images",
      "ROI preprocessing",
      "DINOv2 feature extraction",
      "Feature comparison",
      "Anomaly scoring",
      "Threshold decision",
      "Inspection result",
    ],
    sections: [
      {
        number: "01",
        title: "Few-shot inspection",
        content: "Compare DINOv2 representations against a small reference set of acceptable parts when labeled defects are limited."
      },
      {
        number: "02",
        title: "Controlled ROI masking",
        content: "Compare masked and unmasked inputs to measure whether excluding background improves score separation."
      },
      {
        number: "03",
        title: "Threshold calibration",
        content: "Compare good and defective score distributions, false positives, and false negatives before selecting a threshold."
      },
      {
        number: "04",
        title: "Reproducible evaluation",
        content: "Record per-image scores, reference sets, masking state, model versions, and dataset assumptions."
      }
    ],
  },
  {
    slug: "manufacturing-intelligence",
    category: "Machine Learning",
    title: "Manufacturing Intelligence",
    summary: "An explainable machine-learning workflow for identifying process drivers, defect patterns, anomaly confidence, and opportunities for manufacturing optimization.",
    technologies: [
      "XGBoost",
      "SHAP",
      "Python",
      "Data Engineering",
      "Explainable AI",
    ],
    architecture: [
      "CSV / Excel process logs",
      "Ingestion and schema normalization",
      "Data validation",
      "Feature preparation",
      "XGBoost models",
      "Anomaly confidence",
      "SHAP explanations",
      "Operational recommendations",
    ],
    sections: [
      {
        number: "01",
        title: "Reliable inputs",
        content: "Normalize CSV and Excel headers, map canonical fields, and validate schemas before modeling."
      },
      {
        number: "02",
        title: "Structured ML baseline",
        content: "Use XGBoost for classification and regression on structured process data."
      },
      {
        number: "03",
        title: "Explainable predictions",
        content: "Use TreeSHAP to show how individual process parameters contribute to model predictions."
      },
      {
        number: "04",
        title: "Engineering decision",
        content: "Keep analytical logic measurable and auditable. An LLM narrative layer is a possible later addition."
      }
    ],
  },
];
