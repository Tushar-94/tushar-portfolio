// Verified against the local Copilot source and Hybrid Retrieval V2 report,
// especially §§44–46 and §§51–55. These describe distinct development stages.
export const architectureDomains = [
  {
    id: "knowledge", number: "A", title: "Knowledge preparation", phase: "Offline preparation",
    description: "Turn a fully synthetic industrial knowledge base into searchable, traceable evidence.",
    decision: "Section-aware Markdown chunks preserve document IDs, heading paths, equipment references, and revisions. The V2 embedding text includes document-title context, rather than relying on a section’s local wording alone.",
    tradeoff: "Representation and metadata quality constrain retrieval quality. A vector store cannot recover context that was lost during preparation.",
    implementation: "Canonical YAML → generated Markdown → chunks; SentenceTransformer embeddings and Qdrant payloads. BM25 indexes chunk text, not embeddings.",
    references: "markdown_chunker.py · models.py · embedder.py · vector_store/indexer.py",
  },
  {
    id: "query", number: "B", title: "Query-aware routing", phase: "Query-time control",
    description: "Choose a retrieval policy from the question’s identifiers and a small, deterministic intent taxonomy.",
    decision: "Alarm codes, procedure IDs, part numbers, or parts-lookup intent select the hybrid route. General semantic questions stay dense. A machine-model reference alone does not force hybrid retrieval.",
    tradeoff: "The rules are inspectable, but their intent taxonomy is deliberately limited. When one unambiguous value is present, metadata can become a hard eligibility constraint.",
    implementation: "Analyze the question → build shared constraints → choose DENSE or HYBRID. These are application decisions, not an LLM agent workflow.",
    references: "query_analyzer.py · constraints.py · router.py · test_retrieval_router.py",
  },
  {
    id: "retrieval", number: "C", title: "Evidence retrieval", phase: "Implemented · local V2",
    description: "Search eligible evidence semantically, and add lexical evidence only when the routing decision calls for it.",
    decision: "Qdrant retrieves dense candidates. On the hybrid route, BM25 searches the same eligible chunk set before top-K truncation. Reciprocal rank fusion combines the lists; exact identifier boosting then adjusts the hybrid ranking.",
    tradeoff: "Eligibility and ranking solve different problems. Fusion must not reintroduce documents excluded by another branch. The dense route retains its semantic order and bypasses fusion and identifier boosting.",
    implementation: "Dense: Qdrant → ranked evidence. Hybrid: Qdrant + BM25 → RRF → identifier boost → ranked evidence. There is no learned reranker in this implementation.",
    references: "hybrid_retriever.py · hybrid.py · identifier_boost.py · V2 report §44",
  },
  {
    id: "response", number: "D", title: "Evidence & response", phase: "Evidence implemented · answers planned",
    description: "Keep retrieved material connected to its source, and distinguish evidence delivery from the planned generation layer.",
    decision: "Ranked chunks retain document IDs, section titles, and source metadata. This traceable evidence is the implemented output. LLM answer generation with source attribution is a target integration.",
    tradeoff: "Retrieving relevant evidence does not establish final-answer accuracy. A fluent answer would still need separate grounding and citation evaluation.",
    implementation: "Implemented: ranked evidence and source traceability. Planned: evidence-grounded LLM answers and generated source citations.",
    references: "models.py · vector_store/retriever.py · project roadmap · V2 report §51.6",
  },
  {
    id: "evaluation", number: "E", title: "Evaluation & regression", phase: "Offline engineering loop",
    description: "Measure evidence ranking and check retrieval behavior outside the user-query execution path.",
    decision: "Development benchmarks report Hit@K and MRR. Pytest checks routing, shared constraints, lexical retrieval, and evaluation behavior. The reused 12-query V2 suite is diagnostic after its failures informed development.",
    tradeoff: "Development and diagnostic results are not independent production estimates. The original in-memory experiments precede the later Qdrant implementation; their results must remain separate.",
    implementation: "Benchmark queries + expected evidence → retrieval assessment → Hit@K / MRR. Regression checks verify behavior. This is not runtime monitoring or an answer-quality evaluation.",
    references: "evaluation/retrieval.py · tests/test_retrieval_* · V2 report §§40–44, 51",
  },
] as const;

export type ArchitectureDomain = typeof architectureDomains[number]["id"];

export const architectureQueries = [
  { id: "semantic", label: "Semantic question", question: "When should the MX-300 hydraulic pump be inspected?", route: "DENSE", reason: "A machine model supplies context; it does not, by itself, activate BM25." },
  { id: "identifier", label: "Identifier question", question: "What does HX-417 mean?", route: "HYBRID", reason: "The alarm code activates lexical retrieval, fusion, and exact identifier boosting." },
] as const;
