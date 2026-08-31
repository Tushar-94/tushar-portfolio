export type ImpactMetric = {

    value: string;
  
    label: string;
  
    description: string;
  
  };
  
  export const impactMetrics: ImpactMetric[] = [
  
    {
  
      value: "+30%",
  
      label: "Structured extraction accuracy",
  
      description:
  
        "Improved structured output quality through prompt engineering, validation, and vocabulary mapping.",
  
    },
  
    {
  
      value: "-35%",
  
      label: "Inference latency",
  
      description:
  
        "Reduced serving latency across production-oriented ML API workflows.",
  
    },
  
    {
  
      value: "-40%",
  
      label: "Deployment time",
  
      description:
  
        "Streamlined model packaging and deployment using FastAPI and Docker.",
  
    },
  
    {
  
      value: "+25%",
  
      label: "Computer vision F1",
  
      description:
  
        "Improved industrial defect detection performance through model and data pipeline improvements.",
  
    },
  
    {
  
      value: "TB-scale",
  
      label: "Data processing",
  
      description:
  
        "Worked with large-scale analytical workloads using cloud data platforms and orchestration.",
  
    },
  
  ];