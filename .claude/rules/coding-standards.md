---
paths:
  - "packages/openbridge-webcomponents/src/**/*.ts"
  - "packages/openbridge-webcomponents/src/**/*.css"
  - "packages/openbridge-webcomponents/script/**/*.ts"
  - "packages/openbridge-webcomponents/script/**/*.mjs"
  - "packages/openbridge-webcomponents/.storybook/**/*.ts"
---

<!-- GENERATED FILE — DO NOT EDIT.
     Source: docs/agents/coding-standards.md
     Regenerate: npm run agents:sync -w packages/openbridge-webcomponents -->

# Coding Standards

`AGENTS.md` § 2 carries the summary; this file is the source of truth for
comments, CSS comments, writing style, boolean naming and Storybook titles.
`npm run lint:comments` reports what breaks the comment rules.

## Comments

Write for a developer reading this file in a month, not for the reviewer of
this PR. If they would get it from the code, don't write it.

- **WHY, never WHAT.** A comment that restates the code is deleted.
- **Explanation belongs on the declaration.** Document a class, property or
  method in its JSDoc. A comment inside a method body is allowed only for a
  why that has no declaration to live on (a guard that looks removable, a
  coupling to another file) — three lines at most.
- **Three lines, at most.** Longer explanations are not comments:
  - behaviour → a `.spec.ts` test that pins it
  - CSS / layout / visual behaviour → a Storybook story; the snapshot is the doc
  - still needs prose → the story's `parameters.docs.description.story`
- **A title line, then a short paragraph** — in JSDoc, docs and CSS blocks.
  Two words of heading usually replace four lines of prose.
- **No history, no dates, no change narration** — no "previously did X",
  "since #994", "confirmed 2026-08-17", "added to fix Y". The why of a change
  goes in the commit message and the PR body; `git log` and `git blame` are
  first-class sources — use them before writing a comment.
- **State, then cite.** If a reference is used, the sentence stands alone and
  `(#1234)` is a trailing pointer, never the explanation. One per comment.
- `TODO(designer): …` marks an open design question. Any other TODO carries an
  issue: `TODO(#1234): …`.
- **Keep existing comments when refactoring** unless the change makes them
  obsolete.
- **Comment pass before done:** re-read the comments in your diff against
  these rules; delete what does not earn its lines. `npm run lint:comments`
  reports the rest.

### CSS

Comments are expected here — a declaration has no name, type or test to carry
its intent. One short line per non-obvious declaration, the reason not the
effect: `overflow: hidden; /* rotated <svg> box leaks arc pixels in wide
layouts */`. Usual suspects: `overflow`, a `position` that is really a
containing block, `display: block` on an `<svg>`, `min-width: 0`,
`!important`, `z-index`, `aspect-ratio`, and any value that must match
something elsewhere (an outline width, what a ResizeObserver or Chart.js
measures, a Figma spec). Name magic numbers as custom properties instead of
commenting them. A one-line `/* ---- Section ---- */` banner is fine in files
over ~150 lines. Same limits as TS: three lines, no history, no commented-out
declarations. Delete placeholder-only CSS files.

### Writing style (comments, JSDoc, docs, PR and issue text)

Write like a developer with two sentences to spare. Not allowed:

- filler openers and closers: "Note that", "It's important to", "It is worth
  noting", "In summary", "Overall", a closing line that restates the block
- inflated vocabulary: comprehensive, robust, seamless, leverage, utilize,
  streamline, delve, ensure(s) that, in order to, essentially, simply
- restating the name: "`getValue()` gets the value"
- decoration: emoji, bold on every other phrase, more than one em dash per
  sentence, a list of three where one item is the point
- hedging: "might potentially", "it should be noted that this may"
- chatbot artefacts: "Great question", "Certainly", "Let me", "I've"

**PRs:** summary and screenshot first, long-form at the end if needed. The PR
body is where root cause, alternatives and verification belong — long is fine
there, inline in the code it is not.

## Boolean property naming

Always name boolean properties and parameters using **positive** (affirmative) phrasing so that the default value is `false` and the "opt-in" value is `true`.

| Bad (negative)                  | Good (positive)         |
| ------------------------------- | ----------------------- |
| `disableAutoAtSetpoint = false` | `autoAtSetpoint = true` |
| `hideLabels = false`            | `showLabels = true`     |
| `hideBar = false`               | `hasBar = true`         |
| `noTooltip = false`             | `showTooltip = true`    |

**Why:** Negative booleans create double-negation confusion (`if (!disableFoo)`) and violate the Lit convention that HTML boolean attributes are absent-means-false. A positive name makes template bindings and story controls read naturally:

```html
<!-- Clear intent -->
<obc-gauge showLabels></obc-gauge>

<!-- Confusing double negative -->
<obc-gauge .hideLabels="${false}"></obc-gauge>
```

**`attribute: false` for `true`-default booleans:** Because the positive name defaults to `true`, it cannot work as an HTML boolean attribute (presence = true, absence = false — the opposite of what you want). Declare these properties with `attribute: false` so they are only settable via JavaScript:

```ts
@property({type: Boolean, attribute: false}) autoAtSetpoint = true;
```

Framework wrappers (React, Vue, Angular, Svelte) always set values via properties, so removing the attribute has no effect on wrapper consumers. For plain HTML usage, the property must be set via JavaScript (`el.autoAtSetpoint = false`).

When refactoring an existing negative boolean, also rename it in the interface, mixin/bundle, stories, and all consumer components to keep the public API consistent.

## Storybook title conventions

Story `title` and `name` fields must use **Title Case** — enforced by ESLint rule `openbridge/storybook-title-case` (auto-fixable).
See [IMPLEMENTATION_GUIDELINES.md § Storybook stories](../../IMPLEMENTATION_GUIDELINES.md#-storybook-stories) for the full convention.

The lifecycle entry in `meta.tags` (`beta` / `experimental` / `deprecated`) is
**derived from the component's class JSDoc** and must never be hand-written —
see [`jsdoc.md` § Component lifecycle tags](../../docs/agents/jsdoc.md).
