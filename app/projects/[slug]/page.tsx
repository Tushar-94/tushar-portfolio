import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";

import { caseStudies } from "@/data/caseStudies";

type ProjectPageProps = {

  params: Promise<{

    slug: string;

  }>;

};

export function generateStaticParams() {

  return caseStudies.map((caseStudy) => ({

    slug: caseStudy.slug,

  }));

}

export async function generateMetadata({

  params,

}: ProjectPageProps): Promise<Metadata> {

  const { slug } = await params;

  const caseStudy = caseStudies.find(

    (item) => item.slug === slug,

  );

  if (!caseStudy) {

    return {};

  }

  return {

    title: caseStudy.title,

    description: caseStudy.summary,

  };

}

export default async function ProjectPage({

  params,

}: ProjectPageProps) {

  const { slug } = await params;

  const caseStudy = caseStudies.find(

    (item) => item.slug === slug,

  );

  if (!caseStudy) {

    notFound();

  }

  return <CaseStudyPage caseStudy={caseStudy} />;

}