export type ToolGroup = {

    category: string;
  
    tools: string[];
  
  };
  
  export const toolkit: ToolGroup[] = [
  
    {
  
      category: "Machine Learning",
  
      tools: [
  
        "Python",
  
        "PyTorch",
  
        "scikit-learn",
  
        "TensorFlow",
  
        "XGBoost",
  
        "pandas",
  
        "NumPy",
  
      ],
  
    },
  
    {
  
      category: "Generative AI",
  
      tools: [
  
        "RAG",
  
        "LLMs",
  
        "Embeddings",
  
        "Vector Search",
  
        "LangChain",
  
        "Prompt Engineering",
  
        "LoRA / QLoRA",
  
      ],
  
    },
  
    {
  
      category: "Computer Vision",
  
      tools: [
  
        "OpenCV",
  
        "YOLO",
  
        "DINOv2",
  
        "SAM",
  
        "Detection",
  
        "Segmentation",
  
        "Anomaly Detection",
  
      ],
  
    },
  
    {
  
      category: "Data Engineering",
  
      tools: [
  
        "SQL",
  
        "Airflow",
  
        "Spark",
  
        "dbt",
  
        "BigQuery",
  
        "Athena",
  
        "Snowflake",
  
      ],
  
    },
  
    {
  
      category: "ML Engineering",
  
      tools: [
  
        "FastAPI",
  
        "Docker",
  
        "Git",
  
        "CI/CD",
  
        "Kubernetes",
  
        "Model APIs",
  
      ],
  
    },
  
    {
  
      category: "Cloud & Analytics",
  
      tools: [
  
        "AWS",
  
        "GCP",
  
        "Azure",
  
        "Looker Studio",
  
        "Power BI",
  
        "Tableau",
  
        "GA4",
  
      ],
  
    },
  
  ];