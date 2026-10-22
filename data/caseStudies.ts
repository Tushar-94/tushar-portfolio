import type { CaseStudy } from "@/types/case-study";
import { copilot } from "./copilot";
import { forecasting } from "./forecasting";
import { defectSegmentation } from "./defectSegmentation";
import { anomalyDetection } from "./anomalyDetection";
import { visionseg } from "./visionseg";
export const caseStudies: CaseStudy[] = [
  {
    slug: defectSegmentation.slug,
    title: defectSegmentation.title,
    category: defectSegmentation.category,
    summary: defectSegmentation.description,
    technologies: defectSegmentation.technologies,
    sections: [],
  },
  {
    slug: forecasting.slug,
    githubUrl: forecasting.githubUrl,
    title: forecasting.title,
    category: forecasting.category,
    summary: forecasting.description,
    technologies: forecasting.technologies,
    sections: [],
  },
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
    slug: anomalyDetection.slug,
    category: anomalyDetection.category,
    title: anomalyDetection.title,
    summary: anomalyDetection.description,
    technologies: anomalyDetection.technologies,
    sections: [],
  },
  {
    slug: visionseg.slug,
    category: visionseg.category,
    title: visionseg.title,
    summary: visionseg.summary,
    technologies: visionseg.technologies,
    sections: [],
  },
];
