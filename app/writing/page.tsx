import type { Metadata } from "next";
import { WritingDirectory } from "@/components/directories/WritingDirectory";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({ title: "Writing", description: "Technical investigations by Sunkra Tushar Rao into RAG retrieval, industrial anomaly detection, model evaluation, and the engineering decisions behind them.", path: "/writing" });

export default function WritingPage() {
  return <WritingDirectory />;
}
