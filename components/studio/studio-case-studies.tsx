"use client";

import { useState } from "react";

import { StudioCaseStudyCard } from "@/components/studio/studio-case-study-card";
import {
  studioCaseStudies,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import { StudioCaseStudySummaryDialog } from "@/components/studio/studio-case-study-summary-dialog";

// The case-studies section turns named proof into a scannable homepage evidence block.
export function StudioCaseStudies() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<StudioCaseStudySummary | null>(null);

  return (
    <>
      <section id="work" className="relative overflow-hidden bg-white px-6 py-10 md:px-10 md:py-2">
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
          {/* The section heading uses the dark reference's editorial contrast with one dominant line and one quieter display block. */}
          <div className="max-w-6xl space-y-5 lg:pl-10 xl:pl-14">
            <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">Work</p>
            <h2 className="text-hero-support max-w-5xl text-[var(--neutral-950)]">
              <strong>Launch faster. Reach revenue sooner.</strong>
            </h2>
            <p className="text-display-muted-editorial max-w-6xl">
              Turn roadmap bets into <span className="@ text-[var(--color-text-brand)]">shipped releases</span>, adoption, and compounding traction with one execution partner.
            </p>
          </div>

          {/* The card grid now opens a shared summary popup so deeper proof stays connected to each card. */}
          <div className="grid gap-6 sm:gap-7 lg:px-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:px-14">
            {studioCaseStudies.map((caseStudy) => (
              <StudioCaseStudyCard
                key={caseStudy.id}
                size={caseStudy.size}
                sector={caseStudy.sector}
                title={caseStudy.title}
                summary={caseStudy.summary}
                services={caseStudy.services}
                media={caseStudy.media}
                onOpenDetails={() => setActiveCaseStudy(caseStudy)}
              />
            ))}
          </div>
        </div>
      </section>

      <StudioCaseStudySummaryDialog
        caseStudy={activeCaseStudy}
        open={Boolean(activeCaseStudy)}
        onOpenChange={(open) => {
          if (!open) {
            setActiveCaseStudy(null);
          }
        }}
      />
    </>
  );
}







