import { RetrievalArticle } from "@/components/writing/retrieval/RetrievalArticle";
import { ArticleStructuredData } from "@/components/seo/PageStructuredData";
import { getArticle } from "@/lib/route-data";
import { articleMetadata } from "@/lib/seo/metadata";

const article = getArticle("evaluating-dense-retrieval-beyond-demo-queries");
export const metadata = articleMetadata(article);

export default function ArticlePage() {
  return <>
    <RetrievalArticle />
    <ArticleStructuredData article={article} />
  </>;
}
