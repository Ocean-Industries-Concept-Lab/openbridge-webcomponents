---
name: docgen
description: The OpenAI-backed JSDoc generation CLI and its review-copy workflow
globs:
  - packages/openbridge-webcomponents/script/docgen/**
---

# Doc Generator CLI

`script/docgen/` is a small CLI that drafts JSDoc for a source file using an
OpenAI model.

| File                | Role                                                        |
| ------------------- | ----------------------------------------------------------- |
| `docs-gen.ts`       | The CLI itself                                              |
| `prompt-system.txt` | The shared system prompt                                    |
| `README.md`         | Setup, dependencies and usage                               |

It reads the `.ts` plus its sibling `.stories.ts` and `.css`, auto-detects which
of the three documentation patterns applies (concrete component, pure function
module, abstract base class), and writes a **`*.generated.ts` review copy** next
to the original.

## It never edits the original

The review-copy design is the point: output is a draft for a human to diff and
merge, not a change. Do not wire this into a build step, a lint rule, or a
pre-commit hook, and do not commit `*.generated.ts` files.

## Keep the prompt aligned with the rules

`prompt-system.txt` encodes the same conventions as
[`jsdoc.md`](jsdoc.md) — the section order, the tone rule that forbids
domain qualifiers, the `TODO(designer)` placeholder, and the structured
`@slot` / `@fires` tag block.

**When the JSDoc rules change, update the prompt too.** Nothing enforces the
link, so a rule added to `jsdoc.md` alone will be silently contradicted by every
subsequent draft. Generated output still has to pass `npm run lint:slots` like
any hand-written JSDoc.
