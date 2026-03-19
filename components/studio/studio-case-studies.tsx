"use client";

import { useState } from "react";

import type { StudioHomepageWorkContent } from "@/components/studio/studio-homepage-content";
import { StudioCaseStudyMockCard } from "@/components/studio/studio-case-study-mock-card";
import {
  getStudioCaseStudyHref,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import { StudioCaseStudySummaryDialog } from "@/components/studio/studio-case-study-summary-dialog";

type StudioCaseStudiesProps = {
  caseStudies: StudioCaseStudySummary[];
  workContent: StudioHomepageWorkContent;
};

// The case-studies section turns named proof into a scannable homepage evidence block.
export function StudioCaseStudies({
  caseStudies,
  workContent,
}: StudioCaseStudiesProps) {
  const [activeCaseStudy, setActiveCaseStudy] =
    useState<StudioCaseStudySummary | null>(null);
  const [isCaseStudyDialogOpen, setIsCaseStudyDialogOpen] = useState(false);
<<<<<<< HEAD
  const featuredCaseStudies = homepageCaseStudies.slice(0, 2);
  const threeCardStudies = [
    homepageCaseStudies[2], // TVAM
    homepageCaseStudies[4], // AgeShift
    homepageCaseStudies[3], // KittyKat
  ].filter(Boolean);
=======
  const featuredCaseStudies = caseStudies.slice(0, 2);
  const secondaryCaseStudies = caseStudies.slice(2, 4);
  const spotlightCaseStudy = caseStudies[4];
>>>>>>> 351fcf69ad5e5322e909a2f4fd528db27a0c4786

  // Keeping the selected study in parent state lets the modal animate out before content is cleared.
  function handleOpenCaseStudy(caseStudy: StudioCaseStudySummary) {
    setActiveCaseStudy(caseStudy);
    setIsCaseStudyDialogOpen(true);
  }

  return (
    <>
      <section
        id="work"
        className="ds-surface-billing-aurora relative overflow-hidden px-6 py-10 md:px-10 md:py-2"
      >
        {/* The section background extends the hero's light grid so the frame line continues below the fold. */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-[size:120px_100%]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-[size:100%_120px]" />
          <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 px-6 md:block md:px-10">
            <div className="absolute inset-y-0 left-0 w-px bg-slate-200/80" />
            <div className="absolute inset-y-0 right-0 w-px bg-slate-200/80" />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10">
          {/* The section heading uses editorial contrast with one dominant line and one quieter display block. */}
          <div className="max-w-6xl space-y-5 lg:pl-10 xl:pl-14">
            <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
              {workContent.eyebrow}
            </p>
            <h2 className="text-hero-support max-w-5xl text-[var(--neutral-950)]">
              <strong>{workContent.headline}</strong>
            </h2>
            <p className="text-display-muted-editorial max-w-6xl">
              {workContent.supportPrefix}{" "}
              <span className="text-[var(--color-text-brand)]">
                {workContent.supportHighlight}
              </span>
              {workContent.supportSuffix}
            </p>
          </div>

          {/* Row 1: 2 equal columns. Row 2: 3 equal compact columns. */}
          <div className="space-y-6 px-4 sm:px-0 lg:px-10 xl:px-14">
            <div className="grid gap-6 xl:grid-cols-2">
              {featuredCaseStudies.map((caseStudy) => (
                <StudioCaseStudyMockCard
                  key={caseStudy.id}
                  sector={caseStudy.sector}
                  title={caseStudy.title}
                  summary={caseStudy.summary}
                  services={caseStudy.services}
                  imageSrc={caseStudy.mockImageSrc ?? "/assets/ga-image.png"}
                  imageAlt={
                    caseStudy.mockImageAlt ??
                    `${caseStudy.title} case study mock`
                  }
                  imageClassName={caseStudy.mockImageClassName}
                  mockViewport={caseStudy.mockViewport}
                  variant={caseStudy.mockVariant}
                  layout={caseStudy.mockLayout}
                  detailHref={getStudioCaseStudyHref(caseStudy.id)}
                  onOpenDetails={() => handleOpenCaseStudy(caseStudy)}
                />
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {threeCardStudies.map((caseStudy) => (
                <StudioCaseStudyMockCard
                  key={caseStudy.id}
                  sector={caseStudy.sector}
                  title={caseStudy.title}
                  summary={caseStudy.summary}
                  services={caseStudy.services}
                  imageSrc={caseStudy.mockImageSrc ?? "/assets/GA_cover.png"}
                  imageAlt={
                    caseStudy.mockImageAlt ??
                    `${caseStudy.title} case study mock`
                  }
                  imageClassName={caseStudy.mockImageClassName}
                  mockViewport={caseStudy.mockViewport}
                  variant={caseStudy.mockVariant}
                  layout="compact"
                  detailHref={getStudioCaseStudyHref(caseStudy.id)}
                  onOpenDetails={() => handleOpenCaseStudy(caseStudy)}
                />
              ))}
            </div>
          </div>
        </div>
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
