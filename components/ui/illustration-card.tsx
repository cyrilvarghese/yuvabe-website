import type { ReactNode } from "react";

import { PremiumSurface } from "@/components/ui/premium-surface";
import { cn } from "@/lib/utils";

type IllustrationCardProps = {
  title?: string;
  body?: string;
  illustration: ReactNode;
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
  illustrationClassName?: string;
  graphicOnly?: boolean;
};

// This shared card wraps coded illustrations in the same premium dark shell used across brand-night sections.
function IllustrationCard({
  title,
  body,
  illustration,
  className,
  titleClassName,
  bodyClassName,
  illustrationClassName,
  graphicOnly = false,
}: IllustrationCardProps) {
  return (
    <PremiumSurface
      tone="brandNight"
      elevation="none"
      blur="md"
      radius="xl"
      className={cn("p-6 text-white md:p-7", className)}
    >
      {/* The content block stays compact so the illustration remains the dominant visual explanation. */}
      <div className={cn("relative z-10", graphicOnly ? undefined : "space-y-3")}>
        {graphicOnly ? null : (
          <div className="max-w-xl space-y-2">
            {title ? <h3 className={cn("text-heading-md text-white", titleClassName)}>{title}</h3> : null}
            {body ? (
              <p className={cn("max-w-2xl text-body-md text-[var(--color-text-inverse-muted)]", bodyClassName)}>
                {body}
              </p>
            ) : null}
          </div>
        )}

        {/* The illustration slot accepts arbitrary coded graphics so product-story cards can stay reusable. */}
        <div className={cn(graphicOnly ? undefined : "pt-4 md:pt-5", illustrationClassName)}>{illustration}</div>
      </div>
    </PremiumSurface>
  );
}

export { IllustrationCard, type IllustrationCardProps };
