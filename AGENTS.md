# AGENTS.md — Universal AI Agent Instructions

> **Canonical source of truth** for every AI coding assistant that operates in
> this repository (GitHub Copilot, Cursor, Cline, Aider, Windsurf, Codex,
> OpenAI Codex CLI, or any other agent that reads `AGENTS.md`).

**Quick nav:** [Overview](#1-repository-overview) · [Coding Standards](#2-coding-standards) · [JSDoc](#3-documentation-rules-jsdoc) · [Instructions](#4-path-scoped-instruction-files) · [Build & Test](#5-build-test--run) · [SVG](#6-svg-component-guidelines) · [CSS](#7-css--postcss-reference) · [Behavioral Rules](#8-behavioral-rules-for-ai-agents) · [Related Docs](#9-related-documentation)

---

## 1. Repository Overview

| Item              | Value                                                                                                                     |
| ----------------- |---------------------------------------------------------------------------------------------------------------------------|
| Name              | **Openbridge Web Components**                                                                                             |
| Repo              | `Ocean-Industries-Concept-Lab/openbridge-webcomponents`                                                                   |
| License           | Apache-2.0                                                                                                                |
| Runtime           | Lit 3 + TypeScript (web components)                                                                                       |
| Package manager   | npm (workspaces)                                                                                                          |
| Monorepo packages | `openbridge-webcomponents` (core), `-react`, `-vue`, `-ng`, `-svelte` (auto-generated wrappers), `react-demo`, `vue-demo` |

The library provides maritime navigation and automation UI components.
Framework wrappers are **auto-generated** — never edit them directly.

### Source Directory Layout

All paths below are relative to `packages/openbridge-webcomponents/`.

| Directory                     | Contents                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------- |
| `src/components/`             | General UI components (buttons, cards, top-bar, etc.)                            |
| `src/navigation-instruments/` | Instruments (compass, heading, gauge, etc.) and indicators (bearing, speed, ROT) |
| `src/building-blocks/`        | SVG-based low-level instrument pieces (scales, bars, chart bases)                |
| `src/bars-graphs/`            | Chart components (line graph, area graph, donut, pie, polar, radial-bar)         |
| `src/automation/`             | Automation system components (valves, pumps, motors, etc.)                       |
| `src/ar/`                     | Augmented reality components                                                     |
| `src/icons/`                  | Auto-generated icon components (do not edit manually)                            |
| `src/svghelpers/`             | Shared SVG utility functions and mixins                                          |
| `src/charthelpers/`           | Shared chart utility functions                                                   |

---

## 2. Coding Standards

- **Language:** TypeScript strict mode. English-only identifiers and comments.
- **Components:** Extend `LitElement`; register with `@customElement('obc-…')`. Import `customElement` from `src/decorator.js` (local wrapper), **not** from `lit/decorators.js` — enforced by ESLint rule `prefer-local-decorator`.
- **Styles:** PostCSS (`.css` files). One global palette in `src/palettes/variables.css`; all other CSS in component folders. Use `@mixin style` for elevation variants. Text: `@mixin font-body`, `@mixin font-label`, etc.
- **No inline comments** unless the code is extremely unusual and impossible to understand without explanation.
- **Only comment a property** if the name is not self-explanatory.
- **Conventional Commits** for git messages and **Pull Request titles** (`feat:`, `fix:`, `feat!:`, etc.). An automated linting process validates PR titles.
- Ask for clarification (e.g. a list of questions) before implementing significant changes.

### Boolean property naming

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

### Storybook title conventions

Story `title` and `name` fields must use **Title Case** — enforced by ESLint rule `openbridge/storybook-title-case` (auto-fixable).
See [IMPLEMENTATION_GUIDELINES.md § Storybook stories](IMPLEMENTATION_GUIDELINES.md#-storybook-stories) for the full convention.

---

## 3. Documentation Rules (JSDoc)

Full template and detailed rules live in `.cursor/rules/comments.mdc`.
Key points:

1. **One-line summary** with the tag name and a brief description.
2. **Features / Variants** — bullet list of capabilities and configuration options.
3. **Usage Guidelines** — when and how to use the component; contrast with similar components.
4. **Slots** — table of slot names, conditions, and purposes.
5. **Events** — `@fires` tags for every custom event.
6. **No `@property` tags** in the JSDoc block — properties are documented inline above their field declarations.
7. **Tone:** Do NOT mention "maritime", "industrial", "bridge", or domain qualifiers; keep text domain-agnostic.
8. If purpose is unclear, insert `**TODO(designer)**` instead of guessing.
9. **`@availableWhen` for conditional properties** — see below.

### Slots and events are manifest-critical (`@slot` / `@fires`)

`custom-elements.json` is generated by `cem analyze`, and downstream tooling —
the framework wrappers (`-react`, `-vue`, `-ng`, `-svelte`), IDE autocomplete,
Storybook autodocs, and code playgrounds — reads **only** that manifest. The two
tags behave differently, and both are easy to get silently wrong (issue #1033):

- **Slots are detected ONLY from `@slot` tags.** The analyzer never reads
  `<slot>` elements in the template. A `<slot name="leading-icon">` with no
  `@slot leading-icon` tag is **invisible** to every consumer even though it
  works at runtime — this is the exact "wrappers don't know about the slot" bug.
  Every rendered `<slot>`/`<slot name="…">` needs a matching `@slot` tag (`@slot -`
  for the default slot).
- **Do not confuse a slot with a projection.** `<slot name="x">` **exposes** a
  slot to _your_ consumers. `<el slot="x">` (a `slot` attribute on a non-`<slot>`
  element) **projects** that element _into a child_ component's slot — it exposes
  nothing. Writing `@slot x` for a projection creates a **phantom** slot (a
  documented control that does nothing). Only tag real `<slot>` elements.
- **Dynamic slot names** (`<slot name="tab-${id}-icon">`) can't be enumerated;
  document them once with a placeholder, e.g. `@slot tab-<id>-icon`.
- **Events ARE auto-detected** from `this.dispatchEvent(new CustomEvent('x'))`, so
  they appear in the manifest even without a tag — but **with an empty
  description**. Always add a `@fires x {Type} description` tag so the event is
  described. (`@fires x …` and `@fires {Type} x …` orders are both accepted.)
- **Inherited slots/events:** the `@slot`/`@fires` tag must live on the concrete
  `@customElement` class, because CEM emits one manifest entry per registered
  element. A subclass that renders slots via its base class's `render()` still
  needs its own tags.

Run **`npm run lint:slots`** (part of `npm run lint`) to catch missing/phantom
`@slot` tags and undocumented events automatically.

### Conditional properties (`@availableWhen`)

A property whose value only has an observable effect when **another** property is set a certain way is a _conditional property_. Document the dependency with an `@availableWhen` tag in the property's inline JSDoc, directly above its `@property` declaration:

```ts
@property({type: Boolean}) alert = false;
/** @availableWhen alert==true */
@property({type: String}) alertFrameStatus: AlertType = AlertType.Alarm;
/** @availableWhen alert==true && alertFrameType in [LargeSideFlip, BottomFlip, TopFlip] */
@property({type: Boolean, attribute: false}) showAlertCategoryIcon = true;
```

Syntax:

- **Boolean:** `@availableWhen showFoo==true` or `@availableWhen showFoo==false`.
- **Enum / string equality:** `@availableWhen type==label` — use the declared value, **no quotes**.
- **Enum / string inequality:** `@availableWhen state!=overlapped` — handy for "all values except one".
- **Set membership:** `@availableWhen type in [LargeSideFlip, BottomFlip, TopFlip]` — use the **enum member identifier names**, not the string values.
- **Non-empty string:** `@availableWhen label!=''` — for `string` props (default `''`) that gate another prop by being non-empty.
- **Defined / non-null:** `@availableWhen courseArrowPx!=undefined` (for `X | undefined`) or `@availableWhen headingSetpoint!=null` (for `X | null`).
- **Combine:** join with `&&` (all required) or `||` (any sufficient). Always use `==`/`!=` (never a single `=`).

Rules:

- **Never annotate the gate itself** — only the dependent property. In the example, `alert` is the gate and stays unannotated.
- **Self-gated props are not conditional** — a prop that does nothing when its _own_ value is `0`/`''`/`undefined` is not `@availableWhen` (that dependency is on itself, not another property).
- **Multi-path props are not conditional** — if a prop still has an observable effect via some always-on path (e.g. it is also emitted in an event or applied as a CSS class regardless of the gate), do not annotate it.
- The condition must hold against the **actual render/behavior logic** (trace into helpers, getters, and child components the prop is forwarded to), not just the prop's name.
- For properties added by `SetpointMixin`, the `@availableWhen` tags live in `svghelpers/setpoint-mixin.ts`; components that consume the mixin inherit them and must not re-annotate.

### Documentation by code pattern

Not all code is a concrete Lit component. Three patterns require different documentation approaches because Storybook autodocs relies on `custom-elements.json`, which only covers registered custom elements.

#### a) Concrete components (default)

Examples: `obc-area-graph`, `obc-line-graph`, `obc-bar-vertical`

- JSDoc lives **on the class**.
- Story meta sets `component: 'obc-tag-name'` → Storybook autodocs extracts everything automatically.
- Story file does **not** need `parameters.docs.description.component`.

#### b) Pure function modules (no component class)

Examples: `external-scale.ts` (exports `renderExternalScale()`, `computeExternalScaleLayout()`, etc.)

- **Source file:** Comprehensive JSDoc block at the **top of the module** (above first export).
- **Story file:** Omit `component:` from meta; provide full docs via `parameters.docs.description.component` as Markdown; manually define all `argTypes`; use a throwaway inline wrapper element for rendering.
- The module-level JSDoc is the **source of truth**; the story description mirrors it.

#### c) Abstract base classes

Examples: `ObcChartLineBase` (abstract base for `obc-line-graph` and `obc-area-graph`)

- **Source file:** Full JSDoc on the abstract class with `@ignore` appended.
- **Story file:** Set `component:` to a **concrete subclass tag**; override description with `parameters.docs.description.component`.
- The abstract class JSDoc is the **source of truth**; the story overrides autodocs.

#### Summary table

| Aspect                              | Concrete component | Pure function module       | Abstract base class               |
| ----------------------------------- | ------------------ | -------------------------- | --------------------------------- |
| JSDoc location                      | On the class       | Module-level block comment | On the abstract class (`@ignore`) |
| Story `meta.component`              | `'obc-tag-name'`   | Omitted                    | Concrete subclass tag             |
| Story `parameters.docs.description` | Not needed (auto)  | Required (full Markdown)   | Required (override)               |
| `argTypes`                          | Auto from manifest | Manual                     | Partially auto                    |
| Rendering in story                  | Direct `<obc-tag>` | Throwaway inline wrapper   | Concrete subclass element         |

---

## 4. Path-Scoped Instruction Files

Detailed component-family rules are in `.github/instructions/`.
Agents that support glob-scoped instructions should apply them automatically.

| File                                       | Scope (globs)                                                                                                                                                                  | Description                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| `building-blocks.instructions.md`          | `building-blocks/**`, `svghelpers/**`                                                                                                                                          | SVG-based building block components and shared utilities  |
| `circular-charts.instructions.md`          | `bars-graphs/**`, `charthelpers/**`                                                                                                                                            | Circular chart components (donut, pie, polar, radial-bar) |
| `external-scale.instructions.md`           | `external-scale/**`, `bar-vertical/**`, `bar-horizontal/**`, `gauge-vertical/**`, `gauge-horizontal/**`                                                                        | External scale renderer and bar/gauge wrappers            |
| `line-area-charts.instructions.md`         | `chart-line/**`, `line-graph/**`, `area-graph/**`, `gauge-trend/**`                                                                                                            | Line/area charts and composite gauge-trend component      |
| `watch-radial-instruments.instructions.md` | `watch/**`, `compass/**`, `heading/**`, `rudder/**`, `wind/**`, `roll/**`, `speed-gauge/**`, `gauge-radial/**`, `rot-sector/**`, `azimuth-thruster/**`, `instrument-radial/**` | Circular watch-based instruments and radial gauges        |
| `setpoint.instructions.md`                 | `svghelpers/setpoint*.ts`, `building-blocks/setpoint/**`                                                                                                                       | Setpoint design layer, mixin/bundle, confirm animation    |
| `automation-components.instructions.md`    | `automation/**`                                                                                                                                                                | Automation devices, valves, lines, tanks, badges          |
| `ui-components.instructions.md`            | `components/**`                                                                                                                                                                | General UI components (buttons, cards, inputs, feedback)  |
| `a11y.instructions.md`                     | `components/**`, `automation/**`                                                                                                                                               | Accessibility (WCAG 2.1 AA) — keyboard nav, ARIA, focus   |

---

## 5. Build, Test & Run

All commands are run from `packages/openbridge-webcomponents/` unless noted.

```bash
# Install dependencies (from repo root)
npm install

# Dev build (translations → vite)
npm run build

# Full build (translations → typecheck → bundle → vite → CEM → wrappers)
npm run build:full

# Type-check only
npm run typecheck

# Lint
npm run lint              # css mixins/variables/icons + slots + lit-analyzer + eslint
npm run lint:eslint       # eslint only
npm run lint:slots        # audit @slot/@fires JSDoc vs templates & dispatched events

# Format
npm run format            # prettier write
npm run format:check      # prettier check

# Storybook
npm run storybook         # dev server on :6006
npm run build-storybook   # static build

# Tests
npm run test-storybook          # visual snapshot tests (Vitest + Playwright)
npm run test-storybook:watch    # watch mode
npm run update-snapshots        # replace baselines

# Custom element manifest
npm run analyze           # regenerate custom-elements.json

# Create new component (interactive)
npm run new:component

# Download icons from Figma
npm run download:icons
```

> **Refreshing icons from Figma is a multi-step pipeline** (Figma token,
> `figmavariables.json` map, hex-fallback handling, dependent component
> updates, snapshot refresh, PWA bundle-size check). Follow the step-by-step
> playbook in [IMPLEMENTATION_GUIDELINES.md § Icons](IMPLEMENTATION_GUIDELINES.md#-icons)
> — it walks through the wind component as the worked example for a
> family-rename change.

Snapshot baselines: `__vis__/linux/__baselines__/` (CI) and `__vis__/darwin/__baselines__/` (macOS).

### vue-demo visual smoke tests

Run from `packages/vue-demo/`. A Playwright suite snapshots the demo screens to
catch visual regressions in OpenBridge components during updates. It reuses the
package's existing `@playwright/test` (no new dependency).

```bash
npm run test:visual          # compare screens against committed baselines
npm run test:visual:update   # regenerate baselines after an intended change
npm run test:visual          # ALWAYS re-run after updating to confirm stability
```

- Tests live in `e2e/visual/`; baselines are committed under
  `e2e/visual/__screenshots__/<platform>/` (per-platform, like the core suite).
- The suite is its own Playwright project (`--project=visual`); the functional
  e2e suite (`npm run test:e2e`) ignores it and needs no baselines.
- **Determinism** (see `e2e/visual/helpers.ts`): each test freezes `Date` via
  `page.clock`, neutralizes repeating animation sources (`setInterval` and
  `requestAnimationFrame`) so simulations render a fixed initial state, stubs
  external data (weather, logos, QR) and blocks other external origins, waits
  for network idle, and captures with `page.screenshot({ animations: 'disabled' })`
  so CSS transitions inside web-component shadow DOM settle.
- **Coverage:** 11 routes plus 3 interactive overlays (command menu, alert menu,
  depth dialog) opened via Playwright locators.
- **Skipped:** `/ecdis` (live WebGL map + AIS network stream) and `/ar` (CDN HLS
  video) cannot be frozen into a deterministic frame.
- Pixel baselines are environment-sensitive; regenerate them in the CI image
  (the repo already uses Docker for the core package's snapshot tests) to keep
  CI stable.

### Pre-commit Hooks

Husky runs `lint-staged` on every commit:
- **TypeScript files** → ESLint (max 4 warnings) + Prettier
- **CSS, HTML, JSON, MD** → Prettier only

Commits that fail lint or format checks are blocked automatically.

### Component Creation Checklist

1. Run `npm run new:component` to scaffold files.
2. Implement the component in `component-name.ts` (extend `LitElement`, register with `@customElement`).
3. Write styles in `component-name.css` (PostCSS, use mixins from § 7).
4. Write stories in `component-name.stories.ts`:
   - Add `tags: ['autodocs', '6.0']` for documented OB 6.0 components.
   - Export a `Default` story plus stories for key states and variants.
   - Use Title Case for story titles (see § 2).
5. Write JSDoc following the three-pattern strategy (see § 3).
6. Run `npm run analyze` to update `custom-elements.json`.
7. Run `npm run lint && npm run typecheck` to validate.

---

## 6. SVG Component Guidelines

Instrument components are SVG-based (copied from Figma).
Required modifications after pasting:

- Replace hard-coded colors with CSS variables: `fill: var(--element-active-color);`
- Add `vector-effect="non-scaling-stroke"` for non-scaling strokes.
- Split large SVGs into smaller composable template fragments for readability.

---

## 7. CSS / PostCSS Reference

> **Full reference** with diagrams, code examples, and complete mixin inventories lives in
> [IMPLEMENTATION_GUIDELINES.md § PostCSS](IMPLEMENTATION_GUIDELINES.md#-postcss).
> This section summarizes the key concepts so agents have immediate context.

### Key concepts

- **`variables.css` is generated by the [obc-figma-plugin](https://github.com/Ocean-Industries-Concept-Lab/obc-figma-plugin) ([Figma community plugin `1448419213272098259`](https://www.figma.com/community/plugin/1448419213272098259)) — do not hand-edit.** Token additions, renames, or value changes happen in Figma (or in the plugin's `rename()` function), then the whole file is replaced with the plugin's `cssvariables` codegen output. See [IMPLEMENTATION_GUIDELINES.md § PostCSS](IMPLEMENTATION_GUIDELINES.md#-postcss) for the full caution.
- **Global palette:** `src/palettes/variables.css` — four themes (`day`, `dusk`, `night`, `bright`) via `data-obc-theme` attribute on `:root`.
- **Two-layer color model:** Raw **primitives** (`--base-blue-*`, `--base-gray-*`, `--base-cyan-*`, …, plus `-tint` variants) are redefined per theme. **Semantic tokens** (e.g. `--instrument-enhanced-primary-color`, `--element-active-color`, `--automation-medium-base-blue-*`) are layered on top and consumed by components. **Semantic tokens are stored as literal `rgb(...)` values per theme — not as `var(--base-…)` references** — so overriding only the primitives is not enough to fully repaint the UI; override both layers (or only the semantic tokens) when re-skinning. The `night` theme already uses a teal/green (`rgb(88, 200, 162)`) for `--instrument-enhanced-primary-color`, proving the architecture supports non-blue accents. A few hot spots reference raw primitives directly: `charthelpers/constants.ts` (`CHART_SECTOR_ENHANCED_COLORS`, used by line/area/donut/pie charts), `ar/building-blocks/poi-line/*.css`, and the `--automation-medium-base-blue-*` tokens. Consumers can re-theme without forking by shipping a stylesheet after `variables.css` that redeclares the relevant tokens under each `:root[data-obc-theme="…"]` selector; Chart.js components read CSS vars at render-time via `getCssVariableValue()`, so overrides must be present on an ancestor before the chart mounts.
- **Touch target / Visual target:** Interactive components use a two-layer DOM — an outer invisible touch target (default 48 px) and an inner visible wrapper (default 32 px). The `@mixin style` bridges them via the `visibleWrapperClass` parameter.
- **`@mixin style`:** PostCSS build-time mixin generating six interaction states (enabled, activated, hover, pressed, focus-visible, disabled). Parameters: `style=<flat|normal|raised|amplified|indent|selected>`, optional `visibleWrapperClass=.class`, optional `noClick` flag for display-only sub-parts.
- **Color token convention:** Surface colors follow `--{variant}-{state}-background-color` / `--{variant}-{state}-border-color`. Text/icon colors follow `--on-{variant}-{role}-color` (roles: `active`, `neutral`, `disabled`).
- **Size variants:** `.obc-component-size-regular` (default) / `-medium` / `-large` / `-xl` classes on an ancestor scale all `--ui-components-*` sizing tokens via CSS variable inheritance.
- **Font mixins:** Three families — UI (`font-button`, `font-label`, `font-body`, etc.), Instrument (`font-instrument-value-*`, `font-instrument-label`, etc.), Automation (`font-automation-value-*`). Full list in `IMPLEMENTATION_GUIDELINES.md`.
- **Alert mixins:** `alert-alarm`, `alert-critical`, `alert-caution` in `src/mixins/alert.css`. Alarm blink animation uses CSS `@property` registered `--alarm-blink-on/off` and `--warning-blink-on/off`.
- **`--obc-can-hover`:** CSS variable kill-switch for hover feedback (defined in `src/main.css`, consumed by `@mixin style` via `color-mix()`).
- **Icon slots:** use `<obi-placeholder></obi-placeholder>` or other `<obi-*>` icons (1000+ available).

---

## 8. Behavioral Rules for AI Agents

1. **Read before writing.** Always read the relevant source, story, and instruction file before modifying a component.
2. **Follow the three-pattern strategy** (§ 3) when writing or updating JSDoc.
3. **Respect glob-scoped instructions** (§ 4) — read the matching `.instructions.md` file when touching files in its scope.
4. **Accessibility is required for interactive components.** Every new or modified component in `src/components/**` or `src/automation/**` must support full keyboard navigation and meet WCAG 2.1 AA. Read [`.github/instructions/a11y.instructions.md`](.github/instructions/a11y.instructions.md) for the activation-key table, ARIA rules, focus handling, and testing checklist before writing or changing an interactive component.
5. **Do not edit auto-generated packages** (`-react`, `-vue`, `-ng`, `-svelte`). Run `npm run wrappers` instead.
6. **Run `npm run analyze`** after adding or renaming a `@customElement` to keep `custom-elements.json` in sync.
   Never hand-edit `custom-elements.json` — it is auto-generated and git-ignored. Fix manifest inaccuracies at the source (`@slot`/`@fires`/property JSDoc); see § 3 "Slots and events are manifest-critical" and run `npm run lint:slots`.
7. **Run `npm run lint`** after code changes to catch issues early.
8. **Insert `TODO(designer)`** for any documentation detail whose purpose is unclear from code alone.
9. **Keep stories tagged** with `['autodocs', '6.0']` for documented OB 6.0 components; `['alpha']` for in-development; `['skip-test']` to exclude from visual tests.
10. **Do not run full builds or start Storybook automatically.** Avoid `npm run build`, `npm run storybook` unless the user explicitly requests it. These are expensive, long-running operations.
11. **Run visual tests for a single component** instead of the full suite:
    ```bash
    npx vitest run --project storybook 'component-name'
    ```
12. **Update baselines for a single component:**
    ```bash
    npx vitest run --project storybook --update 'component-name'
    ```
13. **Always verify after updating baselines** — re-run the test without `--update` to confirm the new baselines are stable:
    ```bash
    npx vitest run --project storybook 'component-name'
    ```
14. **Keep the main context clean.** Delegate broad codebase exploration to subagents; only read files directly in the main thread when you are about to edit them or need a few specific lines.
15. **Never hand-edit `src/palettes/variables.css` or `src/mixins/fonts.css`.** Both are regenerated wholesale from the [obc-figma-plugin](https://github.com/Ocean-Industries-Concept-Lab/obc-figma-plugin) (`cssvariables` and `font-exports` codegens respectively); any local edit will be overwritten the next time someone pastes new plugin output. Token additions/renames must go through Figma (or the plugin's `rename()` function) first. The same caution applies to `script/figmavariables.json` (the plugin's `variables` codegen output). Hand-curated font mixins that the plugin does not produce live in `src/mixins/font-extras.css` — edit them there. Run `npm run lint:mixins` after regenerating `fonts.css`. See [IMPLEMENTATION_GUIDELINES.md § PostCSS](IMPLEMENTATION_GUIDELINES.md#-postcss).

---

## 9. Related Documentation

| Document                                                                                             | Purpose                                                                  |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [IMPLEMENTATION_GUIDELINES.md](IMPLEMENTATION_GUIDELINES.md)                                         | Detailed architecture, PostCSS mixins, SVG practices, component creation |
| [CONTRIBUTING.md](CONTRIBUTING.md)                                                                   | Contribution workflow, commit conventions, PR guidelines                 |
| [packages/openbridge-webcomponents/README.md](packages/openbridge-webcomponents/README.md)           | Installation, setup, bundle usage                                        |
| [.cursor/rules/comments.mdc](.cursor/rules/comments.mdc)                                             | Full JSDoc template and structured-tag rules                             |
| [.github/instructions/](.github/instructions/)                                                       | Path-scoped instruction files for component families                     |
| [packages/openbridge-webcomponents/script/docgen/](packages/openbridge-webcomponents/script/docgen/) | OpenAI-powered JSDoc generation CLI (`docs-gen.ts`)                      |
