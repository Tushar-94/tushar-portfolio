import { RoiArticle } from "@/components/writing/roi/RoiArticle";
import { ArticleStructuredData } from "@/components/seo/PageStructuredData";
import { getArticle } from "@/lib/route-data";
import { articleMetadata } from "@/lib/seo/metadata";

const article = getArticle("roi-masking-in-industrial-anomaly-detection");
export const metadata = articleMetadata(article);

export default function ArticlePage() {
  return <>
    <RoiArticle />
    <ArticleStructuredData article={article} />
  </>;
}
