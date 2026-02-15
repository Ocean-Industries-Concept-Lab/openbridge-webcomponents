---
applyTo: "packages/openbridge-webcomponents/src/svghelpers/setpoint.ts,packages/openbridge-webcomponents/src/svghelpers/setpoint-mixin.ts,packages/openbridge-webcomponents/src/svghelpers/setpoint-bundle.ts,packages/openbridge-webcomponents/src/building-blocks/setpoint/**"
---

# GitHub Copilot Custom Instructions

## Path-Specific Instructions for Setpoint System

These instructions apply to the **setpoint subsystem** — the cross-cutting design layer, state management, and animation logic used by all instrument components that display a setpoint marker.

> **⚠️ IMPORTANT: Cross-Cutting Concern**
>
> The setpoint system spans three rendering paths and 15+ instrument components:
>
> - **Linear:** `external-scale.ts` → `bar-vertical`, `bar-horizontal`, `gauge-vertical`, `gauge-horizontal`, `gauge-trend`
> - **Radial:** `watch.ts` → `compass`, `heading`, `rudder`, `speed-gauge`, `gauge-radial`, `instrument-radial`
> - **Thruster:** `thruster.ts` → `azimuth-thruster` (also uses radial via `watch.ts`)
>
> **When modifying setpoint logic:**
>
> 1. Changes to `setpoint.ts` affect ALL instruments — verify rendering in all three paths
> 2. Changes to `setpoint-mixin.ts` affect single-setpoint instruments (most of them)
> 3. Changes to `setpoint-bundle.ts` affect multi-setpoint instruments (`compass`, `heading`, `azimuth-thruster`)
> 4. Rendering changes must be mirrored across `external-scale.ts`, `watch.ts`, and `thruster.ts`

---

## Architecture Overview

The setpoint system is split into three layers:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                         setpoint.ts (Design Layer)                         │
│                                                                             │
│  Pure visual states + drawing functions + animation constants               │
│  • SetpointVisualState: notEqual | equal | equalZero | focus               │
│  • SetpointColorMode: enhanced | regular                                    │
│  • drawSetpointMarker(): SVG at origin, caller applies transforms          │
│  • computeAtSetpoint(): Unified deadband comparison                        │
│  • deriveRadialSetpointConfig(): State → visual config for radial          │
│  • Animation: SETPOINT_ANIMATION_DURATION_MS, cssSafeAngle(),              │
│    shortestAngularDistance(), getSetpointAnimationDurationMs()              │
└─────────────────────────────────────────────────────────────────────────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    ▼                                 ▼
┌──────────────────────────────┐   ┌──────────────────────────────────────────┐
│  setpoint-mixin.ts           │   │  setpoint-bundle.ts                      │
│  (Single-setpoint API layer) │   │  (Multi-setpoint API layer)              │
│                              │   │                                          │
│  Lit mixin that adds 10      │   │  Plain class — one per setpoint axis.    │
│  @property() declarations    │   │  Same property set as mixin but without  │
│  + computeAtSetpoint() +     │   │  @property() decorators.                │
│  animation state management  │   │  sync() for bulk update in willUpdate() │
│                              │   │  onAnimationEnd callback for re-render  │
│  Used by:                    │   │                                          │
│  • speed-gauge               │   │  Used by:                               │
│  • rudder                    │   │  • compass (_angleSp)                   │
│  • instrument-radial         │   │  • heading (_headingSp)                 │
│  • gauge-radial              │   │  • azimuth-thruster (_angleSp, _thrustSp)│
│  • bar-vertical (indirect)   │   │                                          │
│  • bar-horizontal (indirect) │   │                                          │
│  • gauge-vertical (indirect) │   │                                          │
│  • gauge-horizontal          │   │                                          │
│  • gauge-trend (indirect)    │   │                                          │
└──────────────────────────────┘   └──────────────────────────────────────────┘
                    │                                 │
                    └────────────────┬────────────────┘
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Three Rendering Paths                                  │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐ │
│  │ external-scale   │  │ watch.ts        │  │ thruster.ts               │ │
│  │ (linear bars)    │  │ (radial ring)   │  │ (thrust bar in azimuth)   │ │
│  │                  │  │                  │  │                           │ │
│  │ renderSingle-    │  │ Internal confirm │  │ renderThrusterSetpoint()  │ │
│  │ Setpoint()       │  │ detection +      │  │ with animate/non-animate │ │
│  │ CSS transform    │  │ cssSafeAngle()   │  │ code paths               │ │
│  │ for animation    │  │ short-path anim  │  │                           │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## When to Use Mixin vs Bundle

| Scenario | Use | Example |
|----------|-----|---------|
| Component has **one** setpoint | `SetpointMixin` | `speed-gauge`, `rudder`, `gauge-radial` |
| Component has **multiple** independent setpoints | `SetpointBundle` (one per axis) | `azimuth-thruster` (angle + thrust) |
| Component exposes **prefixed** property names | `SetpointBundle` with `sync()` | `compass` (angleSetpoint → bundle.setpoint) |
| Component uses **generic** property names | `SetpointMixin` directly | `instrument-radial` (setpoint, newSetpoint) |

### SetpointMixin Usage

```ts
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';

class MyGauge extends SetpointMixin(LitElement, {angularWraparound: true}) {
  @property({type: Number}) value = 0;

  override render() {
    const isAtSetpoint = this.computeAtSetpoint(this.value);
    // Properties available: setpoint, newSetpoint, touching, atSetpoint,
    //   disableAutoAtSetpoint, autoAtSetpointDeadband, setpointAtZeroDeadband,
    //   setpointColorMode, animateSetpoint, departingNewSetpoint
  }
}
```

### SetpointBundle Usage

```ts
import {SetpointBundle} from '../../svghelpers/setpoint-bundle.js';

class MyDualInstrument extends LitElement {
  @property({type: Number}) angleSetpoint: number | undefined;
  @property({type: Number}) thrustSetpoint: number | undefined;

  private _angleSp = new SetpointBundle({
    angularWraparound: true,
    onAnimationEnd: () => this.requestUpdate(),
  });
  private _thrustSp = new SetpointBundle({
    defaultDeadband: 1,
    onAnimationEnd: () => this.requestUpdate(),
  });

  override willUpdate(changed: PropertyValues) {
    this._angleSp.sync({
      setpoint: this.angleSetpoint,
      newSetpoint: this.newAngleSetpoint,
      animateSetpoint: this.animateSetpoint,
      // ... other prefixed props
    });
    this._thrustSp.sync({
      setpoint: this.thrustSetpoint,
      newSetpoint: this.newThrustSetpoint,
      animateSetpoint: this.animateSetpoint,
      // ...
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._angleSp.dispose();  // Clean up animation timers
    this._thrustSp.dispose();
  }
}
```

---

## Confirm Animation System

When `animateSetpoint=true`, a **confirm transition** (user finalizes a setpoint change) triggers CSS-based animation on the setpoint markers.

### Trigger Condition

A confirm is detected when:
1. `newSetpoint` transitions from **defined → `undefined`**
2. `setpoint` jumps to the new target value (same render cycle)
3. `animateSetpoint` is `true`

### What Animates

| Element | Animation | Duration |
|---------|-----------|----------|
| Original setpoint marker | Slides from old position to new position | 300ms `ease-out` |
| Original setpoint marker | Opacity `0.75 → 1.0` (was dimmed during adjustment) | 300ms `ease-out` |
| Departing new-setpoint marker | Fades out `opacity: 1 → 0` | 300ms `ease-out` |

After 300ms, the departing marker is removed from DOM.

### CSS Implementation

```css
/* Applied via inline style on the setpoint marker <g> element */
transition: transform var(--setpoint-animation-duration, 300ms) ease-out,
            opacity var(--setpoint-animation-duration, 300ms) ease-out;
```

**Key requirement:** CSS `style="transform: ..."` must be used instead of the SVG `transform` attribute. SVG `transform` is not animatable via CSS transitions.

### Duration Override

```css
/* On any ancestor element */
obc-gauge-horizontal {
  --setpoint-animation-duration: 500ms;
}
```

### The "Departing" Pattern

When a confirm occurs, the new-setpoint marker needs to stay in the DOM for 300ms to complete its fade-out. The pattern:

1. **Detect confirm** in `willUpdate()` (mixin) or `sync()` (bundle)
2. **Store** the old `newSetpoint` value as `departingNewSetpoint`
3. **Start a `setTimeout`** for `SETPOINT_ANIMATION_DURATION_MS` (300ms)
4. **Renderer** checks `departingNewSetpoint` and renders a fading marker
5. **Timer fires** → clear `departingNewSetpoint` → remove marker from DOM
6. **Bundle only:** call `onAnimationEnd()` callback → `requestUpdate()` to re-render

### `cssSafeAngle()` for Short-Path Rotation (Radial Only)

CSS `transform: rotate()` interpolates linearly between degree values. `rotate(350deg)` → `rotate(10deg)` would animate −340° instead of +20°. The `cssSafeAngle()` function returns an unbounded angle within ±180° of the previous value, ensuring CSS transitions **always** take the shortest path — no wraparound guard or skip logic needed:

```ts
cssSafeAngle(350, 10)   // → 370  (350 + 20)
cssSafeAngle(10, 350)   // → -10  (10 − 20)
cssSafeAngle(0, 181)    // → -179 (short path is −179°)
```

`watch.ts` maintains a `_setpointCssAngle` accumulator that tracks the last angle written to CSS. On each render, the raw angle is passed through `cssSafeAngle()` so the transition delta is always ≤ 180°.

---

## Property Cascade

Instruments are thin wrappers that pass setpoint properties through to renderers:

### Mixin-Based (single setpoint)

```text
speed-gauge.ts
  └─ .setpoint=${this.setpoint}           → obc-watch
     .newSetpoint=${this.newSetpoint}
     .animateSetpoint=${this.animateSetpoint}
```

The mixin adds all properties directly to the component. The component passes them to `<obc-watch>` or builds an `ExternalScaleConfig`.

### Bundle-Based (prefixed API)

```text
azimuth-thruster.ts
  │
  ├─ willUpdate() → _angleSp.sync({setpoint: this.angleSetpoint, ...})
  │                  _thrustSp.sync({setpoint: this.thrustSetpoint, ...})
  │
  ├─ <obc-watch .setpoint=${this._angleSp.setpoint}
  │              .animateSetpoint=${this.animateSetpoint}
  │              .departingNewSetpoint=${...} />
  │
  └─ thruster(..., {animateSetpoint: this.animateSetpoint,
                    departingNewSetpoint: this._thrustSp.departingNewSetpoint})
```

### Adding `animateSetpoint` to a New Component

1. **If single setpoint:** Extend `SetpointMixin` (it already includes `animateSetpoint` + `departingNewSetpoint`)
2. **If multi setpoint:** Add `@property({type: Boolean}) animateSetpoint` and pass to each `SetpointBundle.sync({animateSetpoint: this.animateSetpoint})`
3. **Pass through to renderer:** `.animateSetpoint=${this.animateSetpoint}` on `<obc-watch>`, or in `ExternalScaleConfig`, or in `thruster()` options
4. **Bundle cleanup:** Call `.dispose()` on each bundle in `disconnectedCallback()`
5. **Bundle re-render:** Pass `onAnimationEnd: () => this.requestUpdate()` in constructor

---

## `setpoint.ts` — Design Layer Reference

### Visual States

| State | Scale | Offset | When |
|-------|-------|--------|------|
| `notEqual` | 100% | 4px outward | Value ≠ setpoint |
| `equal` | 80% | 0px | Value = setpoint (within deadband) |
| `equalZero` | 80% | 8px outward | Both value and setpoint at zero |
| `focus` | 100% | 4px outward | User actively adjusting (`touching` or `newSetpoint` defined) |

### Color Modes

| Mode | Primary fill | Focus fill | Focus stroke |
|------|-------------|------------|--------------|
| `enhanced` | `--instrument-enhanced-primary-color` | `--base-blue-100` | `--element-neutral-enhanced-color` |
| `regular` | `--instrument-regular-primary-color` | `--instrument-regular-tertiary-color` | `--instrument-regular-secondary-color` |
| `disabled` | `--instrument-frame-tertiary-color` | — | — |

### Marker Geometry

- **Size:** 26px wide × 21px tall
- **Tip at origin (0, 0)**, triangle points down (+Y)
- **Path:** All corners rounded (2px radius)
- Callers apply `translate()` + `rotate()` to position

### Key Functions

| Function | Purpose |
|----------|---------|
| `drawSetpointMarker(config)` | Renders SVG marker at origin |
| `deriveRadialSetpointConfig(config)` | Maps instrument state → visual config for radial instruments |
| `computeAtSetpoint(config)` | Unified deadband comparison (linear or angular) |
| `cssSafeAngle(prev, target)` | Ensures CSS rotate() takes shortest path |
| `shortestAngularDistance(from, to)` | Angular delta in [0, 180] |
| `getSetpointAnimationDurationMs(el)` | Reads `--setpoint-animation-duration` from CSS |

---

## `computeAtSetpoint()` — Unified Deadband Logic

Replaces all per-instrument `atSetpointCalc()` methods:

```ts
computeAtSetpoint({
  value: number | undefined,        // Current instrument value
  setpoint: number | undefined,     // Target setpoint
  touching: boolean,                // User interacting? → false
  disableAuto: boolean,             // Use manual override?
  deadband: number,                 // Tolerance (e.g., 2°)
  atSetpointManual: boolean,        // Manual override value
  angularWraparound?: boolean,      // 360° wraparound (compass)
}): boolean
```

**Rules:**
- If `value` or `setpoint` is `undefined` → `false`
- If `touching` → `false` (suppress during interaction)
- If `disableAuto` → return `atSetpointManual` directly
- If `angularWraparound` → use `shortestAngularDistance()` for comparison
- Otherwise → `Math.abs(value - setpoint) <= deadband`

---

## Stories

Interactive stories for the setpoint system live in `building-blocks/setpoint/setpoint.stories.ts`:

| Story | Component | Demonstrates |
|-------|-----------|-------------|
| `SetpointAdjustmentFlow` | `bar-vertical` + `gauge-horizontal` | Linear setpoint animation (t=0→t=3) |
| `SetpointRadialAdjustmentFlow` | `obc-watch` | Radial setpoint animation with bar areas |
| `SetpointAzimuthThrusterFlow` | `obc-azimuth-thruster` | Dual-axis animation (angle + thrust) |

Stories use a 4-step interactive flow (Reset → Initiate → Move → Confirm) with GSAP for vessel response simulation. The confirm step (t=3) uses the component's built-in CSS transitions — GSAP is **not** used for setpoint marker animation.

---

## Checklist for Setpoint Changes

- [ ] Read the full file before editing (core files have interconnected logic)
- [ ] If changing `setpoint.ts`: verify impact on all three rendering paths
- [ ] If changing `setpoint-mixin.ts`: verify all mixin-based instruments
- [ ] If changing `setpoint-bundle.ts`: verify compass, heading, azimuth-thruster
- [ ] If adding a property: cascade through mixin → bundle → renderers → wrappers
- [ ] If touching animation: test both linear and radial paths, including wraparound edge cases
- [ ] Verify `disconnectedCallback` cleans up timers (mixin: automatic, bundle: `.dispose()`)
