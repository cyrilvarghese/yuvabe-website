"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ImageIcon, Sparkles } from "lucide-react";

import {
  type StudioCaseStudyGalleryRow,
  type StudioCaseStudyProofPoint,
  type StudioCaseStudySection,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import galleryImageLibrary from "@/components/studio/studio-case-study-gallery-images.json";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModalShell } from "@/components/ui/modal-shell";
import { PremiumSurface } from "@/components/ui/premium-surface";
import { cn } from "@/lib/utils";

type StudioCaseStudySummaryDialogProps = {
  caseStudy: StudioCaseStudySummary | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// Alternate wide and narrow gallery items so the placeholder rhythm matches the dark reference without duplicating its exact styling.
function getGalleryItemClasses(rowIndex: number, itemIndex: number) {
  const featuredFirst = rowIndex % 2 === 0;
  const isFeatured = featuredFirst ? itemIndex === 0 : itemIndex === 1;

  return {
    wrapper: isFeatured ? "md:col-span-7" : "md:col-span-5",
    frame: "h-[16rem] md:h-[20rem]",
  };
}

type StudioCaseStudyGalleryImageAsset = {
  src: string;
  alt: string;
};

type StudioCaseStudyGalleryImageLibrary = Record<
  string,
  {
    badgeLabel: string;
    images: readonly StudioCaseStudyGalleryImageAsset[];
  }
>;

const caseStudyGalleryImageLibrary = galleryImageLibrary as StudioCaseStudyGalleryImageLibrary;

// This popup now mirrors the dark reference structure while translating every surface into the shared light design system.
export function StudioCaseStudySummaryDialog({
  caseStudy,
  open,
  onOpenChange,
}: StudioCaseStudySummaryDialogProps) {
  if (!caseStudy) {
    return null;
  }

  // Pull mock gallery image data from JSON so the source can later move to a CDN without changing the UI contract.
  const caseStudyGalleryAssets =
    caseStudyGalleryImageLibrary[caseStudy.id] ?? caseStudyGalleryImageLibrary.bevolve;

  // Keep the expanded modal useful even when a case study only provides partial fields.
  const outcomes = caseStudy.modalOutcomes ?? [
    "Created a clearer story around the product, team, and strategic value.",
    `Focused the experience around ${caseStudy.services.join(", ").toLowerCase()} to reduce friction and improve comprehension.`,
    "Built a stronger foundation for future launches, iteration, and growth.",
  ];

  // These sections preserve the numbered narrative breakdown from the darker reference.
  const sections: StudioCaseStudySection[] =
    caseStudy.modalSections ?? [
      {
        title: "Context",
        body: `${caseStudy.title} needed a more coherent narrative across product, experience, and communication as the scope of the work expanded.`,
      },
      {
        title: "Challenge",
        body: "The opportunity was not just to ship assets, but to help the business communicate value faster and with more confidence.",
      },
      {
        title: "What we changed",
        body: "We aligned the experience, supporting systems, and communication touchpoints around what users and stakeholders needed to understand next.",
      },
      {
        title: "Outcome",
        body: "The result was a sharper story, a more usable experience, and a stronger platform for future growth decisions.",
      },
    ];

  // Proof points close the modal with concise credibility signals instead of long-form copy.
  const proofPoints: StudioCaseStudyProofPoint[] =
    caseStudy.modalProofPoints ?? [
      {
        title: "Sharpened the narrative",
        description: "Brought the product story, interaction model, and supporting experience into one clearer point of view.",
      },
      {
        title: "Reduced decision friction",
        description: "Turned scattered workflows into a more understandable path for users, operators, or internal teams.",
      },
      {
        title: "Built for what comes next",
        description: "Created a stronger base for future iteration instead of treating the engagement like a one-off delivery.",
      },
    ];

  // Gallery rows stay present even with partial content so the light layout never collapses unpredictably.
  const galleryRows: StudioCaseStudyGalleryRow[] =
    caseStudy.modalGalleryRows ?? [
      {
        title: "Selected screens",
        items: [
          {
            title: "Hero view placeholder",
            description: "Reserved for the main case-study visual or landing screen.",
          },
          {
            title: "Workflow placeholder",
            description: "Reserved for a supporting product or process screenshot.",
          },
        ],
      },
      {
        title: "Product views",
        items: [
          {
            title: "Dashboard placeholder",
            description: "Reserved for a key interface or data view.",
          },
          {
            title: "Detail placeholder",
            description: "Reserved for a secondary screen, flow, or artifact.",
          },
        ],
      },
    ];

  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      title={`${caseStudy.title} case study summary`}
      contentClassName="px-5 pb-8 pt-16 sm:px-8 lg:px-10 lg:pb-10"
    >
      <div className="relative isolate overflow-visible rounded-[1.85rem]">

        {/* Modal hero with intro copy and outcomes */}
        <div className="relative z-10 border-b border-[var(--color-border-default)]/80 pb-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.8fr)] lg:items-start">
            <div>
              <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">{caseStudy.sector}</p>
              <h3 className="mt-2 max-w-2xl font-display text-[clamp(2.25rem,4vw,4.25rem)] leading-[0.92] tracking-[-0.05em] text-[var(--neutral-950)]">
                {caseStudy.title}
              </h3>
              <p className="mt-4 max-w-2xl text-body-lg leading-8 text-[var(--color-text-secondary)]">
                {caseStudy.modalIntro ?? caseStudy.summary}
              </p>

              {/* The CTA row mirrors the dark reference but stays inside the existing light button system. */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="#process">
                    Book a Founder Call
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="rounded-full px-6">
                  <Link href="#work">View more work</Link>
                </Button>
              </div>
            </div>

            {/* The right rail keeps outcomes in the same supporting role as the dark modal. */}
            <div className="space-y-3">
              <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">Outcomes</p>
              <ul className="space-y-3 text-body-md leading-7 text-[var(--color-text-secondary)]">
                {outcomes.map((point) => (
                  <li key={point} className="flex gap-3">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-[var(--purple-500)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Visual summary and breakdown narrative */}
        <div className="relative z-10 grid gap-4 border-b border-[var(--color-border-default)]/80 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
          <PremiumSurface tone="glass" elevation="sm" blur="lg" radius="xl" className="self-start min-h-[18rem] overflow-visible border-white/42 bg-[linear-gradient(180deg,rgba(255,255,255,0.36),rgba(255,255,255,0.18))] p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)] sm:min-h-[24rem] sm:p-6 lg:sticky lg:top-6">
            <div className="relative flex h-full items-end justify-center overflow-hidden rounded-[1.1rem] border border-white/46 bg-[radial-gradient(circle_at_28%_72%,rgba(129,103,255,0.16),rgba(129,103,255,0.03)_34%,rgba(129,103,255,0)_62%),linear-gradient(160deg,rgba(255,255,255,0.34),rgba(255,255,255,0.14))] p-2 backdrop-blur-md sm:p-3">
              <div className="relative flex h-full min-h-[16rem] items-center justify-center p-8 text-[var(--neutral-700)]">
                {caseStudy.media}
              </div>
            </div>
          </PremiumSurface>

          <div className="relative min-h-[18rem] px-4 py-5 sm:min-h-[24rem] sm:p-6">
              <div className="relative space-y-5">
              <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">Case Breakdown</p>
              <div className="space-y-6">
                {sections.map((section, index) => (
                  <div key={section.title} className="pt-1">
                    <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-brand)]">0{index + 1}</p>
                    <p className="mt-2 text-heading-sm text-[var(--neutral-950)]">{section.title}</p>
                    <p className="mt-2 text-body-sm leading-7 text-[var(--color-text-secondary)]">{section.body}</p>
                  </div>
                ))}
              </div>
              </div>
          </div>
        </div>

        {/* Gallery placeholders for future case-study imagery */}
        <div className="relative z-10 space-y-6 border-b border-[var(--color-border-default)]/80 py-8">
          {galleryRows.map((row, rowIndex) => (
            <div key={row.title} className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">{row.title}</p>
                <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-brand)]">Proof layer</p>
              </div>
              <div className="grid gap-5 md:grid-cols-12 md:items-start">
                {row.items.map((item, itemIndex) => {
                  const layout = getGalleryItemClasses(rowIndex, itemIndex);
                  const galleryImage =
                    caseStudyGalleryAssets.images[(rowIndex * 2 + itemIndex) % caseStudyGalleryAssets.images.length];

                  return (
                    <div key={item.title} className={cn("space-y-3", layout.wrapper)}>
                        <div
                          className={cn(
                            "relative overflow-hidden rounded-[1.1rem] border border-white/42 bg-[radial-gradient(circle_at_70%_18%,rgba(255,202,45,0.14),rgba(255,202,45,0)_24%,rgba(255,255,255,0)_44%),linear-gradient(145deg,rgba(255,255,255,0.32),rgba(255,255,255,0.14))] shadow-[0_10px_26px_rgba(15,23,42,0.035)] backdrop-blur-md",
                            layout.frame,
                          )}
                        >
                          {/* The image fill replaces the placeholder scaffolding while preserving the premium frame treatment. */}
                          <Image
                            src={galleryImage.src}
                            alt={galleryImage.alt}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,15,25,0.08),rgba(11,15,25,0.02)_24%,rgba(255,255,255,0)_56%)]" />
                          <div className="absolute left-5 top-5 inline-flex h-10 items-center gap-2 rounded-full border border-white/44 bg-white/42 px-3 text-[0.66rem] uppercase tracking-[0.16em] text-[var(--color-text-tertiary)] shadow-[0_6px_12px_rgba(15,23,42,0.028)] backdrop-blur-md">
                            <ImageIcon className="size-3.5" strokeWidth={1.9} />
                            {caseStudyGalleryAssets.badgeLabel}
                          </div>
                      </div>
                      <div className="space-y-1 px-1">
                        <p className="text-body-lg font-semibold text-[var(--neutral-950)]">{item.title}</p>
                        <p className="max-w-xl text-body-sm leading-7 text-[var(--color-text-secondary)]">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Closing proof points reinforce the value of the work in the same final position as the dark reference. */}
        <div className="relative z-10 grid gap-5 pt-8 md:grid-cols-3">
          {proofPoints.map((point) => {
            const ProofIcon = point.icon ?? Sparkles;

            return (
              <div key={point.title} className="space-y-4 pt-1">
                <div
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "icon" }),
                    "pointer-events-none h-11 w-11 rounded-[0.95rem] border-white/80 bg-white/80 text-[var(--purple-500)] shadow-[0_10px_24px_rgba(15,23,42,0.06)]",
                  )}
                >
                  <ProofIcon className="size-4" strokeWidth={1.9} />
                </div>
                <div>
                  <p className="text-body-lg font-semibold text-[var(--neutral-950)]">{point.title}</p>
                  <p className="mt-3 max-w-sm text-body-sm leading-7 text-[var(--color-text-secondary)]">{point.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ModalShell>
  );
}




