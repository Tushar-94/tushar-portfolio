import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";

import { caseStudies } from "@/data/caseStudies";

export default function IndustrialKnowledgeCopilotPage() {

  const caseStudy = caseStudies.find(

    (item) => item.slug === "industrial-knowledge-copilot",

  );

  if (!caseStudy) {

    notFound();

  }

  return <CaseStudyPage caseStudy={caseStudy} />;

}