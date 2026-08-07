---
applyTo: "packages/openbridge-webcomponents/src/navigation-instruments/azimuth-thruster-labeled/**,packages/openbridge-webcomponents/src/navigation-instruments/badge-command/**,packages/openbridge-webcomponents/src/navigation-instruments/depth-actual/**,packages/openbridge-webcomponents/src/navigation-instruments/draft-trim/**,packages/openbridge-webcomponents/src/navigation-instruments/heave/**,packages/openbridge-webcomponents/src/navigation-instruments/instrument-field/**,packages/openbridge-webcomponents/src/navigation-instruments/main-engine/**,packages/openbridge-webcomponents/src/navigation-instruments/readout-list/**,packages/openbridge-webcomponents/src/navigation-instruments/readout-list-item/**,packages/openbridge-webcomponents/src/navigation-instruments/speed-arrows/**,packages/openbridge-webcomponents/src/navigation-instruments/thruster/**"
---

<!-- GENERATED FILE — DO NOT EDIT.
     Source: docs/agents/instruments-misc.md
     Regenerate: npm run agents:sync -w packages/openbridge-webcomponents -->

# Instruments Outside the Watch Core

The `Instruments/` members that are **not** driven by `obc-watch`. Anything that
renders `<obc-watch>` belongs to
[`watch-radial-instruments.md`](../../docs/agents/watch-radial-instruments.md) instead — check
before assuming a component lives here.

Two distinct groups sit in this file.

## Group 1 — borrow watch helpers, draw their own SVG

`azimuth-thruster-labeled`, `depth-actual`, `draft-trim`, `heave`, `thruster`

These import helper modules out of `watch/` — `tickmark.ts`, `advice.ts`,
`vessel.ts`, `vessels.ts` — but never render `<obc-watch>`. They compose their
own SVG around those shared pieces.

The distinction matters when changing a helper: a change to `tickmark()` or
`renderAdvice()` reaches these components **without** going through
`obc-watch`, so verifying "all watch instruments still render" is not
sufficient. Check this group too.

They are also not bound by the watch viewBox contract — they own their own
viewBox and coordinate system, so the "match the viewBox exactly" rule from the
watch family does not apply here.

`obc-azimuth-thruster-labeled` is the composite of the group: it pulls in
`badge-command`, `readout` and `thruster` alongside the watch helpers. Treat it
as a layout shell over those parts rather than an instrument in its own right.

`obc-main-engine` builds on `thruster` and shares its thrust-bar vocabulary.

## Group 2 — no watch involvement

`badge-command`, `instrument-field`, `readout-list`, `readout-list-item`,
`speed-arrows`

- **`obc-instrument-field`** — the labelled data field used across instrument
  panels. Two sizes via `InstrumentFieldSize` (`regular`, `enhanced`). It
  composes `obc-button`, `obc-navigation-item` and the drop-down icon, so it is
  interactive: keyboard and ARIA obligations from
  [`a11y.md`](../../docs/agents/a11y.md) apply, unlike the display-only instruments around it.
- **`obc-readout-list` / `obc-readout-list-item`** — a dense row format for
  tables and lists. The list is a thin container over the items; put shared
  presentation on the item, not the container.
- **`obc-badge-command`** — a standalone command/state badge with no
  dependencies at all.
- **`obc-speed-arrows`** — vector arrow art, consumed by `obc-speed-indicator`.
  Changing its geometry moves the indicator too.

## Naming trap

Membership here follows the Storybook `Instruments/` taxonomy, and names are an
unreliable guide to it. `propulsion-tunnel-thruster` looks like it belongs with
`thruster` but is grouped under `Indicators/` — see
[`instrument-indicators.md`](../../docs/agents/instrument-indicators.md). Read the story `title`,
not the directory name.

## Related

- [`watch-radial-instruments.md`](../../docs/agents/watch-radial-instruments.md) — everything
  rendering `obc-watch`, including the shared helper modules these components
  borrow from.
- [`instrument-indicators.md`](../../docs/agents/instrument-indicators.md) — the compact glyph
  family.
- [`external-scale.md`](../../docs/agents/external-scale.md) — bar and gauge instruments driven by
  the linear scale renderer.
