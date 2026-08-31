export type BlogPost = {

    slug: string;
  
    title: string;
  
    summary: string;
  
    category: string;
  
    date: string;
  
    readingTime: string;
  
    sections: {
  
      heading: string;
  
      paragraphs: string[];
  
    }[];
  
  };
  
  export const blogPosts: BlogPost[] = [
  
    {
  
      slug: "evaluating-dense-retrieval-beyond-demo-queries",
  
      title: "Evaluating Dense Retrieval Beyond Demo Queries",
  
      summary:
  
        "Why a RAG system that works in a demo can still fail when retrieval quality is measured systematically.",
  
      category: "RAG & Evaluation",
  
      date: "August 2026",
  
      readingTime: "7 min read",
  
      sections: [
  
        {
  
          heading: "The problem with demo-driven evaluation",
  
          paragraphs: [
  
            "A retrieval system can appear impressive when tested on a few hand-picked questions. That does not necessarily mean it retrieves the right evidence consistently.",
  
            "A stronger evaluation process starts with questions whose expected source evidence is known, then measures whether that evidence appears in the retrieved results and at what rank.",
  
          ],
  
        },
  
        {
  
          heading: "Why retrieval quality matters",
  
          paragraphs: [
  
            "In a RAG system, the language model can only reason over the context it receives. If retrieval surfaces irrelevant or incomplete evidence, even a strong model can produce a weak or misleading answer.",
  
            "This is why retrieval should be evaluated independently from answer generation.",
  
          ],
  
        },
  
        {
  
          heading: "What to measure",
  
          paragraphs: [
  
            "Useful retrieval metrics include whether the relevant evidence appears in the top-k results, its rank position, and how performance changes across different query types.",
  
            "These measurements create a baseline that can later be used to compare chunking strategies, embedding models, reranking, or hybrid search.",
  
          ],
  
        },
  
      ],
  
    },
  
    {
  
      slug: "roi-masking-in-industrial-anomaly-detection",
  
      title: "ROI Masking in Industrial Anomaly Detection",
  
      summary:
  
        "What region-of-interest masking changes, how to evaluate it, and why threshold calibration matters.",
  
      category: "Computer Vision",
  
      date: "August 2026",
  
      readingTime: "6 min read",
  
      sections: [
  
        {
  
          heading: "Why masking matters",
  
          paragraphs: [
  
            "Industrial images often contain background regions that are irrelevant to the inspected part. If those regions vary, they can influence anomaly scores even though they are not part of the actual inspection target.",
  
            "ROI masking can reduce that source of noise, but it should be evaluated rather than assumed to help.",
  
          ],
  
        },
  
        {
  
          heading: "Compare masking on and off",
  
          paragraphs: [
  
            "A useful experiment keeps the model, dataset, and reference set fixed while changing only the masking condition.",
  
            "Per-image anomaly scores can then be compared to determine whether masking improves separation between acceptable and defective samples.",
  
          ],
  
        },
  
        {
  
          heading: "Thresholds must follow evidence",
  
          paragraphs: [
  
            "An anomaly threshold should be derived from measured score distributions rather than intuition.",
  
            "Good and defective samples often overlap, so threshold selection requires examining false positives, false negatives, and the operational cost of each type of error.",
  
          ],
  
        },
  
      ],
  
    },
  
  ];