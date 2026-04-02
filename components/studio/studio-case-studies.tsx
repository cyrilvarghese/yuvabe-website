"use client";

import { useState } from "react";

import type { StudioHomepageWorkContent } from "@/components/studio/studio-homepage-content";
import { StudioCaseStudyMockCard } from "@/components/studio/studio-case-study-mock-card";
import {
  getStudioCaseStudyHref,
  resolveStudioCaseStudyCoverSrc,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";
import { StudioCaseStudySummaryDialog } from "@/components/studio/studio-case-study-summary-dialog";

type StudioCaseStudiesProps = {
  caseStudies: StudioCaseStudySummary[];
  workContent: StudioHomepageWorkContent;
};

const homepageCaseStudyOrder = [
  "general-aeronautics",
  "bevolve",
  "kittykat",
  "tvam",
  "ageshift",
] as const;

// Hard-coded logo sources keyed by case study ID.
const caseStudyLogoMap: Partial<Record<string, string>> = {
  "general-aeronautics": "/assets/general-aeronautics/logo.svg",
  bevolve: "/assets/bevolve/logo.svg",
  tvam: "/assets/tvam/logo.svg",
  kittykat: "/assets/KK/logo.svg",
  ageshift: "/assets/ageshift/logo.svg",
};

// Hard-coded video sources keyed by case study ID — ensures the video shows even when
// the Supabase record predates the mockVideoSrc field being added.
const caseStudyVideoOverrides: Partial<Record<string, string>> = {};

// Hard-coded viewport overrides — switches portrait phone frames to landscape where the
// cover image is a wide/landscape asset and needs a wider container for full visibility.
const caseStudyViewportOverrides: Partial<
  Record<string, "portrait" | "landscape">
> = {
  bevolve: "landscape",
  "general-aeronautics": "landscape",
};

// Hard-coded presentation overrides — "fullImage" removes the phone frame and shows the
// image directly at the correct aspect ratio so wide covers aren't cropped into a frame.

// The case-studies section turns named proof into a scannable homepage evidence block.
export function StudioCaseStudies({
  caseStudies,
  workContent,
}: StudioCaseStudiesProps) {
  const orderedCaseStudies = homepageCaseStudyOrder
    .map((id) => caseStudies.find((caseStudy) => caseStudy.id === id))
    .filter((caseStudy): caseStudy is StudioCaseStudySummary => Boolean(caseStudy));
  const [activeCaseStudy, setActiveCaseStudy] =
    useState<StudioCaseStudySummary | null>(null);
  const [isCaseStudyDialogOpen, setIsCaseStudyDialogOpen] = useState(false);
  const featuredCaseStudies = orderedCaseStudies.slice(0, 2);
  const secondaryCaseStudies = orderedCaseStudies.slice(2, 4);
  const spotlightCaseStudy = orderedCaseStudies[4];

  // Keeping the selected study in parent state lets the modal animate out before content is cleared.
  function handleOpenCaseStudy(caseStudy: StudioCaseStudySummary) {
    setActiveCaseStudy(caseStudy);
    setIsCaseStudyDialogOpen(true);
  }

  return (
    <>
      <section
        id="work"
        className="relative overflow-hidden bg-white py-14 md:py-20"
      >
        {/* The section background extends the hero's light grid so the frame line continues below the fold. */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-[size:120px_100%]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-[size:100%_120px]" />
          <StudioPageRails />
        </div>

        <StudioPageContainer className="relative z-10 flex flex-col gap-10">
          {/* The section heading uses editorial contrast with one dominant line and one quieter display block. */}
          <div className="max-w-6xl space-y-5 lg:pl-10 xl:pl-14">
            <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
              {workContent.eyebrow}
            </p>
            <h2
              className="text-display-muted-editorial  max-w-5xl text-[var(--neutral-950)]"
              style={{ fontSize: "3.5rem", fontWeight: 600, wordSpacing: ".2rem" }}
            >
              <strong style={{ fontWeight: "inherit" }}>{workContent.headline}</strong>
            </h2>
            <p className="text-hero-support max-w-6xl">
              {workContent.supportPrefix}{" "}
              <span className="text-[var(--color-text-brand)]">
                {workContent.supportHighlight}
              </span>
              {workContent.supportSuffix}
            </p>
          </div>

          {/* The work grid keeps the current 2 / 2 / 1 rhythm while adding crawlable case-study links. */}
          {/* A small mobile gutter keeps the case-study cards from feeling pinned to the screen edges. */}
          <div className="space-y-6 px-4 sm:px-0 lg:px-10 xl:px-14 pb-10">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              {featuredCaseStudies.map((caseStudy) => (
                <StudioCaseStudyMockCard
                  key={caseStudy.id}
                  logoSrc={caseStudyLogoMap[caseStudy.id]}
                  sector={caseStudy.sector}
                  title={caseStudy.title}
                  summary={caseStudy.summary}
                  services={caseStudy.services}
                  imageSrc={
                    resolveStudioCaseStudyCoverSrc(caseStudy, "card") ??
                    "/assets/GA_cover.png"
                  }
                  imageAlt={
                    caseStudy.mockImageAlt ??
                    `${caseStudy.title} case study mock`
                  }
                  videoSrc={
                    caseStudy.mockVideoSrc ??
                    caseStudyVideoOverrides[caseStudy.id]
                  }
                  imageAspectRatio={caseStudy.mockImageAspectRatio}
                  imageClassName={caseStudy.mockImageClassName}
                  mockViewport={
                    caseStudyViewportOverrides[caseStudy.id] ??
                    caseStudy.mockViewport
                  }
                  mockPresentation={caseStudy.mockPresentation}
                  variant={caseStudy.mockVariant}
                  layout={caseStudy.mockLayout}
                  detailHref={getStudioCaseStudyHref(caseStudy.id)}
                  onOpenDetails={() => handleOpenCaseStudy(caseStudy)}
                />
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              {secondaryCaseStudies.map((caseStudy) => (
                <StudioCaseStudyMockCard
                  key={caseStudy.id}
                  logoSrc={caseStudyLogoMap[caseStudy.id]}
                  sector={caseStudy.sector}
                  title={caseStudy.title}
                  summary={caseStudy.summary}
                  services={caseStudy.services}
                  imageSrc={
                    resolveStudioCaseStudyCoverSrc(caseStudy, "card") ??
                    "/assets/GA_cover.png"
                  }
                  imageAlt={
                    caseStudy.mockImageAlt ??
                    `${caseStudy.title} case study mock`
                  }
                  videoSrc={
                    caseStudy.mockVideoSrc ??
                    caseStudyVideoOverrides[caseStudy.id]
                  }
                  imageAspectRatio={caseStudy.mockImageAspectRatio}
                  imageClassName={caseStudy.mockImageClassName}
                  mockViewport={
                    caseStudyViewportOverrides[caseStudy.id] ??
                    caseStudy.mockViewport
                  }
                  mockPresentation={caseStudy.mockPresentation}
                  variant={caseStudy.mockVariant}
                  layout={caseStudy.mockLayout}
                  detailHref={getStudioCaseStudyHref(caseStudy.id)}
                  onOpenDetails={() => handleOpenCaseStudy(caseStudy)}
                />
              ))}
            </div>

            {spotlightCaseStudy ? (
              <div className="grid gap-6">
                <StudioCaseStudyMockCard
                  logoSrc={caseStudyLogoMap[spotlightCaseStudy.id]}
                  sector={spotlightCaseStudy.sector}
                  title={spotlightCaseStudy.title}
                  summary={spotlightCaseStudy.summary}
                  services={spotlightCaseStudy.services}
                  imageSrc={
                    resolveStudioCaseStudyCoverSrc(spotlightCaseStudy, "card") ??
                    "/assets/GA_cover.png"
                  }
                  imageAlt={
                    spotlightCaseStudy.mockImageAlt ??
                    `${spotlightCaseStudy.title} case study mock`
                  }
                  videoSrc={
                    spotlightCaseStudy.mockVideoSrc ??
                    caseStudyVideoOverrides[spotlightCaseStudy.id]
                  }
                  imageAspectRatio={spotlightCaseStudy.mockImageAspectRatio}
                  imageClassName={spotlightCaseStudy.mockImageClassName}
                  mockViewport={
                    caseStudyViewportOverrides[spotlightCaseStudy.id] ??
                    spotlightCaseStudy.mockViewport
                  }
                  mockPresentation={spotlightCaseStudy.mockPresentation}
                  variant={spotlightCaseStudy.mockVariant}
                  layout={spotlightCaseStudy.mockLayout}
                  span="full"
                  detailHref={getStudioCaseStudyHref(spotlightCaseStudy.id)}
                  onOpenDetails={() => handleOpenCaseStudy(spotlightCaseStudy)}
                />
              </div>
            ) : null}
          </div>
        </StudioPageContainer>
      </section>

      <StudioCaseStudySummaryDialog
        caseStudy={activeCaseStudy}
        open={isCaseStudyDialogOpen}
        onOpenChange={setIsCaseStudyDialogOpen}
        onAfterClose={() => {
          setActiveCaseStudy(null);
        }}
      />
    </>
  );
}

