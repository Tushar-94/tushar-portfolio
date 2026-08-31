export type Article = {

    slug: string;
  
    title: string;
  
    summary: string;
  
    category: string;
  
    date: string;
  
    readingTime: string;
  
  };
  
  export const articles: Article[] = [
  
    {
  
      slug: "evaluating-dense-retrieval-beyond-demo-queries",
  
      title: "Evaluating Dense Retrieval Beyond Demo Queries",
  
      summary:
  
        "Why a RAG system that works in a demo can still fail when retrieval quality is measured systematically.",
  
      category: "RAG & Evaluation",
  
      date: "August 2026",
  
      readingTime: "7 min read",
  
    },
  
    {
  
      slug: "roi-masking-in-industrial-anomaly-detection",
  
      title: "ROI Masking in Industrial Anomaly Detection",
  
      summary:
  
        "What region-of-interest masking changes, how to evaluate it, and why threshold calibration matters.",
  
      category: "Computer Vision",
  
      date: "August 2026",
  
      readingTime: "6 min read",
  
    },
  
    {
  
      slug: "building-production-oriented-rag-systems",
  
      title: "Building Production-Oriented RAG Systems",
  
      summary:
  
        "A practical look at retrieval, evaluation, architecture decisions, and the gap between prototypes and reliable systems.",
  
      category: "Generative AI",
  
      date: "Coming soon",
  
      readingTime: "8 min read",
  
    },
  
  ];