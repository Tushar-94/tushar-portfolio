export type CaseStudySection = {
  number: string;
  title: string;
  content: string;
};

export type ProjectMetric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  technologies: string[];
  sections: CaseStudySection[];
  architecture?: string[];
  architectureNote?: string;
  metrics?: ProjectMetric[];
  roles?: { title: string; focus: string; output: string }[];
  investigation?: {
    title: string;
    evidence: ProjectMetric[];
    caveat: string;
    conclusion: string;
  };
  // Set only after verifying the public repository belongs to this project.
  githubUrl?: string;
  workedInvestigationUrl?: string;
};
