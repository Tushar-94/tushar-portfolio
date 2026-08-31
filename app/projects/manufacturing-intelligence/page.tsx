import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";

import { caseStudies } from "@/data/caseStudies";

export default function ManufacturingIntelligencePage() {

  const caseStudy = caseStudies.find(

    (item) => item.slug === "manufacturing-intelligence",

  );

  if (!caseStudy) {

    notFound();

  }

  return <CaseStudyPage caseStudy={caseStudy} />;

}