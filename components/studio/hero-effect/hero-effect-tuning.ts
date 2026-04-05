export type HeroInfinityCloudTuning = {
  scaleX: number;
  scaleY: number;
  zoom: number;
  particleCount: number;
  particleSpread: number;
};

export type HeroHelixTuning = {
  cycleSeconds: number;
  turns: number;
  zoom: number;
  rotationYMax: number;
  rotationXMax: number;
  horizontalShift: number;
  span: number;
  amplitudeY: number;
  amplitudeZ: number;
  spreadScale: number;
  morphStart: number;
  morphEnd: number;
};

export type HeroEffectBackdropTuning = HeroInfinityCloudTuning & {
  offsetX: number;
  offsetY: number;
};

export type HeroEffectDebugTuning = {
  backdrop: HeroEffectBackdropTuning;
  helix: HeroHelixTuning;
};

// Flip this switch when you want the live hero tuning panels visible in the hero.
export const showHeroEffectTuningPanels = true;

export const defaultHeroInfinityCloudTuning: HeroInfinityCloudTuning = {
  scaleX: 1.85,
  scaleY: 1.91,
  zoom: 1.06,
  particleCount: 21500,
  particleSpread: 0.28,
};

export const defaultHeroEffectBackdropTuning: HeroEffectBackdropTuning = {
  ...defaultHeroInfinityCloudTuning,
  offsetX: 15,
  offsetY: -50,
};

export const defaultHeroHelixTuning: HeroHelixTuning = {
  cycleSeconds: 24,
  turns: 2.17,
  zoom: 1.18,
  rotationYMax: 0.9,
  rotationXMax: 0.1,
  horizontalShift: 0.17,
  span: 1.5,
  amplitudeY: 0.43,
  amplitudeZ: 0.28,
  spreadScale: 0.54,
  morphStart: 0.08,
  morphEnd: 0.88,
};

// Fresh copies keep the debug panels editable without mutating the baked defaults.
export function createHeroEffectDebugTuning(): HeroEffectDebugTuning {
  return {
    backdrop: { ...defaultHeroEffectBackdropTuning },
    helix: { ...defaultHeroHelixTuning },
  };
}
