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

export const investigationSteps = [
  { label: "Interpret", title: "Interpret the technical question", description: "Identify the equipment, alarm, and requested maintenance context. Confirm missing equipment details rather than assuming them." },
  { label: "Retrieve", title: "Retrieve relevant documentation", description: "Route the query through dense search and conditional BM25 to find candidate alarm guidance and maintenance procedures." },
  { label: "Constrain", title: "Apply equipment and metadata constraints", description: "Use the same eligibility rules across retrieval branches. Exclude candidates that do not match the equipment context." },
  { label: "Evidence", title: "Present supporting evidence", description: "Surface eligible excerpts before constructing a recommendation. The source labels below are placeholders, not retrieved documents." },
  { label: "Recommend", title: "Generate a grounded recommendation", description: "Target capability: construct LLM context from the selected evidence and attribute the answer to its sources." },
];
