import Image from "next/image";

const clients = [
  { name: "General Aeronautics", src: "/logos/general-aeronautics.svg" },
  { name: "Bevolve AI", src: "/logos/bevolve-ai.svg" },
  { name: "tvam", src: "/logos/tvam.svg" },
  { name: "KittyKat", src: "/logos/kittykat.svg" },
  { name: "AgeShift", src: "/logos/ageshift.svg" },
  { name: "Quilt.ai", src: "/logos/quilt.ai.svg" },
  { name: "NSF", src: "/logos/nsf.svg" },
  { name: "Startup-O", src: "/logos/startup-o.svg" },
  { name: "BMH", src: "/logos/bmh.svg" },
  { name: "Indic", src: "/logos/indic.svg" },
  { name: "Hemplanet", src: "/logos/hemplanet.svg" },
  { name: "Maatram", src: "/logos/maatram.svg" },
  { name: "Matrimandir", src: "/logos/matrimandir.svg" },
  { name: "Prakriti Sattva", src: "/logos/prakriti-sattva.svg" },
  { name: "Rangsutra", src: "/logos/rangsutra.svg" },
  { name: "Shraddha Yoga", src: "/logos/shraddha-yoga.svg" },
  { name: "Solitude Farm", src: "/logos/solitude-farm.svg" },
  { name: "Buglerock", src: "/logos/buglerock.svg" },
  { name: "AV Marathon", src: "/logos/av-marathon.svg" },
  { name: "CAT", src: "/logos/cat.svg" },
];

// The frame guides keep the hero background and strip edges aligned to the same centered rail.
export function StudioTrustStripGuides() {
  return (
    <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 px-6 md:block md:px-10">
      <TrustStripDivider side="left" />
      <TrustStripDivider side="right" />
    </div>
  );
}

type TrustStripGroupProps = {
  groupKey: string;
  ariaHidden?: boolean;
};

function TrustStripGroup({ groupKey, ariaHidden = false }: TrustStripGroupProps) {
  return (
    <div aria-hidden={ariaHidden ? "true" : undefined} className="marquee-group">
      {clients.map(({ name, src }) => (
        <span
          key={`${groupKey}-${name}`}
          className="inline-flex flex-none items-center"
        >
          <Image
            src={src}
            alt={name}
            width={120}
            height={36}
            unoptimized
            className="h-7 w-auto object-contain opacity-60 grayscale transition-opacity duration-200 hover:opacity-90"
          />
        </span>
      ))}
    </div>
  );
}

type TrustStripMaskProps = {
  side: "left" | "right";
};

function TrustStripMask({ side }: TrustStripMaskProps) {
  const sideClass = side === "left" ? "left-0" : "right-0";
  const gradientClass =
    side === "left"
      ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.92),rgba(255,255,255,0))]"
      : "bg-[linear-gradient(to_left,rgba(255,255,255,0.92),rgba(255,255,255,0))]";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 ${sideClass} z-10 w-24 md:w-32 ${gradientClass}`}
    />
  );
}

type TrustStripDividerProps = {
  side: "left" | "right";
};

function TrustStripDivider({ side }: TrustStripDividerProps) {
  const sideClass = side === "left" ? "left-0" : "right-0";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 ${sideClass} z-20 w-px bg-slate-200/80`}
    />
  );
}

export function StudioTrustStrip() {
  return (
    <div className="relative z-10 mt-10 border-y border-slate-200/70 bg-white/80 backdrop-blur-sm">
      {/* Section title */}
      <div className="pt-8 text-center">
        <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
          Clients We&rsquo;re Proud to Work With
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-0">
        <div className="relative overflow-hidden">
          <TrustStripMask side="left" />
          <TrustStripMask side="right" />
          <TrustStripDivider side="left" />
          <TrustStripDivider side="right" />

          <div className="marquee-viewport">
            <div className="marquee-track py-7">
              <TrustStripGroup groupKey="primary" />
              <TrustStripGroup groupKey="duplicate" ariaHidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
