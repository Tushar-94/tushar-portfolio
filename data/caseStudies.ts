import type { CaseStudy } from "@/types/case-study";

export const caseStudies: CaseStudy[] = [

  {

    slug: "industrial-knowledge-copilot",

    category: "Generative AI",

    title: "Industrial Knowledge Copilot",

    summary:

      "A production-oriented retrieval system for answering questions across industrial documentation with measurable retrieval quality and evidence-backed responses.",

    technologies: [

      "Python",

      "RAG",

      "Embeddings",

      "Vector Search",

      "Evaluation",

    ],

    architecture: [

      "Industrial documents",

      "Parsing",

      "Chunking",

      "Embeddings",

      "Vector retrieval",

      "Evaluation",

      "Grounded answer",

    ],

    sections: [

      {

        number: "01",

        title: "The problem",

        content:

          "Industrial engineers frequently need answers buried inside specifications, manuals, maintenance documents, and other technical material. Traditional search can retrieve documents, but it does not necessarily surface the precise evidence needed to answer a technical question reliably.",

      },

      {

        number: "02",

        title: "Project objective",

        content:

          "The goal is to build a retrieval-augmented AI system that can locate relevant technical evidence, provide grounded answers, and make retrieval quality measurable rather than relying on demonstrations that merely appear correct.",

      },

      {

        number: "03",

        title: "Engineering approach",

        content:

          "The system separates document processing, chunking, embedding, retrieval, evaluation, and answer generation into distinct stages. This makes individual components measurable and allows retrieval failures to be diagnosed independently from language model behavior.",

      },

      {

        number: "04",

        title: "Evaluation",

        content:

          "Retrieval is evaluated using a curated set of questions with known relevant evidence. Instead of judging the system only by whether the final answer sounds convincing, the evaluation checks whether the correct source material appears at the right rank in the retrieved results.",

      },

      {

        number: "05",

        title: "Key engineering decision",

        content:

          "Dense retrieval was introduced as a measurable baseline rather than treated as an unquestioned component. Each query can be inspected for whether the expected evidence is retrieved and at what rank, creating a foundation for comparing chunking, embedding, reranking, and hybrid-search strategies.",

      },

      {

        number: "06",

        title: "Current status",

        content:

          "The project currently includes a working dense-retrieval evaluation workflow and is being expanded toward a complete production-oriented knowledge assistant with stronger retrieval, grounded generation, evaluation, and deployment.",

      },

      {

        number: "07",

        title: "What this project demonstrates",

        content:

          "The project is designed to demonstrate more than basic RAG implementation. It focuses on retrieval quality, system decomposition, reproducible evaluation, engineering trade-offs, and the path from an AI prototype toward a dependable product.",

      },

    ],

  },

  {

    slug: "industrial-vision-anomaly-detection",

    category: "Computer Vision",

    title: "Industrial Vision Anomaly Detection",

    summary:

      "A few-shot industrial visual inspection workflow using DINOv2 anomaly scoring, ROI masking, threshold calibration, and reproducible evaluation.",

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

        title: "The problem",

        content:

          "Industrial visual inspection often has many examples of acceptable parts but relatively few labeled defect examples. This makes conventional fully supervised defect detection difficult when the dataset is small, imbalanced, or still evolving.",

      },

      {

        number: "02",

        title: "Project objective",

        content:

          "The objective is to build and evaluate a few-shot anomaly detection workflow that learns a representation of acceptable visual appearance and assigns anomaly scores to new inspection images without requiring a large labeled defect dataset.",

      },

      {

        number: "03",

        title: "Engineering approach",

        content:

          "The workflow uses DINOv2-based visual representations together with a small reference set of good images. New images are compared against this learned reference representation to produce anomaly scores that can be evaluated against known good and defective samples.",

      },

      {

        number: "04",

        title: "ROI masking",

        content:

          "Region-of-interest masking is evaluated as a controlled preprocessing step rather than assumed to improve the model. The goal is to determine whether excluding irrelevant background regions reduces noise in anomaly scores and improves separation between acceptable and defective samples.",

      },

      {

        number: "05",

        title: "Threshold calibration",

        content:

          "A fixed anomaly threshold is only useful when it is supported by measured score distributions. Good and defective samples are therefore scored individually so candidate thresholds can be compared against observed overlap, false positives, and false negatives.",

      },

      {

        number: "06",

        title: "Evaluation",

        content:

          "Evaluation focuses on reproducibility rather than visual intuition. Per-image anomaly scores, reference-set configuration, masking state, model version, thresholds, and dataset assumptions are recorded so experiments can be compared consistently.",

      },

      {

        number: "07",

        title: "Key engineering decision",

        content:

          "A few-shot anomaly detection approach was preferred over immediately relying on supervised object detection because the available labeling conditions favor learning from representative good examples while preserving the option to introduce supervised detection later when sufficient labeled defect data exists.",

      },

      {

        number: "08",

        title: "What this project demonstrates",

        content:

          "The project demonstrates practical computer vision engineering beyond model inference: dataset reasoning, experiment design, preprocessing validation, threshold calibration, reproducibility, and making model decisions under limited industrial data.",

      },

    ],

  },

  {

    slug: "manufacturing-intelligence",

    category: "Machine Learning",

    title: "Manufacturing Intelligence",

    summary:

      "An explainable machine-learning workflow for identifying process drivers, defect patterns, anomaly confidence, and opportunities for manufacturing optimization.",

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

        title: "The problem",

        content:

          "Manufacturing teams often collect large amounts of process and defect data but still struggle to identify which parameters are driving quality issues. The challenge is not only predicting defects, but translating heterogeneous plant data into understandable and actionable evidence.",

      },

      {

        number: "02",

        title: "Project objective",

        content:

          "The objective is to build an analytics workflow that can ingest process logs and defect reports, identify likely drivers of quality variation, estimate anomaly confidence, explain model predictions, and support parameter-level recommendations.",

      },

      {

        number: "03",

        title: "Data ingestion",

        content:

          "The ingestion layer is designed around realistic CSV and Excel inputs with inconsistent headers, mixed naming conventions, missing values, duplicates, and varying file structures. Canonical field mapping and schema validation are used to create a reliable representation before modeling begins.",

      },

      {

        number: "04",

        title: "Modeling approach",

        content:

          "Tree-based models such as XGBoost are used as practical baselines for classification and regression because they perform well on structured manufacturing data, support nonlinear interactions, and integrate effectively with explainability tooling.",

      },

      {

        number: "05",

        title: "Explainability",

        content:

          "TreeSHAP is used to explain how individual process parameters contribute to model predictions. This makes the output more useful for engineers because the system can show not only that a process run is risky, but which variables are pushing the prediction in that direction.",

      },

      {

        number: "06",

        title: "Anomaly confidence",

        content:

          "Prediction outputs are complemented with anomaly-oriented signals so unusual process conditions can be distinguished from routine variation. This helps separate normal operating changes from combinations of parameters that may warrant investigation.",

      },

      {

        number: "07",

        title: "Engineering decision",

        content:

          "The system is intentionally built around structured machine learning and explainability before introducing an LLM narrative layer. This keeps the first stage measurable and auditable while allowing language models to be added later for human-readable summaries rather than replacing the core analytical logic.",

      },

      {

        number: "08",

        title: "What this project demonstrates",

        content:

          "The project demonstrates end-to-end applied machine learning across messy industrial data, schema normalization, feature preparation, predictive modeling, explainability, anomaly reasoning, and translating model output into operationally useful insights.",

      },

    ],

  },

];