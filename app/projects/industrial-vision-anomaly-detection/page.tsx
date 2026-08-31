import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";

import { caseStudies } from "@/data/caseStudies";

export default function IndustrialVisionAnomalyDetectionPage() {

  const caseStudy = caseStudies.find(

    (item) => item.slug === "industrial-vision-anomaly-detection",

  );

  if (!caseStudy) {

    notFound();

  }

  return <CaseStudyPage caseStudy={caseStudy} />;

}