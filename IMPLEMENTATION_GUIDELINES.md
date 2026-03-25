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

Visual snapshot tests are run via [Vitest](https://vitest.dev/) + [storybook-addon-vis](https://github.com/nickelspy/storybook-addon-vis) + Playwright:

```bash
# Run all snapshot tests
npm run test-storybook

# Update snapshots interactively (press 'u' in Vitest terminal)
# Or replace baselines wholesale:
npm run update-snapshots
```

Snapshot baselines are stored in `__vis__/linux/__baselines__/` (and `__vis__/darwin/__baselines__/` for macOS).

## 🎨 PostCSS

The CSS files are post-processed by [PostCSS](https://postcss.org/).
There is one global CSS file for the palettes, `variables.css`, which contains the color palettes for the components.
All other CSS code should be kept in the `*.css` files in the component folders.

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

| Layer | Token pattern | Example |
|-------|---------------|---------|
| Touch target | `--{namespace}-{component}-touch-target-size` | `--ui-components-button-touch-target-size` |
| Visual target | `--{namespace}-{component}-visual-size` (or `-visual-target-size`) | `--ui-components-button-visual-size` |

These tokens are defined per size variant (see [Size Variants](#size-variant-classes) below), so scaling is automatic.

**CSS pattern:**

```css
.wrapper {
  height: var(--ui-components-button-touch-target-size);   /* 48px */
  min-width: var(--ui-components-button-touch-target-size);
  display: flex;
  align-items: center;
  justify-content: center;
  /* transparent — no border or background */
  @mixin style style=flat visibleWrapperClass=.visible-wrapper;
}

.visible-wrapper {
  height: var(--ui-components-button-visual-size);         /* 32px */
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

| Parameter | Required | Values | Description |
|-----------|----------|--------|-------------|
| `style` | Yes | `flat`, `normal`, `raised`, `amplified`, `indent`, `selected` | Elevation variant — determines which color variable family is used |
| `visibleWrapperClass` | No | CSS selector (e.g. `.visible-wrapper`) | Targets the inner visual element; if omitted, styles apply directly to the element with the mixin |
| `noClick` | No | (flag) | Emits only the `enabled` state — no hover, active, focus, or disabled rules. Used for display-only sub-parts |

#### Generated states

For `@mixin style style=normal visibleWrapperClass=.visible-wrapper` the mixin expands to:

| State | Selector | What it sets |
|-------|----------|-------------|
| **Enabled** | `& .visible-wrapper` | `border-color: var(--normal-enabled-border-color)`, `background-color: var(--normal-enabled-background-color)`, `cursor: pointer` |
| **Activated** | `&.activated .visible-wrapper` | `border-color: var(--normal-activated-border-color)`, … |
| **Hover** | `@media (hover:hover) { &:hover .visible-wrapper }` | Uses `color-mix()` with `--obc-can-hover` for smooth hover control |
| **Pressed** | `&:active .visible-wrapper` | `border-color: var(--normal-pressed-border-color)`, … |
| **Focus-visible** | `&:focus-visible .visible-wrapper` | `outline-color: var(--border-focus-color)`, `outline-width: var(--global-size-spacing-border-weight-focusframe)` |
| **Disabled** | `&:disabled .visible-wrapper`, `&.disabled .visible-wrapper` | `cursor: not-allowed`, `color: var(--on-normal-disabled-color)` |

It also sets `cursor: pointer` on `&` itself and `outline: none` on `&:focus` (visible outline only on `:focus-visible`).

#### Color token naming convention

The mixin references color variables that follow a consistent pattern:

| Purpose | Pattern | Example |
|---------|---------|---------|
| Surface background | `--{variant}-{state}-background-color` | `--flat-enabled-background-color` |
| Surface border | `--{variant}-{state}-border-color` | `--raised-hover-border-color` |
| Text / icon on surface | `--on-{variant}-{role}-color` | `--on-normal-active-color`, `--on-flat-neutral-color`, `--on-raised-disabled-color` |

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
  .button-text { color: var(--on-flat-active-color); }
}

.wrapper.normal {
  @mixin style style=normal visibleWrapperClass=.visible-wrapper;
  .button-text { color: var(--on-normal-active-color); }
}

.wrapper.raised {
  @mixin style style=raised visibleWrapperClass=.visible-wrapper;
  .button-text { color: var(--on-raised-active-color); }
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
html { --obc-can-hover: 1; }
```

The `@mixin style` hover state uses `color-mix()` to blend hover colors based on this variable:

```css
background-color: color-mix(in srgb,
  var(--flat-hover-background-color) calc(var(--obc-can-hover) * 100%),
  var(--base-background-color));
```

- `1` → full hover feedback (default)
- `0` → hover colors are invisible (100% base color)

This is wrapped in `@media (hover:hover)`, so touch-only devices never see hover styles regardless of this value.

---

### Alert & Alarm Mixins

Three alert-level mixins in `src/mixins/alert.css` provide interaction states for alarm-colored buttons:

| Mixin | Color variable prefix | Usage |
|-------|----------------------|-------|
| `@mixin alert-alarm $wrapperClass` | `--alarm-*` | Highest severity |
| `@mixin alert-critical $wrapperClass` | `--critical-*` | Critical severity |
| `@mixin alert-caution $wrapperClass` | `--caution-*` | Caution/warning severity |

Each generates `enabled`, `hover`, `active`, and `focus-visible` states — same pattern as `@mixin style` but with alarm-specific color families.

#### Alarm blink animation

`variables.css` registers four CSS `@property` values used for blink animation:

```css
@property --alarm-blink-on  { syntax: "<number>"; inherits: true; initial-value: 1; }
@property --alarm-blink-off { syntax: "<number>"; inherits: true; initial-value: 0; }
@property --warning-blink-on  { syntax: "<number>"; inherits: true; initial-value: 1; }
@property --warning-blink-off { syntax: "<number>"; inherits: true; initial-value: 0; }
```

A shared `@keyframes warning-blink` orchestrates two blink rates:
- **Alarm** blinks 4× per cycle (fast)
- **Warning** blinks 2× per cycle (slow)

Components apply the animation by binding opacity to these properties:

```css
.blinking.alert-type-alarm .visible-wrapper { opacity: var(--alarm-blink-on); }
.blinking.alert-type-alarm .blink           { opacity: var(--alarm-blink-off); }
```

---

### Other CSS Mixins

| File | Mixin | Purpose |
|------|-------|---------|
| `src/mixins/card.css` | `@mixin card` | Card surface: `border-radius: 8px`, `background: var(--container-global-color)`, `box-shadow: var(--shadow-floating)` |
| `src/mixins/outline-inward.css` | `@mixin outline-inward $wrapperClass` | Focus outline with `outline-offset: -2px` applied on `:focus-visible` |
| `src/mixins/base-input-field.css` | Several (`base-input-field-wrapper`, `base-input-field-label`, etc.) | Shared input field chrome: labels, helper text, error borders, disabled states |
| `src/mixins/scrollbar.css` | `@mixin scrollbar` | Custom scrollbar styling via `::-webkit-scrollbar-*` pseudo-elements. Uses `--obc-scrollbar-*` variables |

---

### Font Mixins

All font mixins are defined in `src/mixins/fonts.css`. Each sets `font-family`, `font-weight`, `font-size`, `line-height`, and `font-feature-settings` from design-token variables.

#### UI fonts

For buttons, labels, body text, and headings:

| Mixin | Typical use |
|-------|-------------|
| `@mixin font-button` | Button labels |
| `@mixin font-button-two-line` | Two-line button labels |
| `@mixin font-button-l` | Large button labels |
| `@mixin font-label` | Secondary labels, captions |
| `@mixin font-label-active` | Active/selected labels |
| `@mixin font-body` | Body text |
| `@mixin font-body-active` | Bold body text |
| `@mixin font-overline` | Overline text |
| `@mixin font-overline-new` | Updated overline text  |
| `@mixin font-subtitle` | Subtitles |
| `@mixin font-title` | Titles |

#### Instrument fonts

For numeric readouts, units, and scale labels in gauges and instruments:

| Mixin | Typical use |
|-------|-------------|
| `@mixin font-instrument-value-small-active` | Small active numeric value |
| `@mixin font-instrument-value-small-neutral` | Small neutral numeric value |
| `@mixin font-instrument-value-regular-active` | Regular active numeric value |
| `@mixin font-instrument-value-regular-neutral` | Regular neutral numeric value |
| `@mixin font-instrument-value-m-active` | Medium active numeric value |
| `@mixin font-instrument-value-m-neutral` | Medium neutral numeric value |
| `@mixin font-instrument-value-enhanced-active` | Enhanced active numeric value |
| `@mixin font-instrument-value-enhanced-neutral` | Enhanced neutral numeric value |
| `@mixin font-instrument-label` | Instrument labels and units |
| `@mixin font-instrument-unit` | Unit suffixes (%, °, kn) |
| `@mixin font-instrument-tick-mark` | Scale tick labels |
| `@mixin font-instrument-tick-mark-active` | Active scale tick labels |

#### Automation fonts

For automation readouts and state labels:

| Mixin | Typical use |
|-------|-------------|
| `@mixin font-automation-value-small` | Small automation readout (on) |
| `@mixin font-automation-value-small-off` | Small automation readout (off) |
| `@mixin font-automation-value-regular` | Regular automation readout (on) |
| `@mixin font-automation-value-regular-off` | Regular automation readout (off) |
| `@mixin font-automation-value-enhanced` | Enhanced automation readout |

#### Overlay font

| Mixin | Purpose |
|-------|---------|
| `@mixin font-overlay-outline-shadow` | Text shadow for legibility on map/video overlays |

---

### Size Variant Classes

All size-dependent tokens are defined four times in `variables.css`, once per size class:

| Class | Touch target | Visual target | Icon size |
|-------|-------------|---------------|-----------|
| `:root`, `.obc-component-size-regular` | 48 px | 32 px | 24 px |
| `.obc-component-size-medium` | 56 px | 40 px | 32 px |
| `.obc-component-size-large` | 72 px | 56 px | 40 px |
| `.obc-component-size-xl` | (larger) | (larger) | (larger) |

Each class overrides the same variable names (`--global-size-spacing-touch-target-min`, `--global-size-spacing-visual-target-min`, `--global-size-spacing-icon-icon-size-regular`, all `--ui-components-*` sizing tokens, typography tokens, etc.) with scaled values.

**Usage:** Apply the size class on a parent element; all descendant components automatically resize via CSS variable inheritance:

```html
<div class="obc-component-size-large">
  <obc-button label="Bigger"></obc-button>   <!-- 72px touch, 56px visual -->
</div>
```

Components should never reference a specific size class internally — they consume the tokens and let the ancestor decide.

---

### Theme Switching

Four theme blocks in `variables.css` override hundreds of color variables:

```css
:root, :root[data-obc-theme="day"]   { /* default */ }
:root[data-obc-theme="dusk"]          { /* ... */ }
:root[data-obc-theme="night"]         { /* ... */ }
:root[data-obc-theme="bright"]        { /* ... */ }
```

Set `data-obc-theme` on `<html>` or any ancestor to switch themes:

```html
<html data-obc-theme="night">
```

Every theme overrides the same variable names (`--element-active-color`, `--container-global-color`, `--flat-enabled-background-color`, etc.), so components reference variables directly and are theme-agnostic.

---

### Common Structural CSS Patterns

These patterns appear across most components and can be used as a baseline when creating new ones:

| Pattern | Usage | Where |
|---------|-------|-------|
| `* { box-sizing: border-box; }` | Prevents padding from expanding elements | Top of most component CSS files |
| `user-select: none` | Prevents text selection on interactive elements | `.wrapper` of all buttons/controls |
| `appearance: none; border: none; background: none;` | Resets native `<button>` styling | `.wrapper` when using `<button>` as the outer element |
| `:host { display: block; }` | Block-level components (tables, modals, lists) | Component host |
| `:host { display: inline-block; }` | Inline interactive elements (buttons) | Component host |
| `:host { display: inline-flex; }` | Charts and inline containers | Component host |
| `* { -webkit-tap-highlight-color: transparent; }` | Removes blue tap flash on mobile | Auto-injected by PostCSS plugin in `postcss.config.mjs` |

#### `::slotted()` styling for icons

Slotted icons are constrained to the component's icon-size token:

```css
.visible-wrapper ::slotted([slot="icon"]) {
  width: var(--ui-components-icon-button-icon-size);
  height: var(--ui-components-icon-button-icon-size);
}
```

## 🎴 Icons

The icons are exported to webcomponents in the `packages/openbridge-webcomponents/src/icons` directory.
They are exported from figma by running: `npm run download:icons`.

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
