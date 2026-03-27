import { CheckCircle2 } from "lucide-react";

import {
  getCaseStudyIcon,
  resolveStudioCaseStudyDetail,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";

type StudioCaseStudyOutcomesStripProps = {
  caseStudy: StudioCaseStudySummary;
};

// This page-level outcomes strip restores the post-hero payoff without pushing that content back into the hero itself.
export function StudioCaseStudyOutcomesStrip({
  caseStudy,
}: StudioCaseStudyOutcomesStripProps) {
  const detail = resolveStudioCaseStudyDetail(caseStudy);

  return (
    <section className="relative border-b border-[var(--color-border-default)]/80 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">
        <div className="px-2 sm:px-4 lg:px-6">
          {/* The section label gives the post-hero payoff its own clear headline before the four outcomes scan across. */}
          <div className="mb-6">
            <p className="text-label-sm uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
              Outcomes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {detail.outcomes.map((outcome, index) => {
              const OutcomeIcon = detail.proofPoints[index]?.iconKey
                ? getCaseStudyIcon(detail.proofPoints[index]?.iconKey)
                : CheckCircle2;

              return (
                <div
                  key={outcome}
                  className="border-l border-[color:color-mix(in_srgb,var(--purple-500)_20%,white)] pl-6"
                >
                  <div className="flex items-center gap-3 text-[var(--color-text-brand)]">
                    <OutcomeIcon className="size-5 shrink-0" strokeWidth={1.9} />
                  </div>
                  <p className="mt-5 text-body-lg font-semibold text-[var(--neutral-950)]">
                    {outcome}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
