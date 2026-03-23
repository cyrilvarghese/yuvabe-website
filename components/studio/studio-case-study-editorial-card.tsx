"use client";

import { useRef, type PointerEvent } from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { StudioCaseStudyExpandButton } from "@/components/studio/studio-case-study-expand-button";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;
const shouldSkipImageOptimization = process.env.NODE_ENV === "development";

const editorialCardVariants = cva(
  "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[color:color-mix(in_srgb,var(--lavender-200)_55%,white)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(252,252,253,0.96))] shadow-[0_18px_48px_rgba(11,15,25,0.08)]",
  {
    variants: {
      size: {
        default: "min-h-[34rem] sm:min-h-[38rem]",
        feature: "min-h-[40rem] sm:min-h-[46rem]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const artworkStageVariants = cva("relative mt-auto min-h-0 flex-1", {
  variants: {
    size: {
      default: "px-6 pb-8 pt-8 sm:px-8 sm:pb-10 sm:pt-10",
      feature: "px-6 pb-10 pt-10 sm:px-8 sm:pb-12 sm:pt-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type StudioCaseStudyEditorialCardProps = VariantProps<typeof editorialCardVariants> & {
  title: string;
  headline: string;
  subtext?: string;
  logoSrc: string;
  heroSrc: string;
  brandName: string;
  href?: string;
  onOpenDetails?: () => void;
  className?: string;
};

// This editorial card isolates the quieter poster-like case-study layout so it can be reviewed without touching the production card.
export function StudioCaseStudyEditorialCard({
  title,
  headline,
  subtext,
  logoSrc,
  heroSrc,
  brandName,
  href,
  onOpenDetails,
  size,
  className,
}: StudioCaseStudyEditorialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const borderGlowInset = 56;
  const glowX = useMotionValue(340);
  const glowY = useMotionValue(220);
  const borderOpacity = useMotionValue(0);
  const borderGlow = useMotionTemplate`radial-gradient(300px circle at ${glowX}px ${glowY}px, rgba(255,202,45,0.18), rgba(249,169,31,0.06) 10%, rgba(104,56,255,0.98) 24%, rgba(88,41,199,0.94) 46%, rgba(120,86,223,0.72) 64%, rgba(150,136,192,0.24) 80%, rgba(88,41,199,0.04) 92%, rgba(88,41,199,0) 100%)`;
  const canOpenDetails = Boolean(onOpenDetails);

  // This shared opener keeps the preview component aligned with the production card's detail action model.
  function handleOpenDetails() {
    onOpenDetails?.();
  }

  // The cursor-tracked border glow keeps the editorial card aligned with the production case-study hover system.
  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !cardRef.current) {
      return;
    }

    const bounds = cardRef.current.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const clampedX = Math.min(Math.max(localX, borderGlowInset), bounds.width - borderGlowInset);
    const clampedY = Math.min(Math.max(localY, borderGlowInset), bounds.height - borderGlowInset);

    glowX.set(clampedX);
    glowY.set(clampedY);
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("h-full", href || canOpenDetails ? "cursor-pointer" : undefined)}
      onPointerMove={handlePointerMove}
      onClick={canOpenDetails && !href ? handleOpenDetails : undefined}
      onKeyDown={
        canOpenDetails && !href
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleOpenDetails();
              }
            }
          : undefined
      }
      role={canOpenDetails && !href ? "button" : undefined}
      tabIndex={canOpenDetails && !href ? 0 : undefined}
      aria-label={canOpenDetails && !href ? `Open ${title} case study details` : undefined}
      onHoverStart={() => {
        if (!shouldReduceMotion) {
          borderOpacity.set(1);
        }
      }}
      onHoverEnd={() => {
        borderOpacity.set(0);
      }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.012, y: -4 }}
      transition={{ duration: 0.36, ease: easeOut }}
    >
      <Card className={cn(editorialCardVariants({ size }), className)}>
        {/* The animated shell turns the pointer glow into the same border-only response used by the production case-study card. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] p-[2px]"
          style={{ background: borderGlow, opacity: borderOpacity }}
          transition={{ duration: 0.28, ease: easeOut }}
        >
          <div className="h-full w-full rounded-[calc(1.75rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(252,252,253,0.96))]" />
        </motion.div>

        {/* The soft rim keeps the new poster card feeling premium while staying quieter than the current hover-heavy version. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_0_0_0_1px_rgba(255,255,255,0.4),0_0_0_1px_rgba(255,255,255,0.16)]"
        />

      {/* The top row keeps the short editorial headline and open action aligned together, matching the intended single-row composition. */}
      <div className="relative z-10 flex items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
        <div className="max-w-[28rem] flex-1">
          <h3 className="font-display text-[clamp(1.5rem,2vw,2rem)] leading-[1.05] tracking-[-0.03em] text-[var(--neutral-950)]">
            {headline}
          </h3>

          {/* The supporting line reuses the live case-study summary so the experimental card stays grounded in the same proof. */}
          {subtext ? (
            <p className="mt-3 max-w-[24rem] text-body-sm leading-6 text-muted-foreground">
              {subtext}
            </p>
          ) : null}
        </div>

        <StudioCaseStudyExpandButton title={title} href={href} onOpenDetails={handleOpenDetails} stopPropagation />
      </div>

      {/* The logo row anchors brand recognition high in the layout before the larger visual takes over. */}
      <div className="relative z-10 px-5 pt-5 sm:px-6 sm:pt-6">
        <div className="relative h-10 w-[9.5rem] sm:h-11 sm:w-[10.5rem]">
          <Image
            src={logoSrc}
            alt={`${brandName} logo`}
            fill
            sizes="168px"
            className="object-contain object-left"
            unoptimized={shouldSkipImageOptimization}
          />
        </div>
      </div>

      {/* The outer body color washes sit on the card itself so the artwork reads as floating above the background, not boxed inside it. */}
      <div aria-hidden="true" className="studio-editorial-proof-violet absolute left-[-1.2rem] top-[48%] h-[13rem] w-[9.5rem] rounded-[3rem] sm:left-[-1.5rem] sm:h-[15rem] sm:w-[11rem]" />
      <div aria-hidden="true" className="studio-editorial-proof-warm absolute left-[0.3rem] top-[58%] h-[11rem] w-[8.5rem] rounded-[3rem] sm:left-[0.5rem] sm:h-[13rem] sm:w-[10rem]" />
      <div aria-hidden="true" className="studio-editorial-proof-violet absolute right-[-1rem] top-[46%] h-[12rem] w-[9rem] rounded-[3rem] sm:right-[-1.25rem] sm:h-[14rem] sm:w-[10.5rem]" />
      <div aria-hidden="true" className="studio-editorial-proof-warm absolute right-[0.4rem] top-[58%] h-[11rem] w-[8rem] rounded-[3rem] sm:right-[0.75rem] sm:h-[13rem] sm:w-[9.5rem]" />
      <div aria-hidden="true" className="studio-editorial-proof-floor absolute inset-x-[18%] bottom-[8%] top-[60%] rounded-[2.5rem]" />

      {/* The artwork stage stays visually clean so the image reads as a hero asset floating over the outer card-body gradient. */}
        <div className={cn(artworkStageVariants({ size }))}>
          <motion.div
            className="relative z-10 flex h-full items-center justify-center"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
            transition={{ duration: 0.36, ease: easeOut }}
          >
            <div className="relative h-full w-full max-w-[20rem] sm:max-w-[22rem]">
              <Image
                src={heroSrc}
                alt={`${brandName} brand artwork`}
                fill
                sizes="(min-width: 1280px) 320px, (min-width: 768px) 45vw, 80vw"
                className="object-contain drop-shadow-[0_20px_44px_rgba(15,23,42,0.12)]"
                unoptimized={shouldSkipImageOptimization}
              />
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
