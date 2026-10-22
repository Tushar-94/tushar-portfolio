export const copilot = {
  title: "Industrial Knowledge Copilot",
  subtitle: "Enterprise RAG & Agentic AI for Industrial Knowledge Intelligence",
  category: "Generative AI / RAG Engineering",
  summary: "An AI system designed to transform complex industrial documentation into evidence-grounded technical assistance, with an implemented, evaluated retrieval engine and a target architecture for grounded generation and agentic workflows.",
  technologies: ["Python", "Sentence Transformers", "Qdrant", "BM25", "RAG", "LLMs", "FastAPI", "Docker"],
};

export const principles = [
  { title: "Evidence-first retrieval", description: "Select relevant technical evidence before constructing an answer." },
  { title: "Query-aware search", description: "Adapt semantic and lexical retrieval to the question." },
  { title: "Measurable retrieval quality", description: "Evaluate ranking with controlled development benchmarks." },
];

export const capabilities = [
  { title: "Query-Aware Hybrid Retrieval", description: "Semantic search with conditional lexical retrieval.", target: false },
  { title: "Contextual Document Search", description: "Document-title context and structured metadata.", target: false },
  { title: "Evidence-Grounded Generation", description: "LLM answers supported by retrieved technical documentation.", target: true },
  { title: "Agentic Technical Investigation", description: "Tool-assisted industrial troubleshooting workflows.", target: true },
  { title: "Retrieval Evaluation", description: "Hit@K, MRR, controlled experiments, and benchmark integrity.", target: false },
  { title: "Backend and Deployment", description: "FastAPI services and containerized deployment.", target: true },
];

export const experiments = [
  {
    title: "Query-Aware Hybrid Retrieval",
    finding: "Naive hybrid fusion did not outperform dense retrieval.",
    change: "Applied lexical retrieval selectively using query-aware routing and identifier handling.",
  },
  {
    title: "Representation-Aware Retrieval",
    finding: "A procedural retrieval failure revealed missing document titles in embedding input.",
    change: "Added document-title context to improve maintenance-procedure ranking.",
  },
  {
    title: "Consistent Retrieval Constraints",
    finding: "Dense retrieval enforced metadata constraints; BM25 initially searched the full corpus.",
    change: "Introduced shared candidate eligibility across retrieval branches.",
  },
  {
    title: "Evaluation-Driven Iteration",
    finding: "Inspecting held-out failures makes that set part of the development process.",
    change: "Relabel the reused 12-query suite as diagnostic and keep evaluation checkpoints separate.",
  },
];

export const technologyGroups = [
  { title: "AI & Retrieval", items: [
    { name: "Sentence Transformers", target: false }, { name: "Qdrant", target: false },
    { name: "BM25", target: false }, { name: "LLMs", target: true },
  ] },
  { title: "Backend", items: [{ name: "Python", target: false }, { name: "FastAPI", target: true }] },
  { title: "Engineering", items: [
    { name: "Pytest", target: false }, { name: "Docker", target: true }, { name: "CI/CD", target: true },
  ] },
  { title: "Architecture", items: [
    { name: "RAG", target: true }, { name: "Hybrid Retrieval", target: false },
    { name: "Metadata Filtering", target: false }, { name: "Tool Orchestration", target: true },
  ] },
];

// V1 is the published README / Retrieval Experiments V1 checkpoint. V2 comes
// from the local Hybrid Retrieval V2 report, sections 40–41; its reused
// 12-query set is diagnostic, not an independent held-out estimate.
export const retrievalBenchmarks = [
  { label: "Published V1", source: "README · Retrieval Experiments V1", comparison: "Held-out", diagnostic: false, metrics: [
    { name: "Hit@1", development: 0.800, comparison: 0.750 },
    { name: "Hit@3", development: 0.960, comparison: 0.750 },
    { name: "Hit@5", development: 1.000, comparison: 0.833 },
    { name: "MRR", development: 0.883, comparison: 0.771 },
  ] },
  { label: "Local V2", source: "Hybrid Retrieval V2 engineering report · §§40–41", comparison: "Diagnostic", diagnostic: true, metrics: [
    { name: "Hit@1", development: 0.840, comparison: 1.000 },
    { name: "Hit@3", development: 0.920, comparison: 1.000 },
    { name: "Hit@5", development: 1.000, comparison: 1.000 },
    { name: "MRR", development: 0.891, comparison: 1.000 },
  ] },
];

export const investigationSteps = [
  { label: "Question", title: "Identify the information need", description: "Find the documented response to hydraulic-pressure alarm HX-417 on an MX-200. Both identifiers exist in the synthetic corpus." },
  { label: "Retrieval Strategy", title: "Route an identifier-heavy question", description: "Combine dense retrieval and BM25, fuse candidates, and boost exact identifier matches. The V2 implementation applies shared metadata eligibility constraints." },
  { label: "Ranked Evidence", title: "Inspect relevant source sections", description: "Review the alarm reference and its related hydraulic inspection procedure. The cards below use real synthetic documents; their display order is illustrative, not an executed retrieval ranking." },
  { label: "Source Traceability", title: "Trace evidence back to its source", description: "Document IDs, section titles, machine-model metadata, and procedure references connect each evidence card to its synthetic source. LLM answer generation remains planned." },
];

export const syntheticEvidence = [
  { title: "MX-200 Troubleshooting Guide", type: "Troubleshooting guide", section: "HX-417 · Diagnostic Checks", metadata: "MX-200 · HX-417", documentId: "TSG-MX200-001", source: "TSG-MX200-001.md", context: "Lists hydraulic-pressure diagnostic checks and references SOP-MNT-001." },
  { title: "Hydraulic System Inspection", type: "Maintenance procedure", section: "7. Procedure", metadata: "MX-200 / MX-220 / MX-300 · SOP-MNT-001", documentId: "SOP-MNT-001", source: "SOP-MNT-001.md", context: "Documents the synthetic inspection sequence and recording of findings." },
];
