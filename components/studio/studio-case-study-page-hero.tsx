import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  CaseStudyIcon,
  resolveStudioCaseStudyDetail,
  type StudioCaseStudySummary,
} from "@/components/studio/studio-case-study-content";
import { resolveStudioCaseStudyHeroMedia } from "@/components/studio/studio-case-study-detail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StudioCaseStudyPageHeroProps = {
  caseStudy: StudioCaseStudySummary;
};

const shouldSkipImageOptimization = process.env.NODE_ENV === "development";
const caseStudyHeroLogoOverrides: Partial<Record<string, string>> = {
  "general-aeronautics": "/logos/general-aeronautics.svg",
};

// This page-only hero gives the SEO route a landing-style opening with one focused narrative instead of a hero mock card.
export function StudioCaseStudyPageHero({
  caseStudy,
}: StudioCaseStudyPageHeroProps) {
  const detail = resolveStudioCaseStudyDetail(caseStudy);
  const heroMedia = resolveStudioCaseStudyHeroMedia(caseStudy);
  const focusTags = caseStudy.services.slice(0, 3);
  const heroLogoSrc = caseStudyHeroLogoOverrides[caseStudy.id];

  return (
    <section className="relative isolate overflow-visible border-b border-[var(--color-border-default)]/80">
      {/* The page hero keeps the band, but folds it into one calmer brand wash so the rails and color feel coordinated. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 inset-y-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(252,252,253,0.93)_34%,rgba(248,248,250,0.92)_70%,rgba(248,248,250,0.95))]" />
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_18%_22%,rgba(88,41,199,0.11),rgba(255,255,255,0)_30%),radial-gradient(circle_at_76%_18%,rgba(255,202,45,0.11),rgba(255,255,255,0)_24%),radial-gradient(circle_at_62%_72%,rgba(150,136,192,0.08),rgba(255,255,255,0)_34%)]" />
        <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 px-6 md:block md:px-10">
          <div className="absolute inset-y-0 left-0 w-px bg-[linear-gradient(180deg,rgba(203,195,223,0.36),rgba(229,231,235,0.72)_20%,rgba(229,231,235,0.72)_78%,rgba(203,195,223,0.34))]" />
          <div className="absolute inset-y-0 right-0 w-px bg-[linear-gradient(180deg,rgba(250,223,144,0.34),rgba(229,231,235,0.72)_20%,rgba(229,231,235,0.72)_78%,rgba(203,195,223,0.28))]" />
        </div>
        <div className="absolute inset-x-[-14%] bottom-[-6.5rem] h-[12rem] -rotate-[8deg] bg-[linear-gradient(90deg,rgba(88,41,199,0.78),rgba(129,103,255,0.72),rgba(43,183,199,0.62),rgba(148,233,228,0.5))] md:bottom-[-8rem] md:h-[14rem] xl:bottom-[-9rem] xl:h-[16rem]" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-10 md:px-10 md:pb-18 md:pt-14">
          {/* The hero keeps the text-led story on the left and restores the right slot as a quieter brand mark panel. */}
          <div className="grid gap-12 xl:grid-cols-[minmax(0,0.92fr)_minmax(26rem,0.84fr)] xl:items-center">
            {/* The left column keeps one dominant message, one support paragraph, and one CTA cluster. */}
            <div className="xl:min-h-[27rem] xl:flex xl:flex-col xl:justify-center">
              <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
                Case Study
              </p>
              <h1 className="mt-4 max-w-[12ch] font-display text-[clamp(3.25rem,6vw,6rem)] leading-[0.92] tracking-[-0.065em] text-[var(--neutral-950)]">
                {caseStudy.title}
              </h1>
              <p className="mt-6 max-w-[36rem] text-[clamp(1.22rem,1.65vw,1.6rem)] leading-[1.45] tracking-[-0.02em] text-[var(--color-text-secondary)]">
                {detail.intro}
              </p>

              {/* The focus pills stay with the story copy so they support the CTA instead of competing with the hero visual. */}
              {focusTags.length ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {focusTags.map((service) => (
                    <Badge
                      key={`${caseStudy.id}-${service}`}
                      variant="service"
                      className="border-[var(--color-border-default)] bg-[var(--neutral-200)] px-4 py-2 text-body-sm text-[var(--color-text-inverse)] shadow-none"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/#process">
                    Start a project
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="rounded-full px-6"
                >
                  <Link href="/#work">Back to work</Link>
                </Button>
              </div>
            </div>

            {/* The right panel now shows the actual case-study visual so the hero reads like work, not a placeholder lockup. */}
            <div className="relative flex items-center xl:min-h-[27rem]">
              {heroLogoSrc ? (
                <div className="relative flex w-full items-center justify-center px-6 py-10 sm:px-10 sm:py-14">
                  <div className="relative aspect-[17/4] w-full max-w-[30rem]">
                    <Image
                      src={heroLogoSrc}
                      alt={`${caseStudy.title} logo`}
                      fill
                      sizes="(min-width: 1280px) 30rem, (min-width: 768px) 24rem, 18rem"
                      className="object-contain"
                      priority
                      unoptimized={shouldSkipImageOptimization}
                    />
                  </div>
                </div>
              ) : (
                <>
                  {/* The visual now sits in a single frame so the right side feels cleaner and less over-designed. */}
                  <div className="relative w-full rounded-[2rem] shadow-[0_28px_80px_rgba(15,23,42,0.07)]">
                    <div className="relative aspect-[1.08/1] overflow-hidden rounded-[1.8rem] border-[6px] border-[var(--neutral-100)] bg-[var(--color-background-surface-subtle)]">
                      {heroMedia.videoSrc ? (
                        <video
                          src={heroMedia.videoSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : heroMedia.visualSrc ? (
                        <Image
                          src={heroMedia.visualSrc}
                          alt={caseStudy.mockImageAlt ?? `${caseStudy.title} case study visual`}
                          fill
                          sizes="(min-width: 1280px) 34rem, (min-width: 768px) 42vw, 100vw"
                          className={cn(
                            "object-cover object-top",
                            heroMedia.imageClassName,
                          )}
                          priority
                          unoptimized={shouldSkipImageOptimization}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[var(--neutral-700)]">
                          <CaseStudyIcon iconKey={caseStudy.mediaIconKey} />
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-4 sm:p-5">
                        <div className="rounded-full border border-white/80 bg-white/92 px-3 py-1.5 text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)] shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                          Selected work
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(11,15,25,0),rgba(11,15,25,0.12))]" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
