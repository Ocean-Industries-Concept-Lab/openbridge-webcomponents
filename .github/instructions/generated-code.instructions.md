---
applyTo: "packages/openbridge-webcomponents/src/icons/**,packages/openbridge-webcomponents/src/manual-icon/**,packages/openbridge-webcomponents/src/palettes/variables.css,packages/openbridge-webcomponents/src/mixins/fonts.css,packages/openbridge-webcomponents/script/figmavariables.json,packages/openbridge-webcomponents-react/**,packages/openbridge-webcomponents-vue/**,packages/openbridge-webcomponents-ng/**,packages/openbridge-webcomponents-svelte/**"
---

<!-- GENERATED FILE — DO NOT EDIT.
     Source: docs/agents/generated-code.md
     Regenerate: npm run agents:sync -w packages/openbridge-webcomponents -->

# Generated Code — What Is, What Isn't

Most files in scope here are **produced by a generator**. A local edit to one is
not a fix: it survives until the next regeneration and is then silently
discarded, taking the change with it. Fix the problem at its source instead.

This file also attaches to the look-alikes — `src/manual-icon/` above all —
precisely so the difference is stated at the point of editing. If you are in a
file listed under [What is NOT generated](#what-is-not-generated), edit it
normally.

## What is generated, and by what

| Path                                     | Regenerate with                  | Source of truth                                            |
| ---------------------------------------- | -------------------------------- | ---------------------------------------------------------- |
| `src/icons/**` (2000+ components)        | `npm run download:icons`         | The OpenBridge Icons Figma file                            |
| `src/generated/**` _(gitignored)_        | `npm run build:translations`     | `lit localize` extraction from `msg()` calls in source     |
| `src/palettes/variables.css`             | obc-figma-plugin `cssvariables`  | OpenBridge 6.1 Figma file (variable definitions)           |
| `src/mixins/fonts.css`                   | obc-figma-plugin `font-exports`  | OpenBridge 6.1 Figma file (text styles)                    |
| `script/figmavariables.json`             | obc-figma-plugin `variables map` | OpenBridge **Icons** Figma file — not the main design file |
| `packages/openbridge-webcomponents-*/**` | `npm run wrappers`               | The core package's source JSDoc, via `lit labs gen`        |
| `custom-elements.json`                   | `npm run analyze`                | The core package's source JSDoc, via `cem analyze`         |

`custom-elements.json` is also **gitignored** — it is regenerated per checkout
rather than committed.

## Fix at the source, not in the output

- **A wrong or missing icon colour** → the `VariableID` is missing from
  `script/figmavariables.json`. Re-run the plugin's `variables map` codegen
  against the **icons** Figma file (the map keys embed icon component node IDs,
  so the main design file produces a map that silently matches nothing), then
  re-run `npm run download:icons`. See
  [IMPLEMENTATION_GUIDELINES.md § Icons](../../IMPLEMENTATION_GUIDELINES.md#-icons).
- **A missing colour token** → add it in Figma, re-run the `cssvariables`
  codegen, and replace `variables.css` wholesale. `npm run lint:variables`
  catches consumer CSS referencing tokens that do not exist, but cannot catch a
  token missing from Figma itself — that needs a designer round-trip.
- **A missing font mixin** → if the plugin does not emit it, it belongs in the
  hand-curated `src/mixins/font-extras.css`, **not** in `fonts.css`. Run
  `npm run lint:mixins` after regenerating `fonts.css`; a dropped definition
  fails loudly rather than expanding to nothing.
- **A wrong wrapper binding** (a missing `onX` prop, an undocumented slot) →
  the wrapper is a symptom. `lit labs gen` reads the **source JSDoc**, so the
  fix is a `@fires` or `@slot` tag on the component class, followed by
  `npm run wrappers`. See [`jsdoc.md`](jsdoc.md).
- **A wrong entry in `custom-elements.json`** → same: fix the source JSDoc and
  run `npm run analyze`. Never hand-edit the manifest.

## What is NOT generated

The directory names invite the wrong assumption. These are hand-written and
should be edited normally:

| Path                              | Status                                                                                                            |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `src/manual-icon/**`              | **Hand-written** Lit components. No generator writes here — the name means "manual", in contrast to `src/icons/`. |
| `src/palettes/manual.css`         | Hand-maintained tokens the Figma plugin does not emit                                                             |
| `src/palettes/critical.md`        | Hand-written notes                                                                                                |
| `src/mixins/font-extras.css`      | Hand-curated font mixins the plugin does not produce                                                              |
| `src/mixins/alert.css`            | Hand-written alert/alarm mixins                                                                                   |
| `src/mixins/base-input-field.css` | Hand-written input-field chrome                                                                                   |
| `src/mixins/card.css`             | Hand-written card surface mixin                                                                                   |
| `src/mixins/outline-inward.css`   | Hand-written focus-outline mixin                                                                                  |
| `src/mixins/scrollbar.css`        | Hand-written scrollbar mixin                                                                                      |

Of `src/mixins/`'s seven files only `fonts.css` is generated, and of
`src/palettes/`'s three only `variables.css` is. That is why this guard is
scoped file-by-file rather than by directory — a directory-wide rule here would
forbid editing files the guidelines explicitly tell you to edit.

## The wrapper packages

`packages/openbridge-webcomponents-{react,vue,ng,svelte}/` are regenerated
wholesale by `npm run wrappers`. Only `README.md` and `AGENTS.md` are preserved
across `npm run clean:full`; everything else in those directories is disposable
output.
