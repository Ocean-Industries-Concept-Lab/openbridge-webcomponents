# Implementation guidelines

The project is divided into three main parts:

1. [openbridge-webcomponents](packages/openbridge-webcomponents/README.md) — the core Lit web component library

   This package contains the implementation of the web components.
   The components are implemented through the use of the [LitElement](https://lit-element.polymer-project.org/) library.

   For each component, there is a corresponding folder in the `packages/openbridge-webcomponents/src/components` directory.
   The components are implemented in the `*.ts` files and the corresponding `*.css` files, with a `*.stories.ts` file for the storybook.

2. [openbridge-webcomponents-vue](packages/openbridge-webcomponents-vue/README.md) / [openbridge-webcomponents-react](packages/openbridge-webcomponents-react/README.md) — auto-generated framework wrappers

   Vue, React, Angular, and Svelte wrappers are auto-generated from the web components:

   ```bash
   npm run build:wrappers
   ```

   ⚠️ **Warning:** Do not edit the generated wrapper packages directly.

3. [vue-demo](packages/vue-demo/README.md) / [react-demo](packages/react-demo/README.md) — demo applications

## 📚 Storybook stories

Each component's `*.stories.ts` file should:

- Use `tags: ['autodocs', '6.0']` for documented OpenBridge 6.0 components
- Use `tags: ['alpha']` for components still in development
- Use `tags: ['skip-test']` to exclude a story from visual snapshot testing
- Export a `Default` story and additional stories for key states and variants

### Title conventions

All story `title` and `name` fields use **Title Case** with `/`-separated segments.
This is enforced by the ESLint rule `openbridge/storybook-title-case` (auto-fixable via `--fix`).

- Capitalize every word: `Alert List Item`, `Speed Gauge`, `Automation Button`.
- Keep short conjunctions and prepositions lowercase: _and, of, or, in, on, at, to, for_.
  Example: `Message and Alerts`, `Selection Controls and Switches`.
- First and last words of a phrase are always capitalized, even if they are conjunctions/prepositions.
- Use spaces, not dashes: `Automation Configurations` not `Automation-configurations`.
- Parenthesized content is left as-is: `Minimal Height Donut (48px)`.
- Apply the same rules to every segment: `title: 'UI Components/Input Controls/Slider Double'`.

## 🧪 Testing

Visual snapshot tests are run via [Vitest](https://vitest.dev/) + [storybook-addon-vis](https://github.com/nickelspy/storybook-addon-vis) + Playwright.

### Local Testing

To run tests locally, you need to have Playwright browsers installed:

```bash
# Install Chromium (required for snapshot tests)
npx playwright install --with-deps chromium

# Run all snapshot tests
npm run test-storybook

# Update snapshots interactively (press 'u' in Vitest terminal)
# Or replace baselines wholesale:
npm run update-snapshots
```

Snapshot baselines are stored in `__vis__/linux/__baselines__/` (and `__vis__/darwin/__baselines__/` for macOS). Since snapshot results are highly dependent on the environment (OS, fonts, etc.), it is recommended to use Docker for generating canonical snapshots.

### Docker Testing

For a consistent testing environment, it is recommended to run tests using Docker. This ensures that snapshots are always generated on the same Linux environment as the CI.

#### Requirements

- Docker must be installed and running on your machine.
- On Linux, your user should have permissions to run Docker commands without `sudo`.
- The `openbridge-webcomponents` package is built (from repository root): `npm ci && cd packages/openbridge-webcomponents && npm run build`

#### 1. Build the Docker Image

The Docker image is based on the Playwright Ubuntu image and contains all dependencies. Run the following command from the repository root:

```bash
npm run build:docker-for-storybook-testing
```

#### 2. Run Tests in Docker

You can run the Storybook tests inside the container. This will mount your local files into the container, allowing it to write snapshot results back to your host machine.

From `packages/openbridge-webcomponents`:

```bash
npm run test-storybook:docker
```

Note: The script uses `--user $(id -u):$(id -g)` to ensure that any files created by the container (like snapshot results) are owned by your host user. It uses a temporary directory for visual results (`/tmp/openbridge-webcomponents-vis-results`) to avoid permission conflicts.

#### 3. Update Snapshots from Docker Results

After running the tests in Docker, the results are stored in `/tmp/openbridge-webcomponents-vis-results` on your host. To update your local baselines with these results:

```bash
# From packages/openbridge-webcomponents
# 1. Create results directory if it doesn't exist
mkdir -p __vis__/linux/__results__

# 2. Copy results from temp to package directory
cp -r /tmp/openbridge-webcomponents-vis-results/* __vis__/linux/__results__/

# 3. Run the update script (replaces baselines with results)
npm run update-snapshots
```

## 🎨 PostCSS

The CSS files are post-processed by [PostCSS](https://postcss.org/).
There is one global CSS file for the palettes, `variables.css`, which contains the color palettes for the components.
All other CSS code should be kept in the `*.css` files in the component folders.

> **⚠️ `src/palettes/variables.css` is generated, not authored.**
> The file is produced by the [OpenBridge devtools Figma plugin](https://github.com/Ocean-Industries-Concept-Lab/obc-figma-plugin)
> (published as [Figma community plugin `1448419213272098259`](https://www.figma.com/community/plugin/1448419213272098259)).
> The plugin's `cssvariables` codegen emits the entire file in one go: the
> four `.obc-component-size-*` blocks (from the `Component-size` collection),
> the `* { … }` block (`typography-primitives` + `Set-component-corners` +
> `component-primitives` + shadow composites), the four
> `:root[data-obc-theme="…"]` blocks (from the `Palette` collection, with
> variable alias chains flattened to literal `rgb(…)` values per theme), and
> the `@property` / `@keyframes warning-blink` machinery at the bottom.
>
> **Do not hand-edit `variables.css`.** Any local change will be silently
> overwritten the next time someone pastes new plugin output. To add,
> rename, or change a token, the workflow is:
>
> 1. Change the variable in Figma (or, for name normalisation only, in the
>    plugin's `rename()` function in `code.ts`).
> 2. Re-run the plugin (Figma → Dev Mode → Inspect → "css variables export").
> 3. Replace `variables.css` wholesale with the plugin output and commit.
>
> The same plugin also produces:
>
> - **`script/figmavariables.json`** (via its `variables` codegen) — a
>   `VariableID → token-name` lookup consumed by `script/convert-icons.ts`
>   to rewrite hex colors back into `var(--…)` references in downloaded icons.
> - **`src/mixins/fonts.css`** is regenerated wholesale by the plugin's
>   `font-exports` codegen — replace the entire file on each regeneration.
>   Hand-curated font mixins that the plugin does **not** produce live in a
>   sibling file, **`src/mixins/font-extras.css`** (currently
>   `font-overlay-outline-shadow` and the `font-instrument-*-box` family
>   used by `readout`, `readout-list-item`, `readout-setpoint`, and
>   `ar/poi-header`). PostCSS auto-loads every file in `src/mixins/`
>   (see `postcss.config.mjs` → `mixinsDir`), so adding new mixins to
>   `font-extras.css` requires no other wiring. Always run
>   `npm run lint:mixins` after regenerating `fonts.css` — a dropped
>   definition produces an undefined-mixin error rather than silent
>   breakage (`@mixin missing;` expands to nothing).
>
> The audit at `script/check-css-variables.ts` will catch consumer CSS that
> references tokens missing from `variables.css`, but it cannot catch tokens
> that are missing from Figma itself — those need a designer round-trip.
>
> **How to run the plugin (browser Figma):**
>
> The plugin is a **codegen plugin** (`"capabilities": ["codegen"]`,
> `"editorType": ["dev"]` in its manifest), so it does **not** open as a
> regular plugin window from the Plugins tab. Its output appears inside
> Dev Mode's Inspect panel.
>
> **Which Figma file do I open?** There are two canonical files, and each
> codegen reads from a specific one. Running the wrong codegen against the
> wrong file produces output that looks plausible but is silently broken
> (e.g. `figmavariables.json` keys that no icon will ever match).
>
> | Repo target file             | Codegen language       | Source Figma file                                               | Why this file                                                                                                                                                                                                             |
> | ---------------------------- | ---------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `src/palettes/variables.css` | `css variables export` | **OpenBridge 6.1** (main design file, `kQMFf24Y1ry43HJWOStqd8`) | Variable **definitions** live here — `valuesByMode` per theme, the per-size-class numbers, etc.                                                                                                                           |
> | `src/mixins/fonts.css`       | `Font exports`         | **OpenBridge 6.1** (main design file)                           | Text-style definitions live here.                                                                                                                                                                                         |
> | `script/figmavariables.json` | `variables map`        | **OpenBridge Icons** (`IkDwOtza6OdjLbIdWA7mI7`)                 | The map keys are `VariableID/<nodeId>` where `<nodeId>` is the icon component node that consumes the variable. `convert-icons.ts` matches by that exact key, so the map must be exported from the file the icons live in. |
>
> The icons file only **references** palette variables (it does not define
> them), and the main design file does not contain icon component node IDs —
> so the two files are not interchangeable for either codegen.
>
> **Dev Mode access caveats.** Dev Mode requires a Professional / Organization
> / Enterprise seat — a free seat will not show the codegen UI. If you only
> have view access on the canonical file, the workflow is:
>
> - **Best:** ask the design lead for editor / Dev Mode access on the
>   canonical file. Variables in a duplicate drift the moment the original is
>   edited.
> - **Workaround (drafts duplicate):** **File → Duplicate to your drafts** on
>   the canonical file. Open the draft in Dev Mode and run the codegen there.
>   The duplicate inherits the source file's variables at the moment of the
>   copy. Always re-duplicate before each export run; never let a stale
>   drafts copy linger — you will silently miss any token the design lead
>   added since you last duplicated.
> - The icons file (`IkDwOtza6OdjLbIdWA7mI7`) is usually shared more openly
>   than the main design file, so you may have Dev Mode on the icons file
>   directly and need the drafts trick only for the main file.
>
> **Steps once you have the file open in Dev Mode:**
>
> 1. From the [community plugin page](https://www.figma.com/community/plugin/1448419213272098259)
>    click **Open in…** and pick the file (only needed the first time).
> 2. Select **any node** in the canvas — the codegen panel only renders when
>    something is selected, but for `cssvariables` / `font-exports` /
>    `variables` the output comes from the file's local variables and text
>    styles, not from the selected node.
>    - **Exception:** the `variables map` codegen emits one JSON block per
>      selected node's bindings. To get the full map in one go, select a
>      page-level or large multi-frame node; selecting a single icon yields
>      only the 5–10 bindings on that one icon. If the plugin still chunks
>      the output across multiple codegen runs, paste each block into a
>      scratch file and merge them (Object.assign — same key always maps to
>      the same token, so order does not matter).
> 3. In the right sidebar's **Inspect** tab, scroll to the bottom. The
>    **"Codegen Plugin"** section is the plugin's output area.
> 4. In that section's header there is a small language dropdown (defaults to
>    `css`). Switch it to the codegen you need (see the table above):
>    - `css variables export` → replaces `src/palettes/variables.css`
>    - `Font exports` → replaces `src/mixins/fonts.css` wholesale
>      (hand-curated companion mixins live in `src/mixins/font-extras.css`)
>    - `variables map` → replaces `script/figmavariables.json`
>    - `css` → per-node CSS, not used for repo regeneration
> 5. Click the copy icon at the top-right of the Codegen Plugin section and
>    paste into the corresponding repo file. Diff carefully before committing.

Most mixins are defined in `src/mixins/` and auto-loaded via `postcss-mixins` (configured in `postcss.config.mjs`); the `style` mixin used for elevation variants is defined inline in `postcss.config.mjs`. All mixins are available globally in component CSS — no `@import` is needed.

---

### Component Layout Architecture

#### Touch Target / Visual Target (two-layer) pattern

Every interactive component uses a **two-layer DOM structure**: an invisible outer **touch target** and a visible inner **visual target**.

```text
┌─────────────────────────────────┐  ← outer wrapper (touch target, e.g. 48px)
│                                 │     detects :hover, :active, :focus-visible
│   ┌─────────────────────────┐   │
│   │    visible-wrapper      │   │  ← inner element (visual target, e.g. 32px)
│   │    receives bg / border │   │     styled surface the user sees
│   └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

The outer layer is sized to meet minimum touch-target accessibility requirements (default 48 × 48 px). The inner layer is the drawn surface — smaller, with border-radius, background, and border. The space between them is transparent but clickable.

**Token naming convention:**

| Layer         | Token pattern                                                      | Example                                    |
| ------------- | ------------------------------------------------------------------ | ------------------------------------------ |
| Touch target  | `--{namespace}-{component}-touch-target-size`                      | `--ui-components-button-touch-target-size` |
| Visual target | `--{namespace}-{component}-visual-size` (or `-visual-target-size`) | `--ui-components-button-visual-size`       |

These tokens are defined per size variant (see [Size Variants](#size-variant-classes) below), so scaling is automatic.

**CSS pattern:**

```css
.wrapper {
  height: var(--ui-components-button-touch-target-size); /* 48px */
  min-width: var(--ui-components-button-touch-target-size);
  display: flex;
  align-items: center;
  justify-content: center;
  /* transparent — no border or background */
  @mixin style style=flat visibleWrapperClass=.visible-wrapper;
}

.visible-wrapper {
  height: var(--ui-components-button-visual-size); /* 32px */
  border-radius: var(--ui-components-button-border-radius);
  /* background and border injected by @mixin style */
}
```

**HTML (Shadow DOM):**

```html
<button class="wrapper">
  <div class="visible-wrapper">
    <slot name="icon"></slot>
    <span class="label">Click me</span>
  </div>
</button>
```

**Non-interactive components** (e.g. progress-bar, instrument displays) do **not** use the two-layer pattern — they have no touch target and simply fill their container.

---

### `@mixin style` — Elevation & Interaction State Machine

The `style` mixin (defined in `postcss.config.mjs`) generates background, border, and cursor rules for **six interaction states** at build time.

#### Parameters

| Parameter             | Required | Values                                                        | Description                                                                                                  |
| --------------------- | -------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `style`               | Yes      | `flat`, `normal`, `raised`, `amplified`, `indent`, `selected` | Elevation variant — determines which color variable family is used                                           |
| `visibleWrapperClass` | No       | CSS selector (e.g. `.visible-wrapper`)                        | Targets the inner visual element; if omitted, styles apply directly to the element with the mixin            |
| `noClick`             | No       | (flag)                                                        | Emits only the `enabled` state — no hover, active, focus, or disabled rules. Used for display-only sub-parts |

#### Generated states

For `@mixin style style=normal visibleWrapperClass=.visible-wrapper` the mixin expands to:

| State             | Selector                                                     | What it sets                                                                                                                      |
| ----------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Enabled**       | `& .visible-wrapper`                                         | `border-color: var(--normal-enabled-border-color)`, `background-color: var(--normal-enabled-background-color)`, `cursor: pointer` |
| **Activated**     | `&.activated .visible-wrapper`                               | `border-color: var(--normal-activated-border-color)`, …                                                                           |
| **Hover**         | `@media (hover:hover) { &:hover .visible-wrapper }`          | Uses `color-mix()` with `--obc-can-hover` for smooth hover control                                                                |
| **Pressed**       | `&:active .visible-wrapper`                                  | `border-color: var(--normal-pressed-border-color)`, …                                                                             |
| **Focus-visible** | `&:focus-visible .visible-wrapper`                           | `outline-color: var(--border-focus-color)`, `outline-width: var(--global-size-spacing-border-weight-focusframe)`                  |
| **Disabled**      | `&:disabled .visible-wrapper`, `&.disabled .visible-wrapper` | `cursor: not-allowed`, `color: var(--on-normal-disabled-color)`                                                                   |

It also sets `cursor: pointer` on `&` itself and `outline: none` on `&:focus` (visible outline only on `:focus-visible`).

#### Color token naming convention

The mixin references color variables that follow a consistent pattern:

| Purpose                | Pattern                                | Example                                                                             |
| ---------------------- | -------------------------------------- | ----------------------------------------------------------------------------------- |
| Surface background     | `--{variant}-{state}-background-color` | `--flat-enabled-background-color`                                                   |
| Surface border         | `--{variant}-{state}-border-color`     | `--raised-hover-border-color`                                                       |
| Text / icon on surface | `--on-{variant}-{role}-color`          | `--on-normal-active-color`, `--on-flat-neutral-color`, `--on-raised-disabled-color` |

Where:

- **variant** = `flat`, `normal`, `raised`, `amplified`, `indent`, `selected` (or `integration-normal`, etc.)
- **state** = `enabled`, `activated`, `hover`, `pressed`, `focused`, `disabled`
- **role** = `active` (primary text/icon), `neutral` (secondary), `disabled`

All these variables are defined per theme in `variables.css`.

#### `noClick` — display-only sub-parts

Use `noClick` when a sub-element needs the design system's colors but is not itself interactive (e.g. a checkbox's inner box, a table header, an indent track):

```css
.checkbox-box {
  @mixin style style=indent noClick visibleWrapperClass=.checkbox-box;
}
```

This emits only the enabled-state border and background — no hover, active, focus, or disabled rules.

#### `.activated` class

The mixin always generates an `.activated` rule. Toggle it programmatically via `classMap`:

```ts
<div class=${classMap({wrapper: true, activated: this.checked})}></div>
```

#### Full example with elevation variants

```css
/* Touch target — no visible styling */
.wrapper {
  height: var(--ui-components-button-touch-target-size);
  min-width: var(--ui-components-button-touch-target-size);
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper.flat {
  @mixin style style=flat visibleWrapperClass=.visible-wrapper;
  .button-text {
    color: var(--on-flat-active-color);
  }
}

.wrapper.normal {
  @mixin style style=normal visibleWrapperClass=.visible-wrapper;
  .button-text {
    color: var(--on-normal-active-color);
  }
}

.wrapper.raised {
  @mixin style style=raised visibleWrapperClass=.visible-wrapper;
  .button-text {
    color: var(--on-raised-active-color);
  }
}

/* Visual target */
.visible-wrapper {
  height: var(--ui-components-button-visual-size);
  border-radius: var(--ui-components-button-border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

### `--obc-can-hover` — Hover Kill-Switch

Defined in `src/main.css`:

```css
html {
  --obc-can-hover: 1;
}
```

The `@mixin style` hover state uses `color-mix()` to blend hover colors based on this variable:

```css
background-color: color-mix(
  in srgb,
  var(--flat-hover-background-color) calc(var(--obc-can-hover) * 100%),
  var(--base-background-color)
);
```

- `1` → full hover feedback (default)
- `0` → hover colors are invisible (100% base color)

This is wrapped in `@media (hover:hover)`, so touch-only devices never see hover styles regardless of this value.

---

### Alert & Alarm Mixins

Three alert-level mixins in `src/mixins/alert.css` provide interaction states for alarm-colored buttons:

| Mixin                                 | Color variable prefix | Usage                    |
| ------------------------------------- | --------------------- | ------------------------ |
| `@mixin alert-alarm $wrapperClass`    | `--alarm-*`           | Highest severity         |
| `@mixin alert-critical $wrapperClass` | `--critical-*`        | Critical severity        |
| `@mixin alert-caution $wrapperClass`  | `--caution-*`         | Caution/warning severity |

Each generates `enabled`, `hover`, `active`, and `focus-visible` states — same pattern as `@mixin style` but with alarm-specific color families.

#### Alarm blink animation

`variables.css` registers four CSS `@property` values used for blink animation:

```css
@property --alarm-blink-on {
  syntax: "<number>";
  inherits: true;
  initial-value: 1;
}
@property --alarm-blink-off {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@property --warning-blink-on {
  syntax: "<number>";
  inherits: true;
  initial-value: 1;
}
@property --warning-blink-off {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
```

A shared `@keyframes warning-blink` orchestrates two blink rates:

- **Alarm** blinks 4× per cycle (fast)
- **Warning** blinks 2× per cycle (slow)

Components apply the animation by binding opacity to these properties:

```css
.blinking.alert-type-alarm .visible-wrapper {
  opacity: var(--alarm-blink-on);
}
.blinking.alert-type-alarm .blink {
  opacity: var(--alarm-blink-off);
}
```

---

### Other CSS Mixins

| File                              | Mixin                                                                | Purpose                                                                                                               |
| --------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `src/mixins/card.css`             | `@mixin card`                                                        | Card surface: `border-radius: 8px`, `background: var(--container-global-color)`, `box-shadow: var(--shadow-floating)` |
| `src/mixins/outline-inward.css`   | `@mixin outline-inward $wrapperClass`                                | Focus outline with `outline-offset: -2px` applied on `:focus-visible`                                                 |
| `src/mixins/base-input-field.css` | Several (`base-input-field-wrapper`, `base-input-field-label`, etc.) | Shared input field chrome: labels, helper text, error borders, disabled states                                        |
| `src/mixins/scrollbar.css`        | `@mixin scrollbar`                                                   | Custom scrollbar styling via `::-webkit-scrollbar-*` pseudo-elements. Uses `--obc-scrollbar-*` variables              |

---

### Font Mixins

All font mixins are defined in `src/mixins/fonts.css`. Each sets `font-family`, `font-weight`, `font-size`, `line-height`, and `font-feature-settings` from design-token variables.

#### UI fonts

For buttons, labels, body text, and headings:

| Mixin                         | Typical use                |
| ----------------------------- | -------------------------- |
| `@mixin font-button`          | Button labels              |
| `@mixin font-button-two-line` | Two-line button labels     |
| `@mixin font-button-l`        | Large button labels        |
| `@mixin font-label`           | Secondary labels, captions |
| `@mixin font-label-active`    | Active/selected labels     |
| `@mixin font-body`            | Body text                  |
| `@mixin font-body-active`     | Bold body text             |
| `@mixin font-overline`        | Overline text              |
| `@mixin font-overline-new`    | Updated overline text      |
| `@mixin font-subtitle`        | Subtitles                  |
| `@mixin font-title`           | Titles                     |

#### Instrument fonts

For numeric readouts, units, and scale labels in gauges and instruments:

| Mixin                                           | Typical use                    |
| ----------------------------------------------- | ------------------------------ |
| `@mixin font-instrument-value-small-active`     | Small active numeric value     |
| `@mixin font-instrument-value-small-neutral`    | Small neutral numeric value    |
| `@mixin font-instrument-value-regular-active`   | Regular active numeric value   |
| `@mixin font-instrument-value-regular-neutral`  | Regular neutral numeric value  |
| `@mixin font-instrument-value-m-active`         | Medium active numeric value    |
| `@mixin font-instrument-value-m-neutral`        | Medium neutral numeric value   |
| `@mixin font-instrument-value-enhanced-active`  | Enhanced active numeric value  |
| `@mixin font-instrument-value-enhanced-neutral` | Enhanced neutral numeric value |
| `@mixin font-instrument-label`                  | Instrument labels and units    |
| `@mixin font-instrument-unit`                   | Unit suffixes (%, °, kn)       |
| `@mixin font-instrument-tick-mark`              | Scale tick labels              |
| `@mixin font-instrument-tick-mark-active`       | Active scale tick labels       |

#### Automation fonts

For automation readouts and state labels:

| Mixin                                      | Typical use                      |
| ------------------------------------------ | -------------------------------- |
| `@mixin font-automation-value-small`       | Small automation readout (on)    |
| `@mixin font-automation-value-small-off`   | Small automation readout (off)   |
| `@mixin font-automation-value-regular`     | Regular automation readout (on)  |
| `@mixin font-automation-value-regular-off` | Regular automation readout (off) |
| `@mixin font-automation-value-enhanced`    | Enhanced automation readout      |

#### Overlay font

| Mixin                                | Purpose                                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| `@mixin font-overlay-outline-shadow` | Text shadow for legibility on map/video overlays (defined in `src/mixins/font-extras.css`) |

---

### Size Variant Classes

All size-dependent tokens are defined four times in `variables.css`, once per size class:

| Class                                  | Touch target | Visual target | Icon size |
| -------------------------------------- | ------------ | ------------- | --------- |
| `:root`, `.obc-component-size-regular` | 48 px        | 32 px         | 24 px     |
| `.obc-component-size-medium`           | 56 px        | 40 px         | 32 px     |
| `.obc-component-size-large`            | 72 px        | 56 px         | 40 px     |
| `.obc-component-size-xl`               | (larger)     | (larger)      | (larger)  |

Each class overrides the same variable names (`--global-size-spacing-touch-target-min`, `--global-size-spacing-visual-target-min`, `--global-size-spacing-icon-icon-size-regular`, all `--ui-components-*` sizing tokens, typography tokens, etc.) with scaled values.

**Usage:** Apply the size class on a parent element; all descendant components automatically resize via CSS variable inheritance:

```html
<div class="obc-component-size-large">
  <obc-button label="Bigger"></obc-button>
  <!-- 72px touch, 56px visual -->
</div>
```

Components should never reference a specific size class internally — they consume the tokens and let the ancestor decide.

---

### Theme Switching

Four theme blocks in `variables.css` override hundreds of color variables:

```css
:root,
:root[data-obc-theme="day"] {
  /* default */
}
:root[data-obc-theme="dusk"] {
  /* ... */
}
:root[data-obc-theme="night"] {
  /* ... */
}
:root[data-obc-theme="bright"] {
  /* ... */
}
```

Set `data-obc-theme` on `<html>` or any ancestor to switch themes:

```html
<html data-obc-theme="night"></html>
```

Every theme overrides the same variable names (`--element-active-color`, `--container-global-color`, `--flat-enabled-background-color`, etc.), so components reference variables directly and are theme-agnostic.

---

### Common Structural CSS Patterns

These patterns appear across most components and can be used as a baseline when creating new ones:

| Pattern                                             | Usage                                           | Where                                                   |
| --------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------- |
| `* { box-sizing: border-box; }`                     | Prevents padding from expanding elements        | Top of most component CSS files                         |
| `user-select: none`                                 | Prevents text selection on interactive elements | `.wrapper` of all buttons/controls                      |
| `appearance: none; border: none; background: none;` | Resets native `<button>` styling                | `.wrapper` when using `<button>` as the outer element   |
| `:host { display: block; }`                         | Block-level components (tables, modals, lists)  | Component host                                          |
| `:host { display: inline-block; }`                  | Inline interactive elements (buttons)           | Component host                                          |
| `:host { display: inline-flex; }`                   | Charts and inline containers                    | Component host                                          |
| `* { -webkit-tap-highlight-color: transparent; }`   | Removes blue tap flash on mobile                | Auto-injected by PostCSS plugin in `postcss.config.mjs` |

#### `::slotted()` styling for icons

Slotted icons are constrained to the component's icon-size token:

```css
.visible-wrapper ::slotted([slot="icon"]) {
  width: var(--ui-components-icon-button-icon-size);
  height: var(--ui-components-icon-button-icon-size);
}
```

## 🎴 Icons

All icon components live in `packages/openbridge-webcomponents/src/icons` and are
**fully generated** from Figma — never hand-edit them. The pipeline is:

1. `script/download-icons.ts` (`npm run download:icons`) fetches every node tagged
   as an icon from the OpenBridge Figma file via the [`figma-api`](https://www.npmjs.com/package/figma-api)
   package, rasterises each node's vector data to an SVG payload, and writes the
   raw SVGs to `script/.cache/icons/*.svg` (gitignored).
2. `script/convert-icons.ts` walks the cache and emits one Lit element per icon
   (`src/icons/icon-<kebab-name>.ts`, registered as `<obi-<kebab-name>>`), plus
   the barrel `src/icons/index.ts` and the runtime registry `src/icons/names.ts`.
3. For each fill/stroke color the converter looks up the Figma `VariableID` in
   `script/figmavariables.json` and rewrites the literal hex into
   `var(--<token>)` so themed icons follow the active palette. Unknown IDs fall
   back to the literal hex color (see "Unknown variable fallback" below).

### Inputs

| File / env                               | Tracked? | Notes                                                                                                                                                                                                                                           |
| ---------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/openbridge-webcomponents/.env` | No       | Must set `FIGMA_TOKEN=<personal access token>` (read-only scope is sufficient).                                                                                                                                                                 |
| `script/figmavariables.json`             | Yes      | `VariableID → token-name` map emitted by the [obc-figma-plugin](#-postcss) `variables` codegen. Must be exported from the **icons file** (not the main design file), because the converter matches the binding's per-node-id key.               |
| `script/.cache/icons/*.svg`              | No       | Per-icon SVG payloads. Cleared on each run.                                                                                                                                                                                                     |
| `script/.cache-figma.json`               | No       | ~30 MB raw Figma API response cache, reused across runs to avoid re-downloading.                                                                                                                                                                |
| `script/.cache/unknown-variables.json`   | No       | Written after every `npm run download:icons` run. Lists `VariableID`s referenced by icons but missing from `script/figmavariables.json` (empty array when fully resolved).                                                                      |
| `OBC_USE_CACHE=1`                        | n/a      | Env var. When set, `download-icons` reuses the on-disk `cache-figma.json` and `.cache/icons/*.svg` instead of calling the Figma API. Useful when iterating on `convert-icons.ts` or refreshing `figmavariables.json` without burning API quota. |

### Step-by-step refresh

Run everything from `packages/openbridge-webcomponents/`.

1. **Branch.** `git switch -c chore/refresh-figma-icons` off `develop`.
2. **Token.** Ensure `.env` contains a valid `FIGMA_TOKEN`.
3. **Variable map.** If the design lead has updated the OpenBridge color tokens,
   regenerate `script/figmavariables.json` first. **This must come from the
   OpenBridge Icons Figma file (`IkDwOtza6OdjLbIdWA7mI7`), not the main
   design file** — the map keys include the icon component node IDs the
   converter matches against (see the [Figma source files matrix](#-postcss)).
   In Dev Mode → Inspect → Codegen Plugin, switch the language dropdown to
   `variables map`, select a page-level or multi-frame node (so the codegen
   emits the full map, not a 5–10-entry slice for one icon), copy, and
   replace `script/figmavariables.json`. If the plugin chunks the output
   across multiple runs, paste each block into a scratch file and merge
   (Object.assign — same key always maps to the same token).
4. **Backup.** `cp -r src/icons /tmp/icons-backup-prev` — gives you a diff target
   if you need to recover variable mappings that the new run dropped.
5. **Download + generate.**
   ```bash
   npm run download:icons
   ```
   Expect 2000+ icons to be written. Warnings such as
   `Duplicate icon name <name>` indicate Figma-side duplicates that get
   deduplicated by overwrite — flag them with the design lead. A trailing
   `done` line means generation succeeded.
6. **Check for unresolved tokens.**
   ```bash
   grep -rlE 'var\(--undefined\)' src/icons/ | wc -l   # must be 0
   cat script/.cache/unknown-variables.json            # must be []
   npm run lint:icons                                   # must report 0 hex leaks
   ```
   If any of these tripwires fires, see "Unknown variable fallback" below. The
   `var(--undefined)` grep alone is **not sufficient** — the converter falls
   back to literal hex rather than emitting `var(--undefined)`, so silent
   regressions only show up via `unknown-variables.json` and `lint:icons`.
7. **Typecheck & lint.**
   ```bash
   npx tsc --noEmit
   npm run lint
   ```
8. **Refresh visual baselines** (see "Visual snapshots" below).
9. **Verify bundle stays under the PWA cap.** `vue-demo`'s service worker is
   capped at 7 MB per file (`workbox.maximumFileSizeToCacheInBytes`).
   ```bash
   npm run build --workspace=vue-demo
   ```
   Inspect the largest emitted chunk.
10. **Commit.** Squash all the regenerated noise into a single
    `chore: refresh icons from Figma` (or `feat:` if you also changed the
    consuming components). Keep `script/figmavariables.json` and any
    `script/convert-icons.ts` changes in the same commit.

### Unknown variable fallback

When `convert-icons.ts` encounters a `VariableID` that is not in
`figmavariables.json`, it falls back to the literal hex color
(`fill="#XXXXXX"` / `stroke="#XXXXXX"`) rather than emitting
`var(--undefined)`. This keeps the regen unblocked when designers add brand-new
palette tokens that have not been re-exported yet, but it means the resulting
icon will not follow theme switches until the token is added.

Two recovery paths, depending on the cause:

- **Token exists in Figma, just missing from the JSON** — re-run the
  obc-figma-plugin `variables` codegen and overwrite `script/figmavariables.json`,
  then re-run `npm run download:icons`. Hex fallbacks should disappear.
- **Token does not yet exist in the palette** — accept the hex fallback for
  this PR, file a follow-up with the design lead to add the missing token, then
  do a second regen pass once the palette ships.

The `script/.cache/unknown-variables.json` diagnostic file (written on every
`npm run download:icons` run) lists every unresolved `VariableID`. The
parallel `npm run lint:icons` check (`script/check-icon-hex-leaks.ts`)
zero-tolerance-fails on any remaining literal hex `fill`/`stroke` attribute
in `src/icons/*.ts`, printing the offending `file → attr` pairs. Together
the two tripwires force every unbound or fallback color to be acknowledged
in a PR instead of silently producing a non-themed icon. If a future
legitimate exception arises (e.g. a regulatory color that must not follow
the theme), prefer adding an explicit allowlist to
`script/check-icon-hex-leaks.ts` over reintroducing a sliding budget.

### Touching the consuming components (worked example: wind)

Icon family renames or bucket changes (e.g. the wind family migrating from
`wind-true-1` through `wind-true-14` to bucket-named
`wind-true-{0,1,5,10,15,…,100}` and `wind-shaft-{0,1,5,…,100}`) require code
changes in any component that imports specific icons. The wind indicator is the
canonical worked example because it is the only component that snaps a numeric
sensor value to a discrete icon glyph.

Files to update when an icon family changes:

1. **The wind icon mapper** —
   `src/navigation-instruments/watch/environment.ts`.
   - Re-import every bucket from the new family with an **explicit per-icon
     import** (not via `icons/index.js`) so the PWA can tree-shake — the wind
     consumers must stay under the 7 MB Workbox cap.
   - Export the bucket list as a `readonly` array (e.g. `WIND_TRUE_BUCKETS`,
     `WIND_SHAFT_BUCKETS`).
   - Provide a snap helper such as
     `windKnotsToBucket(knots, buckets)` that returns the nearest bucket by
     absolute distance (ties resolve to the lower bucket). Wrap it in
     family-specific helpers (`windKnotsToWindTrueBucket`,
     `windKnotsToWindShaftBucket`) so consumers do not import the bucket arrays
     themselves.
   - Keep any legacy index-based helper that downstream code still needs (the
     wind indicator's inline barb glyphs are indexed 1..14, fed by a renamed
     `windKnotsToShaftTrueLevel`).
2. **The wind indicator** —
   `src/navigation-instruments/wind-indicator/wind-indicator.ts`.
   - Import the explicit `obi-wind-true-*` / `obi-wind-shaft-*` set.
   - Use the bucket helpers from `environment.ts` to build the tag name
     (`obi-wind-true-${windKnotsToWindTrueBucket(...)}`).
   - Prefer the CSS-color variant of each icon (`instance.iconCss ?? instance.icon`)
     so theme tokens drive the color; the `var(--currentColor)` path is the
     fallback.
   - Rename any public/private surface (`iconIndex` → `iconLevel`, etc.) and
     update the matching `*.stories.ts` `argTypes` so Storybook controls match.
3. **Wrappers around the indicator** (`wind/wind.ts`,
   `wind-propulsion/wind-propulsion.ts`) usually need no changes — they re-export
   the indicator's API.

A handful of other components reference specific icons directly
(`automation/**`, `building-blocks/**`, etc.). Run a workspace grep for the old
icon names before assuming the wind change is isolated:

```bash
grep -rE "obi-<old-family>-|icon-<old-family>-" src/
```

### Visual snapshots

A broad icon refresh almost always disturbs snapshot baselines because dozens
of components render icons inside their stories. The strategy:

1. **First pass — find the drift.** Run the full suite without `--update`:
   ```bash
   npx vitest run --project storybook
   ```
   Expect failures concentrated in components that render icons. Each failure
   reports the pixel-distance from the baseline.
2. **Inspect a representative diff** under
   `__vis__/linux/__diffs__/<path>/<story>.png` and confirm the change is
   "just" an icon-color or icon-shape update (not a layout regression).
3. **Update scoped first** — for the targeted family (e.g. wind), refresh only
   the affected stories so the diff stays reviewable:
   ```bash
   npx vitest run --project storybook --update src/navigation-instruments/wind-indicator
   ```
4. **Update everything else** that drifted from the icon library churn:
   ```bash
   npx vitest run --project storybook --update src/integration-systems/integration-bar
   ```
   (Repeat per failing path.)
5. **Verify stable.** Re-run the full suite once more without `--update` and
   confirm zero icon-related failures. Pre-existing chart flakes (e.g.
   `polar-chart` Chart.js layout timing) are unrelated to icon work and should
   be triaged separately, not papered over by a baseline refresh.
6. **Linux-only baselines.** The repo only ships `__vis__/linux/__baselines__/`.
   On macOS, the `darwin` directory is populated locally but **not committed**;
   regenerate Linux baselines inside the Docker container described in
   [§ Testing](#docker-testing) if you cannot rely on a Linux dev box.

> **PR size warning:** A full icon refresh routinely touches 1500–2000 files in
> `src/icons/` plus 100–500 baseline PNGs. Reviewers should focus on
> `script/convert-icons.ts`, `script/figmavariables.json`, the consuming
> component(s) (e.g. wind), and a sampling of diff images — not the per-icon
> noise.

## 📄 Create a new component

To create a new component, use the `new:component` script:

```bash
npm run new:component
```

This will create the needed files, using the default template.

## 👶 Naming Conventions

### Boolean properties

Boolean properties and parameters must use **positive** (affirmative) names so that the default value is `false`:

- `showLabels` instead of ~~`hideLabels`~~
- `autoAtSetpoint` instead of ~~`disableAutoAtSetpoint`~~
- `hasBar` instead of ~~`hideBar`~~

This avoids double-negation confusion (e.g. `if (!disableFoo)`) and aligns with the Lit/HTML convention where an absent boolean attribute means `false`.

Booleans that default to `true` must use `attribute: false` to remove the HTML attribute and only allow the JavaScript property:

```ts
@property({type: Boolean, attribute: false}) autoAtSetpoint = true;
```

Framework wrappers (React, Vue, etc.) always set values via properties, so removing the attribute has no effect on wrapper consumers.

See [AGENTS.md § 2](AGENTS.md#2-coding-standards) for the full rule and examples.

## 🧭 SVG based components

Instrument components are based on SVG.
Typically they are implemented by copying the SVG code from Figma and pasting it into the component file.
Note that these modifications should be done:

- Change the colors of the svg with css variables such as `fill: var(--element-active-color);`
- Make stroke non-scaling by adding `vector-effect="non-scaling-stroke"` to the svg tag.

The component file is also more readable if the SVG is splitted up into smaler elements with its own javascript variables.
Then later compiled together.

## 🤖 AI

Code quality and visual precision are very important in this project (even half a pixel matters!). For that reason, try to avoid AI hallucinations as much as possible:

- provide precise context (list all the file names, enums, examples, etc.)
- ask the AI to read the files it is working on into memory (for broader exploration, let it use subagents)
- instruct the AI to ask clarifying questions before it begins
- use the latest AI models (the difference can be huge between a paid or latest model compared to free/older ones)
- keep the AI on a short leash
