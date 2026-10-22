import { permanentRedirect } from "next/navigation";

// Retain existing index links while consolidating the duplicate Writing URLs.
export default function BlogIndex() {
  permanentRedirect("/writing");
}
