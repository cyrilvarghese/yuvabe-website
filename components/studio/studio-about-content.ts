export type StudioAboutHeroContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  supportingLine: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  callouts: Array<{
    label: string;
    value: string;
    description: string;
  }>;
};

export type StudioAboutStoryContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  operatingPrinciples: Array<{
    title: string;
    description: string;
  }>;
};

export type StudioAboutWorkflowContent = {
  eyebrow: string;
  title: string;
  description: string;
  stages: Array<{
    label: string;
    description: string;
  }>;
};

export type StudioAboutProofContent = {
  eyebrow: string;
  title: string;
  description: string;
  entries: Array<{
    client: string;
    sector: string;
    summary: string;
  }>;
};

export type StudioAboutValuesContent = {
  eyebrow: string;
  title: string;
  description: string;
  values: Array<{
    title: string;
    description: string;
  }>;
  principles: string[];
};

export type StudioAboutTeamTeaserContent = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
};

export type StudioAboutCtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export type StudioAboutPageContent = {
  hero: StudioAboutHeroContent;
  story: StudioAboutStoryContent;
  workflow: StudioAboutWorkflowContent;
  proof: StudioAboutProofContent;
  values: StudioAboutValuesContent;
  teamTeaser: StudioAboutTeamTeaserContent;
  cta: StudioAboutCtaContent;
};

// This local content contract keeps the first About page iteration typed and easy to refine before CMS wiring.
export const studioAboutPageContent: StudioAboutPageContent = {
  hero: {
    eyebrow: "About Yuvabe",
    title: "We help founders make better",
    highlight: "bets.",
    description:
      "Yuvabe is an AI-first studio spanning strategy, design, engineering, and growth. We work with startups that need clarity on what to build, speed in how they build it, and a partner who can help turn momentum into traction.",
    supportingLine: "Rooted in Auroville. Built for ambitious teams moving fast.",
    primaryCtaLabel: "Start Your Project",
    primaryCtaHref: "/#process",
    secondaryCtaLabel: "See Our Work",
    secondaryCtaHref: "/#work",
    callouts: [
      {
        label: "Founded",
        value: "2020",
        description: "Started in Auroville with a human-centered, long-horizon way of working.",
      },
      {
        label: "Today",
        value: "AI-first studio",
        description: "Strategy, design, engineering, and growth operating as one founder-facing loop.",
      },
      {
        label: "Best fit",
        value: "0-to-1 and traction-stage startups",
        description: "Teams that need sharper decisions, faster execution, and tighter feedback loops.",
      },
    ],
  },
  story: {
    eyebrow: "Our story",
    title: "More than execution. Better judgment.",
    paragraphs: [
      "Yuvabe began in 2020 with roots in Auroville. That origin still shapes how we work today: with care, curiosity, and long-term responsibility.",
      "What changed is our focus. As building got easier, deciding what is actually worth building became the harder problem. That is where we do our best work now.",
      "We help startups narrow the signal, choose the right next move, and reconnect strategy, design, engineering, and growth into one tighter loop.",
    ],
    operatingPrinciples: [
      {
        title: "Decide faster",
        description:
          "Clarify the best next move before the roadmap drifts.",
      },
      {
        title: "Build smarter",
        description:
          "Use AI-native workflows and product depth without losing focus.",
      },
      {
        title: "Learn sooner",
        description:
          "Tie launches back to signals so the next decision is better.",
      },
    ],
  },
  workflow: {
    eyebrow: "How we work",
    title: "One team across the full loop.",
    description:
      "The strongest products are not built by isolated departments. They come from tight loops between strategy, design, engineering, and growth. That is how we work too.",
    stages: [
      {
        label: "Strategy",
        description: "Product shaping, prioritization, opportunity framing, and roadmap clarity.",
      },
      {
        label: "Design",
        description: "User experience, interfaces, prototypes, and product communication systems.",
      },
      {
        label: "Engineering",
        description: "AI-native apps, backend systems, cloud deployment, and operational tooling.",
      },
      {
        label: "Growth",
        description: "Launch support, landing pages, campaigns, analytics, and iteration around what converts.",
      },
    ],
  },
  proof: {
    eyebrow: "Proof",
    title: "Built across AI, product, and growth.",
    description:
      "Our work spans founder problems that require more than one discipline. From AI advisors and RAG-based products to wellness platforms, visual-generation workflows, and digital systems for deep-tech companies, we build where strategy and execution need to stay tightly connected.",
    entries: [
      {
        client: "TVAM",
        sector: "Health, insurance, and AI advisory tools",
        summary:
          "Built AI-powered advisor workflows with RAG, cloud deployment, secure conversation storage, vector search, and multimodal support.",
      },
      {
        client: "Bevolve",
        sector: "ESG intelligence and compliance automation",
        summary:
          "Created an AI sustainability platform for ESG reporting, compliance monitoring, and benchmarking across complex data sources.",
      },
      {
        client: "KittyKat",
        sector: "Fashion ecommerce and generative AI",
        summary:
          "Developed a product-to-model image workflow that improved output quality and scaled branded fashion visual production.",
      },
      {
        client: "AgeShift",
        sector: "AI wellness platform",
        summary:
          "Delivered a cross-platform product spanning mobile, backend, admin tooling, cloud infrastructure, and AI recommendations.",
      },
      {
        client: "General Aeronautics",
        sector: "Agricultural and defence drone technology",
        summary:
          "Supported digital experience, product UI/UX, branding, content, and marketing for a deep-tech company in motion.",
      },
    ],
  },
  values: {
    eyebrow: "Values",
    title: "The way we work still matters.",
    description:
      "Our roots shaped the standards we still hold onto. The language is sharper now, but the principles remain.",
    values: [
      {
        title: "Care",
        description:
          "Human-centered decisions, thoughtful collaboration, and respect for the people behind the product.",
      },
      {
        title: "Courage",
        description:
          "Questioning assumptions, making sharper choices, and being honest about what matters most.",
      },
      {
        title: "Creativity",
        description:
          "Finding original ways to solve hard problems across product, AI, design, and storytelling.",
      },
    ],
    principles: [
      "People first",
      "Partners in progress",
      "Attention to detail",
      "Innovation with purpose",
    ],
  },
  teamTeaser: {
    eyebrow: "Team",
    title: "Small enough to stay close. Broad enough to ship the full loop.",
    description:
      "We are structured like a tight operating partner, not a layered agency. That means founders work closer to the people shaping the product, building the system, and interpreting the signals that come back from the market.",
    points: [
      "Founder-facing collaboration instead of long handoff chains.",
      "Cross-disciplinary thinking from product strategy through launch.",
      "A studio culture shaped by curiosity, responsibility, and momentum.",
    ],
  },
  cta: {
    eyebrow: "Start the conversation",
    title: "If you need more than a vendor, talk to us.",
    description:
      "We work best with founders and teams who need clarity, momentum, and a partner who can move from strategy into execution without losing the thread.",
    primaryCtaLabel: "Start Your Project",
    primaryCtaHref: "/#process",
    secondaryCtaLabel: "See Our Work",
    secondaryCtaHref: "/#work",
  },
};
