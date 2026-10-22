import { renderSocialImage } from "@/lib/seo/social-image";

export const dynamic = "force-static";

export function GET() {
  return renderSocialImage();
}
