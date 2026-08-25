import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
}

export function Seo({ title, description, canonical, noIndex = false }: SeoProps) {
  useEffect(() => {
    const finalDescription = description ?? "Education Lifecycle Management";
    document.title = title;

    const upsertMeta = (name: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    const upsertProperty = (property: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    upsertMeta("description", finalDescription);
    upsertMeta("robots", noIndex ? "noindex,nofollow,noarchive" : "index,follow");
    upsertProperty("og:title", title);
    upsertProperty("og:description", finalDescription);
    upsertProperty("og:type", "website");
    upsertMeta("twitter:card", "summary");
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", finalDescription);

    if (canonical) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }, [title, description, canonical, noIndex]);

  return null;
}
