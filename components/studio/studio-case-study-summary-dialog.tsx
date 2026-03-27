"use client";

import { StudioCaseStudyDetail } from "@/components/studio/studio-case-study-detail";
import {
  applyStudioCaseStudyDisplayOverrides,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import { ModalShell } from "@/components/ui/modal-shell";

type StudioCaseStudySummaryDialogProps = {
  caseStudy: StudioCaseStudySummary | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAfterClose?: () => void;
};

// This dialog wrapper stays stateless so the parent can coordinate open state and close cleanup explicitly.
export function StudioCaseStudySummaryDialog({
  caseStudy,
  open,
  onOpenChange,
  onAfterClose,
}: StudioCaseStudySummaryDialogProps) {
  if (!caseStudy) {
    return null;
  }

  // Shared display overrides keep the modal summary and detail page in sync for curated mock sets.
  const dialogCaseStudy = applyStudioCaseStudyDisplayOverrides(caseStudy);

  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      closeVariant="case-study"
      onAfterClose={onAfterClose}
      title={`${dialogCaseStudy.title} case study summary`}
      contentClassName="px-5 pb-8 pt-16 sm:px-8 lg:px-10 lg:pb-10"
    >
      <StudioCaseStudyDetail
        caseStudy={dialogCaseStudy}
        variant="modal"
        showCaseBreakdown={false}
        showGalleryCardFooter={false}
      />
    </ModalShell>
  );
}
