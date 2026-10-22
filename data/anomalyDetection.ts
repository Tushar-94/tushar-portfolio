// Showcase content and measurements are limited to the supplied project brief.
// Demo scores and SVG geometry are illustrative and separate from calibration.
export const anomalyDetection = {
  slug: "industrial-vision-anomaly-detection",
  title: "Industrial Visual Anomaly Detection",
  subtitle: "Few-Shot Computer Vision for Manufacturing Quality Inspection",
  category: "Computer Vision / Industrial AI / Anomaly Detection",
  description: "Developed and evaluated a reference-based industrial inspection pipeline using DINOv2 to identify visual anomalies in manufactured components. The workflow combines pretrained visual representations, ROI-aware processing, anomaly scoring, and calibration-driven evaluation.",
  technologies: ["Python", "PyTorch", "DINOv2", "Anomalib", "OpenCV", "NumPy", "Pytest", "GitHub Actions"],
  heroTechnologies: ["DINOv2", "PyTorch", "Anomalib", "OpenCV", "Computer Vision"],
};

export const anomalyArchitecture = [
  { title: "Industrial Image", detail: "Incoming component view" },
  { title: "ROI Processing", detail: "Focus on relevant regions" },
  { title: "DINOv2 Encoder", detail: "Pretrained visual representations" },
  { title: "Patch Embeddings", detail: "Local visual features" },
  { title: "Reference Feature Matching", detail: "Confirmed-good comparison" },
  { title: "Anomaly Scoring", detail: "Deviation from normal appearance" },
  { title: "Threshold Decision", detail: "Score to inspection decision" },
  { title: "Inspection Result", detail: "Review visual deviations" },
];

export const anomalyCalibration = { auroc: 0.785, lower: 0.583, upper: 0.944 };
export const historicalROI = { before: 0.64, after: 0.81 };
export const calibrationScoreRanges = [
  { label: "Confirmed good", mean: 0.2860, lower: 0.2228, upper: 0.3576, shade: "bg-foreground/25" },
  { label: "Defect observations", mean: 0.3262, lower: 0.2732, upper: 0.4158, shade: "bg-foreground/60" },
];

export const thresholdStrategies = [
  { label: "Defect-aware Youden", recall: 75.0, falsePositiveRate: 25.0, historical: false, explanation: "Higher calibration defect recall comes with more false alarms: 75.0% recall at a 25.0% false-positive rate. This candidate uses defect labels from calibration." },
  { label: "Good-only P95", recall: 25.0, falsePositiveRate: 8.3, historical: false, explanation: "A candidate based on confirmed-good calibration scores reduces false alarms, but detects fewer defects: 25.0% recall at an 8.3% false-positive rate." },
  { label: "Good-only P99", recall: 16.7, falsePositiveRate: 8.3, historical: false, explanation: "The higher good-only percentile misses more defects in calibration: 16.7% recall, with the same reported 8.3% false-positive rate as P95." },
  { label: "Historical 0.33 reference", recall: 41.7, falsePositiveRate: 8.3, historical: true, explanation: "The historical 0.33 reference yields 41.7% recall at an 8.3% false-positive rate on calibration data. It is not a leakage-safe model-selection baseline." },
];

export const anomalyDecisions = [
  { title: "Reference-Based Detection", description: "Use pretrained DINOv2 representations and confirmed-good reference features instead of a conventional defect classifier." },
  { title: "Leakage-Safe Calibration", description: "Separate calibration and holdout data. Freeze threshold candidates before holdout evaluation to prevent evaluation leakage." },
  { title: "Reproducible ML Engineering", description: "Record model fingerprints, runtime metadata, split definitions, evaluation metrics, and automated test results." },
];

export const anomalyTechnologyGroups = [
  { title: "Vision Models", items: ["DINOv2", "Anomalib", "PyTorch"], planned: false },
  { title: "Image Processing", items: ["OpenCV", "NumPy"], planned: false },
  { title: "Evaluation", items: ["AUROC", "Bootstrap Confidence Intervals", "Threshold Calibration"], planned: false },
  { title: "Engineering", items: ["Python", "Pytest", "Ruff", "Black", "GitHub Actions"], planned: false },
  { title: "Integration Targets", items: ["FastAPI", "Docker", "NVIDIA Jetson"], planned: true },
];

// Pedagogical 0–1 demo scale. This value is not a measured DINOv2 score
// and is not derived from the calibration observations above.
export const illustrativeAnomalyScore = 0.62;
