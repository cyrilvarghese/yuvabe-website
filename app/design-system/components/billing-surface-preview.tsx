"use client";

import { useRef, type PointerEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { PremiumSurface, type PremiumSurfaceProps } from "@/components/ui/premium-surface";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const caseStudyMockVariants: Array<{
  sector: string;
  title: string;
  summary: string;
  services: string[];
  imageSrc: string;
  imageAlt: string;
  mockFrameClassName: string;
  mockImageClassName: string;
  noteAccentClassName: string;
  tone: NonNullable<PremiumSurfaceProps["tone"]>;
}> = [
  {
    sector: "Aviation technology",
    title: "General Aeronautics",
    summary: "Turned a complex drone portfolio into a clearer digital story buyers, partners, and operators could trust faster.",
    services: ["Positioning", "UX/UI", "Brand system"],
    imageSrc: "/assets/GA_cover.png",
    imageAlt: "General Aeronautics mobile product mock",
    mockFrameClassName:
      "mx-auto w-full max-w-[13.5rem] rounded-[2rem] border border-white/72 bg-white/66 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.16)] backdrop-blur-sm",
    mockImageClassName: "rounded-[1.45rem]",
    noteAccentClassName: "bg-[rgba(245,243,255,0.88)] text-[var(--purple-500)]",
    tone: "billing",
  },
  {
    sector: "ESG intelligence",
    title: "Bevolve.ai",
    summary:
      "Turned fragmented sustainability reporting into an AI-guided system teams could trust for faster, evidence-based decisions.",
    services: ["AI integration", "ML", "ESG reporting"],
    imageSrc: "/assets/Bevolve_cover.png",
    imageAlt: "Bevolve.ai product experience mock",
    mockFrameClassName:
      "mx-auto w-full max-w-[13.8rem] rounded-[2.2rem] border border-white/72 bg-[rgba(255,255,255,0.62)] p-3 shadow-[0_30px_86px_rgba(240,78,40,0.18)] backdrop-blur-sm rotate-[-4deg] origin-bottom",
    mockImageClassName: "rounded-[1.55rem]",
    noteAccentClassName: "bg-[rgba(255,248,234,0.92)] text-[color:color-mix(in_srgb,var(--orange-500)_72%,var(--purple-500))]",
    tone: "billingSunrise",
  },
  {
    sector: "Aviation technology",
    title: "General Aeronautics Ops",
    summary:
      "Extended the case-study system into clearer interface and proof layers that made the product story feel more tangible and scalable.",
    services: ["Product UX", "Interface direction", "Campaign assets"],
    imageSrc: "/assets/GA_bg.png",
    imageAlt: "General Aeronautics interface and proof layer mock",
    mockFrameClassName:
      "mx-auto w-full max-w-[13.75rem] rounded-[2.1rem] border border-white/72 bg-[rgba(255,255,255,0.64)] p-3 shadow-[0_28px_82px_rgba(43,183,199,0.16)] backdrop-blur-sm",
    mockImageClassName: "rounded-[1.5rem] saturate-[1.03] object-cover",
    noteAccentClassName: "bg-[rgba(237,249,251,0.92)] text-[color:color-mix(in_srgb,var(--cyan-500)_72%,var(--purple-500))]",
    tone: "billingPrism",
  },
];

type CaseStudyMockCardProps = (typeof caseStudyMockVariants)[number];

// This shared specimen keeps the layout stable so the review stays focused on the mock framing and gradient direction.
function GradientMockCard({ imageAlt, imageSrc, mockFrameClassName, mockImageClassName, noteAccentClassName, sector, services, summary, title, tone }: CaseStudyMockCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const mockRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 18, mass: 0.6 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 18, mass: 0.6 });
  const transform = useMotionTemplate`perspective(1200px) rotateX(${springRotateX}deg) rotateY(${springRotateY}deg) translateY(-4px)`;
  const serviceLabel = services.join(" • ");

  // This pointer tracker tilts only the mock frame so the card stays calm while the artifact feels interactive.
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

  // This reset keeps the tilt from sticking once the pointer leaves the mock.
  function handleMockPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { scale: 1.014, y: -6 }}
      transition={{ duration: 0.36, ease: easeOut }}
      className="group h-full"
    >
      <PremiumSurface
        tone={tone}
        elevation="lg"
        blur="none"
        radius="xl"
        className="min-h-[760px] border-[color:color-mix(in_srgb,var(--lavender-200)_56%,white)] p-5 transition-[box-shadow,transform] duration-300 ease-out group-hover:shadow-[0_34px_110px_rgba(88,41,199,0.18),0_24px_70px_rgba(11,15,25,0.14)] sm:p-6 md:p-7"
      >
        {/* These internal glow layers keep the lower-half color field vivid even once a real mock is placed on top. */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
          <div className="absolute inset-x-[12%] top-[12%] h-[24%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.5)_42%,transparent_76%)] blur-3xl" />
          <div className="absolute -left-[14%] bottom-[14%] h-[38%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.44)_0%,rgba(249,169,31,0.26)_40%,transparent_76%)] blur-3xl" />
          <div className="absolute left-[20%] right-[18%] bottom-[-6%] h-[42%] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.48)_0%,rgba(139,92,246,0.26)_38%,transparent_76%)] blur-3xl" />
          <div className="absolute -right-[10%] bottom-[8%] h-[34%] w-[36%] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.34)_0%,rgba(43,183,199,0.18)_40%,transparent_74%)] blur-3xl" />
        </div>

        <div className="relative z-10 flex h-full flex-col gap-6">
          {/* The header mirrors the case-study card structure with sector, title, and summary. */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">{sector}</p>
                <h3 className="text-heading-md text-foreground">{title}</h3>
                <p className="max-w-[34ch] text-body-sm text-[var(--color-text-secondary)]">{summary}</p>
              </div>

              <div className={`flex size-11 shrink-0 items-center justify-center rounded-[var(--ds-radius-xl)] shadow-[0_10px_28px_rgba(88,41,199,0.08)] transition-transform duration-300 ease-out group-hover:scale-[1.04] ${noteAccentClassName}`}>
                <Maximize2 className="size-4" />
              </div>
            </div>
          </div>

          {/* The image stage keeps the card shell stable while the mock itself handles the 3D hover response. */}
          <div className="mt-auto space-y-5">
            <div className="flex min-h-[460px] items-end justify-center px-4 pb-2 pt-8 sm:px-6 [perspective:1400px]">
              <motion.div
                ref={mockRef}
                onPointerMove={handleMockPointerMove}
                onPointerLeave={handleMockPointerLeave}
                style={shouldReduceMotion ? undefined : { transformStyle: "preserve-3d", transform }}
                className={cn(
                  mockFrameClassName,
                  "relative transition-[box-shadow] duration-300 ease-out group-hover:shadow-[0_34px_110px_rgba(11,15,25,0.22)]",
                )}
              >
                <div className="overflow-hidden rounded-[1.6rem] bg-[rgba(17,24,39,0.05)]">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={402}
                    height={804}
                    className={cn("h-auto w-full", mockImageClassName)}
                    priority={false}
                  />
                </div>
              </motion.div>
            </div>

            {/* The footer pill now carries service tags so the layout feels like a real case-study card. */}
            <PremiumSurface
              tone="neutral"
              elevation="sm"
              blur="none"
              radius="lg"
              className="mx-auto flex w-full max-w-[30rem] items-center justify-between gap-3 border-white/70 bg-white/88 px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.08)] transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:shadow-[0_22px_54px_rgba(15,23,42,0.12)]"
            >
              <p className="text-body-sm text-[var(--color-text-secondary)]">{serviceLabel}</p>
              <span className={`flex size-8 shrink-0 items-center justify-center rounded-full ${noteAccentClassName}`}>
                <ArrowUpRight className="size-4" />
              </span>
            </PremiumSurface>
          </div>
        </div>
      </PremiumSurface>
    </motion.div>
  );
}

// This preview compares three gradient directions around real case-study content so the system reads like production proof instead of placeholder art.
export function BillingSurfacePreview() {
  return (
    <section className="space-y-6">
      {/* The section intro clarifies that these are case-study mock cards built on the premium gradient surface system. */}
      <div className="max-w-4xl space-y-2">
        <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">Premium / Gradient case-study cards</p>
        <h2 className="text-heading-lg text-foreground">Three image-led directions</h2>
        <p className="text-body-md text-muted-foreground">
          These cards preserve the premium mockup layout, but the content now follows the real case-study card model with sector labels, project names, summaries, and service tags.
        </p>
      </div>

      {/* The responsive grid keeps the variants comparable at a glance while still collapsing cleanly on smaller screens. */}
      <div className="grid gap-6 xl:grid-cols-3">
        {caseStudyMockVariants.map((variant) => (
          <GradientMockCard key={`${variant.sector}-${variant.title}`} {...variant} />
        ))}
      </div>
    </section>
  );
}

