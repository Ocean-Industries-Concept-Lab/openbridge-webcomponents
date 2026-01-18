---
applyTo: "packages/openbridge-webcomponents/src/building-blocks/chart-line/**,packages/openbridge-webcomponents/src/bars-graphs/line-graph/**,packages/openbridge-webcomponents/src/bars-graphs/area-graph/**,packages/openbridge-webcomponents/src/navigation-instruments/gauge-trend/**"
---

# GitHub Copilot Custom Instructions

## Path-Specific Instructions for Line/Area Charts & Gauge Trend

These instructions apply to the Chart.js-based line/area chart system and the composite gauge-trend component.

> **⚠️ IMPORTANT: Interconnected Components**
>
> All components in this system are **tightly interconnected** and share a common API surface:
>
> - `chart-line-base.ts` ↔ `line-graph.ts` ↔ `area-graph.ts` ↔ `gauge-trend.ts`
>
> Additionally, `gauge-trend.ts` **bridges to the external-scale system** (see `external-scale.instructions.md`):
>
> - `gauge-trend.ts` → creates and manages → `bar-vertical.ts` (and possibly `bar-horizontal.ts`) → uses → `external-scale.ts`
>
> **When implementing a new feature or changing existing behavior:**
>
> 1. Changes must **cascade through ALL related components** to maintain consistency
> 2. Base class properties should be available in all subclasses unless intentionally locked
> 3. If you add a feature to `chart-line-base.ts`, verify it works correctly in `line-graph`, `area-graph`, AND `gauge-trend`
> 4. If you change how external scales integrate, verify `gauge-trend` still syncs properties correctly
> 5. `gauge-trend` may intentionally lock certain base class properties (e.g., `showGrid=false`)
>
> **Before completing any change, verify:**
>
> - [ ] `chart-line-base.ts` has the core logic
> - [ ] `line-graph.ts` works correctly (if applicable)
> - [ ] `area-graph.ts` works correctly (if applicable)
> - [ ] `gauge-trend.ts` works correctly AND syncs to its `bar-vertical` (or `bar-horizontal` or `external-scale`) child
> - [ ] All components remain API-consistent

## Architecture Overview

The line/area chart system follows an **abstract base + thin subclass** pattern:

```
┌─────────────────────────────────────────────────────────────────┐
│                     chart-line-base.ts                          │
│         (Abstract base class - all chart logic lives here)      │
│  • Chart.js setup & lifecycle                                   │
│  • Data handling (single-series, multi-series, time axis)       │
│  • Grid, ticks, labels, tooltips                                │
│  • External scale slot integration                              │
│  • Abstract methods: shouldApplyFill(), getFillMode(),          │
│                      shouldStack()                              │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │ extends
    ┌─────────────────────────┼─────────────────────────┐
    │                         │                         │
    ▼                         ▼                         ▼
┌──────────────┐     ┌──────────────┐      ┌──────────────────────┐
│  line-graph  │     │  area-graph  │      │     gauge-trend      │
│   (Never     │     │   (Always    │      │ (Area chart + slotted│
│    fills)    │     │    fills)    │      │  bar-vertical scale) │
└──────────────┘     └──────────────┘      └──────────────────────┘
```

### Key Principle: Logic in Base Class, Subclasses Stay Thin

- **`chart-line-base.ts`**: Contains ALL Chart.js logic, data transformation, rendering, theming, and external scale integration. This is the source of truth.
- **`line-graph.ts`**: Thin subclass that returns `false` for fill behavior
- **`area-graph.ts`**: Thin subclass that enables fill and exposes `fillMode` and `stacked` properties
- **`gauge-trend.ts`**: Composite component that extends base and programmatically creates a slotted `bar-vertical` (and possibly `bar-horizontal`) scale

When adding new features or fixing bugs:

1. **First check if the logic belongs in `chart-line-base.ts`** - most changes should go here
2. Subclasses should only override abstract methods or add subclass-specific properties
3. Avoid duplicating logic across line-graph and area-graph

---

## `packages/openbridge-webcomponents/src/building-blocks/chart-line/**`

### Base Class Architecture

1. **Chart.js Foundation**:
   - Built on Chart.js with registered components (LineController, scales, Filler, Tooltip)
   - Uses Canvas for rendering (not SVG like external-scale)
   - Theme-aware via `getCssVariableValue()` and `observeThemeChanges()`

2. **Abstract Methods (Must Override)**:

   ```typescript
   // Whether this chart type applies area fill
   protected abstract shouldApplyFill(): boolean;

   // Fill mode: 'semitransparent' | 'solid' | 'threshold' | undefined
   protected abstract getFillMode(): string | undefined;

   // Whether multi-series should stack on y-axis
   protected abstract shouldStack(): boolean;
   ```

3. **Data Input Patterns**:
   - **Single-series**: `data = [{label: 'Jan', value: 10}, ...]`
   - **Multi-series**: `datasets = [{label: 'Series A', data: [...]}, ...]`
   - **Time axis**: `xAxisType = 'time'` with ISO date strings or timestamps

4. **External Scale Integration**:
   - Slots: `left-scale`, `right-scale`, `top-scale`, `bottom-scale`
   - Listens for `scale-dimensions-changed` events from slotted elements
   - Adjusts chart padding to accommodate external scale thickness
   - Syncs scale properties (min/max, padding, enhanced, state, etc.)

5. **Property Change Tracking**:
   - `LINE_GRAPH_WATCHED_PROP_NAMES`: Properties that trigger chart data/options update
   - `LINE_GRAPH_RECREATE_PROP_NAMES`: Properties that require full chart recreation
   - Use `shouldUpdateChart()` pattern to batch updates efficiently

6. **Responsive Sizing**:
   - `width` and `height` define chart dimensions
   - `fixedAspectRatioScaling`: When true, chart scales proportionally to fit container. **⚠️ IMPORTANT:** When true, `width` and `height` define the aspect ratio, not absolute size. The padding also scales accordingly. External scales also scale proportionally where the `scaleReferenceSize` = 384, which is the default size when it matches 1:1 the Figma design size.
   - Size threshold (192px): Below this, hides labels/ticks for compact display

7. **Border Radius Integration**:
   - `borderRadiusPosition`: Controls which corners get rounded for the chart canvas
   - `borderRadiusPositionExternalScales`: Controls rounding for slotted scales
   - Uses same CSS variable as external-scale: `--instrument-components-watchface-frame-regular-border-radius`

---

## `packages/openbridge-webcomponents/src/bars-graphs/line-graph/**`

### Line Graph (Non-Filled)

1. **Purpose**: Clean line charts without area fills

2. **That's it!**: All other functionality inherited from base class

---

## `packages/openbridge-webcomponents/src/bars-graphs/area-graph/**`

### Area Graph (Always Filled)

1. **Purpose**: Area charts with fill beneath the line
2. **Additional Properties**:

   ```typescript
   @property({type: String})
   fillMode: AreaFillMode = AreaFillMode.semitransparent;

   @property({type: Boolean})
   stacked = false;
   ```

3. **Fill Modes**:
   - `semitransparent`: 50% alpha fill (default)
   - `solid`: Opaque fill
   - `threshold`: Red/blue above/below midpoint (single-series only)

---

## `packages/openbridge-webcomponents/src/navigation-instruments/gauge-trend/**`

### Gauge Trend (Composite Pattern)

1. **Purpose**: Maritime navigation instrument combining area chart with integrated vertical scale
2. **Composition**:
   - Extends `ObcChartLineBase` for chart functionality
   - Programmatically creates and manages `obc-bar-vertical` (or perhaps `obc-bar-horizontal`) element
   - Uses slot mechanism for chart + scale layout

3. **Locked Properties**:
   - `fixedAspectRatioScaling`: Always true
   - `borderRadiusPosition`: Optimized for chart+scale composition
   - Fill mode: Always 'semitransparent'

4. **Property Sync**:
   - On property changes, sync to `bar-vertical` (or perhaps `bar-horizontal`) element via `_updateBarVerticalProperties()`
   - Handle mapping of enum types between gauge-trend and bar-vertical namespaces

---

## Adding New Features

### Feature Goes in `chart-line-base.ts` If:

- It affects Chart.js configuration (scales, plugins, datasets)
- It's about data transformation or formatting
- It handles external scale integration
- It applies to both line and area charts

### Feature Goes in Subclass If:

- It's specific to fill behavior (area-graph only)
- It's specific to composite pattern (gauge-trend only)
- It adds properties only relevant to one chart type

### Feature Goes in External Scale If:

- It's about SVG scale rendering (see external-scale.instructions.md)

### Checklist for Changes:

1. [ ] Read full `chart-line-base.ts` context before editing
2. [ ] Implement in base class if applicable to both line and area charts
3. [ ] Add to `LINE_GRAPH_WATCHED_PROP_NAMES` if property affects chart rendering
4. [ ] Add to `LINE_GRAPH_RECREATE_PROP_NAMES` if property requires chart recreation
5. [ ] Test with both `obc-line-graph` and `obc-area-graph`
6. [ ] Test with external scales in all slot positions
7. [ ] Test `obc-gauge-trend` if base class change affects it

---

## Common Patterns & Code Examples

### Chart Update Pattern (in base class):

```typescript
override updated(changedProperties: PropertyValues) {
  super.updated(changedProperties);

  const needsRecreate = LINE_GRAPH_RECREATE_PROP_NAMES.some(
    prop => changedProperties.has(prop)
  );

  if (needsRecreate) {
    this._destroyChart();
    this._createChart();
  } else if (this._shouldUpdateChart(changedProperties)) {
    this._updateChartData();
    this._updateChartOptions();
    this.chart?.update();
  }
}
```

### External Scale Slot Pattern:

```html
<!-- In chart-line-base template -->
<div class="wrapper">
  <div class="canvas-and-slots-container">
    <canvas></canvas>
    <slot
      name="top-scale"
      @slotchange="${this.handleSlotChange}"
      @scale-dimensions-changed="${this.handleScaleDimensionsChanged}"
    ></slot>
    <slot
      name="bottom-scale"
      @slotchange="${this.handleSlotChange}"
      @scale-dimensions-changed="${this.handleScaleDimensionsChanged}"
    ></slot>
    <slot
      name="left-scale"
      @slotchange="${this.handleSlotChange}"
      @scale-dimensions-changed="${this.handleScaleDimensionsChanged}"
    ></slot>
    <slot
      name="right-scale"
      @slotchange="${this.handleSlotChange}"
      @scale-dimensions-changed="${this.handleScaleDimensionsChanged}"
    ></slot>
  </div>

  ${this.legend ? html`
  <div class="legend"></div>
  ` : ''}
</div>
```

### Theme-Aware Colors Pattern:

```typescript
private _getColors(): string[] {
  const colors = this.enhanced
    ? CHART_SECTOR_ENHANCED_COLORS
    : CHART_SECTOR_DEFAULT_COLORS;

  return getChartColorsOrDefault(this, colors);
}
```

### Composite Component Property Sync:

```typescript
// In gauge-trend.ts
private _updateBarVerticalProperties() {
  const barVertical = this._barVerticalElement as any;

  barVertical.minValue = this.scaleMinValue;
  barVertical.maxValue = this.scaleMaxValue;
  barVertical.height = this.getEffectiveHeight();
  barVertical.fixedAspectRatio = this.fixedAspectRatioScaling;
  barVertical.enhanced = this.enhanced;
  // ... map all scale properties
}
```

---

## Testing & Validation

1. **Single-Series**: Test with `data` property for basic charts
2. **Multi-Series**: Test with `datasets` for multiple lines/areas
3. **Time Axis**: Test with `xAxisType='time'` and ISO date data
4. **Fill Modes**: Test all fill modes for area-graph
5. **Stacking**: Test `stacked=true` with multi-series area-graph
6. **External Scales**: Test with scales in all four slot positions
7. **Theme Changes**: Verify colors update on theme switch
8. **Responsive**: Test at various container sizes
9. **Gauge Trend**: Test chart + scale composition with property sync

---

## Relationship to Other Instructions

- **Building Blocks** (`building-blocks.instructions.md`): General SVG component patterns
- **External Scale** (`external-scale.instructions.md`): The `bar-vertical` used by gauge-trend
- **Circular Charts** (`circular-charts.instructions.md`): Similar Chart.js patterns but for donut/pie/polar charts
