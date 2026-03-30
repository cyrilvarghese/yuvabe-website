import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const premiumSurfaceVariants = cva("relative border text-foreground transition-[background-color,border-color,box-shadow,filter]", {
  variants: {
    tone: {
      brandNight:
        "isolate overflow-hidden border-[var(--color-border-brand-dark)] ds-card-brand-night text-[var(--color-text-inverse)] before:pointer-events-none before:absolute before:left-[-14%] before:top-[-18%] before:h-44 before:w-44 before:rounded-full before:bg-[radial-gradient(circle,rgba(150,136,192,0.24)_0%,rgba(150,136,192,0)_72%)] before:blur-2xl after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
      glass:
        "border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.64),rgba(255,255,255,0.38))]",
      glassSubtle: "border-white/50 bg-white/45",
      glassPillSubtle:
        "isolate overflow-hidden border-[var(--color-border-glass-pill-subtle)] ds-glass-pill-subtle text-[var(--color-text-glass-pill)] before:pointer-events-none before:absolute before:inset-x-[16%] before:top-[10%] before:h-[44%] before:rounded-full before:bg-[radial-gradient(circle,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.1)_54%,transparent_84%)] before:blur-md after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0_var(--color-highlight-glass-pill-subtle)]",
      glassPillStrong:
        "isolate overflow-hidden border-[var(--color-border-glass-pill-strong)] ds-glass-pill-strong text-[var(--color-text-glass-pill)] before:pointer-events-none before:absolute before:inset-x-[14%] before:top-[9%] before:h-[46%] before:rounded-full before:bg-[radial-gradient(circle,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_52%,transparent_82%)] before:blur-md after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0_var(--color-highlight-glass-pill-strong)]",
      brandPillViolet:
        "isolate overflow-hidden border-[var(--color-border-brand-pill)] ds-brand-pill-violet text-[var(--color-text-inverse)] before:pointer-events-none before:absolute before:inset-x-[14%] before:top-[10%] before:h-[44%] before:rounded-full before:bg-[radial-gradient(circle,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_54%,transparent_84%)] before:blur-md after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0_var(--color-highlight-brand-pill)]",
      brandPillSunrise:
        "isolate overflow-hidden border-[var(--color-border-brand-pill)] ds-brand-pill-sunrise text-[var(--color-text-inverse)] before:pointer-events-none before:absolute before:inset-x-[14%] before:top-[10%] before:h-[44%] before:rounded-full before:bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.12)_54%,transparent_84%)] before:blur-md after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0_var(--color-highlight-brand-pill)]",
      brandPillPrism:
        "isolate overflow-hidden border-[var(--color-border-brand-pill)] ds-brand-pill-prism text-[var(--color-text-inverse)] before:pointer-events-none before:absolute before:inset-x-[14%] before:top-[10%] before:h-[44%] before:rounded-full before:bg-[radial-gradient(circle,rgba(255,255,255,0.32)_0%,rgba(255,255,255,0.12)_54%,transparent_84%)] before:blur-md after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0_var(--color-highlight-brand-pill)]",
      glassPanelSubtle:
        "isolate overflow-hidden border-[var(--color-border-glass-panel-subtle)] ds-glass-panel-subtle text-[var(--color-text-glass-panel)] before:pointer-events-none before:absolute before:inset-x-[10%] before:top-[8%] before:h-[38%] before:rounded-[999px] before:bg-[radial-gradient(circle,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.18)_44%,transparent_80%)] before:blur-lg after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0_var(--color-highlight-glass-panel-subtle)]",
      tintLavender:
        "isolate overflow-hidden border-[var(--color-border-surface-tint-lavender)] ds-surface-tint-lavender text-foreground before:pointer-events-none before:absolute before:inset-x-[10%] before:top-[8%] before:h-[34%] before:rounded-[999px] before:bg-[radial-gradient(circle,rgba(255,255,255,0.64)_0%,rgba(255,255,255,0.18)_44%,transparent_80%)] before:blur-lg after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0_var(--color-highlight-surface-tint)]",
      tintCyan:
        "isolate overflow-hidden border-[var(--color-border-surface-tint-cyan)] ds-surface-tint-cyan text-foreground before:pointer-events-none before:absolute before:inset-x-[10%] before:top-[8%] before:h-[34%] before:rounded-[999px] before:bg-[radial-gradient(circle,rgba(255,255,255,0.64)_0%,rgba(255,255,255,0.18)_44%,transparent_80%)] before:blur-lg after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0_var(--color-highlight-surface-tint)]",
      tintWarm:
        "isolate overflow-hidden border-[var(--color-border-surface-tint-warm)] ds-surface-tint-warm text-foreground before:pointer-events-none before:absolute before:inset-x-[10%] before:top-[8%] before:h-[34%] before:rounded-[999px] before:bg-[radial-gradient(circle,rgba(255,255,255,0.68)_0%,rgba(255,255,255,0.18)_44%,transparent_80%)] before:blur-lg after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0_var(--color-highlight-surface-tint)]",
      tintGreen:
        "isolate overflow-hidden border-[var(--color-border-surface-tint-green)] ds-surface-tint-green text-foreground before:pointer-events-none before:absolute before:inset-x-[10%] before:top-[8%] before:h-[34%] before:rounded-[999px] before:bg-[radial-gradient(circle,rgba(255,255,255,0.64)_0%,rgba(255,255,255,0.18)_44%,transparent_80%)] before:blur-lg after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_1px_0_var(--color-highlight-surface-tint)]",
      billing:
        "isolate overflow-hidden border-[var(--color-border-premium-aurora)] ds-surface-billing-aurora [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-x-[10%] before:top-[7%] before:h-[34%] before:rounded-[999px] before:bg-[radial-gradient(circle,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.6)_40%,transparent_74%)] before:blur-2xl after:pointer-events-none after:absolute after:inset-x-[6%] after:bottom-[-18%] after:h-[48%] after:rounded-[999px] after:bg-[radial-gradient(circle,rgba(255,255,255,0.46)_0%,rgba(255,255,255,0.14)_36%,transparent_76%)] after:blur-3xl",
      billingSunrise:
        "isolate overflow-hidden border-[var(--color-border-premium-aurora)] ds-surface-billing-sunrise [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-x-[8%] before:top-[8%] before:h-[32%] before:rounded-[999px] before:bg-[radial-gradient(circle,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.54)_38%,transparent_72%)] before:blur-2xl after:pointer-events-none after:absolute after:left-[-8%] after:bottom-[-10%] after:h-[44%] after:w-[56%] after:rounded-[999px] after:bg-[radial-gradient(circle,rgba(255,255,255,0.36)_0%,rgba(255,255,255,0.12)_38%,transparent_76%)] after:blur-3xl",
      editorialSunrise:
        "isolate overflow-hidden border-[var(--color-border-premium-aurora)] ds-surface-editorial-sunrise [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:left-[6%] before:top-[7%] before:h-[28%] before:w-[52%] before:rounded-[999px] before:bg-[radial-gradient(circle,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.12)_44%,transparent_82%)] before:blur-2xl after:pointer-events-none after:absolute after:right-[-10%] after:top-[12%] after:h-[58%] after:w-[38%] after:rounded-[999px] after:bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.04)_34%,transparent_78%)] after:blur-3xl",
      billingPrism:
        "isolate overflow-hidden border-[var(--color-border-premium-aurora)] ds-surface-billing-prism [&>*]:relative [&>*]:z-10 before:pointer-events-none before:absolute before:inset-x-[10%] before:top-[8%] before:h-[32%] before:rounded-[999px] before:bg-[radial-gradient(circle,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.56)_38%,transparent_74%)] before:blur-2xl after:pointer-events-none after:absolute after:right-[-10%] after:bottom-[-14%] after:h-[46%] after:w-[56%] after:rounded-[999px] after:bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.1)_34%,transparent_76%)] after:blur-3xl",
      warm:
        "border-[color:color-mix(in_srgb,var(--purple-500)_20%,white)] bg-[color:color-mix(in_srgb,var(--purple-500)_8%,white)]",
      neutral: "border-slate-200/80 bg-white/90",
    },
    elevation: {
      none: "shadow-none",
      sm: "shadow-[0_12px_28px_rgba(15,23,42,0.07)]",
      md: "shadow-[0_20px_48px_rgba(15,23,42,0.08)]",
      lg: "shadow-[0_28px_80px_rgba(15,23,42,0.12)]",
    },
    blur: {
      none: "backdrop-blur-none",
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-xl",
    },
    radius: {
      md: "rounded-[1rem]",
      lg: "rounded-[1.5rem]",
      xl: "rounded-[2rem]",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    tone: "glass",
    elevation: "md",
    blur: "md",
    radius: "lg",
  },
});

export interface PremiumSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof premiumSurfaceVariants> {
  asChild?: boolean;
}

// This shared surface contract keeps glass, elevated, and hero-callout layers visually consistent.
function PremiumSurface({
  className,
  tone,
  elevation,
  blur,
  radius,
  asChild = false,
  ...props
}: PremiumSurfaceProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="premium-surface"
      className={cn(premiumSurfaceVariants({ tone, elevation, blur, radius }), className)}
      {...props}
    />
  );
}

export { PremiumSurface, premiumSurfaceVariants };
