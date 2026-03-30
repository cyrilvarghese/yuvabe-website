import type { Metadata } from "next";

import { StudioAboutPage } from "@/components/studio/studio-about-page";
import { getAbsoluteUrl } from "@/lib/site";
import {
  getStudioAboutPageContent,
  getStudioHomepageContent,
} from "@/lib/studio-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Yuvabe Studios helps startup founders make better product bets through AI-first strategy, design, engineering, and growth.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Yuvabe Studios",
    description:
      "AI-first strategy, design, engineering, and growth for founders who need sharper decisions and faster execution.",
    url: "/about",
  },
  twitter: {
    title: "About Yuvabe Studios",
    description:
      "AI-first strategy, design, engineering, and growth for founders who need sharper decisions and faster execution.",
  },
};

export default async function AboutPage() {
  const [homepageContent, aboutContent] = await Promise.all([
    getStudioHomepageContent(),
    getStudioAboutPageContent(),
  ]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Yuvabe Studios",
    url: getAbsoluteUrl("/about"),
    description:
      "Yuvabe Studios is an AI-first strategy, design, engineering, and growth studio for startups.",
    mainEntity: {
      "@type": "Organization",
      name: "Yuvabe Studios",
      foundingDate: "2020",
      foundingLocation: "Auroville, India",
      url: getAbsoluteUrl("/"),
      description:
        "AI-first strategy, design, engineering, and growth studio for startups that need sharper decisions and faster execution.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <StudioAboutPage
        navigationItems={homepageContent.navigationItems}
        content={aboutContent}
      />
    </>
  );
}
