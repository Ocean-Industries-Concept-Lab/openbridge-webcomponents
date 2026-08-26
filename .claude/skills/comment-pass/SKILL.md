---
name: comment-pass
description: Rewrite the comments under a path to the repo's comment rules (why-only, ≤ 3 lines, no history, no filler). Manual only.
disable-model-invocation: true
allowed-tools: Read, Edit, Grep, Glob
---

Apply `docs/agents/coding-standards.md` (*Comments*, *CSS*, *Writing style*) to every
`.ts` and `.css` file under `$ARGUMENTS`.

Procedure, per file:
1. Read the file. Collect every `//` comment, `/* */` block and the JSDoc of
   methods and fields.
2. For each comment decide: **delete** (restates the code, narrates a change,
   commented-out code, filler), **shorten** (keep the why, ≤ 3 lines, title
   line first, no banned phrases), or **keep**.
3. Class and module JSDoc blocks are the documentation contract
   (`docs/agents/jsdoc.md`): never delete or shorten them; only apply the
   *Writing style* ban list to their prose.
4. Never change code, JSDoc tags (`@property`, `@slot`, `@fires`,
   `@availableWhen`, lifecycle tags) or string literals. Never invent a why —
   if the reason is unknown, leave the comment as it is.
5. Edit the file with minimal, targeted edits.

Finish with one line per file: `<path>: deleted N, shortened N, kept N`.
