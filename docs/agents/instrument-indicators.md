---
name: instrument-indicators
description: Compact indicator glyphs — miniature instrument renderings for strips, lists and tiles
globs:
  - packages/openbridge-webcomponents/src/navigation-instruments/bearing-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/compass-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/depth-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/gauge-bar-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/gauge-radial-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/gauge-trend-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/heading-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/heave-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/main-engine-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/pitch-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/propulsion-azimuth-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/propulsion-tunnel-thruster/**
  - packages/openbridge-webcomponents/src/navigation-instruments/roll-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/rot-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/rudder-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/speed-indicator/**
  - packages/openbridge-webcomponents/src/navigation-instruments/wind-indicator/**
---

# Instrument Indicators

Seventeen compact glyphs that convey one value at a glance, sized for strips,
lists and tiles rather than for a full instrument panel.

The family boundary is **not** a code construct — it comes from the Storybook
`Indicators/` group, which is the curated product taxonomy. Note
`propulsion-tunnel-thruster` belongs here despite its name; the taxonomy's
judgement wins over the naming.

## They redraw; they do not wrap

This is the single most important fact, and the one that most invites a wrong
assumption. An indicator is **not** a shrunken instance of its full-size
counterpart:

- None extends a shared base class — all extend `LitElement` directly.
- None composes `obc-instrument-field`.
- None renders the full instrument. `obc-rot-indicator` imports
  `RateOfTurnController` from `../rate-of-turn/` — the **domain logic** — and
  then draws its own SVG. It does not render `<obc-rate-of-turn>`.

So the shared contract is a **convention**, not an inheritance hierarchy.
Changing a full instrument does not change its indicator, and vice versa. Ten
pairs share a base name (`compass`, `gauge-radial`, `gauge-trend`, `heading`,
`heave`, `main-engine`, `pitch`, `roll`, `rudder`, `wind`), and keeping them
visually consistent is a manual obligation.

When a value-to-angle or value-to-state mapping already exists as a controller
on the full instrument, **import the controller** rather than reimplementing the
maths. That is the one thing that should be shared.

The same obligation applies to the PORT/STBD (red/green) color mode. Colors are
resolved through `svghelpers/port-starboard.ts` — never by writing the
`--instrument-{port,starboard}-*` tokens inline — and they map by the element's
**normal-mode shade role**, not by its name: a `*-tertiary-color` fill becomes
the light `-secondary` token and a `*-secondary-color` one the dark `-primary`
token. `obc-rudder-indicator` mirrors `obc-rudder` through the opt-in
`portStarboard` / `portStarboardElements` pair; `obc-rot-indicator` colors by
turn direction unconditionally, since that is its whole purpose. If you add the
mode to a full instrument, check whether its indicator twin needs it too.

## The canvas convention

Most indicators draw on a **48 × 48** canvas via a local `VIEW_SIZE` constant.
Two deviate deliberately — `pitch-indicator` and `roll-indicator` declare
`VIEW_SIZE = 36` for their inner scale, with the outer frame still at 48.

Hosts size themselves from the design token, not from px:

```css
:host {
  width: var(--global-size-spacing-touch-target-min);
  height: var(--global-size-spacing-touch-target-min);
}
```

Use the token so indicators scale with the ancestor
`.obc-component-size-*` class. A hard-coded 48px host breaks the medium / large
/ xl size variants.

Not every member is SVG: `obc-gauge-bar-indicator` is CSS-driven via `styleMap`,
with no inline SVG at all. Do not assume an SVG template when editing.

## Choosing an indicator over a full instrument

Indicators deliberately omit scale context — tickmarks, labels, setpoints. Each
component's JSDoc names its full-size counterpart for when that context is
needed (for example `obc-gauge-bar-indicator` points at `obc-gauge-vertical` /
`obc-gauge-horizontal`). Preserve those pointers when editing: they are how a
consumer decides which to reach for.

## Traps

**Directory name ≠ file name for `main-engine-indicator`.** Its files are
`propulsion-main-engine-indicator.{ts,css,stories.ts}`. A path built by
convention from the directory name will not resolve.

**Property-level deprecations are live.** Several components carry `@deprecated`
on individual properties while the class itself is `@stable` — for example
`obc-rot-indicator`'s legacy rate property in favour of
`rateOfTurnDegreesPerMinute`, and `obc-wind-indicator`'s in favour of
`currentWindFromDirection`. When touching these, migrate rather than extend the
deprecated path, and leave the tag in place until the property is removed.

**Wind icon buckets are generated.** `obc-wind-indicator` selects a glyph by
snapping a knots value to a bucket through the helpers in
`watch/environment.ts`. Those icons come from Figma, so a family rename there
propagates here — see
[IMPLEMENTATION_GUIDELINES.md § Icons](../../IMPLEMENTATION_GUIDELINES.md#-icons),
which uses wind as its worked example.

## Related

- [`watch-radial-instruments.md`](watch-radial-instruments.md) — the full-size
  radial counterparts and the shared `obc-watch` renderer.
- [`instruments-misc.md`](instruments-misc.md) — the remaining `Instruments/`
  members.
