// lib/metadata.ts
import { siteConfig } from "@/site.config";
import { Metadata } from "next";

interface MetadataProps {
  title: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}

export function generateMetadataFromContent({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords = [],
}: MetadataProps): Metadata {
  const siteName = siteConfig.name;
  const siteUrl = siteConfig.domain;
  const fullUrl = `${siteUrl}${path}`;

  const defaultKeywords = siteConfig.seo.defaultKeywords;

  return {
    metadataBase: new URL(siteUrl),
    title: `${title} | ${siteName}`,
    description,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName,
      type,
      ...(image && { images: [image] }),
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
    keywords: [...keywords, ...defaultKeywords]?.join(","),
  };
}
