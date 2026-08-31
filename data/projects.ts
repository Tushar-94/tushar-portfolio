export type Project = {

    slug: string;
  
    title: string;
  
    description: string;
  
    technologies: string[];
  
    category: string;
  
  };
  
  export const projects: Project[] = [
  
    {
  
      slug: "industrial-knowledge-copilot",
  
      title: "Industrial Knowledge Copilot",
  
      description:
  
        "A production-oriented retrieval-augmented generation system for answering questions across industrial documentation with measurable retrieval quality.",
  
      technologies: [
  
        "Python",
  
        "RAG",
  
        "Embeddings",
  
        "Vector Search",
  
        "Evaluation",
  
      ],
  
      category: "Generative AI",
  
    },
  
    {
  
      slug: "industrial-vision-anomaly-detection",
  
      title: "Industrial Vision Anomaly Detection",
  
      description:
  
        "Few-shot visual inspection workflows using DINOv2, anomaly scoring, ROI masking, and reproducible threshold evaluation.",
  
      technologies: [
  
        "DINOv2",
  
        "PyTorch",
  
        "OpenCV",
  
        "Anomaly Detection",
  
        "Computer Vision",
  
      ],
  
      category: "Computer Vision",
  
    },
  
    {
  
      slug: "manufacturing-intelligence",
  
      title: "Manufacturing Intelligence",
  
      description:
  
        "Explainable machine-learning workflows for identifying process drivers, defect patterns, and opportunities for manufacturing optimization.",
  
      technologies: [
  
        "XGBoost",
  
        "SHAP",
  
        "Python",
  
        "Data Engineering",
  
        "Explainable AI",
  
      ],
  
      category: "Machine Learning",
  
    },
  
  ];