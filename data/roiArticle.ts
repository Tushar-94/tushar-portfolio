// Supplied aggregate findings only. Historical ROI and later calibration are
// separate evaluation stages; illustrative scores never represent observations.
export const roiCalibration = {
  goodCount: 12, defectCount: 12, auroc: 0.784722,
  lower: 0.583333, upper: 0.944444, bootstrapRepeats: 10000,
  good: { lower: 0.222846, upper: 0.357582, mean: 0.286044 },
  defect: { lower: 0.273155, upper: 0.415787, mean: 0.326223 },
  overlap: { lower: 0.273155, upper: 0.357582 },
};

export const roiThresholds = [
  { name: "Youden", threshold: "0.315057", tp: 9, fp: 3, tn: 9, fn: 3, recall: 75.0, fpr: 25.0,
    basis: "Good + defect calibration labels",
    explanation: "Detects more defective calibration examples, with more false alarms. Maximizes J = Recall − FPR; ties prefer higher defect recall, then a lower threshold." },
  { name: "P95", threshold: "0.33939625", tp: 3, fp: 1, tn: 11, fn: 9, recall: 25.0, fpr: 8.3,
    basis: "95th percentile of good calibration scores",
    explanation: "The good-only cutoff flags fewer acceptable components in this sample, but misses most defects. Its percentile label does not guarantee a future false-positive rate." },
  { name: "P99", threshold: "0.35394485", tp: 2, fp: 1, tn: 11, fn: 10, recall: 16.7, fpr: 8.3,
    basis: "99th percentile of good calibration scores",
    explanation: "A higher good-only cutoff misses another defective calibration example without reducing the observed false-positive count. It is sensitive to the highest good scores." },
];

export const illustrativeRoiScores = [
  { label: "Good A", score: 0.22, defective: false },
  { label: "Good B", score: 0.27, defective: false },
  { label: "Defect A", score: 0.34, defective: true },
  { label: "Defect B", score: 0.41, defective: true },
];

export const roiSections = [
  { id: "visual-context", label: "The inspection problem", nav: "The signal", heading: "The scene was part of the signal.", paragraphs: [
    "I was working with a reference-based anomaly detector built on pretrained DINOv2 representations. Instead of learning a conventional classifier for named defect categories, the workflow compared incoming component images with a small collection of confirmed-good references. The question was whether an image departed from normal appearance—not which specific defect it contained.",
    "That comparison depends on what the representation sees. An inspection image contains a component, but also a work surface, fixtures, shadows, reflections, and incidental edges. Positioning changes can move all of those relationships. A visual difference can be real without being relevant to the inspection task.",
    "Consider a normal casting photographed against an unfamiliar background and a defective casting against a familiar one. In principle, background differences could raise the normal component’s score while familiar context could make the defective one look less unusual. This is a failure mode to investigate, not a claim about two particular experiment images.",
    "DINOv2 supplies pretrained visual features. Patch embeddings describe local image regions; reference matching asks how far those representations depart from confirmed-good features. An anomaly score summarizes deviation, and a threshold turns that score into a binary inspection decision. Each step answers a different question.",
  ] },
  { id: "roi-hypothesis", label: "The masking hypothesis", nav: "The ROI", heading: "Give the inspection a boundary.", paragraphs: [
    "ROI masking makes the intended inspection region explicit. A binary mask assigns one to locations that should contribute and zero outside them. The engineering hypothesis is that excluding irrelevant regions will make anomaly scores more responsive to the component itself.",
    "But ‘apply a mask’ is not one operation. There are different places to restrict the signal, with different consequences. The approved information does not establish which exact masking mechanism the project used; the approaches below are conceptual alternatives.",
    "An earlier ROI evaluation reported AUROC increasing from approximately 0.64 to 0.81—about +0.17. That suggested better separation in that historical evaluation. The available records do not establish a fully controlled masking-only experiment, so I cannot attribute the entire change to masking alone.",
    "AUROC measures how well scores rank defective examples above good ones across possible thresholds. Around 0.50 represents chance-level ranking; 1.00 represents perfect ranking. A stronger ranking result was encouraging. It did not tell me whether the configured inspection cutoff was useful.",
  ] },
  { id: "threshold-failure", label: "The unexpected result", nav: "The contradiction", heading: "A better ranking. No inspection flags.", paragraphs: [
    "The earlier inspection run used a configured threshold of 0.72. It flagged zero of the 50 evaluated images. The ranking metric suggested progress, yet the decision rule produced no positive flags. Without looking at the score scale, it would have been easy to mistake an improved AUROC for an improved inspection system.",
    "There is no mathematical contradiction. Defective examples can score above good ones while every score remains below the cutoff. Ranking asks about relative order. A threshold asks which side of one particular line each score occupies. Moving the line changes decisions without changing the order.",
    "The example below deliberately uses four invented teaching scores. It is not a reconstruction of the historical run or the later calibration data. Lower the threshold and watch the flags change while the score positions stay fixed. The visualization does not recalculate AUROC.",
    "This changed the investigation. I needed to understand score distributions and decision trade-offs separately from representation quality. A useful inspection policy needs evidence about missed defects and false alarms, not only a ranking statistic.",
  ] },
  { id: "calibration", label: "A later, separate experiment", nav: "The overlap", heading: "Calibration made the overlap visible.", paragraphs: [
    "A later workflow introduced a frozen calibration split containing 12 confirmed-good and 12 confirmed-defective examples. An independent holdout was reserved for later evaluation. The results discussed here come from calibration; they do not report an evaluation of that holdout.",
    "Calibration AUROC was 0.784722. This belongs to a different experimental stage from the earlier approximate 0.81 ROI result. Reading those numbers as a controlled performance decline would erase changes in evaluation context that the comparison does not account for.",
    "The mean defect score was higher than the mean good score, but their observed ranges overlapped. A high-scoring good example could sit above a lower-scoring defective one. No single high-score cutoff could perfectly separate these calibration observations.",
    "Moving a threshold can exchange one kind of error for another. It cannot repair the relative ordering of examples whose scores are already interleaved. The range summary exposes that limitation without pretending to know the shape of the distributions or inventing individual observations.",
  ] },
  { id: "operating-points", label: "Threshold calibration", nav: "The trade-offs", heading: "Three cutoffs. Different mistakes.", paragraphs: [
    "I examined three calibration-derived candidates. Youden uses both good and defect labels to maximize recall minus false-positive rate. The good-only P95 and P99 candidates use upper percentiles of the acceptable-component scores. They encode different ways to place a decision boundary; they do not change the representation.",
    "On calibration, Youden found more defects and flagged more good components. P95 and P99 reduced false alarms in this sample, but missed more defects. P99 raised the cutoff further without improving the observed false-positive count. A more conservative threshold was not automatically a more useful inspection rule.",
    "Only 12 good calibration examples informed the upper-tail percentiles. P95 and P99 are therefore sensitive to the highest observed good scores. Their names do not promise corresponding future false-positive rates. Choosing a policy requires inspection requirements and the costs of false alarms and missed defects; this comparison does not select a universal winner.",
    "Leakage was another boundary to make explicit. The historical 0.33 reference had been influenced by the full golden dataset, including images later assigned to holdout. A cutoff informed by those images cannot be fairly assessed on that same holdout as though it were unseen. It is a historical reference, not a leakage-safe selection baseline. The independent holdout is not reported as evaluated here.",
  ] },
  { id: "uncertainty", label: "Statistical uncertainty", nav: "The uncertainty", heading: "One estimate. A wide interval.", paragraphs: [
    "The calibration estimate also needed an uncertainty statement. With 12 examples in each class, individual observations can materially affect the measured ranking. Reporting the point estimate alone would suggest more precision than this sample supports.",
    "The workflow used stratified bootstrap resampling: sample 12 good scores with replacement, independently sample 12 defect scores with replacement, then recalculate AUROC. Repeating that process 10,000 times preserves the class counts while exploring variation under resampling. The 2.5th and 97.5th percentiles gave the reported 95% bootstrap interval.",
    "The interval was 0.583333–0.944444. Its width matters more than the apparent precision of a six-decimal point estimate. The calibration sample provides limited precision for estimating broader anomaly-ranking performance.",
    "Bootstrap resampling reuses the observations available. It cannot fix dataset bias, leakage, unrepresentative acquisition conditions, or distribution shift. A technically correct interval is still conditional on the data and workflow behind it; it is not proof of production reliability.",
  ] },
  { id: "next-investigations", label: "Planned investigations", nav: "What comes next", heading: "Improve the scores before moving the line again.", paragraphs: [
    "Once score overlap is visible, repeatedly adjusting the cutoff has a clear limit. The next question is how to improve the representations and comparisons that produced those scores. I would start with the simplest, most inspectable changes before increasing model capacity.",
    "The investigations below remain planned. Increasing encoder capacity would come only after the simpler changes have been evaluated. None of these proposed experiments is presented as a completed improvement.",
    "A proposed development gate was calibration AUROC ≥ 0.90. That was a target, not an achieved result. A fair next comparison would record the reference selection, ROI definition, model fingerprint, split, and scoring policy, then freeze threshold candidates before an independent holdout evaluation. Better bookkeeping cannot guarantee a better model, but it makes a change interpretable.",
  ] },
  { id: "inspection-lessons", label: "What the investigation changed", nav: "The lessons", heading: "An inspection decision needs its own evaluation.", paragraphs: [
    "The historical ROI result was a useful signal, not the end of validation. The zero-flag observation forced the next question: was the detector ranking examples usefully while its decision rule operated on the wrong part of the score scale? Calibration then exposed overlap that a threshold alone could not resolve.",
    "The practical lesson is to evaluate the connections between representation, scoring, and decisions. Better ranking can support a better inspection policy, but it does not establish one. Reliable inspection requires understanding where the scores come from, what errors the cutoff trades, and how much the available evidence can actually support.",
  ] },
];

export const roiArticle = {
  slug: "roi-masking-in-industrial-anomaly-detection",
  title: "Why My Anomaly Detector Improved but Still Missed Every Defect",
  subtitle: "How ROI masking improved anomaly ranking—and exposed a deeper problem with threshold calibration.",
  category: "Computer Vision",
  date: "August 2026", // Preserve the existing article's publication date.
  readingTime: "8–10 min read",
  summary: "An investigation into how ROI masking improved anomaly ranking, why the inspection threshold still failed, and what calibration revealed about model reliability.",
  seoDescription: "How ROI masking improved anomaly ranking—and exposed a deeper problem with threshold calibration. The zero-flag result belongs to the historical ROI evaluation.",
  tags: ["Computer Vision", "DINOv2", "Anomaly Detection", "ROI Masking", "Model Evaluation", "Threshold Calibration", "Industrial AI"],
  projectUrl: "/projects/industrial-vision-anomaly-detection",
  sections: roiSections,
};
