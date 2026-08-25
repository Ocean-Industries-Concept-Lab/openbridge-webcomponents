# AGENTS.md — Universal AI Agent Instructions

> **Canonical source of truth** for every AI coding assistant that operates in
> this repository (GitHub Copilot, Cursor, Cline, Aider, Windsurf, Codex,
> OpenAI Codex CLI, or any other agent that reads `AGENTS.md`).

**Quick nav:** [Overview](#1-repository-overview) · [Coding Standards](#2-coding-standards) · [JSDoc](#3-documentation-rules-jsdoc) · [Instructions](#4-path-scoped-instruction-files) · [Build & Test](#5-build-test--run) · [SVG](#6-svg-component-guidelines) · [CSS](#7-css--postcss-reference) · [Behavioral Rules](#8-behavioral-rules-for-ai-agents) · [Related Docs](#9-related-documentation)

---

## 1. Repository Overview

| Item              | Value                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
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

| Directory                     | Contents                                                                                                       |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `src/components/`             | General UI components (buttons, cards, top-bar, etc.)                                                          |
| `src/navigation-instruments/` | Instruments (compass, heading, gauge, etc.) and indicators (bearing, speed, ROT)                               |
| `src/building-blocks/`        | Low-level instrument pieces (scales, bars, chart bases) — mostly SVG; some are plain DOM, e.g. `readout-block` |
| `src/bars-graphs/`            | Chart components (line graph, area graph, donut, pie, polar, radial-bar)                                       |
| `src/automation/`             | Automation system components (valves, pumps, motors, etc.)                                                     |
| `src/ar/`                     | Augmented reality components                                                                                   |
| `src/icons/`                  | Auto-generated icon components (do not edit manually)                                                          |
| `src/svghelpers/`             | Shared SVG utility functions and mixins                                                                        |
| `src/charthelpers/`           | Shared chart utility functions                                                                                 |
| `src/integration-systems/`    | Integration system components                                                                                  |
| `src/internal/`               | Shared internal helpers (e.g. `tree-roving-navigator.ts`)                                                      |
| `src/pages/`                  | Full-page composite examples                                                                                   |
| `src/mixins/`                 | PostCSS mixins — `fonts.css` is generated, the rest are hand-written                                           |
| `src/palettes/`               | Colour tokens — `variables.css` is generated, `manual.css` is hand-written                                     |
| `src/generated/`              | Generated localisation output (do not edit manually)                                                           |
| `src/manual-icon/`            | **Hand-written** icon components — unlike `src/icons/`, these are not generated                                |

---

## 2. Coding Standards

- **Language:** TypeScript strict mode. English-only identifiers and comments.
- **Components:** Extend `LitElement`; register with `@customElement('obc-…')`. Import `customElement` from `src/decorator.js` (local wrapper), **not** from `lit/decorators.js` — enforced by ESLint rule `prefer-local-decorator`.
- **Styles:** PostCSS (`.css` files). One global palette in `src/palettes/variables.css`; all other CSS in component folders. Use `@mixin style` for elevation variants. Text: `@mixin font-body`, `@mixin font-label`, etc.
- **Conventional Commits** for git messages and **Pull Request titles** (`feat:`, `fix:`, `feat!:`, etc.). An automated linting process validates PR titles.
- Ask for clarification (e.g. a list of questions) before implementing significant changes.

### Comments

WHY, never WHAT. Explanation lives on the declaration's JSDoc; a comment in a
method body is for a why with no declaration to live on, three lines at most.
No history, dates or change narration — `git log` carries those. A reference
is a trailing `(#1234)` pointer, never the explanation. CSS gets one short why
per non-obvious declaration. No filler, inflated vocabulary or chatbot
phrasing. The full rules, the writing-style ban list and the PR exemption are
in [`docs/agents/coding-standards.md`](docs/agents/coding-standards.md);
`npm run lint:comments` reports what breaks them.

### Boolean property naming

Positive names (`showLabels`, never `hideLabels`); a `true`-default boolean is
declared with `attribute: false`. Rule and examples:
[`docs/agents/coding-standards.md` § Boolean property naming](docs/agents/coding-standards.md#boolean-property-naming).

### Storybook title conventions

Story `title` and `name` use Title Case (ESLint `openbridge/storybook-title-case`,
auto-fixable). The lifecycle entry in `meta.tags` is derived from the class
JSDoc and never hand-written — see
[`docs/agents/coding-standards.md`](docs/agents/coding-standards.md#storybook-title-conventions)
and [`docs/agents/jsdoc.md` § Component lifecycle tags](docs/agents/jsdoc.md).

---

## 3. Documentation Rules (JSDoc)

Full template and detailed rules live in [`docs/agents/jsdoc.md`](docs/agents/jsdoc.md).
Key points:

1. **One-line summary** with the tag name and a brief description.
2. **Features / Variants** — bullet list of capabilities and configuration options.
3. **Usage Guidelines** — when and how to use the component; contrast with similar components.
4. **Slots** — table of slot names, conditions, and purposes.
5. **Events** — a `@fires` tag for every event the component exposes, custom **and** native (a passthrough `<button>`'s `click` included). See [`docs/agents/jsdoc.md`](docs/agents/jsdoc.md).
6. **Properties are documented in the class JSDoc**, one tag per public property,
   without a type — `@property name - description` — placed after the Markdown
   sections and before `@slot`/`@fires`. Conditional properties add a line
   `@availableWhen name condition` directly under their tag. No inline JSDoc
   above `@property()` fields (`npm run lint:comments` warns; `--fix` hoists
   them). A tag naming a property that does not exist is a ghost manifest
   member — `npm run lint:slots` fails on it. Mixin-provided properties
   (`svghelpers/setpoint-mixin.ts`, `svghelpers/setpoint-bundle.ts`) keep their
   inline docs.
7. **Tone:** Do NOT mention "maritime", "industrial", "bridge", or domain qualifiers; keep text domain-agnostic.
8. If purpose is unclear, insert `**TODO(designer)**` instead of guessing.
9. **`@availableWhen` for conditional properties** — see [`docs/agents/jsdoc.md`](docs/agents/jsdoc.md).
10. **Exactly one lifecycle tag** on every `@customElement` class — see [`docs/agents/jsdoc.md`](docs/agents/jsdoc.md).

> **The full template, the `@slot`/`@fires` contract, `@availableWhen`,
> component lifecycle tags, and the three documentation patterns live in
> [`docs/agents/jsdoc.md`](docs/agents/jsdoc.md).**

---

## 4. Path-Scoped Instruction Files

Detailed component-family rules live in [`docs/agents/`](docs/agents/) — the
canonical, tool-neutral source, readable by any agent. Agents that support
glob-scoped instructions pick them up automatically from generated adapters:

| Adapter                                              | Consumer       |
| ---------------------------------------------------- | -------------- |
| `.github/instructions/*.instructions.md` (`applyTo`) | GitHub Copilot |
| `.cursor/rules/*.mdc` (`globs`)                      | Cursor         |
| `CLAUDE.md` (gitignored, generated on `npm install`) | Claude Code    |
| `.claude/rules/*.md` (`paths`)                       | Claude Code    |

All are produced by `npm run agents:sync` and verified by `npm run lint:agents`.
Every other agent reads this file and fetches `docs/agents/` on demand.

A family doc is a rulebook with the explanation an editor needs — not a
changelog, a plan, or a status board.

- Rules for editing the family; the architecture an editor must hold;
  invariants that are easy to break, each with the test or story that guards
  it. Present tense. No dates, no "previously", no PR narrative.
- A settled trade-off is a rule line with a trailing reference — never a story.
- `## Open` — one line per open question, each pointing at an issue. The only
  status content allowed.
- Under 300 lines (`lint:agents` warns). Split by sub-family when it grows.
- One home per fact: if it is explained here, the code carries a pointer, not
  a copy. Update the doc in the PR that changes the behaviour.

The table below is generated too. Edit `docs/agents/*.md`, never this block.

<!-- agents:routing:start -->
<!-- prettier-ignore-start -->
| Doc | Scope (globs) | Description |
| --- | --- | --- |
| [a11y](docs/agents/a11y.md) | `packages/openbridge-webcomponents/src/{components,automation,internal}/**` | Accessibility (WCAG 2.1 AA + 2.2 § 2.5.8 target size) — keyboard nav, ARIA, focus |
| [ar](docs/agents/ar.md) | `packages/openbridge-webcomponents/src/ar/**` | Augmented-reality POI overlay — controller, layer stack, overlap resolution, and the POI composition chain |
| [automation-components](docs/agents/automation-components.md) | `packages/openbridge-webcomponents/src/automation/**` | Automation devices, valves, lines, tanks, badges |
| [building-blocks](docs/agents/building-blocks.md) | `packages/openbridge-webcomponents/src/{building-blocks,svghelpers}/**` | SVG-based building block components and shared utilities |
| [ci-and-release](docs/agents/ci-and-release.md) | `.github/workflows/**`<br>`{.releaserc.json,package.json}`<br>`scripts/**`<br>`packages/openbridge-webcomponents/package.json`<br>`packages/openbridge-webcomponents/script/**`<br>`!packages/openbridge-webcomponents/script/docgen/**` | CI workflows, the semantic-release model, which commit types ship a release, and the two script directories |
| [circular-charts](docs/agents/circular-charts.md) | `packages/openbridge-webcomponents/src/bars-graphs/{donut-chart,pie-chart,polar-chart,radial-bar-chart}/**`<br>`packages/openbridge-webcomponents/src/charthelpers/**` | Circular chart components (donut, pie, polar, radial-bar) |
| [coding-standards](docs/agents/coding-standards.md) | `packages/openbridge-webcomponents/src/**/{*.ts,*.css}`<br>`packages/openbridge-webcomponents/script/**/{*.ts,*.mjs}`<br>`packages/openbridge-webcomponents/.storybook/**/*.ts`<br>`!packages/openbridge-webcomponents/src/{icons,generated,manual-icon}/**` | Comment rules, CSS why-comments, the writing-style ban list, boolean naming and Storybook titles |
| [css-postcss](docs/agents/css-postcss.md) | `packages/openbridge-webcomponents/src/**/*.css` | PostCSS mixins, the two-layer colour model, size variants and font mixins |
| [docgen](docs/agents/docgen.md) | `packages/openbridge-webcomponents/script/docgen/**` | The OpenAI-backed JSDoc generation CLI and its review-copy workflow |
| [external-scale](docs/agents/external-scale.md) | `packages/openbridge-webcomponents/src/building-blocks/{external-scale,bar-vertical,bar-horizontal}/**`<br>`packages/openbridge-webcomponents/src/navigation-instruments/{gauge-vertical,gauge-horizontal,gauge-trend}/**` | External scale renderer and bar/gauge wrappers |
| [generated-code](docs/agents/generated-code.md) | `packages/openbridge-webcomponents/src/{icons,manual-icon}/**`<br>`packages/openbridge-webcomponents/src/palettes/variables.css`<br>`packages/openbridge-webcomponents/src/mixins/fonts.css`<br>`packages/openbridge-webcomponents/script/figmavariables.json`<br>`packages/{openbridge-webcomponents-react,openbridge-webcomponents-vue,openbridge-webcomponents-ng,openbridge-webcomponents-svelte}/**` | Generated files that must never be hand-edited, and the command that regenerates each |
| [instrument-indicators](docs/agents/instrument-indicators.md) | `packages/openbridge-webcomponents/src/navigation-instruments/{bearing-indicator,compass-indicator,depth-indicator,gauge-bar-indicator,gauge-radial-indicator,gauge-trend-indicator,heading-indicator,heave-indicator,main-engine-indicator,pitch-indicator,propulsion-azimuth-indicator,propulsion-tunnel-thruster,roll-indicator,rot-indicator,rudder-indicator,speed-indicator,wind-indicator}/**` | Compact indicator glyphs — miniature instrument renderings for strips, lists and tiles |
| [instruments-misc](docs/agents/instruments-misc.md) | `packages/openbridge-webcomponents/src/navigation-instruments/{azimuth-thruster-labeled,badge-command,depth-actual,draft-trim,heave,instrument-field,main-engine,readout-list,readout-list-item,speed-arrows,thruster}/**` | Instruments outside the obc-watch core — readout rows, propulsion glyphs, and helper-borrowing SVG instruments |
| [integration-systems](docs/agents/integration-systems.md) | `packages/openbridge-webcomponents/src/integration-systems/**` | Integration bar, fleet and vessel selection components built on the shared integration-button primitive |
| [jsdoc](docs/agents/jsdoc.md) | `packages/openbridge-webcomponents/src/**/*.ts`<br>`!packages/openbridge-webcomponents/src/{icons,generated,manual-icon}/**`<br>`!packages/openbridge-webcomponents/src/**/{*.stories.ts,*.spec.ts}` | JSDoc template, slot/event tags, lifecycle tags, and the three documentation patterns |
| [line-area-charts](docs/agents/line-area-charts.md) | `packages/openbridge-webcomponents/src/building-blocks/chart-line/**`<br>`packages/openbridge-webcomponents/src/bars-graphs/{line-graph,area-graph}/**`<br>`packages/openbridge-webcomponents/src/navigation-instruments/gauge-trend/**` | Line/area charts and composite gauge-trend component |
| [pages](docs/agents/pages.md) | `packages/openbridge-webcomponents/src/pages/**` | Full-page composite examples that assemble many components into one screen |
| [readout-components](docs/agents/readout-components.md) | `packages/openbridge-webcomponents/src/components/textbox/**`<br>`packages/openbridge-webcomponents/src/building-blocks/readout-block/**`<br>`packages/openbridge-webcomponents/src/navigation-instruments/{readout-list-item,readout-list}/**`<br>`packages/openbridge-webcomponents/src/navigation-instruments/readout/{readout.ts,readout-formatters.ts,readout-shared.ts}` | Readout composition stack (textbox → block → list-item → list) and its value/format contracts |
| [setpoint](docs/agents/setpoint.md) | `packages/openbridge-webcomponents/src/svghelpers/{setpoint.ts,setpoint-mixin.ts,setpoint-bundle.ts}`<br>`packages/openbridge-webcomponents/src/building-blocks/setpoint/**` | Setpoint design layer, mixin/bundle, confirm animation |
| [testing-visual](docs/agents/testing-visual.md) | `packages/openbridge-webcomponents/{.storybook,__vis__}/**`<br>`packages/vue-demo/e2e/**` | Storybook config, visual snapshot baselines, and the vue-demo Playwright suite |
| [ui-components](docs/agents/ui-components.md) | `packages/openbridge-webcomponents/src/components/**` | General UI components (buttons, cards, inputs, feedback) |
| [watch-radial-instruments](docs/agents/watch-radial-instruments.md) | `packages/openbridge-webcomponents/src/navigation-instruments/{watch,compass,compass-sector,heading,rudder,wind,pitch,roll,pitch-roll,pitch-roll-heave,speed-gauge,gauge-radial,rot-sector,rate-of-turn,course-arrows,readout,watch-flat,compass-flat,rot-linear,azimuth-thruster,current,gauge-radial-proportional,pitch-roll-yaw,position-deviation,speed-directions,top-view-propulsion,velocity-projection-plot,wind-propulsion}/**`<br>`packages/openbridge-webcomponents/src/building-blocks/{single-axis-inclinometer,instrument-radial}/**` | Watch-based instruments (radial core + linear strip counterparts), radial gauges, shared arrow/readout modules |
<!-- prettier-ignore-end -->
<!-- agents:routing:end -->

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
npm run lint:eslint       # eslint only (includes the lifecycle-tag rules, § 3)
npm run lint:fix:stories  # eslint --fix on stories only (rewrites meta.tags lifecycle entries)
npm run lint:slots        # audit @slot/@fires JSDoc vs templates & dispatched events
npm run test:rules        # unit tests for the repo's custom ESLint rules

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

A Playwright suite in `packages/vue-demo/e2e/visual/` snapshots the demo
screens (`npm run test:visual` / `npm run test:visual:update` from that
package). How it stays deterministic, what it skips and where the baselines
live: [`docs/agents/testing-visual.md` § vue-demo Playwright suite](docs/agents/testing-visual.md#vue-demo-playwright-suite).

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
   - Do **not** hand-write a lifecycle tag here — see step 6.
5. Write JSDoc following the three-pattern strategy (see § 3), including
   exactly one lifecycle tag on the class (see § 3 Component lifecycle tags).
6. Run `npm run lint:fix:stories` to populate the story's lifecycle tag from
   that class JSDoc.
7. Run `npm run analyze` to update `custom-elements.json`.
8. Run `npm run lint && npm run typecheck` to validate.

---

## 6. SVG Component Guidelines

Instrument components are SVG-based (copied from Figma).
Required modifications after pasting:

- Replace hard-coded colors with CSS variables: `fill: var(--element-active-color);`
- Add `vector-effect="non-scaling-stroke"` for non-scaling strokes.
- Split large SVGs into smaller composable template fragments for readability.

---

## 7. CSS / PostCSS Reference

Styles are PostCSS. The key concepts — the two-layer colour model, `@mixin style`
and its six interaction states, size variants, font and alert mixins, and the
token naming conventions — live in
[`docs/agents/css-postcss.md`](docs/agents/css-postcss.md), which attaches
automatically when editing a `.css` file.

> **Full reference** with diagrams, code examples, and complete mixin inventories
> lives in [IMPLEMENTATION_GUIDELINES.md § PostCSS](IMPLEMENTATION_GUIDELINES.md#-postcss).

---

## 8. Behavioral Rules for AI Agents

1. **Read before writing.** Always read the relevant source, story, and instruction file before modifying a component.
2. **Follow the three-pattern strategy** (§ 3) when writing or updating JSDoc.
3. **Respect glob-scoped instructions** (§ 4) — read the matching `docs/agents/*.md` file when touching files in its scope.
4. **Accessibility is required for interactive components.** Every new or modified component in `src/components/**` or `src/automation/**` must support full keyboard navigation and meet WCAG 2.1 AA. Keyboard behaviour should follow the [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) — start from the matching pattern, or the closest one, and design your own only when nothing applies. Read [`docs/agents/a11y.md`](docs/agents/a11y.md) for that ladder, the activation-key table, ARIA rules, focus handling, and testing checklist before writing or changing an interactive component.
5. **Do not edit auto-generated packages** (`-react`, `-vue`, `-ng`, `-svelte`). Run `npm run wrappers` instead.
6. **Run `npm run analyze`** after adding or renaming a `@customElement` to keep `custom-elements.json` in sync. Storybook resolves story args to element properties through the manifest, so run it **before** testing the stories of a newly created component — without it the args silently never reach the element.
   Never hand-edit `custom-elements.json` — it is auto-generated and git-ignored. Fix manifest inaccuracies at the source (`@slot`/`@fires`/property JSDoc); see § 3 "Slots and events are manifest-critical" and run `npm run lint:slots`.
7. **Run `npm run lint`** after code changes to catch issues early.
8. **Insert `TODO(designer)`** for any documentation detail whose purpose is unclear from code alone.
9. **Keep stories tagged** with `['autodocs', '6.0']` for documented OB 6.0 components; `['skip-test']` to exclude from visual tests. The lifecycle entry (`beta` / `experimental` / `deprecated`) is **never hand-written** — put `@stable`/`@beta`/`@experimental`/`@deprecated` on the component class and run `npm run lint:fix:stories`. The old `'wip'` and `'alpha'` tags are retired; see [`docs/agents/jsdoc.md` § Component lifecycle tags](docs/agents/jsdoc.md).
10. **Do not run full builds or start Storybook automatically.** Avoid `npm run build`, `npm run storybook` unless the user explicitly requests it. These are expensive, long-running operations.
11. **Run visual tests for a single component** instead of the full suite:
    ```bash
    npx vitest run --project storybook 'component-name'
    ```
12. **Update baselines for a single component** — the filter must come **before** `--update`; written after the flag, the name is consumed as the flag's value and the FULL suite runs in update mode, silently rewriting unrelated flaky baselines:
    ```bash
    npx vitest run --project storybook 'component-name' --update
    ```
13. **Always verify after updating baselines** — re-run the test without `--update` to confirm the new baselines are stable:
    ```bash
    npx vitest run --project storybook 'component-name'
    ```
14. **Keep the main context clean.** Delegate broad codebase exploration to subagents; only read files directly in the main thread when you are about to edit them or need a few specific lines.
15. **Radial instrument geometry goes through `svghelpers/radial-frame.ts`.** Never hand-mirror viewBox constants or paddings between `obc-watch` and an overlay SVG — compute one `computeRadialFrame()` result per render and pass it to both `<obc-watch .arcFrame=...>` and the overlay `viewBox` (this also provides the width-aware label reserve and `faceDiameter` from issue #1021). Before any refactoring of a radial instrument, read [`docs/agents/watch-radial-instruments.md` § Shared frame computation](docs/agents/watch-radial-instruments.md) — the helper reproduces legacy geometry byte-identically when no outside labels exist, and breaking that contract regenerates the entire radial snapshot family.
16. **The readout family is four nested layers, not one component.** `obc-textbox` → `obc-readout-block` → `obc-readout-list-item` → `obc-readout-list`, with `obc-readout` as a second layout over the same block (used mostly inside radial instruments). A change to a lower layer reaches every layer above it, so touching `obc-textbox` or `obc-readout-block` means re-running the instrument snapshots too, not just the readout ones. Value/format helpers belong in `readout-formatters.ts` (which imports nothing) — putting them in `readout-shared.ts` and importing back into the block creates a circular import. Read [`docs/agents/readout-components.md`](docs/agents/readout-components.md) before editing any of them: it documents the validation invariants (validate on every update, never gated on `changed`), the throw-vs-clamp rule for bad configuration, and the four `String.prototype.repeat` sites that must be bounded at the property boundary.
17. **Never hand-edit `src/palettes/variables.css` or `src/mixins/fonts.css`.** Both are regenerated wholesale from the [obc-figma-plugin](https://github.com/Ocean-Industries-Concept-Lab/obc-figma-plugin) (`cssvariables` and `font-exports` codegens respectively); any local edit will be overwritten the next time someone pastes new plugin output. Token additions/renames must go through Figma (or the plugin's `rename()` function) first. The same caution applies to `script/figmavariables.json` (the plugin's `variables` codegen output). Hand-curated font mixins that the plugin does not produce live in `src/mixins/font-extras.css` — edit them there. Run `npm run lint:mixins` after regenerating `fonts.css`. See [IMPLEMENTATION_GUIDELINES.md § PostCSS](IMPLEMENTATION_GUIDELINES.md#-postcss).
18. **Do not commit planning documents or specs.** Design notes, implementation plans and scratch specs stay out of the repository — the design record belongs in the pull request body, where reviewers actually read it and where it stays attached to the change. This applies to any agent's planning output, whatever directory it lands in.
19. **Check for parallel work before you start.** Read the issue
    (`gh issue view N`); look for open PRs or branches touching the same
    component (`gh pr list --search "<component>"`). Auto-memory and local plan
    files are private to one developer — never a coordination surface.
20. **Open a draft PR early** with the design record in the body.
21. **Comment pass is part of done** (§ 2; [`docs/agents/coding-standards.md`](docs/agents/coding-standards.md)).

---

## 9. Related Documentation

| Document                                                                                             | Purpose                                                                                                           |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [IMPLEMENTATION_GUIDELINES.md](IMPLEMENTATION_GUIDELINES.md)                                         | Detailed architecture, PostCSS mixins, SVG practices, component creation                                          |
| [CONTRIBUTING.md](CONTRIBUTING.md)                                                                   | Contribution workflow, commit conventions, PR guidelines                                                          |
| [.devcontainer/README.md](.devcontainer/README.md)                                                   | Dev container persistent-home volume: per-developer tooling setup & rebuild guide                                 |
| [packages/openbridge-webcomponents/README.md](packages/openbridge-webcomponents/README.md)           | Installation, setup, bundle usage                                                                                 |
| [docs/agents/jsdoc.md](docs/agents/jsdoc.md)                                                         | Full JSDoc template and structured-tag rules                                                                      |
| [docs/agents/](docs/agents/)                                                                         | Path-scoped instruction files for component families (canonical; `.github/instructions/` is generated from these) |
| [packages/openbridge-webcomponents/script/docgen/](packages/openbridge-webcomponents/script/docgen/) | OpenAI-powered JSDoc generation CLI (`docs-gen.ts`)                                                               |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)                                                             | Contributor Covenant — expected conduct in community spaces                                                       |
| [docs/getting-started-react.md](docs/getting-started-react.md)                                       | End-user tutorial: build a multi-view React app with the React wrapper                                            |
| [docs/getting-started-angular.md](docs/getting-started-angular.md)                                   | End-user tutorial: build a multi-view Angular app with the Angular wrapper                                        |
| [docs/graph.md](docs/graph.md)                                                                       | End-user guide: custom Chart.js plots with OpenBridge theming                                                     |
