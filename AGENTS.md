# AGENTS.md — Universal AI Agent Instructions

> **Canonical source of truth** for every AI coding assistant that operates in
> this repository (GitHub Copilot, Cursor, Cline, Aider, Windsurf, Codex,
> OpenAI Codex CLI, or any other agent that reads `AGENTS.md`).

---

## 1. Repository Overview

| Item | Value |
|---|---|
| Name | **Openbridge Web Components** |
| Repo | `Ocean-Industries-Concept-Lab/openbridge-webcomponents-jip` |
| License | Apache-2.0 |
| Runtime | Lit 3 + TypeScript (web components) |
| Package manager | npm (workspaces) |
| Monorepo packages | `openbridge-webcomponents` (core), `-react`, `-vue`, `-ng`, `-svelte` (auto-generated wrappers), `react-demo`, `vue-demo` |

The library provides maritime navigation and automation UI components.
Framework wrappers are **auto-generated** — never edit them directly.

---

## 2. Coding Standards

- **Language:** TypeScript strict mode. English-only identifiers and comments.
- **Components:** Extend `LitElement`; register with `@customElement('obc-…')`.
- **Styles:** PostCSS (`.css` files). One global palette in `variables.css`; all other CSS in component folders. Use `@mixin style` for elevation variants. Text: `@mixin font-body`, `@mixin font-label`, etc.
- **No inline comments** unless the code is extremely unusual and impossible to understand without explanation.
- **Only comment a property** if the name is not self-explanatory.
- **Conventional Commits** for git messages (`feat:`, `fix:`, `docs:`, etc.).
- Ask for clarification (e.g. a list of questions) before implementing significant changes.

### Storybook title conventions

All story titles use **Title Case** with `/`-separated segments:

- Capitalize every word: `Alert List Item`, `Speed Gauge`, `Automation Button`.
- Keep short conjunctions and prepositions lowercase: _and, of, or, in, on, at, to, for_.
  Example: `Message and Alerts`, `Selection Controls and Switches`.
- Use spaces, not dashes: `Automation Configurations` not `Automation-configurations`.
- Apply the same rules to every segment: `title: 'UI Components/Input Controls/Slider Double'`.

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

| Aspect | Concrete component | Pure function module | Abstract base class |
|---|---|---|---|
| JSDoc location | On the class | Module-level block comment | On the abstract class (`@ignore`) |
| Story `meta.component` | `'obc-tag-name'` | Omitted | Concrete subclass tag |
| Story `parameters.docs.description` | Not needed (auto) | Required (full Markdown) | Required (override) |
| `argTypes` | Auto from manifest | Manual | Partially auto |
| Rendering in story | Direct `<obc-tag>` | Throwaway inline wrapper | Concrete subclass element |

---

## 4. Path-Scoped Instruction Files

Detailed component-family rules are in `.github/instructions/`.
Agents that support glob-scoped instructions should apply them automatically.

| File | Scope (globs) | Description |
|---|---|---|
| `building-blocks.instructions.md` | `building-blocks/**`, `svghelpers/**` | SVG-based building block components and shared utilities |
| `circular-charts.instructions.md` | `bars-graphs/**`, `charthelpers/**` | Circular chart components (donut, pie, polar, radial-bar) |
| `external-scale.instructions.md` | `external-scale/**`, `bar-vertical/**`, `bar-horizontal/**`, `gauge-vertical/**`, `gauge-horizontal/**` | External scale renderer and bar/gauge wrappers |
| `line-area-charts.instructions.md` | `chart-line/**`, `line-graph/**`, `area-graph/**`, `gauge-trend/**` | Line/area charts and composite gauge-trend component |
| `watch-radial-instruments.instructions.md` | `watch/**`, `compass/**`, `heading/**`, `rudder/**`, `wind/**`, `roll/**`, `speed-gauge/**`, `gauge-radial/**`, `rot-sector/**`, `azimuth-thruster/**`, `instrument-radial/**` | Circular watch-based instruments and radial gauges |
| `setpoint.instructions.md` | `svghelpers/setpoint*.ts`, `building-blocks/setpoint/**` | Setpoint design layer, mixin/bundle, confirm animation |

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
npm run lint              # lit-analyzer + eslint
npm run lint:eslint       # eslint only

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

Snapshot baselines: `__vis__/linux/__baselines__/` (CI) and `__vis__/darwin/__baselines__/` (macOS).

---

## 6. SVG Component Guidelines

Instrument components are SVG-based (copied from Figma).
Required modifications after pasting:

- Replace hard-coded colors with CSS variables: `fill: var(--element-active-color);`
- Add `vector-effect="non-scaling-stroke"` for non-scaling strokes.
- Split large SVGs into smaller composable template fragments for readability.

---

## 7. CSS / PostCSS Reference

- Global palette: `src/variables.css` (bright, day, dusk, night themes via `data-obc-theme` attribute).
- `@mixin style style=<flat|normal|raised|amplified|indent|selected> [visibleWrapperClass=.class]` — elevation styling.
- Text mixins: `@mixin font-body-active`, `@mixin font-body`, `@mixin font-button`, `@mixin font-label-active`, `@mixin font-label`, `@mixin font-overline`.
- Icon slots: use `<obi-placeholder></obi-placeholder>` or other `<obi-*>` icons (1000+ available).

---

## 8. Behavioral Rules for AI Agents

1. **Read before writing.** Always read the relevant source, story, and instruction file before modifying a component.
2. **Follow the three-pattern strategy** (§ 3) when writing or updating JSDoc.
3. **Respect glob-scoped instructions** (§ 4) — read the matching `.instructions.md` file when touching files in its scope.
4. **Do not edit auto-generated packages** (`-react`, `-vue`, `-ng`, `-svelte`). Run `npm run wrappers` (or `npm run build:wrappers`) instead.
5. **Run `npm run analyze`** after adding or renaming a `@customElement` to keep `custom-elements.json` in sync.
6. **Run `npm run lint`** after code changes to catch issues early.
7. **Insert `TODO(designer)`** for any documentation detail whose purpose is unclear from code alone.
8. **Keep stories tagged** with `['autodocs', '6.0']` for documented OB 6.0 components; `['alpha']` for in-development; `['!snapshot']` to exclude from visual tests.
9. **Do not run full builds or start Storybook automatically.** Avoid `npm run build`, `npm run storybook` unless the user explicitly requests it. These are expensive, long-running operations.
10. **Run visual tests for a single component** instead of the full suite:
    ```bash
    npx vitest run --project storybook 'component-name'
    ```
11. **Update baselines for a single component:**
    ```bash
    npx vitest run --project storybook --update 'component-name'
    ```
12. **Always verify after updating baselines** — re-run the test without `--update` to confirm the new baselines are stable:
    ```bash
    npx vitest run --project storybook 'component-name'
    ```

---

## 9. Related Documentation

| Document | Purpose |
|---|---|
| [IMPLEMENTATION_GUIDELINES.md](IMPLEMENTATION_GUIDELINES.md) | Detailed architecture, PostCSS mixins, SVG practices, component creation |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution workflow, commit conventions, PR guidelines |
| [packages/openbridge-webcomponents/README.md](packages/openbridge-webcomponents/README.md) | Installation, setup, bundle usage |
| [.cursor/rules/comments.mdc](.cursor/rules/comments.mdc) | Full JSDoc template and structured-tag rules |
| [.github/instructions/](.github/instructions/) | Path-scoped instruction files for component families |
| [packages/openbridge-webcomponents/script/docgen/](packages/openbridge-webcomponents/script/docgen/) | OpenAI-powered JSDoc generation CLI (`docs-gen.ts`) |
