---
applyTo: "packages/openbridge-webcomponents/src/palettes/variables.css,packages/openbridge-webcomponents/src/mixins/fonts.css,packages/openbridge-webcomponents/script/figmavariables.json,packages/openbridge-webcomponents/script/download-icons.ts,packages/openbridge-webcomponents/script/convert-icons.ts,packages/openbridge-webcomponents/script/check-icon-hex-leaks.ts,packages/openbridge-webcomponents/src/icons/**"
---

<!-- GENERATED FILE — DO NOT EDIT.
     Source: docs/agents/figma-refresh.md
     Regenerate: npm run agents:sync -w packages/openbridge-webcomponents -->

# Refreshing from Figma

The palette, the font mixins, the variable map and the icons are generated
from two Figma files and replaced wholesale. [`generated-code.md`](../../docs/agents/generated-code.md)
says what is generated and why a hand-edit is not a fix; this file is the
procedure. Run everything from `packages/openbridge-webcomponents/`.

| Target                       | Produced by                   | Source file                                | Why this file                                                                                |
| ---------------------------- | ----------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `src/palettes/variables.css` | plugin `css variables export` | OpenBridge 6.1, `kQMFf24Y1ry43HJWOStqd8`   | variable definitions and modes live here                                                     |
| `src/mixins/fonts.css`       | plugin `Font exports`         | OpenBridge 6.1                             | text styles live here                                                                        |
| `script/figmavariables.json` | plugin `variables map`        | OpenBridge Icons, `IkDwOtza6OdjLbIdWA7mI7` | keys embed the icon node ids the converter matches; the main file yields a map nothing hits  |
| `src/icons/**`               | `npm run download:icons`      | OpenBridge Icons, through the REST API     | `script/download-icons.ts` fetches, `script/convert-icons.ts` emits one Lit element per icon |

The plugin is the [obc-figma-plugin](https://github.com/Ocean-Industries-Concept-Lab/obc-figma-plugin)
(community plugin `1448419213272098259`), a Dev Mode codegen plugin: it has
no window, its output is the "Codegen Plugin" section at the bottom of the
Inspect tab, and a language dropdown in that section's header selects the
codegen. Select any node first — the panel renders nothing without a
selection, and all codegens except `variables map` read the file's local
variables and styles rather than the selected node.

## Before starting

Two prerequisites, and a missing one is a question, not a detour
([`working-method.md` § Stop](../../docs/agents/working-method.md)):

- `FIGMA_TOKEN` in `packages/openbridge-webcomponents/.env` (gitignored,
  per machine). A read-only File content token is enough. Verify against
  the icons file, not `/v1/me`, which returns 403 for a file-scoped token;
  the scripts load `.env` themselves, a shell does not:
  ```bash
  set -a; source .env; set +a
  curl -s -o /dev/null -w '%{http_code}\n' -H "X-Figma-Token: $FIGMA_TOKEN" \
    "https://api.figma.com/v1/files/IkDwOtza6OdjLbIdWA7mI7?depth=1"   # 200
  ```
- A Dev Mode seat on the file the codegen reads. A view-only seat can
  **File → Duplicate to your drafts** and run the codegen on the copy; the
  copy holds the variables as of the moment it was made, so duplicate again
  before every export and never reuse an old draft.

Order when the design team added tokens: palette export first, variable map
second, icons last. Icons generated against a stale palette reference
tokens that do not resolve or fall back to hex, and the tripwires fire.

## Palette: `variables.css` and `fonts.css`

1. Branch off `develop`, `chore/refresh-figma-…`.
2. Paste the `css variables export` output over `variables.css`, run
   `npx prettier --write src/palettes/variables.css`, and commit that as the
   first commit so the raw export is reviewable on its own.
3. `npm run palette:strip`, the same prettier command, and commit that
   second. The script (`script/palette/export.ts`) removes what the plugin
   emits and the package does not ship, and `npm run lint:palette` fails CI
   while any of it is still in the file:
   - the `@keyframes warning-blink` block and the trailing
     `:root { animation: … }` rule. Animating inherited custom properties on
     the root recalculates every node's style each second; the blink is
     driven from `src/palettes/blinking.ts` (#1116, #1134). The four
     `@property` registrations stay.
   - every `Component-size` mode outside the four documented classes
     (`regular`, `medium`, `large`, `xl`). Modes with spaces in their names
     export as descendant selectors no element can match; `desktop` is a
     40 px touch target, below the floor [`a11y.md`](../../docs/agents/a11y.md) § 7
     guarantees. A new class is a decision, then an entry in the script's
     allow-list and a row in the size-class table.
4. Diff the content, not the text — prettier wraps long `var(…)` values
   and a mode block adds thousands of lines, so `git diff` is unreadable:
   ```bash
   git show develop:packages/openbridge-webcomponents/src/palettes/variables.css > /tmp/variables.old.css
   npm run palette:diff -- /tmp/variables.old.css src/palettes/variables.css
   ```
   It prints renames (a removed name whose value reappears under one new
   name in the same block), removals, additions and value changes per
   block. A removal that is not a rename is a token consumers must lose.
5. `npm run lint:variables` names every consumer of a removed token. Follow
   renames in the consuming CSS as a third commit; a rename with an
   identical value changes no rendering, so say so in the commit.
6. `fonts.css`: paste the `Font exports` output wholesale, then
   `npm run lint:mixins`. A mixin the plugin no longer emits fails loudly
   there instead of expanding to nothing. Hand-curated mixins live in
   `src/mixins/font-extras.css`, never in `fonts.css`.
7. Run the full snapshot suite once without `--update`. A palette export
   moves on the order of a hundred baselines; attribute each failing family
   to a value in the changed list before regenerating
   ([`testing-visual.md`](../../docs/agents/testing-visual.md): filter before `--update`,
   re-run plain, check `git status` on `__vis__/` for collateral).

## Variable map: `figmavariables.json`

Regenerate only when the design team changed palette tokens or the icons
file re-synced its palette library. On the **icons** file, switch the
dropdown to `variables map` and select a page-level or multi-frame node; a
single selected icon yields only its own five to ten bindings. If the
output arrives in chunks, merge them — the same key always maps to the same
token, so order does not matter. The key anatomy and the recovery when a
re-sync changes every key are in
[`generated-code.md` § VariableID anatomy](../../docs/agents/generated-code.md#variableid-anatomy--why-a-refresh-can-lose-every-icon-colour).

## Icons

Inputs:

| File / env                             | Tracked | Notes                                                                                                      |
| -------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `.env` → `FIGMA_TOKEN`                 | no      | required for any run that calls the API                                                                    |
| `script/figmavariables.json`           | yes     | `VariableID → token` map; the converter falls back to literal hex for an unknown id                        |
| `script/.cache-figma.json`             | no      | ~30 MB raw API response, reused across runs                                                                |
| `script/.cache/icons/*.svg`            | no      | per-icon payloads, cleared each run                                                                        |
| `script/.cache/unknown-variables.json` | no      | written every run: the ids the map did not resolve, `[]` when clean                                        |
| `OBC_USE_CACHE=1`                      | —       | reuse the on-disk cache instead of calling the API; for iterating on `convert-icons.ts` or a refreshed map |
| `OBC_ALLOW_UNRESOLVED_VARS=1`          | —       | let a run with unresolved ids finish writing; `lint:icons` still fails on the hex it leaves behind         |

Steps:

1. `cp -r src/icons /tmp/icons-backup-prev` — the diff target if the run
   drops a mapping.
2. `npm run download:icons`. Expect 2000+ files and a trailing `done`.
   `Duplicate icon name <name>` lines are Figma-side duplicates
   deduplicated by overwrite; list them for the design team.
3. Tripwires, all three — the converter never emits `var(--undefined)`, so
   the grep alone proves nothing:
   ```bash
   grep -rlE 'var\(--undefined\)' src/icons/ | wc -l   # 0
   cat script/.cache/unknown-variables.json            # []
   npm run lint:icons                                   # 0 hex leaks
   ```
4. `npx prettier --write "src/icons/**/*.ts"` — raw output is unformatted
   and the diff otherwise touches every icon.
5. `npx tsc --noEmit` and `npm run lint`. A new Figma icon can collide with
   a hand-written stopgap holding the same `obi-*` tag (duplicate
   `HTMLElementTagNameMap` entry): migrate the consumers to the generated
   import and delete the stopgap; `alert-frame`'s badge icons are the
   precedent.
6. Snapshots as in the palette step; icon churn lands in the components
   that render icons in their stories (`integration-bar`, the wind family,
   the automation symbols).
7. Bundle cap: `npm run build --workspace=vue-demo` and check the largest
   chunk against the 7 MB Workbox limit
   (`workbox.maximumFileSizeToCacheInBytes`).
8. One commit, `chore: refresh icons from Figma` (or `feat:` when consuming
   components changed), with `figmavariables.json` and any
   `convert-icons.ts` change in it.

Unresolved ids, by cause:

- **Every icon leaks hex, a few dozen ids unresolved** — the icons file
  re-synced its palette library; re-derive the keys mechanically
  ([`generated-code.md`](../../docs/agents/generated-code.md#variableid-anatomy--why-a-refresh-can-lose-every-icon-colour)).
- **The token exists, the map lacks it** — re-run `variables map` on the
  icons file, replace the JSON, re-run the download.
- **The token is not in the palette yet** — file it with the design team
  and wait; the palette export comes first (#1187 is one). Shipping the
  icon anyway means `OBC_ALLOW_UNRESOLVED_VARS=1` to let the run finish and
  an explicit allowlist entry for that icon and attribute in
  `script/check-icon-hex-leaks.ts`, since the hex it leaves behind fails
  `lint:icons` otherwise; the entry goes when the palette ships.

`npm run lint:icons` (`script/check-icon-hex-leaks.ts`) fails on any literal
hex `fill`/`stroke` in `src/icons/*.ts`. It has no allowlist today; a
legitimate exception, such as a regulatory colour that must not follow the
theme, gets an explicit one there, never a sliding budget.

## Consuming components

An icon family rename or a bucket change reaches every component that
imports a specific icon. Search before assuming the change is isolated:

```bash
grep -rE "obi-<old-family>-|icon-<old-family>-" src/
```

The wind family is the worked example: `watch/environment.ts` imports each
bucket explicitly (so the PWA can tree-shake), exports the bucket lists as
`readonly` arrays and the snap helpers (`windKnotsToWindTrueBucket`,
`windKnotsToWindShaftBucket`, nearest bucket, ties to the lower one);
`wind-indicator.ts` builds the tag from the helper and prefers the CSS-colour
variant (`instance.iconCss ?? instance.icon`); the wrappers `wind.ts` and
`wind-propulsion.ts` re-export the indicator's API and need nothing. Story
`argTypes` follow any renamed property.

## Pull request

A refresh touches 1500–2000 icon files and a few hundred baselines. Commit
so each step reverts alone: raw export, strip, consumers, baselines, icons,
docs. The body points reviewers at `convert-icons.ts`,
`figmavariables.json`, the consuming components and a sample of diff images,
and lists per family which palette value moved each baseline. Numbers from
the semantic diff (renamed, removed, changed per block) belong there too.

## Open

- The plugin still emits the blink keyframes and root animation, and modes
  with spaces in their names; `palette:strip` covers for it until both are
  fixed at the source.
- `--base-categorical-*` is referenced by generated icons and absent from
  the palette export (#1187).
- Token typos in Figma (#985).
