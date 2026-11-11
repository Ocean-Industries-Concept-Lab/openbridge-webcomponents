---
name: advice
description: Advice design layer, mixin/bundle, the four renderers and the area plugin
globs:
  - packages/openbridge-webcomponents/src/svghelpers/advice.ts
  - packages/openbridge-webcomponents/src/svghelpers/advice-linear.ts
  - packages/openbridge-webcomponents/src/svghelpers/advice-patterns.ts
  - packages/openbridge-webcomponents/src/svghelpers/advice-mixin.ts
  - packages/openbridge-webcomponents/src/svghelpers/advice-bundle.ts
  - packages/openbridge-webcomponents/src/charthelpers/advice-area-plugin.ts
  - packages/openbridge-webcomponents/src/building-blocks/advice/**
---

# Advice System

The advice subsystem: one design layer for the ranges and points an
instrument marks as go-to or no-go, the mixin and bundle that put the list
on an element and resolve it against the readings, and the four renderers
that draw what comes back. It is built like [`setpoint.md`](setpoint.md), and
touches the same instruments.

> **⚠️ Cross-cutting.** Four rendering paths draw from the one layer:
>
> - **Linear:** `external-scale.ts` → `bar-vertical`, `bar-horizontal`,
>   `gauge-vertical`, `gauge-horizontal`, `gauge-trend`, `automation-tank`,
>   and `instrument-linear.ts` → `heave`, `draft-trim`, `depth-actual`,
>   `pitch-roll-heave`
> - **Radial:** `watch/advice.ts` → `obc-watch` → `compass`, `heading`,
>   `compass-sector`, `rudder`, `speed-gauge`, `wind-propulsion`,
>   `instrument-radial` (`gauge-radial`, `rot-sector`), `gauge-proportional`,
>   `azimuth-thruster`, the inclinometers
> - **Thruster:** `thruster/advice.ts` → `thruster`, `azimuth-thruster`,
>   `main-engine`
> - **Chart:** `charthelpers/advice-area-plugin.ts` → `line-graph`,
>   `area-graph`, `gauge-trend`, `depth`
>
> A change to `svghelpers/advice.ts` moves every one of them. Run the
> snapshot filters of all four paths, not the one in front of you.

## Architecture

```text
svghelpers/advice.ts                     the design layer
  AdviceCategory, AdviceState, AdviceTrigger, AdviceInput, ResolvedAdvice
  normalizeAdvice()  resolveAdvices()  chainAdvices()  adviceCaps()
  adviceStyle()      geometry constants  nextAdviceMaskId()
        │
        ├─ advice-mixin.ts   AdviceMixin(LitElement, {angularWraparound})
        │                    advices, adviceTrigger, adviceEmphasis, resolveAdvices()
        └─ advice-bundle.ts  AdviceBundle — one per axis (azimuth-thruster)
        │
        ▼ ResolvedAdvice[]
  advice-linear.ts         band, point and area on a linear scale (external-scale, instrument-linear, thruster)
  watch/advice.ts          band, point and wedge on the ring (obc-watch)
  advice-patterns.ts       the SVG pattern tiles both share
  advice-icons.ts          the category glyphs, copied from the icon set, for the icon beside a band
  charthelpers/advice-area-plugin.ts   the area on a Chart.js canvas
```

The element resolves, the renderer places. `obc-watch` is the one renderer
that is itself an element: it takes the list its instrument already
resolved, as it takes the resolved setpoint, and draws the state it is given.

## Input and resolution

One shape on every instrument (`AdviceInput`): a range is `{min, max}`, a
point is `{value}`, both carry `category` and an optional `state`,
`hideMinTickmark`, `hideMaxTickmark`, `showArea` and `showIcon`. `normalizeAdvice()`
reads the names earlier releases used and maps them: `type` → `category`
(`advice` → `optimal`, `safe` → `running`), `hinted: true` → `state:
'hinted'`, `minAngle` / `maxAngle`, `minSpeed` / `maxSpeed`, `minValue` /
`maxValue` → `min` / `max`. A missing or unknown category, or a missing
range, throws a `TypeError`: a silent default would draw the wrong thing.

`resolveAdvices(inputs, readings, {angularWraparound, emphasis})`:

1. Normalises every entry. A linear pair is ordered; an angular pair keeps
   its clockwise meaning unless the first angle is the larger one **and** the
   clockwise span exceeds 180°, in which case the pair is swapped. `{350, 10}`
   stays a 20° band across north; `{200, 100}` is drawn as 100–200 (#1358).
   A deliberate band longer than 180° is written with the smaller angle
   first.
2. Marks an advice `triggered` when any reading hits it: a number inside the
   range (bounds included), an interval overlapping it, a point on equality.
   `adviceTriggerReadings(trigger, value, setpoint)` picks the readings:
   `both` (default), `value` or `setpoint`.
3. With `emphasis`, applies the design's rules: at rest a go-to band is
   `active` and a no-go band `enabled`; a hit on one group turns the other
   `hinted`; a band configured `hinted` stays so. Without it every band keeps
   its configured state until its own range is hit.
4. `chainAdvices()` cuts the ends of two bands that meet flat.

`isGoToCategory()` splits the categories: `optimal`, `running`, `eco`, `ai`
are go-to; `caution`, `warning`, `alarm`, `exclusion` are no-go. `ai` draws
from the base indigo ramp, as eco draws from base mint: the advice spec binds
those primitives and no semantic token exists for either.

## Mixin, bundle and aliases

| Scenario                               | Use                                                            | Example                                                                                               |
| -------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| One advice list                        | `AdviceMixin`                                                  | `bar-vertical`, `gauge-radial`, `line-graph`                                                          |
| Angular list                           | `AdviceMixin(…, {angularWraparound: true})`                    | `compass`, `rudder`, `speed-gauge`                                                                    |
| Two lists on two axes                  | `AdviceBundle`, one per axis, or `resolveAdvices()` per column | `azimuth-thruster` (`angleAdvices`, `thrustAdvices`), `main-engine` (`thrustAdvices`, `speedAdvices`) |
| Resolved by a composite, not a reading | `resolveAdvices()` directly                                    | `instrument-linear` (the trend band is the reading)                                                   |

The mixin adds `advices`, `adviceTrigger` (default `both`), `adviceEmphasis`
(default `false`) and `resolveAdvices(value, setpoint?)`. An instrument's
own name for the list is a **plain field with no default**, synced first in
`willUpdate()`, and the setpoint mixin's rule decides whether it is public:
a name that says which quantity the list advises stays the API
(`headingAdvices` on the compass, heading and compass sector, which also
show a course over ground; `sailAngleAdvices` on the wind propulsion
instrument), as `headingSetpoint` stands beside `setpoint`, and an
instrument with two columns has two lists and no `advices` at all
(`thrustAdvices` and `speedAdvices` on the main engine); a name for the
instrument's only quantity (`speedAdvices` on the speed gauge, `advice` on
the gauges, tank and depth instruments) is a `@deprecated` alias of
`advices`:

```ts
@property({type: Array, attribute: false}) headingAdvices?: AdviceInput[];

override willUpdate(changed: PropertyValues) {
  super.willUpdate(changed);
  syncAdviceAlias(this, this.headingAdvices);
}
```

Neither an accessor nor a change-gated copy survives the generated Vue
wrapper, which reads every property at creation and writes those values
back on its second render: an accessor hands back `[]` and clears a list set
through `advices`; a copy made only when the alias changes lets the
write-back of `advices` clear a list set through the alias.
`syncAdviceAlias()` keeps the alias in charge while it is set and leaves
`advices` alone while it is not. `pitch-roll-heave` keeps `heaveAdvice` as
the column's own list; its pitch and roll advices come from `maxPitchAdvice`
/ `maxRollAdvice`, so the generic name would be ambiguous there. `obc-watch`
keeps `advices` as a plain property with no trigger or emphasis: it draws
the given state, and the chaining is the instrument's.

A derived reading goes through the same step. `instrument-linear`'s
`resolveLinearAdvice(advices, trendMin, trendMax)` resolves against the
trend band as an interval; `draft-trim` negates and swaps the bounds before
resolving (`building-blocks.md`, scale space is positive-up); `thruster`'s
`convertThrustAdvices()` splits a zero-spanning band at zero with a flat,
tickless end and mirrors the bottom half with `negateAdvice()`, which swaps
a range's ends, caps and tick flags and leaves a point's own; `depth-actual`
and `draft-trim` negate with the same helper. The thruster's bottom half is
drawn under a reflection, so its hatch is mirrored back (`mirrorPattern`).

## Geometry

Canvas units, the 8-unit band on every path; the responsive sets' 4-unit
band is read for its styles, not as a second sizing tier (the instruments keep
`faceDiameter`, `zoomToFitArc`, `fixedAspectRatio` and the size classes).

| Constant                     | Value                      | Where                                                                                                                                                                                                                                                                             |
| ---------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ADVICE_BAND_THICKNESS`      | 8                          | radial r 164–172 (Figma 168–176 under the −4 rule); linear 4 off the tick base                                                                                                                                                                                                    |
| `ADVICE_CAP_INSET`           | 4                          | go-to pill tip inside the limit; cap centre 8 inside                                                                                                                                                                                                                              |
| `ADVICE_ALERT_CORNER_RADIUS` | 2                          | free end of a no-go band                                                                                                                                                                                                                                                          |
| `ADVICE_POINT_DOT_DIAMETER`  | 9                          | go-to point, a dot on the band centreline                                                                                                                                                                                                                                         |
| `ADVICE_POINT_TICK`          | 9 × 5, rx 2.5              | no-go point, a thick tick                                                                                                                                                                                                                                                         |
| `ADVICE_STRIPE`              | 3 wide, 5.66 pitch, 45°    | linear caution; radial caution is `radialStripes()`: the pre-baked tile every 4° at the design radius, generated lines under zoom                                                                                                                                                 |
| `ADVICE_HAIRLINE_WIDTH`      | 0.5                        | exclusion hatch; radial: 1-unit lines every 9°                                                                                                                                                                                                                                    |
| `ADVICE_DOT`                 | 2 on 8, rows offset 4      | alarm area lattice                                                                                                                                                                                                                                                                |
| `ADVICE_AREA_DASH`           | dotted `1 1`, dashed `4 4` | area limit lines; warning, alarm, exclusion are solid                                                                                                                                                                                                                             |
| `ADVICE_ICON_SIZE`           | 24                         | the icon beside a band on the ring, its box 4 (`ADVICE_ICON_GAP`) off the outer ring at the band's mid-angle, upright                                                                                                                                                             |
| `ADVICE_ICON_SIZE_LINEAR`    | 16                         | the icon on a linear scale, centred on the range: in the labels' place, or past the label band when labels are drawn, since a tick ladder's labels would sit under it; `computeOutsideBarThickness()` reserves the column, and the tank's bar and `depth-actual`'s box grow by it |

End caps (`adviceCaps()`): a go-to band is a pill, a no-go band is square
with the 2-unit corner, a chained end is cut flat. The free ends follow the
boundary tick: with a tick at the end a no-go band is cut flush and a go-to
band inset by its cap; `hideMinTickmark` / `hideMaxTickmark` leave both
rounded. A band shorter than the two insets is still drawn: the earlier pill
trim dropped it.

Areas: linear, between the limits across the bar (external scale: between
the dashed guides when `showArea` and `hasBar`); radial, a wedge r ≤ 160;
chart, the plot width between the two y pixels. The tint is the category's
`areaFill` while triggered only; the limit lines carry the dash at every
state, over a 1-unit frame-coloured line.

The icon (`showIcon`) is the category's glyph from the icon set, drawn as
paths by `advice-icons.ts` because a custom element cannot sit inside the
renderers' SVG: outline in the tick-label secondary grey at rest, the
band's colour for a triggered go-to category, and the IEC icon with its own
tokens for a triggered alert category. `advice-icons.spec.ts` holds every
copy to its `obi-*` module. The thruster and the chart plugin draw no icon:
the sets show none there.

Mask and pattern ids are document-scoped. Every element names its own with
`nextAdviceMaskId(prefix)` (`_adviceIdPrefix` on the watch,
`adviceMaskPrefix` in the external-scale and thruster configs, one per
column on the main engine); never a literal id.

## Style

`adviceStyle(category, state)` is the one token table (`fill`, `stroke`,
`pattern`, `tickStyle`, `areaOutline`, `areaFill`, `areaPattern`). In short:

| Category group | hinted                   | enabled                   | active                                                                       | triggered                                                                          |
| -------------- | ------------------------ | ------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| go-to          | white + tertiary outline | white + secondary outline | tint (`blue-100`, `mint-100`, `indigo-100`, running container) + its outline | solid (`instrument-enhanced-secondary`, `mint-400`, `indigo-400`, `alert-running`) |
| caution        | tertiary stripes         | secondary stripes         | caution container tint + inactive border                                     | `alert-caution` fill, `on-caution` outline and stripes                             |
| warning, alarm | solid tertiary grey      | solid secondary grey      | inactive background + border                                                 | `alert-warning` / `alert-alarm` fill, `-outline` stroke                            |
| exclusion      | hairline hatch, tertiary | hairline hatch, secondary | same as enabled                                                              | hatch and outline `tick-mark-primary`                                              |

Boundary ticks are tertiary at rest and `tick-mark-primary` for every
triggered element, the caution point included. The solid grey hinted warning
and alarm bands are deliberate: they occlude the ticks behind them; the
`center` position uses the transparent overlay instead. Where the sets
still differ from this table the site carries a `TODO(designer)`.

## The chart plugin

`createAdviceAreaPlugin(host)` draws the tint or pattern in
`beforeDatasetsDraw` and the limit lines in `afterDatasetsDraw`, from the y
scale's pixels at draw time, clipped to the plot; it is registered ahead of
the markers so the value dot stays on top. The host (`ObcChartLineBase`)
supplies `resolvedAdvices()`, `resolveColor()` (a canvas cannot read CSS
variables; the theme observer rebuilds on a palette change),
`adviceAxisId()` and `recordAreas()` for specs (`lastAdviceAreas`). The base
class carries the mixin; `gauge-trend` overrides `adviceReadings()` with its
value and setpoint and gates on `hasAdvice`, a plain line graph has no
reading and draws the configured states.

## Stories

`building-blocks/advice/advice.stories.ts` is the comparison set, built like
the setpoint stories: `Visual State Comparison` (every category × state on
the bar), the radial twin on the watch, `State Change Flow` (a value moving
through the bands with emphasis on), `Resolution Stack (Radial)` (a chained
stack against three readings), `Range and Point` and `Icons` (every category
with its icon on the bar and the radial gauge). `watch.stories.ts`
carries the category, state, point-and-area and chained stories; the compass
(`CourseAdvicePoint`), gauge-radial (`LimitPoint`), tank (`AdviceUseCase`),
gauge-trend and line-graph (`WithAdviceArea`, `HistoricalAdvice`) carry the
use cases. The Storybook page is `docs/AdviceSystem.mdx`.

## Checklist

- [ ] Read `svghelpers/advice.ts` whole before changing a rule; the spec
      `advice.spec.ts` pins the resolution, the caps and the chain
- [ ] A new category or state goes into the enum, `adviceStyle()`, the
      comparison stories and the Storybook page, in that order
- [ ] A geometry change: run the snapshot filters of all four paths
      (`watch`, `external-scale`, `bar-vertical`, `thruster`, `gauge-trend`,
      `line-graph` at least) and crop the pairs before accepting
- [ ] A new consumer: the mixin or a bundle, a plain-field alias synced by
      `syncAdviceAlias()` for any old name, `@property` tags for the three
      properties, its own mask prefix
- [ ] A Figma value the code does not follow: `TODO(designer)` at the site

## Open

- The small-size legibility threshold, the
  advice-priority labels and boundary labels, historical colouring of chart
  areas, the variable area and the message dialog (#1402 follow-ups).
- The optimal icon is a diamond with a plus in the spec and the triggered
  warning a filled circle with an exclamation mark; neither is in the icon
  set, so the readout block's advice icon and the IEC warning stand in
  (`TODO(designer)` in `advice-icons.ts`).
- The thruster's double-sided throw still draws both halves of a mirrored
  band; a single-sided advice on it is a follow-up.
