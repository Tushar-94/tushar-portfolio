import { retrievalArticle } from "./retrievalArticle";
import { roiArticle } from "./roiArticle";

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
  
    retrievalArticle,
  
    roiArticle,
  
  ];
