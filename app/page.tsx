import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { pageMetadata } from "@/lib/seo/metadata";
import { identity } from "@/lib/seo/site";

export const metadata: Metadata = pageMetadata({ title: identity.title, description: identity.description, path: "/", absoluteTitle: true });

export default function Home() {
  return <HomePage />;
}
