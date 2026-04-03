"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

import {
  PremiumSurface,
  type PremiumSurfaceProps,
} from "@/components/ui/premium-surface";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;
const shouldSkipImageOptimization = process.env.NODE_ENV === "development";
const mockLiftSpring = {
  type: "spring",
  stiffness: 260,
  damping: 18,
  mass: 0.72,
} as const;

export type StudioCaseStudyMockVariant = "aurora" | "sunrise" | "prism";
export type StudioCaseStudyMockCardLayout = "feature" | "compact" | "wide";
export type StudioCaseStudyMockViewport = "portrait" | "landscape";
export type StudioCaseStudyMockCardSpan = "grid" | "full";
export type StudioCaseStudyMockPresentation = "framed" | "fullImage";
export type StudioCaseStudyGradientPlacement =
  | "sunriseLeft"
  | "sunriseRight"
  | "violetDrift"
  | "northArc";

const mockCardVariantStyles: Record<
  StudioCaseStudyMockVariant,
  {
    iconAccentClassName: string;
    mockImageClassName: string;
    tone: NonNullable<PremiumSurfaceProps["tone"]>;
  }
> = {
  aurora: {
    iconAccentClassName: "bg-[rgba(245,243,255,0.88)] text-[var(--purple-500)]",
    mockImageClassName: "rounded-[1.45rem]",
    tone: "billingSunrise",
  },
  sunrise: {
    iconAccentClassName:
      "bg-[rgba(255,248,234,0.92)] text-[color:color-mix(in_srgb,var(--orange-500)_72%,var(--purple-500))]",
    mockImageClassName: "rounded-[1.55rem]",
    tone: "billingSunrise",
  },
  prism: {
    iconAccentClassName:
      "bg-[rgba(237,249,251,0.92)] text-[color:color-mix(in_srgb,var(--cyan-500)_72%,var(--purple-500))]",
    mockImageClassName: "rounded-[1.5rem] saturate-[1.03]",
    tone: "billingSunrise",
  },
};

const mockCardLayoutStyles: Record<
  StudioCaseStudyMockCardLayout,
  {
    bodyClassName: string;
    imageClassName: string;
    imageStageClassName: string;
    introClassName: string;
    mediaGroupClassName: string;
    shellClassName: string;
    summaryClassName: string;
    titleClassName: string;
  }
> = {
  // This layout config is the single source of truth for case-study card spacing and height behavior.
  // Mobile stacks naturally for better density, while desktop restores the editorial equal-height composition.
  feature: {
    bodyClassName: "gap-4 md:gap-6",
    imageClassName: "h-[20rem] sm:h-[22rem] lg:h-[24rem]",
    // The mock stage gets a smaller mobile min-height so the image sits closer to the copy.
    imageStageClassName:
      "min-h-[250px] px-0 pb-0 pt-0 sm:min-h-[300px] sm:px-2 sm:pt-2 md:min-h-[430px] md:px-4 md:pb-2 md:pt-7 lg:px-6",
    introClassName: "md:min-h-[11.25rem]",
    // Mobile keeps the media group in normal flow; desktop pushes it down to preserve the premium editorial rhythm.
    mediaGroupClassName: "space-y-4 md:mt-auto md:space-y-5",
    // Mobile uses natural height to avoid dead space, while desktop restores equal card heights for balanced rows.
    shellClassName: "h-auto px-5 py-5 sm:p-5 md:h-[640px] md:p-6 lg:p-7",
    summaryClassName: "max-w-[34ch] text-body-sm text-[var(--color-text-secondary)]",
    titleClassName: "text-heading-md text-foreground",
  },
  compact: {
    bodyClassName: "gap-3 md:gap-4",
    imageClassName: "h-[11rem] sm:h-[12rem]",
    imageStageClassName:
      "min-h-[180px] px-0 pb-0 pt-0 sm:min-h-[220px] sm:px-2 sm:pt-2 md:min-h-[250px] md:px-2 md:pt-4 lg:px-3",
    introClassName: "md:min-h-[9.5rem]",
    mediaGroupClassName: "space-y-3 md:mt-auto md:space-y-4",
    shellClassName: "h-auto px-5 py-5 sm:p-5 md:h-[520px]",
    summaryClassName:
      "max-w-[30ch] text-body-sm leading-6 text-[var(--color-text-secondary)]",
    titleClassName: "text-heading-sm text-foreground",
  },
  wide: {
    bodyClassName: "gap-0 md:gap-5",
    imageClassName: "h-[14rem] sm:h-[15rem] lg:h-[16rem]",
    imageStageClassName:
      "min-h-[220px] px-0 sm:min-h-[260px] sm:px-3 md:min-h-[300px] lg:px-5",
    introClassName: "md:min-h-[10rem] lg:min-h-[10.5rem]",
    mediaGroupClassName: "space-y-4 md:mt-auto md:space-y-5",
    shellClassName: "h-auto px-5 py-5 sm:p-5 md:h-[580px] md:p-6 lg:h-[596px] lg:p-7",
    summaryClassName:
      "max-w-[56ch] text-body-sm leading-6 text-[var(--color-text-secondary)]",
    titleClassName: "text-heading-md text-foreground",
  },
};

const mockViewportStyles: Record<
  StudioCaseStudyMockViewport,
  { frameClassName: string; imageClassName: string }
> = {
  // Viewport shape stays separate from layout so portrait and landscape cropping can change without rewriting card spacing rules.
  portrait: {
    frameClassName:
      "h-[320px] w-[200px] sm:h-[360px] sm:w-[220px] lg:h-[390px] lg:w-[240px]",
    imageClassName: "object-cover object-center",
  },
  landscape: {
    frameClassName: "aspect-[16/9] w-full",
    imageClassName: "object-cover object-center",
  },
};

const fullSpanShellOverrides: Record<StudioCaseStudyMockCardLayout, string> = {
  feature: "md:h-auto md:min-h-[40rem] lg:min-h-[40rem]",
  compact: "md:h-auto md:min-h-[30rem]",
  wide: "md:h-auto md:min-h-[40rem] lg:min-h-[40rem]",
};

const backgroundAssetShellOverrides: Record<
  StudioCaseStudyMockCardLayout,
  string
> = {
  feature: "p-4 md:p-6 lg:p-7",
  compact: "p-4 md:p-5",
  wide: "p-4 md:p-6 lg:p-7",
};

const fullSpanImageStageOverrides: Record<StudioCaseStudyMockCardLayout, string> = {
  feature: "md:min-h-[300px] md:pt-4 lg:min-h-[340px] lg:pt-6",
  compact: "md:min-h-[220px] md:pt-3",
  wide: "md:min-h-[260px] md:pt-4 lg:min-h-[300px] lg:pt-5",
};

const fullSpanViewportOverrides: Record<StudioCaseStudyMockViewport, string> = {
  portrait: "md:h-[400px] md:w-[250px] lg:h-[440px] lg:w-[275px]",
  landscape: "w-full",
};

const mockCardTextWashClassName =
  "pointer-events-none absolute inset-x-0 top-0 z-[1] h-[24rem] bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.95)_22%,rgba(255,255,255,0.7)_58%,rgba(255,255,255,0)_100%)] md:h-[26rem]";

const mockCardGradientPlacements: Record<
  StudioCaseStudyGradientPlacement,
  {
    canvasClassName: string;
    coolGlowClassName: string;
    topGlowClassName: string;
    violetGlowClassName: string;
    warmGlowClassName: string;
  }
> = {
  // These presets keep the gradient motion art-directed and repeatable instead of random on every render.
  sunriseLeft: {
    canvasClassName: "rotate-0 scale-100",
    coolGlowClassName:
      "absolute -right-[10%] bottom-[8%] h-[34%] w-[36%] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.34)_0%,rgba(43,183,199,0.18)_40%,transparent_74%)] blur-3xl",
    topGlowClassName:
      "absolute inset-x-[12%] top-[12%] h-[24%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.5)_42%,transparent_76%)] blur-3xl",
    violetGlowClassName:
      "absolute left-[20%] right-[18%] bottom-[-6%] h-[42%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.48)_0%,rgba(139,92,246,0.26)_38%,transparent_76%)] blur-3xl",
    warmGlowClassName:
      "absolute -left-[14%] bottom-[14%] h-[38%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.44)_0%,rgba(249,169,31,0.26)_40%,transparent_76%)] blur-3xl",
  },
  sunriseRight: {
    canvasClassName: "rotate-[4deg] scale-[1.03]",
    coolGlowClassName:
      "absolute -left-[12%] bottom-[12%] h-[30%] w-[34%] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.28)_0%,rgba(43,183,199,0.14)_42%,transparent_74%)] blur-3xl",
    topGlowClassName:
      "absolute inset-x-[16%] top-[9%] h-[22%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.52)_40%,transparent_74%)] blur-3xl",
    violetGlowClassName:
      "absolute left-[8%] right-[24%] bottom-[-10%] h-[44%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.46)_0%,rgba(139,92,246,0.22)_36%,transparent_74%)] blur-3xl",
    warmGlowClassName:
      "absolute -right-[16%] bottom-[18%] h-[36%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.42)_0%,rgba(249,169,31,0.24)_40%,transparent_74%)] blur-3xl",
  },
  violetDrift: {
    canvasClassName: "rotate-[-3deg] scale-[1.02]",
    coolGlowClassName:
      "absolute right-[2%] top-[38%] h-[28%] w-[32%] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.2)_0%,rgba(43,183,199,0.12)_40%,transparent_74%)] blur-3xl",
    topGlowClassName:
      "absolute inset-x-[10%] top-[10%] h-[22%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.48)_40%,transparent_74%)] blur-3xl",
    violetGlowClassName:
      "absolute left-[14%] right-[8%] bottom-[-8%] h-[48%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.5)_0%,rgba(139,92,246,0.28)_38%,transparent_76%)] blur-3xl",
    warmGlowClassName:
      "absolute -left-[8%] bottom-[-4%] h-[40%] w-[38%] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.36)_0%,rgba(249,169,31,0.2)_38%,transparent_74%)] blur-3xl",
  },
  northArc: {
    canvasClassName: "rotate-[2deg] scale-[1.04]",
    coolGlowClassName:
      "absolute -right-[4%] top-[26%] h-[26%] w-[30%] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.26)_0%,rgba(43,183,199,0.16)_40%,transparent_74%)] blur-3xl",
    topGlowClassName:
      "absolute left-[18%] right-[14%] top-[4%] h-[24%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.54)_40%,transparent_74%)] blur-3xl",
    violetGlowClassName:
      "absolute left-[22%] right-[4%] bottom-[-12%] h-[42%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.44)_0%,rgba(139,92,246,0.22)_36%,transparent_74%)] blur-3xl",
    warmGlowClassName:
      "absolute left-[2%] bottom-[2%] h-[36%] w-[44%] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.4)_0%,rgba(249,169,31,0.24)_40%,transparent_74%)] blur-3xl",
  },
};

function normalizeServiceLabel(service: string) {
  if (service === "Brand system") {
    return "Branding";
  }

  return service;
}

// Logo-led cards share one base stage, with small per-brand scale overrides only when the mark needs optical correction.
function getLogoPanelImageClass(logoSrc?: string) {
  if (logoSrc === "/assets/KK/logo.svg") {
    return "object-contain object-center scale-[0.75]";
  }

  if (logoSrc === "/assets/tvam/logo.svg") {
    return "object-contain object-center scale-[1.1]";
  }

  return "object-contain object-center";
}

export type StudioCaseStudyMockCardProps = {
  backgroundAlt?: string;
  backgroundSrc?: string;
  sector: string;
  title: string;
  summary: string;
  services: string[];
  imageSrc: string;
  imageAlt: string;
  logoSrc?: string;
  videoSrc?: string;
  imageAspectRatio?: string;
  imageClassName?: string;
  mediaShellClassName?: string;
  mockViewport?: StudioCaseStudyMockViewport;
  mockPresentation?: StudioCaseStudyMockPresentation;
  variant?: StudioCaseStudyMockVariant;
  gradientPlacement?: StudioCaseStudyGradientPlacement;
  layout?: StudioCaseStudyMockCardLayout;
  span?: StudioCaseStudyMockCardSpan;
  detailHref?: string;
  onOpenDetails?: () => void;
  className?: string;
};

// This card adapts the premium gradient mock treatment into a reusable homepage and proof pattern.
export function StudioCaseStudyMockCard({
  backgroundAlt,
  backgroundSrc,
  className,
  detailHref,
  imageAlt,
  imageAspectRatio,
  imageClassName,
  imageSrc,
  logoSrc,
  mediaShellClassName,
  videoSrc,
  gradientPlacement = "sunriseLeft",
  layout = "feature",
  mockPresentation = "framed",
  mockViewport = "portrait",
  onOpenDetails,
  sector,
  services,
  span = "grid",
  summary,
  title,
  variant = "aurora",
}: StudioCaseStudyMockCardProps) {
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const mockRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, {
    stiffness: 180,
    damping: 18,
    mass: 0.6,
  });
  const springRotateY = useSpring(rotateY, {
    stiffness: 180,
    damping: 18,
    mass: 0.6,
  });
  const transform = useMotionTemplate`perspective(1200px) rotateX(${springRotateX}deg) rotateY(${springRotateY}deg) translateY(-4px)`;
  const variantStyles = mockCardVariantStyles[variant];
  const layoutStyles = mockCardLayoutStyles[layout];
  const viewportStyles = mockViewportStyles[mockViewport];
  const gradientPlacementStyles = mockCardGradientPlacements[gradientPlacement];
  const hasBackgroundAsset = Boolean(backgroundSrc);
  const surfaceTone = hasBackgroundAsset ? "neutral" : variantStyles.tone;
  const isFullImagePresentation = mockPresentation === "fullImage";
  const shouldUseLogoPanel = Boolean(logoSrc);
  const shouldUseFramedStage = shouldUseLogoPanel || !isFullImagePresentation;
  const shouldUseWideLandscapeStage =
    shouldUseFramedStage && mockViewport === "landscape";
  const shouldUseMobileWideLandscapeStage =
    isMobileViewport && shouldUseWideLandscapeStage;
  const fullImageAspectRatio =
    imageAspectRatio ?? (mockViewport === "portrait" ? "1310 / 2708" : "16 / 9");
  const serviceTags = services.map(normalizeServiceLabel);
  const canOpenDetails = Boolean(onOpenDetails);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    // Mobile cards keep the mock fully visible because there is no hover state to recover the desktop offset.
    const syncViewportState = () => {
      setIsMobileViewport(mediaQuery.matches);
    };

    syncViewportState();
    mediaQuery.addEventListener("change", syncViewportState);

    return () => {
      mediaQuery.removeEventListener("change", syncViewportState);
    };
  }, []);

  function handleOpenDetails() {
    onOpenDetails?.();
  }

  // The image stage tilts subtly with the cursor so the mock keeps a tactile feel without changing layout.
  function handleMockPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !mockRef.current) {
      return;
    }

    const bounds = mockRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    rotateX.set((0.5 - y) * 14);
    rotateY.set((x - 0.5) * 16);
  }

  function handleMockPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      className={cn(
        "group h-full min-w-0 w-full",
        canOpenDetails ? "cursor-pointer" : undefined,
        className,
      )}
      onClick={canOpenDetails ? handleOpenDetails : undefined}
      onKeyDown={
        canOpenDetails
          ? (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleOpenDetails();
            }
          }
          : undefined
      }
      role={canOpenDetails ? "button" : undefined}
      tabIndex={canOpenDetails ? 0 : undefined}
      aria-label={canOpenDetails ? `Open ${title} case study details` : undefined}
      variants={
        shouldReduceMotion
          ? undefined
          : {
              rest: { scale: 1, y: 0 },
              hover: {
                scale: 1.014,
                y: -6,
                transition: { duration: 0.36, ease: easeOut },
              },
            }
      }
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <PremiumSurface
        tone={surfaceTone}
        elevation="lg"
        blur="none"
        radius="xl"
        className={cn(
          "w-full min-w-0 overflow-hidden border-transparent transition-[box-shadow,transform] duration-300 ease-out group-hover:shadow-[0_34px_110px_rgba(88,41,199,0.18),0_24px_70px_rgba(11,15,25,0.14)]",
          hasBackgroundAsset &&
            "border-[var(--color-border-premium-aurora)] bg-none",
          layoutStyles.shellClassName,
          hasBackgroundAsset && backgroundAssetShellOverrides[layout],
          span === "full" && fullSpanShellOverrides[layout],
        )}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
          {hasBackgroundAsset ? (
            <>
              {/* Case-study-specific background art keeps each card visually tied to its own proof instead of sharing a generic gradient. */}
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                <Image
                  src={backgroundSrc!}
                  alt={backgroundAlt ?? `${title} background artwork`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 700px"
                  className="object-cover object-center opacity-[0.65]"
                  priority={false}
                  unoptimized={shouldSkipImageOptimization}
                />
              </div>
              {/* A shared veil preserves copy legibility across the brighter custom backgrounds. */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.46)_0%,rgba(255,255,255,0.34)_34%,rgba(255,255,255,0.16)_68%,rgba(255,255,255,0.08)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18)_0%,transparent_46%)]" />
              <div className={mockCardTextWashClassName} />
            </>
          ) : (
            <>
              {/* The glow canvas uses stable presets so each card feels distinct without introducing visual randomness between reloads. */}
              <div
                className={cn(
                  "absolute inset-[-8%] transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.02]",
                  gradientPlacementStyles.canvasClassName,
                )}
              >
                <div className={gradientPlacementStyles.topGlowClassName} />
                <div className={gradientPlacementStyles.warmGlowClassName} />
                <div className={gradientPlacementStyles.violetGlowClassName} />
                <div className={gradientPlacementStyles.coolGlowClassName} />
              </div>
            </>
          )}
        </div>

        <div className={cn("relative z-10 flex h-full flex-col", layoutStyles.bodyClassName)}>
          <div
            className={cn(
              "relative flex flex-col gap-4",
              layoutStyles.introClassName,
            )}
          >
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-2">
                <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
                  {sector}
                </p>
                <h3 className={layoutStyles.titleClassName}>{title}</h3>
                <p className={layoutStyles.summaryClassName}>{summary}</p>
              </div>

              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-[var(--ds-radius-xl)] shadow-[0_10px_28px_rgba(88,41,199,0.08)] transition-transform duration-300 ease-out group-hover:scale-[1.04]",
                  variantStyles.iconAccentClassName,
                )}
              >
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleOpenDetails();
                  }}
                  className="flex size-full cursor-pointer items-center justify-center rounded-[inherit] bg-transparent"
                  aria-label={
                    canOpenDetails
                      ? `Open ${title} case study details`
                      : `Preview ${title} case study`
                  }
                >
                  <Maximize2 className="size-4" />
                </button>
              </div>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2.5">
              {serviceTags.map((service) => (
                <Badge
                  key={`${title}-${service}`}
                  variant="outline"
                  className="border-[1.5px] border-[rgba(63,42,125,0.24)] bg-[color:color-mix(in_srgb,var(--color-background-brand-subtle)_20%,white)] px-3 py-1.5 text-body-sm font-medium tracking-normal text-[var(--color-text-brand)] shadow-none backdrop-blur-0"
                >
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          {/* The media group uses tighter mobile spacing, then restores the desktop push-down behavior from md upward. */}
          <div
            className={cn(
              layoutStyles.mediaGroupClassName,
              span === "full" && "md:mt-0",
            )}
          >
            <div
              className={cn(
                "flex items-end justify-center [perspective:1400px]",
                shouldUseFramedStage
                  ? layoutStyles.imageStageClassName
                  : "min-h-0 px-0 py-0",
                span === "full" && fullSpanImageStageOverrides[layout],
              )}
            >
              <motion.div
                variants={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rest: { y: shouldUseMobileWideLandscapeStage ? 0 : 50 },
                        hover: { y: 0 },
                      }
                }
                transition={mockLiftSpring}
                className={cn(
                  shouldUseWideLandscapeStage
                    ? "relative w-full max-w-[42rem]"
                    : "relative max-w-[560px] scale-[0.8]",
                  shouldUseWideLandscapeStage &&
                    (shouldUseMobileWideLandscapeStage
                      ? "my-0"
                      : "my-1 sm:my-1.5 md:my-2"),
                  span === "full" &&
                    (shouldUseWideLandscapeStage
                      ? "max-w-[46rem]"
                      : "max-w-[680px]"),
                )}
              >
                <motion.div
                  ref={mockRef}
                  onPointerMove={handleMockPointerMove}
                  onPointerLeave={handleMockPointerLeave}
                  style={
                    shouldReduceMotion
                      ? undefined
                      : { transformStyle: "preserve-3d", transform }
                  }
                >
                  <div
                    style={
                      shouldUseFramedStage
                        ? undefined
                        : { aspectRatio: fullImageAspectRatio }
                    }
                    className={cn(
                      "relative overflow-hidden",
                      shouldUseFramedStage
                        ? [
                          "rounded-[8px]",
                          "border border-black/12 shadow-[0_1px_1px_rgba(15,23,42,0.12),0_10px_24px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.55)]",
                          viewportStyles.frameClassName,
                          span === "full" && fullSpanViewportOverrides[mockViewport],
                        ]
                        : [
                          mockViewport === "portrait"
                            ? "w-[220px] sm:w-[250px] lg:w-[280px]"
                            : "w-[300px] sm:w-[360px] lg:w-[440px]",
                          span === "full" &&
                          (mockViewport === "portrait"
                              ? "md:w-[290px] lg:w-[320px]"
                              : "md:w-[420px] lg:w-[540px]"),
                          variantStyles.mockImageClassName,
                        ],
                    )}
                  >
                  {/* Logo-led covers keep the glass frame as the shared homepage card contract once a brand mark exists. */}
                  {shouldUseLogoPanel ? (
                    <div className="relative flex h-full w-full items-center justify-center rounded-[inherit] bg-white/[0.035]">
                      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.015))]" />
                      <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.6rem-1px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]" />
                      <div className="relative h-[5rem] w-[72%] max-w-[16rem] sm:h-[5.75rem] sm:max-w-[18rem] lg:h-[6.5rem] lg:max-w-[20rem]">
                        <Image
                          src={logoSrc!}
                          alt={`${title} logo`}
                          fill
                          sizes={
                            mockViewport === "portrait"
                              ? span === "full"
                                ? "(max-width: 640px) 180px, (max-width: 1024px) 220px, 250px"
                                : "(max-width: 640px) 170px, (max-width: 1024px) 200px, 220px"
                              : span === "full"
                                ? "(max-width: 640px) 220px, (max-width: 1024px) 280px, 320px"
                                : "(max-width: 640px) 200px, (max-width: 1024px) 240px, 280px"
                          }
                          className={cn(
                            getLogoPanelImageClass(logoSrc),
                            "drop-shadow-[0_18px_40px_rgba(15,23,42,0.12)]",
                          )}
                          priority={false}
                          unoptimized={shouldSkipImageOptimization}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* The media wrapper carries the visible mock perimeter so bright covers still read as framed objects over the premium gradient shell. */}
                      {/* The optional inner media shell makes contained covers feel intentional without changing the outer card framing contract. */}
                      <div className="h-full w-full bg-white ">
                        <div
                          className={cn(
                            "relative h-full w-full overflow-hidden",
                            mediaShellClassName,
                          )}
                        >
                          {videoSrc ? (
                            <video
                              src={videoSrc}
                              autoPlay
                              muted
                              loop
                              playsInline
                              className={cn(
                                "absolute inset-0 h-full w-full",
                                isFullImagePresentation
                                  ? "object-contain object-center"
                                  : viewportStyles.imageClassName,
                                !isFullImagePresentation && variantStyles.mockImageClassName,
                                imageClassName,
                              )}
                            />
                          ) : (
                            <Image
                              src={imageSrc}
                              alt={imageAlt}
                              fill
                              sizes={
                                mockViewport === "portrait"
                                  ? span === "full"
                                    ? "(max-width: 640px) 200px, (max-width: 1024px) 250px, 275px"
                                    : "(max-width: 640px) 200px, (max-width: 1024px) 220px, 240px"
                                  : span === "full"
                                    ? "(max-width: 640px) 260px, (max-width: 1024px) 420px, 540px"
                                    : "(max-width: 640px) 260px, (max-width: 1024px) 320px, 380px"
                              }
                              className={cn(
                                isFullImagePresentation
                                  ? "object-contain object-center"
                                  : viewportStyles.imageClassName,
                                !isFullImagePresentation && variantStyles.mockImageClassName,
                                imageClassName,
                              )}
                              priority={false}
                              unoptimized={shouldSkipImageOptimization}
                            />
                          )}
                        </div>
                      </div>
                    </>
                  )}
                  </div>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </PremiumSurface>
    </motion.div>
  );
}
