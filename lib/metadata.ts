// lib/metadata.ts
import { Metadata } from "next";

interface MetadataProps {
  title: string;
  description?: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

export function generateMetadataFromContent({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
}: MetadataProps): Metadata {
  const siteName = "Isarco";
  const siteUrl = "https://isarco.com.co";
  const fullUrl = `${siteUrl}${path}`;

  return {
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
  };
}
