"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { PremiumSurface } from "@/components/ui/premium-surface";

import {
  type HeroEffectBackdropTuning,
  type HeroHelixTuning,
} from "./hero-effect-tuning";

type StudioHeroEffectDebugControlsProps = {
  backdropTuning: HeroEffectBackdropTuning;
  helixTuning: HeroHelixTuning;
  onBackdropValueChange: (
    key: keyof HeroEffectBackdropTuning,
    value: number
  ) => void;
  onHelixValueChange: (key: keyof HeroHelixTuning, value: number) => void;
  onResetBackdrop: () => void;
  onResetHelix: () => void;
};

type SliderField<T extends object> = {
  key: keyof T;
  label: string;
  min: number;
  max: number;
  step: number;
  precision: number;
  unit?: string;
};

const backdropFields: SliderField<HeroEffectBackdropTuning>[] = [
  { key: "scaleX", label: "Path Width", min: 0.8, max: 3.2, step: 0.01, precision: 2 },
  { key: "scaleY", label: "Path Height", min: 0.8, max: 3.4, step: 0.01, precision: 2 },
  { key: "zoom", label: "View Zoom", min: 0.72, max: 1.9, step: 0.01, precision: 2 },
  { key: "particleCount", label: "Density", min: 4000, max: 36000, step: 25, precision: 0 },
  { key: "particleSpread", label: "Point Spread", min: 0.05, max: 0.42, step: 0.005, precision: 3 },
  { key: "offsetX", label: "Desktop X", min: -20, max: 42, step: 1, precision: 0, unit: "%" },
  { key: "offsetY", label: "Desktop Y", min: -80, max: 10, step: 1, precision: 0, unit: "%" },
];

const helixFields: SliderField<HeroHelixTuning>[] = [
  { key: "cycleSeconds", label: "Cycle Seconds", min: 8, max: 40, step: 0.5, precision: 1 },
  { key: "turns", label: "Turns", min: 0.6, max: 2.2, step: 0.01, precision: 2 },
  { key: "zoom", label: "Helix Zoom", min: 0.6, max: 1.8, step: 0.01, precision: 2 },
  { key: "horizontalShift", label: "Horizontal Shift", min: 0, max: 1.6, step: 0.01, precision: 2 },
  { key: "span", label: "Screen Span", min: 0.55, max: 1.5, step: 0.01, precision: 2 },
  { key: "amplitudeY", label: "Helix Height", min: 0.08, max: 0.7, step: 0.01, precision: 2 },
  { key: "amplitudeZ", label: "Helix Depth", min: 0.08, max: 0.7, step: 0.01, precision: 2 },
  { key: "rotationYMax", label: "Rotate Y", min: 0, max: 0.9, step: 0.01, precision: 2 },
  { key: "rotationXMax", label: "Rotate X", min: -0.4, max: 0.1, step: 0.01, precision: 2 },
  { key: "spreadScale", label: "Spread Tighten", min: 0.2, max: 1, step: 0.01, precision: 2 },
  { key: "morphStart", label: "Morph Start", min: 0, max: 0.45, step: 0.01, precision: 2 },
  { key: "morphEnd", label: "Morph End", min: 0.55, max: 1, step: 0.01, precision: 2 },
];

const helixSharedPointFields: SliderField<HeroEffectBackdropTuning>[] = [
  { key: "particleCount", label: "Density", min: 4000, max: 36000, step: 25, precision: 0 },
  { key: "particleSpread", label: "Point Spread", min: 0.05, max: 0.42, step: 0.005, precision: 3 },
];

function formatSliderValue(value: number, precision: number, unit?: string) {
  const formatted =
    precision === 0 ? Math.round(value).toLocaleString() : value.toFixed(precision);

  return unit ? `${formatted}${unit}` : formatted;
}

function DebugSlider<T extends object>({
  field,
  value,
  onValueChange,
}: {
  field: SliderField<T>;
  value: number;
  onValueChange: (value: number) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center justify-between gap-4">
        <span className="text-[0.72rem] font-medium uppercase tracking-[0.26em] text-[var(--color-text-secondary)]">
          {field.label}
        </span>
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          {formatSliderValue(value, field.precision, field.unit)}
        </span>
      </span>
      <input
        type="range"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={(event) => onValueChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer accent-[var(--purple-500)]"
      />
    </label>
  );
}

function DebugPanel({
  eyebrow,
  title,
  description,
  children,
  onReset,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  onReset: () => void;
}) {
  return (
    <PremiumSurface
      tone="glassPanelSubtle"
      elevation="lg"
      blur="lg"
      radius="xl"
      className="w-[18.5rem] shrink-0 border-white/60 px-5 py-5 shadow-[0_28px_80px_rgba(15,23,42,0.12)] xl:w-[19.5rem]"
    >
      {/* The header keeps the debug purpose readable without looking like an unstyled dev widget. */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
            {eyebrow}
          </p>
          <div className="space-y-1">
            <h3 className="text-[1.1rem] font-semibold leading-tight text-[var(--color-text-primary)]">
              {title}
            </h3>
            <p className="max-w-[17rem] text-sm leading-6 text-[var(--color-text-secondary)]">
              {description}
            </p>
          </div>
        </div>
        <Button type="button" variant="secondary" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      {/* Each panel uses the same stacked slider rhythm so the cloud and helix controls feel like one tool. */}
      <div className="mt-5 space-y-4">{children}</div>
    </PremiumSurface>
  );
}

export function StudioHeroEffectDebugControls({
  backdropTuning,
  helixTuning,
  onBackdropValueChange,
  onHelixValueChange,
  onResetBackdrop,
  onResetHelix,
}: StudioHeroEffectDebugControlsProps) {
  return (
    <div
      className="pointer-events-auto hidden max-w-[calc(100vw-2rem)] items-start gap-4 overflow-x-auto overflow-y-visible md:flex md:flex-row"
      onPointerDownCapture={(event) => event.stopPropagation()}
    >
      {/* The first panel owns the overall hero footprint and particle density read. */}
      <DebugPanel
        eyebrow="Hero Cloud"
        title="Infinity + Stage"
        description="Tune the shared path footprint, point density, and desktop anchor without touching the module defaults."
        onReset={onResetBackdrop}
      >
        {backdropFields.map((field) => (
          <DebugSlider
            key={String(field.key)}
            field={field}
            value={backdropTuning[field.key]}
            onValueChange={(value) => onBackdropValueChange(field.key, value)}
          />
        ))}
      </DebugPanel>

      {/* The second panel isolates the helix-only math so the morph can be refined independently from the base loop. */}
      <DebugPanel
        eyebrow="Helix Morph"
        title="Double Helix"
        description="Control the breathing loop, strand read, morph staging, and the shared point-field density that the helix inherits."
        onReset={onResetHelix}
      >
        {helixSharedPointFields.map((field) => (
          <DebugSlider
            key={`helix-shared-${String(field.key)}`}
            field={field}
            value={backdropTuning[field.key]}
            onValueChange={(value) => onBackdropValueChange(field.key, value)}
          />
        ))}

        {helixFields.map((field) => (
          <DebugSlider
            key={String(field.key)}
            field={field}
            value={helixTuning[field.key]}
            onValueChange={(value) => onHelixValueChange(field.key, value)}
          />
        ))}
      </DebugPanel>
    </div>
  );
}
