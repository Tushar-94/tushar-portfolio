export type ExperienceItem = {

    period: string;
  
    role: string;
  
    company: string;

    location?: string;
  
    summary: string;
  
    focus: string[];
  
  };
  
  export const experience: ExperienceItem[] = [
  
    {
  
      period: "2025 — Present",
  
      role: "Data & Model Engineer",
  
      company: "AgilXAI",
  
      summary:
  
        "Building applied AI systems across LLM workflows, computer vision, model APIs, and large-scale data processing.",
  
      focus: ["Generative AI", "Computer Vision", "ML Engineering", "Data Systems"],
  
    },
  
    {
  
      period: "2023 — 2025",

      role: "Research Assistant",

      company: "Otto von Guericke University Magdeburg",

      summary:

        "Academic research at the intersection of data science, machine learning, and software engineering.",

      focus: ["Research", "Data Science", "Machine Learning", "Software Engineering"],

    },

    {

      period: "2018 — 2019",
  
      role: "Data Scientist",
  
      company: "Accenture",
  
      summary:
  
        "Worked on analytics, experimentation, funnel optimization, dashboards, and data-driven product improvement.",
  
      focus: ["Analytics", "Experimentation", "Python", "Data Science"],
  
    },
  
    {
  
      period: "2017 — 2018",
  
      role: "Associate Software Engineer",
  
      company: "Accenture",
  
      summary:
  
        "Built and improved software and data workflows with an emphasis on reliability, performance, and delivery.",
  
      focus: ["Software Engineering", "Data Pipelines", "CI/CD"],
  
    },
  
    {
  
      period: "2016",
  
      role: "Data Analyst Intern",
  
      company: "Tata Technologies",
  
      summary:
  
        "Supported exploratory analysis, KPI reporting, and performance-focused data work.",
  
      focus: ["EDA", "Analytics", "Dashboards"],
  
    },
  
  ];
