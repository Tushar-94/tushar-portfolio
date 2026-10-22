import { retrievalArticle } from "./retrievalArticle";
import { roiArticle } from "./roiArticle";

export type Article = {

    slug: string;
  
    title: string;
  
    summary: string;
  
    category: string;
  
    date: string;
  
    readingTime: string;
  
  };
  
  export const articles: Article[] = [
  
    retrievalArticle,
  
    roiArticle,
  
    {
  
      slug: "building-production-oriented-rag-systems",
  
      title: "Building Production-Oriented RAG Systems",
  
      summary:
  
        "A practical look at retrieval, evaluation, architecture decisions, and the gap between prototypes and reliable systems.",
  
      category: "Generative AI",
  
      date: "Coming soon",
  
      readingTime: "8 min read",
  
    },
  
  ];
