# Compass & Heading: Center Readouts, Arrow Styles, Map Graphics — Design Spec

Date: 2026-07-23
Status: Approved design, pending implementation plan
Figma: “(July 22) OpenBridge 6.1”, file `Tb5GjGfYoVIUrhXThL51A2`

## 1. Summary

Extend `obc-compass` and `obc-heading` with the OpenBridge 6.1 variations:

- **Center readouts** (“center label” type): the vessel is replaced by 1–3
  `obc-readout`-based readouts in the instrument center, in four fixed
  arrangements, separated by a horizontal divider.
- **Arrow styles** (“map graphics” type): HDG and COG each gain a style enum
  (arrow head / needle / vector / beam-line resp. COG velocity vector) drawn
  by one shared arrow module used by both instruments.
- **Heading parity**: `obc-heading` gains an optional vessel and the same
  center readouts / arrow styles, matching its Figma
  `type: Regular | Vessel type | Center label` set.
- “Map graphics” and “environment data” remain **story recipes** over granular
  props — no `type` property is added to either component.

All new behavior is opt-in; defaults reproduce today’s rendering pixel-exactly
so the existing radial snapshot family stays green.

## 2. Figma sources (verified via MCP)

| What | Node | Finding |
| --- | --- | --- |
| Center label arrangements | `18487:186537` (`CenterLabel`, `values: 1\|2\|3\|Primary Secondary`) | 4 fixed layouts, 184×184 box (= inner circle), divider `Color/Border/Divider-color` |
| Compass, map graphics instance | `4668:71176` | CCRP vessel + HDG Vector + COG Arrow head + ROT bar (innerCircle geometry) + crosshair + NSWE outside |
| Heading set | `18325:430488` (`HeadingRadial`, `type: Regular\|Vessel type\|Center label`) | Regular = today’s heading; other types add track band, medium vessel, arrow-head styles, center readouts |
| HDG arrow set (`Style` axis) | Needle `18306:91613`, Arrow head `18306:91638`, Vector `18306:91621`, Beam-line `18306:91630` (+ Regular-state twins) | `18306:91613/91642` masks appear verbatim in today’s `heading/arrow.ts` — lineage confirmed |
| COG arrow set (`Type` axis) | Needle `18306:91642`, Arrow head `18306:91662`, Vector `18306:91650`, COG velocity vector `18306:91656` (+ twins) | Velocity vector = dashed shaft + double open arrowhead, fixed length |
| CCRP vessel | `208:29931` (PSV Top, `ccrp=true`) | Dashed-outline hull around reference point, drawn inside the normal 160 px (medium) vessel box |

## 3. Non-goals / out of scope

- No `type`/mode property on compass or heading (granular props + stories).
- No speed-over-ground input: the COG velocity vector is fixed-length per
  Figma; length scaling is a documented extension point only.
- No adoption of possibly-refreshed Figma arrow-head art for the existing
  defaults: current `compass/arrow.ts` art stays the `arrowHead` style. An art
  refresh would regenerate existing snapshots and belongs to its own PR.
- No changes to `watch.ts`, `instrument-radial.ts`, `radial-frame.ts`,
  `arc-frame.ts`, `advice.ts`, or the setpoint layer. The only
  building-block-adjacent edit is an **additive** vessel image (§ 8).
- `pitch-roll` and `compass-sector` **are migrated** onto the shared readout
  helper in this pass (user-approved scope change): their public APIs
  (`hasReadout`, labels, units) stay unchanged, only the internal cluster
  markup/CSS consolidates. Small intentional snapshot diffs are acceptable
  there and their baselines are updated and re-verified.
- No compass/heading base-class merge (decided with the user).

## 4. Shared arrow module

New module `navigation-instruments/course-arrows/course-arrows.ts` (beside
the instruments, not in building-blocks, because it is instrument overlay
art).

```ts
export enum HdgArrowStyle  { arrowHead = 'arrowHead', needle = 'needle', vector = 'vector', beamLine = 'beamLine' }
export enum CogArrowStyle  { arrowHead = 'arrowHead', needle = 'needle', vector = 'vector', velocityVector = 'velocityVector' }

export function hdgArrow(style: HdgArrowStyle, angle: number, priority?: Priority, radiusOffset?: number): SVGTemplateResult;
export function cogArrow(style: CogArrowStyle, angle: number, priority?: Priority, radiusOffset?: number): SVGTemplateResult;
```

- **Art matrix** (all in the 512/center-256 coordinate system, colors via
  `--instrument-{enhanced|regular}-secondary-color` + silhouette outline,
  `vector-effect="non-scaling-stroke"` per repo SVG rules):
  - `arrowHead`: today’s `compass/arrow.ts` art, moved verbatim (HDG filled,
    COG hollow).
  - `needle`: today’s `heading/arrow.ts` art, moved verbatim (HDG solid needle
    + hub, COG hollow needle + hub).
  - HDG `vector`: solid fore line + filled arrowhead + beam crossbar through
    center + center mark + dotted astern line (export from `18306:91621`).
  - HDG `beamLine`: same ensemble without the arrowhead (`18306:91630`).
  - COG `vector`: dashed shaft + single open arrowhead (`18306:91650`).
  - COG `velocityVector`: dashed shaft + double open arrowhead
    (`18306:91656`), fixed length.
- **`radiusOffset` semantics preserved**: shifts ring-anchored art
  (`arrowHead` styles) outward, exactly as today’s
  `compass/arrow.ts`. Center-anchored styles (needle/vector/beamLine/velocity)
  ignore it (documented).
- **Legacy shims**: `compass/arrow.ts` and `heading/arrow.ts` keep exporting
  the current `arrow(style: ArrowStyle, angle, priority, radiusOffset?)`
  API by delegating to the shared module, so `compass-sector.ts:8` (and any
  external consumer) sees no import churn and byte-identical output. Marked
  `@deprecated` pointing at the shared module.
- New SVG paths are exported from the Figma variant nodes at implementation
  time and adapted to CSS variables (no hard-coded colors, no pasted PNGs).

## 5. Center readouts (shared by compass & heading)

### API

```ts
export enum CompassReadoutSource { hdg = 'hdg', cog = 'cog', rot = 'rot' }

export interface CompassCenterReadout {
  source: CompassReadoutSource; // value auto-bound (see below)
  label?: string;               // default: HDG / COG / ROT
  unit?: string;                // default: DEG / DEG / °/min
  fractionDigits?: number;      // default 0
  size?: ReadoutSize;           // default: large for the first entry, medium for the rest
}

/** Non-empty replaces the vessel with center readouts. */
@property({attribute: false}) centerReadouts: CompassCenterReadout[] = [];
```

- Value binding: `hdg → heading`, `cog → courseOverGround`,
  `rot → rateOfTurnDegreesPerMinute ?? null` (a `null` renders the readout
  dash, per `obc-readout` semantics). On heading, `rot` resolves to `null`
  (heading has no ROT input); documented.
- Colors follow the existing per-element priority model:
  `priorityFor(source)` — enhanced palette only when `priority == enhanced`
  and the source is in `priorityElements`. This matches the Figma heading
  center-label variant exactly (HDG blue, COG neutral).
- The four Figma arrangements map to:
  `[{hdg}]` · `[{hdg},{cog,size:large}]` · `[{hdg},{cog}]` ·
  `[{hdg},{cog},{rot}]`.

### Reuse rule (recorded per user instruction)

The readouts are rendered through the existing
`renderInstrumentReadout()` → `obc-readout` pipeline and its **existing API
only**, choosing the closest match per element:

- first entry → `size: large`, priority per source, meta inline;
- further entries → `size: medium`, meta `stacking: stacked`;
- any Figma styling with no `obc-readout` API equivalent (e.g. a bolder
  font weight than the readout emits at that size) is **ignored** in favor of
  the closest existing readout behavior. No new typography knobs are added.

### Layout & positioning

- Overlay `<div>` centered with the pitch-roll flex pattern
  (`.readout` fills the container, flex-center; `.readout-group` column).
- Divider: 1 px, `var(--border-divider-color)`, `align-self: stretch`
  (pitch-roll’s `.readout-divider`), rendered only when entries beyond the
  first exist. First entry sits above the divider, remaining entries side by
  side below it (Figma `values=3`).
- When `centerReadouts` is non-empty the instrument passes `.vessels=[]` to
  `obc-watch` (pitch-roll’s exact opt-out pattern).
- Readout font sizes are fixed CSS px, like every existing instrument readout
  (compass-sector, pitch-roll, gauge-radial); the cluster is not scaled with
  the SVG. The 184×184 Figma box corresponds to the inner circle at the
  512 px reference size.
- The markup/CSS lives in a small shared helper module next to
  `readout/instrument-readout.ts` (`renderCenterReadouts()` + an exported
  style fragment). The helper takes **resolved** entries
  (`{value, label, unit, size, priority, fractionDigits, …}`) so it is
  source-agnostic: compass/heading map `CompassReadoutSource` → entries,
  `pitch-roll` maps pitch/roll → two entries, `compass-sector` maps heading →
  one entry. The `CompassCenterReadout` interface and `CompassReadoutSource`
  enum are exported from this helper module, so heading does not import them
  from compass (both components re-export them for consumers, mirroring the
  existing `export {RotType}` pattern in compass).
- `compass-sector` keeps its computed top-% anchor (its readout sits under
  the arc, not dead-center) — it adopts the helper for the readout markup
  inside its positioned container, not the flex-center wrapper.

## 6. `obc-compass` changes

- New props: `centerReadouts` (§ 5), `hdgArrowStyle: HdgArrowStyle = arrowHead`,
  `cogArrowStyle: CogArrowStyle = arrowHead`.
- Arrows render via the shared module; angles, rotation offsets
  (`getRotation()`), and `priorityFor(hdg|cog)` wiring unchanged.
- Vessel: unchanged by default (`vesselImage`, medium, rotates with heading);
  hidden only via non-empty `centerReadouts`. Map graphics uses
  `vesselImage: psvTopCcrp` (§ 8) at the same medium size.
- JSDoc: new Features bullets + `@availableWhen` where applicable (e.g.
  per-entry docs on `CompassCenterReadout`; `vesselImage` gains
  “hidden while `centerReadouts` is non-empty” note).

## 7. `obc-heading` changes

- New props: `vesselImage: VesselImage | undefined` (default `undefined` =
  today’s empty center; when set, a medium vessel rotating with heading, like
  compass), `centerReadouts` (§ 5), `hdgArrowStyle = needle`,
  `cogArrowStyle = needle` (defaults keep today’s art).
- Face band: the watch face stays `WatchCircleType.single` by default and
  switches to `WatchCircleType.double` automatically while a vessel or center
  readouts are shown (derived, no new prop), matching the Figma
  `Vessel type` / `Center label` faces (band ≈ RING2→RING3; verify against
  the Figma band radii during implementation and use `doubleThin` if it
  matches more closely). This only changes rendering when the new features
  are enabled.
- Documentation upgrade (user-approved): full class JSDoc to the compass
  standard, inline property docs, `@availableWhen` tags, and the stories file
  gains the `autodocs` tag.

## 8. Vessel asset (additive)

- `watch/vessel.ts`: new `VesselImage.psvTopCcrp = 'psv-top-ccrp'` + SVG
  template exported from Figma `208:29931` (dashed hull around the CCRP),
  colors mapped to the existing vessel CSS variables. Purely additive — no
  existing enum member or template changes, no watch logic changes.

## 9. Cascade / `zoomToFitArc` impact analysis (verified)

- Neither compass nor heading has a zoom route; nothing in this design
  touches `watch.ts` rendering, `radial-frame.ts`, `arc-frame.ts`, or the
  advice dual-path (`radiusOffset === 0` vs `> 0` hatch branches).
- The **one** coupling into the zoom family:
  `compass-sector.ts` imports `arrow`/`ArrowStyle` from `compass/arrow.js`
  and passes its zoom `rOff` as `radiusOffset`
  (`compass-sector.ts:540-551`). Mitigation: legacy shim modules keep the
  exact signature and output (§ 4), so compass-sector is untouched and its
  zoom rendering cannot drift.
- `pitch-roll` (zoom user) and `compass-sector` migrate onto the shared
  helper (§ 3): their zoom logic and readout *positioning* are untouched —
  only the cluster markup inside the positioned container changes. Small
  snapshot diffs are expected at that step, reviewed intentionally, and
  their baselines updated.
- Gate after the arrow-module refactor (before any behavior change): run the
  targeted visual suites for `compass`, `heading`, `compass-sector`,
  `pitch-roll`, `rudder`, `gauge-radial`, `rot-sector` and require **zero**
  baseline diffs. Diffs are permitted only at the explicit
  pitch-roll/compass-sector migration step.

## 10. Stories

Conventions: `With<Feature>` naming, Title Case, `['autodocs','6.0']`
(heading gains `autodocs`), controls per existing argTypes patterns
(`select` on the two new enums, object control for `centerReadouts`).

- Compass: `WithCenterReadout`, `WithTwoPrimaryReadouts`,
  `WithPrimarySecondaryReadouts`, `WithThreeReadouts`, `MapGraphics`
  (recipe: `vesselImage: psvTopCcrp`, `hdgArrowStyle: vector`,
  `cogArrowStyle: arrowHead`, `rotType: bar`, `rotPosition: innerCircle`,
  `showLabels: true`, `tickmarksInside: false`), plus two showcase stories
  `WithHdgArrowStyles` and `WithCogArrowStyles` rendering the style enums
  side by side (`skip-test` where animated).
- Heading: `WithVessel`, `WithCenterReadout` (HDG + COG, per Figma),
  arrow-style variants.

## 11. Testing & verification

1. Pre-change baseline run of the § 9 component set (must be green).
2. Implement in order: shared arrow module + shims (pure refactor, zero
   visual change — verified by the same suite) → shared readout helper +
   pitch-roll/compass-sector migration (small diffs, baselines updated) →
   heading → compass → stories/docs.
3. `npm run analyze`, `npm run lint`, `npm run typecheck`.
4. New-story baselines added via targeted `--update` runs, then re-run
   without `--update` to confirm stability (AGENTS.md §§ 11–13).
5. PR: Conventional Commit title; the PR body is a condensed version of this
   spec (summary, API, migration/snapshot notes, Figma sources).

## 12. Deferred / follow-ups

- Optional: SOG-proportional velocity-vector length (needs designer input).
- Optional: adopt refreshed Figma arrow-head art as new defaults (visual
  change PR with regenerated baselines).
