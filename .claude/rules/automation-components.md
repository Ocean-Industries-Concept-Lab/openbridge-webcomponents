---
paths:
  - "packages/openbridge-webcomponents/src/automation/**"
---

<!-- GENERATED FILE — DO NOT EDIT.
     Source: docs/agents/automation-components.md
     Regenerate: npm run agents:sync -w packages/openbridge-webcomponents -->

# Automation Components Instructions

These instructions apply to all automation schematic components: motorized devices (pump, motor, fan), valves, electrical components, line/pipe elements, tanks, readouts, and badges.

## Base Class Hierarchy

Choose the correct base class when creating a new automation device:

| Use case                      | Base class                                   | State properties                                                                                         |
| ----------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Motorized device (on + speed) | `ObcAbstractAutomationButtonMotorized`       | `on`, `speed` + `speedUnit` (default `%`) + `speedMaxDigits` (default 3); `speedInPercent` is deprecated |
| Binary on/off device          | `ObcAbstractAutomationButtonSquared`         | `on`                                                                                                     |
| Analog device with value      | `ObcAbstractAutomationButton` + custom logic | `open`, `value` (0–100)                                                                                  |
| Position selector (shuffle)   | `ObcShuffleButtonBase`                       | `selectedPosition`, `vertical`; fires `position-selected` (see § Shuffle selectors)                      |
| Pure display (no button)      | `LitElement` directly                        | N/A                                                                                                      |

All button-based components share `ObcAbstractAutomationButton` as root, which provides: positioning, readout stacks, badges, alert frames, tags, and label direction.

> **Exception:** `obc-automation-tank` extends `LitElement` directly (not the abstract base) because its layout shell is fundamentally different (multi-cell readout/tag/halo grid, optional embedded `obc-gauge-trend`). It re-implements the alert-frame pattern locally — same 6 properties (`alert`, `alertFrameType`, `alertFrameThickness`, `alertFrameStatus`, `showAlertCategoryIcon`, `showAlertIcon`) and same 3 slots (`alert-icon`, `alert-label`, `alert-timer`) — and overlays the `<obc-alert-frame>` inside its `.halo` wrapper so the ring hugs the bordered tank area only. When changing the alert API on the abstract base, keep the tank in sync. The tank also adds `aria-live="polite" aria-atomic="true"` on its `.root` to announce slotted alert labels; the abstract base does not (yet) do this.

> **Device-named gauge presets:** `obc-gauge-generator` and
> `obc-gauge-motors-and-pumps` subclass `obc-gauge-proportional` (a navigation
> instrument) to bake a device icon and type axis — like the tank exception,
> they live in `src/automation/` but render on the watch stack;
> `docs/agents/watch-radial-instruments.md` owns their rendering rules.
> `obc-gauge-valve` is a direct `obc-watch` consumer in `src/automation/` for
> the same reason.

## Icon Rendering Pattern

Automation device icons use a **dual-slot** approach — both `icon` (primary color) and `icon-silhouette` (background shadow) must be rendered:

```ts
override get icon() {
  return html`
    <obi-pump-on usecsscolor slot="icon"></obi-pump-on>
    <obi-pump-on usecsscolor slot="icon-silhouette"></obi-pump-on>
  `;
}
```

Rules:

- Always include the `usecsscolor` attribute so CSS variable color overrides work
- Provide both horizontal and vertical icon variants when `this.vertical` is true
- Apply rotation via a wrapper `div` with `style="transform: rotate(90deg)"`, not on the icon itself
- Switch between on/off icon variants based on `this.on` state

## State and Readout Getters

Subclasses expose state through getters that the base class reads during render:

```ts
get _on(): boolean { return this.on; }

override get extraReadouts(): AutomationButtonReadoutStack[] {
  return this.on
    ? [{type: 'state-on', value: 'On', hasIcon: true}]
    : [];
}
```

- `_on` maps the component's state to the base class's `open`/`closed` AutomationButtonState
- `extraReadouts` provides state-derived readout entries (On/Off, speed percentage, etc.)
- Do not set readouts as properties — compute them from state

## Enums

- **Variant enums are component-specific** — `MotorizedVariant`, `SquaredVariant`, `DigitalValveVariant`, etc. are NOT interchangeable
- Alternative icon enums (`FilterAlternativeIcon`, `LogicAlternativeIcon`, etc.) select between icon variants within one component
- Global enums shared across automation: `LineMedium`, `LineType`, `AutomationButtonDirection`, `AutomationButtonPositioning`, `AutomationButtonReadoutPosition`

## Line Components

Line/pipe components (`horizontal-line`, `vertical-line`, `corner-line`, etc.) render inline SVG with dynamic dimensions:

- Width/height calculated as `length * 24 + 1` (one grid unit = 24px)
- Use `lineWidth(lineType)` and `lineColor(medium)` helpers from `src/automation/index.ts`
- Stroke widths vary significantly by LineType: fluid=4, electric=2, air=10, connector=1
- viewBox must account for stroke width to prevent clipping

## Analog Valve SVG

Analog valves render inline dynamic SVG (not icon swapping):

- Handle rotation: `-(1 - value / 100) * 90` degrees
- Fill visualization uses clipPath that extends based on value percentage
- Use CSS variables for stroke/fill colors, not hard-coded values

## Shuffle selectors (hydraulic valves)

`obc-hydraulic-valve-4-3` and `obc-hydraulic-valve-x-2` extend `ObcShuffleButtonBase` (`src/automation/shuffle-button/`); `obc-hydraulic-check-valve` is display-only and reuses the same CSS for a single static slot. They are not anchored automation buttons: no `crossDecorator`, no badges, no readouts.

- **The box is 2n−1 slots.** The selected thumb always occupies the fixed center slot and the other thumbs keep their logical order on either side, so the host never changes size with the selection. `shuffle-layout.ts` holds the pure math; `shuffle-layout.spec.ts` pins it.
- **Selection is controlled.** A click or arrow key only fires `position-selected`; `selectedPosition` moves when the application sets it, so the symbol never shows a position the device has not reached. Stories wire the event back to the property so the control feels live.
- **Keyboard is the APG radio group pattern** — one tab stop on the selected thumb, arrow keys with wrap-around. The departures are listed in the base class JSDoc.
- **The base is a concrete class, not `abstract`.** The wrapper generators wrap every `LitElement` subclass and need a concrete constructor, like `ObcAbstractAutomationButton`.
- **`PositionSelectedDetail` is declared in each concrete component.** The wrapper generators resolve event types in the component's own module; importing it from the base leaves the Vue wrapper without an import.
- **`vertical` rotates the symbols −90°** so they follow a vertical flow path; the track and thumb geometry transpose.
- **Colors** come from the automation pipe/device tokens; sizes from the global touch/visual target tokens, so the components scale with `obc-component-size-*`.

## Storybook Conventions

- Use shared argTypes helpers: `argTypesAbstractAutomationButton`, `argTypesAbstractAutomationButtonMotorized`, `argTypesAbstractAutomationButtonPassiveSquare`
- Spread them into story meta: `argTypes: { ...argTypesAbstractAutomationButtonMotorized }`
- Use the `crossDecorator` for automation device stories
- Standard story exports: `OnVertical`, `OnHorizontal`, `OffVertical`, `OffHorizontal` for state × orientation combinations
- Title path: `'Automation/Automation Devices/{ComponentName}'`

## Badge Positioning

The abstract base exposes four **enum-driven** badge properties (defined in `abstract-automation-button.ts`) that render an `<obc-automation-badge>` in a fixed corner slot. Each defaults to `None` (no badge); a non-`None` value resolves to a specific `ObcAutomationBadgeType`. The legacy `badge-top-*` / `badge-bottom-*` slots still work and override the enum default for backward compatibility.

| Property             | Enum                                 | Values                                                         | Corner       |
| -------------------- | ------------------------------------ | -------------------------------------------------------------- | ------------ |
| `badgeControl`       | `AutomationButtonBadgeControl`       | `none`, `local`, `local-only`, `manual`, `manual-only`, `auto` | top-left     |
| `badgeAlert`         | `AutomationButtonBadgeAlert`         | `none`, `silence`, `caution`, `warning`, `alarm`               | top-right    |
| `badgeInterlock`     | `AutomationButtonBadgeInterlock`     | `none`, `interlock`, `interlock-inhibit`                       | bottom-left  |
| `badgeCommandLocked` | `AutomationButtonBadgeCommandLocked` | `none`, `command-locked`                                       | bottom-right |

Badge spacer logic is computed from readout position and which badges are present (enum-resolved or slotted). Do not hard-code spacer visibility.

`obc-automation-tank` mirrors the same four properties and the same enum imports, but rendering happens inside its own `.badges` cell — the corner-slot model does not apply there. When adding a new button-based device, spread `argTypesAbstractAutomationButton` (or one of its variant-specific re-exports) into the story meta so the four select controls are exposed in Storybook (see `analog-valve.stories.ts` for the canonical pattern).

**Exception — the `obc-automation-button` primitive.** The badge enum API lives only on `ObcAbstractAutomationButton`. The underlying `obc-automation-button` element (`class ObcAutomationButton extends LitElement`) exposes only the four named slots (`badge-top-right`, `badge-top-left`, `badge-bottom-left`, `badge-bottom-right`) and has no `badgeControl`/`badgeAlert`/`badgeInterlock`/`badgeCommandLocked` properties. Do **not** spread `argTypesAbstractAutomationButton*` into `automation-button.stories.ts` — the toggles would be inert because the primitive cannot resolve enums to badges. Use the slot API directly there (see `ValveBadges` / `DamperBadges` for the pattern). The wrapper does the enum-to-badge resolution and projects `<obc-automation-badge>` into the primitive's slots.

## P&ID Anchor Point Model

All automation components are placed on a P&ID canvas using `position: absolute; left: Xpx; top: Ypx`. This places the element's **top-left corner** at the given coordinate. Each component then uses internal CSS to shift itself so that a meaningful **anchor point** aligns with that coordinate — the point where pipes connect.

The Storybook `crossDecorator` simulates this layout: it wraps the component in a `position: relative` container and places children at `position: absolute; top: 50%; left: 50%`, with optional crosshair lines to visualize the anchor.

Different components have different anchor points:

| Component type       | Anchor point            | Internal CSS technique                                                                                                                                                                                                                 |
| -------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Valve / pump / motor | Center of icon          | 0×0 `.point-wrapper` at anchor + negative offset by half touch-target size + `translateX(-50%)` for top/bottom positioning or `translateY(-50%)` for left/right positioning                                                            |
| Tank                 | Top-center of tank body | `translateX(-50%)` on `.outer` + `top: -20px` to skip badge area                                                                                                                                                                       |
| Line segments        | Left/top edge of line   | SVG typically drawn around the 24px grid center (for example x=12 or y=12) + visual offset by about half the grid to align to the host edge, with minor `±0.5px` stroke/viewBox adjustments and direction-specific shifts where needed |

**Do not change the centering transforms** on automation components without understanding the anchor point intent. The browser's element overlay (host box) will often appear offset from the visual content — this is intentional because the host box starts at the placement coordinate while the visual content is shifted to align the anchor.

## Open

- Shuffle selectors slide 100 ms on selection change; the Figma frames are WIP and specify no motion, so keep or remove is a designer call (#1171).
