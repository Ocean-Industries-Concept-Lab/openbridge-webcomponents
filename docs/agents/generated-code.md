---
name: generated-code
description: Generated files that must never be hand-edited, and the command that regenerates each
globs:
  - packages/openbridge-webcomponents/src/icons/**
  - packages/openbridge-webcomponents/src/manual-icon/**
  - packages/openbridge-webcomponents/src/palettes/variables.css
  - packages/openbridge-webcomponents/src/mixins/fonts.css
  - packages/openbridge-webcomponents/script/figmavariables.json
  - packages/openbridge-webcomponents-react/**
  - packages/openbridge-webcomponents-vue/**
  - packages/openbridge-webcomponents-ng/**
  - packages/openbridge-webcomponents-svelte/**
---

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
| `.github/instructions/**`                | `npm run agents:sync`            | `docs/agents/*.md`                                         |
| `.github/copilot-instructions.md`        | `npm run agents:sync`            | `docs/agents/*.md`                                         |
| `.cursor/rules/**`                       | `npm run agents:sync`            | `docs/agents/*.md`                                         |
| `CLAUDE.md` _(gitignored)_               | `npm run agents:sync`            | pointer only — carries no rules of its own                 |
| `AGENTS.md` § 4 routing table            | `npm run agents:sync`            | the `globs` frontmatter of every `docs/agents/*.md`        |

`custom-elements.json` is also **gitignored** — it is regenerated per checkout
rather than committed.

## Figma token for `download:icons`

`npm run download:icons` calls the Figma REST API and reads `FIGMA_TOKEN` from
`packages/openbridge-webcomponents/.env`. The file is gitignored and
per-machine — a fresh clone or new laptop never has it.

1. Create a personal access token: figma.com → **Settings → Security →
   Personal access tokens → Generate new token**. Read-only **File content**
   scope is sufficient.
2. Put it in `packages/openbridge-webcomponents/.env`:
   `FIGMA_TOKEN=<token>`
3. Verify against the icons file, not `/v1/me` — a file-scoped token returns
   403 on `/v1/me` while working fine for the download:
   ```bash
   curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
     "https://api.figma.com/v1/files/IkDwOtza6OdjLbIdWA7mI7?depth=1" | head -c 200
   ```

The full refresh playbook (variable map, tripwires, snapshots, bundle cap)
lives in
[IMPLEMENTATION_GUIDELINES.md § Icons](../../IMPLEMENTATION_GUIDELINES.md#-icons).

## VariableID anatomy — why a refresh can "lose" every icon colour

Keys in `script/figmavariables.json` have the form
`VariableID:<library-key>/<import-id>`:

- `<library-key>` (40-hex) is the **stable** identity of the palette variable
  in the shared library. The same variable keeps this key forever.
- `<import-id>` (`45074:1379`-style) is the **per-file import instance**. When
  the icons file re-syncs its palette library, every binding gets a fresh
  import-id and none of the existing map keys match any more.

Consequences and recovery, in order:

1. A refresh where *every* icon falls back to literal hex (thousands of leak
   files, but only ~60 unresolved ids) is a library re-sync, not a converter
   bug. The unresolved ids are variables, not icons.
2. An unresolved key whose `<library-key>` already exists in the map under
   another import-id is the **same variable** — add the new key with the same
   token name. The map already contains many such duplicates; same key always
   maps to the same token.
3. Only keys with a brand-new `<library-key>` need real name resolution: the
   plugin `variables map` codegen, or `get_variable_defs` /
   `figma.variables.getVariableByIdAsync(id)` via the Figma MCP on the icons
   file. Figma names translate mechanically:
   `Color/Alert/Critical-color` → `alert-critical-color` (drop `Color/…/`
   prefix groups, kebab-case). Verify the token exists in
   `src/palettes/variables.css` or `manual.css` before mapping.
4. An unresolved id that produces **no** hex leak in `src/icons/` sits on a
   variant/override (`fillOverrideTable`) the SVG export drops — harmless to
   output, but map it anyway so the tripwire stays green.

Two more refresh gotchas:

- Raw generator output is not prettier-formatted; committed icons are. Run
  `npx prettier --write "src/icons/**/*.ts"` after a refresh or the diff
  balloons to every icon.
- A new Figma icon can collide with a hand-written stopgap component holding
  the same `obi-*` tag (duplicate `HTMLElementTagNameMap` entry fails
  `tsc`). Migrate consumers to the generated `src/icons/…` import and delete
  the stopgap — `alert-frame`'s badge icons are the precedent.

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
wholesale by `npm run wrappers`, with **two exceptions that are not generated at
all**:

| File        | Provenance                                    |
| ----------- | --------------------------------------------- |
| `README.md` | hand-written                                  |
| `AGENTS.md` | hand-written do-not-edit marker pointing here |

Both are preserved across `npm run clean:full` and negated in `.gitignore` so
they can be committed; everything else in those directories is disposable
output. Note the wrapper `AGENTS.md` files are **not** produced by
`npm run agents:sync` — that command generates the root `CLAUDE.md` and
`.github/instructions/`, not these markers. Edit them directly.
