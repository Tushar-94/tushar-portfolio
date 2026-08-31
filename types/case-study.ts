export type CaseStudySection = {

    number: string;
  
    title: string;
  
    content: string;
  
  };
  
  export type CaseStudy = {
  
    slug: string;
  
    category: string;
  
    title: string;
  
    summary: string;
  
    technologies: string[];
  
    sections: CaseStudySection[];
  
    architecture?: string[];
  
  };