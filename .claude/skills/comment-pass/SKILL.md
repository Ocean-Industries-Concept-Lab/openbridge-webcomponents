---
name: comment-pass
description: Rewrite the comments under a path to the repo's comment rules (why-only, ≤ 3 lines, no history, no filler). Manual only.
disable-model-invocation: true
allowed-tools: Read, Edit, Grep, Glob
---

Apply `AGENTS.md` § 2 *Comments* (including *CSS* and *Writing style*) to every
`.ts` and `.css` file under `$ARGUMENTS`.

Procedure, per file:
1. Read the file. Collect every `//` comment, `/* */` block and JSDoc.
2. For each comment decide: **delete** (restates the code, narrates a change,
   commented-out code, filler), **shorten** (keep the why, ≤ 3 lines, title
   line first, no banned phrases), or **keep**.
3. Never change code, JSDoc tags (`@property`, `@slot`, `@fires`,
   `@availableWhen`, lifecycle tags) or string literals. Never invent a why —
   if the reason is unknown, leave the comment as it is.
4. Edit the file with minimal, targeted edits.

Finish with one line per file: `<path>: deleted N, shortened N, kept N`.
