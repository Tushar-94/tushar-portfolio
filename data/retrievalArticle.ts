export type RetrievalMetric = "hit1" | "hit3" | "hit5" | "mrr";
export type RetrievalStrategy = {
  name: string;
  note: string;
  tone: "baseline" | "lexical" | "regression" | "improvement";
  hit1: number;
  hit3: number;
  hit5: number;
  mrr: number;
};

// Original four-strategy experiment only. Later V2 results stay separate.
export const retrievalStrategies: RetrievalStrategy[] = [
  { name: "Dense", note: "Semantic baseline", tone: "baseline", hit1: .64, hit3: .84, hit5: .88, mrr: .743 },
  { name: "BM25", note: "Lexical only", tone: "lexical", hit1: .52, hit3: .56, hit5: .64, mrr: .558 },
  { name: "Naive Hybrid", note: "Unconditional fusion", tone: "regression", hit1: .64, hit3: .76, hit5: .84, mrr: .705 },
  { name: "Query-Aware", note: "Conditional hybrid", tone: "improvement", hit1: .80, hit3: .96, hit5: 1, mrr: .883 },
];

export const retrievalMetricLabels: Record<RetrievalMetric, string> = { hit1: "Hit@1", hit3: "Hit@3", hit5: "Hit@5", mrr: "MRR" };

export type RoutingQuery = {
  label: string;
  kind: "semantic" | "identifier";
  question: string;
  analysis: string;
  explanation: string;
};
export const routingQueries: RoutingQuery[] = [
  { label: "Semantic", kind: "semantic", question: "What could cause unstable hydraulic pressure?", analysis: "General troubleshooting", explanation: "The question asks for an explanation, without an exact identifier. Dense retrieval preserves the semantic ranking; the lexical branch does not need to participate." },
  { label: "Procedure ID", kind: "identifier", question: "Which maintenance procedure applies to SOP-MNT-003?", analysis: "Procedure identifier", explanation: "The procedure ID has a precise meaning. Dense and BM25 retrieval contribute candidates, while identifier-aware ranking gives the exact reference appropriate attention." },
  { label: "Compatibility", kind: "identifier", question: "Which return filter is compatible with MX-300?", analysis: "Equipment identifier", explanation: "Compatibility depends on the equipment reference. The route combines semantic and lexical evidence, then handles exact identifiers rather than relying on topic similarity alone." },
];

export const retrievalSections = [
  {
    id: "context", label: "The starting point", heading: "One corpus. Different information needs.",
    paragraphs: [
      "I was developing Industrial Knowledge Copilot, an enterprise-style RAG project built around a synthetic industrial knowledge environment. Its documents included equipment manuals, maintenance procedures, troubleshooting guides, and spare-parts information for machines such as the MX-200, MX-220, and MX-300. The experiment concerned evidence retrieval, not the quality of generated answers.",
      "That distinction mattered. An answer can sound convincing while resting on the wrong source. Before asking a language model to explain anything, I needed to know whether the retrieval layer could find the expected supporting documentation. The benchmark therefore paired each development question with predefined evidence, rather than judging a response by how plausible it sounded.",
      "The questions also asked for different kinds of correctness. ‘How do I inspect the hydraulic system?’ leaves room for semantic interpretation. Finding the procedure for hydraulic return filter replacement requires a particular document. Checking which filter is compatible with MX-300 adds an exact equipment constraint. Similar wording alone cannot resolve all three needs.",
      "The initial comparison used 154 document chunks and 25 development questions. Dense search embedded the query with all-MiniLM-L6-v2 and ranked chunks by cosine similarity. These experiments preceded the later Qdrant-backed architecture. The four-way comparison below should be read as that initial retrieval investigation, not as a benchmark of the eventual storage stack.",
    ],
  },
  {
    id: "baselines", label: "Experiments 01–02", heading: "Semantic similarity was a useful start.",
    paragraphs: [
      "My first hypothesis was straightforward: dense representations should recover useful technical evidence even when a question and a document use different words. A reader should not have to reproduce the phrasing of a manual to find the relevant section. The pipeline was deliberately simple: embed the query, calculate cosine similarity, and inspect the ranked evidence.",
      "Dense retrieval put the expected evidence first for 64% of development questions. It reached 84% at Hit@3 and 88% at Hit@5, with an MRR of 0.743. That was a useful baseline, but it left an important gap: a semantically related section was not necessarily the correct procedure, alarm explanation, or compatible part reference.",
      "I introduced BM25 to investigate that gap. Equipment references such as MX-220, procedure IDs such as SOP-MNT-003, and part numbers such as HF-300-R10 are not interchangeable descriptions. They carry exact meanings. Lexical matching seemed like a sensible way to preserve a signal that semantic similarity might underweight.",
      "BM25 alone performed worse overall: 52% Hit@1, 56% Hit@3, 64% Hit@5, and 0.558 MRR. The result did not make lexical search useless. It showed that lexical matching was not the strongest general-purpose ranking strategy for this particular mix of questions. Exact terminology could still be valuable without being the right signal for every query.",
    ],
  },
  {
    id: "fusion", label: "Experiment 03", heading: "The obvious combination regressed.",
    paragraphs: [
      "The next hypothesis felt more promising: keep dense retrieval for meaning, keep BM25 for terminology, and combine their rankings. I used Reciprocal Rank Fusion, or RRF. Instead of trying to compare a cosine-similarity score with a BM25 score, RRF combines the positions a document occupies in the ranked lists.",
      "Each branch contributes a reciprocal-rank term. A document near the top of either list receives more credit than one farther down; the constant k moderates the influence of rank position. The attraction is practical: fusion can operate on rankings from different systems without pretending their raw scores share the same scale.",
      "But a common scale does not tell the system whether a branch deserves to influence a particular question. In the naive hybrid, both branches participated every time. A lexical ranking could therefore alter an otherwise useful semantic ordering, even when the query had no identifier that called for exact matching.",
      "The combined system held Hit@1 at 64%, but Hit@3 fell from 84% to 76% and Hit@5 from 88% to 84%. MRR dropped from 0.743 to 0.705. Looking only at the first result would have hidden part of the regression. The extra retrieval branch had made the architecture more elaborate while making the overall evidence ranking less effective on the development benchmark.",
    ],
  },
  {
    id: "failures", label: "Failure investigation", heading: "Fusion could not decide what mattered.",
    paragraphs: [
      "The regression changed the question I was asking. Rather than adding another ranking mechanism immediately, I examined the information needs that the combined system was treating as equivalent. Three problems explained why more retrieval signals were not automatically producing better evidence.",
      "Lexical overlap could promote the wrong source. Words such as hydraulic, system, inspection, and maintenance appeared across related documents. Matching those terms could make a section look useful without making it the expected procedure. Topic overlap and supporting evidence were different things, and the ranking needed to preserve that distinction.",
      "A second problem was indiscriminate participation. General troubleshooting questions often benefited from semantic retrieval. Inviting BM25 into every ranking meant that useful dense results could be disturbed by a signal the question did not need. Fusion was doing what it was designed to do—combining lists—without understanding why those lists should be combined.",
      "The third problem was the opposite: some questions needed more deliberate exact-match handling. A part number, equipment model, or procedure ID was a constraint on relevance. Treating it as just another token failed to express its importance. I needed a way to distinguish those questions before deciding how to retrieve and rank their evidence.",
    ],
  },
  {
    id: "routing", label: "Experiment 04", heading: "Make the retrieval strategy conditional.",
    paragraphs: [
      "The next iteration moved the important decision earlier in the pipeline. A query analyzer distinguished general semantic questions from identifier-heavy ones. Semantic questions could stay on the dense route. Questions containing precise technical references could use dense and lexical retrieval together, followed by identifier-aware ranking.",
      "This gave each mechanism a more specific job. Dense retrieval supplied semantic relevance. BM25 supplied lexical evidence when identifiers and technical terms made that evidence useful. RRF combined candidate rankings on the hybrid route, while identifier-aware handling addressed exact references. None of those mechanisms had to serve as a universal answer to every information need.",
      "The difference was architectural, but the justification remained empirical. I was no longer asking whether hybrid retrieval sounded stronger than a single retriever. I was asking whether a conditional strategy could improve the same evidence-ranking measures that had exposed the regression. The route explorer illustrates that decision; it is not a live query execution or a reproduction of a retrieved result list.",
    ],
  },
  {
    id: "comparison", label: "The complete comparison", heading: "Let the benchmark challenge the design.",
    paragraphs: [
      "Query-aware retrieval reached 80% Hit@1, 96% Hit@3, 100% Hit@5, and 0.883 MRR on the 25-query development benchmark. Against the dense baseline, both first-result relevance and top-five evidence recovery improved. The improvement came from a retrieval policy that accounted for different questions, rather than from always adding the same extra signal.",
      "These are development results. The questions and failure analysis informed the architecture, so this is not an independent estimate of production reliability. A 100% Hit@5 means the expected evidence appeared in the top five for these development questions. It does not establish that every unfamiliar industrial question will retrieve the right evidence, or that a downstream generated answer will be correct.",
      "The chart keeps the original four strategies together. Switching metrics is useful because a single number can obscure a failure mode: naive fusion preserved Hit@1 while degrading the broader ranking. A design decision should survive more than its most flattering view of the results.",
    ],
  },
  {
    id: "later", label: "A separate checkpoint", heading: "The architecture kept evolving.",
    paragraphs: [
      "Query-aware routing was not the end of the work. Later iterations introduced Qdrant vector storage, metadata-aware retrieval, shared eligibility constraints across the dense and lexical branches, document-title context in embeddings, and automated retrieval regression tests. These changes addressed storage, candidate selection, representation, and repeatability as well as ranking.",
      "Shared eligibility is particularly important in a hybrid system. If one branch respects metadata constraints while the other searches a broader corpus, fusion can bring in candidates that should not have been eligible. Document-title context addresses a different issue: a chunk’s local wording may omit the procedural context needed to distinguish one document from another.",
      "The later V2 development checkpoint reported 84% Hit@1, 92% Hit@3, 100% Hit@5, and 0.891 MRR, alongside 90 passing automated tests. This is a separate engineering checkpoint, not a controlled experiment isolating the effect of routing. Multiple things changed. Its results should not be merged into the original four-way comparison or attributed to a single architectural decision.",
    ],
  },
  {
    id: "lessons", label: "What I took forward", heading: "Complexity needs evidence.",
    paragraphs: [
      "I started with a reasonable assumption: semantic search and keyword retrieval should complement each other. The experiments made that assumption more precise. BM25 was not the strongest general-purpose retriever for this benchmark. Unconditional fusion reduced ranking quality. A conditional strategy was better suited to the mix of technical information needs.",
      "The useful lesson is not to avoid BM25 or hybrid search. It is to make the role of each retrieval signal explicit, then evaluate the policy that decides when the signal should participate. Rank fusion can combine evidence; it cannot substitute for understanding what the question requires.",
      "That principle extends beyond retrieval. More components create more interactions to inspect, test, and maintain. The right architecture is the one whose decisions are supported by evidence—and whose claims stay within the limits of that evidence.",
    ],
  },
];

export const retrievalArticle = {
  slug: "evaluating-dense-retrieval-beyond-demo-queries",
  title: "Why Adding BM25 Made My RAG Retrieval Worse",
  subtitle: "The engineering journey from dense retrieval to query-aware hybrid search.",
  summary: "I expected adding BM25 to improve my RAG retrieval pipeline. Instead, hybrid search performed worse. Here’s how systematic evaluation led to query-aware retrieval.",
  category: "RAG & Evaluation",
  date: "October 2026",
  readingTime: "8–10 min read",
  tags: ["RAG", "Information Retrieval", "Dense Retrieval", "BM25", "Hybrid Search", "Reciprocal Rank Fusion", "Query Routing", "Retrieval Evaluation"],
  githubUrl: "https://github.com/Tushar-94/industrial-knowledge-copilot",
  projectUrl: "/projects/industrial-knowledge-copilot",
  sections: retrievalSections,
};
