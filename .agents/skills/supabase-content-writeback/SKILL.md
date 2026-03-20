---
name: supabase-content-writeback
description: Use only when the user explicitly says "write this change into production" to persist homepage or case-study content directly to Supabase. Do not trigger for reviews, drafts, or general copy edits.
---

# Supabase Content Writeback Skill

## Objective
Persist approved marketing-content changes directly to Supabase through the MCP server so the live content source updates without touching fallback JSON unless the user asks for that too.

## Required Context
- Load `../brand-foundation/SKILL.md` first for public-facing messaging changes.
- Load `../proof-library/SKILL.md` when the update affects case-study facts or proof claims.
- Load `../marketing-website/SKILL.md` for homepage or landing-page section flow.
- Load `../copywriting/SKILL.md` when revising headlines, support copy, proof framing, or CTAs.
- Read `references/content-schema.md` before writing so the payload shape and table keys stay valid.

## Workflow
1. Confirm the user explicitly said "write this change into production".
2. Ask for a final confirmation with the exact phrase: "confirm: write into production".
3. Read the current content from Supabase before proposing or applying changes.
4. Draft or revise the copy in-memory first; do not mutate the database line-by-line while still exploring options.
5. Preserve the existing JSON shape exactly unless the user explicitly asks for a schema change.
6. Write the updated document back only after the final copy is settled and the confirmation phrase is received.
7. Re-read the written row to verify the saved payload matches what was intended.
8. Tell the user what changed, what table/key was written, and whether any local fallback JSON was intentionally left unchanged.

## Execution Paths
- Prefer MCP if the server is available and authenticated.
- If MCP is unavailable, use the local script fallback in `scripts/content-doc.js`.

## Script Usage (Fallback)
- Read:
  - `node .agents/skills/supabase-content-writeback/scripts/content-doc.js read homepage`
- Write:
  - `node .agents/skills/supabase-content-writeback/scripts/content-doc.js write homepage path/to/homepage.json`
- The script expects `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to be set.

## Guardrails
- Treat Supabase as the source of truth only for the content document being edited; do not make unrelated database changes.
- Prefer updating `content_documents.key = "homepage"` or `content_documents.key = "case_studies"` for this repo.
- Do not invent case-study facts while writing; if proof is weak, route through `proof-library` first.
- Keep writes scoped to the configured Yuvabe project and avoid broad account-level actions.
- If MCP is unavailable, use the script fallback and report that you switched execution paths.
- If the user wants a local code/file sync after the database write, do that as a separate explicit step.

## Response Pattern
- Say that the skill is using Supabase MCP writeback.
- Summarize the current content you read before editing.
- Show the proposed copy briefly when the change is substantial or risky.
- After writing, report the exact document key updated and the verification result.
