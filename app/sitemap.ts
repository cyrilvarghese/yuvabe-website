import type { MetadataRoute } from "next";

import { studioCaseStudyIds } from "@/components/studio/studio-case-study-content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyRoutes: MetadataRoute.Sitemap = studioCaseStudyIds.map((id) => ({
    url: `${siteUrl}/case-studies/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...caseStudyRoutes,
  ];
}
