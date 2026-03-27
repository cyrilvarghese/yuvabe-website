# Content Schema Reference

Use this reference when writing homepage or case-study content through the script.

## Supabase Target
- Table: `content_documents`
- Primary keys: `homepage`, `case_studies`
- Project ref: `dremhlpuxcgjtkxxgfyw`

## Homepage Document Shape
```json
{
  "navigationItems": [{ "label": "About", "href": "about" }],
  "hero": {
    "headlineIntro": "Build the",
    "headlineHighlight": "right",
    "headlineLineTwo": "product faster.",
    "supportPrefix": "Clarity for founders under pressure. We help you decide what to build, ship it fast, and move toward traction with",
    "supportHighlight": "AI-first strategy, design, engineering, and growth.",
    "ctaLabel": "Talk Through Your Roadmap",
    "ctaHref": "#"
  },
  "work": {
    "eyebrow": "Work",
    "headline": "Make better bets. Ship faster.",
    "supportPrefix": "Turn roadmap bets into",
    "supportHighlight": "shipped product",
    "supportSuffix": ", sharper positioning, and faster learning with one AI-first execution partner."
  }
}
```

## Case Studies Document Shape
- Value is an array of case-study objects.
- Preserve each case study's `id` and existing structural fields.
