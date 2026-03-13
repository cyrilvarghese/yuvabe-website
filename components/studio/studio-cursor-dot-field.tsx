"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";

type StudioCursorDotFieldProps = {
  x: number;
  y: number;
  active: boolean;
  className?: string;
  columns?: number;
  rows?: number;
  influenceRadius?: number;
  pullStrength?: number;
  hoverOpacity?: number;
  dotSize?: number;
};

// This helper distributes the base field across lavender, purple, and cyan so the grid reads like a cool brand gradient.
function getBaseDotColor(normalizedX: number) {
  if (normalizedX < 0.34) {
    return "var(--lavender-500)";
  }

  if (normalizedX < 0.68) {
    return "var(--purple-500)";
  }

  return "var(--cyan-500)";
}

// This field adds a subtle motion-reactive proof texture without overpowering the case-study media.
export function StudioCursorDotField({
  x,
  y,
  active,
  className,
  columns = 22,
  rows = 14,
  influenceRadius = 24,
  pullStrength = 3,
  hoverOpacity = 0.85,
  dotSize = 2.4,
}: StudioCursorDotFieldProps) {
  const points = useMemo(
    () =>
      Array.from({ length: columns * rows }, (_, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);

        return {
          x: 6 + (col / Math.max(1, columns - 1)) * 88,
          y: 10 + (row / Math.max(1, rows - 1)) * 80,
          normalizedX: col / Math.max(1, columns - 1),
        };
      }),
    [columns, rows]
  );

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      {points.map((point, index) => {
        const dx = x - point.x;
        const dy = y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const influence = active ? Math.max(0, 1 - dist / influenceRadius) : 0;
        const eased = influence * influence;
        const pull = eased * pullStrength;
        const tx = (dx / dist) * pull;
        const ty = (dy / dist) * pull;

        return (
          <span
            key={`${point.x}-${point.y}-${index}`}
            className="absolute rounded-full transition-transform duration-100 ease-linear"
            style={{
              width: dotSize,
              height: dotSize,
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px)`,
            }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: getBaseDotColor(point.normalizedX),
                opacity: 0.18,
              }}
            />
            <span
              className="absolute inset-0 rounded-full transition-opacity duration-150 ease-out"
              style={{
                backgroundColor: "var(--green-500)",
                opacity: eased * hoverOpacity,
              }}
            />
          </span>
        );
      })}
    </div>
  );
}
