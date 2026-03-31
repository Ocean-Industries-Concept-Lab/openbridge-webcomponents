---
applyTo: "packages/openbridge-webcomponents/src/navigation-instruments/watch/**,packages/openbridge-webcomponents/src/navigation-instruments/compass/**,packages/openbridge-webcomponents/src/navigation-instruments/heading/**,packages/openbridge-webcomponents/src/navigation-instruments/rudder/**,packages/openbridge-webcomponents/src/navigation-instruments/wind/**,packages/openbridge-webcomponents/src/navigation-instruments/roll/**,packages/openbridge-webcomponents/src/navigation-instruments/speed-gauge/**,packages/openbridge-webcomponents/src/navigation-instruments/gauge-radial/**,packages/openbridge-webcomponents/src/navigation-instruments/rot-sector/**,packages/openbridge-webcomponents/src/navigation-instruments/azimuth-thruster/**,packages/openbridge-webcomponents/src/building-blocks/instrument-radial/**"
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

| Component           | Uses                  | Key Features                                            |
| ------------------- | --------------------- | ------------------------------------------------------- |
| `obc-watch`         | Helper modules        | Core renderer - ALL circular rendering logic            |
| `instrument-radial` | `obc-watch`           | Generic building block with configurable `getAngle()`   |
| `compass`           | `obc-watch` + overlay | Full compass: HDG/COG arrows, ROT, vessel, wind/current |
| `heading`           | `obc-watch` + overlay | Simplified compass: HDG/COG arrows only                 |
| `rudder`            | `obc-watch` + overlay | Half-circle: 40% top clipped, needle variant            |
| `speed-gauge`       | `obc-watch` + overlay | Speed arc: custom angle mapping, full needle            |
| `wind`              | `obc-watch` + overlay | Wind rose with histogram                                |
| `roll`              | `obc-watch`           | Roll indicator with vessel                              |
| `gauge-radial`      | `instrument-radial`   | Thin wrapper adding `enhanced` prop                     |
| `rot-sector`        | `instrument-radial`   | Rate of turn sector gauge                               |
| `azimuth-thruster`  | `obc-watch` + overlay | Thruster with angle setpoint and thrust bar             |

---

## Zoom-to-Fit Arc (`zoomToFitArc`)

When an instrument displays a narrow arc (e.g. ±20° instead of a full circle), `zoomToFitArc` enlarges the rings to fill the available space rather than leaving large empty areas around a small arc.

### Approach: Radius Enlargement (not vector scaling)

The zoom works by adding a **radius offset** (`_rOff` / `_radiusOffset`) to all ring radii, tickmark positions, advice bands, and needle positions. The viewBox is recalculated via `computeZoomToFitArcFrame()` so the enlarged arc fills the component bounds.

### File roles

| File                   | Role                                                                                                                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `arc-frame.ts`         | Pure geometry: `computeZoomToFitArcFrame()` binary-searches for the `radiusOffset` that makes the arc's bounding box fill the available space. Also exports `computeAnnularArcBBox()`. |
| `watch.ts`             | Owns `zoomToFitArc` property and `_rOff` field. Applies offset to ALL radius references (rings, tickmarks, labels, advices, bars, setpoint, needles). Recalculates viewBox.            |
| `instrument-radial.ts` | Forwards `zoomToFitArc` to `obc-watch`. Tracks `_radiusOffset` for needle position adjustments.                                                                                        |
| `rudder.ts`            | Has `_needleTransform` getter that scales Y by `(160 + rOff) / 160` so the needle tip reaches the enlarged ring.                                                                       |
| `rot-sector.ts`        | Exposes `arcExtent` (default 60°) and forwards `zoomToFitArc` to `instrument-radial`.                                                                                                  |

### `radiusOffset` propagation

The offset flows through the rendering pipeline:

1. `watch.ts` computes `_rOff` via `computeZoomToFitArcFrame()`
2. All `watch.ts` render methods add `_rOff` to radius constants (e.g. `OUTER_RING_RADIUS + this._rOff`)
3. Helper functions (`tickmark()`, `renderAdvice()`, `adviceMask()`) accept an optional `radiusOffset` parameter
4. Consumer instruments read back `_radiusOffset` for overlay adjustments (needle scaling)

### Advice hatch pattern at enlarged radius

`advice.ts` uses two different hatch-pattern strategies depending on `radiusOffset`:

- **`radiusOffset === 0`** (original): Radial fan of 45 pre-baked 512×512 tiles (`rotate(i) translate(-256 -256)`), each containing two diagonal stripes. This produces 90 crossings over 360° with ~11.7px arc spacing.
- **`radiusOffset > 0`** (zoom): Direct `<line>` segments drawn from `rInner` to `rOuter` at each angular position around the circle. Each line is slanted 40.4° from radial and extended ±12px beyond the band edges so endpoints fully cover the annular shape. The mask clips overshoot. Line count scales with circumference to maintain constant arc spacing.

**Why the split**: The tile approach works perfectly at design radius but breaks at large offsets — translating tile centers before rotation causes them to orbit the origin, producing inconsistent line widths, triangular shapes, and merging at certain angles. The direct-segment approach eliminates all transform artifacts.

The mask also differs:

- `radiusOffset === 0`: Default SVG mask (`<mask id=...>`) with stroke `'black'`, fill rect `512×512`
- `radiusOffset > 0`: `maskUnits="userSpaceOnUse"` with dynamic extent (`344/2 + radiusOffset + 32`), stroke `'none'`

> **⚠️ Do not unify** the two code paths. The non-zoom path must produce output identical to `main` to avoid regenerating snapshots for all advice-using instruments.

### `computeZoomToFitArcFrame()` algorithm

1. Start with `hi = targetSize`, double up to 16 times until the arc bbox exceeds available space
2. Binary search (50 iterations) between `lo=0` and `hi` for the largest `radiusOffset` where the arc bbox fits
3. Returns `{radiusOffset, x, y, width, height, viewBox}`

### Adding `zoomToFitArc` to a new instrument

1. Add `@property({type: Boolean}) zoomToFitArc = false` to the instrument
2. Forward it to `obc-watch` (or `instrument-radial`) via template binding
3. If the instrument has an overlay needle/element, read `_radiusOffset` and adjust positioning
4. Add `ZoomedIn` / `ZoomedInNarrow` stories with representative `arcExtent` values

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
