// Public showcase content is limited to the information supplied for this page.
// All geometry used by its SVG demonstrations is authored for the portfolio.
export const defectSegmentation = {
  slug: "industrial-defect-detection-segmentation",
  title: "Industrial Defect Detection & Segmentation",
  subtitle: "Deep Learning-Based Visual Quality Inspection Using YOLOv8",
  heroSubtitle: "Pixel-Level Manufacturing Defect Inspection with YOLOv8",
  category: "Computer Vision / Industrial AI",
  description: "An industrial computer vision system for identifying and segmenting manufacturing defects using YOLOv8. The project combines polygon annotation refinement, targeted augmentation, GPU-accelerated training, and class-specific evaluation to investigate segmentation performance and precision-recall trade-offs.",
  technologies: ["Python", "PyTorch", "Ultralytics YOLOv8", "OpenCV", "NumPy", "NVIDIA CUDA", "Docker", "Git"],
  heroTechnologies: ["YOLOv8", "PyTorch", "OpenCV", "CUDA", "Instance Segmentation"],
};

export type DefectClass = "short-shot" | "sink-mark";

export const defectClasses = [
  { id: "short-shot" as const, name: "Short Shot", color: "#ad5636", description: "Incomplete material filling that produces missing or partially formed component regions.", visualNote: "An irregular edge region illustrates incomplete filling. Its mask follows the synthetic boundary rather than filling the whole bounding box." },
  { id: "sink-mark" as const, name: "Sink Mark", color: "#337989", description: "Surface depressions caused by uneven material shrinkage or cooling.", visualNote: "A recessed surface region illustrates a sink mark. The synthetic mask localizes the depression inside its enclosing box." },
];

export const defectArchitecture = [
  { title: "Industrial Images", detail: "Visual inspection inputs" },
  { title: "Polygon Annotation Refinement", detail: "Consistent defect boundaries" },
  { title: "Dataset Preparation", detail: "Train / validation / test" },
  { title: "Targeted Augmentation", detail: "Training split only" },
  { title: "YOLOv8n-seg Training", detail: "NVIDIA A100 · CUDA" },
  { title: "Model Evaluation", detail: "Class-specific validation" },
  { title: "Segmentation Inference", detail: "Defect boxes & masks" },
  { title: "Visual Inspection", detail: "Localize affected regions" },
];

export const annotationWorkflow = [
  { title: "Polygon Annotation Review" },
  { title: "Annotation Refinement" },
  { title: "Class Distribution Analysis" },
  { title: "Training-Only Augmentation" },
  { title: "Model Retraining" },
];

export const segmentationPerformance = [
  { name: "Overall", metrics: [
    { name: "Precision", before: 76.0, after: 81.5 },
    { name: "Recall", before: 75.3, after: 71.0 },
    { name: "mAP50", before: 78.6, after: 77.7 },
    { name: "mAP50–95", before: 40.0, after: 40.6 },
  ] },
  { name: "Short Shot", metrics: [
    { name: "Precision", before: 60.9, after: 66.3 },
    { name: "Recall", before: 59.9, after: 52.6 },
    { name: "mAP50", before: 62.0, after: 58.8 },
    { name: "mAP50–95", before: 33.7, after: 31.3 },
  ] },
  { name: "Sink Mark", metrics: [
    { name: "Precision", before: 91.0, after: 96.8 },
    { name: "Recall", before: 90.8, after: 89.5 },
    { name: "mAP50", before: 95.3, after: 96.6 },
    { name: "mAP50–95", before: 46.2, after: 49.8 },
  ] },
];

export const segmentationInsights = [
  { title: "Annotation Quality Matters", description: "Accurate polygon boundaries are essential for reliable instance segmentation." },
  { title: "Augmentation Is Not Automatically Better", description: "Targeted augmentation improved precision, but introduced recall and mAP trade-offs." },
  { title: "Class-Level Evaluation Is Essential", description: "Aggregate metrics can conceal weaker performance on challenging defect classes." },
];

export const segmentationTechnologyGroups = [
  { title: "Computer Vision", items: ["YOLOv8", "OpenCV"] },
  { title: "Deep Learning", items: ["PyTorch", "CUDA"] },
  { title: "Data Processing", items: ["Python", "NumPy"] },
  { title: "Training Infrastructure", items: ["NVIDIA A100", "Thunder Compute"] },
  { title: "Engineering", items: ["Docker", "Git", "Ultralytics"] },
];
