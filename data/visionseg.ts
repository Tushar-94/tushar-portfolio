export const visionseg = {
  slug: "visionseg",
  title: "VisionSeg",
  subtitle: "Semantic Segmentation & Production ML Engineering",
  tagline: "Configurable Deep Learning for Pixel-Level Visual Understanding",
  category: "Computer Vision / Deep Learning / MLOps",
  description: "A modular semantic segmentation framework combining DeepLabV3, configurable preprocessing, systematic model evaluation, and deployment-oriented inference design.",
  summary: "VisionSeg is an independent computer vision engineering framework designed to make semantic segmentation configurable, reproducible, testable, and deployment-oriented. It centers on DeepLabV3 with a ResNet-50 backbone and a modular pipeline for preprocessing, training, evaluation, error analysis, and inference.",
  technologies: ["PyTorch", "DeepLabV3", "ResNet-50", "Computer Vision", "MLOps"],
};

export const semanticClasses = [
  { id: "background", name: "Background", abbreviation: "BG", color: "#d8ddd8", description: "Pixels outside the illustrated target part classes." },
  { id: "front-door", name: "Front Door", abbreviation: "FD", color: "#63899b", description: "The front door region in the synthetic vehicle side view." },
  { id: "rear-door", name: "Rear Door", abbreviation: "RD", color: "#a18a74", description: "The rear door region, adjacent to a visually similar front panel." },
  { id: "front-fender", name: "Front Fender", abbreviation: "FF", color: "#81976f", description: "The body region around the front wheel opening." },
  { id: "rear-fender", name: "Rear Fender", abbreviation: "RF", color: "#ad765f", description: "The body region around the rear wheel opening." },
  { id: "door-handle", name: "Door Handle", abbreviation: "DH", color: "#c8aa63", description: "Small handle regions that illustrate the challenge of fine detail." },
] as const;

export type SemanticClass = typeof semanticClasses[number]["id"];
export type SegmentationMode = "original" | "ground-truth" | "prediction" | "overlay";
export const errorWorkflow = [
  { title: "Validation Predictions" }, { title: "Per-Class Evaluation" },
  { title: "Confusion Analysis" }, { title: "Difficult Example Review" }, { title: "Improvement Planning" },
];

// Authored, row-normalized illustrative percentages. These values are not
// measurements from a dataset, model, historical run, or public benchmark.
export const illustrativeConfusion = [
  [90, 2, 2, 2, 2, 2],
  [3, 78, 12, 3, 2, 2],
  [3, 14, 75, 2, 4, 2],
  [5, 6, 2, 80, 5, 2],
  [4, 2, 6, 7, 79, 2],
  [18, 14, 11, 3, 4, 50],
];

export const metricDefinitions = [
  { name: "mIoU", description: "Mean intersection over union across classes." },
  { name: "Foreground mIoU", description: "Mean IoU excluding background." },
  { name: "Per-Class IoU", description: "Segmentation quality for individual categories." },
];

export const errorInvestigations = [
  { title: "Small objects", description: "Inspect handles and other fine details that can blend into surrounding regions." },
  { title: "Similar-looking classes", description: "Review front/rear panel confusion rather than relying on aggregate scores." },
  { title: "Boundary errors", description: "Inspect transitions between adjacent classes and ambiguous edges." },
];

export const visionDecisions = [
  { title: "Aspect-Ratio Preservation", description: "Design preprocessing to resize and pad images without distorting their original geometry." },
  { title: "Mask-Safe Preprocessing", description: "Use nearest-neighbor interpolation to preserve discrete segmentation class IDs." },
  { title: "Foreground-Aware Evaluation", description: "Measure foreground segmentation separately to avoid misleading background-dominated metrics." },
  { title: "Reproducible Experiments", description: "Use configuration-driven training and consistent evaluation procedures." },
];

export const visionTechnologyGroups = [
  { title: "Deep Learning", items: ["PyTorch", "Torchvision", "DeepLabV3", "ResNet-50"], planned: false },
  { title: "Data Processing", items: ["NumPy", "Pillow"], planned: false },
  { title: "Evaluation", items: ["mIoU", "Per-Class IoU", "Confusion Matrix"], planned: false },
  { title: "Visualization", items: ["Matplotlib"], planned: false },
  { title: "Engineering", items: ["Python", "YAML", "Pytest"], planned: false },
  { title: "Planned Integrations", items: ["FastAPI", "Docker", "ONNX", "GitHub Actions"], planned: true },
];
