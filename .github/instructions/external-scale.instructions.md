---
applyTo: "packages/openbridge-webcomponents/src/building-blocks/external-scale/**,packages/openbridge-webcomponents/src/building-blocks/bar-vertical/**,packages/openbridge-webcomponents/src/building-blocks/bar-horizontal/**,packages/openbridge-webcomponents/src/navigation-instruments/gauge-vertical/**,packages/openbridge-webcomponents/src/navigation-instruments/gauge-horizontal/**"
---

# GitHub Copilot Custom Instructions

## Path-Specific Instructions for External Scale & Bar/Gauge Components

These instructions apply to the external scale renderer and its thin wrapper components (bar-vertical, bar-horizontal, gauge-vertical, gauge-horizontal).

> **⚠️ IMPORTANT: Interconnected Components**
>
> All components in this system are **tightly interconnected** and share a common API surface:
>
> - `external-scale.ts` ↔ `bar-vertical.ts` ↔ `bar-horizontal.ts` ↔ `gauge-vertical.ts` ↔ `gauge-horizontal.ts`
>
> **When implementing a new feature or changing existing behavior:**
>
> 1. Changes must **cascade through ALL related components** to maintain consistency
> 2. All wrappers expose similar properties with orientation-specific naming (e.g., `height`/`width`, `paddingTop`/`paddingLeft`)
> 3. If you add a property to `bar-vertical`, you likely need to add the equivalent to `bar-horizontal`, `gauge-vertical`, `gauge-horizontal` and `external-scale`
> 4. If you add a config option to `external-scale.ts`, all wrappers need to expose and pass it
> 5. Gauge variants (`gauge-vertical`/`gauge-horizontal`) may intentionally NOT expose certain properties (they use fixed values)
>
> **Before completing any change, verify:**
>
> - [ ] `external-scale.ts` has the core logic/config
> - [ ] `bar-vertical.ts` exposes and maps the property correctly
> - [ ] `bar-horizontal.ts` has the mirrored equivalent
> - [ ] `gauge-vertical.ts` / `gauge-horizontal.ts` are updated if applicable
> - [ ] All components remain API-consistent

## Architecture Overview

The external scale system follows a **renderer + wrapper** pattern:

```text
┌─────────────────────────────────────────────────────────────────┐
│                    external-scale.ts                            │
│            (Pure SVG renderer - all logic lives here)           │
│  • computeExternalScaleLayout()                                 │
│  • renderExternalScale()                                        │
│  • Layout calculations, coordinate mapping, theming             │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │ imports
    ┌─────────────────────────┼─────────────────────────┐
    │                         │                         │
    ▼                         ▼                         ▼
┌──────────────┐     ┌──────────────┐      ┌──────────────────────┐
│ bar-vertical │     │bar-horizontal│      │ gauge-vertical/horiz │
│   (Thin      │     │   (Thin      │      │ (Fixed-config thin   │
│   wrapper)   │     │   wrapper)   │      │  wrappers)           │
└──────────────┘     └──────────────┘      └──────────────────────┘
```

### Key Principle: Logic in `external-scale.ts`, Wrappers Stay Thin

- **`external-scale.ts`**: Contains ALL rendering logic, layout calculations, coordinate transformations, and theming. This is the source of truth.
- **`bar-vertical.ts` / `bar-horizontal.ts`**: Thin web component wrappers that set up the outer `<svg>` viewBox and delegate to `renderExternalScale()`.
- **`gauge-vertical.ts` / `gauge-horizontal.ts`**: Fixed-config variants of the bar components with locked dimensions for consistent gauge appearance.

When adding new features or fixing bugs:

1. **First check if the logic belongs in `external-scale.ts`** - most changes should go here
2. The wrapper components should only handle: property declarations, viewBox setup, lifecycle methods, and dimension reporting events
3. Avoid duplicating logic across vertical/horizontal wrappers - generalize in `external-scale.ts`

---

## `packages/openbridge-webcomponents/src/building-blocks/external-scale/**`

### Core Renderer Architecture

1. **Pure Functions, No Component**:
   - `external-scale.ts` exports pure functions, not a LitElement
   - Functions return `SVGTemplateResult` fragments for composition
   - Consumers create the outer `<svg>` element with appropriate `viewBox`
   - This enables maximum flexibility for composition (charts, instruments, etc.)

2. **Key Exported Functions**:
   - `computeExternalScaleLayout(config)`: Calculate band thicknesses and viewBox dimensions
   - `renderExternalScale(config)`: Returns rendered SVG parts (barContainer, barFill, tickmarks, labels, adviceOverlays, setpoint)
   - `computeExternalScaleViewBox(config, layout)`: Calculate viewBox parameters
   - `computeFixedAspectRatioScale(config)`: Calculate scale factor for proportional sizing
   - `computeScaleDimensionsForReport(config)`: Get thickness for parent integration

3. **Configuration Object Pattern**:
   - All rendering is driven by `ExternalScaleConfig` interface
   - Wrappers build config from their properties and pass to renderer
   - This keeps the renderer stateless and testable

4. **Orientation & Side Awareness**:
   - `orientation: 'vertical' | 'horizontal'` controls value→coordinate mapping
   - `side: 'left' | 'right' | 'top' | 'bottom'` controls which edge attaches to chart
   - The chart edge is always at perpendicular coordinate `0`
   - Scale expands outward into positive/negative perpendicular space

5. **Layout Model (Three Bands)**:

   ```
   Vertical (side='right'):     Horizontal (side='top'):
   ┌─────┬──────┬───────┐       ┌──────────────────────────┐
   │ Bar │Ticks │Labels │       │          Labels          │
   │     │      │       │       ├──────────────────────────┤
   │ ←───┼──────┼────── │       │          Ticks           │
   │     │      │       │       ├──────────────────────────┤
   │     │      │       │       │           Bar            │
   └─────┴──────┴───────┘       └──────────────────────────┘
   ```

   - Band order flips based on `side`
   - Each band has configurable thickness

6. **CSS Variables (Direct Usage)**:
   - Use CSS variables directly in SVG attributes: `fill="var(--instrument-frame-primary-color)"`
   - Do NOT use `getCssVariableValue()` from charthelpers - that's for Chart.js canvas, although it might be required in some edge cases
   - Exception: `borderRadius` requires numeric value due to browser limitations with CSS vars in path geometry

7. **Border Radius Handling**:
   - CSS variable `--instrument-components-watchface-frame-regular-border-radius` defines corner rounding
   - Use `readExternalScaleBorderRadiusPx()` to convert to numeric pixels
   - Use `startExternalScaleBorderRadiusObserver()` to react to theme/size changes
   - Pass numeric `borderRadius` in config for selective corner rounding

8. **Global Component Sizing (`.obc-component-size-*`)**:
   - Parent containers with `.obc-component-size-regular`, `.obc-component-size-medium`, `.obc-component-size-large`, or `.obc-component-size-xl` affect certain dimensions via CSS variables
   - **Standalone usage** (`instrumentMode=false`, default): Component sizing affects:
     - `borderRadius` - corner rounding scales with component size (read from CSS variable)
     - `labelFontSize` - label text scales with component size
     - Note: `barThickness` minimum is `borderRadius * 2` (see `computeExternalScaleEffectiveBarThickness`)
   - **Inside navigation/ship instruments** (`instrumentMode=true`): When `bar-horizontal/vertical` are used inside composite instruments (e.g., `gauge-trend`), set `instrumentMode=true`. In this mode:
     - `.obc-component-size-*` **only affects `labelFontSize`**
     - `borderRadius` uses the explicit `borderRadius` property value (or defaults to 8px regular / 4px condensed)
     - `barThickness` is controlled by the parent instrument's configuration
   - **gauge-vertical/gauge-horizontal**: These already behave like instrument mode by design (fixed `borderRadius=8`)

9. **Fixed Aspect Ratio Scaling & Dimension Reporting**:
   - When `fixedAspectRatioScaling` is enabled in a parent component (e.g., `gauge-trend`), all child scales must account for proportional scaling
   - The `scaleReferenceSize` (default: 384px) defines the "native" size at which the scale renders 1:1
   - **Dimension reporting** must use the scaled dimensions, not the reference dimensions:
     - Observers and `scale-dimensions-changed` events should report thickness values **after** proportional scaling is applied
     - Use `computeFixedAspectRatioScale()` to calculate the scale factor: `actualSize / scaleReferenceSize`
     - Reported thickness = `baseThickness * scaleFactor`
   - This ensures parent charts receive accurate padding values that match the visually rendered scale size

---

## `packages/openbridge-webcomponents/src/building-blocks/bar-vertical/**` and `bar-horizontal/**`

### Thin Wrapper Pattern

1. **Wrapper Responsibilities Only**:
   - Declare `@property()` decorators for all configurable options
   - Set up ResizeController for responsive sizing
   - Build `ExternalScaleConfig` from properties
   - Create outer `<svg>` with proper viewBox
   - Dispatch `scale-dimensions-changed` events for chart integration
   - Handle lifecycle (border radius observer, dimension reporting)

2. **Property-to-Config Mapping**:

   ```typescript
   // In render() method:
   const config: ExternalScaleConfig = {
     orientation: "vertical", // or 'horizontal'
     side: this.side,
     length: effectiveLength,
     paddingStart: this.paddingTop, // or paddingLeft
     paddingEnd: this.paddingBottom, // or paddingRight
     // ... map all properties to config
   };
   const layout = computeExternalScaleLayout(
     toExternalScaleLayoutConfig(config),
   );
   const parts = renderExternalScale(config);
   ```

3. **Mirrored Implementation**:
   - `bar-vertical.ts` and `bar-horizontal.ts` should be structurally identical
   - Only differences: `orientation`, property names (height/width, top/bottom vs left/right)
   - When fixing one, check if the same fix applies to the other
   - Same for `gauge-vertical.ts` and `gauge-horizontal.ts`

4. **Fixed Aspect Ratio Mode**:
   - When `fixedAspectRatio=true`, use `scaleReferenceSize` for viewBox length
   - Component scales proportionally via `preserveAspectRatio="xMidYMid meet"`
   - Labels counter-scale via CSS `--scale` variable to maintain constant visual size
   - Use `computeFixedAspectRatioScale()` to calculate the scale factor

5. **Dimension Reporting**:
   - Dispatch `scale-dimensions-changed` CustomEvent when layout-affecting properties change
   - Include `{side, thickness}` in event detail
   - Parent charts use this for padding integration
   - **IMPORTANT**: barThickness, tickThickness, labelThickness, hasBar, hasScale... all affect reported thickness and must be considered, especially in fixed aspect ratio mode.

---

## `packages/openbridge-webcomponents/src/navigation-instruments/gauge-vertical/**` and `gauge-horizontal/**`

### Fixed-Config Gauge Pattern

1. **Purpose**:
   - Standalone gauges with consistent, pre-configured appearance
   - Fixed dimensions matching Figma designs (384px length, 32px padding, etc.)
   - Always show bar and scale background

2. **Fixed vs Configurable Properties**:
   - **Fixed** (not exposed): height/width (384px), padding (32px), barThickness (48px), tickThickness (28px), labelThickness (60px), scaleType, frameStyle, hasBar (true), hasScale (true)
   - **Configurable**: minValue, maxValue, value, setpoint, fillMode, advice, tick intervals, enhanced, state, side

3. **Implementation Pattern**:
   - Import and delegate to same `external-scale.ts` functions as bar components
   - Hardcode fixed values in render config
   - Expose limited property subset
   - Same lifecycle/dimension reporting as bar wrappers

4. **Relationship to Bar Components**:
   - Gauges are conceptually bar components with locked configuration
   - Not subclasses - parallel implementations to avoid inheritance complexity
   - Share the same renderer (`external-scale.ts`)

---

## Adding New Features

### Feature Goes in `external-scale.ts` If:

- It affects rendering (tickmarks, fills, markers, overlays)
- It involves coordinate/value mapping
- It's related to layout calculation
- It needs to work for both vertical and horizontal orientations

### Feature Goes in Wrapper If:

- It's about DOM integration (events, lifecycle)
- It's wrapper-specific (e.g., gauge fixed dimensions)
- It's about property binding/attribute reflection

### Checklist for Changes:

1. ☐ Read full file context before editing
2. ☐ Implement in `external-scale.ts` if applicable
3. ☐ Add config property to `ExternalScaleConfig` interface if needed
4. ☐ Update both bar-vertical AND bar-horizontal wrappers
5. ☐ Update both gauge-vertical AND gauge-horizontal if applicable
6. ☐ Test all orientations (vertical/horizontal) and sides (left/right/top/bottom)
7. ☐ Verify fixed aspect ratio mode works correctly

---

## Common Patterns & Code Examples

### Rendering Pattern (in wrappers):

```typescript
override render() {
  const effectiveLength = this.fixedAspectRatio
    ? this.scaleReferenceSize
    : this.height; // or width for horizontal

  const config: ExternalScaleConfig = {
    orientation: 'vertical', // or 'horizontal'
    side: this.side,
    length: effectiveLength,
    // ... all other config
  };

  const layout = computeExternalScaleLayout(toExternalScaleLayoutConfig(config));
  const viewBox = computeExternalScaleViewBox(config, layout);
  const parts = renderExternalScale(config);

  return html`<svg
    viewBox="${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}"
    preserveAspectRatio="xMidYMid meet"
    style="--scale: ${this._scale}"
  >
    ${parts.barContainer}
    ${parts.barFill}
    ${parts.scaleBackground}
    ${parts.tickmarks}
    ${parts.labels}
    ${parts.adviceOverlays}
    ${parts.setpoint}
  </svg>`;
}
```

### Dimension Reporting Pattern:

```typescript
private _dispatchDimensionsChanged() {
  const dims = computeScaleDimensionsForReport(toExternalScaleLayoutConfig({
    orientation: 'vertical',
    side: this.side,
    // ... layout config
  }));
  this.dispatchEvent(new CustomEvent('scale-dimensions-changed', {
    detail: dims,
    bubbles: true,
    composed: true,
  }));
}
```

### Border Radius Observer Pattern:

```typescript
private _borderRadiusObserver?: MutationObserver;

override connectedCallback() {
  super.connectedCallback();
  this._computedBorderRadius = readExternalScaleBorderRadiusPx(this, this.scaleType);
  this._borderRadiusObserver = startExternalScaleBorderRadiusObserver(this, () => {
    this._computedBorderRadius = readExternalScaleBorderRadiusPx(this, this.scaleType);
    this.requestUpdate();
  });
}

override disconnectedCallback() {
  super.disconnectedCallback();
  this._borderRadiusObserver?.disconnect();
}
```

---

## Testing & Validation

1. **Visual Testing**: Use Storybook stories to verify all orientations and sides
2. **Fixed Aspect Ratio**: Test at multiple container sizes to verify proportional scaling
3. **Theme Changes**: Verify colors update when switching themes
4. **Chart Integration**: Test as slotted elements in chart components
5. **Edge Cases**: Zero range, negative values, advice at boundaries
