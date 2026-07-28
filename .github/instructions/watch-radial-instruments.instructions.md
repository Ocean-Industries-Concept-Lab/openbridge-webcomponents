---
applyTo: "packages/openbridge-webcomponents/src/navigation-instruments/watch/**,packages/openbridge-webcomponents/src/navigation-instruments/compass/**,packages/openbridge-webcomponents/src/navigation-instruments/compass-sector/**,packages/openbridge-webcomponents/src/navigation-instruments/heading/**,packages/openbridge-webcomponents/src/navigation-instruments/rudder/**,packages/openbridge-webcomponents/src/navigation-instruments/wind/**,packages/openbridge-webcomponents/src/navigation-instruments/pitch/**,packages/openbridge-webcomponents/src/navigation-instruments/roll/**,packages/openbridge-webcomponents/src/navigation-instruments/pitch-roll/**,packages/openbridge-webcomponents/src/navigation-instruments/pitch-roll-heave/**,packages/openbridge-webcomponents/src/building-blocks/single-axis-inclinometer/**,packages/openbridge-webcomponents/src/navigation-instruments/speed-gauge/**,packages/openbridge-webcomponents/src/navigation-instruments/gauge-radial/**,packages/openbridge-webcomponents/src/navigation-instruments/rot-sector/**,packages/openbridge-webcomponents/src/navigation-instruments/rate-of-turn/**,packages/openbridge-webcomponents/src/navigation-instruments/course-arrows/**,packages/openbridge-webcomponents/src/navigation-instruments/readout/**,packages/openbridge-webcomponents/src/navigation-instruments/watch-flat/**,packages/openbridge-webcomponents/src/navigation-instruments/compass-flat/**,packages/openbridge-webcomponents/src/navigation-instruments/rot-linear/**,packages/openbridge-webcomponents/src/navigation-instruments/azimuth-thruster/**,packages/openbridge-webcomponents/src/building-blocks/instrument-radial/**"
---

# GitHub Copilot Custom Instructions

## Path-Specific Instructions for Watch & Radial Instruments

These instructions apply to the circular/radial watch-based instrument system, including the core `obc-watch` renderer and all navigation instruments that use it.

> **⚠️ IMPORTANT: Interconnected Components**
>
> All components in this system are **tightly interconnected** and share the same rendering core:
>
> - `watch.ts` ↔ `instrument-radial.ts` ↔ `compass.ts` ↔ `heading.ts` ↔ `rudder.ts` ↔ `wind.ts` ↔ `speed-gauge.ts` ↔ `gauge-radial.ts` ↔ `azimuth-thruster.ts` ↔ `roll.ts` ↔ `rot-sector.ts`
>
> **When implementing a new feature or changing existing behavior:**
>
> 1. **All rendering logic should live in `watch.ts`** - it is the single source of truth for circular instrument rendering
> 2. Changes to `watch.ts` affect ALL instruments that use it
> 3. If adding a new visual element, add it to `watch.ts` as a configurable option, not to individual instruments
> 4. Navigation instruments are thin wrappers that configure `obc-watch` and add domain-specific overlays
> 5. `instrument-radial.ts` is a reusable building block that wraps `obc-watch` for generic gauge use cases
>
> **Before completing any change, verify:**
>
> - [ ] `watch.ts` has the core rendering logic
> - [ ] Helper modules (`tickmark.ts`, `advice.ts`, `label.ts`, etc.) are updated if needed
> - [ ] All consuming instruments still render correctly
> - [ ] ViewBox coordination is maintained across layers
> - [ ] Responsive scaling works at different sizes

## Architecture Overview

The watch-based instrument system follows a **core renderer + thin wrapper** pattern:

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              watch.ts (obc-watch)                               │
│                    (Core SVG renderer - ALL logic lives here)                   │
│                                                                                 │
│  Renders:                                                                       │
│  • Circular rings (single/double/doubleThin/triple)                            │
│  • Setpoint indicator (triangle marker)                                        │
│  • Tickmarks (primary, secondary, main, textOnly)                              │
│  • Advices (caution/alert zones with patterns)                                 │
│  • Bar areas (filled arc segments)                                             │
│  • Needles (short bar indicators)                                              │
│  • Labels (N, E, S, W compass labels)                                          │
│  • Vessel images                                                               │
│  • Wind/current indicators                                                     │
│  • North arrow, crosshair, starboard/port indicators                           │
│                                                                                 │
│  Imports helper modules:                                                        │
│  • tickmark.ts - tickmark rendering & positioning                              │
│  • advice.ts - advice/caution zone rendering                                   │
│  • label.ts - compass label rendering                                          │
│  • vessel.ts - vessel image SVGs                                               │
│  • environment.ts - wind/current symbols                                       │
│  • setpoint.ts - setpoint indicator rendering                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    ▼                   ▼                   ▼
    ┌───────────────────────┐ ┌─────────────────┐ ┌─────────────────────────────┐
    │  instrument-radial.ts │ │  compass.ts     │ │  Other instruments:         │
    │  (Generic building    │ │  heading.ts     │ │  rudder.ts, wind.ts,       │
    │   block for gauges)   │ │  (Full-featured │ │  speed-gauge.ts, roll.ts,  │
    │                       │ │   compasses)    │ │  azimuth-thruster.ts, etc. │
    └───────────┬───────────┘ └────────┬────────┘ └──────────────┬──────────────┘
                │                      │                         │
                ▼                      │                         │
    ┌───────────────────────┐          │                         │
    │  gauge-radial.ts      │          │                         │
    │  rot-sector.ts        │          │                         │
    │  (Thin wrappers)      │          │                         │
    └───────────────────────┘          │                         │
                                       ▼                         ▼
                              ┌─────────────────────────────────────────────────┐
                              │  All instruments use <obc-watch> + overlay SVG  │
                              │  with matched viewBox for layer alignment       │
                              └─────────────────────────────────────────────────┘
```

### Key Principle: Logic in `watch.ts`, Instruments Stay Thin

- **`watch.ts`**: Contains ALL circular rendering logic, coordinate calculations, and theming. This is the source of truth.
- **`instrument-radial.ts`**: Reusable building block that wraps `watch.ts` for generic radial gauges with configurable angle mapping.
- **Navigation instruments** (compass, heading, rudder, etc.): Thin wrappers that configure `obc-watch` and add domain-specific SVG overlays (arrows, needles, ROT indicators).

When adding new features or fixing bugs:

1. **First check if the logic belongs in `watch.ts`** - most visual changes should go here
2. Helper modules (`tickmark.ts`, `advice.ts`, etc.) handle specific rendering concerns
3. Navigation instruments should only handle: property declarations, domain-specific overlays, and value-to-angle mapping
4. Avoid duplicating rendering logic across instruments

### Shared sibling modules

- **`course-arrows/course-arrows.ts`** — HDG/COG arrow art
  (`HdgArrowStyle`: arrowHead, needle, vector, beamLine;
  `CogArrowStyle`: arrowHead, needle, vector, velocityVector), consumed by
  compass, heading and — via the deprecated `compass/arrow.ts` shim, which
  also carries the zoom `radiusOffset` — compass-sector. The new-style art is
  generated from Figma into `course-arrows-art.ts`; do not hand-edit its path
  data.
- **`readout/center-readout.ts`** — the center / below-strip readout cluster
  (`renderCenterReadouts()`, `resolveCompassCenterReadouts()`,
  `centerReadoutStyles`), consumed by compass, heading, compass-sector,
  pitch-roll, pitch-roll-heave, rate-of-turn, compass-flat and rot-linear. It
  reuses the existing `obc-readout` API only (closest match; no new typography
  knobs). Two arrangements via `CenterReadoutArrangement`:
  `primarySecondary` (default — first entry, one divider, then the rest side by
  side) and `stacked` (a divider between every entry, used by
  pitch-roll-heave's Pitch/Roll/Heave column). **The default must stay
  `primarySecondary`** — every other consumer depends on it.
- **Arc tick ladder** — `tickmark.ts`'s `arcTickmarks()` emits the `secondary`
  ladder that runs along an arc band (default interval 5°),
  skipping the arc centre (which carries its own `main` mark) and the ends
  (the rounded end cap already reads as a boundary). Shared by the
  inclinometer family: `single-axis-inclinometer` (pitch, roll), `pitch-roll`
  (both the full-watch and zoomed paths) and `pitch-roll-heave`. The zoomed
  paths must pass the **clamped** half-extent, not the requested one, so ticks
  never fall outside the band that is actually drawn.
- **`building-blocks/instrument-linear/instrument-linear.ts`** —
  `linearTickInterval(height, range, minSpacing = 16)` picks a 1-2-5 tick step
  whose on-screen spacing clears `minSpacing`, so a linear scale whose height
  is dictated by a surrounding layout keeps a readable density. It reproduces
  the intervals `obc-heave` hard-codes at its natural 336-unit height, which is
  what fixes the constant; `obc-heave` itself still uses its literals so its
  baselines do not move.
- **Track-bar recipe** — `obc-rate-of-turn`'s `hasTrackBar` composes existing
  `obc-watch` inputs only: `barAreas` (band fill) + `needles` (marker at the
  bar end) + sector `tickmarks` on the `double` face. `renderBars` applies
  its area cut mask only when `areas` exist, so band bars render reliably on
  full-circle faces.

---

## Layering & Stacking Pattern

All composite instruments use **CSS absolute positioning** to stack multiple SVG layers:

```css
.container {
  position: relative; /* Establishes positioning context */
  width: 100%;
  height: 100%;
}

.container > * {
  position: absolute; /* All children stack at same position */
  top: 0;
  left: 0;
  width: 100%; /* Fill entire container */
  height: 100%;
}
```

**Layer order** (bottom to top):

1. `<obc-watch>` - Base circular frame, rings, tickmarks, setpoint, advices, bars
2. `<svg>` overlay - Domain-specific elements (arrows, needles, ROT dots)

```text
┌─────────────────────────────────────────────────────────────────┐
│                     <div class="container">                     │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ LAYER 1: <obc-watch>                                      │  │
│  │ • Rings, tickmarks, advices, bars, setpoint, labels       │  │
│  │ • viewBox calculated from (176 + padding) * 2             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              ▲                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ LAYER 2: <svg> overlay                                    │  │
│  │ • HDG/COG arrows, needles, ROT indicator                  │  │
│  │ • viewBox MUST MATCH obc-watch for alignment              │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ViewBox Coordination Strategy

**Critical**: Multiple SVG layers with **MATCHING viewBox** values align perfectly when stacked.

### ViewBox Calculation in `watch.ts`

```typescript
const width = (176 + this.getPadding()) * 2; // e.g., (176 + 72) * 2 = 496
const height = width * (1 - this.clipTop / 100 - this.clipBottom / 100);
const top = -width / 2 + (width * this.clipTop) / 100;
const viewBox = `-${width / 2} ${top} ${width} ${height}`;
// Full circle: "-248 -248 496 496"
// Clipped 40% top (rudder): "-248 -49.6 496 297.6"
```

### Matching ViewBox in Consumer Instruments

Consumer instruments MUST calculate the **same viewBox** for their overlay SVG:

```typescript
// In compass.ts, heading.ts, etc.
const padding = this.getPadding(); // Same calculation as watch!
const width = (176 + padding) * 2;
const viewBox = `-${width / 2} -${width / 2} ${width} ${width}`;
```

### ViewBox Mismatch = Misalignment

```text
⚠️ If obc-watch uses: viewBox="-248 -248 496 496"
   And overlay uses:  viewBox="-200 -200 400 400"  ❌ WRONG!

   Result: Elements in smaller viewBox appear LARGER relative to the ring
```

---

## The 512-Based Coordinate System

Most SVG paths are designed around a **512 × 512 canvas** with center at **(256, 256)**:

```text
┌─────────────────────────────────────────────────┐
│              512 × 512 Canvas                   │
│   (0,0) ────────────────────────────────> X     │
│     │                                           │
│     │           (256, 256)                      │
│     │              CENTER                       │
│     │                ●                          │
│     ▼                                           │
│     Y                                           │
└─────────────────────────────────────────────────┘
```

To convert paths designed for this system to a **center-origin** viewBox, use:

```typescript
<g transform="translate(-256, -256)">
  <path d="M254.654 100.32C..." />  // Path with 256,256 as center
</g>
```

With rotation:

```typescript
<g transform="rotate(${angle}) translate(-256, -256)">
  <!-- Element rotates around center, then path coordinates work -->
</g>
```

---

## Key Radius Constants

Defined in `watch.ts`:

```typescript
export const OUTER_RING_RADIUS = 368 / 2; // 184 - Outermost circle
const RING2_RADIUS = 320 / 2; // 160 - Second ring
const RING3_RADIUS = 224 / 2; // 112 - Third ring (double type)
const RING3B_RADIUS = 272 / 2; // 136 - Thin double variant
const RING4_RADIUS = 176 / 2; // 88  - Innermost (triple type)
```

Use these constants when positioning elements at specific ring radii.

---

## Responsive Scaling

### Scale Factor Calculation

The `--scale` CSS variable enables pixel-perfect rendering at any size:

```typescript
private getScale({width, height}: {width: number; height: number}): number {
  const scale = Math.min(this.clientWidth / width, this.clientHeight / height);
  return scale;
}

// In render:
<svg style="--scale: ${scale}" ...>
```

### Scale-Aware Elements

**Text labels** maintain consistent visual size:

```css
.label {
  font-size: calc(12px / var(--scale)); /* Always ~12px visual size */
}
```

**Strokes** stay 1px regardless of zoom:

```typescript
stroke-width="1"
vector-effect="non-scaling-stroke"
```

---

## Clipping for Partial Gauges

For half-circle instruments like **rudder**:

```typescript
// In obc-watch
@property({type: Number}) clipTop: number = 0;     // Percent of height
@property({type: Number}) clipBottom: number = 0;

// ViewBox adjustment:
const height = width * (1 - this.clipTop/100 - this.clipBottom/100);
const top = -width/2 + (width * this.clipTop/100);
```

**Example - Rudder (40% top clipped):**

```text
Full viewBox:     "-224 -224 448 448"
Clipped viewBox:  "-224 -44.8 448 268.8"

     Full circle              Clipped (rudder)
   ┌─────────────┐
   │      ○      │  ←clip    ┌─────────────┐
   │     / \     │           │     ◠◡◠     │
   │    ○   ○    │    →      │  semicircle │
   │     \ /     │           └─────────────┘
   │      ○      │
   └─────────────┘
```

The overlay SVG must use the **same clipped viewBox** to align correctly.

**Note:** `clip{Top,Bottom,Left,Right}` are mutually exclusive with `zoomToFitArc`.
When zoom is on, the viewBox is derived from `computeZoomToFitArcFrame()` and all
four clips are ignored (both `obc-watch` and `obc-instrument-radial` zero them).
`clipLeft` / `clipRight` are the horizontal counterparts of `clipTop` / `clipBottom`,
used for quadrant (90°) sectors.

---

## Where to Make Common Changes

### 1. Setpoint Size/Position

Location: `watch.ts` → `renderSetpoint()` method

> **See `setpoint.instructions.md`** for the full setpoint architecture (design layer, mixin vs bundle, confirm animation, `cssSafeAngle()` short-path rotation, CSS transition pattern).

```typescript
// Triangle shape (SVG path) coming from svghelpers/setpoint.ts

// Radial position (distance from center):
<g transform="rotate(${this.angleSetpoint + 90}) translate(${-radius}, 0)...)">
//                                                         ↑
//                                               Change this for position
```

### 2. Labels Inside/Outside

Location: `watch.ts` → `tickmarksInside` property + `tickmark.ts`

```typescript
// In watch.ts
@property({type: Boolean}) tickmarksInside: boolean = false;

// In tickmark.ts - the `inside` parameter controls placement
const textRadius = textRadius + (3/scale + 3) * (inside ? -1 : 1);
```

### 3. Tickmark Dimensions

Location: `tickmark.ts` → `tickmark()` function

```typescript
if (size === TickmarkType.primary) {
  innerRadius = 328 / 2; // Where tickmark starts
  outerRadius = 368 / 2; // Where tickmark ends (long)
} else if (size === TickmarkType.secondary) {
  innerRadius = 328 / 2;
  outerRadius = 344 / 2; // Shorter
}
```

### 4. Ring Appearance

Location: `watch.ts` → `watchCircle()` method + `WatchCircleType` enum

```typescript
// Available types:
WatchCircleType.single; // One ring
WatchCircleType.double; // Two rings
WatchCircleType.doubleThin; // Two rings, thinner gap
WatchCircleType.triple; // Three rings (compass)
```

### 5. Advice/Caution Zones

Location: `advice.ts` → `renderAdvice()` and `adviceMask()` functions

```typescript
// Colors based on state:
AdviceState.hinted    → 'var(--instrument-frame-tertiary-color)'
AdviceState.regular   → 'var(--instrument-tick-mark-tertiary-color)'
AdviceState.triggered → 'var(--on-caution-active-color)'
```

### 6. Adding a New Overlay Element

1. Add property to `watch.ts` for configuration
2. Create render method in `watch.ts` (e.g., `renderMyElement()`)
3. Call it in `render()` method at appropriate layer position
4. Use existing constants for positioning (radii, angles)

---

## CSS Variables

Common instrument CSS variables used in `watch.ts` and helpers:

```css
/* Frame colors */
--instrument-frame-primary-color
--instrument-frame-secondary-color
--instrument-frame-tertiary-color

/* Value colors (regular state) */
--instrument-regular-primary-color
--instrument-regular-secondary-color
--instrument-regular-tertiary-color

/* Value colors (enhanced/in-command state) */
--instrument-enhanced-primary-color
--instrument-enhanced-secondary-color
--instrument-enhanced-tertiary-color

/* Tickmark colors */
--instrument-tick-mark-primary-color
--instrument-tick-mark-secondary-color
--instrument-tick-mark-tertiary-color

/* Alert colors */
--alert-caution-color
--on-caution-active-color

/* Border/silhouette */
--border-silhouette-color
```

---

## Component Quick Reference

| Component           | Uses                                     | Key Features                                                                                              |
| ------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `obc-watch`         | Helper modules                           | Core renderer - ALL circular rendering logic                                                              |
| `instrument-radial` | `obc-watch`                              | Generic building block with configurable `getAngle()`                                                     |
| `compass`           | `obc-watch` + overlay                    | Full compass: HDG/COG arrow styles, ROT, vessel, wind/current, center readouts                            |
| `heading`           | `obc-watch` + overlay                    | Simplified compass: HDG/COG arrow styles, optional vessel, center readouts                                |
| `rate-of-turn`      | `obc-watch`                              | ROT dots/bar, track bar (barAreas+needles), center readout                                                |
| `rudder`            | `obc-watch` + overlay                    | Half-circle: 40% top clipped, needle variant                                                              |
| `speed-gauge`       | `obc-watch` + overlay                    | Speed arc: custom angle mapping, full needle                                                              |
| `wind`              | `obc-watch` + overlay                    | Wind rose with histogram                                                                                  |
| `pitch` / `roll`    | `single-axis-inclinometer` → `obc-watch` | Single-axis inclinometer: side arc scale, single/dual scale, optional center readout                      |
| `pitch-roll`        | `obc-watch`                              | Pitch + roll on one face; 4 arcs, optional zoomed sub-watches                                             |
| `pitch-roll-heave`  | `obc-watch` + `watchfaceLinear`          | Pitch arc + roll arc + linear heave column in the band slot; single/dual scale, optional stacked readouts |
| `gauge-radial`      | `instrument-radial`                      | Thin wrapper adding `enhanced` prop                                                                       |
| `rot-sector`        | `instrument-radial`                      | Rate of turn sector gauge                                                                                 |
| `azimuth-thruster`  | `obc-watch` + overlay                    | Thruster with angle setpoint and thrust bar                                                               |

---

## Zoom-to-Fit Arc (`zoomToFitArc`)

When an instrument displays a narrow arc (e.g. ±20° instead of a full circle), `zoomToFitArc` enlarges the rings to fill the available space rather than leaving large empty areas around a small arc.

### Approach: Radius Enlargement (not vector scaling)

The zoom works by adding a **radius offset** (`_rOff` / `_radiusOffset`) to all ring radii, tickmark positions, advice bands, and needle positions. The viewBox is recalculated via `computeZoomToFitArcFrame()` so the enlarged arc fills the component bounds.

### File roles

| File                   | Role                                                                                                                                                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `arc-frame.ts`         | Pure geometry: `computeZoomToFitArcFrame()` binary-searches for the `radiusOffset` that makes the arc's bounding box fill the available space. Also exports `computeAnnularArcBBox()`.                                                                                    |
| `watch.ts`             | Owns `zoomToFitArc` property and `_rOff` field. Applies offset to ALL radius references (rings, tickmarks, labels, advices, bars, setpoint, needles). Recalculates viewBox.                                                                                               |
| `instrument-radial.ts` | Forwards `zoomToFitArc` to `obc-watch`. Tracks `_radiusOffset` for needle position adjustments.                                                                                                                                                                           |
| `rudder.ts`            | Has `_needleTransform` getter that translates the needle outward by `rOff` so the tip reaches the enlarged ring. Uses `translate(0, -rOff)` — an intentional visual compromise that preserves needle proportions at the cost of a slight mismatch at extreme zoom levels. |
| `rot-sector.ts`        | Exposes `rotArcExtent` (default 60°) and forwards `zoomToFitArc` to `instrument-radial`.                                                                                                                                                                                  |
| `compass-sector.ts`    | Has its own zoom logic: when `zoomToFitArc` is true and the FOV is small, renders a 1:1-scale arc cropped to content; otherwise uses FOV compression capped at 120°.                                                                                                      |

### `radiusOffset` propagation

The offset flows through the rendering pipeline:

1. `watch.ts` computes `_rOff` via `computeZoomToFitArcFrame()`
2. All `watch.ts` render methods add `_rOff` to radius constants (e.g. `OUTER_RING_RADIUS + this._rOff`)
3. Helper functions (`tickmark()`, `renderAdvice()`, `adviceMask()`) accept an optional `radiusOffset` parameter
4. Consumer instruments read back `_radiusOffset` for overlay adjustments (needle translation)

### Advice hatch pattern: two code paths

`advice.ts` uses two different hatch-pattern strategies depending on `radiusOffset`:

- **`radiusOffset === 0`** (original): Pre-baked tile approach — works at design radius only.
- **`radiusOffset > 0`** (zoom): Direct `<line>` segments with dynamic line count to maintain consistent arc spacing at any enlarged radius. The mask also switches to `maskUnits="userSpaceOnUse"` with dynamic extent.

> **⚠️ Do not unify** the two code paths. The non-zoom path must produce output identical to `main` to avoid regenerating snapshots for all advice-using instruments.

### Adding `zoomToFitArc` to a new instrument

1. Add `@property({type: Boolean}) zoomToFitArc = false` to the instrument
2. Forward it to `obc-watch` (or `instrument-radial`) via template binding
3. If the instrument has an overlay needle/element, read `_radiusOffset` and adjust positioning
4. Add `ZoomedIn` / `ZoomedInNarrow` stories with representative `arcExtent` values

---

## Geometry Inputs Cheat-Sheet

`obc-watch` exposes several partially-overlapping geometry inputs. Use this as the
quick reference for which knob does what. Combinations not listed under "validated"
below are undefined — verify them before relying on a specific pairing.

| Property                                            | Affects                                                                                                                                                                                |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `padding`                                           | **Explicit override**: un-zoomed viewBox becomes exactly `(176 + padding) * 2` and the automatic label reserve (see "Shared frame computation") is disabled — the caller owns label room. Unset, `basePadding` is 24 plus the width-aware reserve. |
| `faceDiameter`                                      | Pins the outer-ring diameter in CSS px (`scale = faceDiameter / 368`); the host gets a fixed intrinsic size, so instruments sharing the value have equal circumference (mode b of #1021; the donut-chart `fixedHeight` counterpart). |
| `clipTop` / `clipBottom` / `clipLeft` / `clipRight` | viewBox window in the **un-zoomed** path. Ignored under zoom (when `zoomToFitArc` is on or an `arcFrame` is supplied).                                                                                                          |
| `zoomToFitArc`                                      | Swaps to the `computeZoomToFitArcFrame()` path (unless an `arcFrame` is already supplied); every band radius gets the additive `_rOff` (see the `_bandRadius` INVARIANT in `watch.ts`).                                           |
| `arcFrame`                                          | Externally pre-computed zoom frame. Takes precedence when set (the `if (this.arcFrame)` branch runs first) — used directly even when `zoomToFitArc` is false, and `obc-watch` does not recompute it. If you pass it, keep it in sync with `areas` / `watchCircleType`. |
| `endLabelsMaxMin`                                   | "Max-min" label placement: horizontal end labels (±90°) sit off the dead-center tick instead of beside it.                                                                            |
| `tickmarksInside`                                   | Moves labels inside the ring; their `textRadius` is routed through `_bandRadius`.                                                                                                      |
| `tickFadeAngle`                                     | (pre-existing) Tickmark fade-out near arc edges.                                                                                                                                        |

### Shared frame computation (`svghelpers/radial-frame.ts`, issue #1021)

All frame/viewBox geometry is centralized in `computeRadialFrame()`:

- **Width-aware label reserve (mode a):** outside tick labels render at
  `12px / scale`, so their SVG-unit footprint grows as the instrument
  shrinks. The helper solves `side = 2·(184 + 3) / (1 − 2P/containerPx)`
  in closed form (`P` = label pixel cost) and grows the viewBox so labels
  never clip. With no outside labels the legacy `(176 + basePadding) * 2`
  box is reproduced **byte-identically**.
- **Content-aware degradation:** past `LABEL_RESERVE_MAX_FRACTION` (0.45 —
  a 4-digit gauge hides labels below a ~182px container) the frame reports
  `labelsHidden` and consumers strip tick texts instead of clipping.
  Designers may later prefer a fixed px threshold (the canvas charts use
  `MIN_HEIGHT_WITH_LABELS = 192`).
- **Delivery pattern:** consumers call the helper once per render and pass
  the result to `<obc-watch .arcFrame=...>` AND their overlay
  `<svg viewBox=${frame.viewBox}>` — the two layers can no longer drift
  apart. Do NOT hand-mirror viewBox constants (the old
  `WATCH_DEFAULT_VIEWBOX = 448` and azimuth's `384/400/472` switch were
  deleted in favor of this).
- **Consumers on the helper:** watch (standalone), instrument-radial
  (+ gauge-radial, rot-sector), speed-gauge, azimuth-thruster, compass,
  heading, rudder. `obc-instrument-radial` exposes the frame via a
  `frame` getter and a `frame-changed` event (gauge-radial re-anchors its
  %-positioned readouts from it).
- **Not on the helper:** compass-sector (bespoke FOV compression, see the
  `PADDING` comment there), pitch/roll/pitch-roll (labels inside ⇒ no
  reserve; the pitch-roll composite has a coupled `buildFrame` contract),
  wind-propulsion and velocity-projection-plot (explicit `padding`
  override path, unchanged by design). pitch-roll-heave follows pitch-roll
  here: same `buildFrame` contract, same coupled zoom math.
- Compass/heading's old empirical `72 + delta(clientSize)` padding was
  replaced by the analytic reserve (north arrow 16px always +
  NSWE labels 16px while `showLabels`); past the reserve cap both the
  labels and the arrow are hidden, like tick-label degradation.
- **Label-drop-aware sector crops:** arc end labels hang past the ±90°
  line (`endLabelsMaxMin` ~20px, side labels ~8px), so a fixed top/bottom
  crop (gauge-radial's 44/45% `sectorClips`) would cut them at small
  scales. Consumers pass `labelDropPx` (`END_MAXMIN_LABEL_DROP_PX` /
  `SIDE_LABEL_DROP_PX`) and the frame lowers the crop just enough —
  reported via `frame.clipsAdjusted`, which gauge-radial uses to switch
  its static sector `aspect-ratio` to the frame's (`--gauge-radial-aspect`).
  Only pass the drop when a **labeled tick actually sits at ±90°**
  (instrument-radial checks the tick angles — a ±60° sector like
  rot-sector must stay byte-identical).
- **ResizeObserver on inline hosts never fires** (permanent 0×0 box) —
  several radial hosts have no `:host {display}` rule, so their
  `ResizeController` must additionally observe an internal element that
  generates a box (`observeInnerBox()` in radial-frame.ts observes the
  shadow `<svg>` / `.container`). Without it, the frame and the `--scale`
  font counter-scaling freeze at first paint whenever the host is not
  blockified by a parent (watch standalone was the visible case; inside
  `.container > * {position: absolute}` the host is blockified and the
  host observation works).

### Radial label model (design language)

Labels follow the design model with three placements:

- **External** — labels around the outside of the watch face (default).
- **Internal** — labels inside the ring (`tickmarksInside`).
- **Max-min** — labels at the arc ends (`endLabelsMaxMin`), e.g. the 180° gauge.

> **Validated combinations:** pitch/roll/pitch-roll-heave use `zoomToFitArc` + `shiftArcFrameToOuterEdge`;
> `gauge-radial` uses per-sector `clip*` and `endLabelsMaxMin` on the 180° sector.
> Pairings like `clip*` + `zoomToFitArc` or `endLabelsMaxMin` + `zoomToFitArc` are not
> currently validated.

---

## `obc-pitch-roll-heave` geometry contract

The heave column is **not** independently sized — its dimensions fall out of the
arc geometry, and the whole layout is determined by the two half-extents
`θp` (`pitchArcAngle`, default 30) and `θr` (`rollArcAngle`, default 45):

```text
column width  = bandOuterRadius - bandInnerRadius   (= band thickness, 72 un-zoomed)
column height = 2 · capRadius · sin(θp)             (= 184 un-zoomed)
```

`capRadius` is the radius of the pitch arc's outer edge **about its own
origin** — un-zoomed that equals the outer ring, but under zoom the arc sits on
a shifted sub-watch, so the two differ. Measuring the height against it is what
keeps the column's top and bottom edges level with the pitch arc's end caps.

Everything else follows:

| Feature                         | Angular span                 | At the defaults |
| ------------------------------- | ---------------------------- | --------------- |
| pitch arc                       | `[90−θp, 90+θp]`             | 60°–120°        |
| roll arc                        | `[180−θr, 180+θr]`           | 135°–225°       |
| heave column at the ring radius | `[270−θp, 270+θp]`           | 240°–300°       |
| both diagonal gaps              | `90 − θp − θr` each          | 15°             |
| complement ring                 | `[270+θp, 90−θp]` through 0° | 300°→60°        |

`θr` is clamped to `90 − θp` so the arcs cannot meet. **If you change the height
rule, the complement ring's endpoints move with it** — the ring starts exactly
where the column's top edge crosses the outer ring, which only coincides with
`270+θp` because of the `sin(θp)` term.

Two clearance passes run **only** under zoom, after the frames are built and
left untouched (band thickness, position and zoom level are preserved):

1. pitch vs roll at the diagonal — ratio-preserving bisection, identical to
   `obc-pitch-roll`;
2. roll vs the heave column (`single-scale`) — shortens the roll arc alone,
   using point-to-**rectangle** distance rather than the corner-to-corner
   `signedDist` used between two arcs, because a corner can clear a rectangle
   on one axis alone.

`dual-scale` instead clamps the centred column's **height only** (never its
width, which reads as a match for the band thickness) to keep
`HEAVE_CENTRE_GAP_PX` clear of the surrounding band. All three rules are
no-ops at the un-zoomed defaults, which is what reproduces the design exactly —
verify that before retuning any of the constants.

---

## Checklist for Adding New Features

- [ ] Is the feature visual/rendering? → Add to `watch.ts`
- [ ] Is it tickmark-related? → Add to `tickmark.ts`
- [ ] Is it advice/alert-related? → Add to `advice.ts`
- [ ] Is it a new instrument? → Create thin wrapper using `obc-watch`
- [ ] Does it need an overlay SVG? → Match viewBox calculation exactly
- [ ] Does it use absolute coordinates? → Use `translate(-256, -256)` pattern
- [ ] Does it need to scale? → Use `calc(Xpx / var(--scale))` or `vector-effect="non-scaling-stroke"`
- [ ] Is it a partial circle? → Use `clipTop`/`clipBottom` and adjust viewBox
