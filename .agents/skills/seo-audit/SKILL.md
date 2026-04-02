---
name: seo-audit
description: Audit technical SEO, crawlability, indexability, metadata, structured data, internal linking, and search-performance risks in code repositories. Use when Codex needs to run an SEO audit, review Next.js SEO setup, check crawl/index controls, inspect metadata or schema coverage, determine whether pages are server-rendered or heavily client-hydrated, or prioritize SEO fixes before launch.
---

# SEO Audit Skill

## Objective
Produce a repo-first SEO audit that is evidence-based, severity-ranked, and implementation-aware.

## Audit Posture
- Start with non-mutating repo inspection.
- Prefer first-party standards: Google Search Central and framework docs.
- Recommend external SEO tools only when they would materially deepen the audit.
- Treat missing evidence as uncertainty, not proof of failure.

## Default Workflow
1. Detect framework and public route surface.
2. Classify likely rendering behavior for each route.
3. Audit crawl and index controls.
4. Audit titles, descriptions, canonicals, Open Graph, and Twitter metadata.
5. Audit structured data against visible page intent.
6. Audit headings, internal linking, breadcrumbs, and image discoverability.
7. Audit performance and mobile UX risks from the codebase.
8. Produce a severity-sorted audit with a fix order and passed checks.

## Required Checks
- Route inventory and major public entrypoints
- Rendering surface: static, dynamic SSR, ISR-like, or heavily client-hydrated
- Robots, sitemap, canonical, noindex, and duplicate-control coverage
- Title, description, H1, Open Graph, Twitter, and image coverage
- JSON-LD or schema coverage and page-to-schema fit
- Navigation, breadcrumbs, anchor text, and orphan-risk pages
- Image alt coverage and media discoverability risks
- Obvious Core Web Vitals and mobile UX risks
- Monitoring readiness: Search Console, sitemap submission, rich results testing, and performance measurement recommendations where relevant

## Severity Rubric
- `Critical`: Can directly block crawling, indexing, canonical resolution, or primary search-result eligibility.
- `High`: Strongly degrades search visibility, snippet quality, or route discoverability on important pages.
- `Medium`: Meaningful weakness with clear SEO upside, but not immediately blocking.
- `Low`: Improvement opportunity, polish issue, or monitoring gap.

## Evidence Rules
- Cite exact file paths, route paths, and missing or misconfigured artifacts.
- Distinguish framework-level issues from page-level issues.
- For rendering findings, explain whether the page HTML is server-rendered first and where client interactivity enters later.
- Call out uncertainty explicitly if a live deployment or Search Console data is unavailable.

## Output Contract
- `Route inventory`
- `Findings` grouped by severity
- `Passed checks`
- `Priority fix order`
- `Recommended tool follow-ups` only when needed

For each finding include:
- Issue
- Why it matters
- Evidence
- Recommended fix
- Scope: `framework-level` or `page-level`

## Next.js Notes
- Load `references/nextjs-seo.md` when the repo uses Next.js.
- Use `scripts/route_inventory.js` to inventory App Router pages, metadata hooks, metadata files, and nearby client boundaries.
- When the user asks for current best practice or wants confirmation against the latest framework guidance, browse official docs before finalizing the audit.

## References
- Load `references/google-search-central.md` for first-party search expectations.
- Load `references/audit-rubric.md` for the category checklist and severity anchors.
- Load `references/tooling-playbook.md` when deciding whether to recommend Search Console, Rich Results Test, PageSpeed Insights, Screaming Frog, Ahrefs, or Semrush.

